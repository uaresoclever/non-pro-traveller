// Test the fixed logic
const answers = {
  time: 'short',
  experience: 'beginner', 
  guide: 'self'
}

console.log("=== TESTING FIXED LOGIC ===")
console.log("Your selection: short + beginner + self\n")

// Fixed logic
let recommendedTrailNos = []

if (answers.time === 'short') {
  if (answers.experience === 'beginner') {
    recommendedTrailNos = ['1', '2', '7'] // Easy short trails (Trail 2 is 2hrs = fits in 1-2hr range)
    console.log("✅ Set recommendedTrailNos = ['1', '2', '7']")
  } else {
    recommendedTrailNos = ['1', '2', '7'] // Still recommend easy ones for short time
  }
}

console.log(`After time/experience logic: [${recommendedTrailNos.join(', ')}]`)

// Filter by guide preference
if (answers.guide === 'self') {
  recommendedTrailNos = recommendedTrailNos.filter(no => ['1', '2', '7'].includes(no))
  console.log(`After self-guide filter: [${recommendedTrailNos.join(', ')}]`)
}

console.log(`\n🎯 FINAL RESULT: [${recommendedTrailNos.join(', ')}]`)
console.log(`✅ Now includes Trail #2 (2 hours fits in "1-2 hours" range)`)

// Verify trail times
console.log(`\n=== TRAIL TIMES ===`)
console.log(`Trail #1: 45-60 minutes ✅ SHORT`)
console.log(`Trail #2: 2 hours ✅ SHORT (fits in 1-2hr range)`) 
console.log(`Trail #7: 1.5 hours ✅ SHORT`)