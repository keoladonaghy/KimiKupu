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
import { isWordInWordList, isWinningWord, getWordOfDay } from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  loadLanguageFromLocalStorage,
  saveLanguageToLocalStorage,
} from './lib/localStorage'

import { loadLanguageResources, LanguageResources } from './lib/languageLoader'
import ReactGA from 'react-ga'
import '@bcgov/bc-sans/css/BCSans.css'
const ALERT_TIME_MS = 2000

function App() {
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

  // Language resources state
  const [languageResources, setLanguageResources] =
    useState<LanguageResources | null>(null)
  const [solution, setSolution] = useState<string>('')
  const [solutionIndex, setSolutionIndex] = useState<number>(0)
  const [tomorrow, setTomorrow] = useState<number>(0)

  // Initialize guesses state
  const [guesses, setGuesses] = useState<string[][]>([])
  const [stats, setStats] = useState(() => loadStats())

  // Load language resources on mount and when language changes
  useEffect(() => {
    const loadResources = async () => {
      try {
        const resources = await loadLanguageResources(selectedLanguage)
        setLanguageResources(resources)

        // Get word of day with new resources
        const wordOfDay = getWordOfDay(resources.WORDS)
        setSolution(wordOfDay.solution)
        setSolutionIndex(wordOfDay.solutionIndex)
        setTomorrow(wordOfDay.tomorrow)

        // Reset game state when language changes
        const loaded = loadGameStateFromLocalStorage()
        if (loaded?.solution !== wordOfDay.solution) {
          setGuesses([])
          setIsGameWon(false)
          setIsGameLost(false)
          setCurrentGuess([])
        } else {
          const gameWasWon = loaded.guesses
            .map((guess) => guess.join(''))
            .includes(wordOfDay.solution)
          if (gameWasWon) {
            setIsGameWon(true)
          }
          if (loaded.guesses.length === resources.CONFIG.tries && !gameWasWon) {
            setIsGameLost(true)
          }
          setGuesses(loaded.guesses)
        }
      } catch (error) {
        console.error('Failed to load language resources:', error)
      }
    }

    loadResources()
  }, [selectedLanguage])

  // Google Analytics initialization: only once
  useEffect(() => {
    if (
      languageResources?.CONFIG.googleAnalytics &&
      process.env.NODE_ENV !== 'test'
    ) {
      ReactGA.initialize(languageResources.CONFIG.googleAnalytics)
      ReactGA.pageview(window.location.pathname)
    }
  }, [languageResources?.CONFIG.googleAnalytics])

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

  // Early return if resources not loaded yet
  if (!languageResources) {
    return (
      <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">Loading...</div>
    )
  }

  const onChar = (value: string) => {
    if (
      currentGuess.length < languageResources.CONFIG.wordLength &&
      guesses.length < languageResources.CONFIG.tries &&
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
    if (!(currentGuess.length === languageResources.CONFIG.wordLength)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    if (
      !isWordInWordList(
        currentGuess.join(''),
        languageResources.WORDS,
        languageResources.VALIDGUESSES
      )
    ) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }
    const winningWord = isWinningWord(currentGuess.join(''), solution)

    if (
      currentGuess.length === languageResources.CONFIG.wordLength &&
      guesses.length < languageResources.CONFIG.tries &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess([])

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === languageResources.CONFIG.tries - 1) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    saveLanguageToLocalStorage(language)
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
        config={languageResources.CONFIG}
        solution={solution}
      />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
        orthography={languageResources.ORTHOGRAPHY}
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
        config={languageResources.CONFIG}
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
