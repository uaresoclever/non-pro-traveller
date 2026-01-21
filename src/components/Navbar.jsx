import React from 'react'
import { useLanguage } from '../hooks/useLanguage'

const Navbar = ({ onHomeClick, onJourneysClick, currentView }) => {
  const { currentLang, switchLanguage, t } = useLanguage()

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <div className="nav-logo">
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="white" opacity="0.9"/>
              <path d="M8 24 L14 16 L20 20 L26 14 L32 22 L32 32 L8 32 Z" fill="#267871"/>
              <path d="M8 26 L12 20 L16 22 L22 18 L28 24 L32 26 L32 32 L8 32 Z" fill="#2d8f47"/>
              <path d="M10 30 Q20 28 30 30" stroke="white" strokeWidth="2" fill="none" strokeDasharray="3,2"/>
              <circle cx="20" cy="22" r="2" fill="white"/>
              <path d="M20 24 L20 28 M18 26 L22 26" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="nav-title" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
            {t(
              "Oh! A Non-Professional Traveller LOL",
              "非專業旅人冒險",
              "ノンプロ旅行者の冒険"
            )}
          </h1>
        </div>
        
        <div className="nav-menu">
          <button 
            className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
            onClick={onHomeClick}
          >
            {t('Home', '首頁', 'ホーム')}
          </button>
          <button 
            className={`nav-link ${currentView === 'journeys' ? 'active' : ''}`}
            onClick={onJourneysClick}
          >
            {t('All Journeys', '所有旅程', 'すべての旅')}
          </button>
        </div>

        <div className="language-toggle">
          <button 
            className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
            onClick={() => switchLanguage('en')}
            title="English"
          >
            EN
          </button>
          <button 
            className={`lang-btn ${currentLang === 'zh' ? 'active' : ''}`}
            onClick={() => switchLanguage('zh')}
            title="繁體中文"
          >
            中
          </button>
          <button 
            className={`lang-btn ${currentLang === 'ja' ? 'active' : ''}`}
            onClick={() => switchLanguage('ja')}
            title="日本語"
          >
            日
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar