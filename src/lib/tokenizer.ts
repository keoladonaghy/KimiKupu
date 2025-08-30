// Create orthography pattern for tokenizing words
export const createOrthographyPattern = (orthography: string[]) => {
  const sortedOrthography = [...orthography].sort((a, b) => b.length - a.length)
  return new RegExp('(' + sortedOrthography.join('|') + ')', 'g')
}

// Default pattern for backwards compatibility - can be updated with the current language
let currentOrthography = ['a', 'ā', 'e', 'ē', 'i', 'ī', 'o', 'ō', 'u', 'ū', 'h', 'k', 'l', 'm', 'n', 'p', 'w', 'ʻ']
export let ORTHOGRAPHY_PATTERN = createOrthographyPattern(currentOrthography)

// Function to update the global pattern when language changes
export const updateOrthographyPattern = (orthography: string[]) => {
  currentOrthography = orthography
  ORTHOGRAPHY_PATTERN = createOrthographyPattern(orthography)
}
