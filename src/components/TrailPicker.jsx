import React, { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { trailData } from '../data/trailData'

const TrailPicker = () => {
  const { currentLang, t } = useLanguage()
  const [selectedFilters, setSelectedFilters] = useState({
    difficulty: '',
    time: '',
    guide: '',
    experience: ''
  })
  const [showResults, setShowResults] = useState(false)

  const filterOptions = {
    difficulty: {
      label: t('Difficulty Level', '難度等級', '難易度レベル'),
      options: [
        { value: 'beginner', label: t('Beginner Friendly', '新手友善', '初心者向け') },
        { value: 'moderate', label: t('Moderate', '中等', '中級') },
        { value: 'challenging', label: t('Challenging', '具挑戰性', '上級') }
      ]
    },
    time: {
      label: t('Available Time', '可用時間', '利用可能時間'),
      options: [
        { value: 'short', label: t('1-2 hours', '1-2小時', '1-2時間') },
        { value: 'medium', label: t('2-4 hours', '2-4小時', '2-4時間') },
        { value: 'long', label: t('4+ hours', '4小時以上', '4時間以上') }
      ]
    },
    guide: {
      label: t('Guide Preference', '嚮導偏好', 'ガイド希望'),
      options: [
        { value: 'self', label: t('Self-guided only', '僅自助', 'セルフガイドのみ') },
        { value: 'guided', label: t('Guided tours OK', '嚮導團可以', 'ガイドツアーOK') },
        { value: 'any', label: t('Either is fine', '都可以', 'どちらでも') }
      ]
    },
    experience: {
      label: t('Hiking Experience', '健行經驗', 'ハイキング経験'),
      options: [
        { value: 'first-time', label: t('First time hiker', '初次健行', '初回ハイカー') },
        { value: 'some', label: t('Some experience', '有些經驗', '少し経験あり') },
        { value: 'experienced', label: t('Very experienced', '很有經驗', '非常に経験豊富') }
      ]
    }
  }

  const getRecommendedTrails = () => {
    const data = trailData[currentLang]
    let recommendations = []
    
    // Calculate maximum possible score based on selected filters
    let maxPossibleScore = 0
    if (selectedFilters.difficulty) maxPossibleScore += 3
    if (selectedFilters.time) maxPossibleScore += 2
    if (selectedFilters.guide) maxPossibleScore += 2
    if (selectedFilters.experience) maxPossibleScore += 3

    // Trail scoring based on filters
    data.forEach(trail => {
      let score = 0
      let reasons = []

      // Difficulty scoring
      if (selectedFilters.difficulty === 'beginner') {
        if (trail.no === '1' || trail.no === '7') {
          score += 3
          reasons.push(t('Perfect for beginners', '非常適合新手', '初心者に最適'))
        } else if (trail.no === '2') {
          score += 2
          reasons.push(t('Good for beginners', '適合新手', '初心者に良い'))
        }
      } else if (selectedFilters.difficulty === 'moderate') {
        if (trail.no === '3' || trail.no === '4') {
          score += 3
          reasons.push(t('Good moderate challenge', '適度挑戰', '適度なチャレンジ'))
        }
      } else if (selectedFilters.difficulty === 'challenging') {
        if (trail.no === '5' || trail.no === '6') {
          score += 3
          reasons.push(t('Challenging adventure', '具挑戰性冒險', 'チャレンジングな冒険'))
        }
      }

      // Time scoring
      if (selectedFilters.time === 'short') {
        if (trail.distance.includes('45') || trail.distance.includes('60') || trail.distance.includes('1.2')) {
          score += 2
          reasons.push(t('Quick hike', '快速健行', 'クイックハイク'))
        }
      } else if (selectedFilters.time === 'medium') {
        if (trail.distance.includes('2 hours') || trail.distance.includes('3 hours')) {
          score += 2
          reasons.push(t('Perfect timing', '完美時間', '完璧なタイミング'))
        }
      } else if (selectedFilters.time === 'long') {
        if (trail.distance.includes('6 hours') || trail.distance.includes('8 km')) {
          score += 2
          reasons.push(t('Full day adventure', '全日冒險', '一日冒険'))
        }
      }

      // Guide preference scoring
      if (selectedFilters.guide === 'self') {
        if (trail.selfGuided.includes('✅') || trail.selfGuided.includes('No guide')) {
          score += 2
          reasons.push(t('Self-guided available', '可自助', 'セルフガイド可能'))
        }
      } else if (selectedFilters.guide === 'guided') {
        if (trail.selfGuided.includes('🧭') || trail.selfGuided.includes('Guide required')) {
          score += 2
          reasons.push(t('Professional guide included', '專業嚮導', 'プロガイド付き'))
        }
      } else if (selectedFilters.guide === 'any') {
        score += 1
        reasons.push(t('Flexible guide options', '靈活嚮導選擇', '柔軟なガイドオプション'))
      }

      // Experience scoring
      if (selectedFilters.experience === 'first-time') {
        if (trail.no === '1') {
          score += 3
          reasons.push(t('Author tested & beginner choice', '作者測試且新手首選', '著者テスト済み・初心者おすすめ'))
        } else if (trail.no === '7') {
          score += 2
          reasons.push(t('Easy and scenic', '簡單且風景優美', '簡単で景色が良い'))
        }
      } else if (selectedFilters.experience === 'some') {
        if (trail.no === '2' || trail.no === '3' || trail.no === '4') {
          score += 2
          reasons.push(t('Good for intermediate hikers', '適合中級健行者', '中級ハイカーに適している'))
        }
      } else if (selectedFilters.experience === 'experienced') {
        if (trail.no === '5' || trail.no === '6') {
          score += 3
          reasons.push(t('Perfect for experienced hikers', '經驗豐富健行者的完美選擇', '経験豊富なハイカーに最適'))
        }
      }

      if (score > 0) {
        recommendations.push({
          ...trail,
          score,
          maxScore: maxPossibleScore,
          reasons
        })
      }
    })

    // Sort by score and return top 3
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
  }

  const handleFilterChange = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: value
    }))
  }

  const handleGetRecommendations = () => {
    setShowResults(true)
  }

  const resetFilters = () => {
    setSelectedFilters({
      difficulty: '',
      time: '',
      guide: '',
      experience: ''
    })
    setShowResults(false)
  }

  const recommendedTrails = showResults ? getRecommendedTrails() : []

  return (
    <div className="trail-picker">
      <div className="trail-picker-header">
        <h3>{t('🎯 Trail Picker', '🎯 步道選擇器', '🎯 トレイルピッカー')}</h3>
        <p>{t(
          'Answer a few questions to find the perfect trail for you!',
          '回答幾個問題，找到最適合您的步道！',
          'いくつかの質問に答えて、あなたにぴったりのトレイルを見つけましょう！'
        )}</p>
      </div>

      <div className="trail-picker-filters">
        {Object.entries(filterOptions).map(([category, config]) => (
          <div key={category} className="filter-group">
            <label className="filter-label">{config.label}</label>
            <div className="filter-options">
              {config.options.map(option => (
                <button
                  key={option.value}
                  className={`filter-option ${selectedFilters[category] === option.value ? 'active' : ''}`}
                  onClick={() => handleFilterChange(category, option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="trail-picker-actions">
        <button 
          className="get-recommendations-btn"
          onClick={handleGetRecommendations}
          disabled={Object.values(selectedFilters).every(v => !v)}
        >
          {t('Get My Trail Recommendations', '獲取我的步道推薦', '私のトレイル推奨を取得')}
        </button>
        <button className="reset-btn" onClick={resetFilters}>
          {t('Reset', '重置', 'リセット')}
        </button>
      </div>

      {showResults && (
        <div className="trail-recommendations">
          <h4>{t('🌟 Recommended Trails for You', '🌟 為您推薦的步道', '🌟 あなたにおすすめのトレイル')}</h4>
          
          {recommendedTrails.length > 0 ? (
            <div className="recommendations-list">
              {recommendedTrails.map((trail, index) => (
                <div key={trail.no} className="recommendation-card">
                  <div className="recommendation-header">
                    <div className="recommendation-rank">#{index + 1}</div>
                    <div className="recommendation-info">
                      <h5 dangerouslySetInnerHTML={{ __html: trail.name }} />
                      <div className="recommendation-meta">
                        <span className="trail-number">Trail #{trail.no}</span>
                        <span className="recommendation-score">
                          {t('Match Score', '匹配分數', 'マッチスコア')}: {trail.score}/{trail.maxScore}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="recommendation-reasons">
                    <strong>{t('Why this trail:', '為什麼選這條步道：', 'なぜこのトレイル：')}</strong>
                    <ul>
                      {trail.reasons.map((reason, idx) => (
                        <li key={idx}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="recommendation-details">
                    <span className="detail-item">📏 {trail.distance}</span>
                    <span className="detail-item" dangerouslySetInnerHTML={{ __html: trail.selfGuided }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-recommendations">
              <p>{t(
                'No perfect matches found. Try adjusting your preferences or check out Trail #1 - our beginner favorite!',
                '沒有找到完美匹配。嘗試調整您的偏好或查看步道#1 - 我們的新手最愛！',
                '完璧なマッチが見つかりませんでした。設定を調整するか、トレイル#1をチェックしてください - 初心者のお気に入りです！'
              )}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TrailPicker