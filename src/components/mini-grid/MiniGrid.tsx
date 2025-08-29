import { MiniCompletedRow } from './MiniCompletedRow'

type Props = {
  guesses: string[][]
  solution: string
  orthography: string[]
}

export const MiniGrid = ({ guesses, solution, orthography }: Props) => {
  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <MiniCompletedRow key={i} guess={guess} solution={solution} orthography={orthography} />
      ))}
    </div>
  )
}
