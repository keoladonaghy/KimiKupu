import { useState, useEffect } from 'react'
import { BaseModal } from './BaseModal'

const INTERFACE_LANGUAGES = [
  { value: 'hawaiian', label: 'Hawaiian' },
  { value: 'maori', label: 'Māori (under development)' },
  { value: 'english', label: 'English' },
]

const GAME_LANGUAGES = [
  { value: 'hawaiian', label: 'Hawaiian' },
  { value: 'maori', label: 'Māori' },
]

const LOCAL_STORAGE_KEY = 'kimiKupuLanguageSettings'

type LanguageSettings = {
  interfaceLanguage: string
  gameLanguage: string
}

type Props = {
  isOpen: boolean
  handleClose: () => void
  selectedLanguage: string
  onLanguageChange: (language: string) => void
}

export const LanguageSelectionModal = ({
  isOpen,
  handleClose,
  selectedLanguage,
  onLanguageChange,
}: Props) => {
  // Load from localStorage or use defaults
  const getInitialSettings = (): LanguageSettings => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {}
    }
    return { interfaceLanguage: selectedLanguage || 'maori', gameLanguage: 'hawaiian' }
  }

  const [settings, setSettings] = useState<LanguageSettings>(getInitialSettings())

  // Update settings.interfaceLanguage if selectedLanguage prop changes
  useEffect(() => {
    setSettings(s => ({ ...s, interfaceLanguage: selectedLanguage }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage])

  const handleInterfaceChange = (val: string) => {
    setSettings(s => ({ ...s, interfaceLanguage: val }))
    onLanguageChange(val)
  }

  const handleGameChange = (val: string) => {
    setSettings(s => ({ ...s, gameLanguage: val }))
  }

  const handleCancel = () => {
    setSettings(getInitialSettings()) // reset to last saved
    handleClose()
  }

  const handleOK = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings))
    onLanguageChange(settings.gameLanguage) // Changed to use gameLanguage instead of interfaceLanguage
    handleClose()
  }

  return (
    <BaseModal title="Select Language" isOpen={isOpen} handleClose={handleCancel}>
      <div className="space-y-6 px-2">
        {/* Interface Language */}
        <div>
          <div className="font-bold mb-2 text-left">Interface Language</div>
          <div className="flex flex-col space-y-2">
            {INTERFACE_LANGUAGES.map(lang => (
              <label key={lang.value} className="flex items-center">
                <input
                  type="radio"
                  name="interfaceLanguage"
                  value={lang.value}
                  checked={settings.interfaceLanguage === lang.value}
                  onChange={() => handleInterfaceChange(lang.value)}
                  className="h-4 w-4 text-indigo-600 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">{lang.label}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Game Language */}
        <div>
          <div className="font-bold mb-2 text-left">Game Language</div>
          <div className="flex flex-col space-y-2">
            {GAME_LANGUAGES.map(lang => (
              <label key={lang.value} className="flex items-center">
                <input
                  type="radio"
                  name="gameLanguage"
                  value={lang.value}
                  checked={settings.gameLanguage === lang.value}
                  onChange={() => handleGameChange(lang.value)}
                  className="h-4 w-4 text-indigo-600 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">{lang.label}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Mahalo Note */}
        <div className="text-xs text-gray-500 mt-2 text-left">
          Mahalo to Mary Boyce for the Māori word list used in this game.
        </div>
        {/* Buttons */}
        <div className="flex flex-col items-stretch mt-6 space-y-2">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-700 border-2 border-indigo-900 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleOK}
          >
            OK
          </button>
        </div>
      </div>
    </BaseModal>
  )
}