import { useWordList } from '../contexts/WordListContext'
import { getOrthography } from '../constants/orthographies'

export const useOrthography = (): string[] => {
  const { currentLanguage } = useWordList()
  return getOrthography(currentLanguage)
}