import { useState, useEffect } from 'react'

const WORD_LENGTH_STORAGE_KEY = 'kimiKupuLanguageSettings'

type LanguageSettings = {
  interfaceLanguage: string
  gameLanguage: string
  wordLength: number
  definitionUse: string
}

const getDefaultSettings = (): LanguageSettings => ({
  interfaceLanguage: 'en',
  gameLanguage: 'hawaiian',
  wordLength: 5, // Default to 5-letter games
  definitionUse: 'none'
})

export const useWordLength = () => {
  const [wordLength, setWordLengthState] = useState<number>(5)

  // Load initial wordLength from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(WORD_LENGTH_STORAGE_KEY)
      if (stored) {
        const settings: LanguageSettings = JSON.parse(stored)
        if (settings.wordLength && (settings.wordLength === 5 || settings.wordLength === 6)) {
          setWordLengthState(settings.wordLength)
        }
      }
    } catch (error) {
      console.warn('Failed to load word length from localStorage:', error)
      // Use default value of 5
    }
  }, [])

  // Subscribe to changes in localStorage (for when LanguageSelectionModal updates settings)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === WORD_LENGTH_STORAGE_KEY && event.newValue) {
        try {
          const settings: LanguageSettings = JSON.parse(event.newValue)
          if (settings.wordLength && (settings.wordLength === 5 || settings.wordLength === 6)) {
            setWordLengthState(settings.wordLength)
          }
        } catch (error) {
          console.warn('Failed to parse updated word length from localStorage:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Function to update wordLength (will update localStorage and trigger re-renders)
  const setWordLength = (newWordLength: number) => {
    if (newWordLength !== 5 && newWordLength !== 6) {
      console.warn('Invalid word length:', newWordLength, '. Must be 5 or 6.')
      return
    }

    try {
      // Get existing settings
      const stored = localStorage.getItem(WORD_LENGTH_STORAGE_KEY)
      const currentSettings = stored ? JSON.parse(stored) : getDefaultSettings()
      
      // Update wordLength
      const updatedSettings: LanguageSettings = {
        ...currentSettings,
        wordLength: newWordLength
      }
      
      // Save to localStorage
      localStorage.setItem(WORD_LENGTH_STORAGE_KEY, JSON.stringify(updatedSettings))
      
      // Update local state
      setWordLengthState(newWordLength)
    } catch (error) {
      console.error('Failed to update word length in localStorage:', error)
    }
  }

  // Function to get max attempts for current word length
  const getMaxAttempts = () => {
    return wordLength + 1 // 5-letter = 6 attempts, 6-letter = 7 attempts
  }

  return {
    wordLength,
    setWordLength,
    getMaxAttempts,
    is5LetterGame: wordLength === 5,
    is6LetterGame: wordLength === 6
  }
}