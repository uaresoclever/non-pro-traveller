// Debug Trail Picker logic specifically for Trail #3
import { trailData } from './src/data/trailData.js'

const data = trailData.en
const trail3 = data.find(t => t.no === '3')

console.log("=== TRAIL #3 DEBUG ===\n")
console.log("Trail #3 data:")
console.log(`  name: ${trail3.name.replace(/<[^>]*>/g, '')}`)
console.log(`  selfGuided: "${trail3.selfGuided}"`)
console.log()

// Test the parsing logic from TrailPicker
const selfGuidedText = trail3.selfGuided
console.log("Parsing tests:")
console.log(`  includes('✅'): ${selfGuidedText.includes('✅')}`)
console.log(`  includes('🧭'): ${selfGuidedText.includes('🧭')}`)
console.log()

// Test the display logic
if (selfGuidedText.includes('✅')) {
  console.log("❌ WRONG: Would show as 'Self-walkable'")
} else if (selfGuidedText.includes('🧭')) {
  console.log("✅ CORRECT: Would show as 'Guide required'")
} else {
  console.log("❓ FALLBACK: Would show raw HTML")
}

console.log()
console.log("Expected result: Trail #3 should show '🧭 Guide required'")