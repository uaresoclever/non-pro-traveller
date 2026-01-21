import React from 'react'
import { useLanguage } from '../hooks/useLanguage'

const Navbar = ({ onHomeClick, onJourneysClick, currentView }) => {
  const { currentLang, switchLanguage, t } = useLanguage()

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="nav-title" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
          {t(
            "Oh! A Non-Professional Traveller LOL",
            "非專業旅人冒險"
          )}
        </h1>
        
        <div className="nav-menu">
          <button 
            className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
            onClick={onHomeClick}
          >
            {t('Home', '首頁')}
          </button>
          <button 
            className={`nav-link ${currentView === 'journeys' ? 'active' : ''}`}
            onClick={onJourneysClick}
          >
            {t('All Journeys', '所有旅程')}
          </button>
        </div>

        <div className="language-toggle">
          <button 
            className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
            onClick={() => switchLanguage('en')}
          >
            EN
          </button>
          <button 
            className={`lang-btn ${currentLang === 'zh' ? 'active' : ''}`}
            onClick={() => switchLanguage('zh')}
          >
            中文
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar