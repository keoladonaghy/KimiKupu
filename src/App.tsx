import { InformationCircleIcon } from '@heroicons/react/outline'
import { ChartBarIcon } from '@heroicons/react/outline'
import { GlobeIcon } from '@heroicons/react/outline'
import { useState, useEffect, useMemo } from 'react'
import ReactGA from 'react-ga'
import '@bcgov/bc-sans/css/BCSans.css'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import { LanguageSelectionModal } from './components/modals/LanguageSelectionModal'
import Header from './Header'
import { WIN_MESSAGES } from './constants/strings'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  loadLanguageFromLocalStorage,
  saveLanguageToLocalStorage,
  loadStatsFromLocalStorage,
  saveStatsToLocalStorage,
} from './lib/localStorage'
import { useLanguage } from './hooks/useLanguage'
import { useInterfaceLanguage } from './hooks/useInterfaceLanguage'
import { useWordLength } from './hooks/useWordLength'
import { validateGuess } from './utils/gameHelpers'
import { getAllLanguageNames } from './languages/registry'

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
  console.log('DEBUG: App started')

  const { wordLength, getMaxAttempts } = useWordLength()

  const getInitialGameLanguage = () => {
    const stored = loadLanguageFromLocalStorage()
    const validGameLanguages = ['hawaiian', 'maori', 'tahitian', 'samoan']

    if (stored && validGameLanguages.includes(stored)) {
      return stored
    }

    return 'hawaiian'
  }

  const {
    languageData,
    loading: gameLoading,
    error: gameError,
    changeLanguage,
    currentLanguage,
  } = useLanguage(getInitialGameLanguage())
  const {
    texts,
    loading: interfaceLoading,
    error: interfaceError,
    changeInterfaceLanguage,
  } = useInterfaceLanguage('english')

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
    gameLanguage: getInitialGameLanguage(),
    wordLength: wordLength, // Use dynamic word length from hook
  })

  // Update gameSettings when wordLength changes
  useEffect(() => {
    setGameSettings((prev) => ({
      ...prev,
      wordLength: wordLength,
    }))
  }, [wordLength])

  const currentConfig = languageData?.config || DEFAULT_CONFIG

  const currentWords = useMemo(() => {
    if (!languageData?.unifiedWords) return languageData?.words || []

    // Filter unified words by current word length, then extract word strings
    return languageData.unifiedWords
      .filter((entry) => entry.word.length === wordLength)
      .map((entry) => entry.word.toLowerCase())
  }, [languageData, wordLength])

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
  const [currentDefinition, setCurrentDefinition] = useState<string>('')
  const [stats, setStats] = useState(
    () =>
      loadStatsFromLocalStorage(selectedLanguage, wordLength) ||
      loadStats(wordLength)
  )

  const getWordOfDay = (words: string[], unifiedWords?: any[]) => {
    const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
    const now = Date.now()
    const msInDay = 86400000
    const index = Math.floor((now - epochMs) / msInDay)
    const solution = words[index % words.length]

    // Try to find the definition from unified words
    let definition = ''
    if (unifiedWords) {
      const wordEntry = unifiedWords.find(
        (entry) => entry.word.toLowerCase() === solution.toLowerCase()
      )
      definition = wordEntry?.definition || ''
    }

    return {
      solution,
      definition,
      solutionIndex: index,
    }
  }

  const isWordInWordList = (word: string) => {
    if (!languageData) return false

    // Check against current length-filtered words
    if (currentWords.includes(word.toLowerCase())) return true

    // Also check against legacy validation system for backwards compatibility
    return validateGuess(word, languageData)
  }

  const isWinningWord = (word: string) => {
    return currentSolution === word
  }

  const handleGameLanguageChange = async (gameLanguage: string) => {
    await changeLanguage(gameLanguage)
    setGameSettings({ gameLanguage, wordLength: wordLength })

    setGuesses([])
    setCurrentGuess([])
    setIsGameWon(false)
    setIsGameLost(false)
  }

  useEffect(() => {
    if (languageData && currentWords.length > 0) {
      const { solution, definition } = getWordOfDay(
        currentWords,
        languageData.unifiedWords
      )
      setCurrentSolution(solution)
      setCurrentDefinition(definition)
    }
  }, [languageData, currentWords])

  useEffect(() => {
    if (languageData && currentWords.length > 0 && currentSolution) {
      const loaded = loadGameStateFromLocalStorage(selectedLanguage, wordLength)
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
  }, [languageData, currentSolution, currentWords, wordLength])

  useEffect(() => {
    if (currentSolution) {
      saveGameStateToLocalStorage(
        { guesses, solution: currentSolution },
        selectedLanguage,
        wordLength
      )
    }
  }, [guesses, currentSolution, wordLength])

  useEffect(() => {
    if (currentConfig.googleAnalytics && process.env.NODE_ENV !== 'test') {
      ReactGA.initialize(currentConfig.googleAnalytics)
      ReactGA.pageview(window.location.pathname)
    }
  }, [currentConfig.googleAnalytics])

  useEffect(() => {
    if (isGameWon || isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
  }, [isGameWon, isGameLost])

  const onChar = (value: string) => {
    const maxAttempts = getMaxAttempts()
    if (
      currentGuess.length < wordLength &&
      guesses.length < maxAttempts &&
      !isGameWon
    ) {
      // Split multi-character inputs like "ng" and "wh" into individual characters
      const chars = value.split('')
      let newGuess = [...currentGuess]

      for (const char of chars) {
        if (newGuess.length < wordLength) {
          newGuess.push(char)
        }
      }

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
    if (!(currentGuess.length === wordLength)) {
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

    const maxAttempts = getMaxAttempts()
    if (
      currentGuess.length === wordLength &&
      guesses.length < maxAttempts &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess([])

      if (winningWord) {
        const newStats = addStatsForCompletedGame(
          stats,
          guesses.length,
          wordLength
        )
        setStats(newStats)
        saveStatsToLocalStorage(newStats, selectedLanguage, wordLength)
        setIsGameWon(true)
        return
      }

      if (guesses.length === maxAttempts - 1) {
        const newStats = addStatsForCompletedGame(
          stats,
          guesses.length + 1,
          wordLength
        )
        setStats(newStats)
        saveStatsToLocalStorage(newStats, selectedLanguage, wordLength)
        setIsGameLost(true)
      }
    }
  }

  const handleLanguageChange = (language: string) => {
    console.log('DEBUG: Full language parameter:', JSON.stringify(language))
    console.log('DEBUG: Language length:', language.length)
    console.log('DEBUG: handleLanguageChange called with:', language)
    setSelectedLanguage(language)
    setStats(
      loadStatsFromLocalStorage(language, wordLength) || loadStats(wordLength)
    )

    const gameLanguages = getAllLanguageNames()
    console.log('DEBUG: Available game languages:', gameLanguages)
    console.log(
      'DEBUG: Is valid game language?',
      gameLanguages.includes(language)
    )

    if (gameLanguages.includes(language)) {
      console.log('DEBUG: Saving to localStorage:', language)
      saveLanguageToLocalStorage(language)
    } else {
      console.log('DEBUG: NOT saving to localStorage - invalid game language')
    }

    changeInterfaceLanguage(language)
  }

  const handleLanguageModalChange = async (
    languageData: any,
    gameLanguage: string,
    wordLength: number
  ) => {
    saveLanguageToLocalStorage(gameLanguage)
    await handleGameLanguageChange(gameLanguage)
  }

  if (gameLoading || interfaceLoading) {
    const loadingText =
      texts?.common?.loading || `Loading ${currentLanguage}...`
    return (
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Header
          languages={[
            'Olelo Hawaii',
            'Reo Maori',
            'Reo Tahiti',
            'Gagana Samoa',
          ]}
          rightText="Tech Workshop"
          gameName="Word Finder"
          icons={[
            { icon: GlobeIcon, onClick: () => setIsLanguageModalOpen(true) },
            {
              icon: InformationCircleIcon,
              onClick: () => setIsInfoModalOpen(true),
            },
            { icon: ChartBarIcon, onClick: () => setIsStatsModalOpen(true) },
          ]}
        />
        <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex w-80 mx-auto items-center mb-8 justify-center">
            <h2 className="text-l font-bold text-white">{loadingText}</h2>
          </div>
        </div>
      </div>
    )
  }

  if (gameError || interfaceError) {
    const errorText = texts?.common?.error || 'Error'
    const error = gameError || interfaceError
    return (
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Header
          languages={[
            'Olelo Hawaii',
            'Reo Maori',
            'Reo Tahiti',
            'Gagana Samoa',
          ]}
          rightText="Tech Workshop"
          gameName="Word Finder"
          icons={[
            { icon: GlobeIcon, onClick: () => setIsLanguageModalOpen(true) },
            {
              icon: InformationCircleIcon,
              onClick: () => setIsInfoModalOpen(true),
            },
            { icon: ChartBarIcon, onClick: () => setIsStatsModalOpen(true) },
          ]}
        />
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex w-80 mx-auto items-center mb-8 justify-center">
            <h2 className="text-l font-bold text-orange-400">
              {errorText}: {error}
            </h2>
          </div>
        </div>
      </div>
    )
  }

  if (!languageData || !texts) {
    return (
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Header
          languages={[
            'Olelo Hawaii',
            'Reo Maori',
            'Reo Tahiti',
            'Gagana Samoa',
          ]}
          rightText="Tech Workshop"
          gameName="Word Finder"
          icons={[
            { icon: GlobeIcon, onClick: () => setIsLanguageModalOpen(true) },
            {
              icon: InformationCircleIcon,
              onClick: () => setIsInfoModalOpen(true),
            },
            { icon: ChartBarIcon, onClick: () => setIsStatsModalOpen(true) },
          ]}
        />
        <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex w-80 mx-auto items-center mb-8 justify-center">
            <h2 className="text-l font-bold text-orange-400">
              No language data available
            </h2>
          </div>
        </div>
      </div>
    )
  }

  const gameTexts = texts.game
  const alertTexts = texts.alerts

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header
        languages={['Olelo Hawaii', 'Reo Maori', 'Reo Tahiti', 'Gagana Samoa']}
        rightText="Tech Workshop"
        gameName="Word Finder"
        icons={[
          { icon: GlobeIcon, onClick: () => setIsLanguageModalOpen(true) },
          {
            icon: InformationCircleIcon,
            onClick: () => setIsInfoModalOpen(true),
          },
          { icon: ChartBarIcon, onClick: () => setIsStatsModalOpen(true) },
        ]}
      />
      <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
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
          definition={currentDefinition}
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
          className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-100 bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
          onClick={() => setIsAboutModalOpen(true)}
        >
          {gameTexts.about}
        </button>
        <Alert
          message={alertTexts.notEnoughLetters}
          isOpen={isNotEnoughLetters}
        />
        <Alert
          message={alertTexts.wordNotFound}
          isOpen={isWordNotFoundAlertOpen}
        />
        <Alert
          message={`${alertTexts.gameLost} ${currentSolution}`}
          isOpen={isGameLost}
        />
        <Alert
          message={successAlert}
          isOpen={successAlert !== ''}
          variant="success"
        />
      </div>
    </div>
  )
}

export default App
