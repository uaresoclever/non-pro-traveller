import React from 'react'
import { useLanguage } from '../hooks/useLanguage'

const Hero = ({ onExploreClick }) => {
  const { t } = useLanguage()

  return (
    <section className="hero">
      <h1>
        {t(
          "Oh! A Non-Professional Traveller LOL",
          "非專業旅人冒險",
          "ノンプロ旅行者の冒険"
        )}
      </h1>
      <p>
        {t(
          "Authentic travel experiences from a non-professional perspective",
          "來自非專業角度的真實旅行體驗",
          "ノンプロの視点からの本物の旅行体験"
        )}
      </p>
      <button className="explore-btn" onClick={onExploreClick}>
        {t("Explore All Journeys", "探索所有旅程", "すべての旅を探索")} ✈️
      </button>
    </section>
  )
}

export default Hero