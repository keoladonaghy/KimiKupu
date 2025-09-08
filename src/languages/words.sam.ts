// Samoan Word List
// Placeholder structure ready for frequency data when available
// Total entries: ~60 (can be expanded)
// Generated: 2025-09-07

import { 
  getWordFrequency, 
  getWordDifficulty, 
  selectWords, 
  selectDailyWord, 
  selectCrosswordWords,
  type WordEntry,
  type WordSelectionParams,
  type WordSelectionResult 
} from './wordSelector';

import { LanguageConfig } from './frequency-types';

// Samoan config - ready for frequency data when available
export const CONFIG: LanguageConfig = {
  tries: 6,
  language: 'Samoan',
  wordLength: 5,
  status: 'just-started', // Minimal word list, needs significant expansion
  features: {
    words: false,       // Only 27 words - insufficient for gameplay
    definitions: false, // Definitions not complete
    frequency: false,   // No frequency data available
  },
  frequency: {
    dataType: 'none', // Can be changed to 'exact' when frequency data becomes available
    corpusSize: null,  // Will be updated when corpus data is available
    wordCountPresent: false,
    totalUniqueWords: 60, // Current estimate, can be updated
    lastUpdated: '2025-09-07',
    source: 'Manual word collection',
    notes: 'Placeholder structure - ready for frequency data integration'
  },
  author: 'keoladonaghy',
  authorWebsite: 'http://keoladonaghy.com',
  wordListSource: 'Various Samoan dictionaries',
  wordListSourceLink: 'http://example.com/samoan',
  shuffle: false,
  normalization: 'NFC',
};

// Embedded orthography data
const ORTHOGRAPHY_BASE = [
  'a', 'ā', 'e', 'ē', 'i', 'ī', 'o', 'ō', 'u', 'ū',
  'f', 'g', 'l', 'm', 'n', 'p', 's', 't', 'v', 'ʻ'
];

export const ORTHOGRAPHY = CONFIG.normalization 
  ? ORTHOGRAPHY_BASE.map(val => val.normalize(CONFIG.normalization as string))
  : ORTHOGRAPHY_BASE;

export const SAMOAN_WORDS: WordEntry[] = [
  // Sample Samoan words - ready to add frequency data when available
  {
    word: "alofa",
    definition: "love, compassion, hello",
    wordCount: null, // Will be updated with frequency data
    uniqueId: "sam_001"
  },
  {
    word: "sāmoa",
    definition: "Samoa, Samoan",
    wordCount: null,
    uniqueId: "sam_002"
  },
  {
    word: "ali'i",
    definition: "chief, noble person",
    wordCount: null,
    uniqueId: "sam_003"
  },
  {
    word: "fanua",
    definition: "land, country",
    wordCount: null,
    uniqueId: "sam_004"
  },
  {
    word: "agaga",
    definition: "soul, spirit",
    wordCount: null,
    uniqueId: "sam_005"
  },
  {
    word: "amata",
    definition: "beginning, start",
    wordCount: null,
    uniqueId: "sam_006"
  },
  {
    word: "fānau",
    definition: "children, offspring",
    wordCount: null,
    uniqueId: "sam_007"
  },
  {
    word: "galue",
    definition: "work, job",
    wordCount: null,
    uniqueId: "sam_008"
  },
  {
    word: "ioane",
    definition: "John (name)",
    wordCount: null,
    uniqueId: "sam_009"
  },
  {
    word: "sione",
    definition: "John (variant)",
    wordCount: null,
    uniqueId: "sam_010"
  },
  {
    word: "iulai",
    definition: "July",
    wordCount: null,
    uniqueId: "sam_011"
  },
  {
    word: "saina",
    definition: "China, Chinese",
    wordCount: null,
    uniqueId: "sam_012"
  },
  {
    word: "amene",
    definition: "amen",
    wordCount: null,
    uniqueId: "sam_013"
  },
  {
    word: "anapō",
    definition: "last night, yesterday",
    wordCount: null,
    uniqueId: "sam_014"
  },
  {
    word: "aofai",
    definition: "to collect, gather",
    wordCount: null,
    uniqueId: "sam_015"
  },
  {
    word: "aofia",
    definition: "including, to include",
    wordCount: null,
    uniqueId: "sam_016"
  },
  {
    word: "fafao",
    definition: "to hurry, rush",
    wordCount: null,
    uniqueId: "sam_017"
  },
  {
    word: "faiga",
    definition: "way, method, manner",
    wordCount: null,
    uniqueId: "sam_018"
  },
  {
    word: "feinu",
    definition: "to drink together",
    wordCount: null,
    uniqueId: "sam_019"
  },
  {
    word: "feoti",
    definition: "to meet, encounter",
    wordCount: null,
    uniqueId: "sam_020"
  },
  {
    word: "fe'au",
    definition: "message, errand",
    wordCount: null,
    uniqueId: "sam_021"
  },
  {
    word: "foloa",
    definition: "to extend, stretch",
    wordCount: null,
    uniqueId: "sam_022"
  },
  {
    word: "gaoia",
    definition: "to steal, rob",
    wordCount: null,
    uniqueId: "sam_023"
  },
  {
    word: "ia te",
    definition: "to the, belonging to",
    wordCount: null,
    uniqueId: "sam_024"
  },
  {
    word: "iputī",
    definition: "small, little",
    wordCount: null,
    uniqueId: "sam_025"
  },
  {
    word: "ititi",
    definition: "small, tiny",
    wordCount: null,
    uniqueId: "sam_026"
  },
  {
    word: "itūlā",
    definition: "hour, time",
    wordCount: null,
    uniqueId: "sam_027"
  }
];

// Re-export for backward compatibility
export { 
  getWordFrequency, 
  getWordDifficulty, 
  selectWords, 
  selectDailyWord, 
  selectCrosswordWords,
  type WordSelectionParams,
  type WordSelectionResult 
};

// Legacy compatibility functions
export const getWordsByLength = (length: number): WordEntry[] =>
  SAMOAN_WORDS.filter(entry => entry.word.length === length);

export const getWordsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): WordEntry[] =>
  SAMOAN_WORDS.filter(entry => getWordDifficulty(entry, CONFIG) === difficulty);

export const getWordsByFrequency = (minFrequency: number): WordEntry[] =>
  SAMOAN_WORDS.filter(entry => getWordFrequency(entry, CONFIG) >= minFrequency);

// Game integration functions
export const getKimiKupuDailyWord = () => 
  selectDailyWord(SAMOAN_WORDS, CONFIG);

export const getPangaKupuWordPool = (targetCount: number = 30) => 
  selectCrosswordWords(SAMOAN_WORDS, CONFIG, [3, 4, 5, 6, 7, 8], targetCount);

// Metadata
export const CORPUS_INFO = {
  totalWords: 27,
  lastUpdated: '2025-09-07',
  source: 'Samoan word collection - ready for frequency data integration'
};