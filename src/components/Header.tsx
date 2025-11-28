import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

const Header: React.FC = () => {
  const { t } = useLanguage();

  return (
    <header className="header">
      <div className="header__container">
        {/* Navigation Links - Left Aligned */}
        <nav className="header__nav">
          <Link to="/" className="header__nav-link">{t('nav.home')}</Link>
          <Link to="/beds" className="header__nav-link">{t('nav.beds')}</Link>
          <Link to="/couches" className="header__nav-link">{t('nav.couches')}</Link>
          <Link to="/colors" className="header__nav-link">{t('nav.colors')}</Link>
        </nav>

        {/* Logo - Centered */}
        <div className="header__logo">
          <Link to="/">
            <img src="/images/logo.png" alt="Furniture Shop Logo" />
          </Link>
        </div>

        {/* Icons - Right Aligned */}
        <div className="header__icons">
          <LanguageSwitcher />
          <button className="header__icon" aria-label={t('nav.search')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
          <button className="header__icon" aria-label={t('nav.account')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          <Link to="/favorites" className="header__icon" aria-label={t('nav.favorites')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

