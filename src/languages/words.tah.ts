// Tahitian Word List
// No frequency data available - alphabetical/manual ordering
// Total entries: 96
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

import { TAHITIAN_CONFIG } from './frequency-types';

// Import orthography from dedicated file
import ORTHOGRAPHY_IMPORT from '../constants/orthography.tah';

// Use the flexible LanguageConfig system
export const CONFIG = TAHITIAN_CONFIG;

// Use orthography from dedicated file
export const ORTHOGRAPHY = ORTHOGRAPHY_IMPORT;

export const TAHITIAN_WORDS: WordEntry[] = [
  // All words with no frequency data (wordCount: null)
  {
    word: "afata",
    definition: "box, chest, container",
    wordCount: null,
    uniqueId: "tah_001"
  },
  {
    word: "ahiri",
    definition: "to gather, collect",
    wordCount: null,
    uniqueId: "tah_002"
  },
  {
    word: "'aita",
    definition: "no, not",
    wordCount: null,
    uniqueId: "tah_003"
  },
  {
    word: "'aito",
    definition: "warrior, champion",
    wordCount: null,
    uniqueId: "tah_004"
  },
  {
    word: "'amui",
    definition: "to follow, behind",
    wordCount: null,
    uniqueId: "tah_005"
  },
  {
    word: "āna'e",
    definition: "only, just",
    wordCount: null,
    uniqueId: "tah_006"
  },
  {
    word: "anapo",
    definition: "yesterday, last night",
    wordCount: null,
    uniqueId: "tah_007"
  },
  {
    word: "'aore",
    definition: "no, not (negation)",
    wordCount: null,
    uniqueId: "tah_008"
  },
  {
    word: "apara",
    definition: "to embrace, hug",
    wordCount: null,
    uniqueId: "tah_009"
  },
  {
    word: "āroha",
    definition: "love, compassion",
    wordCount: null,
    uniqueId: "tah_010"
  },
  {
    word: "atari",
    definition: "to look at, observe",
    wordCount: null,
    uniqueId: "tah_011"
  },
  {
    word: "Atete",
    definition: "December",
    wordCount: null,
    uniqueId: "tah_012"
  },
  {
    word: "atira",
    definition: "to stand, rise up",
    wordCount: null,
    uniqueId: "tah_013"
  },
  {
    word: "Atopa",
    definition: "October",
    wordCount: null,
    uniqueId: "tah_014"
  },
  {
    word: "auā'e",
    definition: "alas, expression of pity",
    wordCount: null,
    uniqueId: "tah_015"
  },
  {
    word: "āuahi",
    definition: "smoke, fire",
    wordCount: null,
    uniqueId: "tah_016"
  },
  {
    word: "āuā'u",
    definition: "to swim",
    wordCount: null,
    uniqueId: "tah_017"
  },
  {
    word: "'auri",
    definition: "to return, come back",
    wordCount: null,
    uniqueId: "tah_018"
  },
  {
    word: "'aute",
    definition: "paper mulberry tree",
    wordCount: null,
    uniqueId: "tah_019"
  },
  {
    word: "'avae",
    definition: "leg, foot",
    wordCount: null,
    uniqueId: "tah_020"
  },
  {
    word: "faito",
    definition: "to fight, quarrel",
    wordCount: null,
    uniqueId: "tah_021"
  },
  {
    word: "fanau",
    definition: "children, offspring",
    wordCount: null,
    uniqueId: "tah_022"
  },
  {
    word: "fenua",
    definition: "land, country",
    wordCount: null,
    uniqueId: "tah_023"
  },
  {
    word: "ha'am",
    definition: "to eat",
    wordCount: null,
    uniqueId: "tah_024"
  },
  {
    word: "haere",
    definition: "to go, walk",
    wordCount: null,
    uniqueId: "tah_025"
  },
  {
    word: "haumi",
    definition: "to join, unite",
    wordCount: null,
    uniqueId: "tah_026"
  },
  {
    word: "hopoi",
    definition: "to take, pick up",
    wordCount: null,
    uniqueId: "tah_027"
  },
  {
    word: "horōi",
    definition: "to wash, clean",
    wordCount: null,
    uniqueId: "tah_028"
  },
  {
    word: "huero",
    definition: "white, pale",
    wordCount: null,
    uniqueId: "tah_029"
  },
  {
    word: "ihora",
    definition: "now, at this time",
    wordCount: null,
    uniqueId: "tah_030"
  },
  {
    word: "'iore",
    definition: "rat, mouse",
    wordCount: null,
    uniqueId: "tah_031"
  },
  {
    word: "'iria",
    definition: "to see, look at",
    wordCount: null,
    uniqueId: "tah_032"
  },
  {
    word: "maere",
    definition: "to die, death",
    wordCount: null,
    uniqueId: "tah_033"
  },
  {
    word: "mai'a",
    definition: "banana",
    wordCount: null,
    uniqueId: "tah_034"
  },
  {
    word: "maira",
    definition: "to look, examine",
    wordCount: null,
    uniqueId: "tah_035"
  },
  {
    word: "mamoe",
    definition: "sheep",
    wordCount: null,
    uniqueId: "tah_036"
  },
  {
    word: "maoro",
    definition: "truth, true",
    wordCount: null,
    uniqueId: "tah_037"
  },
  {
    word: "marae",
    definition: "meeting place, ceremonial ground",
    wordCount: null,
    uniqueId: "tah_038"
  },
  {
    word: "matau",
    definition: "to know, understand",
    wordCount: null,
    uniqueId: "tah_039"
  },
  {
    word: "matie",
    definition: "to be sick, illness",
    wordCount: null,
    uniqueId: "tah_040"
  },
  {
    word: "mātou",
    definition: "we, us (exclusive)",
    wordCount: null,
    uniqueId: "tah_041"
  },
  {
    word: "mau'a",
    definition: "mountain, hill",
    wordCount: null,
    uniqueId: "tah_042"
  },
  {
    word: "ma'ue",
    definition: "to lift up, raise",
    wordCount: null,
    uniqueId: "tah_043"
  },
  {
    word: "metua",
    definition: "parent, elder",
    wordCount: null,
    uniqueId: "tah_044"
  },
  {
    word: "miōri",
    definition: "Māori person",
    wordCount: null,
    uniqueId: "tah_045"
  },
  {
    word: "moana",
    definition: "ocean, sea",
    wordCount: null,
    uniqueId: "tah_046"
  },
  {
    word: "mou'a",
    definition: "mountain peak",
    wordCount: null,
    uniqueId: "tah_047"
  },
  {
    word: "ni'au",
    definition: "coconut palm frond",
    wordCount: null,
    uniqueId: "tah_048"
  },
  {
    word: "noa'a",
    definition: "to be, exist",
    wordCount: null,
    uniqueId: "tah_049"
  },
  {
    word: "'ohie",
    definition: "bamboo",
    wordCount: null,
    uniqueId: "tah_050"
  },
  {
    word: "'oire",
    definition: "to choose, select",
    wordCount: null,
    uniqueId: "tah_051"
  },
  {
    word: "'onei",
    definition: "here, this place",
    wordCount: null,
    uniqueId: "tah_052"
  },
  {
    word: "'ōrua",
    definition: "you two",
    wordCount: null,
    uniqueId: "tah_053"
  },
  {
    word: "painu",
    definition: "to run away, flee",
    wordCount: null,
    uniqueId: "tah_054"
  },
  {
    word: "parau",
    definition: "to speak, word",
    wordCount: null,
    uniqueId: "tah_055"
  },
  {
    word: "pārau",
    definition: "story, tale",
    wordCount: null,
    uniqueId: "tah_056"
  },
  {
    word: "pareu",
    definition: "sarong, wrap-around cloth",
    wordCount: null,
    uniqueId: "tah_057"
  },
  {
    word: "patia",
    definition: "to hit, strike",
    wordCount: null,
    uniqueId: "tah_058"
  },
  {
    word: "pe'ue",
    definition: "to push, shove",
    wordCount: null,
    uniqueId: "tah_059"
  },
  {
    word: "pinia",
    definition: "to close, shut",
    wordCount: null,
    uniqueId: "tah_060"
  },
  {
    word: "po'ia",
    definition: "to embrace, hold",
    wordCount: null,
    uniqueId: "tah_061"
  },
  {
    word: "pua'a",
    definition: "pig",
    wordCount: null,
    uniqueId: "tah_062"
  },
  {
    word: "purau",
    definition: "hibiscus tree",
    wordCount: null,
    uniqueId: "tah_063"
  },
  {
    word: "ra'au",
    definition: "tree, plant, medicine",
    wordCount: null,
    uniqueId: "tah_064"
  },
  {
    word: "rātou",
    definition: "they, them (three or more)",
    wordCount: null,
    uniqueId: "tah_065"
  },
  {
    word: "reira",
    definition: "there, that place",
    wordCount: null,
    uniqueId: "tah_066"
  },
  {
    word: "roa'a",
    definition: "to get, obtain",
    wordCount: null,
    uniqueId: "tah_067"
  },
  {
    word: "rouru",
    definition: "brain, mind",
    wordCount: null,
    uniqueId: "tah_068"
  },
  {
    word: "ru'au",
    definition: "two hundred",
    wordCount: null,
    uniqueId: "tah_069"
  },
  {
    word: "taere",
    definition: "to roll, turn over",
    wordCount: null,
    uniqueId: "tah_070"
  },
  {
    word: "tahua",
    definition: "priest, expert",
    wordCount: null,
    uniqueId: "tah_071"
  },
  {
    word: "tai'a",
    definition: "to cut, slash",
    wordCount: null,
    uniqueId: "tah_072"
  },
  {
    word: "taime",
    definition: "time, hour",
    wordCount: null,
    uniqueId: "tah_073"
  },
  {
    word: "tai'o",
    definition: "friend, companion",
    wordCount: null,
    uniqueId: "tah_074"
  },
  {
    word: "tāmau",
    definition: "to continue, persist",
    wordCount: null,
    uniqueId: "tah_075"
  },
  {
    word: "tao'a",
    definition: "property, goods",
    wordCount: null,
    uniqueId: "tah_076"
  },
  {
    word: "taora",
    definition: "to steal, rob",
    wordCount: null,
    uniqueId: "tah_077"
  },
  {
    word: "tapae",
    definition: "to offer, present",
    wordCount: null,
    uniqueId: "tah_078"
  },
  {
    word: "tapau",
    definition: "to cover, close",
    wordCount: null,
    uniqueId: "tah_079"
  },
  {
    word: "tātou",
    definition: "we, us (inclusive)",
    wordCount: null,
    uniqueId: "tah_080"
  },
  {
    word: "taura",
    definition: "rope, cord",
    wordCount: null,
    uniqueId: "tah_081"
  },
  {
    word: "teata",
    definition: "to laugh, smile",
    wordCount: null,
    uniqueId: "tah_082"
  },
  {
    word: "teina",
    definition: "younger sibling",
    wordCount: null,
    uniqueId: "tah_083"
  },
  {
    word: "tia'a",
    definition: "to pierce, stab",
    wordCount: null,
    uniqueId: "tah_084"
  },
  {
    word: "tiahi",
    definition: "to light, kindle",
    wordCount: null,
    uniqueId: "tah_085"
  },
  {
    word: "tia'i",
    definition: "to guard, protect",
    wordCount: null,
    uniqueId: "tah_086"
  },
  {
    word: "tiare",
    definition: "flower, gardenia",
    wordCount: null,
    uniqueId: "tah_087"
  },
  {
    word: "Tiunu",
    definition: "June",
    wordCount: null,
    uniqueId: "tah_088"
  },
  {
    word: "tutau",
    definition: "to stand, remain standing",
    wordCount: null,
    uniqueId: "tah_089"
  },
  {
    word: "uaina",
    definition: "wine",
    wordCount: null,
    uniqueId: "tah_090"
  },
  {
    word: "Upo'o",
    definition: "head, beginning",
    wordCount: null,
    uniqueId: "tah_091"
  },
  {
    word: "Utura",
    definition: "November",
    wordCount: null,
    uniqueId: "tah_092"
  },
  {
    word: "vaiho",
    definition: "to leave, abandon",
    wordCount: null,
    uniqueId: "tah_093"
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
  TAHITIAN_WORDS.filter(entry => entry.word.length === length);

export const getWordsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): WordEntry[] =>
  TAHITIAN_WORDS.filter(entry => getWordDifficulty(entry, CONFIG) === difficulty);

export const getWordsByFrequency = (minFrequency: number): WordEntry[] =>
  TAHITIAN_WORDS.filter(entry => getWordFrequency(entry, CONFIG) >= minFrequency);

// Game integration functions
export const getKimiKupuDailyWord = () => 
  selectDailyWord(TAHITIAN_WORDS, CONFIG);

export const getPangaKupuWordPool = (targetCount: number = 30) => 
  selectCrosswordWords(TAHITIAN_WORDS, CONFIG, [3, 4, 5, 6, 7, 8], targetCount);

// Metadata
export const CORPUS_INFO = {
  totalWords: 93,
  lastUpdated: '2025-09-07',
  source: 'Tahitian word list - no frequency data available'
};