// src/hooks/useLanguage.ts
import { useState, useEffect } from 'react';
import { LanguageData } from '../languages/types';
import { LanguageLoader } from '../languages/loader';
import { getLanguageByName } from '../languages/registry';

export interface UseLanguageResult {
  languageData: LanguageData | null;
  loading: boolean;
  error: string | null;
  changeLanguage: (languageName: string) => Promise<void>;
  currentLanguage: string;
}

export const useLanguage = (initialLanguage = 'hawaiian'): UseLanguageResult => {
  const [languageData, setLanguageData] = useState<LanguageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage);

  const loadLanguageData = async (languageName: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const langEntry = getLanguageByName(languageName);
      if (!langEntry) {
        throw new Error(`Language '${languageName}' not found`);
      }

      const data = await LanguageLoader.loadLanguage(languageName);
      setLanguageData(data);
      setCurrentLanguage(languageName);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error loading language';
      setError(errorMessage);
      console.error('Language loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = async (languageName: string) => {
    await loadLanguageData(languageName);
  };

  useEffect(() => {
    loadLanguageData(initialLanguage);
    }, [initialLanguage]);

  return {
    languageData,
    loading,
    error,
    changeLanguage,
    currentLanguage
  };
};