import React, { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import TrailGrid from './TrailGrid'
import TrailPicker from './TrailPicker'
import PhotoGallery from './PhotoGallery'
import KhaoYaiWeather from './KhaoYaiWeather'
import { trackTagClick, trackExternalLink } from '../utils/analytics'
import { journeys } from '../data/journeys'

const TrailGuide = ({ journey, onBackClick, onTagClick, onViewAllClick }) => {
  const { currentLang, t } = useLanguage()
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

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

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded)
  }

  // If no specific journey is provided, show the default Khao Yai guide
  if (!journey) {
    // Get the Khao Yai journey data and show it consistently
    const khaoyaiJourney = journeys.find(j => j.id === 'khao-yai-hiking')
    if (khaoyaiJourney) {
      // Recursively call with the actual journey data to ensure consistency
      return (
        <TrailGuide 
          journey={khaoyaiJourney} 
          onBackClick={onBackClick}
          onTagClick={onTagClick}
          onViewAllClick={onViewAllClick}
        />
      )
    }
    
    return (
      <section className="journeys">
        <div className="journey-card">
          <h2>Journey not found</h2>
          <p>The requested journey could not be found.</p>
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
      
      <div className="journey-layout">
        {/* Main Content */}
        <div className="journey-main-content">
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

            {/* Photo Gallery */}
            {journey.photos && journey.photos.length > 0 && (
              <PhotoGallery 
                photos={journey.photos}
                title={t('Journey Photos', '旅程照片', '旅の写真')}
              />
            )}

        {/* Temple-specific content */}
        {journey.content?.type === 'temple_visit' && (
          <div className="temple-content">
            {/* Temple Description */}
            {journey.content.data.description && (
              <div className="temple-description">
                <h3>{t('About This Place', '關於這個地方', 'この場所について')}</h3>
                <p>{journey.content.data.description[currentLang]}</p>
              </div>
            )}

            {/* Author Experience */}
            {journey.content.data.authorExperience && (
              <div className="author-experience">
                <h3>{t('Our Experience', '我們的體驗', '私たちの体験')}</h3>
                <p>{journey.content.data.authorExperience[currentLang]}</p>
              </div>
            )}

            {/* Temple Information */}
            {journey.content.data.templeInfo && (
              <div className="temple-info">
                <h3>{t('Temple Information', '寺廟資訊', '寺院情報')}</h3>
                <div className="temple-details">
                  <div className="detail-item">
                    <span className="detail-label">{t('Temple Name', '寺廟名稱', '寺院名')}:</span>
                    <span className="detail-value">{journey.content.data.templeInfo.name[currentLang]}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">{t('Style', '風格', 'スタイル')}:</span>
                    <span className="detail-value">{journey.content.data.templeInfo.style[currentLang]}</span>
                  </div>
                  {journey.content.data.templeInfo.specialFeatures && (
                    <div className="detail-item">
                      <span className="detail-label">{t('Special Features', '特色', '特徴')}:</span>
                      <div className="special-features">
                        {journey.content.data.templeInfo.specialFeatures[currentLang].map((feature, index) => (
                          <span key={index} className="feature-tag">✨ {feature}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Activities */}
            {journey.content.data.activities && (
              <div className="temple-activities">
                <h3>{t('Activities', '活動', 'アクティビティ')}</h3>
                <div className="activities-list">
                  {journey.content.data.activities.map((activity, index) => (
                    <span key={index} className="activity-tag">
                      {activity === 'sunrise viewing' ? '🌅' :
                       activity === 'meditation' ? '🧘' :
                       activity === 'temple exploration' ? '🏛️' :
                       activity === 'scenic viewing' ? '🏔️' :
                       activity === 'photography' ? '📸' :
                       activity === 'spiritual reflection' ? '🙏' : '✨'} {activity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Facilities */}
            {journey.content.data.facilities && (
              <div className="temple-facilities">
                <h3>{t('Facilities', '設施', '施設')}</h3>
                <div className="facilities-grid">
                  {Object.entries(journey.content.data.facilities).map(([facility, available]) => (
                    <div key={facility} className={`facility-item ${available ? 'available' : 'not-available'}`}>
                      <span className="facility-icon">
                        {facility === 'parking' ? '🅿️' :
                         facility === 'restrooms' ? '🚻' :
                         facility === 'restaurant' ? '🍽️' :
                         facility === 'accommodation' ? '🏨' :
                         facility === 'giftShop' ? '🛍️' : '📍'}
                      </span>
                      <span className="facility-name">
                        {t(
                          facility.charAt(0).toUpperCase() + facility.slice(1).replace(/([A-Z])/g, ' $1'),
                          facility === 'parking' ? '停車場' :
                          facility === 'restrooms' ? '洗手間' :
                          facility === 'restaurant' ? '餐廳' :
                          facility === 'accommodation' ? '住宿' :
                          facility === 'giftShop' ? '紀念品店' : facility,
                          facility === 'parking' ? '駐車場' :
                          facility === 'restrooms' ? 'トイレ' :
                          facility === 'restaurant' ? 'レストラン' :
                          facility === 'accommodation' ? '宿泊' :
                          facility === 'giftShop' ? 'ギフトショップ' : facility
                        )}
                      </span>
                      <span className="facility-status">
                        {available ? '✅' : '❌'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            {journey.content.data.tips && (
              <div className="temple-tips">
                <h3>{t('Tips & Recommendations', '建議與提醒', 'ヒント・おすすめ')}</h3>
                <ul className="tips-list">
                  {journey.content.data.tips[currentLang].map((tip, index) => (
                    <li key={index} className="tip-item">
                      <span className="tip-icon">💡</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Journeys */}
            {journey.content.data.relatedJourneys && journey.content.data.relatedJourneys.length > 0 && (
              <div className="related-journeys">
                <h3>{t('Continue Your Adventure', '繼續您的冒險', '冒険を続ける')}</h3>
                {journey.content.data.relatedJourneys.map((relatedJourney, index) => (
                  <div key={index} className="related-journey-card">
                    <h4>
                      <a href="#" onClick={(e) => {
                        e.preventDefault();
                        // Find and show the related journey
                        const targetJourney = journeys.find(j => j.id === relatedJourney.id);
                        if (targetJourney && onTagClick) {
                          // This will trigger showing the hiking trails
                          window.scrollTo(0, 0);
                          onTagClick('hiking');
                        }
                      }}>
                        🔗 {relatedJourney.title[currentLang]}
                      </a>
                    </h4>
                    <p>{relatedJourney.description[currentLang]}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Hiking trails specific content */}
        {journey.content?.type === 'hiking_trails' && (
          <>
            {/* Park Description Section - Collapsible */}
            <div className="park-description">
              <div className="description-header" onClick={toggleDescription}>
                <h3>{t('About Khao Yai National Park', '關於考艾國家公園', 'カオヤイ国立公園について')}</h3>
                <button className="collapse-btn">
                  {isDescriptionExpanded ? '▼' : '▶'} {t(
                    isDescriptionExpanded ? 'Show less' : 'Want to read more?',
                    isDescriptionExpanded ? '收起' : '想了解更多？',
                    isDescriptionExpanded ? '閉じる' : 'もっと読みたい？'
                  )}
                </button>
              </div>
              
              {isDescriptionExpanded && (
                <div className="description-content">
                  <p>
                    {t(
                      "Established in 1962 as Thailand's first national park, Khao Yai is widely regarded as the best national park in Thailand for wildlife viewing. Located primarily in Nakhon Ratchasima Province and extending into Prachinburi, Saraburi, and Nakhon Nayok provinces, the park covers an impressive 2,168 km² of diverse ecosystems.",
                      "考艾國家公園成立於1962年，是泰國第一個國家公園，被廣泛認為是泰國觀賞野生動物的最佳國家公園。主要位於呵叻府，並延伸至北柳府、沙拉武里府和那空那育府，公園佔地2,168平方公里，擁有多樣化的生態系統。",
                      "1962年にタイ初の国立公園として設立されたカオヤイは、野生動物観察においてタイ最高の国立公園として広く認められています。主にナコーンラーチャシーマー県に位置し、プラチンブリー県、サラブリー県、ナコーンナーヨック県にまたがり、2,168km²の多様な生態系を誇ります。"
                    )}
                  </p>
                  
                  <p>
                    {t(
                      "As part of the UNESCO World Heritage Dong Phayayen-Khao Yai Forest Complex, the park features elevations ranging from 400 to 1,000 meters above sea level, with Khao Rom peak reaching 1,351 meters. The diverse landscape encompasses rainforests, evergreen forests, and grasslands, creating perfect habitats for an incredible variety of wildlife.",
                      "作為聯合國教科文組織世界遺產東帕雅延-考艾森林綜合體的一部分，公園海拔從400米到1,000米不等，考艾羅姆峰高達1,351米。多樣化的地貌包括雨林、常綠森林和草原，為各種野生動物創造了完美的棲息地。",
                      "ユネスコ世界遺産ドンパヤーイェン・カオヤイ森林群の一部として、公園は海抜400〜1,000メートルの標高を持ち、カオロム峰は1,351メートルに達します。熱帯雨林、常緑樹林、草原からなる多様な景観は、驚くべき野生動物の完璧な生息地を作り出しています。"
                    )}
                  </p>

                  <div className="wildlife-highlights">
                    <h4>{t('Wildlife Highlights', '野生動物亮點', '野生動物のハイライト')}</h4>
                    <ul>
                      <li>
                        <strong>{t('Mammals', '哺乳動物', '哺乳類')}:</strong> {t(
                          'Asian elephants, sun bears, Asian black bears, gaurs, northern pig-tailed macaques, white-handed gibbons, sambar deer, and barking deer',
                          '亞洲象、馬來熊、亞洲黑熊、野牛、北豬尾獼猴、白手長臂猿、水鹿和赤麂',
                          'アジアゾウ、マレーグマ、ツキノワグマ、ガウル、ブタオザル、シロテテナガザル、サンバー、キョン'
                        )}
                      </li>
                      <li>
                        <strong>{t('Birds', '鳥類', '鳥類')}:</strong> {t(
                          'Over 440 bird species including great hornbills, Oriental pied hornbills, and rare species like rufous-tailed robins',
                          '超過440種鳥類，包括大犀鳥、東方斑犀鳥，以及稀有的棕尾鴝等物種',
                          'オオサイチョウ、シロクロサイチョウ、希少なアカオジョウビタキなど440種以上の鳥類'
                        )}
                      </li>
                      <li>
                        <strong>{t('Reptiles', '爬蟲類', '爬虫類')}:</strong> {t(
                          'Over 85 reptile species including three python species, various pit vipers, and Chinese water dragons',
                          '超過85種爬蟲類，包括三種蟒蛇、各種竹葉青蛇和中國水龍',
                          'ニシキヘビ3種、各種ハブ、チュウゴクミズトカゲなど85種以上の爬虫類'
                        )}
                      </li>
                    </ul>
                  </div>

                  <div className="best-time-info">
                    <h4>{t('Best Time to Visit', '最佳參觀時間', 'ベスト訪問時期')}</h4>
                    <p>
                      {t(
                        "November to February offers the most comfortable weather with cooler temperatures (average 22°C during the day, 9-10°C at night) and dry conditions. The rainy season runs from May to October with high humidity and peak rainfall in September.",
                        "11月至2月提供最舒適的天氣，氣溫較涼爽（白天平均22°C，夜間9-10°C）且乾燥。雨季從5月持續到10月，濕度高，9月降雨量最大。",
                        "11月から2月は最も快適な天候で、涼しい気温（日中平均22°C、夜間9-10°C）と乾燥した条件が楽しめます。雨季は5月から10月で、湿度が高く、9月に最も降雨量が多くなります。"
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Trail Picker - Interactive Trail Recommendation */}
            <TrailPicker />
            
            {/* Trail Grid - All Hiking Trails */}
            <TrailGrid />
            
            {/* Trail Overview Map & Important Information */}
            <div className="trail-overview-section">
              <h3>{t('Trail Overview & Important Information', '步道總覽與重要資訊', 'トレイル概要・重要情報')}</h3>
              
              <div className="trail-map-container">
                <div className="map-placeholder">
                  <div className="map-icon">🗺️</div>
                  <h4>{t('Interactive Trail Map', '互動式步道地圖', 'インタラクティブトレイルマップ')}</h4>
                  <p>
                    {t(
                      'For detailed trail maps and GPS coordinates, visit the official Khao Yai hiking page',
                      '詳細步道地圖和GPS座標，請造訪考艾官方健行頁面',
                      '詳細なトレイルマップとGPS座標については、カオヤイ公式ハイキングページをご覧ください'
                    )}
                  </p>
                  <a 
                    href="https://khaoyainationalpark.com/en/plan-your-visit/thing-to-do/hiking" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="map-link-btn"
                    onClick={() => handleExternalLinkClick('https://khaoyainationalpark.com/en/plan-your-visit/thing-to-do/hiking', 'Official Trail Map')}
                  >
                    {t('View Official Trail Map', '查看官方步道地圖', '公式トレイルマップを見る')} 🔗
                  </a>
                </div>
              </div>

              <div className="important-info-grid">
                <div className="info-card timing">
                  <h4>⏰ {t('Trail Timing', '步道時間', 'トレイル時間')}</h4>
                  <ul>
                    <li><strong>{t('Trails 1, 2, 3, 4, 5, 7', '步道 1, 2, 3, 4, 5, 7', 'トレイル 1, 2, 3, 4, 5, 7')}:</strong> {t('Start between 8:00 AM - 2:00 PM', '上午8點至下午2點間出發', '午前8時〜午後2時の間に出発')}</li>
                    <li><strong>{t('Trail 6 (Long Trail)', '步道 6（長程步道）', 'トレイル 6（ロングトレイル）')}:</strong> {t('Must start before 10:00 AM', '必須在上午10點前出發', '午前10時前に出発必須')}</li>
                  </ul>
                </div>

                <div className="info-card seasonal">
                  <h4>📅 {t('Seasonal Closures', '季節性關閉', '季節的閉鎖')}</h4>
                  <ul>
                    <li><strong>{t('Trail 6 Closure', '步道 6 關閉', 'トレイル 6 閉鎖')}:</strong> {t('July 1 - August 31 (Rainy Season)', '7月1日至8月31日（雨季）', '7月1日〜8月31日（雨季）')}</li>
                    <li><strong>{t('Stream Crossing', '溪流穿越', '川渡り')}:</strong> {t('Trail 5 may be impassable during heavy rains', '步道 5 在大雨期間可能無法通行', 'トレイル 5 は大雨時通行不可の場合あり')}</li>
                  </ul>
                </div>

                <div className="info-card safety">
                  <h4>🛡️ {t('Safety Guidelines', '安全指南', '安全ガイドライン')}</h4>
                  <ul>
                    <li>{t('Bring packed lunch for Trail 6 (8km, 6 hours)', '步道 6 請攜帶便當（8公里，6小時）', 'トレイル 6 は弁当持参（8km、6時間）')}</li>
                    <li>{t('Follow trail markers to avoid getting lost', '遵循步道標記避免迷路', 'トレイルマーカーに従って迷子を避ける')}</li>
                    <li>{t('Mandatory guide required for Trails 3, 4, 5, 6', '步道 3, 4, 5, 6 必須有嚮導', 'トレイル 3, 4, 5, 6 はガイド必須')}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Useful Links Section */}
            <div className="useful-links-section">
              <h3>{t('Useful Links & Resources', '實用連結與資源', '便利なリンクとリソース')}</h3>
              <div className="links-grid">
                <div className="link-category">
                  <h4>{t('Official Information', '官方資訊', '公式情報')}</h4>
                  <ul className="links-list">
                    <li>
                      <a 
                        href="https://khaoyainationalpark.com/en" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => handleExternalLinkClick('https://khaoyainationalpark.com/en', 'Khao Yai Official Website')}
                      >
                        🏛️ {t('Khao Yai National Park Official Website', '考艾國家公園官方網站', 'カオヤイ国立公園公式サイト')}
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://www.thainationalparks.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => handleExternalLinkClick('https://www.thainationalparks.com/', 'Thailand National Parks')}
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
                      <a 
                        href="https://khaoyainationalpark.com/en/plan-your-visit/staying" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => handleExternalLinkClick('https://khaoyainationalpark.com/en/plan-your-visit/staying', 'Park Accommodation')}
                      >
                        🏕️ {t('Park Accommodation & Camping', '公園住宿與露營', '公園宿泊・キャンプ')}
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
                      <a 
                        href="https://khaoyainationalpark.com/en/plan-your-visit/getting-here" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => handleExternalLinkClick('https://khaoyainationalpark.com/en/plan-your-visit/getting-here', 'Getting to Khao Yai Guide')}
                      >
                        🚗 {t('How to Get to Khao Yai (Official Guide)', '如何前往考艾（官方指南）', 'カオヤイへの行き方（公式ガイド）')}
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://khaoyainationalpark.com/en/plan-your-visit/getting-here" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => handleExternalLinkClick('https://khaoyainationalpark.com/en/plan-your-visit/getting-here', 'Bus Transport from Bangkok')}
                      >
                        🚌 {t('Bus & Transport from Bangkok', '從曼谷的巴士與交通', 'バンコクからのバス・交通')}
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="link-category">
                  <h4>{t('Weather & Planning', '天氣與規劃', '天気・計画')}</h4>
                  <ul className="links-list">
                    <li>
                      <a 
                        href="https://www.timeanddate.com/weather/@1594694/ext" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => handleExternalLinkClick('https://www.timeanddate.com/weather/@1594694/ext', 'Khao Yai Weather Forecast')}
                      >
                        🌤️📅 {t('Khao Yai Weather Forecast & Best Time to Visit', '考艾天氣預報與最佳參觀時間', 'カオヤイ天気予報・ベスト訪問時期')}
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="link-category">
                  <h4>{t('In An Emergency - Useful Calls', '緊急情況 - 實用電話', '緊急時 - 便利な電話番号')}</h4>
                  <ul className="links-list">
                    <li>
                      <a href="tel:1669" className="emergency-link">
                        🚨 {t('Thailand Emergency Services: 1669', '泰國緊急服務：1669', 'タイ緊急サービス：1669')}
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://www.tourismthailand.org/Plan-Your-Trip/Useful-Call" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => handleExternalLinkClick('https://www.tourismthailand.org/Plan-Your-Trip/Useful-Call', 'Thailand Emergency Contacts')}
                      >
                        📞 {t('Thailand Emergency & Useful Contact Numbers', '泰國緊急與實用聯絡電話', 'タイ緊急・便利な連絡先')}
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="link-category">
                  <h4>{t('Local Services', '當地服務', 'ローカルサービス')}</h4>
                  <ul className="links-list">
                    <li>
                      <a 
                        href="https://maps.app.goo.gl/QemcoPtPPhLqghzA6" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => handleExternalLinkClick('https://maps.app.goo.gl/QemcoPtPPhLqghzA6', 'Visitor Center Location')}
                      >
                        📍 {t('Visitor Center Location (Google Maps)', '遊客中心位置 (Google地圖)', 'ビジターセンター位置 (Googleマップ)')}
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://www.facebook.com/KhaoYaiNationalPark1962/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => handleExternalLinkClick('https://www.facebook.com/KhaoYaiNationalPark1962/', 'Khao Yai Facebook')}
                      >
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
          </>
        )}

            {onViewAllClick && (
              <div className="journey-actions">
                <button className="explore-btn" onClick={onViewAllClick}>
                  {t("View All Journeys", "查看所有旅程", "すべての旅を見る")} ✈️
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="journey-sidebar">
          {/* Weather Widget */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">
              {t('Current Weather', '當前天氣', '現在の天気')}
            </h3>
            <KhaoYaiWeather />
          </div>

          {/* Quick Info */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">
              {t('Quick Info', '快速資訊', 'クイック情報')}
            </h3>
            <div className="quick-info">
              <div className="info-item">
                <span className="info-icon">📍</span>
                <div className="info-content">
                  <strong>{t('Location', '位置', '場所')}</strong>
                  <p>{journey.region[currentLang]}</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">🌡️</span>
                <div className="info-content">
                  <strong>{t('Best Season', '最佳季節', 'ベストシーズン')}</strong>
                  <p>{journey.bestTime[currentLang]}</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">💰</span>
                <div className="info-content">
                  <strong>{t('Budget', '預算', '予算')}</strong>
                  <p>{journey.budget ? journey.budget[currentLang] : t('Varies', '不定', '様々')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrailGuide