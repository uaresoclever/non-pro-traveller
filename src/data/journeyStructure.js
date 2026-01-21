// Journey data structure for scalable travel website
export const journeyCategories = {
  HIKING: 'hiking',
  CITY: 'city',
  FOOD: 'food',
  CULTURE: 'culture',
  ADVENTURE: 'adventure',
  BEACH: 'beach',
  MOUNTAIN: 'mountain',
  WILDLIFE: 'wildlife'
}

export const difficultyLevels = {
  EASY: 'easy',
  MODERATE: 'moderate',
  HARD: 'hard',
  EXTREME: 'extreme'
}

export const journeyTypes = {
  HIKING_TRAILS: 'hiking_trails',
  CITY_GUIDE: 'city_guide',
  FOOD_TOUR: 'food_tour',
  CULTURAL_SITES: 'cultural_sites',
  ADVENTURE_SPORTS: 'adventure_sports',
  BEACH_HOPPING: 'beach_hopping',
  MOUNTAIN_CLIMBING: 'mountain_climbing',
  WILDLIFE_SAFARI: 'wildlife_safari'
}

// Example journey structure
export const journeyTemplate = {
  id: 'khao-yai-hiking',
  slug: 'khao-yai-national-park-hiking',
  
  // Basic Info
  title: {
    en: 'Khao Yai National Park Hiking Trails',
    zh: '考艾國家公園健行步道'
  },
  
  description: {
    en: 'Complete hiking guide to Thailand\'s oldest national park',
    zh: '泰國最古老國家公園完整健行指南'
  },
  
  // Location & Classification
  country: {
    code: 'TH',
    name: { en: 'Thailand', zh: '泰國' }
  },
  
  region: {
    en: 'Nakhon Ratchasima Province',
    zh: '呵叻府'
  },
  
  coordinates: {
    lat: 14.4269,
    lng: 101.3725
  },
  
  // Journey Classification
  category: journeyCategories.HIKING,
  type: journeyTypes.HIKING_TRAILS,
  difficulty: difficultyLevels.MODERATE,
  
  // Journey Details
  duration: {
    min: 1, // days
    max: 3
  },
  
  bestTime: {
    months: [11, 12, 1, 2, 3], // Nov-Mar
    en: 'November to March (Cool & Dry Season)',
    zh: '11月至3月（涼爽乾季）'
  },
  
  budget: {
    currency: 'THB',
    range: { min: 1000, max: 3000 },
    en: '1,000-3,000 THB per day',
    zh: '每日 1,000-3,000 泰銖'
  },
  
  // Tags for filtering
  tags: {
    en: ['hiking', 'national park', 'wildlife', 'waterfalls', 'nature'],
    zh: ['健行', '國家公園', '野生動物', '瀑布', '自然']
  },
  
  // Journey Status
  status: 'published', // draft, published, archived
  featured: true,
  
  // Dates
  visitDate: '2024-12-15',
  publishDate: '2026-01-21',
  lastUpdated: '2026-01-21',
  
  // Media
  coverImage: '/images/khao-yai-cover.jpg',
  gallery: [
    '/images/khao-yai-1.jpg',
    '/images/khao-yai-2.jpg'
  ],
  
  // Journey-specific data (flexible structure)
  content: {
    type: 'hiking_trails',
    data: {
      // This would contain the trail data we already have
      trails: [], // Import from trailData.js
      facilities: {
        parking: true,
        restrooms: true,
        restaurant: true,
        camping: true
      },
      requirements: {
        guide: 'optional',
        permit: false,
        equipment: ['hiking boots', 'water', 'hat']
      }
    }
  },
  
  // SEO
  seo: {
    keywords: {
      en: ['Khao Yai', 'hiking', 'Thailand', 'national park'],
      zh: ['考艾', '健行', '泰國', '國家公園']
    },
    metaDescription: {
      en: 'Complete hiking guide to Khao Yai National Park with 7 detailed trails',
      zh: '考艾國家公園完整健行指南，包含7條詳細步道'
    }
  }
}