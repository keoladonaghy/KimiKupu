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
  'h',
  'k',
  'l',
  'm',
  'n',
  'p',
  'w',
  'ʻ',
]

if (CONFIG.normalization) {
  ORTHOGRAPHY.forEach(
    (val, i) => (ORTHOGRAPHY[i] = val.normalize(CONFIG.normalization))
  )
}

export default ORTHOGRAPHY
