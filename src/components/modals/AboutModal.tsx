import { CONFIG } from '../../constants/config'
import { BaseModal } from './BaseModal'
import { useTranslation } from '../../constants/translations'

type Props = {
  isOpen: boolean
  handleClose: () => void
  language: string
}

export const AboutModal = ({ isOpen, handleClose, language }: Props) => {
  const { t } = useTranslation(language)
  return (
    <BaseModal title={t('modals.about.title')} isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500">
        {t('modals.about.description', { language: CONFIG.language })}{' '}
        <a href={CONFIG.authorWebsite} className="underline font-bold">
          {CONFIG.author}
        </a>{' '}
        - {t('modals.about.checkoutOriginal')}{' '}
        <a
          href="https://github.com/hannahcode/wordle"
          className="underline font-bold"
        >
          {t('modals.about.originalCode')}
        </a>{' '}
        {t('modals.about.by')}{' '}
        <a
          href="https://www.hannahmariepark.com/"
          className="underline font-bold"
        >
          Hannah Park
        </a>{' '}
        {t('modals.about.haveLook')}{' '}
        <a
          href="https://github.com/roedoejet/AnyLanguage-Wordle"
          className="underline font-bold"
        >
          {t('modals.about.forkText')}
        </a>{' '}
        {t('modals.about.customize')}{' '}
        <a href={CONFIG.wordListSourceLink} className="underline font-bold">
          {CONFIG.wordListSource}
        </a>
        . Or,{' '}
        <a
          href="https://www.powerlanguage.co.uk/wordle/"
          className="underline font-bold"
        >
          {t('modals.about.playOriginal')}
        </a>
      </p>
    </BaseModal>
  )
}
