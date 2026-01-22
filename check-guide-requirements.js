// Check which trails are self-guided vs guided
import { trailData } from './src/data/trailData.js'

console.log("=== TRAIL GUIDE REQUIREMENTS ===\n")

const data = trailData.en
data.forEach(trail => {
  console.log(`Trail ${trail.no}: ${trail.name.replace(/<[^>]*>/g, '')}`)
  console.log(`  Duration: ${trail.distance}`)
  console.log(`  Guide: ${trail.selfGuided}`)
  
  const isSelfGuided = trail.selfGuided.includes('✅')
  const requiresGuide = trail.selfGuided.includes('🧭')
  
  console.log(`  Type: ${isSelfGuided ? 'SELF-GUIDED ✅' : requiresGuide ? 'GUIDE REQUIRED 🧭' : 'UNKNOWN'}`)
  console.log()
})

console.log("=== SUMMARY ===")
console.log("SELF-GUIDED: Trails that can be done alone")
console.log("GUIDE REQUIRED: Trails that need a guide")