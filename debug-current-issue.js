// Debug why you're seeing Trail 1,2,3 instead of 1,2,7
import { trailData } from './src/data/trailData.js'

console.log("=== DEBUGGING CURRENT ISSUE ===")
console.log("Expected: Trail 1,2,7")
console.log("You're seeing: Trail 1,2,3")
console.log("Your selection: short + beginner + self\n")

const answers = {
  time: 'short',
  experience: 'beginner', 
  guide: 'self'
}

const data = trailData.en

// Step by step logic
let recommendedTrailNos = []

console.log("Step 1: Time-based logic")
if (answers.time === 'short') {
  console.log("✅ Time is 'short'")
  if (answers.experience === 'beginner') {
    console.log("✅ Experience is 'beginner'")
    recommendedTrailNos = ['1', '2', '7'] // Easy short trails
    console.log("✅ Set recommendedTrailNos = ['1', '2', '7']")
  }
}

console.log(`After time logic: [${recommendedTrailNos.join(', ')}]`)

console.log("\nStep 2: Guide preference filter")
if (answers.guide === 'self') {
  console.log("✅ Guide is 'self'")
  console.log("Filtering to keep only self-guided trails: ['1', '2', '7']")
  
  const beforeFilter = [...recommendedTrailNos]
  recommendedTrailNos = recommendedTrailNos.filter(no => ['1', '2', '7'].includes(no))
  
  console.log(`Before filter: [${beforeFilter.join(', ')}]`)
  console.log(`After filter: [${recommendedTrailNos.join(', ')}]`)
  
  // Check each trail
  beforeFilter.forEach(no => {
    const isKept = ['1', '2', '7'].includes(no)
    console.log(`  Trail ${no}: ${isKept ? '✅ KEPT' : '❌ REMOVED'} (${isKept ? 'self-guided' : 'requires guide'})`)
  })
}

console.log(`\nStep 3: Final result should be: [${recommendedTrailNos.join(', ')}]`)

// Check trail guide requirements
console.log("\n=== TRAIL GUIDE REQUIREMENTS ===")
const trailGuideInfo = {
  '1': 'Self-guided ✅',
  '2': 'Self-guided ✅', 
  '3': 'Guide required 🧭',
  '4': 'Guide required 🧭',
  '5': 'Guide required 🧭',
  '6': 'Guide required 🧭',
  '7': 'Self-guided ✅'
}

Object.entries(trailGuideInfo).forEach(([no, info]) => {
  console.log(`Trail ${no}: ${info}`)
})

console.log("\n🚨 ISSUE: If you're seeing Trail #3, there's a bug!")
console.log("Trail #3 requires a guide and should NOT appear for 'self' preference")

// Check if there might be a browser cache issue
console.log("\n💡 POSSIBLE SOLUTIONS:")
console.log("1. Clear browser cache (Ctrl+F5 or Cmd+Shift+R)")
console.log("2. Try in incognito/private mode")
console.log("3. Check if you accidentally selected 'guided' or 'either' instead of 'self'")

// Let me also check the actual trail data
console.log("\n=== ACTUAL TRAIL DATA CHECK ===")
const trail3 = data.find(t => t.no === '3')
if (trail3) {
  console.log(`Trail #3: ${trail3.name.replace(/<[^>]*>/g, '')}`)
  console.log(`Self-guided field: ${trail3.selfGuided}`)
  console.log(`Should require guide: ${trail3.selfGuided.includes('🧭') ? 'YES ✅' : 'NO ❌'}`)
}