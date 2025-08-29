const gameStateKey = 'gameState'

type StoredGameState = {
  guesses: string[][]
  solution: string
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey)
  return state ? (JSON.parse(state) as StoredGameState) : null
}

const gameStatKey = 'gameStats'

export type GameStats = {
  winDistribution: number[]
  gamesFailed: number
  currentStreak: number
  bestStreak: number
  totalGames: number
  successRate: number
}

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatKey)
  return stats ? (JSON.parse(stats) as GameStats) : null
}

const languageKey = 'selectedLanguage'
const uiLanguageKey = 'uiLanguage'
const wordListLanguageKey = 'wordListLanguage'

export const saveLanguageToLocalStorage = (language: string) => {
  localStorage.setItem(languageKey, language)
}

export const loadLanguageFromLocalStorage = () => {
  return localStorage.getItem(languageKey) || 'hawaiian'
}

// UI Language storage functions
export const saveUILanguageToLocalStorage = (language: string) => {
  localStorage.setItem(uiLanguageKey, language)
}

export const loadUILanguageFromLocalStorage = () => {
  return localStorage.getItem(uiLanguageKey) || 'english'
}

// Word List Language storage functions
export const saveWordListLanguageToLocalStorage = (language: string) => {
  localStorage.setItem(wordListLanguageKey, language)
}

export const loadWordListLanguageFromLocalStorage = () => {
  return localStorage.getItem(wordListLanguageKey) || 'hawaiian'
}
