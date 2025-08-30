import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[][]
  currentGuess: string[]
  config: any
  solution: string
}

export const Grid = ({ guesses, currentGuess, config, solution }: Props) => {
  const empties =
    guesses.length < config.tries - 1
      ? Array.from(Array(config.tries - 1 - guesses.length))
      : []

  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} solution={solution} />
      ))}
      {guesses.length < config.tries && <CurrentRow guess={currentGuess} config={config} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} config={config} />
      ))}
    </div>
  )
}
