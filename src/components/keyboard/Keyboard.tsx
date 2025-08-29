import { KeyValue } from '../../lib/keyboard'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[][]
}

export const Keyboard = ({ onChar, onDelete, onEnter, guesses }: Props) => {
  const { language, orthography, loading } = useLanguage()
  const charStatuses = getStatuses(guesses)

  // Log language, orthography, and loading state changes for debugging
  useEffect(() => {
    console.log('[Keyboard] Language changed:', language)
  }, [language])

  useEffect(() => {
    console.log('[Keyboard] Orthography changed:', orthography)
  }, [orthography])

  useEffect(() => {
    console.log('[Keyboard] Loading state changed:', loading)
  }, [loading])

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

  // Show loading indicator when orthography is being fetched
  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="mt-2 text-sm text-gray-600">Loading keyboard...</p>
      </div>
    )
  }

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
