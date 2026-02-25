/**
 * Bug Condition Exploration Test for Custom Domain Blank Page Fix
 * 
 * **Validates: Requirements 2.1, 2.2, 2.3**
 * 
 * CRITICAL: This test MUST FAIL on unfixed code - failure confirms the bug exists
 * DO NOT attempt to fix the test or the code when it fails
 * 
 * This test encodes the expected behavior for custom domain deployment:
 * - Assets should be served from root path (e.g., /assets/*)
 * - CNAME file should exist in dist output
 * 
 * When run on UNFIXED code, this test will FAIL because:
 * - Asset paths contain /non-pro-traveller/ prefix (incorrect for custom domain)
 * - CNAME file is missing from dist output
 */

import { describe, it, expect, beforeAll } from 'vitest'
import { execSync } from 'child_process'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import * as fc from 'fast-check'

describe('Property 1: Fault Condition - Custom Domain Asset Loading', () => {
  beforeAll(() => {
    // Build the app with custom domain configuration
    // This tests the fix for custom domain deployment
    console.log('Building app with custom domain configuration...')
    execSync('npx vite build', { 
      env: { ...process.env, NODE_ENV: 'production', VITE_USE_CUSTOM_DOMAIN: 'true' },
      stdio: 'inherit'
    })
  })

  it('should generate asset paths without subdirectory prefix for custom domain deployment', () => {
    // Read the generated index.html
    const distPath = join(process.cwd(), 'dist')
    const indexPath = join(distPath, 'index.html')
    
    expect(existsSync(indexPath), 'dist/index.html should exist after build').toBe(true)
    
    const indexContent = readFileSync(indexPath, 'utf-8')
    
    // Extract all asset paths from the HTML
    const scriptMatches = indexContent.match(/src="([^"]+)"/g) || []
    const linkMatches = indexContent.match(/href="([^"]+)"/g) || []
    const allAssetPaths = [...scriptMatches, ...linkMatches]
      .map(match => match.match(/["']([^"']+)["']/)[1])
      .filter(path => path.startsWith('/')) // Only check absolute paths
    
    console.log('Found asset paths:', allAssetPaths)
    
    // For custom domain deployment, asset paths should NOT contain /non-pro-traveller/
    // They should be root-relative (e.g., /assets/index.js)
    allAssetPaths.forEach(path => {
      expect(
        path,
        `Asset path "${path}" should not contain /non-pro-traveller/ prefix for custom domain deployment`
      ).not.toMatch(/^\/non-pro-traveller\//)
    })
    
    // Verify assets are at root level (e.g., /assets/*)
    const assetPaths = allAssetPaths.filter(path => path.includes('assets'))
    expect(
      assetPaths.length,
      'Should have asset paths in the HTML'
    ).toBeGreaterThan(0)
    
    assetPaths.forEach(path => {
      expect(
        path,
        `Asset path "${path}" should start with /assets/ for custom domain`
      ).toMatch(/^\/assets\//)
    })
  })

  it('should include CNAME file in dist output for custom domain persistence', () => {
    const distPath = join(process.cwd(), 'dist')
    const cnamePath = join(distPath, 'CNAME')
    
    expect(
      existsSync(cnamePath),
      'CNAME file should exist in dist output to persist custom domain configuration'
    ).toBe(true)
    
    if (existsSync(cnamePath)) {
      const cnameContent = readFileSync(cnamePath, 'utf-8').trim()
      expect(
        cnameContent,
        'CNAME file should contain the custom domain'
      ).toBe('www.non-pro-traveller.xyz')
    }
  })

  it('property: asset paths should be root-relative for any custom domain deployment', () => {
    // Property-based test: For any custom domain deployment scenario,
    // asset paths should always be root-relative (not contain subdirectory prefix)
    
    fc.assert(
      fc.property(
        fc.record({
          customDomain: fc.constant('www.non-pro-traveller.xyz'),
          deploymentType: fc.constant('custom-domain'),
          buildEnv: fc.constant('production')
        }),
        (deploymentContext) => {
          // Read the built index.html
          const indexPath = join(process.cwd(), 'dist', 'index.html')
          const indexContent = readFileSync(indexPath, 'utf-8')
          
          // Extract asset paths
          const scriptMatches = indexContent.match(/src="([^"]+)"/g) || []
          const linkMatches = indexContent.match(/href="([^"]+)"/g) || []
          const allAssetPaths = [...scriptMatches, ...linkMatches]
            .map(match => match.match(/["']([^"']+)["']/)[1])
            .filter(path => path.startsWith('/'))
          
          // Property: For custom domain deployment, NO asset path should contain
          // the subdirectory prefix /non-pro-traveller/
          const hasSubdirectoryPrefix = allAssetPaths.some(path => 
            path.startsWith('/non-pro-traveller/')
          )
          
          // This should be false for custom domain, but will be true on unfixed code
          return !hasSubdirectoryPrefix
        }
      ),
      { numRuns: 10 }
    )
  })
})
