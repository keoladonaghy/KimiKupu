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

export const saveLanguageToLocalStorage = (language: string) => {
  localStorage.setItem(languageKey, language)
}

export const loadLanguageFromLocalStorage = () => {
  return localStorage.getItem(languageKey) || 'hawaiian'
}

// New localStorage functions for interface and game language
const interfaceLanguageKey = 'interfaceLanguage'
const gameLanguageKey = 'gameLanguage'

export const saveInterfaceLanguageToLocalStorage = (language: string) => {
  localStorage.setItem(interfaceLanguageKey, language)
}

export const loadInterfaceLanguageFromLocalStorage = () => {
  return localStorage.getItem(interfaceLanguageKey) || 'maori'
}

export const saveGameLanguageToLocalStorage = (language: string) => {
  localStorage.setItem(gameLanguageKey, language)
}

export const loadGameLanguageFromLocalStorage = () => {
  return localStorage.getItem(gameLanguageKey) || 'hawaiian'
}
