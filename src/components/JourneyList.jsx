import React, { useState, useMemo } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import JourneyCard from './JourneyCard'
import JourneyFilter from './JourneyFilter'
import { journeys, searchJourneys } from '../data/journeys'

const JourneyList = ({ onJourneySelect }) => {
  const { currentLang, t } = useLanguage()
  const [filters, setFilters] = useState({
    country: '',
    category: '',
    difficulty: '',
    search: ''
  })

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
      <div className="journey-list-header">
        <h2>{t('All Journeys', '所有旅程')}</h2>
        <p className="journey-count">
          {t(
            `${filteredJourneys.length} journey${filteredJourneys.length !== 1 ? 's' : ''} found`,
            `找到 ${filteredJourneys.length} 個旅程`
          )}
        </p>
      </div>

      <JourneyFilter 
        onFilterChange={handleFilterChange}
        journeys={journeys}
      />

      {/* Published Journeys */}
      {publishedJourneys.length > 0 && (
        <div className="journey-section">
          <h3 className="section-title">
            {t('Published Adventures', '已發布的冒險')}
          </h3>
          <div className="journey-grid">
            {publishedJourneys.map(journey => (
              <JourneyCard
                key={journey.id}
                journey={journey}
                onClick={handleJourneyClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Draft/Coming Soon Journeys */}
      {draftJourneys.length > 0 && (
        <div className="journey-section">
          <h3 className="section-title">
            {t('Coming Soon', '即將推出')}
          </h3>
          <div className="journey-grid">
            {draftJourneys.map(journey => (
              <JourneyCard
                key={journey.id}
                journey={journey}
                onClick={null} // No click for drafts
              />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredJourneys.length === 0 && (
        <div className="no-results">
          <h3>{t('No journeys found', '找不到旅程')}</h3>
          <p>{t('Try adjusting your filters or search terms', '嘗試調整篩選條件或搜尋詞')}</p>
        </div>
      )}
    </div>
  )
}

export default JourneyList