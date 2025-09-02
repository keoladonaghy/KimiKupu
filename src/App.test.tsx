import { render, screen } from '@testing-library/react'
import App from './App'
import { ORTHOGRAPHY } from './constants/orthography'
import { WORDS } from './constants/wordlists'
import { ORTHOGRAPHY_PATTERN } from './lib/tokenizer'

test('renders Reo Moana Word Finder', () => {
  render(<App />)
  const linkElement = screen.getByText(/Word Finder/i)
  expect(linkElement).toBeInTheDocument()
})

test('no surprise characters', () => {
  let splitWords = WORDS.map((x) =>
    x.split(ORTHOGRAPHY_PATTERN).filter((x) => x)
  )
  splitWords.forEach((word) => {
    expect(ORTHOGRAPHY).toEqual(expect.arrayContaining(word))
  })
})
