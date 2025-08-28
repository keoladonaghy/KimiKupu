import translationEn from './translation.en.json'
import translationHaw from './translation.haw.json'
import translationMao from './translation.mao.json'

export type TranslationKey = string

export interface Translations {
  [key: string]: any
}

const translations: Record<string, Translations> = {
  english: translationEn,
  hawaiian: translationHaw,
  maori: translationMao,
}

/**
 * Get translation value by key path (e.g., 'alerts.notEnoughLetters')
 * @param language - The language code ('english', 'hawaiian', 'maori')
 * @param keyPath - Dot-separated path to the translation key
 * @param params - Optional parameters for string interpolation
 * @returns The translated string or the key path if not found
 */
export const getTranslation = (
  language: string,
  keyPath: string,
  params?: Record<string, any>
): string => {
  const langData = translations[language] || translations.english
  
  const keys = keyPath.split('.')
  let value: any = langData
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key]
    } else {
      // Fallback to English if key not found
      if (language !== 'english') {
        return getTranslation('english', keyPath, params)
      }
      // If English also doesn't have the key, return the key path
      return keyPath
    }
  }
  
  if (typeof value === 'string') {
    // Replace parameters in the string (e.g., {tries} -> actual tries value)
    if (params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? String(params[paramKey]) : match
      })
    }
    return value
  }
  
  // If value is not a string (e.g., array or object), return key path
  return keyPath
}

/**
 * Get array of translations (e.g., for winMessages)
 * @param language - The language code
 * @param keyPath - Dot-separated path to the translation array
 * @returns Array of translated strings or empty array if not found
 */
export const getTranslationArray = (
  language: string,
  keyPath: string
): string[] => {
  const langData = translations[language] || translations.english
  
  const keys = keyPath.split('.')
  let value: any = langData
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key]
    } else {
      // Fallback to English if key not found
      if (language !== 'english') {
        return getTranslationArray('english', keyPath)
      }
      return []
    }
  }
  
  return Array.isArray(value) ? value : []
}

/**
 * Hook-like function to get translation function for a specific language
 * @param language - The language code
 * @returns Translation function
 */
export const useTranslation = (language: string) => {
  return {
    t: (keyPath: string, params?: Record<string, any>) => 
      getTranslation(language, keyPath, params),
    tArray: (keyPath: string) => 
      getTranslationArray(language, keyPath),
  }
}