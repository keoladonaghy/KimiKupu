export const CONFIG = {
    tries: 6, // This changes how many tries you get to finish the wordle
    language: "Hawaiian", // This changes the display name for your language
    wordLength: 5, // This sets how long each word is based on how many characters (as defined in orthography.ts) are in each word
    author: "keoladonaghy", // Put your name here so people know who made this Wordle!
    authorWebsite: "http://keoladonaghy.com", // Put a link to your website or social media here
    wordListSource: "keoladonaghy", // Describe the source material for your words here
    wordListSourceLink: "http://keoladonaghy.com", // Put a link to the source material for your words here
    //
    // THESE NEXT SETTINGS ARE FOR ADVANCED USERS
    //
    googleAnalytics: "UA-20295191-3", // You can use this if you use Google Analytics
    shuffle: false, // whether to shuffle the words in the wordlist
    normalization: 'NFC' // whether to apply Unicode normalization to words and orthography - options: 'NFC', 'NFD', 'NKFC', 'NKFD', false
}