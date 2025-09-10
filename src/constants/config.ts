export const CONFIG = {
  tries: 6, // This changes how many tries you get to finish the wordle
  language: 'Hawaiian', // This changes the display name for your language
  wordLength: 5, // DEPRECATED: Word length is now determined by user selection in LanguageSelectionModal. Kept for reference and backwards compatibility.
  author: 'keoladonaghy', // Put your name here so people know who made this Wordle!
  authorWebsite: 'http://keoladonaghy.com', // Put a link to your website or social media here
  wordListSource: 'keoladonaghy', // Describe the source material for your words here
  wordListSourceLink: 'http://keoladonaghy.com', // Put a link to the source material for your words here
  //
  // THESE NEXT SETTINGS ARE FOR ADVANCED USERS
  //
  googleAnalytics: 'UA-20295191-3', // You can use this if you use Google Analytics
  shuffle: false, // whether to shuffle the words in the wordlist
  normalization: 'NFC', // whether to apply Unicode normalization to words and orthography - options: 'NFC', 'NFD', 'NKFC', 'NKFD', false
}
