import { InformationCircleIcon } from '@heroicons/react/outline'
import { ChartBarIcon } from '@heroicons/react/outline'
import { GlobeIcon } from '@heroicons/react/outline'
import { useState, useEffect, useMemo } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import { LanguageSelectionModal } from './components/modals/LanguageSelectionModal'
import { WIN_MESSAGES } from './constants/strings'
import { isWordInWordList, isWinningWord, getWordOfDay } from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import ReactGA from 'react-ga'
import '@bcgov/bc-sans/css/BCSans.css'

const ALERT_TIME_MS = 2000

function AppContent() {
  const { currentLanguage, resources, changeLanguage } = useLanguage()

  // Calculate current solution based on selected language
  const { solution, solutionIndex, tomorrow } = useMemo(() => {
    return getWordOfDay(resources)
  }, [resources])

  const [currentGuess, setCurrentGuess] = useState<Array<string>>([])
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [successAlert, setSuccessAlert] = useState('')
  const [guesses, setGuesses] = useState<string[][]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = loaded.guesses
      .map((guess) => guess.join(''))
      .includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === 6 && !gameWasWon) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })

  const TRACKING_ID = resources.config.googleAnalytics // YOUR_OWN_TRACKING_ID

  // Google Analytics initialization: only once
  useEffect(() => {
    if (TRACKING_ID && process.env.NODE_ENV !== 'test') {
      ReactGA.initialize(TRACKING_ID)
      ReactGA.pageview(window.location.pathname)
    }
  }, [TRACKING_ID])

  const [stats, setStats] = useState(() => loadStats())

  // Reset game state when solution changes (language change)
  useEffect(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      // Reset game state for new language
      setGuesses([])
      setCurrentGuess([])
      setIsGameWon(false)
      setIsGameLost(false)
      setSuccessAlert('')
    }
  }, [solution])

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
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
      currentGuess.length < resources.config.wordLength &&
      guesses.length < resources.config.tries &&
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
    if (!(currentGuess.length === resources.config.wordLength)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    if (!isWordInWordList(currentGuess.join(''), resources)) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }
    const winningWord = isWinningWord(currentGuess.join(''), solution)

    if (
      currentGuess.length === resources.config.wordLength &&
      guesses.length < resources.config.tries &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess([])

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === resources.config.tries - 1) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
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
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        solution={solution}
        config={resources.config}
      />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
        orthography={resources.orthography}
        solution={solution}
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
        solution={solution}
        tomorrow={tomorrow}
        solutionIndex={solutionIndex}
        tries={resources.config.tries}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
        config={resources.config}
      />
      <LanguageSelectionModal
        isOpen={isLanguageModalOpen}
        handleClose={() => setIsLanguageModalOpen(false)}
        selectedLanguage={currentLanguage}
        onLanguageChange={changeLanguage}
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
      <Alert message={`The word was ${solution}`} isOpen={isGameLost} />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
    </div>
  )
}

// Game reset callback to handle state reset when language changes
const handleGameReset = () => {
  // This will be handled by the useEffect in AppContent that listens to solution changes
}

function App() {
  return (
    <LanguageProvider onGameReset={handleGameReset}>
      <AppContent />
    </LanguageProvider>
  )
}

export default App
