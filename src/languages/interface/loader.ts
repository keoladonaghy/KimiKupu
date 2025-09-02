// src/languages/interface/loader.ts
import { InterfaceTexts } from './types';
import { getInterfaceLanguageByName, getDefaultInterfaceLanguage } from './interfaceRegistry';

// Static imports for interface languages
import enTexts from './data/en.json';
import hawTexts from './data/haw.json';
// Import other languages when you create them:
// import maoTexts from './data/mao.json';

// Interface texts mapping
const INTERFACE_TEXTS_MAP: Record<string, InterfaceTexts> = {
  'en': enTexts as InterfaceTexts,
  'haw': hawTexts as InterfaceTexts,
  // Add other languages when created:
  // 'mao': maoTexts as InterfaceTexts,
};

export class InterfaceLanguageLoader {
  private static cache = new Map<string, InterfaceTexts>();
  private static fallbackTexts: InterfaceTexts = enTexts as InterfaceTexts;

  /**
   * Load interface texts for a language with English fallback
   */
  static async loadInterfaceTexts(languageName: string): Promise<InterfaceTexts> {
    const langEntry = getInterfaceLanguageByName(languageName);
    
    // If language not found, use default
    if (!langEntry) {
      const defaultLang = getDefaultInterfaceLanguage();
      return this.loadInterfaceTexts(defaultLang.name);
    }

    // Check cache first
    if (this.cache.has(langEntry.code)) {
      return this.cache.get(langEntry.code)!;
    }

    // Get texts from static imports
    const texts = INTERFACE_TEXTS_MAP[langEntry.code];
    
    if (!texts) {
      // Fallback to English if language file not found
      console.warn(`Interface texts not found for ${languageName}, falling back to English`);
      return this.fallbackTexts;
    }

    // Apply English fallback for any missing keys
    const completeTexts = this.applyFallback(texts, this.fallbackTexts);
    
    this.cache.set(langEntry.code, completeTexts);
    return completeTexts;
  }

  /**
   * Apply English fallback for missing translation keys
   */
  private static applyFallback(texts: Partial<InterfaceTexts>, fallback: InterfaceTexts): InterfaceTexts {
    const result: any = {};
    
    // Deep merge with fallback
    for (const key in fallback) {
      if (typeof fallback[key as keyof InterfaceTexts] === 'object') {
        result[key] = {
          ...fallback[key as keyof InterfaceTexts],
          ...(texts[key as keyof InterfaceTexts] || {})
        };
      } else {
        result[key] = texts[key as keyof InterfaceTexts] || fallback[key as keyof InterfaceTexts];
      }
    }
    
    return result as InterfaceTexts;
  }

  /**
   * Clear cache
   */
  static clearCache(languageName?: string): void {
    if (languageName) {
      const langEntry = getInterfaceLanguageByName(languageName);
      if (langEntry) {
        this.cache.delete(langEntry.code);
      }
    } else {
      this.cache.clear();
    }
  }
}