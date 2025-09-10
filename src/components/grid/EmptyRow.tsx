import { Cell } from './Cell'
import { useWordLength } from '../../hooks/useWordLength'

export const EmptyRow = () => {
  const { wordLength } = useWordLength()
  const emptyCells = Array.from(Array(wordLength))

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
