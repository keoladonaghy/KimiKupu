import { LanguageResources } from '../constants/languageResources'

export const isWordInWordList = (word: string, resources: LanguageResources) => {
  return resources.words.includes(word) || resources.validGuesses.includes(word)
}

export const isWinningWord = (word: string, solution: string) => {
  return solution === word
}

export const getWordOfDay = (resources: LanguageResources) => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  return {
    solution: resources.words[index % resources.words.length],
    solutionIndex: index,
    tomorrow: nextday,
  }
}
