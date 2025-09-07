// src/languages/loader.ts - Updated for new unified language system
import { LanguageData, LanguageConfig } from './types';
import { getLanguageByName, getExtendedLanguageByName } from './registry';

// Import unified language data
import { 
  CONFIG as HAW_CONFIG, 
  HAWAIIAN_WORDS, 
  ORTHOGRAPHY as HAW_ORTHOGRAPHY 
} from './words.haw';
import { WORDS as HAW_WORDS_LEGACY } from '../constants/wordlist.haw5';
import { VALIDGUESSES as HAW_VALIDGUESSES } from '../constants/validGuesses.haw5';

import { 
  CONFIG as MAO_CONFIG, 
  MAORI_WORDS, 
  ORTHOGRAPHY as MAO_ORTHOGRAPHY 
} from './words.mao';
import { WORDS as MAO_WORDS_LEGACY } from '../constants/wordlist.mao5';
import { VALIDGUESSES as MAO_VALIDGUESSES } from '../constants/validGuesses.mao5';

import { 
  CONFIG as TAH_CONFIG, 
  TAHITIAN_WORDS, 
  ORTHOGRAPHY as TAH_ORTHOGRAPHY 
} from './words.tah';
import { WORDS as TAH_WORDS_LEGACY } from '../constants/wordlist.tah5';
import { VALIDGUESSES as TAH_VALIDGUESSES } from '../constants/validGuesses.tah5';

import { 
  CONFIG as SAM_CONFIG, 
  SAMOAN_WORDS, 
  ORTHOGRAPHY as SAM_ORTHOGRAPHY 
} from './words.sam';
import { WORDS as SAM_WORDS_LEGACY } from '../constants/wordlist.sam5';
import { VALIDGUESSES as SAM_VALIDGUESSES } from '../constants/validGuesses.sam5';

// Language data mapping with new unified structure
const LANGUAGE_DATA_MAP: Record<string, any> = {
  'haw': {
    config: HAW_CONFIG,
    orthography: HAW_ORTHOGRAPHY,
    words: HAW_WORDS_LEGACY, // Use legacy format for compatibility
    validGuesses: HAW_VALIDGUESSES,
    unifiedWords: HAWAIIAN_WORDS // New unified structure
  },
  'mao': {
    config: MAO_CONFIG,
    orthography: MAO_ORTHOGRAPHY,
    words: MAO_WORDS_LEGACY,
    validGuesses: MAO_VALIDGUESSES,
    unifiedWords: MAORI_WORDS
  },
  'tah': {
    config: TAH_CONFIG,
    orthography: TAH_ORTHOGRAPHY,
    words: TAH_WORDS_LEGACY,
    validGuesses: TAH_VALIDGUESSES,
    unifiedWords: TAHITIAN_WORDS
  },
  'sam': {
    config: SAM_CONFIG,
    orthography: SAM_ORTHOGRAPHY,
    words: SAM_WORDS_LEGACY,
    validGuesses: SAM_VALIDGUESSES,
    unifiedWords: SAMOAN_WORDS
  }
};

// Utility functions
const normalizeWordArray = (words: string[], normalization: LanguageConfig['normalization']): string[] => {
  if (!normalization) return words;
  
  return words.map(word => {
    let normalized = word.normalize(normalization);
    normalized = normalized.replaceAll('\u2018', '\u02bb');
    return normalized;
  });
};

const normalizeOrthography = (orthography: string[], normalization: LanguageConfig['normalization']): string[] => {
  if (!normalization) return orthography;
  return orthography.map(char => char.normalize(normalization));
};

export class LanguageLoader {
  private static cache = new Map<string, LanguageData>();
  
  static async loadLanguage(languageName: string): Promise<LanguageData> {
    const langEntry = getLanguageByName(languageName);
    if (!langEntry) {
      throw new Error(`Language '${languageName}' not found in registry`);
    }

    // Check cache first
    if (this.cache.has(langEntry.code)) {
      return this.cache.get(langEntry.code)!;
    }

    // Get language data from static imports
    const rawData = LANGUAGE_DATA_MAP[langEntry.code];
    if (!rawData) {
      throw new Error(`No language data found for code: ${langEntry.code}`);
    }

    const config: LanguageConfig = rawData.config;
    let orthography: string[] = rawData.orthography;
    let words: string[] = rawData.words;
    let validGuesses: string[] = rawData.validGuesses;

    // Apply normalization
    if (config.normalization) {
      orthography = normalizeOrthography(orthography, config.normalization);
      words = normalizeWordArray(words, config.normalization);
      validGuesses = normalizeWordArray(validGuesses, config.normalization);
    }

    const languageData: LanguageData = {
      config,
      orthography,
      words,
      validGuesses
    };

    this.cache.set(langEntry.code, languageData);
    return languageData;
  }

  static clearCache(languageName?: string): void {
    if (languageName) {
      const langEntry = getLanguageByName(languageName);
      if (langEntry) {
        this.cache.delete(langEntry.code);
      }
    } else {
      this.cache.clear();
    }
  }
}