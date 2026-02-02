import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { trackTagClick, trackJourneyCardClick } from '../utils/analytics'

const JourneyCard = ({ journey, onClick, onTagClick }) => {
  const { currentLang, t } = useLanguage()

  const handleTagClick = (tag, event) => {
    event.stopPropagation() // Prevent card click when clicking tag
    
    // Track tag click
    trackTagClick(tag, currentLang)
    
    if (onTagClick) {
      onTagClick(tag)
    }
  }

  const handleCardClick = () => {
    if (onClick) {
      // Track journey card click
      trackJourneyCardClick(journey.id, journey.title[currentLang], 'journey_list')
      onClick(journey)
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#28a745'
      case 'moderate': return '#ffc107'
      case 'hard': return '#fd7e14'
      case 'extreme': return '#dc3545'
      default: return '#6c757d'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'hiking': return '🥾'
      case 'food': return '🍜'
      case 'beach': return '🏖️'
      case 'city': return '🏙️'
      case 'culture': return '🏛️'
      case 'adventure': return '🎢'
      case 'mountain': return '⛰️'
      case 'wildlife': return '🦁'
      default: return '✈️'
    }
  }

  return (
    <div className={`journey-card ${journey.coverImage ? 'journey-card-with-image' : ''}`} onClick={handleCardClick}>
      {journey.coverImage && (
        <img 
          src={journey.coverImage} 
          alt={journey.title[currentLang]}
          className="journey-cover-image"
          loading="lazy"
        />
      )}
      
      <div className="journey-card-content">
        <div className="journey-card-header">
          <div className="journey-meta">
            <span className="country-flag">{journey.country.flag}</span>
            <span className="country-name">{journey.country.name[currentLang]}</span>
            <span className="category-icon">{getCategoryIcon(journey.category)}</span>
          </div>
          {journey.featured && (
            <span className="featured-badge">
              ⭐ {t('Featured', '精選', '注目')}
            </span>
          )}
        </div>

        <h3 className="journey-title">{journey.title[currentLang]}</h3>
        <p className="journey-description">{journey.description[currentLang]}</p>

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
            <span 
              className="difficulty-badge"
              style={{ backgroundColor: getDifficultyColor(journey.difficulty) }}
            >
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
          {journey.tags[currentLang].slice(0, 4).map((tag, index) => (
            <span 
              key={index} 
              className="tag clickable-tag"
              onClick={(e) => handleTagClick(tag, e)}
              title={t('Click to filter by this tag', '點擊以此標籤篩選', 'このタグでフィルター')}
            >
              #{tag}
            </span>
          ))}
          {journey.tags[currentLang].length > 4 && (
            <span className="tag-more">+{journey.tags[currentLang].length - 4}</span>
          )}
        </div>
      </div>

      {journey.status === 'draft' && (
        <div className="draft-overlay">
          <span className="draft-label">{t('Coming Soon', '即將推出', '近日公開')}</span>
        </div>
      )}
    </div>
  )
}

export default JourneyCard