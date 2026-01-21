import React from 'react'
import { useLanguage } from '../hooks/useLanguage'

const Hero = ({ onExploreClick }) => {
  const { t } = useLanguage()

  return (
    <section className="hero">
      <h1>
        {t(
          "Oh! A Non-Professional Traveller LOL",
          "非專業旅人冒險"
        )}
      </h1>
      <p>
        {t(
          "Authentic travel experiences from a non-professional perspective",
          "來自非專業角度的真實旅行體驗"
        )}
      </p>
      <button className="explore-btn" onClick={onExploreClick}>
        {t("Explore All Journeys", "探索所有旅程")} ✈️
      </button>
    </section>
  )
}

export default Hero