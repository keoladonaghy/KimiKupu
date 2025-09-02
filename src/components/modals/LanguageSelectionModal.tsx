import { useState, useEffect } from 'react'
import { BaseModal } from './BaseModal'
import { getEnabledLanguages } from '../../languages/registry'
import { getEnabledInterfaceLanguages } from '../../languages/interface/interfaceRegistry'
import { useInterfaceLanguage } from '../../hooks/useInterfaceLanguage'

// Get game and interface languages from registries
const getGameLanguages = () => {
  return getEnabledLanguages().map(lang => ({
    value: lang.name,
    label: lang.displayName
  }))
}

const getInterfaceLanguages = () => {
  return getEnabledInterfaceLanguages().map(lang => ({
    value: lang.name,
    label: lang.displayName
  }))
}

const WORD_LENGTHS = [
  { value: 5, label: '5 Letters' },
  { value: 6, label: '6 Letters' },
]

const LANGUAGE_CODE_MAP: { [key: string]: string } = {
  'hawaiian': 'haw',
  'maori': 'mao',
  'tahitian': 'tah',
  'samoan': 'sam',
}

const LOCAL_STORAGE_KEY = 'kimiKupuLanguageSettings'

type LanguageSettings = {
  interfaceLanguage: string
  gameLanguage: string
  wordLength: number
}

type LanguageData = {
  wordlist: any
  config: any
  orthography: any
  validGuesses: any
}

type GameSettings = {
  gameLanguage: string
  wordLength: number
}

type Props = {
  isOpen: boolean
  handleClose: () => void
  selectedLanguage: string
  onLanguageChange: (language: string) => void
  onGameLanguageChange?: (languageData: LanguageData, gameLanguage: string, wordLength: number) => void
  currentSettings?: GameSettings
}

export const LanguageSelectionModal = ({
  isOpen,
  handleClose,
  selectedLanguage,
  onLanguageChange,
  onGameLanguageChange,
  currentSettings,
}: Props) => {
  // Use interface language system
  const { texts, changeInterfaceLanguage, currentLanguage: currentInterfaceLanguage } = useInterfaceLanguage();

  // Load from localStorage or use defaults
  const getInitialSettings = (): LanguageSettings => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {}
    }
    return { 
      interfaceLanguage: currentInterfaceLanguage || 'english', 
      gameLanguage: currentSettings?.gameLanguage || 'hawaiian',
      wordLength: currentSettings?.wordLength || 5
    }
  }

  const [settings, setSettings] = useState<LanguageSettings>(getInitialSettings())
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  // Get language options from registries
  const gameLanguages = getGameLanguages()
  const interfaceLanguages = getInterfaceLanguages()

  // Update settings when props change
  useEffect(() => {
    setSettings(s => ({ 
      ...s, 
      interfaceLanguage: currentInterfaceLanguage,
      gameLanguage: currentSettings?.gameLanguage || s.gameLanguage,
      wordLength: currentSettings?.wordLength || s.wordLength
    }))
  }, [currentInterfaceLanguage, currentSettings])

  const handleInterfaceChange = async (val: string) => {
    setSettings(s => ({ ...s, interfaceLanguage: val }))
    // Change interface language immediately for preview
    await changeInterfaceLanguage(val)
  }

  const handleGameChange = (val: string) => {
    setSettings(s => ({ ...s, gameLanguage: val }))
  }

  const handleWordLengthChange = (val: number) => {
    setSettings(s => ({ ...s, wordLength: val }))
  }

  const loadLanguageFiles = async (gameLanguage: string, wordLength: number): Promise<LanguageData> => {
    const languageCode = LANGUAGE_CODE_MAP[gameLanguage]
    
    if (!languageCode) {
      throw new Error(`Unknown game language: ${gameLanguage}`)
    }

    try {
      const [wordlistModule, configModule, orthographyModule, validGuessesModule] = await Promise.all([
        import(`../../constants/wordlist.${languageCode}${wordLength}.ts`),
        import(`../../constants/config.${languageCode}.ts`),
        import(`../../constants/orthography.${languageCode}.ts`),
        import(`../../constants/validGuesses.${languageCode}${wordLength}.ts`),
      ])

      return {
        wordlist: wordlistModule.default || wordlistModule.WORDS,
        config: configModule.default || configModule.CONFIG,
        orthography: orthographyModule.default,
        validGuesses: validGuessesModule.default || validGuessesModule.VALIDGUESSES,
      }
    } catch (error) {
      console.error(`Failed to load language files for ${gameLanguage} ${wordLength}-letter:`, error)
      throw new Error(`Failed to load ${gameLanguage} ${wordLength}-letter language files`)
    }
  }

  const handleCancel = () => {
    setSettings(getInitialSettings())
    setLoadError(null)
    handleClose()
  }

  const handleOK = async () => {
    setIsLoading(true)
    setLoadError(null)

    try {
      const languageData = await loadLanguageFiles(settings.gameLanguage, settings.wordLength)
      
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings))
      
      onLanguageChange(settings.interfaceLanguage)
      
      if (onGameLanguageChange) {
        onGameLanguageChange(languageData, settings.gameLanguage, settings.wordLength)
      }
      
      handleClose()
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Failed to load language files')
    } finally {
      setIsLoading(false)
    }
  }

  // Use interface texts or fallback to English
  const modalTexts = texts?.modals || {
    settings: 'Game Settings',
    ok: 'OK',
    cancel: 'Cancel',
    close: 'Close'
  }

  const settingsTexts = texts?.settings || {
    interfaceLanguage: 'Interface Language',
    gameLanguage: 'Game Language',
    wordLength: 'Word Length',
    loading: 'Loading...'
  }

  return (
    <BaseModal title={modalTexts.settings} isOpen={isOpen} handleClose={handleCancel}>
      <div className="space-y-6 px-2">
        {/* Interface Language */}
        <div>
          <div className="font-bold mb-2 text-left">{settingsTexts.interfaceLanguage}</div>
          <div className="flex flex-col space-y-2">
            {interfaceLanguages.map(lang => {
              const isDisabled = lang.value === 'maori' || isLoading;
              return (
                <label key={lang.value} className={`flex items-center ${isDisabled && lang.value === 'maori' ? 'opacity-50' : ''}`}>
                  <input
                    type="radio"
                    name="interfaceLanguage"
                    value={lang.value}
                    checked={settings.interfaceLanguage === lang.value}
                    onChange={() => handleInterfaceChange(lang.value)}
                    className="h-4 w-4 text-indigo-600 border-gray-300"
                    disabled={isDisabled}
                  />
                  <span className={`ml-3 text-sm ${isDisabled && lang.value === 'maori' ? 'text-gray-400' : 'text-gray-700'}`}>
                    {lang.label}
                    {lang.value === 'maori' && <span className="text-xs text-gray-400 ml-2">(coming soon)</span>}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
        
        {/* Game Language */}
        <div>
          <div className="font-bold mb-2 text-left">{settingsTexts.gameLanguage}</div>
          <div className="flex flex-col space-y-2">
            {gameLanguages.map(lang => (
              <label key={lang.value} className="flex items-center">
                <input
                  type="radio"
                  name="gameLanguage"
                  value={lang.value}
                  checked={settings.gameLanguage === lang.value}
                  onChange={() => handleGameChange(lang.value)}
                  className="h-4 w-4 text-indigo-600 border-gray-300"
                  disabled={isLoading}
                />
                <span className="ml-3 text-sm text-gray-700">{lang.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Word Length */}
        <div>
          <div className="font-bold mb-2 text-left">{settingsTexts.wordLength}</div>
          <div className="flex flex-col space-y-2">
            {WORD_LENGTHS.map(length => (
              <label key={length.value} className="flex items-center">
                <input
                  type="radio"
                  name="wordLength"
                  value={length.value}
                  checked={settings.wordLength === length.value}
                  onChange={() => handleWordLengthChange(length.value)}
                  className="h-4 w-4 text-indigo-600 border-gray-300"
                  disabled={isLoading}
                />
                <span className="ml-3 text-sm text-gray-700">{length.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Error Display */}
        {loadError && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {loadError}
          </div>
        )}
        
        {/* Mahalo Note */}
        <div className="text-xs text-gray-500 mt-2 text-left">
          Mahalo to Mary Boyce for the Māori word list used in this game.
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col items-stretch mt-6 space-y-2">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {modalTexts.cancel}
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-700 border-2 border-indigo-900 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            onClick={handleOK}
            disabled={isLoading}
          >
            {isLoading ? settingsTexts.loading : modalTexts.ok}
          </button>
        </div>
      </div>
    </BaseModal>
  )
}