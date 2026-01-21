// Test the exact scenario where Trail #3 shows as walkable
import { trailData } from './src/data/trailData.js'

console.log("=== TESTING TRAIL #3 ISSUE ===\n")

// Test the exact filter combination that should show Trail #3
const filters = {
  difficulty: 'moderate',
  time: 'medium', 
  guide: 'guided',
  experience: 'some'
}

console.log(`Testing filters: ${JSON.stringify(filters)}\n`)

const data = trailData.en
const trailCharacteristics = {
  '1': { difficulty: 'beginner', time: 'short', guide: 'self', minExperience: 'first-time' },
  '2': { difficulty: 'beginner', time: 'medium', guide: 'self', minExperience: 'first-time' },
  '3': { difficulty: 'moderate', time: 'medium', guide: 'guided', minExperience: 'some' },
  '4': { difficulty: 'moderate', time: 'medium', guide: 'guided', minExperience: 'some' },
  '5': { difficulty: 'challenging', time: 'long', guide: 'guided', minExperience: 'experienced' },
  '6': { difficulty: 'challenging', time: 'long', guide: 'guided', minExperience: 'experienced' },
  '7': { difficulty: 'beginner', time: 'short', guide: 'self', minExperience: 'first-time' }
}

// Test each trail
data.forEach(trail => {
  const characteristics = trailCharacteristics[trail.no]
  let isMatch = true
  
  console.log(`\n--- Trail ${trail.no} ---`)
  console.log(`Name: ${trail.name.replace(/<[^>]*>/g, '')}`)
  console.log(`Characteristics: ${JSON.stringify(characteristics)}`)
  console.log(`selfGuided field: "${trail.selfGuided}"`)
  
  // Check difficulty
  if (filters.difficulty !== characteristics.difficulty) {
    isMatch = false
    console.log(`❌ Difficulty mismatch: ${filters.difficulty} vs ${characteristics.difficulty}`)
  } else {
    console.log(`✅ Difficulty match: ${characteristics.difficulty}`)
  }
  
  // Check time
  if (filters.time !== characteristics.time) {
    isMatch = false
    console.log(`❌ Time mismatch: ${filters.time} vs ${characteristics.time}`)
  } else {
    console.log(`✅ Time match: ${characteristics.time}`)
  }
  
  // Check guide
  if (filters.guide !== characteristics.guide) {
    isMatch = false
    console.log(`❌ Guide mismatch: ${filters.guide} vs ${characteristics.guide}`)
  } else {
    console.log(`✅ Guide match: ${characteristics.guide}`)
  }
  
  // Check experience
  const experienceOrder = { 'first-time': 1, 'some': 2, 'experienced': 3 }
  const userExperience = experienceOrder[filters.experience]
  const trailMinExperience = experienceOrder[characteristics.minExperience]
  
  if (userExperience < trailMinExperience) {
    isMatch = false
    console.log(`❌ Experience insufficient: ${filters.experience}(${userExperience}) < ${characteristics.minExperience}(${trailMinExperience})`)
  } else {
    console.log(`✅ Experience sufficient: ${filters.experience}(${userExperience}) >= ${characteristics.minExperience}(${trailMinExperience})`)
  }
  
  // Test the display logic for selfGuided
  let displayText = ''
  if (trail.selfGuided.includes('✅')) {
    displayText = '✅ Self-walkable'
    console.log(`🔍 Display logic: Would show "${displayText}" (WRONG for Trail 3!)`)
  } else if (trail.selfGuided.includes('🧭')) {
    displayText = '🧭 Guide required'
    console.log(`🔍 Display logic: Would show "${displayText}" (CORRECT)`)
  } else {
    displayText = trail.selfGuided
    console.log(`🔍 Display logic: Would show raw HTML`)
  }
  
  console.log(`\n🎯 RESULT: ${isMatch ? '✅ MATCH' : '❌ NO MATCH'}`)
  
  if (trail.no === '3') {
    console.log(`\n🚨 TRAIL #3 SPECIFIC CHECK:`)
    console.log(`   Should match filters: ${isMatch}`)
    console.log(`   Should show: "🧭 Guide required"`)
    console.log(`   Actually shows: "${displayText}"`)
    if (isMatch && displayText === '🧭 Guide required') {
      console.log(`   ✅ TRAIL #3 IS CORRECT`)
    } else {
      console.log(`   ❌ TRAIL #3 HAS ISSUES`)
    }
  }
})

console.log(`\n=== SUMMARY ===`)
console.log(`Expected results for filters ${JSON.stringify(filters)}: Trails 3, 4`)
console.log(`Trail #3 should show "🧭 Guide required" not "✅ Self-walkable"`)