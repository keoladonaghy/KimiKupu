import os
import requests

# Fetch environment variables from GitHub Actions
GITHUB_API_URL = os.environ['GITHUB_API_URL']
GITHUB_REPOSITORY = os.environ['GITHUB_REPOSITORY']
GITHUB_REF = os.environ['GITHUB_REF']
GITHUB_TOKEN = os.environ['GITHUB_TOKEN']
CLAUDE_API_KEY = os.getenv('CLAUDE_API_KEY')  # Store Claude API Key securely

# Determine the pull request number from GITHUB_REF (format: refs/pull/123/merge)
pr_number = GITHUB_REF.split('/')[2]
PR_FILES_URL = f"{GITHUB_API_URL}/repos/{GITHUB_REPOSITORY}/pulls/{pr_number}/files"
ISSUE_COMMENTS_URL = f"{GITHUB_API_URL}/repos/{GITHUB_REPOSITORY}/issues/{pr_number}/comments"

# Get the pull request file diffs
headers = {'Authorization': f"token {GITHUB_TOKEN}"}
response = requests.get(PR_FILES_URL, headers=headers)
response.raise_for_status()
pr_files = response.json()

# Prepare the diff text
diff_text = ""
for file in pr_files:
    patch = file.get('patch')
    filename = file.get('filename')
    if patch:
        diff_text += f"--- {filename} ---\n{patch}\n\n"

# Send the diff to Claude API for code review
claude_url = "https://api.anthropic.com/v1/messages"  # Update if Claude's endpoint changes
headers_claude = {
    'x-api-key': CLAUDE_API_KEY,
    'anthropic-version': '2023-06-01',
    'content-type': 'application/json',
}
data = {
    "model": "claude-3-opus-20240229",  # Use your allowed Claude model
    "max_tokens": 1000,
    "temperature": 0.3,
    "messages": [
        {"role": "user", "content": f"Review the following GitHub pull request diff for code quality, clarity, and possible improvements. Respond as a code reviewer:\n\n{diff_text}"}
    ],
}

review_response = requests.post(claude_url, headers=headers_claude, json=data)
review_response.raise_for_status()
review_result = review_response.json()

# Extract review comments from Claude API response
claude_content = ""
choices = review_result.get("content", [])
if choices:
    # Claude's newer API returns a list of content blocks
    for block in choices:
        if isinstance(block, dict) and block.get("type") == "text":
            claude_content += block.get("text", "")
else:
    # fallback for older or different response format
    claude_content = review_result.get('completion', '') or str(review_result)

if not claude_content.strip():
    claude_content = "No feedback from Claude."

# Comment the review back on the PR
comment_data = {
    "body": claude_content
}
comment_headers = {'Authorization': f"token {GITHUB_TOKEN}"}
comment_response = requests.post(ISSUE_COMMENTS_URL, json=comment_data, headers=comment_headers)
comment_response.raise_for_status()
print("Claude review comment posted to PR.")