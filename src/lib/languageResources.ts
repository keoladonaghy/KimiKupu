// Language resource types and dynamic loader utility

export interface LanguageConfig {
  tries: number
  language: string
  wordLength: number
  author: string
  authorWebsite: string
  wordListSource: string
  wordListSourceLink: string
  googleAnalytics?: string
  shuffle: boolean
  normalization: string | false
}

export interface LanguageResources {
  config: LanguageConfig
  orthography: string[]
  words: string[]
  validGuesses: string[]
}

// Map language codes to file suffixes
const LANGUAGE_FILE_MAP: Record<string, string> = {
  hawaiian: 'haw',
  maori: 'mao',
  tahitian: 'tah'
}

export const loadLanguageResources = async (language: string): Promise<LanguageResources> => {
  const fileSuffix = LANGUAGE_FILE_MAP[language]
  
  if (!fileSuffix) {
    throw new Error(`Unsupported language: ${language}`)
  }

  try {
    // Dynamic imports for language-specific resources
    const [configModule, orthographyModule, wordlistModule, validGuessesModule] = await Promise.all([
      import(`../constants/config.${fileSuffix}`),
      import(`../constants/orthography.${fileSuffix}`),
      import(`../constants/wordlist.${fileSuffix}`),
      import(`../constants/validGuesses.${fileSuffix}`)
    ])

    return {
      config: configModule.CONFIG,
      orthography: orthographyModule.ORTHOGRAPHY,
      words: wordlistModule.WORDS,
      validGuesses: validGuessesModule.VALIDGUESSES
    }
  } catch (error) {
    console.error(`Failed to load language resources for ${language}:`, error)
    throw error
  }
}

// Helper function to get word of day with specific word list
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

// Helper function to check if word is in word list
export const isWordInWordList = (word: string, words: string[], validGuesses: string[]) => {
  return words.includes(word) || validGuesses.includes(word)
}

// Helper function to check if word is winning word
export const isWinningWord = (word: string, solution: string) => {
  return solution === word
}