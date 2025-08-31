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
'g',
'l',
'm',
'n',
'p',
's',
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
