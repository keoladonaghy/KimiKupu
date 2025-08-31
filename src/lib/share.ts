import { getGuessStatuses } from './statuses'

const webShareApiDeviceTypes: string[] = ['iPhone', 'iPad', 'MacIntel']

const isWebShareApiSupported = (): boolean => {
  return (
    // @ts-ignore
    typeof navigator !== 'undefined' && !!navigator.canShare
  )
}

const isIosSafari = (): boolean =>
  webShareApiDeviceTypes.includes(navigator.platform) ||
  // @ts-ignore
  (navigator.userAgentData &&
    // @ts-ignore
    webShareApiDeviceTypes.includes(navigator.userAgentData.platform))

export const generateEmojiGrid = (guesses: string[][], solution: string, orthography: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess, solution, orthography)
      return guess
        .map((letter, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            default:
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n')
}

export const shareStatus = (
  guesses: string[][],
  lost: boolean,
  isHardMode: boolean,
  isDarkMode: boolean,
  isHighContrastMode: boolean,
  handleShareToClipboard: () => void,
  handleShareFailure: () => void,
  gameNumber: number,
  solution: string,
  orthography: string[]
) => {
  const textToShare = `${
    process.env.REACT_APP_GAME_NAME
  } ${gameNumber} ${lost ? 'X' : guesses.length}/6${
    isHardMode ? '*' : ''
  }\n\n${generateEmojiGrid(guesses, solution, orthography)}`

  const shareData = { text: textToShare }

  let shareSuccess = false

  try {
    if (isWebShareApiSupported()) {
      navigator.share(shareData)
      shareSuccess = true
    }
  } catch (error) {
    shareSuccess = false
  }

  try {
    if (!shareSuccess) {
      if (isIosSafari()) {
        navigator.clipboard.writeText(textToShare)
      } else {
        // @ts-ignore
        navigator.clipboard.writeText(textToShare)
      }
      handleShareToClipboard()
    }
  } catch (error) {
    handleShareFailure()
  }
}