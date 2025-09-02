// src/languages/interface/types.ts
export interface InterfaceTexts {
  game: {
    title: string;
    newGame: string;
    settings: string;
    statistics: string;
    about: string;
    instructions: string;
  };
  alerts: {
    notEnoughLetters: string;
    wordNotFound: string;
    gameWon: string;
    gameLost: string;
    loading: string;
  };
  modals: {
    howToPlay: string;
    about: string;
    statistics: string;
    settings: string;
    close: string;
    ok: string;
    cancel: string;
  };
  settings: {
    interfaceLanguage: string;
    gameLanguage: string;
    wordLength: string;
    loading: string;
  };
  stats: {
    gamesPlayed: string;
    winPercentage: string;
    currentStreak: string;
    maxStreak: string;
    guessDistribution: string;
    nextWordle: string;
    share: string;
  };
  keyboard: {
    enter: string;
    delete: string;
  };
  common: {
    loading: string;
    error: string;
    retry: string;
  };
}

export interface InterfaceLanguageEntry {
  code: string;
  name: string;
  displayName: string;
  enabled: boolean;
  isDefault: boolean;
}