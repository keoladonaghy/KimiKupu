# Language Status System - Implementation Guide

## 🎯 What Was Added Tonight

Added a **deployment status system** to control which languages appear in the player menu. Only languages marked as `"deployed"` will be visible to players.

## 📋 Status System Overview

### **Status Types**
```typescript
type LanguageStatus = 'deployed' | 'in-progress' | 'just-started';
```

- **`deployed`**: Ready for production, appears in player menu
- **`in-progress`**: Being worked on, hidden from players
- **`just-started`**: Basic structure, needs expansion, hidden from players

### **Current Language Status**
- 🌺 **Hawaiian**: `deployed` (12,368 words, production ready)
- 🌿 **Māori**: `in-progress` (148 words, working on expansion)
- 🌴 **Tahitian**: `just-started` (93 words, needs more content)
- 🥥 **Samoan**: `just-started` (27 words, minimal content)

## 🔧 Technical Implementation Added

### **1. Config System Updates**
```typescript
// Added to LanguageConfig interface
export interface LanguageConfig {
  // ... existing fields ...
  status: LanguageStatus; // NEW: Controls player visibility
  // ... rest of config ...
}
```

### **2. Registry Helper Functions**
```typescript
// Player-facing functions (MAIN ONE TO USE)
export const getPlayerLanguages = (): ExtendedLanguageInfo[] => {
  return getDeployedLanguages(); // Only 'deployed' languages
};

// Status filtering functions
export const getDeployedLanguages = (): ExtendedLanguageInfo[];
export const getInProgressLanguages = (): ExtendedLanguageInfo[];
export const getJustStartedLanguages = (): ExtendedLanguageInfo[];
export const getLanguagesByStatus = (status: LanguageStatus): ExtendedLanguageInfo[];
```

### **3. Enhanced Statistics**
```typescript
// Updated getRegistryStats() includes:
{
  playerVisibleLanguages: 1, // Count of deployed languages
  statusBreakdown: {
    deployed: 1,
    inProgress: 1,
    justStarted: 2
  }
  // ... existing stats
}
```

## 🚀 Morning Implementation Tasks

### **STEP 1: Update Game UI Components**
You need to modify the language selection components to use:

```typescript
import { getPlayerLanguages } from './languages/registry';

// In your language selector component:
const availableLanguages = getPlayerLanguages(); // Only deployed languages
```

### **STEP 2: Key Files to Modify**
Look for language selection/menu components that likely use:
- `getAllLanguages()`
- `LANGUAGE_REGISTRY` 
- Any language list iterations

Replace with:
- `getPlayerLanguages()` for player-facing menus
- `getAllExtendedLanguages()` for admin/debug views

### **STEP 3: Testing the Implementation**
1. **Before Changes**: All 4 languages should appear in menu
2. **After Changes**: Only Hawaiian should appear in player menu
3. **Verify**: Other languages still work if accessed directly (for testing)

### **STEP 4: Future Status Management**
To change a language's visibility, just update its config:

```typescript
// To make Māori visible to players:
export const MAORI_CONFIG: LanguageConfig = {
  // ... existing config ...
  status: 'deployed', // Changed from 'in-progress'
  // ... rest
};
```

## 📍 Files Modified Tonight

### **Core System Files:**
- `src/languages/frequency-types.ts` - Added `LanguageStatus` type and status field
- `src/languages/words.sam.ts` - Updated Samoan config with status
- `src/languages/registry.ts` - Added status filtering functions

### **Status Assignments Made:**
- Hawaiian: `deployed` ✅ (appears in player menu)
- Māori: `in-progress` 🔄 (hidden from players)
- Tahitian: `just-started` 🌱 (hidden from players)  
- Samoan: `just-started` 🌱 (hidden from players)

## 🎯 Expected Behavior After Implementation

### **Player Experience:**
- Language menu shows only Hawaiian
- Game works perfectly with Hawaiian
- No broken states or missing options

### **Developer Experience:**
- Can still test other languages directly
- Clear status tracking in registry stats
- Easy to promote languages when ready

### **Future Expansion:**
- Add more words to Māori → change status to `deployed`
- Expand Tahitian word list → change status to `in-progress`
- Complete Samoan integration → progress through statuses

## ⚠️ Important Notes

1. **Backward Compatibility**: All existing functions still work
2. **No Breaking Changes**: Current game code continues to function
3. **Gradual Migration**: Use `getPlayerLanguages()` only where you want filtering
4. **Testing Safety**: Other languages still accessible for direct testing

## 🔍 Quick Implementation Check

After implementing, verify:
```typescript
import { getPlayerLanguages, getRegistryStats } from './languages/registry';

console.log('Player languages:', getPlayerLanguages().length); // Should be 1 (Hawaiian)
console.log('Total languages:', getRegistryStats().totalLanguages); // Should be 4
console.log('Deployed count:', getRegistryStats().statusBreakdown.deployed); // Should be 1
```

## 📝 Reminder for Morning

**MAIN TASK**: Find the language selection component and replace the language list source with `getPlayerLanguages()` instead of the full language list.

**RESULT**: Players will only see Hawaiian in the menu, while you can still test other languages during development.

**NO DEPLOYMENT NEEDED**: This is a UI-only change that uses the status system already committed to the codebase.

---

## 🔐 Data Protection & API Architecture Plan - January 10, 2025

### **Problem Statement**
Current language files contain valuable proprietary data that shouldn't be exposed on GitHub:
- Frequency analysis from 433,435-word Hawaiian corpus
- Algorithmic difficulty classifications
- Cross-language research and linguistic analysis
- Curated definitions and cultural context

### **Solution: Public/Private Data Split**

#### **Public Repository (Safe to expose)**
```typescript
// sequences.haw.ts - Only word IDs in predetermined order
export const HAWAIIAN_WORD_SEQUENCES = {
  5: [
    "haw-12345", "haw-67890", "haw-23456", // ... all 5-letter word IDs shuffled
  ],
  6: [
    "haw-78901", "haw-34567", "haw-89012", // ... all 6-letter word IDs shuffled
  ]
};
```

#### **Private API/Database (Protected proprietary data)**
```typescript
interface PrivateWordEntry {
  id: string;                    // "haw-12345"
  word: string;                  // "aloha"
  definition: string;            // Full curated definition
  wordCount: number;             // Exact frequency from corpus
  difficulty: number;            // Algorithmic scoring
  etymology?: string;            // Historical background
  examples?: string[];           // Usage examples
  culturalNotes?: string;        // Cultural significance
  // ... all valuable proprietary research
}
```

### **Game Flow Architecture**

#### **Daily Word Selection (KimiKupu)**
1. **Calculate daily index**: `daysSinceEpoch % sequenceLength`
2. **Get word ID**: `HAWAIIAN_WORD_SEQUENCES[5][index]` → `"haw-12345"`
3. **API call**: `GET /api/word/haw-12345` → rich word data
4. **Game displays**: word + post-game educational content

#### **Crossword Pool Selection (PangaKupu)**
1. **Get sequence subset**: Multiple IDs for puzzle generation
2. **API call**: `GET /api/words/crossword-pool?ids=haw-12345,haw-67890,...`
3. **Diversity filtering**: Server-side using proprietary algorithms
4. **Game receives**: Optimized word pool for puzzle generation

### **Enhanced Post-Game Experience**

```typescript
// After game completion - educational content display
const gameResult = {
  wordId: "haw-12345", 
  playerWon: true,
  attempts: 4
};

// Fetch rich educational data
const wordData = await fetch(`/api/word/${gameResult.wordId}`);
const enrichedData = await wordData.json();

// Display comprehensive learning content
showGameResults({
  word: enrichedData.word,           // "aloha"
  definition: enrichedData.definition, // Full detailed meaning
  etymology: enrichedData.etymology,   // Word origins
  examples: enrichedData.examples,     // Usage in context
  difficulty: enrichedData.difficulty, // Why this word was chosen
  culturalNotes: enrichedData.cultural // Cultural significance
});
```

### **Implementation Benefits**

#### **Data Security**
- **Frequency analysis** never leaves server
- **Difficulty algorithms** remain proprietary
- **Research methodology** stays private
- **Bulk downloading** prevented

#### **Educational Enhancement**
- Rich post-game learning content
- Cultural context and etymology
- Pronunciation guides and examples
- Progressive difficulty explanations

#### **Future Flexibility**
- Support for 5-letter and 6-letter daily games
- Easy addition of new word lengths
- Cross-language cognate features
- Advanced analytics without data exposure

### **Development Phases**

#### **Phase 1: Create Public Sequences**
- Extract word IDs by length from current files
- Generate shuffled sequences for each word length
- Create minimal public TypeScript files

#### **Phase 2: Modify Game Logic**
- Update KimiKupu to use ID sequences
- Implement API calls for word data retrieval
- Add post-game educational content display

#### **Phase 3: API Development**
- Build Flask/FastAPI with proprietary database
- Implement authentication and rate limiting
- Create endpoints for different game needs

#### **Phase 4: Enhanced Features**
- Server-side diversity filtering for PangaKupu
- Cross-language cognate integration
- Advanced educational content delivery

### **Two-Games-Per-Day Feature**

Both 5-letter and 6-letter games can run simultaneously:
```typescript
const today = getDaysSinceEpoch();
const fiveLetterWordId = getDailyWordId(5, today);
const sixLetterWordId = getDailyWordId(6, today);

// Players get two daily challenges with rich educational content
```

This architecture transforms KimiKupu from a simple word game into a comprehensive language learning platform while protecting valuable research data.