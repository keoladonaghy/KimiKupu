// Language resource mapping for dynamic language switching
import { CONFIG as CONFIG_DEFAULT } from './config'
import { CONFIG as CONFIG_HAW } from './config.haw'
import { CONFIG as CONFIG_MAO } from './config.mao'
import { CONFIG as CONFIG_TAH } from './config.tah'

import { WORDS as WORDS_DEFAULT } from './wordlist'
import { WORDS as WORDS_HAW } from './wordlist.haw'
import { WORDS as WORDS_MAO } from './wordlist.mao'
import { WORDS as WORDS_TAH } from './wordlist.tah'

import { VALIDGUESSES as VALIDGUESSES_DEFAULT } from './validGuesses'
import { VALIDGUESSES as VALIDGUESSES_HAW } from './validGuesses.haw'
import { VALIDGUESSES as VALIDGUESSES_MAO } from './validGuesses.mao'
import { VALIDGUESSES as VALIDGUESSES_TAH } from './validGuesses.tah'

import { ORTHOGRAPHY as ORTHOGRAPHY_DEFAULT } from './orthography'
import { ORTHOGRAPHY as ORTHOGRAPHY_HAW } from './orthography.haw'
import { ORTHOGRAPHY as ORTHOGRAPHY_MAO } from './orthography.mao'
import { ORTHOGRAPHY as ORTHOGRAPHY_TAH } from './orthography.tah'

export interface LanguageResources {
  config: typeof CONFIG_DEFAULT
  words: string[]
  validGuesses: string[]
  orthography: string[]
}

export const LANGUAGE_RESOURCES: Record<string, LanguageResources> = {
  hawaiian: {
    config: CONFIG_HAW,
    words: WORDS_HAW,
    validGuesses: VALIDGUESSES_HAW,
    orthography: ORTHOGRAPHY_HAW,
  },
  maori: {
    config: CONFIG_MAO,
    words: WORDS_MAO,
    validGuesses: VALIDGUESSES_MAO,
    orthography: ORTHOGRAPHY_MAO,
  },
  tahitian: {
    config: CONFIG_TAH,
    words: WORDS_TAH,
    validGuesses: VALIDGUESSES_TAH,
    orthography: ORTHOGRAPHY_TAH,
  },
  // Default fallback (currently Hawaiian)
  default: {
    config: CONFIG_DEFAULT,
    words: WORDS_DEFAULT,
    validGuesses: VALIDGUESSES_DEFAULT,
    orthography: ORTHOGRAPHY_DEFAULT,
  },
}

/**
 * Get language resources for a given language key
 * @param language Language key (e.g., 'hawaiian', 'maori', 'tahitian')
 * @returns Language resources object containing config, words, validGuesses, and orthography
 */
export const getLanguageResources = (language: string): LanguageResources => {
  return LANGUAGE_RESOURCES[language] || LANGUAGE_RESOURCES.default
}

/**
 * Get available language keys
 * @returns Array of available language keys
 */
export const getAvailableLanguages = (): string[] => {
  return Object.keys(LANGUAGE_RESOURCES).filter(key => key !== 'default')
}