# KimiKupu Codebase Analysis: Hard-coded Values and Configuration Opportunities
**Analysis Date:** October 9, 2025  
**Analyst:** Claude Code Assistant  
**Purpose:** Identify hard-coded values that could be extracted to configuration files for improved flexibility

## Executive Summary

This analysis identifies numerous hard-coded values throughout the KimiKupu codebase that should be extracted into configuration files or language-specific settings. The project shows a clear architecture pattern with language-specific configurations, but several areas still contain hard-coded values that limit flexibility and maintainability.

## Major Categories of Hard-coded Values

### 1. Language Selection and Names

**Location:** Multiple files  
**Issue:** Language names and identifiers are hard-coded in various components.

**Examples Found:**
- `src/App.tsx:52-53`: `const validGameLanguages = ['hawaiian', 'maori', 'tahitian', 'samoan']`
- `src/App.tsx:58`: Default language hard-coded as `'hawaiian'`
- `src/components/modals/LanguageSelectionModal.tsx:37-42`: Language code mapping hard-coded:
  ```typescript
  const LANGUAGE_CODE_MAP: { [key: string]: string } = {
    'hawaiian': 'haw',
    'maori': 'mao', 
    'tahitian': 'tah',
    'samoan': 'sam',
  }
  ```

**Why This Should Be Configurable:**
- Adding new languages requires code changes in multiple locations
- Language codes should be defined once and reused
- Default language selection should be configurable per deployment

### 2. Word Length Configuration

**Location:** Multiple files  
**Issue:** Word length options are hard-coded despite having a flexible system.

**Examples Found:**
- `src/components/modals/LanguageSelectionModal.tsx:22-25`: 
  ```typescript
  const WORD_LENGTHS = [
    { value: 5, label: '5 Letters' },
    { value: 6, label: '6 Letters' },
  ]
  ```
- `src/hooks/useWordLength.ts:15,20,28,44,64,81`: Multiple hard-coded checks for `wordLength === 5 || wordLength === 6`
- `src/hooks/useWordLength.ts:109`: Formula hard-coded: `return wordLength + 1 // 5-letter = 6 attempts, 6-letter = 7 attempts`

**Why This Should Be Configurable:**
- Different languages may support different word lengths
- The attempts formula could be language-specific
- Easy addition of 7+ letter support would require extensive code changes

### 3. Game Mechanics Parameters

**Location:** Various game logic files  
**Issue:** Core game mechanics are scattered and hard-coded.

**Examples Found:**
- `src/App.tsx:32`: `tries: 6` (though this exists in language configs too)
- `src/lib/stats.ts:XX`: Maximum attempts calculation duplicated
- `src/hooks/useWordLength.ts:109`: Attempts formula `wordLength + 1`
- **Win Messages:** `src/constants/strings.ts:1`: `export const WIN_MESSAGES = ['KA MAU TE WEHI!', 'KA PAI', 'TINO PAI RAWA ATU']`

**Why This Should Be Configurable:**
- Game difficulty could be customized per language
- Win messages should be language-specific and stored with other language data
- Formula for attempts vs. word length could vary by language complexity

### 4. Language Configuration Inconsistencies

**Location:** Language configuration files  
**Issue:** Despite having a good configuration system, some values are inconsistently applied.

**Examples Found:**
- `src/languages/frequency-types.ts:67-92`: Hawaiian config has hard-coded values:
  ```typescript
  tries: 6,
  wordLength: 5,
  corpusSize: 433435,
  totalUniqueWords: 12368,
  ```
- Similar patterns in `MAORI_CONFIG`, `TAHITIAN_CONFIG`, etc.
- Word count metadata hard-coded in individual word files:
  - `src/languages/words.mao.ts:956`: `totalWords: 148`
  - `src/languages/words.tah.ts:620`: `totalWords: 93`
  - `src/languages/words.sam.ts:249`: `totalWords: 27`

**Why This Should Be Configurable:**
- Corpus statistics should be dynamically calculated or stored separately
- Word counts should be computed, not manually maintained
- Configuration should be the single source of truth

### 5. UI Text and Messages

**Location:** Interface files and components  
**Issue:** Some UI text is hard-coded rather than using the internationalization system.

**Examples Found:**
- Interface files exist (`en.json`, `haw.json`) but are identical - no actual translation
- Hard-coded labels in `LanguageSelectionModal.tsx`:
  ```typescript
  { value: 5, label: '5 Letters' },
  { value: 6, label: '6 Letters' },
  ```
- Alert messages may have hard-coded fallbacks

**Why This Should Be Configurable:**
- True internationalization requires language-specific UI text
- Labels should be translatable
- Error messages should support multiple languages

### 6. Storage Keys and Constants

**Location:** Various utility files  
**Issue:** LocalStorage keys and other constants are scattered.

**Examples Found:**
- `src/hooks/useWordLength.ts:3`: `const WORD_LENGTH_STORAGE_KEY = 'kimiKupuLanguageSettings'`
- `src/components/modals/LanguageSelectionModal.tsx:44`: `const LOCAL_STORAGE_KEY = 'kimiKupuLanguageSettings'`
- Timeout values like `src/App.tsx:38`: `const ALERT_TIME_MS = 2000`

**Why This Should Be Configurable:**
- Storage keys should be centralized to avoid conflicts
- Timeout values should be adjustable
- Environment-specific prefixes might be needed

### 7. Author and Metadata Information

**Location:** Language configuration files  
**Issue:** Author information is repeated across all language configs.

**Examples Found:**
- Every language config contains:
  ```typescript
  author: 'keoladonaghy',
  authorWebsite: 'http://keoladonaghy.com',
  ```

**Why This Should Be Configurable:**
- Global metadata should be separate from language-specific config
- Different languages might have different contributors
- Deployment-specific information should be externalized

## Recommended Configuration Structure

Based on the analysis, here's a recommended approach to extract these hard-coded values:

### 1. Global Game Configuration
```typescript
// src/config/gameConfig.ts
export const GLOBAL_GAME_CONFIG = {
  supportedWordLengths: [5, 6],
  attemptsFormula: (wordLength: number) => wordLength + 1,
  alertTimeMs: 2000,
  storagePrefix: 'kimiKupu',
  defaultLanguage: 'hawaiian',
  validGameLanguages: ['hawaiian', 'maori', 'tahitian', 'samoan'],
  languageCodeMap: {
    'hawaiian': 'haw',
    'maori': 'mao',
    'tahitian': 'tah', 
    'samoan': 'sam',
  }
}
```

### 2. Enhanced Language Configurations
Move language-specific UI text into the existing language configs:
```typescript
export interface LanguageConfig {
  // ... existing fields ...
  gameMessages: {
    winMessages: string[],
    lossMessage: string,
    notEnoughLetters: string,
    wordNotFound: string,
  },
  ui: {
    wordLengthLabels: { [key: number]: string },
    // other UI text
  }
}
```

### 3. Computed Properties
Replace hard-coded word counts with computed values:
```typescript
// Auto-calculate from word arrays instead of maintaining manually
export const getCorpusInfo = (words: WordEntry[]) => ({
  totalWords: words.length,
  lastUpdated: new Date().toISOString().split('T')[0],
  // ... other computed stats
})
```

### 4. Environment Configuration
```typescript
// src/config/environmentConfig.ts
export const ENV_CONFIG = {
  author: 'keoladonaghy',
  authorWebsite: 'http://keoladonaghy.com',
  googleAnalytics: process.env.REACT_APP_GA_TRACKING_ID,
  // other deployment-specific values
}
```

## Benefits of This Approach

1. **Maintainability**: Single source of truth for configuration values
2. **Extensibility**: Easy to add new languages and word lengths
3. **Localization**: True language-specific UI text support
4. **Deployment Flexibility**: Environment-specific configurations
5. **Consistency**: Eliminates duplicate values across files
6. **Data Integrity**: Computed values prevent manual maintenance errors

## Implementation Priority

1. **High Priority**: Language selection and word length configurations (affects core functionality)
2. **Medium Priority**: Game mechanics parameters and UI text (affects user experience)
3. **Low Priority**: Storage keys and metadata (affects maintainability)

## Files That Would Benefit Most From Configuration Extraction

1. `src/App.tsx` - Contains multiple hard-coded game parameters
2. `src/hooks/useWordLength.ts` - Word length validation and formulas
3. `src/components/modals/LanguageSelectionModal.tsx` - Language and UI option lists
4. `src/languages/frequency-types.ts` - Language configuration definitions
5. All `src/languages/words.*.ts` files - Metadata should be computed

## Conclusion

The KimiKupu project has excellent architectural foundations with its language configuration system and registry pattern. However, extracting the identified hard-coded values into proper configuration files would significantly improve the codebase's flexibility, maintainability, and ability to support additional languages and game variants. The modular approach already in place makes this refactoring straightforward and low-risk.