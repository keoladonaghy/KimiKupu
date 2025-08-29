import { VALIDGUESSES } from '../constants/validGuesses'
import { loadWordList, WordListLanguage } from '../contexts/WordListContext'

// Cache for loaded word lists to avoid repeated dynamic imports
const wordListCache: Map<WordListLanguage, string[]> = new Map()

// Get the current word list based on language
export const getCurrentWordList = async (language: WordListLanguage): Promise<string[]> => {
  if (wordListCache.has(language)) {
    return wordListCache.get(language)!
  }
  
  try {
    const words = await loadWordList(language)
    wordListCache.set(language, words)
    return words
  } catch (error) {
    console.error(`Failed to load word list for ${language}, falling back to Hawaiian`)
    if (language !== 'hawaiian') {
      return getCurrentWordList('hawaiian')
    }
    throw error
  }
}

export const isWordInWordList = async (word: string, language: WordListLanguage): Promise<boolean> => {
  try {
    const wordList = await getCurrentWordList(language)
    return wordList.includes(word) || VALIDGUESSES.includes(word)
  } catch (error) {
    console.error('Error checking word in word list:', error)
    return false
  }
}

export const isWinningWord = (word: string, solution: string): boolean => {
  return solution === word
}

export const getWordOfDay = async (language: WordListLanguage): Promise<{
  solution: string
  solutionIndex: number
  tomorrow: number
}> => {
  try {
    const wordList = await getCurrentWordList(language)
    
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
  } catch (error) {
    console.error('Error getting word of day:', error)
    // Fallback to default if there's an error
    if (language !== 'hawaiian') {
      return getWordOfDay('hawaiian')
    }
    throw error
  }
}

// Clear cache function for testing or manual refresh
export const clearWordListCache = () => {
  wordListCache.clear()
}