import { journeyCategories, difficultyLevels, journeyTypes } from './journeyStructure.js'
import { trailData } from './trailData.js'

export const journeys = [
  {
    id: 'khao-yai-hiking',
    slug: 'khao-yai-national-park-hiking',
    
    title: {
      en: 'Khao Yai National Park Hiking Trails',
      zh: '考艾國家公園健行步道',
      ja: 'カオヤイ国立公園ハイキングトレイル'
    },
    
    description: {
      en: 'A comprehensive guide to the best hiking trails in Thailand\'s oldest national park',
      zh: '泰國最古老國家公園最佳健行步道完整指南',
      ja: 'タイ最古の国立公園の最高のハイキングトレイルの包括的なガイド'
    },
    
    country: {
      code: 'TH',
      name: { en: 'Thailand', zh: '泰國', ja: 'タイ' },
      flag: '🇹🇭'
    },
    
    region: {
      en: 'Nakhon Ratchasima Province',
      zh: '呵叻府',
      ja: 'ナコーンラーチャシーマー県'
    },
    
    coordinates: { lat: 14.4269, lng: 101.3725 },
    
    category: journeyCategories.HIKING,
    type: journeyTypes.HIKING_TRAILS,
    difficulty: difficultyLevels.MODERATE,
    
    duration: { min: 1, max: 3 },
    
    bestTime: {
      months: [11, 12, 1, 2, 3],
      en: 'November to March (Cool & Dry Season)',
      zh: '11月至3月（涼爽乾季）',
      ja: '11月から3月（涼しく乾燥した季節）'
    },
    
    budget: {
      currency: 'THB',
      range: { min: 1000, max: 3000 },
      en: '1,000-3,000 THB per day',
      zh: '每日 1,000-3,000 泰銖',
      ja: '1日1,000-3,000バーツ'
    },
    
    tags: {
      en: ['hiking', 'national park', 'wildlife', 'waterfalls', 'nature', 'self-drive', 'beginner', 'KhaoYai'],
      zh: ['健行', '國家公園', '野生動物', '瀑布', '自然', '自駕', '新手', 'KhaoYai'],
      ja: ['ハイキング', '国立公園', '野生動物', '滝', '自然', 'セルフドライブ', '初心者', 'KhaoYai']
    },
    
    status: 'published',
    featured: true,
    
    visitDate: '2024-12-15',
    publishDate: '2026-01-21',
    lastUpdated: '2026-01-21',
    
    coverImage: '/images/khao-yai-cover.jpg',
    
    // Photo gallery for this journey
    photos: [
      {
        url: '/images/khao-yai/photo1.jpg',
        thumbnail: '/images/khao-yai/photo1.jpg',
        caption: {
          en: 'Trail 1 - Beautiful waterfall scenery, perfect for beginners',
          zh: '步道1 - 美麗的瀑布風景，非常適合初學者',
          ja: 'トレイル1 - 美しい滝の風景、初心者に最適'
        },
        location: {
          en: 'Trail 1 - Waterfall Trail',
          zh: '步道1 - 瀑布步道',
          ja: 'トレイル1 - 滝トレイル'
        },
        date: '2024-12-15'
      },
      {
        url: '/images/khao-yai/photo2.jpg',
        thumbnail: '/images/khao-yai/photo2.jpg',
        caption: {
          en: 'Trail 1 - Amazing forest views and natural beauty',
          zh: '步道1 - 令人驚嘆的森林景觀和自然美景',
          ja: 'トレイル1 - 素晴らしい森の景色と自然の美しさ'
        },
        location: {
          en: 'Trail 1 - Waterfall Trail',
          zh: '步道1 - 瀑布步道',
          ja: 'トレイル1 - 滝トレイル'
        },
        date: '2024-12-15'
      },
      {
        url: '/images/khao-yai/photo3.jpg',
        thumbnail: '/images/khao-yai/photo3.jpg',
        caption: {
          en: 'Trail 1 - Stunning hiking trail experience through the forest',
          zh: '步道1 - 穿越森林的絕美健行步道體驗',
          ja: 'トレイル1 - 森を通る素晴らしいハイキングトレイル体験'
        },
        location: {
          en: 'Trail 1 - Waterfall Trail',
          zh: '步道1 - 瀑布步道',
          ja: 'トレイル1 - 滝トレイル'
        },
        date: '2024-12-15'
      },
      {
        url: '/images/khao-yai/photo4.jpg',
        thumbnail: '/images/khao-yai/photo4.jpg',
        caption: {
          en: 'Trail 1 - Memorable moments from our waterfall adventure',
          zh: '步道1 - 瀑布冒險的難忘時刻',
          ja: 'トレイル1 - 滝アドベンチャーの思い出深い瞬間'
        },
        location: {
          en: 'Trail 1 - Waterfall Trail',
          zh: '步道1 - 瀑布步道',
          ja: 'トレイル1 - 滝トレイル'
        },
        date: '2024-12-15'
      }
    ],
    
    content: {
      type: 'hiking_trails',
      data: {
        trails: trailData,
        facilities: {
          parking: true,
          restrooms: true,
          restaurant: true,
          camping: true,
          visitorCenter: true
        },
        requirements: {
          guide: 'optional',
          permit: false,
          equipment: ['hiking boots', 'water', 'hat', 'insect repellent']
        },
        tips: {
          en: [
            'Start early to avoid crowds and heat',
            'Bring plenty of water and snacks',
            'Watch for wildlife - elephants and hornbills common',
            'Check weather conditions before hiking'
          ],
          zh: [
            '早點出發避開人群和炎熱',
            '帶足夠的水和零食',
            '注意野生動物 - 大象和犀鳥很常見',
            '健行前檢查天氣狀況'
          ],
          ja: [
            '混雑と暑さを避けるため早めに出発',
            '十分な水とスナックを持参',
            '野生動物に注意 - 象とサイチョウがよく見られます',
            'ハイキング前に天気をチェック'
          ]
        }
      }
    },
    
    seo: {
      keywords: {
        en: ['Khao Yai', 'hiking', 'Thailand', 'national park', 'trails', 'wildlife'],
        zh: ['考艾', '健行', '泰國', '國家公園', '步道', '野生動物'],
        ja: ['カオヤイ', 'ハイキング', 'タイ', '国立公園', 'トレイル', '野生動物']
      }
    }
  },

  // Example: Future journey - Tokyo Food Tour
  {
    id: 'tokyo-food-adventure',
    slug: 'tokyo-street-food-adventure',
    
    title: {
      en: 'Tokyo Street Food Adventure',
      zh: '東京街頭美食冒險',
      ja: '東京ストリートフード冒険'
    },
    
    description: {
      en: 'Discover authentic Tokyo flavors from hidden gems to famous food markets',
      zh: '從隱藏寶石到著名食品市場，探索正宗東京風味',
      ja: '隠れた名店から有名な食品市場まで、本格的な東京の味を発見'
    },
    
    country: {
      code: 'JP',
      name: { en: 'Japan', zh: '日本', ja: '日本' },
      flag: '🇯🇵'
    },
    
    region: {
      en: 'Tokyo Metropolitan Area',
      zh: '東京都',
      ja: '東京都'
    },
    
    coordinates: { lat: 35.6762, lng: 139.6503 },
    
    category: journeyCategories.FOOD,
    type: journeyTypes.FOOD_TOUR,
    difficulty: difficultyLevels.EASY,
    
    duration: { min: 2, max: 5 },
    
    bestTime: {
      months: [3, 4, 5, 9, 10, 11],
      en: 'Spring & Autumn (Mild Weather)',
      zh: '春秋季節（溫和天氣）',
      ja: '春と秋（穏やかな天候）'
    },
    
    budget: {
      currency: 'JPY',
      range: { min: 5000, max: 15000 },
      en: '5,000-15,000 JPY per day',
      zh: '每日 5,000-15,000 日圓',
      ja: '1日5,000-15,000円'
    },
    
    tags: {
      en: ['food', 'street food', 'markets', 'ramen', 'sushi', 'culture'],
      zh: ['美食', '街頭小吃', '市場', '拉麵', '壽司', '文化'],
      ja: ['グルメ', 'ストリートフード', '市場', 'ラーメン', '寿司', '文化']
    },
    
    status: 'draft', // Not published yet
    featured: false,
    
    visitDate: null, // Future trip
    publishDate: null,
    lastUpdated: '2026-01-21',
    
    coverImage: '/images/tokyo-food-cover.svg',
    
    // Photo gallery for this journey
    photos: [
      {
        url: '/images/tokyo/ramen-shop.svg',
        thumbnail: '/images/tokyo/thumbs/ramen-shop.svg',
        caption: {
          en: 'Authentic ramen shop in Shibuya - the perfect comfort food',
          zh: '澀谷的正宗拉麵店 - 完美的療癒美食',
          ja: '渋谷の本格ラーメン店 - 完璧なコンフォートフード'
        },
        location: {
          en: 'Shibuya District',
          zh: '澀谷區',
          ja: '渋谷区'
        },
        date: null
      },
      {
        url: '/images/tokyo/sushi-counter.svg',
        thumbnail: '/images/tokyo/thumbs/sushi-counter.svg',
        caption: {
          en: 'Fresh sushi at Tsukiji Outer Market - a must-try experience',
          zh: '築地場外市場的新鮮壽司 - 必試體驗',
          ja: '築地場外市場の新鮮な寿司 - 必須体験'
        },
        location: {
          en: 'Tsukiji Outer Market',
          zh: '築地場外市場',
          ja: '築地場外市場'
        },
        date: null
      }
    ],
    
    content: {
      type: 'food_tour',
      data: {
        restaurants: [], // Will be populated later
        markets: [],
        foodTypes: ['ramen', 'sushi', 'tempura', 'yakitori', 'takoyaki'],
        dietaryOptions: ['vegetarian', 'halal', 'gluten-free']
      }
    }
  },

  // Example: Future journey - Bali Beach Hopping
  {
    id: 'bali-beach-hopping',
    slug: 'bali-beach-hopping-guide',
    
    title: {
      en: 'Bali Beach Hopping Adventure',
      zh: '峇里島跳島海灘冒險',
      ja: 'バリ島ビーチホッピング冒険'
    },
    
    description: {
      en: 'Explore Bali\'s most beautiful beaches from hidden coves to famous surf spots',
      zh: '探索峇里島最美麗的海灘，從隱秘海灣到著名衝浪點',
      ja: 'バリ島の隠れた入り江から有名なサーフスポットまで、最も美しいビーチを探索'
    },
    
    country: {
      code: 'ID',
      name: { en: 'Indonesia', zh: '印尼', ja: 'インドネシア' },
      flag: '🇮🇩'
    },
    
    region: {
      en: 'Bali Province',
      zh: '峇里省',
      ja: 'バリ州'
    },
    
    coordinates: { lat: -8.3405, lng: 115.0920 },
    
    category: journeyCategories.BEACH,
    type: journeyTypes.BEACH_HOPPING,
    difficulty: difficultyLevels.EASY,
    
    duration: { min: 5, max: 10 },
    
    bestTime: {
      months: [4, 5, 6, 7, 8, 9],
      en: 'Dry Season (April to September)',
      zh: '乾季（4月至9月）',
      ja: '乾季（4月から9月）'
    },
    
    budget: {
      currency: 'IDR',
      range: { min: 500000, max: 1500000 },
      en: '500K-1.5M IDR per day',
      zh: '每日 50萬-150萬 印尼盾',
      ja: '1日50万-150万ルピア'
    },
    
    tags: {
      en: ['beach', 'surfing', 'snorkeling', 'sunset', 'tropical', 'island'],
      zh: ['海灘', '衝浪', '浮潛', '日落', '熱帶', '島嶼'],
      ja: ['ビーチ', 'サーフィン', 'シュノーケリング', '夕日', 'トロピカル', '島']
    },
    
    status: 'draft',
    featured: false,
    
    visitDate: null,
    publishDate: null,
    lastUpdated: '2026-01-21',
    
    coverImage: '/images/bali-beach-cover.svg',
    
    // Photo gallery for this journey
    photos: [
      {
        url: '/images/bali/sunset-beach.svg',
        thumbnail: '/images/bali/thumbs/sunset-beach.svg',
        caption: {
          en: 'Spectacular sunset at Tanah Lot - magical golden hour',
          zh: '海神廟的壯觀日落 - 神奇的黃金時刻',
          ja: 'タナロットの壮大な夕日 - 魔法のゴールデンアワー'
        },
        location: {
          en: 'Tanah Lot Temple',
          zh: '海神廟',
          ja: 'タナロット寺院'
        },
        date: null
      },
      {
        url: '/images/bali/surfing-waves.svg',
        thumbnail: '/images/bali/thumbs/surfing-waves.svg',
        caption: {
          en: 'Perfect waves for surfing at Uluwatu Beach',
          zh: '烏魯瓦圖海灘的完美衝浪浪花',
          ja: 'ウルワツビーチの完璧なサーフィン波'
        },
        location: {
          en: 'Uluwatu Beach',
          zh: '烏魯瓦圖海灘',
          ja: 'ウルワツビーチ'
        },
        date: null
      }
    ],
    
    content: {
      type: 'beach_hopping',
      data: {
        beaches: [], // Will be populated later
        activities: ['surfing', 'snorkeling', 'sunset viewing', 'beach volleyball'],
        transportation: ['scooter', 'car', 'boat']
      }
    }
  }
]

// Helper functions for filtering and searching
export const getJourneysByCountry = (countryCode) => {
  return journeys.filter(journey => journey.country.code === countryCode)
}

export const getJourneysByCategory = (category) => {
  return journeys.filter(journey => journey.category === category)
}

export const getPublishedJourneys = () => {
  return journeys.filter(journey => journey.status === 'published')
}

export const getFeaturedJourneys = () => {
  return journeys.filter(journey => journey.featured && journey.status === 'published')
}

export const searchJourneys = (query, lang = 'en') => {
  const searchTerm = query.toLowerCase()
  return journeys.filter(journey => {
    const title = journey.title[lang].toLowerCase()
    const description = journey.description[lang].toLowerCase()
    const tags = journey.tags[lang].join(' ').toLowerCase()
    const country = journey.country.name[lang].toLowerCase()
    
    return title.includes(searchTerm) || 
           description.includes(searchTerm) || 
           tags.includes(searchTerm) || 
           country.includes(searchTerm)
  })
}