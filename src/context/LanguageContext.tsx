import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

const LOCAL_STORAGE_KEY = 'kimiKupuLanguageSettings'

const loadGameLanguageFromLocalStorage = (): string => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (stored) {
    try {
      const settings = JSON.parse(stored)
      return settings.gameLanguage || 'hawaiian'
    } catch {
      return 'hawaiian'
    }
  }
  return 'hawaiian'
}

interface LanguageContextType {
  language: string
  orthography: string[]
  loading: boolean
  setLanguage: (language: string) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

const loadOrthographyForLanguage = async (language: string): Promise<string[]> => {
  console.log('[LanguageContext] Loading orthography for language:', language)
  
  try {
    let orthographyModule
    switch (language) {
      case 'hawaiian':
        orthographyModule = await import('../constants/orthography.haw')
        break
      case 'maori':
        orthographyModule = await import('../constants/orthography.mao')
        break
      case 'tahitian':
        orthographyModule = await import('../constants/orthography.tah')
        break
      default:
        console.log('[LanguageContext] Unknown language, falling back to Hawaiian:', language)
        orthographyModule = await import('../constants/orthography.haw')
        break
    }
    
    const orthography = orthographyModule.ORTHOGRAPHY
    console.log('[LanguageContext] Successfully loaded orthography:', orthography)
    return orthography
  } catch (error) {
    console.error('[LanguageContext] Error loading orthography for language:', language, error)
    // Fallback to default orthography
    const defaultModule = await import('../constants/orthography')
    return defaultModule.ORTHOGRAPHY
  }
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(() => {
    const savedLanguage = loadGameLanguageFromLocalStorage()
    console.log('[LanguageContext] Initial game language from localStorage:', savedLanguage)
    return savedLanguage
  })
  const [orthography, setOrthography] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const setLanguage = (newLanguage: string) => {
    console.log('[LanguageContext] setLanguage called with:', newLanguage)
    setLanguageState(newLanguage)
  }

  useEffect(() => {
    console.log('[LanguageContext] Language changed, loading resources for:', language)
    setLoading(true)
    
    loadOrthographyForLanguage(language)
      .then((newOrthography) => {
        console.log('[LanguageContext] Orthography updated for language:', language, newOrthography)
        setOrthography(newOrthography)
        setLoading(false)
      })
      .catch((error) => {
        console.error('[LanguageContext] Failed to load orthography:', error)
        setLoading(false)
      })
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, orthography, loading, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}