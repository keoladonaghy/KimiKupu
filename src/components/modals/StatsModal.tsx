import { GameStats } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { MiniGrid } from '../mini-grid/MiniGrid'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[][]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  handleShare: () => void
  solution: string
  orthography: string[]
  definition?: string
}

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShare,
  solution,
  orthography,
  definition,
}: Props) => {
  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title="Statistics"
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <div className="columns-1 justify-left m-2 text-sm text-gray-500">
          <div>No games played yet.</div>
        </div>
      </BaseModal>
    )
  }

  return (
    <BaseModal
      title="Statistics"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className="columns-4 justify-left m-2 text-sm text-gray-500">
        <div>
          <div className="text-3xl font-bold text-center text-gray-900">
            {gameStats.totalGames}
          </div>
          <div className="text-center">Total tries</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-center text-gray-900">
            {Math.round(gameStats.successRate)}
          </div>
          <div className="text-center">Success rate</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-center text-gray-900">
            {gameStats.currentStreak}
          </div>
          <div className="text-center">Current streak</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-center text-gray-900">
            {gameStats.bestStreak}
          </div>
          <div className="text-center">Best streak</div>
        </div>
      </div>
      
      {/* Word Definition Section */}
      {(isGameLost || isGameWon) && definition && (
        <div className="mt-4 mb-4 p-4 bg-sky-50 border border-sky-200 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900 mb-2">
              {solution}
            </div>
            <div className="text-sm text-gray-700 leading-relaxed">
              {definition}
            </div>
          </div>
        </div>
      )}
      
      {(isGameLost || isGameWon) && (
        <div className="mt-5 sm:mt-6 columns-3 text-sm text-gray-500">
          <div>
            <div className="text-lg font-medium text-gray-900">Guess Distribution</div>
            <div className="columns-1 justify-left m-2 text-sm text-gray-500">
              {gameStats.winDistribution.map((value, i) => (
                <div key={i} className="flex justify-between">
                  <div className="text-gray-900">{i + 1}</div>
                  <div className="w-full">
                    <div 
                      className="bg-gray-300 h-5 rounded text-xs text-center text-white leading-5"
                      style={{
                        width: gameStats.totalGames ? `${Math.round((value / gameStats.totalGames) * 100)}%` : '0%'
                      }}
                    >
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-sm">
            <MiniGrid guesses={guesses} />
          </div>
          <div>
            <button
              type="button"
              className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => {
                shareStatus(
                  guesses,
                  isGameLost,
                  false, // isHardMode
                  false, // isDarkMode
                  false, // isHighContrastMode
                  handleShare,
                  () => {}, // handleShareFailure
                  1, // gameNumber
                  solution,
                  orthography
                )
                handleShare()
              }}
            >
              Share
            </button>
          </div>
        </div>
      )}
    </BaseModal>
  )
}