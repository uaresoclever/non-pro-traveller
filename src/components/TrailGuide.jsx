import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import TrailGrid from './TrailGrid'
import { trackTagClick, trackExternalLink } from '../utils/analytics'
import { journeys } from '../data/journeys'

const TrailGuide = ({ journey, onBackClick, onTagClick, onViewAllClick }) => {
  const { currentLang, t } = useLanguage()

  const handleTagClick = (tag) => {
    // Track tag click
    trackTagClick(tag, currentLang)
    
    if (onTagClick) {
      onTagClick(tag)
    }
  }

  const handleExternalLinkClick = (url, linkText) => {
    // Track external link click
    trackExternalLink(url, linkText)
  }

  // If no specific journey is provided, show the default Khao Yai guide
  if (!journey) {
    // Get the Khao Yai journey data for publish date and other info
    const khaoyaiJourney = journeys.find(j => j.id === 'khao-yai-hiking')
    
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

          {/* Add journey metadata */}
          {khaoyaiJourney && (
            <div className="journey-details">
              <div className="detail-item">
                <span className="detail-label">{t('Country', '國家', '国')}:</span>
                <span className="detail-value">
                  {khaoyaiJourney.country.flag} {khaoyaiJourney.country.name[currentLang]}
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label">{t('Duration', '時長', '期間')}:</span>
                <span className="detail-value">
                  {khaoyaiJourney.duration.min === khaoyaiJourney.duration.max 
                    ? `${khaoyaiJourney.duration.min} ${t('day', '天', '日')}${khaoyaiJourney.duration.min > 1 ? 's' : ''}`
                    : `${khaoyaiJourney.duration.min}-${khaoyaiJourney.duration.max} ${t('days', '天', '日間')}`
                  }
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label">{t('Best Time', '最佳時間', 'ベストシーズン')}:</span>
                <span className="detail-value">{khaoyaiJourney.bestTime[currentLang]}</span>
              </div>

              {khaoyaiJourney.budget && (
                <div className="detail-item">
                  <span className="detail-label">{t('Budget', '預算', '予算')}:</span>
                  <span className="detail-value">{khaoyaiJourney.budget[currentLang]}</span>
                </div>
              )}

              {khaoyaiJourney.publishDate && (
                <div className="detail-item">
                  <span className="detail-label">{t('Published', '發布日期', '公開日')}:</span>
                  <span className="detail-value">
                    {new Date(khaoyaiJourney.publishDate).toLocaleDateString(
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
          )}

          {/* Add tags section */}
          {khaoyaiJourney && (
            <div className="journey-tags">
              <h4>{t('Tags', '標籤', 'タグ')}:</h4>
              <div className="tags-container">
                {khaoyaiJourney.tags[currentLang].map((tag, index) => (
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
          )}
          
          <TrailGrid />

          {/* Useful Links Section */}
          <div className="useful-links-section">
            <h3>{t('Useful Links & Resources', '實用連結與資源', '便利なリンクとリソース')}</h3>
            <div className="links-grid">
              <div className="link-category">
                <h4>{t('Official Information', '官方資訊', '公式情報')}</h4>
                <ul className="links-list">
                  <li>
                    <a 
                      href="https://www.dnp.go.th/parkreserve/khaoyai" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => handleExternalLinkClick('https://www.dnp.go.th/parkreserve/khaoyai', 'Khao Yai Official Website')}
                    >
                      🏛️ {t('Khao Yai National Park Official Website', '考艾國家公園官方網站', 'カオヤイ国立公園公式サイト')}
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://nps.dnp.go.th/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => handleExternalLinkClick('https://nps.dnp.go.th/', 'Thailand National Parks Service')}
                    >
                      🌳 {t('Thailand National Parks Service', '泰國國家公園服務', 'タイ国立公園サービス')}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="link-category">
                <h4>{t('Booking & Accommodation', '預訂與住宿', '予約・宿泊')}</h4>
                <ul className="links-list">
                  <li>
                    <a href="https://nps.dnp.go.th/reservation.php" target="_blank" rel="noopener noreferrer">
                      🏕️ {t('Park Accommodation Booking', '公園住宿預訂', '公園宿泊予約')}
                    </a>
                  </li>
                  <li>
                    <a href="https://www.agoda.com/khao-yai" target="_blank" rel="noopener noreferrer">
                      🏨 {t('Hotels near Khao Yai (Agoda)', '考艾附近酒店 (Agoda)', 'カオヤイ周辺ホテル (Agoda)')}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="link-category">
                <h4>{t('Transportation', '交通資訊', '交通情報')}</h4>
                <ul className="links-list">
                  <li>
                    <a href="https://www.rentalcars.com/en/city/th/nakhon-ratchasima/" target="_blank" rel="noopener noreferrer">
                      🚗 {t('Car Rental Options', '租車選擇', 'レンタカーオプション')}
                    </a>
                  </li>
                  <li>
                    <a href="https://12go.asia/en/travel/bangkok/khao-yai" target="_blank" rel="noopener noreferrer">
                      🚌 {t('Bus & Transport from Bangkok', '從曼谷的巴士與交通', 'バンコクからのバス・交通')}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="link-category">
                <h4>{t('Weather & Planning', '天氣與規劃', '天気・計画')}</h4>
                <ul className="links-list">
                  <li>
                    <a href="https://weather.com/weather/today/l/Khao+Yai+National+Park+Thailand" target="_blank" rel="noopener noreferrer">
                      🌤️ {t('Current Weather Forecast', '當前天氣預報', '現在の天気予報')}
                    </a>
                  </li>
                  <li>
                    <a href="https://www.timeanddate.com/weather/thailand/nakhon-ratchasima" target="_blank" rel="noopener noreferrer">
                      📅 {t('Best Time to Visit Guide', '最佳參觀時間指南', 'ベスト訪問時期ガイド')}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="link-category">
                <h4>{t('Safety & Emergency', '安全與緊急', '安全・緊急')}</h4>
                <ul className="links-list">
                  <li>
                    <a href="tel:1669" className="emergency-link">
                      🚨 {t('Thailand Emergency Services: 1669', '泰國緊急服務：1669', 'タイ緊急サービス：1669')}
                    </a>
                  </li>
                  <li>
                    <a href="https://www.tourismthailand.org/About-Thailand/Safety-Tips" target="_blank" rel="noopener noreferrer">
                      🛡️ {t('Thailand Travel Safety Tips', '泰國旅遊安全提示', 'タイ旅行安全のヒント')}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="link-category">
                <h4>{t('Local Services', '當地服務', 'ローカルサービス')}</h4>
                <ul className="links-list">
                  <li>
                    <a href="https://goo.gl/maps/KhaoYaiVisitorCenter" target="_blank" rel="noopener noreferrer">
                      📍 {t('Visitor Center Location (Google Maps)', '遊客中心位置 (Google地圖)', 'ビジターセンター位置 (Googleマップ)')}
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/khaoyainationalpark" target="_blank" rel="noopener noreferrer">
                      📱 {t('Khao Yai National Park Facebook', '考艾國家公園Facebook', 'カオヤイ国立公園Facebook')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="links-disclaimer">
              <p>
                <small>
                  {t(
                    '* External links are provided for convenience. Please verify current information before your visit.',
                    '* 外部連結僅供參考，請在造訪前確認最新資訊。',
                    '* 外部リンクは便宜上提供されています。訪問前に最新情報をご確認ください。'
                  )}
                </small>
              </p>
            </div>
          </div>
          
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