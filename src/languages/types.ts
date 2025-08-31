// src/languages/types.ts
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
}

export interface LanguageData {
  config: LanguageConfig;
  orthography: string[];
  words: string[];
  validGuesses: string[];
}

export interface LanguageRegistryEntry {
  code: string;
  name: string;
  displayName: string;
  enabled: boolean;
}