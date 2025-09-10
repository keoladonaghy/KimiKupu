import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'
import { useWordLength } from '../../hooks/useWordLength'

type Props = {
  guesses: string[][]
  currentGuess: string[]
  solution: string
  orthography: string[]
}

export const Grid = ({ guesses, currentGuess, solution, orthography }: Props) => {
  const { wordLength, getMaxAttempts } = useWordLength()
  const maxAttempts = getMaxAttempts() // 5-letter = 6 attempts, 6-letter = 7 attempts
  
  // Calculate empty rows needed before the current guess row
  const empties =
    guesses.length < (maxAttempts - 1) ? Array.from(Array((maxAttempts - 1) - guesses.length)) : []

  // For UI consistency, always show 7 total rows (6-letter uses all 7, 5-letter hides the 7th)
  const totalVisibleRows = guesses.length + (guesses.length < maxAttempts ? 1 : 0) + empties.length
  const needsInvisibleRow = totalVisibleRows < 7

  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          guess={guess}
          solution={solution}
          orthography={orthography}
        />
      ))}
      {guesses.length < maxAttempts && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
      {needsInvisibleRow && (
        <div className="invisible">
          <EmptyRow />
        </div>
      )}
    </div>
  )
}