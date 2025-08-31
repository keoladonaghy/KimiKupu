import { InformationCircleIcon } from '@heroicons/react/outline'
import { ChartBarIcon } from '@heroicons/react/outline'
import { GlobeIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import ReactGA from 'react-ga'
import '@bcgov/bc-sans/css/BCSans.css'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import { LanguageSelectionModal } from './components/modals/LanguageSelectionModal'
import { WIN_MESSAGES } from './constants/strings'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  loadLanguageFromLocalStorage,
  saveLanguageToLocalStorage,
} from './lib/localStorage'
import { useLanguage } from './hooks/useLanguage'
import { validateGuess } from './utils/gameHelpers'

const DEFAULT_CONFIG = {
  wordLength: 5,
  tries: 6,
  language: 'Hawaiian',
  googleAnalytics: '',
}

const ALERT_TIME_MS = 2000

type GameSettings = {
  gameLanguage: string
  wordLength: number
}

function App() {
  const { languageData, loading, error, changeLanguage, currentLanguage } =
    useLanguage('hawaiian')

  const [currentGuess, setCurrentGuess] = useState<Array<string>>([])
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [guesses, setGuesses] = useState<string[][]>([])

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)

  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [successAlert, setSuccessAlert] = useState('')

  const [selectedLanguage, setSelectedLanguage] = useState(() =>
    loadLanguageFromLocalStorage()
  )
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    gameLanguage: 'hawaiian',
    wordLength: 5,
  })

  // Derived from languageData
  const currentConfig = languageData?.config || DEFAULT_CONFIG
  const currentWords = languageData?.words || []
  const currentValidGuesses = languageData?.validGuesses || []
  const currentOrthography = languageData?.orthography || [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ]

  const [currentSolution, setCurrentSolution] = useState<string>('')
  const [stats, setStats] = useState(() => loadStats())

  const getWordOfDay = (words: string[]) => {
    const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
    const now = Date.now()
    const msInDay = 86400000
    const index = Math.floor((now - epochMs) / msInDay)
    return {
      solution: words[index % words.length],
      solutionIndex: index,
    }
  }

  const isWordInWordList = (word: string) => {
    return languageData ? validateGuess(word, languageData) : false
  }

  const isWinningWord = (word: string) => {
    return currentSolution === word
  }

  const handleGameLanguageChange = async (gameLanguage: string) => {
    await changeLanguage(gameLanguage)
    setGameSettings({ gameLanguage, wordLength: 5 })

    // Reset game state
    setGuesses([])
    setCurrentGuess([])
    setIsGameWon(false)
    setIsGameLost(false)
  }

  // Set solution when language data changes
  useEffect(() => {
    if (languageData && currentWords.length > 0) {
      const { solution } = getWordOfDay(currentWords)
      setCurrentSolution(solution)
    }
  }, [languageData, currentWords])

  useEffect(() => {
    if (languageData && currentWords.length > 0 && currentSolution) {
      const loaded = loadGameStateFromLocalStorage()
      if (loaded?.solution !== currentSolution) {
        setGuesses([])
        setIsGameWon(false)
        setIsGameLost(false)
        return
      }

      const gameWasWon = loaded.guesses
        .map((guess) => guess.join(''))
        .includes(currentSolution)

      if (gameWasWon) {
        setIsGameWon(true)
      }

      if (loaded.guesses.length === currentConfig.tries && !gameWasWon) {
        setIsGameLost(true)
      }

      setGuesses(loaded.guesses)
    }
  }, [languageData, currentSolution, currentWords, currentConfig.tries])

  useEffect(() => {
    if (currentSolution) {
      saveGameStateToLocalStorage({ guesses, solution: currentSolution })
    }
  }, [guesses, currentSolution])

  useEffect(() => {
    if (currentConfig.googleAnalytics && process.env.NODE_ENV !== 'test') {
      ReactGA.initialize(currentConfig.googleAnalytics)
      ReactGA.pageview(window.location.pathname)
    }
  }, [currentConfig.googleAnalytics])

  useEffect(() => {
    if (isGameWon) {
      setSuccessAlert(
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      )
      setTimeout(() => {
        setSuccessAlert('')
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
  }, [isGameWon, isGameLost])

  const onChar = (value: string) => {
    if (
      currentGuess.length < currentConfig.wordLength &&
      guesses.length < currentConfig.tries &&
      !isGameWon
    ) {
      let newGuess = currentGuess.concat([value])
      setCurrentGuess(newGuess)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }
    if (!(currentGuess.length === currentConfig.wordLength)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    const guessWord = currentGuess.join('')

    if (!isWordInWordList(guessWord)) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }

    const winningWord = isWinningWord(guessWord)

    if (
      currentGuess.length === currentConfig.wordLength &&
      guesses.length < currentConfig.tries &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess([])

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === currentConfig.tries - 1) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    saveLanguageToLocalStorage(language)
  }

  const handleLanguageModalChange = async (
    languageData: any,
    gameLanguage: string,
    wordLength: number
  ) => {
    await handleGameLanguageChange(gameLanguage)
  }

  if (loading) {
    return (
      <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex w-80 mx-auto items-center mb-8 justify-center">
          <h2 className="text-l font-bold">Loading {currentLanguage}...</h2>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex w-80 mx-auto items-center mb-8 justify-center">
          <h2 className="text-l font-bold text-red-600">Error: {error}</h2>
        </div>
      </div>
    )
  }

  if (!languageData) {
    return (
      <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex w-80 mx-auto items-center mb-8 justify-center">
          <h2 className="text-l font-bold">No language data available</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mx-auto items-center mb-8">
        <h2 className="text-l grow font-bold">Reo Moana Puzzle</h2>
        <GlobeIcon
          className="h-6 w-6 cursor-pointer mr-1"
          onClick={() => setIsLanguageModalOpen(true)}
        />
        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer mr-1"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <ChartBarIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsStatsModalOpen(true)}
        />
      </div>
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        solution={currentSolution}
        orthography={currentOrthography}
      />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
        orthography={currentOrthography}
        solution={currentSolution}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        handleShare={() => {
          setSuccessAlert('Game copied to clipboard')
          return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
        }}
        solution={currentSolution}
        orthography={currentOrthography}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />
      <LanguageSelectionModal
        isOpen={isLanguageModalOpen}
        handleClose={() => setIsLanguageModalOpen(false)}
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        onGameLanguageChange={handleLanguageModalChange}
        currentSettings={gameSettings}
      />

      <button
        type="button"
        className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
        onClick={() => setIsAboutModalOpen(true)}
      >
        About this game
      </button>

      <Alert message="Not enough letters" isOpen={isNotEnoughLetters} />
      <Alert message="Word not found" isOpen={isWordNotFoundAlertOpen} />
      <Alert message={`The word was ${currentSolution}`} isOpen={isGameLost} />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
    </div>
  )
}

export default App
