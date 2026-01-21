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
          
          <a 
            href="https://www.instagram.com/ging_1111_sexy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-instagram-link"
            title={t(
              "Follow us on Instagram! Even if we're too lazy to update this website, you can still message us there 😄",
              "在 Instagram 上關注我們！即使我們懶得更新這個網站，你仍然可以在那裡聯繫我們 😄",
              "Instagramでフォローしてください！このサイトの更新をサボっていても、そこでメッセージできます 😄"
            )}
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className="nav-instagram-icon"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
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