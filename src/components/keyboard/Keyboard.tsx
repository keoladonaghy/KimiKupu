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
  
  const topRowEnd = Math.floor(orthography.length * 0.4)
  const middleRowEnd = Math.floor(orthography.length * 0.7)

  return (
    <div>
      {/* Top row: First 40% of characters + DELETE (red) */}
      <div className="flex justify-center mb-1">
        {nonOkinaChars.slice(0, topRowEnd).map(
          (char) => (
            <Key key={char} value={char.toUpperCase()} onClick={onClick} status={charStatuses[char.toUpperCase()]} />
          )
        )}
        <Key width={65.4} value="DELETE" onClick={onClick} isDelete>
          Delete
        </Key>
      </div>
      
      {/* Middle row: Next 30% of characters + 'okina (offset/shorter) */}
      <div className="flex justify-center mb-1">
        {nonOkinaChars.slice(topRowEnd, middleRowEnd).map((char) => (
          <Key key={char} value={char.toUpperCase()} onClick={onClick} status={charStatuses[char.toUpperCase()]} />
        ))}
        {okinaChar && (
          <Key key={okinaChar} value={okinaChar.toUpperCase()} onClick={onClick} status={charStatuses[okinaChar.toUpperCase()]} />
        )}
      </div>
      
      {/* Bottom row: Remaining characters + ENTER (green) */}
      <div className="flex justify-center">
        {nonOkinaChars.slice(middleRowEnd).map((char) => (
          <Key key={char} value={char.toUpperCase()} onClick={onClick} status={charStatuses[char.toUpperCase()]} />
        ))}
        <Key width={65.4} value="ENTER" onClick={onClick} isEnter>
          Enter
        </Key>
      </div>
    </div>
  )
}