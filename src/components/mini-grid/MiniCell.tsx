import { CharStatus } from '../../lib/statuses'

type Props = {
  value: string
  status: CharStatus
}

export const MiniCell = ({ value, status }: Props) => {
  return (
    <div
      className={`inline-flex items-center justify-center w-6 h-6 border-2 text-xs font-bold uppercase rounded ${
        status === 'correct'
          ? 'bg-green-500 border-green-500 text-white'
          : status === 'present'
          ? 'bg-yellow-500 border-yellow-500 text-white'
          : 'bg-gray-300 border-gray-300 text-black'
      }`}
    >
      {value}
    </div>
  )
}