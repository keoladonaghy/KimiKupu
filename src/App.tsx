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
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  loadLanguageFromLocalStorage,
  saveLanguageToLocalStorage,
  loadGameLanguageFromLocalStorage,
  saveGameLanguageToLocalStorage,
} from './lib/localStorage'

import {
  loadLanguageResources,
  getWordOfDay,
  isWordInWordList,
  isWinningWord,
  LanguageResources,
} from './lib/languageResources'
import { updateOrthographyPattern } from './lib/tokenizer'
import ReactGA from 'react-ga'
import '@bcgov/bc-sans/css/BCSans.css'
const ALERT_TIME_MS = 2000

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(() =>
    loadLanguageFromLocalStorage()
  )
  const [gameLanguage, setGameLanguage] = useState(() =>
    loadGameLanguageFromLocalStorage()
  )
  const [languageResources, setLanguageResources] =
    useState<LanguageResources | null>(null)
  const [isResourcesLoading, setIsResourcesLoading] = useState(true)
  const [solution, setSolution] = useState<string>('')
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
  const [guesses, setGuesses] = useState<string[][]>([])

  // Load language resources when game language changes
  useEffect(() => {
    const loadResources = async () => {
      setIsResourcesLoading(true)
      try {
        const resources = await loadLanguageResources(gameLanguage)
        setLanguageResources(resources)

        // Update the global orthography pattern for tokenization
        updateOrthographyPattern(resources.orthography)

        // Get the word of the day for this language
        const { solution: dailySolution } = getWordOfDay(resources.words)
        setSolution(dailySolution)

        // Load game state and check if it's for the current solution
        const loaded = loadGameStateFromLocalStorage()
        if (loaded?.solution !== dailySolution) {
          setGuesses([])
          setIsGameWon(false)
          setIsGameLost(false)
        } else {
          const gameWasWon = loaded.guesses
            .map((guess) => guess.join(''))
            .includes(dailySolution)
          if (gameWasWon) {
            setIsGameWon(true)
          }
          if (loaded.guesses.length === 6 && !gameWasWon) {
            setIsGameLost(true)
          }
          setGuesses(loaded.guesses)
        }
      } catch (error) {
        console.error('Failed to load language resources:', error)
        // Fall back to default language if loading fails
        if (gameLanguage !== 'hawaiian') {
          setGameLanguage('hawaiian')
        }
      } finally {
        setIsResourcesLoading(false)
      }
    }

    loadResources()
  }, [gameLanguage])

  const TRACKING_ID = languageResources?.config.googleAnalytics // YOUR_OWN_TRACKING_ID

  // Google Analytics initialization: only once
  useEffect(() => {
    if (TRACKING_ID && process.env.NODE_ENV !== 'test') {
      ReactGA.initialize(TRACKING_ID)
      ReactGA.pageview(window.location.pathname)
    }
  }, [TRACKING_ID])

  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    if (solution && languageResources) {
      saveGameStateToLocalStorage({ guesses, solution })
    }
  }, [guesses, solution, languageResources])

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
      languageResources &&
      currentGuess.length < languageResources.config.wordLength &&
      guesses.length < languageResources.config.tries &&
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
    if (isGameWon || isGameLost || !languageResources) {
      return
    }
    if (!(currentGuess.length === languageResources.config.wordLength)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    if (
      !isWordInWordList(
        currentGuess.join(''),
        languageResources.words,
        languageResources.validGuesses
      )
    ) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }
    const winningWord = isWinningWord(currentGuess.join(''), solution)

    if (
      currentGuess.length === languageResources.config.wordLength &&
      guesses.length < languageResources.config.tries &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess([])

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === languageResources.config.tries - 1) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    saveLanguageToLocalStorage(language)
  }

  const handleGameLanguageChange = (language: string) => {
    setGameLanguage(language)
    saveGameLanguageToLocalStorage(language)
  }

  // Show loading state while resources are being loaded
  if (isResourcesLoading || !languageResources) {
    return (
      <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading language resources...</div>
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
        orthography={languageResources.orthography}
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
        gameLanguage={gameLanguage}
        onGameLanguageChange={handleGameLanguageChange}
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

export default App
