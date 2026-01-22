// Check all trail durations to fix categorization
import { trailData } from './src/data/trailData.js'

console.log("=== ALL TRAIL DURATIONS ===\n")

const data = trailData.en
data.forEach(trail => {
  console.log(`Trail ${trail.no}: ${trail.name.replace(/<[^>]*>/g, '')}`)
  console.log(`  Duration: ${trail.distance}`)
  
  // Extract hours from distance string
  let hours = 0
  if (trail.distance.includes('45–60 minutes')) hours = 1
  else if (trail.distance.includes('~2 hours')) hours = 2
  else if (trail.distance.includes('2.5–3 hours')) hours = 2.5
  else if (trail.distance.includes('1.5–2 hours')) hours = 1.5
  else if (trail.distance.includes('~3 hours')) hours = 3
  else if (trail.distance.includes('~6 hours')) hours = 6
  else if (trail.distance.includes('1.5 hours')) hours = 1.5
  
  let category = ''
  if (hours <= 2) category = 'SHORT (1-2 hours)'
  else if (hours <= 4) category = 'MEDIUM (2-4 hours)'
  else category = 'LONG (4+ hours)'
  
  console.log(`  Hours: ${hours} → ${category}`)
  console.log()
})

console.log("=== CORRECT CATEGORIZATION ===")
console.log("SHORT (1-2 hours): Trail 1 (1hr), Trail 7 (1.5hr)")
console.log("MEDIUM (2-4 hours): Trail 2 (2hr), Trail 3 (2.5-3hr), Trail 4 (1.5-2hr), Trail 5 (3hr)")
console.log("LONG (4+ hours): Trail 6 (6hr)")

console.log("\n🚨 ISSUE: Trail #5 (3 hours) should be MEDIUM, not LONG!")
console.log("Only Trail #6 (6 hours) is truly LONG/full day")