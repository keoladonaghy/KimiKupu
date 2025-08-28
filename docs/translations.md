# Translation System Documentation

## Overview

The KimiKupu app now uses a structured internationalization (i18n) system that supports multiple languages with easy extensibility. The system automatically loads translations based on the user's selected language and provides fallback to English for missing translations.

## Supported Languages

- **English** (`english`) - Base language with complete translations
- **Hawaiian** (`hawaiian`) - ʻŌlelo Hawaiʻi translations
- **Māori** (`maori`) - Te Reo Māori translations

## File Structure

```
src/constants/
├── translation.en.json     # English translations
├── translation.haw.json    # Hawaiian translations  
├── translation.mao.json    # Māori translations
└── translations.ts         # Translation utility functions
```

## Using Translations in Components

### Basic Usage

```tsx
import { useTranslation } from '../../constants/translations'

const MyComponent = ({ language }: { language: string }) => {
  const { t, tArray } = useTranslation(language)
  
  return (
    <div>
      <h1>{t('app.title')}</h1>
      <p>{t('alerts.notEnoughLetters')}</p>
    </div>
  )
}
```

### With Parameters

```tsx
// For translations with placeholders like "Guess the word in {tries} tries"
const description = t('modals.info.description', { tries: 6 })
```

### Arrays

```tsx
// For arrays like win messages
const winMessages = tArray('winMessages')
const randomMessage = winMessages[Math.floor(Math.random() * winMessages.length)]
```

## Adding a New Language

1. **Create Translation File**
   ```bash
   cp src/constants/translation.en.json src/constants/translation.new.json
   ```

2. **Translate Content**
   - Edit the new JSON file with translations for your language
   - Keep the same key structure
   - Ensure parameter placeholders like `{tries}` remain unchanged

3. **Update Translation System**
   ```tsx
   // In src/constants/translations.ts
   import translationNew from './translation.new.json'
   
   const translations: Record<string, Translations> = {
     english: translationEn,
     hawaiian: translationHaw,
     maori: translationMao,
     newlang: translationNew, // Add your language
   }
   ```

4. **Update Language Selection**
   ```tsx
   // In LanguageSelectionModal.tsx, add a new radio option
   <label className="flex items-center">
     <input
       type="radio"
       name="language"
       value="newlang"
       checked={tempSelection === 'newlang'}
       onChange={(e) => setTempSelection(e.target.value)}
       className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
     />
     <span className="ml-3 text-sm text-gray-700">{t('modals.language.newlang')}</span>
   </label>
   ```

## Components Updated

The following components now support translations:

- **App.tsx** - Main title, alerts, success messages
- **InfoModal** - How to play instructions and examples  
- **AboutModal** - Game description and links
- **LanguageSelectionModal** - Language selection interface
- **StatsModal** - Statistics labels and sharing