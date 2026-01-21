import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import TrailGrid from './TrailGrid'
import { trackTagClick } from '../utils/analytics'

const TrailGuide = ({ journey, onBackClick, onTagClick, onViewAllClick }) => {
  const { currentLang, t } = useLanguage()

  const handleTagClick = (tag) => {
    // Track tag click
    trackTagClick(tag, currentLang)
    
    if (onTagClick) {
      onTagClick(tag)
    }
  }

  // If no specific journey is provided, show the default Khao Yai guide
  if (!journey) {
    return (
      <section className="journeys">
        <div className="journey-card">
          <h2>
            {t(
              "Khao Yai National Park Hiking Trails",
              "考艾國家公園健行步道",
              "カオヤイ国立公園ハイキングトレイル"
            )}
          </h2>
          <p>
            {t(
              "A comprehensive guide to the best hiking trails in Thailand's oldest national park",
              "泰國最古老國家公園最佳健行步道完整指南",
              "タイ最古の国立公園の最高のハイキングトレイルの包括的なガイド"
            )}
          </p>
          
          <TrailGrid />
          
          {onViewAllClick && (
            <div className="journey-actions">
              <button className="explore-btn" onClick={onViewAllClick}>
                {t("View All Journeys", "查看所有旅程", "すべての旅を見る")} ✈️
              </button>
            </div>
          )}
        </div>
      </section>
    )
  }

  // Show specific journey details
  return (
    <section className="journeys">
      {onBackClick && (
        <button className="back-btn" onClick={onBackClick}>
          ← {t('Back to All Journeys', '返回所有旅程', 'すべての旅に戻る')}
        </button>
      )}
      
      <div className="journey-card">
        <div className="journey-header">
          <div className="journey-meta">
            <span className="country-flag">{journey.country.flag}</span>
            <span className="country-name">{journey.country.name[currentLang]}</span>
          </div>
          {journey.featured && (
            <span className="featured-badge">
              ⭐ {t('Featured', '精選', '注目')}
            </span>
          )}
        </div>

        <h2>{journey.title[currentLang]}</h2>
        <p>{journey.description[currentLang]}</p>

        <div className="journey-details">
          <div className="detail-item">
            <span className="detail-label">{t('Duration', '時長', '期間')}:</span>
            <span className="detail-value">
              {journey.duration.min === journey.duration.max 
                ? `${journey.duration.min} ${t('day', '天', '日')}${journey.duration.min > 1 ? 's' : ''}`
                : `${journey.duration.min}-${journey.duration.max} ${t('days', '天', '日間')}`
              }
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">{t('Difficulty', '難度', '難易度')}:</span>
            <span className="detail-value">
              {t(
                journey.difficulty.charAt(0).toUpperCase() + journey.difficulty.slice(1),
                journey.difficulty === 'easy' ? '簡單' :
                journey.difficulty === 'moderate' ? '中等' :
                journey.difficulty === 'hard' ? '困難' : '極難',
                journey.difficulty === 'easy' ? '簡単' :
                journey.difficulty === 'moderate' ? '中級' :
                journey.difficulty === 'hard' ? '困難' : '極困難'
              )}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">{t('Best Time', '最佳時間', 'ベストシーズン')}:</span>
            <span className="detail-value">{journey.bestTime[currentLang]}</span>
          </div>

          {journey.budget && (
            <div className="detail-item">
              <span className="detail-label">{t('Budget', '預算', '予算')}:</span>
              <span className="detail-value">{journey.budget[currentLang]}</span>
            </div>
          )}

          {journey.publishDate && journey.status === 'published' && (
            <div className="detail-item">
              <span className="detail-label">{t('Published', '發布日期', '公開日')}:</span>
              <span className="detail-value">
                {new Date(journey.publishDate).toLocaleDateString(
                  currentLang === 'ja' ? 'ja-JP' : 
                  currentLang === 'zh' ? 'zh-TW' : 'en-US',
                  { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  }
                )}
              </span>
            </div>
          )}
        </div>

        <div className="journey-tags">
          <h4>{t('Tags', '標籤', 'タグ')}:</h4>
          <div className="tags-container">
            {journey.tags[currentLang].map((tag, index) => (
              <span 
                key={index} 
                className="tag clickable-tag"
                onClick={() => handleTagClick(tag)}
                title={t('Click to filter by this tag', '點擊以此標籤篩選', 'このタグでフィルター')}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        
        {journey.content?.type === 'hiking_trails' && <TrailGrid />}
      </div>
    </section>
  )
}

export default TrailGuide