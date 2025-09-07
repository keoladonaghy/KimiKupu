/**
 * Shared Word Selection Function
 * Serves both KimiKupu (Wordle-style) and PangaKupu (crossword) games
 * Applies game constraints first, then diversity filtering
 * Supports multiple frequency data types across languages
 */

import { 
  LanguageConfig, 
  FrequencyValue, 
  getFrequencyScore, 
  getDifficultyFromScore,
  hasFrequencyData,
  supportsDifficultyFiltering 
} from './frequency-types';

// Updated WordEntry interface to support different frequency types
export interface WordEntry {
  word: string;
  definition: string;
  wordCount: FrequencyValue;  // Can be number, string (range), or null
  uniqueId: string;
}

export type GameType = 'kimikupu' | 'pangakupu';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface WordSelectionParams {
  gameType: GameType;
  languageConfig: LanguageConfig; // Contains all frequency metadata
  wordLength?: number;           // For KimiKupu (typically 5)
  wordLengths?: number[];        // For PangaKupu (e.g., [3,4,5,6,7,8])
  minFrequencyScore?: number;    // Minimum frequency score (0-100)
  maxFrequencyScore?: number;    // Maximum frequency score (0-100)  
  difficulty?: DifficultyLevel;  // Difficulty filter (only if supported)
  excludeNoDefinition?: boolean; // Exclude "No definition extracted"
  bufferMultiplier?: number;     // For crossword generation (default 2x)
}

export interface WordSelectionResult {
  selectedWords: WordEntry[];
  totalFiltered: number;
  diversityFiltered: number;
  finalCount: number;
}

/**
 * Calculates word frequency score (0-100) using language-specific method
 */
export const getWordFrequency = (entry: WordEntry, config: LanguageConfig): number => 
  getFrequencyScore(entry, config);

/**
 * Determines difficulty level based on frequency score
 */
export const getWordDifficulty = (entry: WordEntry, config: LanguageConfig): DifficultyLevel => {
  const score = getWordFrequency(entry, config);
  return getDifficultyFromScore(score);
};

/**
 * Applies diversity filtering to remove repetitive patterns
 * Based on the algorithm from PangaKupu
 */
function applyDiversityFiltering(words: WordEntry[]): WordEntry[] {
  const filtered: WordEntry[] = [];
  const seenPatterns = new Set<string>();
  
  for (const word of words) {
    const wordStr = word.word.toLowerCase();
    let isRepetitive = false;
    
    // Check for repetitive patterns
    // 1. Same letter repeated 3+ times consecutively
    if (/(.)\1{2,}/.test(wordStr)) {
      isRepetitive = true;
    }
    
    // 2. Alternating patterns (abab, abcabc)
    if (wordStr.length >= 4) {
      const half = Math.floor(wordStr.length / 2);
      const firstHalf = wordStr.slice(0, half);
      const secondHalf = wordStr.slice(half, half * 2);
      
      if (firstHalf === secondHalf) {
        isRepetitive = true;
      }
    }
    
    // 3. Too many vowels or consonants in a row
    const vowelRuns = wordStr.match(/[aeiou]{3,}/gi);
    const consonantRuns = wordStr.match(/[bcdfghjklmnpqrstvwxyz]{4,}/gi);
    
    if (vowelRuns || consonantRuns) {
      isRepetitive = true;
    }
    
    // 4. Track unique character patterns to avoid similar looking words
    const pattern = wordStr.replace(/([aeiou])/g, 'V').replace(/[^V]/g, 'C');
    
    if (!isRepetitive && !seenPatterns.has(pattern)) {
      filtered.push(word);
      seenPatterns.add(pattern);
    }
  }
  
  return filtered;
}

/**
 * Main word selection function
 * Applies game constraints first, then diversity filtering
 */
export function selectWords(
  wordList: WordEntry[], 
  params: WordSelectionParams
): WordSelectionResult {
  
  let filteredWords = [...wordList];
  
  // Step 1: Apply game-specific constraints
  
  // Filter by word length(s)
  if (params.gameType === 'kimikupu' && params.wordLength) {
    filteredWords = filteredWords.filter(w => w.word.length === params.wordLength);
  } else if (params.gameType === 'pangakupu' && params.wordLengths) {
    filteredWords = filteredWords.filter(w => params.wordLengths!.includes(w.word.length));
  }
  
  // Filter by frequency score range (only if language has frequency data)
  if (hasFrequencyData(params.languageConfig)) {
    if (params.minFrequencyScore !== undefined) {
      filteredWords = filteredWords.filter(w => 
        getWordFrequency(w, params.languageConfig) >= params.minFrequencyScore!
      );
    }
    
    if (params.maxFrequencyScore !== undefined) {
      filteredWords = filteredWords.filter(w => 
        getWordFrequency(w, params.languageConfig) <= params.maxFrequencyScore!
      );
    }
  }
  
  // Filter by difficulty level (only if language supports difficulty filtering)
  if (params.difficulty && supportsDifficultyFiltering(params.languageConfig)) {
    filteredWords = filteredWords.filter(w => 
      getWordDifficulty(w, params.languageConfig) === params.difficulty
    );
  }
  
  // Filter out entries without definitions if requested
  if (params.excludeNoDefinition) {
    filteredWords = filteredWords.filter(w => 
      w.definition !== 'No definition extracted'
    );
  }
  
  const totalFiltered = filteredWords.length;
  
  // Step 2: Apply diversity filtering (after game constraints)
  const diversityFiltered = applyDiversityFiltering(filteredWords);
  const diversityFilteredCount = diversityFiltered.length;
  
  // Step 3: Apply buffer multiplier for crossword generation
  let finalWords = diversityFiltered;
  if (params.gameType === 'pangakupu' && params.bufferMultiplier) {
    // For crossword puzzles, we need extra words for generation flexibility
    const bufferSize = Math.floor(diversityFilteredCount * params.bufferMultiplier);
    finalWords = diversityFiltered.slice(0, bufferSize);
  }
  
  return {
    selectedWords: finalWords,
    totalFiltered,
    diversityFiltered: diversityFilteredCount,
    finalCount: finalWords.length
  };
}

/**
 * Convenience function for KimiKupu daily word selection
 */
export function selectDailyWord(
  wordList: WordEntry[],
  languageConfig: LanguageConfig,
  wordLength?: number,
  difficulty?: DifficultyLevel
): WordEntry | null {
  
  const result = selectWords(wordList, {
    gameType: 'kimikupu',
    languageConfig,
    wordLength: wordLength || languageConfig.wordLength,
    difficulty,
    excludeNoDefinition: true,
    minFrequencyScore: hasFrequencyData(languageConfig) ? 0.001 : undefined // Exclude zero-frequency if available
  });
  
  if (result.selectedWords.length === 0) return null;
  
  // Use deterministic selection based on current date
  const today = new Date();
  const dayIndex = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  const wordIndex = dayIndex % result.selectedWords.length;
  
  return result.selectedWords[wordIndex];
}

/**
 * Convenience function for PangaKupu crossword word pool
 */
export function selectCrosswordWords(
  wordList: WordEntry[],
  languageConfig: LanguageConfig,
  wordLengths: number[] = [3, 4, 5, 6, 7, 8],
  targetCount: number = 30
): WordSelectionResult {
  
  return selectWords(wordList, {
    gameType: 'pangakupu',
    languageConfig,
    wordLengths,
    excludeNoDefinition: true,
    minFrequencyScore: hasFrequencyData(languageConfig) ? 0.001 : undefined, // Exclude zero-frequency if available
    bufferMultiplier: targetCount / 15 // Default assumes 15 words in puzzle
  });
}