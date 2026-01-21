import React from 'react'
import { useLanguage } from '../hooks/useLanguage'

const TrailCard = ({ trail }) => {
  const { t } = useLanguage()

  const getDifficultyColor = (selfGuided) => {
    if (selfGuided.includes('✅') || selfGuided.includes('No guide') || selfGuided.includes('Self-walkable')) {
      return '#28a745' // Green for easy/self-guided
    }
    return '#ffc107' // Yellow for guide required
  }

  const getRatingStars = (rating) => {
    // Extract star rating from HTML string
    const match = rating.match(/★+/)
    return match ? match[0] : '★★★☆☆'
  }

  const getRatingText = (rating) => {
    // Extract small text from HTML string
    const match = rating.match(/<small>(.*?)<\/small>/)
    return match ? match[1] : ''
  }

  const getTrailTypeIcon = (distance) => {
    // Determine trail type from distance description
    if (distance.includes('loop') || distance.includes('環狀') || distance.includes('around lake') || distance.includes('circular')) {
      return { icon: '↻', type: 'loop' }
    }
    return { icon: '→', type: 'one-way' }
  }

  const getTrailTypeLabel = (distance) => {
    const typeInfo = getTrailTypeIcon(distance)
    if (typeInfo.type === 'loop') {
      return t('Loop Trail', '環狀步道', 'ループトレイル')
    }
    return t('One-way Trail', '單程步道', '片道トレイル')
  }

  return (
    <div className="trail-card">
      <div className="trail-header">
        <div className="trail-info-left">
          <div className="trail-number">#{trail.no}</div>
          <div className="trail-type">
            <span className="trail-type-icon">{getTrailTypeIcon(trail.distance).icon}</span>
            <span className="trail-type-label">{getTrailTypeLabel(trail.distance)}</span>
          </div>
        </div>
        <div className="trail-rating">
          <span className="stars">{getRatingStars(trail.rating)}</span>
          <span className="rating-text">{getRatingText(trail.rating)}</span>
        </div>
      </div>

      <div className="trail-name">
        <h3 dangerouslySetInnerHTML={{ __html: trail.name }} />
      </div>

      <div className="trail-details">
        <div className="detail-row">
          <div className="detail-item">
            <span className="detail-icon">📏</span>
            <div className="detail-content">
              <span className="detail-label">{t('Distance & Time', '距離與時間', '距離と時間')}</span>
              <span className="detail-value">{trail.distance}</span>
            </div>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-item">
            <span className="detail-icon">🚶</span>
            <div className="detail-content">
              <span className="detail-label">{t('Guide Required', '嚮導需求', 'ガイド要否')}</span>
              <div 
                className="guide-badge"
                style={{ 
                  backgroundColor: getDifficultyColor(trail.selfGuided),
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  display: 'inline-block'
                }}
                dangerouslySetInnerHTML={{ __html: trail.selfGuided }} 
              />
            </div>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-item">
            <span className="detail-icon">📍</span>
            <div className="detail-content">
              <span className="detail-label">{t('Start & End Points', '起終點', 'スタート・ゴール')}</span>
              <div className="detail-value" dangerouslySetInnerHTML={{ __html: trail.startEnd }} />
            </div>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-item">
            <span className="detail-icon">🌟</span>
            <div className="detail-content">
              <span className="detail-label">{t('Highlights', '重點特色', 'ハイライト')}</span>
              <div className="detail-value">{trail.highlights}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrailCard