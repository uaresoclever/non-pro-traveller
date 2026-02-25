/**
 * Preservation Property Tests for Custom Domain Blank Page Fix
 * 
 * **Validates: Requirements 3.1, 3.2, 3.3**
 * 
 * IMPORTANT: These tests verify existing behavior that MUST be preserved after the fix
 * These tests should PASS on UNFIXED code to establish the baseline
 * 
 * This test suite verifies:
 * - GitHub Pages subdirectory URL builds use /non-pro-traveller/ base path
 * - Local development uses root base path /
 * - Build process completes successfully
 * 
 * When run on UNFIXED code, these tests should PASS because:
 * - The current configuration correctly handles GitHub Pages subdirectory deployment
 * - Local development already uses root base path
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { execSync, spawn } from 'child_process'
import { readFileSync, existsSync, rmSync } from 'fs'
import { join } from 'path'
import * as fc from 'fast-check'

describe('Property 2: Preservation - GitHub Pages Subdirectory URL and Local Development', () => {
  describe('GitHub Pages Subdirectory URL Preservation', () => {
    beforeAll(() => {
      // Build with default production config (no VITE_USE_CUSTOM_DOMAIN)
      // This simulates the GitHub Pages subdirectory deployment
      console.log('Building app with default production configuration (GitHub Pages subdirectory)...')
      execSync('npx vite build', { 
        env: { 
          ...process.env, 
          NODE_ENV: 'production',
          // Explicitly ensure VITE_USE_CUSTOM_DOMAIN is not set
          VITE_USE_CUSTOM_DOMAIN: undefined
        },
        stdio: 'inherit'
      })
    })

    it('should generate asset paths with /non-pro-traveller/ prefix for GitHub Pages subdirectory deployment', () => {
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
      
      // For GitHub Pages subdirectory deployment, asset paths SHOULD contain /non-pro-traveller/
      const assetPaths = allAssetPaths.filter(path => path.includes('assets'))
      expect(
        assetPaths.length,
        'Should have asset paths in the HTML'
      ).toBeGreaterThan(0)
      
      assetPaths.forEach(path => {
        expect(
          path,
          `Asset path "${path}" should start with /non-pro-traveller/assets/ for GitHub Pages subdirectory`
        ).toMatch(/^\/non-pro-traveller\/assets\//)
      })
    })

    it('should build successfully with default production configuration', () => {
      // Verify the build completed and created expected files
      const distPath = join(process.cwd(), 'dist')
      const indexPath = join(distPath, 'index.html')
      const assetsPath = join(distPath, 'assets')
      
      expect(existsSync(distPath), 'dist directory should exist').toBe(true)
      expect(existsSync(indexPath), 'dist/index.html should exist').toBe(true)
      expect(existsSync(assetsPath), 'dist/assets directory should exist').toBe(true)
    })

    it('property: for all non-custom-domain production builds, base path should be /non-pro-traveller/', () => {
      // Property-based test: For any production build without VITE_USE_CUSTOM_DOMAIN,
      // asset paths should always use the subdirectory prefix
      
      fc.assert(
        fc.property(
          fc.record({
            deploymentType: fc.constant('github-pages-subdirectory'),
            buildEnv: fc.constant('production'),
            useCustomDomain: fc.constant(false)
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
              .filter(path => path.startsWith('/') && path.includes('assets'))
            
            // Property: For GitHub Pages subdirectory deployment, ALL asset paths
            // should contain the subdirectory prefix /non-pro-traveller/
            const allHaveSubdirectoryPrefix = allAssetPaths.every(path => 
              path.startsWith('/non-pro-traveller/')
            )
            
            return allHaveSubdirectoryPrefix && allAssetPaths.length > 0
          }
        ),
        { numRuns: 10 }
      )
    })
  })

  describe('Local Development Preservation', () => {
    let devServer
    let devServerOutput = ''
    let serverReady = false

    beforeAll(async () => {
      // Start the dev server
      console.log('Starting local development server...')
      
      return new Promise((resolve, reject) => {
        devServer = spawn('npx', ['vite', '--port', '3001'], {
          env: { ...process.env, NODE_ENV: 'development' },
          stdio: 'pipe'
        })

        const timeout = setTimeout(() => {
          reject(new Error('Dev server failed to start within 30 seconds'))
        }, 30000)

        devServer.stdout.on('data', (data) => {
          const output = data.toString()
          devServerOutput += output
          console.log('Dev server:', output)
          
          // Check if server is ready
          if (output.includes('Local:') || output.includes('localhost:3001')) {
            serverReady = true
            clearTimeout(timeout)
            // Give it a moment to fully initialize
            setTimeout(resolve, 1000)
          }
        })

        devServer.stderr.on('data', (data) => {
          console.error('Dev server error:', data.toString())
        })

        devServer.on('error', (error) => {
          clearTimeout(timeout)
          reject(error)
        })
      })
    })

    afterAll(() => {
      if (devServer) {
        console.log('Stopping dev server...')
        devServer.kill()
      }
    })

    it('should start dev server successfully', () => {
      expect(serverReady, 'Dev server should be ready').toBe(true)
      expect(devServerOutput, 'Dev server output should contain localhost').toContain('localhost')
    })

    it('should use root base path (/) for local development', async () => {
      // The dev server uses root base path by default
      // We can verify this by checking the vite config behavior
      const configPath = join(process.cwd(), 'vite.config.js')
      const configContent = readFileSync(configPath, 'utf-8')
      
      // Verify the config has the logic for development mode
      expect(
        configContent,
        'Config should have base path logic for development'
      ).toContain("process.env.NODE_ENV === 'production'")
      
      // The current config uses: base: process.env.NODE_ENV === 'production' ? '/non-pro-traveller/' : '/'
      // For development (NODE_ENV !== 'production'), it should use '/'
      expect(
        configContent,
        'Config should use root path for non-production'
      ).toMatch(/:\s*['"]\/['"]/)
    })

    it('property: for all development builds, base path should be /', () => {
      // Property-based test: For any development environment,
      // the base path should always be root (/)
      
      fc.assert(
        fc.property(
          fc.record({
            environment: fc.constant('development'),
            port: fc.integer({ min: 3000, max: 9999 })
          }),
          (devContext) => {
            // Read the vite config to verify development behavior
            const configPath = join(process.cwd(), 'vite.config.js')
            const configContent = readFileSync(configPath, 'utf-8')
            
            // Property: The config should have logic that uses root path for development
            // Current implementation: base: process.env.NODE_ENV === 'production' ? '/non-pro-traveller/' : '/'
            const hasDevRootPath = configContent.includes("'/'") || configContent.includes('"/"')
            const hasProductionCheck = configContent.includes("NODE_ENV === 'production'")
            
            return hasDevRootPath && hasProductionCheck
          }
        ),
        { numRuns: 5 }
      )
    })
  })

  describe('Build Process Preservation', () => {
    it('should complete build without errors', () => {
      // Verify that the build process itself works correctly
      expect(() => {
        execSync('npx vite build', { 
          env: { ...process.env, NODE_ENV: 'production' },
          stdio: 'pipe'
        })
      }).not.toThrow()
    })

    it('should generate all expected output files', () => {
      const distPath = join(process.cwd(), 'dist')
      const indexPath = join(distPath, 'index.html')
      const assetsPath = join(distPath, 'assets')
      
      expect(existsSync(distPath), 'dist directory should exist').toBe(true)
      expect(existsSync(indexPath), 'dist/index.html should exist').toBe(true)
      expect(existsSync(assetsPath), 'dist/assets directory should exist').toBe(true)
      
      // Verify index.html has content
      const indexContent = readFileSync(indexPath, 'utf-8')
      expect(indexContent.length, 'index.html should have content').toBeGreaterThan(0)
      expect(indexContent, 'index.html should be valid HTML').toContain('<!DOCTYPE html>')
    })

    it('property: build output should be consistent across multiple builds', () => {
      // Property-based test: Multiple builds with the same config should produce
      // consistent asset path patterns (though hashes may differ)
      
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 3 }),
          (buildNumber) => {
            // Build the app
            execSync('npx vite build', { 
              env: { ...process.env, NODE_ENV: 'production' },
              stdio: 'pipe'
            })
            
            // Read the generated index.html
            const indexPath = join(process.cwd(), 'dist', 'index.html')
            const indexContent = readFileSync(indexPath, 'utf-8')
            
            // Extract asset paths
            const scriptMatches = indexContent.match(/src="([^"]+)"/g) || []
            const linkMatches = indexContent.match(/href="([^"]+)"/g) || []
            const allAssetPaths = [...scriptMatches, ...linkMatches]
              .map(match => match.match(/["']([^"']+)["']/)[1])
              .filter(path => path.startsWith('/') && path.includes('assets'))
            
            // Property: All builds should consistently use the subdirectory prefix
            const allHaveSubdirectoryPrefix = allAssetPaths.every(path => 
              path.startsWith('/non-pro-traveller/')
            )
            
            return allHaveSubdirectoryPrefix && allAssetPaths.length > 0
          }
        ),
        { numRuns: 3 }
      )
    }, 20000) // Increase timeout to 20 seconds for multiple builds
  })
})
