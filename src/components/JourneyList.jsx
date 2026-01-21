import React, { useState, useMemo } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import JourneyCard from './JourneyCard'
import JourneyFilter from './JourneyFilter'
import { journeys, searchJourneys } from '../data/journeys'

const JourneyList = ({ onJourneySelect, initialFilters = {}, onTagClick }) => {
  const { currentLang, t } = useLanguage()
  const [filters, setFilters] = useState({
    country: '',
    category: '',
    difficulty: '',
    search: '',
    ...initialFilters
  })

  // Update filters when initialFilters change
  React.useEffect(() => {
    setFilters(prev => ({
      ...prev,
      ...initialFilters
    }))
  }, [initialFilters])

  // Filter journeys based on current filters
  const filteredJourneys = useMemo(() => {
    let filtered = journeys

    // Apply search filter
    if (filters.search) {
      filtered = searchJourneys(filters.search, currentLang)
    }

    // Apply other filters
    if (filters.country) {
      filtered = filtered.filter(journey => journey.country.code === filters.country)
    }

    if (filters.category) {
      filtered = filtered.filter(journey => journey.category === filters.category)
    }

    if (filters.difficulty) {
      filtered = filtered.filter(journey => journey.difficulty === filters.difficulty)
    }

    return filtered
  }, [filters, currentLang])

  // Separate published and draft journeys
  const publishedJourneys = filteredJourneys.filter(j => j.status === 'published')
  const draftJourneys = filteredJourneys.filter(j => j.status === 'draft')

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleJourneyClick = (journey) => {
    if (journey.status === 'published' && onJourneySelect) {
      onJourneySelect(journey)
    }
  }

  return (
    <div className="journey-list-container">
      <div className="journey-list-hero">
        <div className="hero-content">
          <h1>{t('All Journeys', '所有旅程', 'すべての旅')}</h1>
          <p className="hero-subtitle">
            {t(
              'Discover amazing travel experiences from around the world',
              '探索來自世界各地的精彩旅行體驗',
              '世界中の素晴らしい旅行体験を発見'
            )}
          </p>
          <div className="journey-count-badge">
            {t(
              `${publishedJourneys.length} journey${publishedJourneys.length !== 1 ? 's' : ''} available`,
              `${publishedJourneys.length} 個旅程可供選擇`,
              `${publishedJourneys.length}つの旅が利用可能`
            )}
          </div>
        </div>
      </div>

      <JourneyFilter 
        onFilterChange={handleFilterChange}
        journeys={journeys}
      />

      {/* Published Journeys */}
      {publishedJourneys.length > 0 && (
        <div className="journey-section">
          <h3 className="section-title">
            {t('Published Adventures', '已發布的冒險', '公開された冒険')}
          </h3>
          <div className="journey-grid">
            {publishedJourneys.map(journey => (
              <JourneyCard
                key={journey.id}
                journey={journey}
                onClick={handleJourneyClick}
                onTagClick={onTagClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Draft/Coming Soon Journeys */}
      {draftJourneys.length > 0 && (
        <div className="journey-section">
          <h3 className="section-title">
            {t('Coming Soon', '即將推出', '近日公開')}
          </h3>
          <div className="journey-grid">
            {draftJourneys.map(journey => (
              <JourneyCard
                key={journey.id}
                journey={journey}
                onClick={null} // No click for drafts
                onTagClick={onTagClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {publishedJourneys.length === 0 && draftJourneys.length === 0 && (
        <div className="no-results">
          <h3>{t('No journeys found', '找不到旅程', '旅が見つかりません')}</h3>
          <p>{t('Try adjusting your filters or search terms', '嘗試調整篩選條件或搜尋詞', 'フィルターや検索条件を調整してみてください')}</p>
        </div>
      )}

      {/* Only drafts found */}
      {publishedJourneys.length === 0 && draftJourneys.length > 0 && (
        <div className="no-results">
          <h3>{t('No published journeys match your search', '沒有已發布的旅程符合您的搜尋', '検索に一致する公開された旅はありません')}</h3>
          <p>{t('But there are some exciting adventures coming soon!', '但有一些令人興奮的冒險即將推出！', 'でも、エキサイティングな冒険が近日公開予定です！')}</p>
        </div>
      )}
    </div>
  )
}

export default JourneyList