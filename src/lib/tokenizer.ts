import { ORTHOGRAPHY } from '../constants/orthography'

export const SORTED_ORTHOGRAPHY = [...ORTHOGRAPHY].sort(
  (a, b) => b.length - a.length
)
export const ORTHOGRAPHY_PATTERN = new RegExp(
  '(' + SORTED_ORTHOGRAPHY.join('|') + ')',
  'g'
)

// Dynamic tokenizer functions that accept orthography as parameter
export const createSortedOrthography = (orthography: string[]) => {
  return [...orthography].sort((a, b) => b.length - a.length)
}

export const createOrthographyPattern = (orthography: string[]) => {
  const sorted = createSortedOrthography(orthography)
  return new RegExp('(' + sorted.join('|') + ')', 'g')
}
