import { useState } from 'react'
import { BaseModal } from './BaseModal'
import { useTranslation } from '../../constants/translations'

type Props = {
  isOpen: boolean
  handleClose: () => void
  selectedLanguage: string
  onLanguageChange: (language: string) => void
  currentLanguage: string
}

export const LanguageSelectionModal = ({
  isOpen,
  handleClose,
  selectedLanguage,
  onLanguageChange,
  currentLanguage,
}: Props) => {
  const [tempSelection, setTempSelection] = useState(selectedLanguage)
  const { t } = useTranslation(currentLanguage)

  const handleCancel = () => {
    setTempSelection(selectedLanguage) // Reset to original selection
    handleClose()
  }

  const handleOK = () => {
    onLanguageChange(tempSelection)
    handleClose()
  }

  return (
    <BaseModal title={t('modals.language.title')} isOpen={isOpen} handleClose={handleCancel}>
      <div className="mt-4">
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="language"
              value="english"
              checked={tempSelection === 'english'}
              onChange={(e) => setTempSelection(e.target.value)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <span className="ml-3 text-sm text-gray-700">{t('modals.language.english')}</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="language"
              value="hawaiian"
              checked={tempSelection === 'hawaiian'}
              onChange={(e) => setTempSelection(e.target.value)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <span className="ml-3 text-sm text-gray-700">{t('modals.language.hawaiian')}</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="language"
              value="maori"
              checked={tempSelection === 'maori'}
              onChange={(e) => setTempSelection(e.target.value)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <span className="ml-3 text-sm text-gray-700">{t('modals.language.maori')}</span>
          </label>
        </div>
        
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={handleCancel}
          >
            {t('modals.language.cancel')}
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleOK}
          >
            {t('modals.language.ok')}
          </button>
        </div>
      </div>
    </BaseModal>
  )
}