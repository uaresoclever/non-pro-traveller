// Debug why Trail #7 is not being suggested
import { trailData } from './src/data/trailData.js'

console.log("=== TRAIL #7 DEBUG ===\n")

// Test different answer combinations that should include Trail #7
const testCases = [
  { time: 'short', experience: 'beginner', guide: 'self' },
  { time: 'short', experience: 'beginner', guide: 'any' },
  { time: 'short', experience: 'some', guide: 'self' },
  { time: 'short', experience: 'some', guide: 'any' },
  { time: 'short', experience: 'experienced', guide: 'self' },
  { time: 'short', experience: 'experienced', guide: 'any' },
]

function getRecommendedTrails(answers) {
  const data = trailData.en
  
  // Simple mapping based on answers
  let recommendedTrailNos = []
  
  if (answers.time === 'short') {
    if (answers.experience === 'beginner') {
      recommendedTrailNos = ['1', '7'] // Easy short trails
    } else {
      recommendedTrailNos = ['1', '7'] // Still recommend easy ones for short time
    }
  } else if (answers.time === 'medium') {
    if (answers.experience === 'beginner') {
      recommendedTrailNos = ['2'] // Medium beginner trail
    } else {
      if (answers.guide === 'self') {
        recommendedTrailNos = ['2'] // Self-guided medium
      } else {
        recommendedTrailNos = ['3', '4', '2'] // Include guided options
      }
    }
  } else if (answers.time === 'long') {
    if (answers.experience === 'experienced') {
      recommendedTrailNos = ['5', '6'] // Challenging long trails
    } else {
      recommendedTrailNos = ['2', '3'] // Easier long options
    }
  }

  console.log(`  Initial recommendations: [${recommendedTrailNos.join(', ')}]`)

  // Filter out trails that don't match guide preference
  if (answers.guide === 'self') {
    recommendedTrailNos = recommendedTrailNos.filter(no => ['1', '2', '7'].includes(no))
    console.log(`  After self-guide filter: [${recommendedTrailNos.join(', ')}]`)
  } else if (answers.guide === 'guided') {
    recommendedTrailNos = recommendedTrailNos.filter(no => ['3', '4', '5', '6'].includes(no))
    console.log(`  After guided filter: [${recommendedTrailNos.join(', ')}]`)
  } else {
    console.log(`  No guide filter applied (guide = ${answers.guide})`)
  }

  // Get trail data and add reasons
  const recommendations = recommendedTrailNos.map(no => {
    const trail = data.find(t => t.no === no)
    if (!trail) {
      console.log(`  ❌ Trail ${no} not found in data!`)
      return null
    }
    
    console.log(`  ✅ Trail ${no}: ${trail.name.replace(/<[^>]*>/g, '')}`)
    return {
      ...trail,
      reasons: [`Test reason for trail ${no}`]
    }
  }).filter(Boolean)

  return recommendations.slice(0, 3)
}

testCases.forEach((answers, index) => {
  console.log(`\nTest ${index + 1}: ${JSON.stringify(answers)}`)
  const results = getRecommendedTrails(answers)
  console.log(`Final results: ${results.length} trails`)
  
  const hasTrail7 = results.some(t => t.no === '7')
  console.log(`Trail #7 included: ${hasTrail7 ? '✅ YES' : '❌ NO'}`)
  
  if (!hasTrail7 && answers.time === 'short') {
    console.log(`🚨 ERROR: Trail #7 should be included for short time!`)
  }
})

// Check if Trail #7 exists in the data
console.log(`\n=== TRAIL DATA CHECK ===`)
const trail7 = trailData.en.find(t => t.no === '7')
if (trail7) {
  console.log(`✅ Trail #7 exists: ${trail7.name.replace(/<[^>]*>/g, '')}`)
  console.log(`   Distance: ${trail7.distance}`)
} else {
  console.log(`❌ Trail #7 NOT FOUND in trail data!`)
}

console.log(`\nWhat answers did you select? Please tell me so I can debug the exact issue.`)