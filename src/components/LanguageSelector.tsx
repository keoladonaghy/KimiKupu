// src/components/LanguageSelector.tsx
import React from 'react';
import { getEnabledLanguages } from '../languages/registry';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  className = ''
}) => {
  const enabledLanguages = getEnabledLanguages();

  return (
    <select 
      value={currentLanguage} 
      onChange={(e) => onLanguageChange(e.target.value)}
      className={`language-selector ${className}`}
    >
      {enabledLanguages.map((lang) => (
        <option key={lang.name} value={lang.name}>
          {lang.displayName}
        </option>
      ))}
    </select>
  );
};