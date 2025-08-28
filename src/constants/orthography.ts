// Import orthography from language-specific JSON file
import { CONFIG } from './config'
import orthographyData from './orthography.haw.json';

export const ORTHOGRAPHY = [...orthographyData];

if (CONFIG.normalization) {
  ORTHOGRAPHY.forEach(
    (val, i) => (ORTHOGRAPHY[i] = val.normalize(CONFIG.normalization as string))
  )
}
