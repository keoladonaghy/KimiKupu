// src/utils/gameHelpers.ts
import { LanguageData } from '../languages/types';

export const validateGuess = (guess: string, languageData: LanguageData): boolean => {
  const guessLower = guess.toLowerCase();
  
  // Check legacy validGuesses and words (5-letter only)
  if (languageData.validGuesses.includes(guessLower) || 
      languageData.words.includes(guessLower)) {
    return true;
  }
  
  // Check unified words for any length (covers 6-letter and beyond)
  if (languageData.unifiedWords) {
    return languageData.unifiedWords.some(entry => 
      entry.word.toLowerCase() === guessLower
    );
  }
  
  return false;
};

export const getRandomWord = (languageData: LanguageData): string => {
  if (!languageData.words.length) {
    throw new Error('No words available for selected language');
  }
  return languageData.words[Math.floor(Math.random() * languageData.words.length)];
};

export const isValidCharacter = (char: string, orthography: string[]): boolean => {
  return orthography.includes(char.toLowerCase());
};