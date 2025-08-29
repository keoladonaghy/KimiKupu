import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { ORTHOGRAPHY } from './constants/orthography'
import { WORDS } from './constants/wordlist'
import { ORTHOGRAPHY_PATTERN } from './lib/tokenizer'

test('renders Not Wordle', async () => {
  render(<App />)
  // Wait for loading to complete and title to appear
  await waitFor(
    () => {
      const linkElement = screen.getByText(/Hulihua/i)
      expect(linkElement).toBeInTheDocument()
    },
    { timeout: 3000 }
  )
})

test('no surprise characters', () => {
  let splitWords = WORDS.map((x) =>
    x.split(ORTHOGRAPHY_PATTERN).filter((x) => x)
  )
  splitWords.forEach((word) => {
    expect(ORTHOGRAPHY).toEqual(expect.arrayContaining(word))
  })
})
