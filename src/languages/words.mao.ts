// Māori Word List
// Using range-based frequency system
// Total entries: 152
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

import { MAORI_CONFIG } from './frequency-types';

// Use the flexible LanguageConfig system
export const CONFIG = MAORI_CONFIG;

// Embedded orthography data
const ORTHOGRAPHY_BASE = [
  'a', 'ā', 'e', 'ē', 'i', 'ī', 'o', 'ō', 'u', 'ū',
  'h', 'k', 'l', 'm', 'n', 'p', 'r', 't', 'w', 'wh', 'ng'
];

export const ORTHOGRAPHY = CONFIG.normalization 
  ? ORTHOGRAPHY_BASE.map(val => val.normalize(CONFIG.normalization as string))
  : ORTHOGRAPHY_BASE;

export const MAORI_WORDS: WordEntry[] = [
  // High frequency words (1000+ occurrences)
  {
    word: "aroha",
    definition: "love, compassion, empathy",
    wordCount: "1000+",
    uniqueId: "mao_001"
  },
  {
    word: "whare",
    definition: "house, building, dwelling",
    wordCount: "1000+",
    uniqueId: "mao_002"
  },
  {
    word: "Māori",
    definition: "indigenous people of New Zealand",
    wordCount: "1000+",
    uniqueId: "mao_003"
  },
  {
    word: "haere",
    definition: "go, come, travel",
    wordCount: "1000+",
    uniqueId: "mao_004"
  },
  {
    word: "rangi",
    definition: "sky, heaven, day",
    wordCount: "1000+",
    uniqueId: "mao_005"
  },
  
  // Medium-high frequency (100-1000)
  {
    word: "marae",
    definition: "traditional meeting place",
    wordCount: "100-1000",
    uniqueId: "mao_006"
  },
  {
    word: "whetū",
    definition: "star",
    wordCount: "100-1000",
    uniqueId: "mao_007"
  },
  {
    word: "moana",
    definition: "sea, ocean, large body of water",
    wordCount: "100-1000",
    uniqueId: "mao_008"
  },
  {
    word: "rākau",
    definition: "tree, wood, timber",
    wordCount: "100-1000",
    uniqueId: "mao_009"
  },
  {
    word: "māori",
    definition: "normal, ordinary, fresh",
    wordCount: "100-1000",
    uniqueId: "mao_010"
  },
  {
    word: "whitu",
    definition: "seven",
    wordCount: "100-1000",
    uniqueId: "mao_011"
  },
  {
    word: "tekau",
    definition: "ten",
    wordCount: "100-1000",
    uniqueId: "mao_012"
  },
  {
    word: "matua",
    definition: "parent, adult",
    wordCount: "100-1000",
    uniqueId: "mao_013"
  },
  {
    word: "mātua",
    definition: "parents",
    wordCount: "100-1000",
    uniqueId: "mao_014"
  },
  {
    word: "whaea",
    definition: "mother, aunt, female elder",
    wordCount: "100-1000",
    uniqueId: "mao_015"
  },
  {
    word: "tāone",
    definition: "town, city",
    wordCount: "100-1000",
    uniqueId: "mao_016"
  },
  {
    word: "ringa",
    definition: "hand, arm",
    wordCount: "100-1000",
    uniqueId: "mao_017"
  },
  {
    word: "whero",
    definition: "red",
    wordCount: "100-1000",
    uniqueId: "mao_018"
  },
  {
    word: "ariki",
    definition: "chief, high-ranking person",
    wordCount: "100-1000",
    uniqueId: "mao_019"
  },
  {
    word: "rongo",
    definition: "hear, listen, news",
    wordCount: "100-1000",
    uniqueId: "mao_020"
  },
  
  // Medium frequency (10-100)
  {
    word: "kāore",
    definition: "no, not",
    wordCount: "10-100",
    uniqueId: "mao_021"
  },
  {
    word: "katoa",
    definition: "all, everyone, everything",
    wordCount: "10-100",
    uniqueId: "mao_022"
  },
  {
    word: "pēhea",
    definition: "how, what, in what way",
    wordCount: "10-100",
    uniqueId: "mao_023"
  },
  {
    word: "tēnei",
    definition: "this",
    wordCount: "10-100",
    uniqueId: "mao_024"
  },
  {
    word: "ētahi",
    definition: "some, several",
    wordCount: "10-100",
    uniqueId: "mao_025"
  },
  {
    word: "pēnei",
    definition: "like this, in this way",
    wordCount: "10-100",
    uniqueId: "mao_026"
  },
  {
    word: "reira",
    definition: "there, that place",
    wordCount: "10-100",
    uniqueId: "mao_027"
  },
  {
    word: "konei",
    definition: "here, this place",
    wordCount: "10-100",
    uniqueId: "mao_028"
  },
  {
    word: "runga",
    definition: "above, on top",
    wordCount: "10-100",
    uniqueId: "mao_029"
  },
  {
    word: "rātou",
    definition: "they, them (three or more)",
    wordCount: "10-100",
    uniqueId: "mao_030"
  },
  {
    word: "mātou",
    definition: "we, us (exclusive)",
    wordCount: "10-100",
    uniqueId: "mao_031"
  },
  {
    word: "tātou",
    definition: "we, us (inclusive)",
    wordCount: "10-100",
    uniqueId: "mao_032"
  },
  {
    word: "kōrua",
    definition: "you two",
    wordCount: "10-100",
    uniqueId: "mao_033"
  },
  {
    word: "upoko",
    definition: "head",
    wordCount: "10-100",
    uniqueId: "mao_034"
  },
  {
    word: "ngutu",
    definition: "mouth, lips",
    wordCount: "10-100",
    uniqueId: "mao_035"
  },
  {
    word: "whatu",
    definition: "eye, weave",
    wordCount: "10-100",
    uniqueId: "mao_036"
  },
  {
    word: "āpōpō",
    definition: "tomorrow",
    wordCount: "10-100",
    uniqueId: "mao_037"
  },
  {
    word: "āporo",
    definition: "apple",
    wordCount: "10-100",
    uniqueId: "mao_038"
  },
  {
    word: "hāora",
    definition: "hour",
    wordCount: "10-100",
    uniqueId: "mao_039"
  },
  {
    word: "kāwhe",
    definition: "coffee",
    wordCount: "10-100",
    uniqueId: "mao_040"
  },
  {
    word: "rīwai",
    definition: "potato",
    wordCount: "10-100",
    uniqueId: "mao_041"
  },
  {
    word: "hōiho",
    definition: "horse",
    wordCount: "10-100",
    uniqueId: "mao_042"
  },
  {
    word: "kiore",
    definition: "rat, mouse",
    wordCount: "10-100",
    uniqueId: "mao_043"
  },
  {
    word: "ngeru",
    definition: "cat",
    wordCount: "10-100",
    uniqueId: "mao_044"
  },
  {
    word: "poaka",
    definition: "pig",
    wordCount: "10-100",
    uniqueId: "mao_045"
  },
  {
    word: "kuini",
    definition: "queen",
    wordCount: "10-100",
    uniqueId: "mao_046"
  },
  {
    word: "tangi",
    definition: "cry, weep, funeral",
    wordCount: "10-100",
    uniqueId: "mao_047"
  },
  {
    word: "hāngi",
    definition: "earth oven, feast",
    wordCount: "10-100",
    uniqueId: "mao_048"
  },
  {
    word: "puoro",
    definition: "music, musical instrument",
    wordCount: "10-100",
    uniqueId: "mao_049"
  },
  {
    word: "waiho",
    definition: "leave, let be",
    wordCount: "10-100",
    uniqueId: "mao_050"
  },
  {
    word: "kawea",
    definition: "carry, bring",
    wordCount: "10-100",
    uniqueId: "mao_051"
  },
  {
    word: "hoatu",
    definition: "give",
    wordCount: "10-100",
    uniqueId: "mao_052"
  },
  {
    word: "hōmai",
    definition: "give to me",
    wordCount: "10-100",
    uniqueId: "mao_053"
  },
  {
    word: "kitea",
    definition: "see, find",
    wordCount: "10-100",
    uniqueId: "mao_054"
  },
  {
    word: "mahia",
    definition: "do, make, work",
    wordCount: "10-100",
    uniqueId: "mao_055"
  },
  
  // Low frequency (1-10)  
  {
    word: "aituā",
    definition: "accident, misfortune",
    wordCount: "1-10",
    uniqueId: "mao_056"
  },
  {
    word: "anake",
    definition: "only, just",
    wordCount: "1-10",
    uniqueId: "mao_057"
  },
  {
    word: "ārahi",
    definition: "lead, guide",
    wordCount: "1-10",
    uniqueId: "mao_058"
  },
  {
    word: "auahi",
    definition: "smoke, fire",
    wordCount: "1-10",
    uniqueId: "mao_059"
  },
  {
    word: "ehara",
    definition: "is not, are not",
    wordCount: "1-10",
    uniqueId: "mao_060"
  },
  {
    word: "ētehi",
    definition: "some, certain",
    wordCount: "1-10",
    uniqueId: "mao_061"
  },
  {
    word: "haina",
    definition: "sign, signature",
    wordCount: "1-10",
    uniqueId: "mao_062"
  },
  {
    word: "hanga",
    definition: "make, create, build",
    wordCount: "1-10",
    uniqueId: "mao_063"
  },
  {
    word: "haria",
    definition: "carry, take along",
    wordCount: "1-10",
    uniqueId: "mao_064"
  },
  {
    word: "hāwhe",
    definition: "half",
    wordCount: "1-10",
    uniqueId: "mao_065"
  },
  {
    word: "herea",
    definition: "bind, tie up",
    wordCount: "1-10",
    uniqueId: "mao_066"
  },
  {
    word: "hīkoi",
    definition: "walk, march",
    wordCount: "1-10",
    uniqueId: "mao_067"
  },
  {
    word: "hinga",
    definition: "fall down, die",
    wordCount: "1-10",
    uniqueId: "mao_068"
  },
  {
    word: "horoi",
    definition: "wash, rinse",
    wordCount: "1-10",
    uniqueId: "mao_069"
  },
  {
    word: "hunga",
    definition: "group of people",
    wordCount: "1-10",
    uniqueId: "mao_070"
  },
  {
    word: "ingoa",
    definition: "name",
    wordCount: "1-10",
    uniqueId: "mao_071"
  },
  {
    word: "kaitā",
    definition: "writer, scribe",
    wordCount: "1-10",
    uniqueId: "mao_072"
  },
  {
    word: "kakau",
    definition: "swim",
    wordCount: "1-10",
    uniqueId: "mao_073"
  },
  {
    word: "kānga",
    definition: "corn, maize",
    wordCount: "1-10",
    uniqueId: "mao_074"
  },
  {
    word: "kāpia",
    definition: "cabbage",
    wordCount: "1-10",
    uniqueId: "mao_075"
  },
  {
    word: "kapua",
    definition: "cloud",
    wordCount: "1-10",
    uniqueId: "mao_076"
  },
  {
    word: "kaute",
    definition: "count",
    wordCount: "1-10",
    uniqueId: "mao_077"
  },
  {
    word: "kēhua",
    definition: "ghost, spirit",
    wordCount: "1-10",
    uniqueId: "mao_078"
  },
  {
    word: "kīhai",
    definition: "did not, have not",
    wordCount: "1-10",
    uniqueId: "mao_079"
  },
  {
    word: "kōhua",
    definition: "crater, depression",
    wordCount: "1-10",
    uniqueId: "mao_080"
  },
  {
    word: "koina",
    definition: "that is it, exactly",
    wordCount: "1-10",
    uniqueId: "mao_081"
  },
  {
    word: "kōiwi",
    definition: "bone",
    wordCount: "1-10",
    uniqueId: "mao_082"
  },
  {
    word: "kōpae",
    definition: "close, shut",
    wordCount: "1-10",
    uniqueId: "mao_083"
  },
  {
    word: "māhau",
    definition: "verandah, porch",
    wordCount: "1-10",
    uniqueId: "mao_084"
  },
  {
    word: "mahue",
    definition: "abandoned, left behind",
    wordCount: "1-10",
    uniqueId: "mao_085"
  },
  {
    word: "mamae",
    definition: "pain, hurt",
    wordCount: "1-10",
    uniqueId: "mao_086"
  },
  {
    word: "manga",
    definition: "branch, stream",
    wordCount: "1-10",
    uniqueId: "mao_087"
  },
  {
    word: "mātao",
    definition: "cold",
    wordCount: "1-10",
    uniqueId: "mao_088"
  },
  {
    word: "matau",
    definition: "know, be familiar with",
    wordCount: "1-10",
    uniqueId: "mao_089"
  },
  {
    word: "mātau",
    definition: "we (dual, exclusive)",
    wordCount: "1-10",
    uniqueId: "mao_090"
  },
  {
    word: "mauri",
    definition: "life principle, life force",
    wordCount: "1-10",
    uniqueId: "mao_091"
  },
  {
    word: "mīere",
    definition: "honey",
    wordCount: "1-10",
    uniqueId: "mao_092"
  },
  {
    word: "mōhio",
    definition: "know, understand",
    wordCount: "1-10",
    uniqueId: "mao_093"
  },
  {
    word: "mōkai",
    definition: "slave, pet",
    wordCount: "1-10",
    uniqueId: "mao_094"
  },
  {
    word: "nāwai",
    definition: "when (in the past)",
    wordCount: "1-10",
    uniqueId: "mao_095"
  },
  {
    word: "ngaro",
    definition: "lost, hidden",
    wordCount: "1-10",
    uniqueId: "mao_096"
  },
  {
    word: "ngaru",
    definition: "wave",
    wordCount: "1-10",
    uniqueId: "mao_097"
  },
  {
    word: "ngata",
    definition: "finished, completed",
    wordCount: "1-10",
    uniqueId: "mao_098"
  },
  {
    word: "Ngāti",
    definition: "tribal prefix meaning 'descendants of'",
    wordCount: "1-10",
    uniqueId: "mao_099"
  },
  {
    word: "nunui",
    definition: "big, large",
    wordCount: "1-10",
    uniqueId: "mao_100"
  },
  {
    word: "ōrite",
    definition: "same, equal, alike",
    wordCount: "1-10",
    uniqueId: "mao_101"
  },
  {
    word: "otirā",
    definition: "but, however",
    wordCount: "1-10",
    uniqueId: "mao_102"
  },
  {
    word: "paipa",
    definition: "pipe",
    wordCount: "1-10",
    uniqueId: "mao_103"
  },
  {
    word: "panga",
    definition: "cheek",
    wordCount: "1-10",
    uniqueId: "mao_104"
  },
  {
    word: "pango",
    definition: "black",
    wordCount: "1-10",
    uniqueId: "mao_105"
  },
  {
    word: "pānui",
    definition: "notice, announcement",
    wordCount: "1-10",
    uniqueId: "mao_106"
  },
  {
    word: "paoro",
    definition: "ball",
    wordCount: "1-10",
    uniqueId: "mao_107"
  },
  {
    word: "pātai",
    definition: "ask, question",
    wordCount: "1-10",
    uniqueId: "mao_108"
  },
  {
    word: "patua",
    definition: "hit, strike, kill",
    wordCount: "1-10",
    uniqueId: "mao_109"
  },
  {
    word: "peita",
    definition: "paint",
    wordCount: "1-10",
    uniqueId: "mao_110"
  },
  {
    word: "pirau",
    definition: "rotten, stinking",
    wordCount: "1-10",
    uniqueId: "mao_111"
  },
  {
    word: "pōtae",
    definition: "hat",
    wordCount: "1-10",
    uniqueId: "mao_112"
  },
  {
    word: "pōuri",
    definition: "sad, dark, gloomy",
    wordCount: "1-10",
    uniqueId: "mao_113"
  },
  {
    word: "puare",
    definition: "boil, abscess",
    wordCount: "1-10",
    uniqueId: "mao_114"
  },
  {
    word: "puehu",
    definition: "dust, smoke",
    wordCount: "1-10",
    uniqueId: "mao_115"
  },
  {
    word: "pūmau",
    definition: "permanent, constant",
    wordCount: "1-10",
    uniqueId: "mao_116"
  },
  {
    word: "punua",
    definition: "offspring, young animal",
    wordCount: "1-10",
    uniqueId: "mao_117"
  },
  {
    word: "purei",
    definition: "play",
    wordCount: "1-10",
    uniqueId: "mao_118"
  },
  {
    word: "purua",
    definition: "hole, opening",
    wordCount: "1-10",
    uniqueId: "mao_119"
  },
  {
    word: "pūtea",
    definition: "money, fund",
    wordCount: "1-10",
    uniqueId: "mao_120"
  },
  {
    word: "rānei",
    definition: "or",
    wordCount: "1-10",
    uniqueId: "mao_121"
  },
  {
    word: "rango",
    definition: "fly (insect)",
    wordCount: "1-10",
    uniqueId: "mao_122"
  },
  {
    word: "rēhia",
    definition: "how many",
    wordCount: "1-10",
    uniqueId: "mao_123"
  },
  {
    word: "tāhau",
    definition: "cloak, garment",
    wordCount: "1-10",
    uniqueId: "mao_124"
  },
  {
    word: "tango",
    definition: "take, remove",
    wordCount: "1-10",
    uniqueId: "mao_125"
  },
  {
    word: "tarau",
    definition: "trousers",
    wordCount: "1-10",
    uniqueId: "mao_126"
  },
  {
    word: "tātai",
    definition: "count, recite genealogy",
    wordCount: "1-10",
    uniqueId: "mao_127"
  },
  {
    word: "tatau",
    definition: "count, number",
    wordCount: "1-10",
    uniqueId: "mao_128"
  },
  {
    word: "taura",
    definition: "rope, cord",
    wordCount: "1-10",
    uniqueId: "mao_129"
  },
  {
    word: "tēhea",
    definition: "which",
    wordCount: "1-10",
    uniqueId: "mao_130"
  },
  {
    word: "teina",
    definition: "younger sibling of same gender",
    wordCount: "1-10",
    uniqueId: "mao_131"
  },
  {
    word: "tiaki",
    definition: "guard, protect",
    wordCount: "1-10",
    uniqueId: "mao_132"
  },
  {
    word: "tipua",
    definition: "goblin, supernatural being",
    wordCount: "1-10",
    uniqueId: "mao_133"
  },
  {
    word: "tohua",
    definition: "point out, select",
    wordCount: "1-10",
    uniqueId: "mao_134"
  },
  {
    word: "tonga",
    definition: "south, southerly",
    wordCount: "1-10",
    uniqueId: "mao_135"
  },
  {
    word: "tonoa",
    definition: "send, command",
    wordCount: "1-10",
    uniqueId: "mao_136"
  },
  {
    word: "toroa",
    definition: "albatross",
    wordCount: "1-10",
    uniqueId: "mao_137"
  },
  {
    word: "tuarā",
    definition: "back, spine",
    wordCount: "1-10",
    uniqueId: "mao_138"
  },
  {
    word: "tuhia",
    definition: "write",
    wordCount: "1-10",
    uniqueId: "mao_139"
  },
  {
    word: "tukua",
    definition: "let go, release",
    wordCount: "1-10",
    uniqueId: "mao_140"
  },
  {
    word: "umere",
    definition: "feast, entertainment",
    wordCount: "1-10",
    uniqueId: "mao_141"
  },
  {
    word: "wahie",
    definition: "firewood",
    wordCount: "1-10",
    uniqueId: "mao_142"
  },
  {
    word: "wātea",
    definition: "free, available",
    wordCount: "1-10",
    uniqueId: "mao_143"
  },
  {
    word: "whāia",
    definition: "chase, pursue",
    wordCount: "1-10",
    uniqueId: "mao_144"
  },
  {
    word: "whāki",
    definition: "confess, tell",
    wordCount: "1-10",
    uniqueId: "mao_145"
  },
  {
    word: "whara",
    definition: "be angry",
    wordCount: "1-10",
    uniqueId: "mao_146"
  },
  {
    word: "whiti",
    definition: "cross over, shine",
    wordCount: "1-10",
    uniqueId: "mao_147"
  },
  {
    word: "whiua",
    definition: "throw, cast",
    wordCount: "1-10",
    uniqueId: "mao_148"
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
  MAORI_WORDS.filter(entry => entry.word.length === length);

export const getWordsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): WordEntry[] =>
  MAORI_WORDS.filter(entry => getWordDifficulty(entry, CONFIG) === difficulty);

export const getWordsByFrequency = (minFrequency: number): WordEntry[] =>
  MAORI_WORDS.filter(entry => getWordFrequency(entry, CONFIG) >= minFrequency);

// Game integration functions
export const getKimiKupuDailyWord = () => 
  selectDailyWord(MAORI_WORDS, CONFIG);

export const getPangaKupuWordPool = (targetCount: number = 30) => 
  selectCrosswordWords(MAORI_WORDS, CONFIG, [3, 4, 5, 6, 7, 8], targetCount);

// Metadata
export const CORPUS_INFO = {
  totalWords: 148,
  lastUpdated: '2025-09-07',
  source: 'Māori word list with simulated frequency ranges'
};