import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { createOrthographyPattern } from './lib/tokenizer'
import { loadLanguageResources } from './lib/languageResources'

test('renders Hulihua title', async () => {
  render(<App />)
  // Wait for the language resources to load
  const linkElement = await screen.findByText(/Hulihua/i)
  expect(linkElement).toBeInTheDocument()
})

test('no surprise characters for default language', async () => {
  const resources = await loadLanguageResources('hawaiian')
  const pattern = createOrthographyPattern(resources.orthography)
  const orthographyLowercase = resources.orthography.map((c) => c.toLowerCase())
  let splitWords = resources.words.map((x) => x.split(pattern).filter((x) => x))
  splitWords.forEach((word) => {
    const wordLowercase = word.map((c) => c.toLowerCase())
    expect(orthographyLowercase).toEqual(expect.arrayContaining(wordLowercase))
  })
})
