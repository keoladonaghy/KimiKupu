import { getGuessStatuses } from './statuses'
import { ORTHOGRAPHY_PATTERN } from './tokenizer'
import { solutionIndex } from './words'

export const shareStatus = (guesses: string[]) => {
  navigator.clipboard.writeText(
    'Wordle ' +
    solutionIndex +
    ' ' +
    guesses.length +
    '/6\n\n' +
    generateEmojiGrid(guesses)
  )
}

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return guess
        .split(ORTHOGRAPHY_PATTERN).filter(j => j)
        .map((letter, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            default:
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n')
}
