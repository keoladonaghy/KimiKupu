// Updated to accept language resources as parameters

export const isWordInWordList = (word: string, words: string[], validGuesses: string[]) => {
  return words.includes(word) || validGuesses.includes(word)
}

export const isWinningWord = (word: string, solution: string) => {
  return solution === word
}

export const getWordOfDay = (words: string[]) => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  return {
    solution: words[index % words.length],
    solutionIndex: index,
    tomorrow: nextday,
  }
}
