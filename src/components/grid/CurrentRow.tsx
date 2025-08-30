import { Cell } from './Cell'

type Props = {
  guess: string[]
  config: any
}

export const CurrentRow = ({ guess, config }: Props) => {
  const splitGuess = guess
  const emptyCells = Array.from(Array(config.wordLength - splitGuess.length))

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
