const gameStateKey = 'gameState'

type StoredGameState = {
  guesses: string[][]
  solution: string
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState, language: string) => {
  const gameStateKeyWithLanguage = `${gameStateKey}_${language}`
  localStorage.setItem(gameStateKeyWithLanguage, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = (language: string) => {
  const gameStateKeyWithLanguage = `${gameStateKey}_${language}`
  const state = localStorage.getItem(gameStateKeyWithLanguage)
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

export type MultiLanguageStats = {
  [language: string]: GameStats
}

export const saveStatsToLocalStorage = (gameStats: GameStats, language: string) => {
  const existingStats = loadAllStatsFromLocalStorage()
  existingStats[language] = gameStats
  localStorage.setItem(gameStatKey, JSON.stringify(existingStats))
}

export const loadStatsFromLocalStorage = (language: string): GameStats | null => {
  const allStats = loadAllStatsFromLocalStorage()
  return allStats[language] || null
}

export const loadAllStatsFromLocalStorage = (): MultiLanguageStats => {
  const stats = localStorage.getItem(gameStatKey)
  return stats ? (JSON.parse(stats) as MultiLanguageStats) : {}
}

const languageKey = 'selectedLanguage'

export const saveLanguageToLocalStorage = (language: string) => {
  localStorage.setItem(languageKey, language)
}

export const loadLanguageFromLocalStorage = () => {
  return localStorage.getItem(languageKey) || 'hawaiian'
}
