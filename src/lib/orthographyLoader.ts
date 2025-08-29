// Dynamic orthography loader based on language
export const loadOrthography = async (language: string): Promise<string[]> => {
  try {
    let orthographyModule
    
    switch (language) {
      case 'hawaiian':
        orthographyModule = await import('../constants/orthography.haw')
        break
      case 'maori':
        orthographyModule = await import('../constants/orthography.mao')
        break
      case 'tahitian':
        orthographyModule = await import('../constants/orthography.tah')
        break
      default:
        // Default to Hawaiian orthography
        orthographyModule = await import('../constants/orthography.haw')
        break
    }
    
    return orthographyModule.ORTHOGRAPHY
  } catch (error) {
    console.error(`Failed to load orthography for language: ${language}`, error)
    // Fallback to default orthography
    const defaultModule = await import('../constants/orthography')
    return defaultModule.ORTHOGRAPHY
  }
}