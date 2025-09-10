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
  'h',
  'k',
  'm',
  'n',
  'ng',  
  'p',
  'r',
  't',
  'w',
  'wh',
]

if (CONFIG.normalization) {
  ORTHOGRAPHY.forEach(
    (val, i) => (ORTHOGRAPHY[i] = val.normalize(CONFIG.normalization))
  )
}

export default ORTHOGRAPHY
