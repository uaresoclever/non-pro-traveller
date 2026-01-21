import React from 'react'
import { useLanguage } from '../hooks/useLanguage'

const TrailCard = ({ trail }) => {
  const { t } = useLanguage()

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

  // Parse badges from selfGuided field
  const parseBadges = (selfGuided) => {
    const badges = []
    
    // Check for guide requirement
    if (selfGuided.includes('✅') || selfGuided.includes('No guide') || selfGuided.includes('Self-walkable')) {
      badges.push({
        type: 'no-guide',
        text: t('No Guide Needed', '無需嚮導', 'ガイド不要'),
        icon: '✅',
        color: '#28a745'
      })
    } else {
      badges.push({
        type: 'guide-required',
        text: t('Guide Required', '需要嚮導', 'ガイド必須'),
        icon: '🧭',
        color: '#ffc107'
      })
    }
    
    // Check for author visited
    if (selfGuided.includes('👤') || selfGuided.includes('Author visited') || selfGuided.includes('作者已到訪') || selfGuided.includes('著者訪問済み')) {
      badges.push({
        type: 'author-visited',
        text: t('Author Visited', '作者已到訪', '著者訪問済み'),
        icon: '👤',
        color: '#136a8a'
      })
    }
    
    // Special badge for Trail #1 - Beginner Choice
    if (trail.no === '1') {
      badges.push({
        type: 'beginner-choice',
        text: t('Beginner Choice', '新手首選', '初心者おすすめ'),
        icon: '🌟',
        color: '#e91e63'
      })
    }
    
    // Check for beginner choice
    if (selfGuided.includes('🌟') || selfGuided.includes('Beginner Choice') || selfGuided.includes('新手首選') || selfGuided.includes('初心者おすすめ')) {
      badges.push({
        type: 'beginner-choice',
        text: t('Beginner Choice', '新手首選', '初心者おすすめ'),
        icon: '🌟',
        color: '#e91e63'
      })
    }
    
    return badges
  }

  const badges = parseBadges(trail.selfGuided)

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
              <div className="detail-value" dangerouslySetInnerHTML={{ __html: trail.highlights }} />
            </div>
          </div>
        </div>
      </div>

      {/* Trail Badges at Bottom */}
      <div className="trail-badges">
        {badges.map((badge, index) => (
          <div 
            key={index}
            className={`trail-badge trail-badge-${badge.type}`}
            style={{ backgroundColor: badge.color }}
          >
            <span className="badge-icon">{badge.icon}</span>
            <span className="badge-text">{badge.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrailCard