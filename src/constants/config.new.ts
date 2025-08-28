import { getCurrentLanguage } from './languageLoader';

// Dynamic config loading based on current language
let config: any = null;

// Load config synchronously for the current language
const loadConfig = () => {
  const languageCode = getCurrentLanguage();
  
  // Use require for synchronous loading in this transitional version
  try {
    config = require(`./config.${languageCode}.json`);
  } catch (error) {
    console.error(`Failed to load config for ${languageCode}, falling back to Hawaiian:`, error);
    config = require('./config.haw.json');
  }
  
  return config;
};

export const CONFIG = loadConfig();