// Import valid guesses from language-specific TypeScript file
import { CONFIG } from './config'
import validGuessesData from './validguesses.haw'

export const VALIDGUESSES = [...validGuessesData]

if (CONFIG.normalization) {
  VALIDGUESSES.forEach((val, i) => {
    VALIDGUESSES[i] = val.normalize(CONFIG.normalization as string)
    VALIDGUESSES[i] = val.replaceAll('\u2018', '\u02bb')
  })
}
