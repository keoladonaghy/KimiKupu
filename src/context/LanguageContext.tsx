import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

// Types for language resources
export type LanguageConfig = {
  tries: number
  language: string
  wordLength: number
  author: string
  authorWebsite: string
  wordListSource: string
  wordListSourceLink: string
  googleAnalytics: string
  shuffle: boolean
  normalization: string | false
}

export type LanguageResources = {
  orthography: string[]
  config: LanguageConfig
  wordList: string[]
}

export type LanguageContextType = {
  currentLanguage: string
  resources: LanguageResources | null
  loading: boolean
  error: string | null
  setLanguage: (language: string) => Promise<void>
}

// Language mappings for file imports
const LANGUAGE_MAPPINGS = {
  hawaiian: { suffix: '', fallback: '' },
  maori: { suffix: '.mao', fallback: '.mao' },
  tahitian: { suffix: '.tah', fallback: '.tah' }
}

// Dynamic import functions
const importOrthography = async (language: string): Promise<string[]> => {
  const mapping = LANGUAGE_MAPPINGS[language as keyof typeof LANGUAGE_MAPPINGS]
  if (!mapping) throw new Error(`Unsupported language: ${language}`)
  
  try {
    if (language === 'hawaiian') {
      const module = await import('../constants/orthography')
      return module.ORTHOGRAPHY
    } else {
      const module = await import(`../constants/orthography${mapping.suffix}`)
      return module.ORTHOGRAPHY
    }
  } catch (error) {
    throw new Error(`Failed to load orthography for ${language}: ${error}`)
  }
}

const importConfig = async (language: string): Promise<LanguageConfig> => {
  const mapping = LANGUAGE_MAPPINGS[language as keyof typeof LANGUAGE_MAPPINGS]
  if (!mapping) throw new Error(`Unsupported language: ${language}`)
  
  try {
    if (language === 'hawaiian') {
      const module = await import('../constants/config')
      return module.CONFIG
    } else {
      const module = await import(`../constants/config${mapping.suffix}`)
      return module.CONFIG
    }
  } catch (error) {
    throw new Error(`Failed to load config for ${language}: ${error}`)
  }
}

const importWordList = async (language: string): Promise<string[]> => {
  const mapping = LANGUAGE_MAPPINGS[language as keyof typeof LANGUAGE_MAPPINGS]
  if (!mapping) throw new Error(`Unsupported language: ${language}`)
  
  try {
    if (language === 'hawaiian') {
      const module = await import('../constants/wordlist')
      return module.WORDS
    } else {
      const module = await import(`../constants/wordlist${mapping.suffix}`)
      return module.WORDS
    }
  } catch (error) {
    throw new Error(`Failed to load word list for ${language}: ${error}`)
  }
}

// Load all resources for a language
const loadLanguageResources = async (language: string): Promise<LanguageResources> => {
  const [orthography, config, wordList] = await Promise.all([
    importOrthography(language),
    importConfig(language),
    importWordList(language)
  ])
  
  return { orthography, config, wordList }
}

// Context
const LanguageContext = createContext<LanguageContextType | null>(null)

// Provider component
type LanguageProviderProps = {
  children: ReactNode
  defaultLanguage?: string
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  defaultLanguage = 'hawaiian' 
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    // Load from localStorage or use default
    return localStorage.getItem('selectedGameLanguage') || defaultLanguage
  })
  const [resources, setResources] = useState<LanguageResources | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const setLanguage = useCallback(async (language: string): Promise<void> => {
    if (language === currentLanguage && resources) {
      return // Already loaded
    }

    setLoading(true)
    setError(null)

    try {
      const newResources = await loadLanguageResources(language)
      setResources(newResources)
      setCurrentLanguage(language)
      
      // Save to localStorage
      localStorage.setItem('selectedGameLanguage', language)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error('Failed to load language resources:', err)
    } finally {
      setLoading(false)
    }
  }, [currentLanguage, resources])

  // Load initial language resources
  useEffect(() => {
    if (!resources && !loading) {
      setLanguage(currentLanguage)
    }
  }, [currentLanguage, setLanguage, resources, loading])

  const contextValue: LanguageContextType = {
    currentLanguage,
    resources,
    loading,
    error,
    setLanguage
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

// Hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}