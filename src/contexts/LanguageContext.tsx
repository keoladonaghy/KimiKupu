import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { LanguageResources, getLanguageResources } from '../constants/languageResources'
import { loadLanguageFromLocalStorage, saveLanguageToLocalStorage } from '../lib/localStorage'

interface LanguageContextType {
  currentLanguage: string
  resources: LanguageResources
  changeLanguage: (language: string) => void
  resetGame: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
  onGameReset?: () => void
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  onGameReset 
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => 
    loadLanguageFromLocalStorage()
  )
  const [resources, setResources] = useState(() => 
    getLanguageResources(currentLanguage)
  )

  const changeLanguage = (language: string) => {
    setCurrentLanguage(language)
    setResources(getLanguageResources(language))
    saveLanguageToLocalStorage(language)
    
    // Trigger game reset when language changes
    if (onGameReset) {
      onGameReset()
    }
  }

  const resetGame = () => {
    if (onGameReset) {
      onGameReset()
    }
  }

  // Update resources when current language changes
  useEffect(() => {
    setResources(getLanguageResources(currentLanguage))
  }, [currentLanguage])

  const value: LanguageContextType = {
    currentLanguage,
    resources,
    changeLanguage,
    resetGame,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}