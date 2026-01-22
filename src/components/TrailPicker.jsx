import React, { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { trailData } from '../data/trailData'

const TrailPicker = () => {
  const { currentLang, t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const questions = [
    {
      id: 'time',
      question: t('How much time do you have?', '你有多少時間？', 'どのくらい時間がありますか？'),
      options: [
        { value: 'short', label: t('1-2 hours (Quick hike)', '1-2小時（快速健行）', '1-2時間（クイックハイク）'), emoji: '⚡' },
        { value: 'medium', label: t('2-3 hours (Half day)', '2-3小時（半日）', '2-3時間（半日）'), emoji: '🌅' },
        { value: 'long', label: t('3+ hours (Full day)', '3小時以上（全日）', '3時間以上（一日）'), emoji: '🌄' }
      ]
    },
    {
      id: 'experience',
      question: t('What\'s your hiking experience?', '你的健行經驗如何？', 'ハイキング経験はどうですか？'),
      options: [
        { value: 'beginner', label: t('First time / Beginner', '初次 / 新手', '初回 / 初心者'), emoji: '🌱' },
        { value: 'some', label: t('Some experience', '有些經驗', '少し経験あり'), emoji: '🥾' },
        { value: 'experienced', label: t('Very experienced', '很有經驗', '非常に経験豊富'), emoji: '🏔️' }
      ]
    },
    {
      id: 'guide',
      question: t('Do you prefer a guide?', '你偏好嚮導嗎？', 'ガイドを希望しますか？'),
      options: [
        { value: 'self', label: t('I want to explore on my own', '我想自己探索', '自分で探索したい'), emoji: '🚶' },
        { value: 'guided', label: t('I\'d like a guide to show me around', '我想要嚮導帶領', 'ガイドに案内してもらいたい'), emoji: '👥' },
        { value: 'any', label: t('Either is fine with me', '都可以', 'どちらでも大丈夫'), emoji: '🤷' }
      ]
    }
  ]

  const getRecommendedTrails = () => {
    const data = trailData[currentLang]
    
    // Simple mapping based on answers
    let recommendedTrailNos = []
    
    if (answers.time === 'short') {
      if (answers.experience === 'beginner') {
        recommendedTrailNos = ['1', '2', '7'] // Easy short trails
      } else {
        recommendedTrailNos = ['1', '2', '4', '7'] // All short trails for experienced
      }
    } else if (answers.time === 'medium') {
      if (answers.experience === 'beginner') {
        recommendedTrailNos = ['2', '3'] // Easier medium trails
      } else {
        if (answers.guide === 'self') {
          recommendedTrailNos = ['2'] // Only Trail 2 is self-guided medium
        } else {
          recommendedTrailNos = ['3', '5'] // Guided medium trails
        }
      }
    } else if (answers.time === 'long') {
      if (answers.experience === 'experienced') {
        recommendedTrailNos = ['6'] // Only Trail 6 is truly long (6 hours)
      } else {
        recommendedTrailNos = ['5', '6'] // Trail 5 (3hrs) and 6 (6hrs) for long time
      }
    }

    // Filter out trails that don't match guide preference
    if (answers.guide === 'self') {
      recommendedTrailNos = recommendedTrailNos.filter(no => ['1', '2', '7'].includes(no)) // Self-guided: 1, 2, 7
    } else if (answers.guide === 'guided') {
      recommendedTrailNos = recommendedTrailNos.filter(no => ['3', '4', '5', '6'].includes(no)) // Guided: 3, 4, 5, 6
    }

    // Get trail data and add reasons
    const recommendations = recommendedTrailNos.map(no => {
      const trail = data.find(t => t.no === no)
      if (!trail) return null
      
      const reasons = []
      
      // Add reasons based on answers
      if (answers.time === 'short') {
        reasons.push(t('Perfect for your time limit', '符合你的時間限制', 'あなたの時間制限に最適'))
      } else if (answers.time === 'medium') {
        reasons.push(t('Good half-day adventure', '很好的半日冒險', '良い半日の冒険'))
      } else {
        reasons.push(t('Full day experience', '全日體驗', '一日体験'))
      }
      
      if (answers.experience === 'beginner') {
        reasons.push(t('Beginner friendly', '新手友善', '初心者向け'))
      } else if (answers.experience === 'experienced') {
        reasons.push(t('Good challenge for experienced hikers', '對有經驗健行者的好挑戰', '経験豊富なハイカーに良いチャレンジ'))
      }
      
      if (trail.no === '1') {
        reasons.push(t('Author tested & recommended', '作者測試推薦', '著者テスト済み推奨'))
      }
      
      return {
        ...trail,
        reasons
      }
    }).filter(Boolean)

    return recommendations.slice(0, 3)
  }

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[currentStep].id]: value }
    setAnswers(newAnswers)
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const resetPicker = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResults(false)
  }

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setShowResults(false)
    }
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      resetPicker()
    }
  }

  const recommendedTrails = showResults ? getRecommendedTrails() : []

  return (
    <div className="trail-picker">
      <div className="trail-picker-header" onClick={toggleExpanded}>
        <div className="picker-title-section">
          <div className="picker-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13 3L15 5V7H9V5L11 3L9 1L3 7V9H21ZM3 19V21H21V19H3ZM5 11H19C19.6 11 20 11.4 20 12V17H4V12C4 11.4 4.4 11 5 11ZM7 13V15H17V13H7Z" fill="currentColor"/>
              <circle cx="12" cy="14" r="1.5" fill="currentColor" opacity="0.7"/>
              <path d="M8 14L10 12L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
              <path d="M16 10L14 12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
            </svg>
          </div>
          <div className="picker-text">
            <h3>{t('Trail Finder', '步道尋找器', 'トレイルファインダー')}</h3>
            <p className="picker-subtitle">
              {t(
                "Answer 3 simple questions to find your perfect trail!",
                "回答3個簡單問題找到完美步道！",
                "3つの簡単な質問に答えて完璧なトレイルを見つけよう！"
              )}
            </p>
          </div>
        </div>
        <button className="expand-btn">
          <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>▼</span>
          <span className="expand-text">
            {isExpanded ? 
              t('Hide Finder', '隱藏尋找器', 'ファインダーを隠す') : 
              t('Find My Trail', '找我的步道', '私のトレイルを探す')
            }
          </span>
        </button>
      </div>

      {isExpanded && (
        <div className="trail-picker-content">
          {!showResults ? (
            <div className="question-wizard">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}></div>
              </div>
              
              <div className="question-step">
                <div className="step-number">
                  {t('Question', '問題', '質問')} {currentStep + 1} / {questions.length}
                </div>
                
                <h4 className="question-text">{questions[currentStep].question}</h4>
                
                <div className="answer-options">
                  {questions[currentStep].options.map(option => (
                    <button
                      key={option.value}
                      className="answer-option"
                      onClick={() => handleAnswer(option.value)}
                    >
                      <span className="option-emoji">{option.emoji}</span>
                      <span className="option-text">{option.label}</span>
                    </button>
                  ))}
                </div>
                
                {currentStep > 0 && (
                  <button className="back-btn" onClick={goBack}>
                    ← {t('Back', '返回', '戻る')}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="trail-recommendations">
              <h4>{t('🌟 Perfect Trails for You!', '🌟 為你推薦的完美步道！', '🌟 あなたにぴったりのトレイル！')}</h4>
              
              {recommendedTrails.length > 0 ? (
                <div className="recommendations-list">
                  {recommendedTrails.map((trail, index) => (
                    <div key={trail.no} className="recommendation-card">
                      <div className="recommendation-header">
                        <div className="recommendation-rank">#{trail.no}</div>
                        <div className="recommendation-info">
                          <h5>{trail.name.replace(/<[^>]*>/g, '')}</h5>
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
                    'Hmm, let me recommend Trail #1 - it\'s perfect for everyone!',
                    '嗯，讓我推薦步道#1 - 它適合所有人！',
                    'うーん、トレイル#1をお勧めします - 誰にでも最適です！'
                  )}</p>
                </div>
              )}
              
              <button className="reset-btn" onClick={resetPicker}>
                {t('Start Over', '重新開始', 'やり直す')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TrailPicker