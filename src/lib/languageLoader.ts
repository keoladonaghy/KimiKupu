// Language resource loader for dynamic imports

export interface LanguageResources {
  CONFIG: any
  ORTHOGRAPHY: string[]
  WORDS: string[]
  VALIDGUESSES: string[]
}

// Load language resources dynamically
export async function loadLanguageResources(language: string): Promise<LanguageResources> {
  try {
    // Import all resources using dynamic imports with specific paths
    let configModule, orthographyModule, wordlistModule, validGuessesModule
    
    if (language === 'hawaiian') {
      [configModule, orthographyModule, wordlistModule, validGuessesModule] = await Promise.all([
        import('../constants/config.haw'),
        import('../constants/orthography.haw'),
        import('../constants/wordlist.haw'),
        import('../constants/validGuesses.haw'),
      ])
    } else if (language === 'maori') {
      [configModule, orthographyModule, wordlistModule, validGuessesModule] = await Promise.all([
        import('../constants/config.mao'),
        import('../constants/orthography.mao'),
        import('../constants/wordlist.mao'),
        import('../constants/validGuesses.mao'),
      ])
    } else if (language === 'tahitian') {
      [configModule, orthographyModule, wordlistModule, validGuessesModule] = await Promise.all([
        import('../constants/config.tah'),
        import('../constants/orthography.tah'),
        import('../constants/wordlist.tah'),
        import('../constants/validGuesses.tah'),
      ])
    } else {
      // Default to base files (Hawaiian without suffix)
      [configModule, orthographyModule, wordlistModule, validGuessesModule] = await Promise.all([
        import('../constants/config'),
        import('../constants/orthography'),
        import('../constants/wordlist'),
        import('../constants/validGuesses'),
      ])
    }

    return {
      CONFIG: configModule.CONFIG,
      ORTHOGRAPHY: orthographyModule.ORTHOGRAPHY,
      WORDS: wordlistModule.WORDS,
      VALIDGUESSES: validGuessesModule.VALIDGUESSES,
    }
  } catch (error) {
    console.error('Failed to load language resources for:', language, error)
    // Fallback to default (base files) if loading fails
    if (language !== 'hawaiian') {
      const [configModule, orthographyModule, wordlistModule, validGuessesModule] = await Promise.all([
        import('../constants/config'),
        import('../constants/orthography'),
        import('../constants/wordlist'),
        import('../constants/validGuesses'),
      ])
      
      return {
        CONFIG: configModule.CONFIG,
        ORTHOGRAPHY: orthographyModule.ORTHOGRAPHY,
        WORDS: wordlistModule.WORDS,
        VALIDGUESSES: validGuessesModule.VALIDGUESSES,
      }
    }
    throw error
  }
}

// Get default language resources (for initial load)
export function getDefaultLanguage(): string {
  return 'hawaiian'
}