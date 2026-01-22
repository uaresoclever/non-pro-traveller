// Debug the exact case you selected
import { trailData } from './src/data/trailData.js'

console.log("=== DEBUGGING YOUR EXACT SELECTION ===")
console.log("Time: short, Experience: beginner, Guide: self\n")

const answers = {
  time: 'short',
  experience: 'beginner', 
  guide: 'self'
}

const data = trailData.en

console.log("Step 1: Initial logic check")
let recommendedTrailNos = []

if (answers.time === 'short') {
  console.log("✅ Time is 'short'")
  if (answers.experience === 'beginner') {
    console.log("✅ Experience is 'beginner'")
    recommendedTrailNos = ['1', '7'] // Easy short trails
    console.log("✅ Set recommendedTrailNos = ['1', '7']")
  } else {
    console.log("❌ Experience is NOT 'beginner'")
    recommendedTrailNos = ['1', '7'] // Still recommend easy ones for short time
  }
} else {
  console.log("❌ Time is NOT 'short'")
}

console.log(`\nStep 2: After time/experience logic: [${recommendedTrailNos.join(', ')}]`)

// Filter out trails that don't match guide preference
if (answers.guide === 'self') {
  console.log("✅ Guide preference is 'self'")
  console.log("Filtering to keep only trails: ['1', '2', '7']")
  recommendedTrailNos = recommendedTrailNos.filter(no => ['1', '2', '7'].includes(no))
  console.log(`After guide filter: [${recommendedTrailNos.join(', ')}]`)
} else if (answers.guide === 'guided') {
  console.log("Guide preference is 'guided'")
  recommendedTrailNos = recommendedTrailNos.filter(no => ['3', '4', '5', '6'].includes(no))
} else {
  console.log(`Guide preference is '${answers.guide}' (no filter applied)`)
}

console.log(`\nStep 3: Final trail numbers: [${recommendedTrailNos.join(', ')}]`)

// Get trail data
console.log("\nStep 4: Looking up trail data...")
const recommendations = recommendedTrailNos.map(no => {
  const trail = data.find(t => t.no === no)
  if (!trail) {
    console.log(`❌ Trail ${no} NOT FOUND in data!`)
    return null
  }
  
  console.log(`✅ Trail ${no}: "${trail.name.replace(/<[^>]*>/g, '')}"`)
  console.log(`   Distance: ${trail.distance}`)
  console.log(`   Self-guided: ${trail.selfGuided}`)
  
  return {
    ...trail,
    reasons: [`Perfect for your time limit`, `Beginner friendly`]
  }
}).filter(Boolean)

console.log(`\nStep 5: Final recommendations: ${recommendations.length} trails`)
recommendations.forEach((trail, index) => {
  console.log(`${index + 1}. Trail #${trail.no}: ${trail.name.replace(/<[^>]*>/g, '')}`)
})

console.log(`\n🔍 EXPECTED RESULT: You should see Trail #1 AND Trail #7`)
console.log(`🔍 ACTUAL RESULT: What did you see on the website?`)

// Check if there might be a data issue
console.log(`\n=== TRAIL DATA VERIFICATION ===`)
console.log(`Total trails in data: ${data.length}`)
data.forEach(trail => {
  console.log(`Trail ${trail.no}: ${trail.name.replace(/<[^>]*>/g, '')}`)
})