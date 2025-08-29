import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
  guess: string[]
  solution: string
  orthography: string[]
}

export const CompletedRow = ({ guess, solution, orthography }: Props) => {
  const statuses = getGuessStatuses(guess, solution, orthography)

  return (
    <div className="flex justify-center mb-1">
      {guess.map((letter, i) => (
        <Cell key={i} value={letter} status={statuses[i]} />
      ))}
    </div>
  )
}
