// Import wordlist from language-specific TypeScript file
import { CONFIG } from './config'
import wordlistData from './wordlist.haw'

export const WORDS = [...wordlistData]

if (CONFIG.normalization) {
  WORDS.forEach((val, i) => {
    WORDS[i] = val.normalize(CONFIG.normalization as string)
    WORDS[i] = WORDS[i].replaceAll('\u2018', '\u02bb').replaceAll("'", '\u02bb')
  })
}

function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

if (CONFIG.shuffle) {
  shuffle(WORDS)
}
