import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { ORTHOGRAPHY } from './constants/orthography'
import { WORDS } from './constants/wordlist'

test('renders Not Wordle', async () => {
  render(<App />)
  const linkElement = await waitFor(() => screen.getByText(/Hulihua/i))
  expect(linkElement).toBeInTheDocument()
})

test('no surprise characters', () => {
  const SORTED_ORTHOGRAPHY = [...ORTHOGRAPHY].sort(
    (a, b) => b.length - a.length
  )
  const ORTHOGRAPHY_PATTERN = new RegExp(
    '(' + SORTED_ORTHOGRAPHY.join('|') + ')',
    'g'
  )

  let splitWords = WORDS.map((x) =>
    x.split(ORTHOGRAPHY_PATTERN).filter((x) => x)
  )
  splitWords.forEach((word) => {
    expect(ORTHOGRAPHY).toEqual(expect.arrayContaining(word))
  })
})
