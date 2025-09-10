import { Cell } from './Cell'
import { useWordLength } from '../../hooks/useWordLength'

type Props = {
  guess: string[]
}

export const CurrentRow = ({ guess }: Props) => {
  const { wordLength } = useWordLength()
  const splitGuess = guess
  const emptyCells = Array.from(Array(wordLength - splitGuess.length))

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
