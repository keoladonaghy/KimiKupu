// Language resource loader for dynamic imports

export interface LanguageResources {
  CONFIG: any
  ORTHOGRAPHY: string[]
  WORDS: string[]
  VALIDGUESSES: string[]
}

// Map language codes to their file suffixes
const LANGUAGE_SUFFIXES: Record<string, string> = {
  'hawaiian': 'haw',
  'maori': 'mao', 
  'tahitian': 'tah',
  'english': '', // Default files have no suffix
}

// Get the correct file suffix for a language
function getLanguageSuffix(language: string): string {
  return LANGUAGE_SUFFIXES[language] || ''
}

// Load language resources dynamically
export async function loadLanguageResources(language: string): Promise<LanguageResources> {
  const suffix = getLanguageSuffix(language)
  const configPath = suffix ? `../constants/config.${suffix}` : '../constants/config'
  const orthographyPath = suffix ? `../constants/orthography.${suffix}` : '../constants/orthography'
  const wordlistPath = suffix ? `../constants/wordlist.${suffix}` : '../constants/wordlist'
  const validGuessesPath = suffix ? `../constants/validGuesses.${suffix}` : '../constants/validGuesses'

  try {
    // Import all resources in parallel
    const [configModule, orthographyModule, wordlistModule, validGuessesModule] = await Promise.all([
      import(configPath),
      import(orthographyPath),
      import(wordlistPath),
      import(validGuessesPath),
    ])

    return {
      CONFIG: configModule.CONFIG,
      ORTHOGRAPHY: orthographyModule.ORTHOGRAPHY,
      WORDS: wordlistModule.WORDS,
      VALIDGUESSES: validGuessesModule.VALIDGUESSES,
    }
  } catch (error) {
    console.error('Failed to load language resources for:', language, error)
    // Fallback to default (Hawaiian) if loading fails
    if (language !== 'hawaiian') {
      return loadLanguageResources('hawaiian')
    }
    throw error
  }
}

// Get default language resources (for initial load)
export function getDefaultLanguage(): string {
  return 'hawaiian'
}