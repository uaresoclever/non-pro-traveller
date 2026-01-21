import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { trailData } from '../data/trailData'
import TrailCard from './TrailCard'

const TrailGrid = () => {
  const { currentLang, t } = useLanguage()
  const data = trailData[currentLang]

  return (
    <div className="trail-grid-container">
      <div className="trail-grid-header">
        <h3>{t('Hiking Trails Overview', '健行步道總覽', 'ハイキングトレイル概要')}</h3>
        <p className="trail-grid-description">
          {t(
            'Explore 7 diverse hiking trails in Khao Yai National Park, from easy self-guided walks to challenging guided adventures.',
            '探索考艾國家公園7條多樣化健行步道，從簡單的自助步行到具挑戰性的嚮導冒險。',
            'カオヤイ国立公園の7つの多様なハイキングトレイルを探索。簡単なセルフガイドウォークから挑戦的なガイド付きアドベンチャーまで。'
          )}
        </p>
      </div>

      <div className="trail-grid">
        {data.map((trail, index) => (
          <TrailCard key={index} trail={trail} />
        ))}
      </div>

      <div className="trail-grid-footer">
        <div className="legend">
          <h4>{t('Legend', '圖例', '凡例')}</h4>
          <div className="legend-items">
            <div className="legend-item">
              <span className="legend-badge easy">✅</span>
              <span>{t('Self-guided (No guide needed)', '自助式（無需嚮導）', 'セルフガイド（ガイド不要）')}</span>
            </div>
            <div className="legend-item">
              <span className="legend-badge guide">🧭</span>
              <span>{t('Guide required', '需要嚮導', 'ガイド必要')}</span>
            </div>
            <div className="legend-item">
              <span className="legend-badge beginner">🌟</span>
              <span>{t('Beginner Choice', '新手首選', '初心者おすすめ')}</span>
            </div>
          </div>
        </div>
        
        <div className="rating-info">
          <h4><span style={{color: '#ffc107'}}>★</span> {t('Driving Convenience Rating', '自駕便利評分', '運転利便性評価')}</h4>
          <p>
            {t(
              <>Star ratings (<span style={{color: '#ffc107'}}>★★★★★</span>) based on parking availability, route accessibility, and shuttle requirements.</>,
              <>星級評分（<span style={{color: '#ffc107'}}>★★★★★</span>）基於停車便利性、路線可達性及接駁需求。</>,
              <>星評価（<span style={{color: '#ffc107'}}>★★★★★</span>）駐車の利便性、ルートのアクセス性、シャトルの必要性に基づく。</>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TrailGrid