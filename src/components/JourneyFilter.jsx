import React, { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { journeyCategories, difficultyLevels } from '../data/journeyStructure'

const JourneyFilter = ({ onFilterChange, journeys }) => {
  const { currentLang, t } = useLanguage()
  const [filters, setFilters] = useState({
    country: '',
    category: '',
    difficulty: '',
    search: ''
  })

  // Get unique countries from journeys
  const countries = [...new Set(journeys.map(j => j.country.code))]
    .map(code => journeys.find(j => j.country.code === code).country)

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const emptyFilters = { country: '', category: '', difficulty: '', search: '' }
    setFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  const getCategoryLabel = (category) => {
    const labels = {
      hiking: { en: 'Hiking', zh: '健行', ja: 'ハイキング' },
      city: { en: 'City', zh: '城市', ja: '都市' },
      food: { en: 'Food', zh: '美食', ja: 'グルメ' },
      culture: { en: 'Culture', zh: '文化', ja: '文化' },
      adventure: { en: 'Adventure', zh: '冒險', ja: 'アドベンチャー' },
      beach: { en: 'Beach', zh: '海灘', ja: 'ビーチ' },
      mountain: { en: 'Mountain', zh: '山岳', ja: '山' },
      wildlife: { en: 'Wildlife', zh: '野生動物', ja: '野生動物' }
    }
    return labels[category]?.[currentLang] || category
  }

  const getDifficultyLabel = (difficulty) => {
    const labels = {
      easy: { en: 'Easy', zh: '簡單', ja: '簡単' },
      moderate: { en: 'Moderate', zh: '中等', ja: '中級' },
      hard: { en: 'Hard', zh: '困難', ja: '困難' },
      extreme: { en: 'Extreme', zh: '極難', ja: '極限' }
    }
    return labels[difficulty]?.[currentLang] || difficulty
  }

  return (
    <div className="journey-filter">
      <div className="filter-header">
        <h3>{t('Filter Journeys', '篩選旅程', 'ジャーニーをフィルター')}</h3>
        <button className="clear-filters" onClick={clearFilters}>
          {t('Clear All', '清除全部', 'すべてクリア')}
        </button>
      </div>

      <div className="filter-controls">
        {/* Search */}
        <div className="filter-group">
          <label>{t('Search', '搜尋', '検索')}</label>
          <input
            type="text"
            placeholder={t('Search journeys...', '搜尋旅程...', 'ジャーニーを検索...')}
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="search-input"
          />
        </div>

        {/* Country Filter */}
        <div className="filter-group">
          <label>{t('Country', '國家', '国')}</label>
          <select
            value={filters.country}
            onChange={(e) => handleFilterChange('country', e.target.value)}
            className="filter-select"
          >
            <option value="">{t('All Countries', '所有國家', 'すべての国')}</option>
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name[currentLang]}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="filter-group">
          <label>{t('Category', '類別', 'カテゴリー')}</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="filter-select"
          >
            <option value="">{t('All Categories', '所有類別', 'すべてのカテゴリー')}</option>
            {Object.values(journeyCategories).map(category => (
              <option key={category} value={category}>
                {getCategoryLabel(category)}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className="filter-group">
          <label>{t('Difficulty', '難度', '難易度')}</label>
          <select
            value={filters.difficulty}
            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
            className="filter-select"
          >
            <option value="">{t('All Levels', '所有等級', 'すべてのレベル')}</option>
            {Object.values(difficultyLevels).map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {getDifficultyLabel(difficulty)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="active-filters">
        {Object.entries(filters).map(([key, value]) => {
          if (!value) return null
          
          let displayValue = value
          if (key === 'country') {
            const country = countries.find(c => c.code === value)
            displayValue = `${country.flag} ${country.name[currentLang]}`
          } else if (key === 'category') {
            displayValue = getCategoryLabel(value)
          } else if (key === 'difficulty') {
            displayValue = getDifficultyLabel(value)
          }

          return (
            <span key={key} className="active-filter">
              {displayValue}
              <button onClick={() => handleFilterChange(key, '')}>×</button>
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default JourneyFilter