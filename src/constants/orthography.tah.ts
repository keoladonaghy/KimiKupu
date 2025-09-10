import { CONFIG } from './config'

const ORTHOGRAPHY = [
  'a',
  'e',
  'i',
  'o',
  'u',
  'ā',
  'ē',
  'ī',
  'ō',
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
