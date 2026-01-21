// Test TrailCard badge parsing for Trail #3
import { trailData } from './src/data/trailData.js'

const trail3 = trailData.en.find(t => t.no === '3')

console.log("=== TRAILCARD BADGE PARSING TEST ===\n")
console.log(`Trail #3 selfGuided: "${trail3.selfGuided}"`)

// Test the TrailCard parsing logic
const selfGuided = trail3.selfGuided

console.log("\nParsing tests:")
console.log(`includes('✅'): ${selfGuided.includes('✅')}`)
console.log(`includes('No guide'): ${selfGuided.includes('No guide')}`)
console.log(`includes('Self-walkable'): ${selfGuided.includes('Self-walkable')}`)

const hasNoGuideMarkers = selfGuided.includes('✅') || selfGuided.includes('No guide') || selfGuided.includes('Self-walkable')

console.log(`\nhasNoGuideMarkers: ${hasNoGuideMarkers}`)

if (hasNoGuideMarkers) {
  console.log("❌ WRONG: Would show 'No Guide Needed' badge")
} else {
  console.log("✅ CORRECT: Would show 'Guide Required' badge")
}

console.log("\nExpected: Trail #3 should show 'Guide Required' badge")