// src/languages/types.ts
import { FeatureAvailability } from './frequency-types';

export interface LanguageConfig {
  tries: number;
  language: string;
  wordLength: number;
  author: string;
  authorWebsite: string;
  wordListSource: string;
  wordListSourceLink: string;
  googleAnalytics?: string;
  shuffle: boolean;
  normalization: 'NFC' | 'NFD' | 'NKFC' | 'NKFD' | false;
  features?: FeatureAvailability;
}

export interface LanguageData {
  config: LanguageConfig;
  orthography: string[];
  words: string[];
  validGuesses: string[];
  unifiedWords?: any[];
}

export interface LanguageRegistryEntry {
  code: string;
  name: string;
  displayName: string;
  enabled: boolean;
}