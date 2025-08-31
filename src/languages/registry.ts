// src/languages/registry.ts
import { LanguageRegistryEntry } from './types';

export const LANGUAGE_REGISTRY: Record<string, LanguageRegistryEntry> = {
  hawaiian: {
    code: 'haw',
    name: 'hawaiian',
    displayName: 'Hawaiian',
    enabled: true
  },
  maori: {
    code: 'mao', 
    name: 'maori',
    displayName: 'Māori',
    enabled: true
  },
  tahitian: {
    code: 'tah',
    name: 'tahitian', 
    displayName: 'Tahitian',
    enabled: true
  },
  samoan: {
    code: 'sam',
    name: 'samoan',
    displayName: 'Sāmoan',
    enabled: true
  }
};

export const getLanguageByName = (name: string): LanguageRegistryEntry | undefined => {
  return LANGUAGE_REGISTRY[name.toLowerCase()];
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