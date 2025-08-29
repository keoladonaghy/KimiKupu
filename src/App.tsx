import { InformationCircleIcon } from '@heroicons/react/outline'
import { ChartBarIcon } from '@heroicons/react/outline'
import { GlobeIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import { LanguageSelectionModal } from './components/modals/LanguageSelectionModal'
import { WIN_MESSAGES } from './constants/strings'
import { isWordInWordList, getWordOfDay } from './lib/dynamicWords'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  loadLanguageFromLocalStorage,
  saveLanguageToLocalStorage,
} from './lib/localStorage'
import {
  WordListProvider,
  useWordList,
  WordListLanguage,
} from './contexts/WordListContext'

import { CONFIG } from './constants/config'
import ReactGA from 'react-ga'
import '@bcgov/bc-sans/css/BCSans.css'
const ALERT_TIME_MS = 2000

function GameApp() {
  const { currentLanguage: wordListLanguage, error: wordListError } =
    useWordList()
  const [currentGuess, setCurrentGuess] = useState<Array<string>>([])
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(() =>
    loadLanguageFromLocalStorage()
  )
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [successAlert, setSuccessAlert] = useState('')
  const [solution, setSolution] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Load the solution based on current word list language
  useEffect(() => {
    const loadSolution = async () => {
      setIsLoading(true)
      try {
        const wordOfDay = await getWordOfDay(wordListLanguage)
        setSolution(wordOfDay.solution)
      } catch (error) {
        console.error('Failed to load word of day:', error)
        // Fallback to a default word if needed
        setSolution('kōkua')
      } finally {
        setIsLoading(false)
      }
    }

    loadSolution()
  }, [wordListLanguage])

  const [guesses, setGuesses] = useState<string[][]>([])

  // Initialize guesses when solution is loaded
  useEffect(() => {
    if (solution) {
      const loaded = loadGameStateFromLocalStorage()
      if (loaded?.solution !== solution) {
        setGuesses([])
        setCurrentGuess([])
        setIsGameWon(false)
        setIsGameLost(false)
        setSuccessAlert('')
      } else {
        const gameWasWon = loaded.guesses
          .map((guess) => guess.join(''))
          .includes(solution)
        if (gameWasWon) {
          setIsGameWon(true)
        }
        if (loaded.guesses.length === 6 && !gameWasWon) {
          setIsGameLost(true)
        }
        setGuesses(loaded.guesses)
      }
    }
  }, [solution])

  const TRACKING_ID = CONFIG.googleAnalytics // YOUR_OWN_TRACKING_ID

  // Google Analytics initialization: only once
  useEffect(() => {
    if (TRACKING_ID && process.env.NODE_ENV !== 'test') {
      ReactGA.initialize(TRACKING_ID)
      ReactGA.pageview(window.location.pathname)
    }
  }, [TRACKING_ID])

  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    if (solution) {
      saveGameStateToLocalStorage({ guesses, solution })
    }
  }, [guesses, solution])

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
      currentGuess.length < CONFIG.wordLength &&
      guesses.length < CONFIG.tries &&
      !isGameWon
    ) {
      let newGuess = currentGuess.concat([value])
      setCurrentGuess(newGuess)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = async () => {
    if (isGameWon || isGameLost) {
      return
    }
    if (!(currentGuess.length === CONFIG.wordLength)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    // Use dynamic word list checking
    const wordExists = await isWordInWordList(
      currentGuess.join(''),
      wordListLanguage
    )
    if (!wordExists) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }

    const winningWord = solution === currentGuess.join('')

    if (
      currentGuess.length === CONFIG.wordLength &&
      guesses.length < CONFIG.tries &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess([])

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === CONFIG.tries - 1) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    saveLanguageToLocalStorage(language)
  }

  const handleGameLanguageChange = (language: WordListLanguage) => {
    // This will trigger the useEffect to reload the solution
    console.log('Game language changed to:', language)
  }

  if (isLoading) {
    return (
      <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex w-80 mx-auto items-center mb-8 justify-center">
          <h1 className="text-xl font-bold">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mx-auto items-center mb-8">
        <h1 className="text-xl grow font-bold">
          Hulihua - He Nane ‘Ōlelo Hawai‘i
        </h1>
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
      <Grid guesses={guesses} currentGuess={currentGuess} />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
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
        onGameLanguageChange={handleGameLanguageChange}
      />

      {/* Word List Error Alert */}
      {wordListError && (
        <Alert message={wordListError} isOpen={true} variant="warning" />
      )}

      <button
        type="button"
        className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
        onClick={() => setIsAboutModalOpen(true)}
      >
        About this game
      </button>

      <Alert message="Not enough letters" isOpen={isNotEnoughLetters} />
      <Alert message="Word not found" isOpen={isWordNotFoundAlertOpen} />
      <Alert message={`The word was ${solution}`} isOpen={isGameLost} />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
    </div>
  )
}

function App() {
  return (
    <WordListProvider>
      <GameApp />
    </WordListProvider>
  )
}

export default App
