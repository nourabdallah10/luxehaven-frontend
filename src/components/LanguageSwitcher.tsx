import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSwitcher.css';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en');
  };

  return (
    <button 
      className="language-switcher"
      onClick={toggleLanguage}
      aria-label="Switch language"
    >
      {language === 'en' ? 'עברית' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;

