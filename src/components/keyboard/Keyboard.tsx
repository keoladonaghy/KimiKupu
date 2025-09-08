import { KeyValue } from '../../lib/keyboard';
import { getStatuses } from '../../lib/statuses';
import { Key } from './Key';
import { useEffect } from 'react';

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
      onChar(value.toLowerCase())
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  // Split orthography characters, keeping 'okina separate for positioning
  const okinaChar = orthography.find(char => char === 'ʻ' || char === "'")
  const nonOkinaChars = orthography.filter(char => char !== 'ʻ' && char !== "'")
  
  // Rebalanced: 7 chars + delete = 8 top, 7 middle (including 'okina), rest bottom
  const topRowEnd = 7 // 7 chars + delete = 8 keys total
  const middleRowEnd = topRowEnd + 6 // 6 chars + 'okina = 7 keys total

  return (
    <div>
      {/* Top row: 7 characters + DELETE = 8 keys total */}
      <div className="flex justify-center mb-1">
        {nonOkinaChars.slice(0, topRowEnd).map(
          (char) => (
            <Key key={char} value={char.toUpperCase()} onClick={onClick} status={charStatuses[char.toUpperCase()]} />
          )
        )}
        <Key value="DELETE" onClick={onClick} isDelete>
          <span className="font-bold">←</span>
        </Key>
      </div>
      
      {/* Middle row: 6 characters + 'okina = 7 keys total (offset/shorter) */}
      <div className="flex justify-center mb-1">
        {nonOkinaChars.slice(topRowEnd, middleRowEnd).map((char) => (
          <Key key={char} value={char.toUpperCase()} onClick={onClick} status={charStatuses[char.toUpperCase()]} />
        ))}
        {okinaChar && (
          <Key key={okinaChar} value={okinaChar.toUpperCase()} onClick={onClick} status={charStatuses[okinaChar.toUpperCase()]} />
        )}
      </div>
      
      {/* Bottom row: Remaining characters + ENTER */}
      <div className="flex justify-center">
        {nonOkinaChars.slice(middleRowEnd).map((char) => (
          <Key key={char} value={char.toUpperCase()} onClick={onClick} status={charStatuses[char.toUpperCase()]} />
        ))}
        <Key value="ENTER" onClick={onClick} isEnter>
          <span className="font-bold">↵</span>
        </Key>
      </div>
    </div>
  )
}