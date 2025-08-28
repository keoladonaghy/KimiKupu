// Import orthography from language-specific TypeScript file
import { CONFIG } from './config'
import orthographyData from './orthography.haw';

export const ORTHOGRAPHY = [...orthographyData];

if (CONFIG.normalization) {
  ORTHOGRAPHY.forEach(
    (val, i) => (ORTHOGRAPHY[i] = val.normalize(CONFIG.normalization as string))
  )
}
