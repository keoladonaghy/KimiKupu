// src/utils/gameHelpers.ts
import { LanguageData } from '../languages/types';

export const validateGuess = (guess: string, languageData: LanguageData): boolean => {
  return languageData.validGuesses.includes(guess.toLowerCase()) || 
         languageData.words.includes(guess.toLowerCase());
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