import { VALIDGUESSES } from '../constants/validGuesses'

export const isWordInWordList = (word: string, wordList: string[]) => {
  return wordList.includes(word) || VALIDGUESSES.includes(word)
}

export const isWinningWord = (word: string, solution: string) => {
  return solution === word
}

export const getWordOfDay = (wordList: string[]) => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  return {
    solution: wordList[index % wordList.length],
    solutionIndex: index,
    tomorrow: nextday,
  }
}
