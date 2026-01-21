// Debug script to check trail data parsing
import { trailData } from './src/data/trailData.js'

console.log("=== TRAIL DATA DEBUG ===\n")

const data = trailData.en
data.forEach(trail => {
  console.log(`Trail ${trail.no}: ${trail.name.replace(/<[^>]*>/g, '')}`)
  console.log(`  selfGuided: "${trail.selfGuided}"`)
  console.log(`  includes ✅: ${trail.selfGuided.includes('✅')}`)
  console.log(`  includes 🧭: ${trail.selfGuided.includes('🧭')}`)
  console.log(`  includes "Guide required": ${trail.selfGuided.includes('Guide required')}`)
  console.log()
})