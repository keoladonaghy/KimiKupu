import Countdown from 'react-countdown'
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { solution, tomorrow } from '../../lib/words'
import { BaseModal } from './BaseModal'
import { useTranslation } from '../../constants/translations'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[][]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  handleShare: () => void
  language: string
}

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShare,
  language,
}: Props) => {
  const { t } = useTranslation(language)
  
  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal title={t('modals.stats.title')} isOpen={isOpen} handleClose={handleClose}>
        <StatBar gameStats={gameStats} />
      </BaseModal>
    )
  }
  return (
    <BaseModal title={t('modals.stats.title')} isOpen={isOpen} handleClose={handleClose}>
      <StatBar gameStats={gameStats} />
      <h4 className="text-lg leading-6 font-medium text-gray-900">
        {t('modals.stats.guessDistribution')}
      </h4>
      <Histogram gameStats={gameStats} />
      {(isGameLost || isGameWon) && (
        <div className="mt-5 sm:mt-6 columns-3">
          <div>
            <a
              className="underline font-medium"
              href={
                'http://wehewehe.org/gsdl2.85/cgi-bin/hdict?a=q&q=' +
                solution +
                '&fqv=textpukuielbert&af=1&fqf=ED'
              }
            >
              {t('modals.stats.seeDefinition')} {solution}
            </a>
          </div>
          <div className="text-lg font-medium text-gray-900">
            <b>{t('modals.stats.newWordIn')} </b>
            <Countdown date={tomorrow} daysInHours={true} />
          </div>
          <button
            type="button"
            className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            onClick={() => {
              shareStatus(guesses, isGameLost)
              handleShare()
            }}
          >
            {t('modals.stats.share')}
          </button>
        </div>
      )}
    </BaseModal>
  )
}
