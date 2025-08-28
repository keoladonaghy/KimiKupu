import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import { CONFIG } from '../../constants/config'
import { useTranslation } from '../../constants/translations'

type Props = {
  isOpen: boolean
  handleClose: () => void
  language: string
}

export const InfoModal = ({ isOpen, handleClose, language }: Props) => {
  const { t } = useTranslation(language)
  return (
    <BaseModal
      title={t('modals.info.title')}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <p className="text-sm text-gray-500">
        {t('modals.info.description', { tries: CONFIG.tries })}
        {t('modals.info.description', { tries: CONFIG.tries })}
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="L" status="correct" />
        <Cell value="Ā" />
        <Cell value="H" />
        <Cell value="U" />
        <Cell value="I" />
      </div>
      <p className="text-sm text-gray-500">
        {t('modals.info.correctExample')}
      </p>
      <div className="flex justify-center mb-1 mt-4">
        <Cell value="A" />
        <Cell value="L" />
        <Cell value="O" status="present" />
        <Cell value="H" />
        <Cell value="A" />
      </div>
      <p className="text-sm text-gray-500">
        {t('modals.info.presentExample')}
      </p>
      <div className="flex justify-center mb-1 mt-4">
        <Cell value="‘" />
        <Cell value="Ā" />
        <Cell value="I" />
        <Cell value="N" status="absent" />
        <Cell value="A" />
      </div>
      <p className="text-sm text-gray-500">
        {t('modals.info.absentExample')}
      </p>
    </BaseModal>
  )
}
