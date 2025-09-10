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
  'l',
  'm',
  'n',
  'p',
  'w',
  '‘',
]

if (CONFIG.normalization) {
  ORTHOGRAPHY.forEach(
    (val, i) => (ORTHOGRAPHY[i] = val.normalize(CONFIG.normalization))
  )
}

export default ORTHOGRAPHY
