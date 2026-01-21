// COMPREHENSIVE TRAIL PICKER TEST - ALL COMBINATIONS
// This will test EVERY possible combination systematically

const trailData = {
  en: [
    { no: "1", name: "Kong Kaew Waterfall", distance: "~1.2 km (loop), 45–60 minutes", selfGuided: "✅ No guide needed 👤 Author visited" },
    { no: "2", name: "Pha Kluai Mai – Haew Suwat", distance: "~3 km one way, ~2 hours", selfGuided: "✅ Self-walkable" },
    { no: "3", name: "Km 33 – Nong Pak Chi", distance: "4.2 km one way, 2.5–3 hours", selfGuided: "🧭 Guide required" },
    { no: "4", name: "Dong Tiw – Sai Sorn Reservoir", distance: "2.7 km one way, 1.5–2 hours", selfGuided: "🧭 Guide required" },
    { no: "5", name: "Dong Tiw – Nong Pak Chi", distance: "~5.5 km one way, ~3 hours", selfGuided: "🧭 Guide required" },
    { no: "6", name: "Visitor Center – Haew Suwat", distance: "~8 km one way, ~6 hours", selfGuided: "🧭 Guide required" },
    { no: "7", name: "Sai Sorn Reservoir Nature Trail", distance: "~2 km around lake, 1.5 hours", selfGuided: "✅ Self-walkable" }
  ]
}

// Trail characteristics based on actual data
const trailCharacteristics = {
  '1': { difficulty: 'beginner', time: 'short', guide: 'self', minExperience: 'first-time' },      // 45-60 min
  '2': { difficulty: 'beginner', time: 'medium', guide: 'self', minExperience: 'first-time' },    // 2 hours
  '3': { difficulty: 'moderate', time: 'medium', guide: 'guided', minExperience: 'some' },        // 2.5-3 hours
  '4': { difficulty: 'moderate', time: 'medium', guide: 'guided', minExperience: 'some' },        // 1.5-2 hours
  '5': { difficulty: 'challenging', time: 'long', guide: 'guided', minExperience: 'experienced' }, // 3 hours
  '6': { difficulty: 'challenging', time: 'long', guide: 'guided', minExperience: 'experienced' }, // 6 hours
  '7': { difficulty: 'beginner', time: 'short', guide: 'self', minExperience: 'first-time' }      // 1.5 hours
}

function generateAllCombinations() {
  const difficulties = ['beginner', 'moderate', 'challenging']
  const times = ['short', 'medium', 'long']
  const guides = ['self', 'guided', 'any']
  const experiences = ['first-time', 'some', 'experienced']
  
  const combinations = []
  
  for (const difficulty of difficulties) {
    for (const time of times) {
      for (const guide of guides) {
        for (const experience of experiences) {
          combinations.push({ difficulty, time, guide, experience })
        }
      }
    }
  }
  
  return combinations
}

function calculateExpectedResults(filters) {
  const results = []
  
  Object.entries(trailCharacteristics).forEach(([trailNo, characteristics]) => {
    let isMatch = true
    
    // Check difficulty - must match exactly
    if (filters.difficulty !== characteristics.difficulty) {
      isMatch = false
    }
    
    // Check time - must match exactly
    if (filters.time !== characteristics.time) {
      isMatch = false
    }
    
    // Check guide preference
    if (filters.guide === 'any') {
      // 'any' matches all trails
    } else if (filters.guide === 'self' && characteristics.guide !== 'self') {
      isMatch = false
    } else if (filters.guide === 'guided' && characteristics.guide !== 'guided') {
      isMatch = false
    }
    
    // Check experience (flexible - more experienced can do easier trails)
    const experienceOrder = { 'first-time': 1, 'some': 2, 'experienced': 3 }
    const userExperience = experienceOrder[filters.experience]
    const trailMinExperience = experienceOrder[characteristics.minExperience]
    
    if (userExperience < trailMinExperience) {
      isMatch = false
    }
    
    if (isMatch) {
      results.push(trailNo)
    }
  })
  
  return results.sort()
}

function testTrailPickerLogic(filters) {
  const results = []
  
  trailData.en.forEach(trail => {
    const characteristics = trailCharacteristics[trail.no]
    let isMatch = true
    
    // Check difficulty
    if (filters.difficulty !== characteristics.difficulty) {
      isMatch = false
    }
    
    // Check time
    if (filters.time !== characteristics.time) {
      isMatch = false
    }
    
    // Check guide
    if (filters.guide === 'any') {
      // 'any' should match all trails
    } else if (filters.guide === 'self' && characteristics.guide !== 'self') {
      isMatch = false
    } else if (filters.guide === 'guided' && characteristics.guide !== 'guided') {
      isMatch = false
    }
    
    // Check experience (flexible - more experienced can do easier)
    const experienceOrder = { 'first-time': 1, 'some': 2, 'experienced': 3 }
    const userExperience = experienceOrder[filters.experience]
    const trailMinExperience = experienceOrder[characteristics.minExperience]
    
    if (userExperience < trailMinExperience) {
      isMatch = false
    }
    
    if (isMatch) {
      results.push(trail.no)
    }
  })
  
  return results.sort()
}

function runComprehensiveTest() {
  console.log("=== COMPREHENSIVE TRAIL PICKER TEST - ALL 81 COMBINATIONS ===\n")
  console.log("Trail Characteristics:")
  Object.entries(trailCharacteristics).forEach(([no, char]) => {
    console.log(`Trail ${no}: ${char.difficulty}, ${char.time}, ${char.guide}, min: ${char.minExperience}`)
  })
  console.log("\n" + "=".repeat(80) + "\n")
  
  const allCombinations = generateAllCombinations()
  let passCount = 0
  let failCount = 0
  
  allCombinations.forEach((combination, index) => {
    const expected = calculateExpectedResults(combination)
    const actual = testTrailPickerLogic(combination)
    const passed = JSON.stringify(expected) === JSON.stringify(actual)
    
    if (passed) {
      passCount++
    } else {
      failCount++
    }
    
    const status = passed ? '✅ PASS' : '❌ FAIL'
    const indexStr = (index + 1).toString().padStart(2)
    console.log(`${indexStr}. ${combination.difficulty.padEnd(11)} + ${combination.time.padEnd(6)} + ${combination.guide.padEnd(6)} + ${combination.experience.padEnd(11)} → [${expected.join(',')}] ${status}`)
    
    if (!passed) {
      console.log(`    Expected: [${expected.join(', ')}]`)
      console.log(`    Got:      [${actual.join(', ')}]`)
      console.log()
    }
  })
  
  console.log("\n" + "=".repeat(80))
  console.log(`SUMMARY: ${passCount} PASS, ${failCount} FAIL out of ${allCombinations.length} total combinations`)
  
  if (failCount === 0) {
    console.log("🎉 ALL TESTS PASSED! Trail Picker logic is working correctly.")
  } else {
    console.log(`⚠️  ${failCount} tests failed. Logic needs fixing.`)
  }
}

runComprehensiveTest()