# Implementation Plan

- [x] 1. Write bug condition exploration test
  - **Property 1: Fault Condition** - Custom Domain Asset Loading
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the bug exists
  - **Scoped PBT Approach**: Scope the property to the concrete failing case - custom domain deployment with hardcoded subdirectory base path
  - Test that when accessing via custom domain (www.non-pro-traveller.xyz), assets are requested from incorrect paths containing `/non-pro-traveller/` prefix
  - Build the app with current config and inspect `dist/index.html` for asset paths
  - Verify asset paths contain `/non-pro-traveller/` prefix (this is the bug)
  - Verify no CNAME file exists in dist output
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists)
  - Document counterexamples found: asset paths like `/non-pro-traveller/assets/index.js` instead of `/assets/index.js`, missing CNAME file
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 2.1, 2.2, 2.3_

- [x] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - GitHub Pages Subdirectory URL and Local Development
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code for non-buggy inputs (GitHub Pages subdirectory URL, local development)
  - Test 1: Build with default config (no VITE_USE_CUSTOM_DOMAIN) and verify asset paths contain `/non-pro-traveller/` prefix
  - Test 2: Run local dev server and verify it uses root base path `/`
  - Test 3: Verify GitHub Pages URL (uaresoclever.github.io/non-pro-traveller) loads correctly
  - Write property-based tests capturing observed behavior patterns: for all non-custom-domain builds, base path should be `/non-pro-traveller/` in production or `/` in development
  - Property-based testing generates many test cases for stronger guarantees
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 3. Fix for custom domain blank page issue

  - [x] 3.1 Update Vite configuration to support custom domain deployment
    - Modify `vite.config.js` to add environment variable detection for `VITE_USE_CUSTOM_DOMAIN`
    - Update base path logic: when `VITE_USE_CUSTOM_DOMAIN=true`, use base path `/`; otherwise use `/non-pro-traveller/` for production or `/` for development
    - Replace current base path configuration with: `base: process.env.VITE_USE_CUSTOM_DOMAIN === 'true' ? '/' : (process.env.NODE_ENV === 'production' ? '/non-pro-traveller/' : '/')`
    - _Bug_Condition: isBugCondition(input) where input.accessURL == 'www.non-pro-traveller.xyz' AND input.buildConfig.basePath == '/non-pro-traveller/'_
    - _Expected_Behavior: For custom domain deployment, asset paths use root base path `/` and load correctly_
    - _Preservation: GitHub Pages subdirectory URL continues to use `/non-pro-traveller/` base path, local development continues to use `/` base path_
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.2, 3.3_

  - [x] 3.2 Create CNAME file for custom domain persistence
    - Create `public/CNAME` file containing `www.non-pro-traveller.xyz`
    - Verify file will be automatically copied to `dist/` directory during build
    - _Bug_Condition: Missing CNAME file causes GitHub Pages to lose custom domain configuration after deployment_
    - _Expected_Behavior: CNAME file persists in dist output, maintaining custom domain configuration_
    - _Preservation: Build process continues to work as before, copying public files to dist_
    - _Requirements: 2.3_

  - [x] 3.3 Update GitHub Actions deployment workflow
    - Modify `.github/workflows/deploy.yml` to set `VITE_USE_CUSTOM_DOMAIN: 'true'` environment variable in the build step
    - Add env configuration to the build command in the workflow
    - _Bug_Condition: Deployment builds use wrong base path for custom domain_
    - _Expected_Behavior: Deployment builds use root base path for custom domain_
    - _Preservation: Deployment workflow continues to build and deploy successfully_
    - _Requirements: 2.1, 2.2, 3.3_

  - [x] 3.4 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Custom Domain Asset Loading
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior
    - When this test passes, it confirms the expected behavior is satisfied
    - Build app with `VITE_USE_CUSTOM_DOMAIN=true` and verify asset paths use root base path `/`
    - Verify CNAME file exists in dist output with correct content
    - Run bug condition exploration test from step 1
    - **EXPECTED OUTCOME**: Test PASSES (confirms bug is fixed)
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 3.5 Verify preservation tests still pass
    - **Property 2: Preservation** - GitHub Pages Subdirectory URL and Local Development
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests from step 2
    - Verify GitHub Pages subdirectory URL builds still use `/non-pro-traveller/` base path
    - Verify local development still uses `/` base path
    - Verify all existing functionality remains unchanged
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Confirm all tests still pass after fix (no regressions)

- [x] 4. Checkpoint - Ensure all tests pass
  - Verify bug condition test passes (custom domain assets load correctly)
  - Verify preservation tests pass (GitHub Pages URL and local dev still work)
  - Deploy to GitHub Pages and test both custom domain and GitHub Pages URL access
  - Ensure all tests pass, ask the user if questions arise
