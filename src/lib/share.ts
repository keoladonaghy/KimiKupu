import { getGuessStatuses } from './statuses'

export const shareStatus = (guesses: string[][], lost: boolean, solutionIndex: number, tries: number, solution: string) => {
  navigator.clipboard.writeText(
    " #Hulihua: He Nane 'Ōlelo Hawai'i " +
      solutionIndex +
      ' ' +
      `${lost ? 'X' : guesses.length}` +
      '/' +
      tries.toString() +
      '\n\n' +
      generateEmojiGrid(guesses, solution)
  )
}

export const generateEmojiGrid = (guesses: string[][], solution: string) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess, solution)
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