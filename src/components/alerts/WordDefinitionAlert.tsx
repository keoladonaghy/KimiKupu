import { Fragment } from 'react'
import { Transition } from '@headlessui/react'

type Props = {
  isOpen: boolean
  word: string
  definition: string
  onClose: () => void
}

export const WordDefinitionAlert = ({ isOpen, word, definition, onClose }: Props) => {
  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="ease-out duration-300 transition"
      enterFrom="opacity-0 transform translate-y-2"
      enterTo="opacity-100 transform translate-y-0"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100 transform translate-y-0"
      leaveTo="opacity-0 transform translate-y-2"
    >
      <div className="mx-4 my-6 p-4 bg-sky-100 border border-sky-200 rounded-lg shadow-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute bottom-2 right-2 p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded"
        >
          <span className="text-lg">&times;</span>
          <span className="sr-only">Close</span>
        </button>
        
        {/* Word and definition content */}
        <div className="pr-8">
          <div className="text-lg font-bold text-gray-900 mb-1">
            {word}
          </div>
          <div className="text-sm text-gray-700 leading-relaxed">
            {definition}
          </div>
        </div>
      </div>
    </Transition>
  )
}