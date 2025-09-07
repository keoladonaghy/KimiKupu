// src/languages/registry.ts
import { LanguageRegistryEntry } from './types';
import { LanguageConfig, LanguageStatus, hasFrequencyData, supportsDifficultyFiltering } from './frequency-types';

// Import all language word data
import { 
  CONFIG as HAWAIIAN_CONFIG, 
  HAWAIIAN_WORDS, 
  ORTHOGRAPHY as HAWAIIAN_ORTHOGRAPHY 
} from './words.haw';

import { 
  CONFIG as MAORI_CONFIG, 
  MAORI_WORDS, 
  ORTHOGRAPHY as MAORI_ORTHOGRAPHY 
} from './words.mao';

import { 
  CONFIG as TAHITIAN_CONFIG, 
  TAHITIAN_WORDS, 
  ORTHOGRAPHY as TAHITIAN_ORTHOGRAPHY 
} from './words.tah';

import { 
  CONFIG as SAMOAN_CONFIG, 
  SAMOAN_WORDS, 
  ORTHOGRAPHY as SAMOAN_ORTHOGRAPHY 
} from './words.sam';

import { WordEntry } from './wordSelector';

export type LanguageCode = 'haw' | 'mao' | 'tah' | 'sam';

export interface ExtendedLanguageInfo extends LanguageRegistryEntry {
  config: LanguageConfig;
  words: WordEntry[];
  orthography: string[];
  wordCount: number;
  hasFrequency: boolean;
  supportsDifficulty: boolean;
  status: 'complete' | 'partial' | 'placeholder';
}

// Extended language registry with full data
export const EXTENDED_LANGUAGE_REGISTRY: Record<string, ExtendedLanguageInfo> = {
  hawaiian: {
    code: 'haw',
    name: 'hawaiian',
    displayName: 'Hawaiian',
    enabled: true,
    config: HAWAIIAN_CONFIG,
    words: HAWAIIAN_WORDS,
    orthography: HAWAIIAN_ORTHOGRAPHY,
    wordCount: HAWAIIAN_WORDS.length,
    hasFrequency: hasFrequencyData(HAWAIIAN_CONFIG),
    supportsDifficulty: supportsDifficultyFiltering(HAWAIIAN_CONFIG),
    status: 'complete'
  },
  maori: {
    code: 'mao', 
    name: 'maori',
    displayName: 'Māori',
    enabled: true,
    config: MAORI_CONFIG,
    words: MAORI_WORDS,
    orthography: MAORI_ORTHOGRAPHY,
    wordCount: MAORI_WORDS.length,
    hasFrequency: hasFrequencyData(MAORI_CONFIG),
    supportsDifficulty: supportsDifficultyFiltering(MAORI_CONFIG),
    status: 'complete'
  },
  tahitian: {
    code: 'tah',
    name: 'tahitian', 
    displayName: 'Tahitian',
    enabled: true,
    config: TAHITIAN_CONFIG,
    words: TAHITIAN_WORDS,
    orthography: TAHITIAN_ORTHOGRAPHY,
    wordCount: TAHITIAN_WORDS.length,
    hasFrequency: hasFrequencyData(TAHITIAN_CONFIG),
    supportsDifficulty: supportsDifficultyFiltering(TAHITIAN_CONFIG),
    status: 'complete'
  },
  samoan: {
    code: 'sam',
    name: 'samoan',
    displayName: 'Sāmoan',
    enabled: true,
    config: SAMOAN_CONFIG,
    words: SAMOAN_WORDS,
    orthography: SAMOAN_ORTHOGRAPHY,
    wordCount: SAMOAN_WORDS.length,
    hasFrequency: hasFrequencyData(SAMOAN_CONFIG),
    supportsDifficulty: supportsDifficultyFiltering(SAMOAN_CONFIG),
    status: 'placeholder'
  }
};

// Backward compatibility with existing registry
export const LANGUAGE_REGISTRY: Record<string, LanguageRegistryEntry> = {
  hawaiian: EXTENDED_LANGUAGE_REGISTRY.hawaiian,
  maori: EXTENDED_LANGUAGE_REGISTRY.maori,
  tahitian: EXTENDED_LANGUAGE_REGISTRY.tahitian,
  samoan: EXTENDED_LANGUAGE_REGISTRY.samoan
};

export const getLanguageByName = (name: string): LanguageRegistryEntry | undefined => {
  console.log('DEBUG GAME: getLanguageByName called with:', name);
  console.log('DEBUG GAME: Available languages:', Object.keys(LANGUAGE_REGISTRY));
  const result = LANGUAGE_REGISTRY[name.toLowerCase()];
  console.log('DEBUG GAME: Found language entry:', result);
  return result;
};

export const getLanguageByCode = (code: string): LanguageRegistryEntry | undefined => {
  return Object.values(LANGUAGE_REGISTRY).find(lang => lang.code === code);
};

export const getEnabledLanguages = (): LanguageRegistryEntry[] => {
  return Object.values(LANGUAGE_REGISTRY).filter(lang => lang.enabled);
};

export const getAllLanguageNames = (): string[] => {
  return Object.keys(LANGUAGE_REGISTRY);
};

// New extended functions for the flexible frequency system
export const getExtendedLanguageByName = (name: string): ExtendedLanguageInfo | undefined => {
  return EXTENDED_LANGUAGE_REGISTRY[name.toLowerCase()];
};

export const getAllExtendedLanguages = (): ExtendedLanguageInfo[] => {
  return Object.values(EXTENDED_LANGUAGE_REGISTRY);
};

export const getLanguagesWithFrequency = (): ExtendedLanguageInfo[] => {
  return getAllExtendedLanguages().filter(lang => lang.hasFrequency);
};

export const getCompleteLanguages = (): ExtendedLanguageInfo[] => {
  return getAllExtendedLanguages().filter(lang => lang.status === 'complete');
};

// Status-based filtering functions
export const getDeployedLanguages = (): ExtendedLanguageInfo[] => {
  return getAllExtendedLanguages().filter(lang => lang.config.status === 'deployed');
};

export const getInProgressLanguages = (): ExtendedLanguageInfo[] => {
  return getAllExtendedLanguages().filter(lang => lang.config.status === 'in-progress');
};

export const getJustStartedLanguages = (): ExtendedLanguageInfo[] => {
  return getAllExtendedLanguages().filter(lang => lang.config.status === 'just-started');
};

export const getLanguagesByStatus = (status: LanguageStatus): ExtendedLanguageInfo[] => {
  return getAllExtendedLanguages().filter(lang => lang.config.status === status);
};

// Player-facing language list (only deployed languages)
export const getPlayerLanguages = (): ExtendedLanguageInfo[] => {
  return getDeployedLanguages();
};

// Registry statistics
export const getRegistryStats = () => {
  const languages = getAllExtendedLanguages();
  const totalWords = languages.reduce((sum, lang) => sum + lang.wordCount, 0);
  const languagesWithFreq = languages.filter(lang => lang.hasFrequency).length;
  const completeLanguages = languages.filter(lang => lang.status === 'complete').length;
  
  // Status counts
  const deployedCount = languages.filter(lang => lang.config.status === 'deployed').length;
  const inProgressCount = languages.filter(lang => lang.config.status === 'in-progress').length;
  const justStartedCount = languages.filter(lang => lang.config.status === 'just-started').length;
  
  return {
    totalLanguages: languages.length,
    totalWords,
    languagesWithFrequency: languagesWithFreq,
    completeLanguages,
    
    // Status breakdown
    statusBreakdown: {
      deployed: deployedCount,
      inProgress: inProgressCount,
      justStarted: justStartedCount
    },
    
    // Player-visible count
    playerVisibleLanguages: deployedCount,
    
    frequencyDataTypes: languages.map(lang => ({
      language: lang.displayName,
      code: lang.code,
      dataType: lang.config.frequency.dataType,
      corpusSize: lang.config.frequency.corpusSize,
      wordCountPresent: lang.config.frequency.wordCountPresent,
      hasFrequency: lang.hasFrequency,
      supportsDifficulty: lang.supportsDifficulty,
      status: lang.status,
      deploymentStatus: lang.config.status // New deployment status
    }))
  };
};

// Multi-language word selection helpers
export const selectWordsFromLanguage = (
  languageName: string, 
  gameType: 'kimikupu' | 'pangakupu',
  options: {
    wordLength?: number;
    wordLengths?: number[];
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    targetCount?: number;
  } = {}
) => {
  const language = getExtendedLanguageByName(languageName);
  if (!language) return null;
  
  if (gameType === 'kimikupu') {
    const { selectDailyWord } = require('./wordSelector');
    return selectDailyWord(
      language.words,
      language.config,
      options.wordLength,
      options.difficulty
    );
  } else {
    const { selectCrosswordWords } = require('./wordSelector');
    return selectCrosswordWords(
      language.words,
      language.config,
      options.wordLengths || [3, 4, 5, 6, 7, 8],
      options.targetCount || 30
    );
  }
};