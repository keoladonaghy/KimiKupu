// src/languages/interface/interfaceRegistry.ts
import { InterfaceLanguageEntry } from './types';

export const INTERFACE_LANGUAGE_REGISTRY: Record<string, InterfaceLanguageEntry> = {
  english: {
    code: 'en',
    name: 'english',
    displayName: 'English',
    enabled: true,
    isDefault: true
  },
  hawaiian: {
    code: 'haw',
    name: 'hawaiian', 
    displayName: 'Hawaiian',
    enabled: true,
    isDefault: false
  },
  maori: {
    code: 'mao',
    name: 'maori',
    displayName: 'Māori', 
    enabled: true,
    isDefault: false
  }
};

export const getInterfaceLanguageByName = (name: string): InterfaceLanguageEntry | undefined => {
  console.log('DEBUG: getInterfaceLanguageByName called with:', name);
  console.log('DEBUG: Available languages:', Object.keys(INTERFACE_LANGUAGE_REGISTRY));
  console.log('DEBUG: Looking for:', name.toLowerCase());
  const result = INTERFACE_LANGUAGE_REGISTRY[name.toLowerCase()];
  console.log('DEBUG: Found language entry:', result);
  return result;
};

export const getInterfaceLanguageByCode = (code: string): InterfaceLanguageEntry | undefined => {
  return Object.values(INTERFACE_LANGUAGE_REGISTRY).find(lang => lang.code === code);
};

export const getEnabledInterfaceLanguages = (): InterfaceLanguageEntry[] => {
  return Object.values(INTERFACE_LANGUAGE_REGISTRY).filter(lang => lang.enabled);
};

export const getDefaultInterfaceLanguage = (): InterfaceLanguageEntry => {
  return Object.values(INTERFACE_LANGUAGE_REGISTRY).find(lang => lang.isDefault) || INTERFACE_LANGUAGE_REGISTRY.english;
};