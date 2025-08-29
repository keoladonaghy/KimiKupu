import { CONFIG } from './config'

// Hawaiian orthography (default)
export const HAWAIIAN_ORTHOGRAPHY = [
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

// Māori orthography (includes ng, wh combinations and 'r', 'g', 't')
export const MAORI_ORTHOGRAPHY = [
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
  'r',
  't',
  'w',
  'g',
]

export const getOrthography = (language: string): string[] => {
  let orthography: string[]
  
  switch (language) {
    case 'maori':
      orthography = [...MAORI_ORTHOGRAPHY]
      break
    case 'hawaiian':
    default:
      orthography = [...HAWAIIAN_ORTHOGRAPHY]
      break
  }

  if (CONFIG.normalization) {
    orthography.forEach(
      (val, i) => (orthography[i] = val.normalize(CONFIG.normalization))
    )
  }

  return orthography
}

// Default to Hawaiian for backward compatibility
export const ORTHOGRAPHY = getOrthography('hawaiian')