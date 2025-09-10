import { ReactNode } from 'react'
import classnames from 'classnames'
import { KeyValue } from '../../lib/keyboard'
import { CharStatus } from '../../lib/statuses'

type Props = {
  children?: ReactNode
  value: KeyValue
  width?: number
  status?: CharStatus
  onClick: (value: KeyValue) => void
  isEnter?: boolean
  isDelete?: boolean
}

export const Key = ({
  children,
  status,
  width = 40,
  value,
  onClick,
  isEnter = false,
  isDelete = false,
}: Props) => {
  const classes = classnames(
    'flex items-center justify-center rounded mx-0.5 text-xl font-bold cursor-pointer select-none',
    {
      'bg-slate-200 hover:bg-slate-300 active:bg-slate-400': !status && !isEnter && !isDelete,
      'bg-slate-400 text-white': status === 'absent',
      'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white':
        status === 'correct',
      'bg-yellow-400 hover:bg-yellow-600 active:bg-yellow-700 text-white':
        status === 'present',
      'bg-green-200 hover:bg-green-300 active:bg-green-400 text-gray-800': isEnter,
      'bg-red-200 hover:bg-red-300 active:bg-red-400 text-gray-800': isDelete,
    }
  )

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  return (
    <button
      style={{ width: `${width}px`, height: '58px' }}
      className={classes}
      onClick={handleClick}
    >
      {children || value}
    </button>
  )
}
