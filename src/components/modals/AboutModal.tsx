import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  config: {
    language: string
    author: string
    authorWebsite: string
    wordListSource: string
    wordListSourceLink: string
  }
}

export const AboutModal = ({ isOpen, handleClose, config }: Props) => {
  return (
    <BaseModal title="No Kēia Nane Hua‘ōlelo" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500">
        This is an open source clone of the game Wordle adapted to{' '}
        {config.language} by{' '}
        <a href={config.authorWebsite} className="underline font-bold">
          {config.author}
        </a>{' '}
        - check out{' '}
        <a
          href="https://github.com/hannahcode/wordle"
          className="underline font-bold"
        >
          the original code
        </a>{' '}
        by{' '}
        <a
          href="https://www.hannahmariepark.com/"
          className="underline font-bold"
        >
          Hannah Park
        </a>{' '}
        or have a look at{' '}
        <a
          href="https://github.com/roedoejet/AnyLanguage-Wordle"
          className="underline font-bold"
        >
          Aidan Pine's fork
        </a>{' '}
        and customize it for another language! The words for this Wordle were
        sourced from{' '}
        <a href={config.wordListSourceLink} className="underline font-bold">
          {config.wordListSource}
        </a>
        . Or,
        {' you can also '}
        <a
          href="https://www.powerlanguage.co.uk/wordle/"
          className="underline font-bold"
        >
          play the original here
        </a>
      </p>
    </BaseModal>
  )
}
