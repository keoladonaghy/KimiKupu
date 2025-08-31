import { getGuessStatuses } from '../../lib/statuses'
import { MiniCell } from './MiniCell'

type Props = {
  guess: string[]
  solution: string
  orthography: string[]
}

export const MiniCompletedRow = ({ guess, solution, orthography }: Props) => {
  const statuses = getGuessStatuses(guess, solution, orthography)

  return (
    <div className="flex justify-center mb-1">
      {guess.map((letter, i) => (
        <MiniCell key={i} value={letter} status={statuses[i]} />
      ))}
    </div>
  )
}