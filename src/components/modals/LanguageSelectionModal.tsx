import { useState } from 'react'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  selectedLanguage: string
  onLanguageChange: (language: string) => void
  uiLanguage: string
  onUILanguageChange: (language: string) => void
  wordListLanguage: string
  onWordListLanguageChange: (language: string) => void
}

export const LanguageSelectionModal = ({
  isOpen,
  handleClose,
  selectedLanguage,
  onLanguageChange,
  uiLanguage,
  onUILanguageChange,
  wordListLanguage,
  onWordListLanguageChange,
}: Props) => {
  const [tempUISelection, setTempUISelection] = useState(uiLanguage)
  const [tempWordListSelection, setTempWordListSelection] =
    useState(wordListLanguage)

  const handleCancel = () => {
    // Reset to original selections
    setTempUISelection(uiLanguage)
    setTempWordListSelection(wordListLanguage)
    handleClose()
  }

  const handleOK = () => {
    // Apply both selections
    onUILanguageChange(tempUISelection)
    onWordListLanguageChange(tempWordListSelection)
    handleClose()
  }

  return (
    <BaseModal
      title="Language Settings"
      isOpen={isOpen}
      handleClose={handleCancel}
    >
      <div className="mt-4 space-y-6">
        {/* User Interface Language Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            User Interface Language
          </h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="uiLanguage"
                value="english"
                checked={tempUISelection === 'english'}
                onChange={(e) => setTempUISelection(e.target.value)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <span className="ml-3 text-sm text-gray-700">English</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="uiLanguage"
                value="hawaiian"
                checked={tempUISelection === 'hawaiian'}
                onChange={(e) => setTempUISelection(e.target.value)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <span className="ml-3 text-sm text-gray-700">Ōlelo Hawai'i</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="uiLanguage"
                value="maori"
                checked={tempUISelection === 'maori'}
                onChange={(e) => setTempUISelection(e.target.value)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <span className="ml-3 text-sm text-gray-700">
                Te Reo Māori (under development)
              </span>
            </label>
          </div>
        </div>

        {/* Word List Language Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Word List Language
          </h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="wordListLanguage"
                value="hawaiian"
                checked={tempWordListSelection === 'hawaiian'}
                onChange={(e) => setTempWordListSelection(e.target.value)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <span className="ml-3 text-sm text-gray-700">Ōlelo Hawai'i</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="wordListLanguage"
                value="maori"
                checked={tempWordListSelection === 'maori'}
                onChange={(e) => setTempWordListSelection(e.target.value)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <span className="ml-3 text-sm text-gray-700">Te Reo Māori</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 border-2 border-indigo-600 rounded-md hover:bg-indigo-700 hover:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleOK}
          >
            OK
          </button>
        </div>
      </div>
    </BaseModal>
  )
}
