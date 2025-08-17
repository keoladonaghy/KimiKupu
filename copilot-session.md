# Copilot Chat Session – Troubleshooting and Local Development

**Date:** 2025-08-17  
**User:** keoladonaghy

---

## Summary

- Fixed merge conflict in `src/constants/wordlist.ts`
- Installed dependencies (`npm install`)
- Ran app locally (`npm start`)
- How to stop a frozen terminal (`Ctrl+C`)
- Successfully ran game at http://localhost:3000

---

## Key Commands

```bash
# Install dependencies
npm install

# Run the app
npm start
# or
npm run dev

# Stop a running/frozen terminal process
Ctrl + C
```

---

## Merge Conflict Resolution

1. Open the conflicted file (e.g., `src/constants/wordlist.ts`).
2. Locate lines with `<<<<<<<`, `=======`, `>>>>>>>`.
3. Decide which code to keep, remove markers, save file.

---

## Notes

- This session is not automatically saved in your project folder.
- For future reference, manually save important chats like this.

---

## Next Steps

- Test the game locally.
- For production build: `npm run build`
- For deployment help, ask Copilot for detailed steps based on your host.

---

**End of session notes.**