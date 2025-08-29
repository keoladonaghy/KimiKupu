import { getGuessStatuses } from './statuses'

export const shareStatus = (
  guesses: string[][],
  lost: boolean,
  solutionIndex: number,
  tries: number,
  solution: string,
  orthography: string[]
) => {
  navigator.clipboard.writeText(
    ' #Hulihua: He Nane ʻŌlelo Hawaiʻi ' +
      solutionIndex +
      ' ' +
      `${lost ? 'X' : guesses.length}` +
      '/' +
      tries.toString() +
      '\n\n' +
      generateEmojiGrid(guesses, solution, orthography)
  )
}

export const generateEmojiGrid = (
  guesses: string[][],
  solution: string,
  orthography: string[]
) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess, solution, orthography)
      return guess
        .map((letter, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟥'
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