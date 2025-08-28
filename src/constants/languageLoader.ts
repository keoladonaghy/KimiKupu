// Language resource loader for multiple language support
// Loads language-specific resources from JSON files

export type LanguageCode = 'haw' | 'mao' | 'tah';

export interface LanguageConfig {
  tries: number;
  language: string;
  wordLength: number;
  author: string;
  authorWebsite: string;
  wordListSource: string;
  wordListSourceLink: string;
  googleAnalytics: string;
  shuffle: boolean;
  normalization: string | false;
}

// Default language - can be changed to support language selection
const DEFAULT_LANGUAGE: LanguageCode = 'haw';

// Get current language (for now, use default - can be extended for user selection)
export const getCurrentLanguage = (): LanguageCode => {
  // TODO: Add support for URL params, localStorage, or user selection
  return DEFAULT_LANGUAGE;
};

// Load resources for a specific language
export const loadLanguageResources = async (languageCode: LanguageCode) => {
  try {
    const [wordlist, validguesses, orthography, config] = await Promise.all([
      import(`./wordlist.${languageCode}.json`),
      import(`./validguesses.${languageCode}.json`),
      import(`./orthography.${languageCode}.json`),
      import(`./config.${languageCode}.json`)
    ]);

    return {
      wordlist: wordlist.default,
      validguesses: validguesses.default,
      orthography: orthography.default,
      config: config.default as LanguageConfig
    };
  } catch (error) {
    console.error(`Failed to load language resources for ${languageCode}:`, error);
    throw error;
  }
};

// Load current language resources
export const loadCurrentLanguageResources = () => {
  return loadLanguageResources(getCurrentLanguage());
};