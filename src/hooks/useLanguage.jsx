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
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-TW'
    
    // Update page title
    const title = lang === 'en' 
      ? 'Oh! A Non-Professional Traveller LOL - Khao Yai National Park Hiking Guide'
      : '非專業旅人冒險 - 考艾國家公園健行指南'
    document.title = title
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      const description = lang === 'en'
        ? 'Complete hiking guide to Khao Yai National Park trails with detailed information on 7 major routes, difficulty levels, and wildlife viewing opportunities.'
        : '考艾國家公園完整健行指南，包含7條主要步道詳細資訊，難度等級及野生動物觀察機會。'
      metaDesc.content = description
    }
  }

  const t = (enText, zhText) => {
    return currentLang === 'en' ? enText : zhText
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