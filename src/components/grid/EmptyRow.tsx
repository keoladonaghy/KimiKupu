import { Cell } from './Cell'

type Props = {
  config: any
}

export const EmptyRow = ({ config }: Props) => {
  const emptyCells = Array.from(Array(config.wordLength))

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
