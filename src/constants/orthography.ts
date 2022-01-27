import { CONFIG } from "./config";

export const ORTHOGRAPHY = ['a', 'ā', 'e', 'ē', 'i', 'ī', 'o', 'ō', 'u', 'ū', '‘'];

if (CONFIG.normalization) {
    ORTHOGRAPHY.forEach((val, i) => ORTHOGRAPHY[i] = val.normalize(CONFIG.normalization))
}