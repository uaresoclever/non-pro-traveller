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
  const [isExpanded, setIsExpanded] = useState(false)

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
    
    // Check if ALL filters are selected (all 4 criteria must be chosen)
    const allFiltersSelected = selectedFilters.difficulty && 
                              selectedFilters.time && 
                              selectedFilters.guide && 
                              selectedFilters.experience
    
    if (!allFiltersSelected) {
      return [] // No recommendations if not all filters selected
    }
    
    // Define trail characteristics for proper filtering
    const trailCharacteristics = {
      '1': { difficulty: 'beginner', time: 'short', guide: 'self', minExperience: 'first-time' },
      '2': { difficulty: 'beginner', time: 'short', guide: 'self', minExperience: 'first-time' }, // Changed from medium to short
      '3': { difficulty: 'moderate', time: 'medium', guide: 'guided', minExperience: 'some' },
      '4': { difficulty: 'moderate', time: 'medium', guide: 'guided', minExperience: 'some' },
      '5': { difficulty: 'challenging', time: 'long', guide: 'guided', minExperience: 'experienced' },
      '6': { difficulty: 'challenging', time: 'long', guide: 'guided', minExperience: 'experienced' },
      '7': { difficulty: 'beginner', time: 'short', guide: 'self', minExperience: 'first-time' }
    }
    
    let recommendations = []
    
    // Filter trails based on selected criteria
    data.forEach(trail => {
      const characteristics = trailCharacteristics[trail.no]
      let score = 0
      let reasons = []
      let isMatch = true
      
      if (!characteristics) {
        return
      }
      
      // Check each filter - trail must match ALL selected filters
      if (selectedFilters.difficulty !== characteristics.difficulty) {
        isMatch = false
      } else {
        score += 1
        if (selectedFilters.difficulty === 'beginner') {
          reasons.push(t('Perfect for beginners', '非常適合新手', '初心者に最適'))
        } else if (selectedFilters.difficulty === 'moderate') {
          reasons.push(t('Good moderate challenge', '適度挑戰', '適度なチャレンジ'))
        } else if (selectedFilters.difficulty === 'challenging') {
          reasons.push(t('Challenging adventure', '具挑戰性冒險', 'チャレンジングな冒険'))
        }
      }
      
      if (isMatch && selectedFilters.time !== characteristics.time) {
        isMatch = false
      } else if (isMatch) {
        score += 1
        if (selectedFilters.time === 'short') {
          reasons.push(t('Quick hike (1-2 hours)', '快速健行（1-2小時）', 'クイックハイク（1-2時間）'))
        } else if (selectedFilters.time === 'medium') {
          reasons.push(t('Perfect timing (2-4 hours)', '完美時間（2-4小時）', '完璧なタイミング（2-4時間）'))
        } else if (selectedFilters.time === 'long') {
          reasons.push(t('Full day adventure (4+ hours)', '全日冒險（4小時以上）', '一日冒険（4時間以上）'))
        }
      }
      
      if (isMatch) {
        if (selectedFilters.guide === 'any') {
          score += 1
          reasons.push(t('Flexible guide options', '靈活嚮導選擇', '柔軟なガイドオプション'))
        } else if (selectedFilters.guide !== characteristics.guide) {
          isMatch = false
        } else {
          score += 1
          if (selectedFilters.guide === 'self') {
            reasons.push(t('Self-guided available', '可自助', 'セルフガイド可能'))
          } else if (selectedFilters.guide === 'guided') {
            reasons.push(t('Professional guide included', '專業嚮導', 'プロガイド付き'))
          }
        }
      }
      
      if (isMatch) {
        // Experience level check - more experienced hikers can do easier trails
        const experienceOrder = { 'first-time': 1, 'some': 2, 'experienced': 3 }
        const userExperience = experienceOrder[selectedFilters.experience]
        const trailMinExperience = experienceOrder[characteristics.minExperience]
        
        if (userExperience >= trailMinExperience) {
          score += 1
          if (selectedFilters.experience === 'first-time') {
            reasons.push(t('Perfect for first-time hikers', '非常適合初次健行者', '初回ハイカーに最適'))
          } else if (selectedFilters.experience === 'some') {
            if (characteristics.minExperience === 'first-time') {
              reasons.push(t('Easy trail for your experience level', '以您的經驗來說很簡單', 'あなたの経験レベルには簡単'))
            } else {
              reasons.push(t('Good match for your experience', '符合您的經驗水平', 'あなたの経験にマッチ'))
            }
          } else if (selectedFilters.experience === 'experienced') {
            if (characteristics.minExperience === 'experienced') {
              reasons.push(t('Perfect challenge for experienced hikers', '經驗豐富者的完美挑戰', '経験豊富なハイカーに最適'))
            } else {
              reasons.push(t('Relaxing trail for your skill level', '以您的技能水平來說很輕鬆', 'あなたのスキルレベルには楽な道'))
            }
          }
        } else {
          isMatch = false
        }
      }
      
      // Add special reasons for specific trails
      if (trail.no === '1' && isMatch) {
        reasons.push(t('Author tested & beginner choice', '作者測試且新手首選', '著者テスト済み・初心者おすすめ'))
      }
      
      if (isMatch && score > 0) {
        recommendations.push({
          ...trail,
          score,
          maxScore: 4, // Always 4 since all filters are required
          reasons
        })
      }
    })

    // Sort by score (highest first), then by trail number
    return recommendations
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score
        return parseInt(a.no) - parseInt(b.no)
      })
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

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      setShowResults(false)
    }
  }

  const recommendedTrails = showResults ? getRecommendedTrails() : []

  return (
    <div className="trail-picker">
      <div className="trail-picker-header" onClick={toggleExpanded}>
        <div className="picker-title-section">
          <div className="picker-icon">💡</div>
          <div className="picker-text">
            <h3>{t('AI Trail Picker', 'AI 步道選擇器', 'AI トレイルピッカー')}</h3>
            <p className="picker-subtitle">
              {t(
                "Don't know which trail to pick? Let AI give you a hand!",
                "不知道選哪條步道？讓AI幫你一把！",
                "どのトレイルを選べばいいかわからない？AIにお任せください！"
              )}
            </p>
          </div>
        </div>
        <button className="expand-btn">
          <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>▼</span>
          <span className="expand-text">
            {isExpanded ? 
              t('Hide Picker', '隱藏選擇器', 'ピッカーを隠す') : 
              t('Try AI Picker', '試試AI選擇器', 'AIピッカーを試す')
            }
          </span>
        </button>
      </div>

      {isExpanded && (
        <div className="trail-picker-content">
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
              disabled={!selectedFilters.difficulty || !selectedFilters.time || !selectedFilters.guide || !selectedFilters.experience}
            >
              {t('Get My Trail Recommendations', '獲取我的步道推薦', '私のトレイル推奨を取得')}
            </button>
            <button className="reset-btn" onClick={resetFilters}>
              {t('Reset', '重置', 'リセット')}
            </button>
          </div>

          {(!selectedFilters.difficulty || !selectedFilters.time || !selectedFilters.guide || !selectedFilters.experience) && (
            <div className="no-filters-message">
              <p>{t(
                '👆 Please select one option from each category above to get accurate trail recommendations!',
                '👆 請從上方每個類別中選擇一個選項以獲得準確的步道推薦！',
                '👆 正確なトレイル推奨を取得するには、上記の各カテゴリから1つのオプションを選択してください！'
              )}</p>
            </div>
          )}

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
                          <h5>{trail.name.replace(/<[^>]*>/g, '')}</h5>
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
                        <span className="detail-item">
                          {trail.selfGuided.includes('✅') ? '✅ ' + t('Self-walkable', '可自行走', 'セルフウォーク可能') : 
                           trail.selfGuided.includes('🧭') ? '🧭 ' + t('Guide required', '需要嚮導', 'ガイド必要') : 
                           trail.selfGuided}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-recommendations">
                  <p>{t(
                    'No trails match your selected criteria. Please try different filter combinations or check out Trail #1 - our beginner favorite!',
                    '沒有步道符合您選擇的條件。請嘗試不同的篩選組合或查看步道#1 - 我們的新手最愛！',
                    '選択した条件に一致するトレイルがありません。異なるフィルターの組み合わせを試すか、トレイル#1をチェックしてください - 初心者のお気に入りです！'
                  )}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TrailPicker