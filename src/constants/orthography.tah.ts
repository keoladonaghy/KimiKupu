import { CONFIG } from './config'

const ORTHOGRAPHY = [
  'a',
  'ā',
  'e',
  'ē',
  'i',
  'ī',
  'o',
  'ō',
  'u',
  'ū',
  'f',
  'h',
  'm',
  'n',
  'p',
  'r',
  't',
  'v',
  'ʻ',
]

if (CONFIG.normalization) {
  ORTHOGRAPHY.forEach(
    (val, i) => (ORTHOGRAPHY[i] = val.normalize(CONFIG.normalization))
  )
}

export default ORTHOGRAPHY
