export type LanguageCode = 'english' | 'hawaiian' | 'maori'

export interface LanguageResource {
  // App header
  gameTitle: string

  // Modals
  selectLanguage: string
  interfaceLanguage: string
  gameLanguage: string
  howToPlay: string
  aboutThisGame: string

  // Buttons
  cancel: string
  ok: string

  // Alerts
  notEnoughLetters: string
  wordNotFound: string
  theWordWas: string
  gameCopiedToClipboard: string

  // Credits
  maoriCredits: string
}

export const LANGUAGE_RESOURCES: Record<LanguageCode, LanguageResource> = {
  english: {
    gameTitle: 'Hulihua - He Nane ʻŌlelo Hawaiʻi',
    selectLanguage: 'Select Language',
    interfaceLanguage: 'Interface Language',
    gameLanguage: 'Game Language',
    howToPlay: "Pehea e pā'ani ai - How to play",
    aboutThisGame: 'About this game',
    cancel: 'Cancel',
    ok: 'OK',
    notEnoughLetters: 'Not enough letters',
    wordNotFound: 'Word not found',
    theWordWas: 'The word was',
    gameCopiedToClipboard: 'Game copied to clipboard',
    maoriCredits:
      'Mahalo to Mary Boyce for the Māori word list used in this game.',
  },
  hawaiian: {
    gameTitle: 'Hulihua - He Nane ʻŌlelo Hawaiʻi',
    selectLanguage: 'Koho ʻŌlelo',
    interfaceLanguage: 'ʻŌlelo Pūnaewele',
    gameLanguage: "ʻŌlelo Pā'ani",
    howToPlay: "Pehea e pā'ani ai",
    aboutThisGame: "E pili ana i kēia pā'ani",
    cancel: 'Hōʻole',
    ok: 'ʻAe',
    notEnoughLetters: 'ʻAʻole lawa nā hua palapala',
    wordNotFound: 'ʻAʻole i loaʻa ka hua ʻōlelo',
    theWordWas: 'ʻO ka hua ʻōlelo',
    gameCopiedToClipboard: "Ua kope ʻia ka pā'ani i ka palapala hoʻolaha",
    maoriCredits:
      "Mahalo iā Mary Boyce no ka papa inoa hua ʻōlelo Māori o kēia pā'ani.",
  },
  maori: {
    gameTitle: 'Hulihua - He Kēmu Kupu Māori',
    selectLanguage: 'Kōwhiri Reo',
    interfaceLanguage: 'Reo Mata',
    gameLanguage: 'Reo Kēmu',
    howToPlay: 'Me pēhea e tākaro ai',
    aboutThisGame: 'Mō tēnei kēmu',
    cancel: 'Whakakore',
    ok: 'Āe',
    notEnoughLetters: 'Kāore i rawa ngā reta',
    wordNotFound: 'Kāore i kitea te kupu',
    theWordWas: 'Ko te kupu',
    gameCopiedToClipboard: 'Kua kape te kēmu ki te papatohu',
    maoriCredits: 'Ngā mihi ki a Mary Boyce mō ngā kupu Māori o tēnei kēmu.',
  },
}

export const getLanguageResource = (
  languageCode: LanguageCode
): LanguageResource => {
  return LANGUAGE_RESOURCES[languageCode] || LANGUAGE_RESOURCES.english
}

export const SUPPORTED_INTERFACE_LANGUAGES = [
  { value: 'english' as LanguageCode, label: 'English' },
  { value: 'hawaiian' as LanguageCode, label: 'Hawaiian' },
  { value: 'maori' as LanguageCode, label: 'Māori' },
]

export const SUPPORTED_GAME_LANGUAGES = [
  { value: 'hawaiian' as LanguageCode, label: 'Hawaiian' },
  { value: 'maori' as LanguageCode, label: 'Māori' },
]
