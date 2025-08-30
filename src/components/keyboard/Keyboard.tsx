import { KeyValue } from '../../lib/keyboard'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[][]
  orthography: string[]
  solution: string
}

export const Keyboard = ({ onChar, onDelete, onEnter, guesses, orthography, solution }: Props) => {
  const charStatuses = getStatuses(guesses, solution, orthography)

  const onClick = (value: KeyValue) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      }
      // Take away key event listener for now
      // else {
      //   const key = e.key.toUpperCase()
      //   if (key.length === 1 && key >= 'A' && key <= 'Z') {
      //     onChar(key)
      //   }
      // }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div>
      <div className="flex justify-center mb-1">
        {orthography.slice(0, Math.floor(orthography.length * 0.4)).map(
          (char) => (
            <Key key={char} value={char} onClick={onClick} status={charStatuses[char]} />
          )
        )}
      </div>
      <div className="flex justify-center mb-1">
        {orthography.slice(
          Math.floor(orthography.length * 0.4),
          Math.floor(orthography.length * 0.7)
        ).map((char) => (
          <Key key={char} value={char} onClick={onClick} status={charStatuses[char]} />
        ))}
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          Enter
        </Key>
        {orthography.slice(
          Math.floor(orthography.length * 0.7),
          orthography.length
        ).map((char) => (
          <Key key={char} value={char} onClick={onClick} status={charStatuses[char]} />
        ))}
        <Key width={65.4} value="DELETE" onClick={onClick}>
          Delete
        </Key>
      </div>
    </div>
  )
}
