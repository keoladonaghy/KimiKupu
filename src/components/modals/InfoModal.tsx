import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import { useWordLength } from '../../hooks/useWordLength'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  const { getMaxAttempts } = useWordLength()
  
  return (
    <BaseModal
      title="Pehea e pā'ani ai - How to play"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <p className="text-sm text-gray-500">
        Guess the word in {getMaxAttempts()} tries. After each guess, the color of
        the tiles will change to show how close your guess was to the word.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="L" status="correct" />
        <Cell value="Ā" />
        <Cell value="H" />
        <Cell value="U" />
        <Cell value="I" />
      </div>
      <p className="text-sm text-gray-500">
        The letter L is in the word and in the correct spot.
      </p>
      <div className="flex justify-center mb-1 mt-4">
        <Cell value="A" />
        <Cell value="L" />
        <Cell value="O" status="present" />
        <Cell value="H" />
        <Cell value="A" />
      </div>
      <p className="text-sm text-gray-500">
        The letter O is in the word but in the wrong spot.
      </p>
      <div className="flex justify-center mb-1 mt-4">
        <Cell value="‘" />
        <Cell value="Ā" />
        <Cell value="I" />
        <Cell value="N" status="absent" />
        <Cell value="A" />
      </div>
      <p className="text-sm text-gray-500">
        The letter N is not in the word in any spot.
      </p>
    </BaseModal>
  )
}
