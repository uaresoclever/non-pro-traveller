import React, { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState('en')

  const switchLanguage = (lang) => {
    setCurrentLang(lang)
    
    // Update HTML lang attribute
    const langMap = {
      'en': 'en',
      'zh': 'zh-TW',
      'ja': 'ja'
    }
    document.documentElement.lang = langMap[lang]
    
    // Update page title
    const titles = {
      'en': 'Oh! A Non-Professional Traveller LOL - Khao Yai National Park Hiking Guide',
      'zh': '非專業旅人冒險 - 考艾國家公園健行指南',
      'ja': 'ノンプロ旅行者の冒険 - カオヤイ国立公園ハイキングガイド'
    }
    document.title = titles[lang]
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      const descriptions = {
        'en': 'Complete hiking guide to Khao Yai National Park trails with detailed information on 7 major routes, difficulty levels, and wildlife viewing opportunities.',
        'zh': '考艾國家公園完整健行指南，包含7條主要步道詳細資訊，難度等級及野生動物觀察機會。',
        'ja': 'カオヤイ国立公園の7つの主要ルート、難易度レベル、野生動物観察の機会を含む完全なハイキングガイド。'
      }
      metaDesc.content = descriptions[lang]
    }
  }

  const t = (enText, zhText, jaText) => {
    if (currentLang === 'zh') return zhText
    if (currentLang === 'ja') return jaText
    return enText
  }

  useEffect(() => {
    // Set initial language
    switchLanguage('en')
  }, [])

  const value = {
    currentLang,
    switchLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}