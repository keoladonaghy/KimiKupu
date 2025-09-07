/**
 * Frequency Data Type System
 * Handles different types of frequency information across Polynesian languages
 */

export type FrequencyDataType = 'exact' | 'range' | 'rank' | 'none';
// 'exact' - Exact word counts with known corpus size (Hawaiian)
// 'range' - Range-based frequency bands (Māori: 1-10, 10-100, etc.)
// 'rank'  - Simple ranking without counts (1, 2, 3...)
// 'none'  - No frequency data available (Tahitian)

export type FrequencyValue = 
  | number            // Exact count (Hawaiian: 24444)
  | string            // Range (Māori: "100-1000", "1-10")
  | null;             // No data available

export interface FrequencyMetadata {
  dataType: FrequencyDataType;
  corpusSize: number | null;          // Total corpus size if known
  wordCountPresent: boolean;          // Whether wordCount field has meaningful data
  frequencyBands?: string[];          // For range-based: ["1-10", "10-100", "100-1000", "1000+"]
  totalUniqueWords?: number;          // Total unique words in this language's dataset
  lastUpdated?: string;               // When frequency data was last updated
  source?: string;                    // Source of frequency data
  notes?: string;                     // Additional notes about the data
}

export interface LanguageConfig {
  // Game settings
  tries: number;
  language: string;
  wordLength: number;
  
  // Frequency metadata
  frequency: FrequencyMetadata;
  
  // Author and source info
  author: string;
  authorWebsite: string;
  wordListSource: string;
  wordListSourceLink: string;
  
  // Technical settings  
  googleAnalytics?: string;
  shuffle: boolean;
  normalization: 'NFC' | 'NFD' | 'NKFC' | 'NKFD' | false;
}

// Example configurations for different languages:

export const HAWAIIAN_CONFIG: LanguageConfig = {
  tries: 6,
  language: 'Hawaiian',
  wordLength: 5,
  frequency: {
    dataType: 'exact',
    corpusSize: 433435,
    wordCountPresent: true,
    totalUniqueWords: 12368,
    lastUpdated: '2025-09-07',
    source: 'Hawaiian frequency corpus analysis',
    notes: 'Exact word counts from comprehensive corpus analysis'
  },
  author: 'keoladonaghy',
  authorWebsite: 'http://keoladonaghy.com',
  wordListSource: 'keoladonaghy',
  wordListSourceLink: 'http://keoladonaghy.com',
  shuffle: false,
  normalization: 'NFC',
};

export const MAORI_CONFIG: LanguageConfig = {
  tries: 6,
  language: 'Māori',
  wordLength: 5,
  frequency: {
    dataType: 'range',
    corpusSize: null, // Unknown - could ask the corpus creator
    wordCountPresent: true, // Has range data
    frequencyBands: ['1-10', '10-100', '100-1000', '1000+'],
    totalUniqueWords: 8500, // Estimated
    lastUpdated: '2025-09-01',
    source: 'Māori frequency corpus',
    notes: 'Range-based frequency bands from corpus analysis'
  },
  author: 'keoladonaghy',
  authorWebsite: 'http://keoladonaghy.com', 
  wordListSource: 'Māori corpus creator',
  wordListSourceLink: 'http://example.com/maori',
  shuffle: false,
  normalization: 'NFC',
};

export const TAHITIAN_CONFIG: LanguageConfig = {
  tries: 6,
  language: 'Tahitian',
  wordLength: 5,
  frequency: {
    dataType: 'none',
    corpusSize: null,
    wordCountPresent: false, // No frequency data at all
    totalUniqueWords: 6000, // Estimated from word list length
    lastUpdated: '2025-09-01',
    source: 'Manual word collection',
    notes: 'No frequency data available - alphabetical or manual ordering'
  },
  author: 'keoladonaghy',
  authorWebsite: 'http://keoladonaghy.com',
  wordListSource: 'Various dictionaries',
  wordListSourceLink: 'http://example.com/tahitian',
  shuffle: false,
  normalization: 'NFC',
};

/**
 * Utility functions for working with different frequency types
 */

export function getFrequencyScore(
  entry: { word: string; wordCount: FrequencyValue },
  config: LanguageConfig
): number {
  
  switch (config.frequency.dataType) {
    case 'exact':
      // Hawaiian: Direct percentage calculation
      if (typeof entry.wordCount === 'number' && config.frequency.corpusSize) {
        return (entry.wordCount / config.frequency.corpusSize) * 100;
      }
      return 0;
      
    case 'range':
      // Māori: Convert range to approximate score
      if (typeof entry.wordCount === 'string') {
        return convertRangeToScore(entry.wordCount, config.frequency.frequencyBands || []);
      }
      return 0;
      
    case 'rank':
      // Simple ranking: convert rank to relative score
      if (typeof entry.wordCount === 'number' && config.frequency.totalUniqueWords) {
        return ((config.frequency.totalUniqueWords - entry.wordCount) / config.frequency.totalUniqueWords) * 100;
      }
      return 0;
      
    case 'none':
    default:
      // No frequency data - return neutral score
      return 50; // Middle difficulty
  }
}

export function getDifficultyFromScore(score: number): 'beginner' | 'intermediate' | 'advanced' {
  if (score >= 0.01) return 'beginner';      // Top 1% most frequent  
  if (score >= 0.002) return 'intermediate'; // Next 0.8%
  return 'advanced';                         // Bottom 98.2%
}

function convertRangeToScore(range: string, bands: string[]): number {
  // Convert Māori-style ranges to approximate frequency scores
  const bandScores: Record<string, number> = {
    '1000+': 2.0,      // Very high frequency
    '100-1000': 0.5,   // High frequency  
    '10-100': 0.05,    // Medium frequency
    '1-10': 0.005,     // Low frequency
  };
  
  return bandScores[range] || 0.001; // Default to advanced level
}

/**
 * Check if a language has meaningful frequency data for filtering
 */
export function hasFrequencyData(config: LanguageConfig): boolean {
  return config.frequency.dataType !== 'none' && config.frequency.wordCountPresent;
}

/**
 * Check if a language can do difficulty-based filtering
 */
export function supportsDifficultyFiltering(config: LanguageConfig): boolean {
  return config.frequency.dataType === 'exact' || config.frequency.dataType === 'range';
}