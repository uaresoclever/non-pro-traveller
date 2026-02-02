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

  // Khao Yai - Wat Pa Phu Hai Long
  {
    id: 'khao-yai-wat-pa-phu-hai-long',
    slug: 'khao-yai-wat-pa-phu-hai-long',
    
    title: {
      en: 'Khao Yai - Wat Pa Phu Hai Long',
      zh: '考艾 - 帕普海龍寺',
      ja: 'カオヤイ - ワット・パー・プー・ハイ・ロン'
    },
    
    description: {
      en: 'A serene mountain temple perfect for sunrise viewing, offering spiritual tranquility and stunning valley views',
      zh: '寧靜的山間寺廟，非常適合觀賞日出，提供心靈平靜和壯麗的山谷景色',
      ja: '日の出鑑賞に最適な静かな山寺、精神的な静寂と素晴らしい谷の景色を提供'
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
    
    category: journeyCategories.CULTURAL,
    type: journeyTypes.TEMPLE_VISIT,
    difficulty: difficultyLevels.EASY,
    
    duration: { min: 1, max: 3 },
    
    bestTime: {
      months: [11, 12, 1, 2, 3],
      en: 'November to March (Cool & Dry Season)',
      zh: '11月至3月（涼爽乾季）',
      ja: '11月から3月（涼しく乾燥した季節）'
    },
    
    budget: {
      currency: 'THB',
      range: { min: 500, max: 1500 },
      en: '500-1,500 THB per day',
      zh: '每日 500-1,500 泰銖',
      ja: '1日500-1,500バーツ'
    },
    
    tags: {
      en: ['temple', 'spiritual', 'mountain', 'meditation', 'culture', 'peaceful', 'sunrise', 'author visited', 'KhaoYai'],
      zh: ['寺廟', '靈性', '山區', '冥想', '文化', '寧靜', '日出', '作者造訪', 'KhaoYai'],
      ja: ['寺院', 'スピリチュアル', '山', '瞑想', '文化', '平和', '日の出', '著者訪問', 'KhaoYai']
    },
    
    status: 'published',
    featured: false,
    
    visitDate: null, // To be updated when you visit
    publishDate: '2026-02-02',
    lastUpdated: '2026-02-02',
    
    coverImage: '/non-pro-traveller/images/khao-yai-WatPaPuHaiLong/KhaoYai_WatPaPuHaiLong_3286.jpeg',
    
    // Photo gallery for this journey
    photos: [
      {
        url: '/non-pro-traveller/images/khao-yai-WatPaPuHaiLong/KhaoYai_WatPaPuHaiLong_3286.jpeg',
        thumbnail: '/non-pro-traveller/images/khao-yai-WatPaPuHaiLong/KhaoYai_WatPaPuHaiLong_3286.jpeg',
        caption: {
          en: 'Wat Pa Phu Hai Long - Perfect sunrise viewing spot with peaceful temple atmosphere',
          zh: '帕普海龍寺 - 完美的日出觀賞點，擁有寧靜的寺廟氛圍',
          ja: 'ワット・パー・プー・ハイ・ロン - 平和な寺院の雰囲気を持つ完璧な日の出鑑賞スポット'
        },
        location: {
          en: 'Wat Pa Phu Hai Long Temple',
          zh: '帕普海龍寺',
          ja: 'ワット・パー・プー・ハイ・ロン寺院'
        },
        date: '2024-12-15'
      },
      {
        url: '/non-pro-traveller/images/khao-yai-WatPaPuHaiLong/KhaoYai_WatPaPuHaiLong_3299.jpeg',
        thumbnail: '/non-pro-traveller/images/khao-yai-WatPaPuHaiLong/KhaoYai_WatPaPuHaiLong_3299.jpeg',
        caption: {
          en: 'Beautiful temple architecture with stunning sunrise mountain views',
          zh: '美麗的寺廟建築配上壯麗的日出山景',
          ja: '美しい寺院建築と素晴らしい日の出の山の景色'
        },
        location: {
          en: 'Wat Pa Phu Hai Long Temple',
          zh: '帕普海龍寺',
          ja: 'ワット・パー・プー・ハイ・ロン寺院'
        },
        date: '2024-12-15'
      },
      {
        url: '/non-pro-traveller/images/khao-yai-WatPaPuHaiLong/KhaoYai_WatPaPuHaiLong_3318.jpeg',
        thumbnail: '/non-pro-traveller/images/khao-yai-WatPaPuHaiLong/KhaoYai_WatPaPuHaiLong_3318.jpeg',
        caption: {
          en: 'Temple grounds offering tranquility and spiritual reflection',
          zh: '寺廟庭院提供寧靜和心靈反思',
          ja: '静寂とスピリチュアルな反省を提供する寺院の境内'
        },
        location: {
          en: 'Wat Pa Phu Hai Long Temple',
          zh: '帕普海龍寺',
          ja: 'ワット・パー・プー・ハイ・ロン寺院'
        },
        date: '2024-12-15'
      },
      {
        url: '/non-pro-traveller/images/khao-yai-WatPaPuHaiLong/KhaoYai_WatPaPuHaiLong_3322.jpeg',
        thumbnail: '/non-pro-traveller/images/khao-yai-WatPaPuHaiLong/KhaoYai_WatPaPuHaiLong_3322.jpeg',
        caption: {
          en: 'Sacred temple details and traditional Thai Buddhist architecture',
          zh: '神聖的寺廟細節和傳統泰式佛教建築',
          ja: '神聖な寺院の詳細と伝統的なタイ仏教建築'
        },
        location: {
          en: 'Wat Pa Phu Hai Long Temple',
          zh: '帕普海龍寺',
          ja: 'ワット・パー・プー・ハイ・ロン寺院'
        },
        date: '2024-12-15'
      },
      {
        url: '/non-pro-traveller/images/khao-yai-WatPaPuHaiLong/KhaoYai_WatPaPuHaiLong_3323.jpeg',
        thumbnail: '/non-pro-traveller/images/khao-yai-WatPaPuHaiLong/KhaoYai_WatPaPuHaiLong_3323.jpeg',
        caption: {
          en: 'Memorable moments from our peaceful temple visit',
          zh: '我們寧靜寺廟參訪的難忘時刻',
          ja: '平和な寺院訪問の思い出深い瞬間'
        },
        location: {
          en: 'Wat Pa Phu Hai Long Temple',
          zh: '帕普海龍寺',
          ja: 'ワット・パー・プー・ハイ・ロン寺院'
        },
        date: '2024-12-15'
      }
    ],
    
    content: {
      type: 'temple_visit',
      data: {
        description: {
          en: 'Wat Pa Phu Hai Long is a serene forest temple perched on a mountain, offering one of the most spectacular sunrise viewing experiences in the Khao Yai area. This peaceful sanctuary combines spiritual tranquility with breathtaking natural beauty, making it a perfect start to any day of exploration.',
          zh: '帕普海龍寺是一座坐落在山上的寧靜森林寺廟，提供考艾地區最壯觀的日出觀賞體驗之一。這個寧靜的聖地結合了心靈平靜與令人屏息的自然美景，是任何探索之日的完美開始。',
          ja: 'ワット・パー・プー・ハイ・ロンは山の上に佇む静かな森林寺院で、カオヤイエリアで最も壮観な日の出鑑賞体験の一つを提供します。この平和な聖域は精神的な静寂と息をのむような自然の美しさを組み合わせ、探索の一日の完璧なスタートとなります。'
        },
        authorExperience: {
          en: 'Our perfect day started at SOL Glamping site, then we drove to Wat Pa Phu Hai Long for the magical sunrise experience. After witnessing the breathtaking sunrise, we returned to our glamping site for a delicious breakfast while listening to the beautiful bird songs, followed by a refreshing power nap before checkout. The temple blessed us with positive energy for our next adventure to Khao Yai National Park. The peaceful atmosphere and spiritual energy made this visit truly memorable.',
          zh: '我們完美的一天從SOL豪華露營開始，然後開車到帕普海龍寺體驗神奇的日出。在見證了令人屏息的日出後，我們回到露營地享用美味早餐，聆聽美妙的鳥鳴聲，然後在退房前小憩片刻。寺廟為我們下一個考艾國家公園的冒險帶來了正面能量。寧靜的氛圍和靈性能量讓這次參訪真正難忘。',
          ja: '私たちの完璧な一日はSOLグランピングサイトから始まり、その後ワット・パー・プー・ハイ・ロンへ車で向かい、魔法のような日の出体験をしました。息をのむような日の出を目撃した後、グランピングサイトに戻り、美しい鳥の歌を聞きながら美味しい朝食を楽しみ、チェックアウト前にリフレッシュする仮眠を取りました。寺院は次のカオヤイ国立公園への冒険にポジティブなエネルギーを与えてくれました。平和な雰囲気とスピリチュアルなエネルギーがこの訪問を本当に記憶に残るものにしました。'
        },
        relatedJourneys: [
          {
            id: 'khao-yai-hiking',
            title: {
              en: 'Khao Yai National Park Hiking Trails',
              zh: '考艾國家公園健行步道',
              ja: 'カオヤイ国立公園ハイキングトレイル'
            },
            description: {
              en: 'Continue your Khao Yai adventure with comprehensive hiking trails guide',
              zh: '繼續您的考艾冒險，完整的健行步道指南',
              ja: 'カオヤイの冒険を包括的なハイキングトレイルガイドで続ける'
            }
          }
        ],
        templeInfo: {
          name: {
            en: 'Wat Pa Phu Hai Long',
            zh: '帕普海龍寺',
            ja: 'ワット・パー・プー・ハイ・ロン'
          },
          established: null,
          style: {
            en: 'Forest Temple',
            zh: '森林寺廟',
            ja: '森林寺院'
          },
          specialFeatures: {
            en: ['Sunrise viewing point', 'Mountain location', 'Lucky number drawing', 'Peaceful meditation space'],
            zh: ['日出觀賞點', '山區位置', '幸運數字抽取', '寧靜冥想空間'],
            ja: ['日の出鑑賞ポイント', '山の立地', 'ラッキーナンバー抽選', '平和な瞑想空間']
          }
        },
        activities: [
          'sunrise viewing',
          'meditation',
          'temple exploration',
          'scenic viewing',
          'photography',
          'spiritual reflection'
        ],
        facilities: {
          parking: true,
          restrooms: true,
          restaurant: false,
          accommodation: false,
          giftShop: true
        },
        requirements: {
          dresscode: true,
          donation: 'optional',
          guide: false,
          permit: false
        },
        tips: {
          en: [
            'Arrive early for sunrise viewing (around 5:30-6:00 AM)',
            'Bring windproof clothing - it gets very windy in the morning',
            'Pack morning snacks while waiting for sunrise',
            'Car parking slots are available at the temple',
            'Draw a number for your daily luck number at the temple',
            'Dress modestly - cover shoulders and knees',
            'Remove shoes before entering temple buildings',
            'Maintain quiet and respectful behavior',
            'Perfect combination: Stay at SOL Glamping → Sunrise at Wat → Breakfast & bird songs → Power nap → Khao Yai National Park',
            'The temple brings blessed energy and positive vibes for the day'
          ],
          zh: [
            '早到觀賞日出（約早上5:30-6:00）',
            '帶防風衣物 - 早晨非常有風',
            '準備晨間點心等待日出時享用',
            '寺廟提供汽車停車位',
            '在寺廟抽取每日幸運數字',
            '穿著端莊 - 遮蓋肩膀和膝蓋',
            '進入寺廟建築前脫鞋',
            '保持安靜和尊重的行為',
            '完美組合：住SOL豪華露營 → 寺廟日出 → 早餐聽鳥鳴 → 小憩 → 考艾國家公園',
            '寺廟帶來祝福能量和一天的正面力量'
          ],
          ja: [
            '日の出鑑賞のため早めに到着（午前5:30-6:00頃）',
            '防風服を持参 - 朝はとても風が強い',
            '日の出を待つ間の朝食スナックを準備',
            '寺院に駐車場あり',
            '寺院で今日のラッキーナンバーを引く',
            '控えめな服装 - 肩と膝を覆う',
            '寺院建物に入る前に靴を脱ぐ',
            '静かで敬意のある行動を保つ',
            '完璧な組み合わせ：SOLグランピング宿泊 → 寺院で日の出 → 朝食と鳥の歌 → 仮眠 → カオヤイ国立公園',
            '寺院は祝福のエネルギーと一日のポジティブな力をもたらす'
          ]
        }
      }
    },
    
    seo: {
      keywords: {
        en: ['Wat Pa Phu Hai Long', 'temple', 'Khao Yai', 'Thailand', 'meditation', 'spiritual'],
        zh: ['帕普海龍寺', '寺廟', '考艾', '泰國', '冥想', '靈性'],
        ja: ['ワット・パー・プー・ハイ・ロン', '寺院', 'カオヤイ', 'タイ', '瞑想', 'スピリチュアル']
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
    
    coverImage: '/images/tokyo-food-cover.jpg',
    
    // Photo gallery for this journey
    photos: [],
    
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
    
    coverImage: '/images/bali-beach-cover.jpg',
    
    // Photo gallery for this journey
    photos: [],
    
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