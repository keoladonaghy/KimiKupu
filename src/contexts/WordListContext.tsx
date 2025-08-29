import React, { createContext, useContext, useState, ReactNode } from 'react'

export type WordListLanguage = 'hawaiian' | 'maori'

interface WordListContextType {
  currentLanguage: WordListLanguage
  setLanguage: (language: WordListLanguage) => void
  isLoading: boolean
  error: string | null
}

const WordListContext = createContext<WordListContextType | undefined>(undefined)

interface WordListProviderProps {
  children: ReactNode
}

// Load language setting from localStorage
const loadWordListLanguageFromStorage = (): WordListLanguage => {
  try {
    const stored = localStorage.getItem('kimiKupuLanguageSettings')
    if (stored) {
      const settings = JSON.parse(stored)
      if (settings.gameLanguage === 'maori' || settings.gameLanguage === 'hawaiian') {
        return settings.gameLanguage
      }
    }
  } catch (error) {
    console.warn('Failed to load word list language from storage:', error)
  }
  return 'hawaiian' // default
}

// Save language setting to localStorage
const saveWordListLanguageToStorage = (language: WordListLanguage) => {
  try {
    const stored = localStorage.getItem('kimiKupuLanguageSettings')
    let settings = { interfaceLanguage: 'hawaiian', gameLanguage: language }
    
    if (stored) {
      const existingSettings = JSON.parse(stored)
      settings = { ...existingSettings, gameLanguage: language }
    }
    
    localStorage.setItem('kimiKupuLanguageSettings', JSON.stringify(settings))
  } catch (error) {
    console.warn('Failed to save word list language to storage:', error)
  }
}

export const WordListProvider: React.FC<WordListProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<WordListLanguage>(() => 
    loadWordListLanguageFromStorage()
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setLanguage = async (language: WordListLanguage) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Test if the word list can be loaded
      const wordList = await loadWordList(language)
      if (!wordList || wordList.length === 0) {
        throw new Error(`Word list for ${language} is empty or unavailable`)
      }
      
      setCurrentLanguage(language)
      saveWordListLanguageToStorage(language)
    } catch (err) {
      const errorMessage = `Failed to load word list for ${language}. Defaulting to Hawaiian.`
      setError(errorMessage)
      console.error(errorMessage, err)
      
      // Fallback to Hawaiian
      if (language !== 'hawaiian') {
        setCurrentLanguage('hawaiian')
        saveWordListLanguageToStorage('hawaiian')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <WordListContext.Provider value={{ currentLanguage, setLanguage, isLoading, error }}>
      {children}
    </WordListContext.Provider>
  )
}

export const useWordList = (): WordListContextType => {
  const context = useContext(WordListContext)
  if (context === undefined) {
    throw new Error('useWordList must be used within a WordListProvider')
  }
  return context
}

// Dynamic word list loader
export const loadWordList = async (language: WordListLanguage): Promise<string[]> => {
  try {
    switch (language) {
      case 'hawaiian': {
        const module = await import('../constants/wordlists/haw')
        return module.WORDS || []
      }
      case 'maori': {
        const module = await import('../constants/wordlists/mao')
        return module.WORDS || []
      }
      default:
        throw new Error(`Unsupported language: ${language}`)
    }
  } catch (error) {
    console.error(`Failed to load word list for ${language}:`, error)
    throw error
  }
}