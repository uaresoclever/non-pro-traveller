# Custom Domain Blank Page Fix - Bugfix Design

## Overview

The bug occurs when accessing the trail guide app via the custom domain (www.non-pro-traveller.xyz), resulting in a blank page with 404 errors for all assets. The root cause is the hardcoded base path `/non-pro-traveller/` in the Vite configuration, which is correct for GitHub Pages subdirectory deployment but incorrect for custom domain deployment where assets should be served from the root path `/`.

The fix involves modifying the Vite configuration to detect the deployment context and use the appropriate base path, while also ensuring a CNAME file is included in the build output to persist the custom domain configuration across deployments.

## Glossary

- **Bug_Condition (C)**: The condition that triggers the bug - when the app is accessed via the custom domain with assets referenced using the subdirectory base path
- **Property (P)**: The desired behavior - assets should load from the correct path based on the deployment context (root for custom domain, subdirectory for GitHub Pages URL)
- **Preservation**: Existing functionality that must remain unchanged - GitHub Pages subdirectory URL access, local development, and deployment workflow
- **Base Path**: The URL path prefix used by Vite to generate asset references (e.g., `/` for root, `/non-pro-traveller/` for subdirectory)
- **CNAME File**: A file containing the custom domain name that GitHub Pages uses to configure the custom domain
- **vite.config.js**: The Vite configuration file located at the project root that controls build settings including the base path

## Bug Details

### Fault Condition

The bug manifests when the application is accessed via the custom domain www.non-pro-traveller.xyz. The Vite build configuration uses a hardcoded base path of `/non-pro-traveller/` for production builds, causing the browser to request assets from incorrect URLs (e.g., `www.non-pro-traveller.xyz/non-pro-traveller/assets/index.js` instead of `www.non-pro-traveller.xyz/assets/index.js`).

**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input of type DeploymentContext
  OUTPUT: boolean
  
  RETURN input.accessURL == 'www.non-pro-traveller.xyz'
         AND input.buildConfig.basePath == '/non-pro-traveller/'
         AND input.assetPaths.startsWith('/non-pro-traveller/')
END FUNCTION
```

### Examples

- **Custom Domain Access**: User navigates to `https://www.non-pro-traveller.xyz` → Browser requests `https://www.non-pro-traveller.xyz/non-pro-traveller/assets/index-abc123.js` → Server returns 404 → Blank page displayed
- **GitHub Pages URL Access**: User navigates to `https://uaresoclever.github.io/non-pro-traveller/` → Browser requests `https://uaresoclever.github.io/non-pro-traveller/assets/index-abc123.js` → Server returns asset → App loads correctly
- **Local Development**: Developer runs `npm run dev` → Vite uses base path `/` → App loads correctly at `http://localhost:3000`
- **CNAME Persistence**: After deployment, GitHub Pages custom domain setting is reset because no CNAME file exists in the dist output

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- GitHub Pages subdirectory URL (uaresoclever.github.io/non-pro-traveller) must continue to work correctly
- Local development server must continue to use root base path (/)
- GitHub Actions deployment workflow must continue to build and deploy successfully
- All existing application functionality must remain unchanged

**Scope:**
All inputs that do NOT involve the custom domain deployment context should be completely unaffected by this fix. This includes:
- Local development builds and server
- GitHub Pages subdirectory URL access
- Build process and deployment workflow
- Application features and user interactions

## Hypothesized Root Cause

Based on the bug description and code analysis, the root causes are:

1. **Hardcoded Base Path**: The `vite.config.js` uses a static condition `process.env.NODE_ENV === 'production'` to set the base path to `/non-pro-traveller/`, which doesn't account for custom domain deployment where the root path `/` is needed.

2. **Missing CNAME File**: The build output doesn't include a CNAME file, causing GitHub Pages to lose the custom domain configuration after each deployment. While Vite copies files from the `public/` directory to `dist/`, there is no CNAME file in the public directory.

3. **No Deployment Context Detection**: The configuration lacks a mechanism to detect whether the build is for custom domain deployment vs. GitHub Pages subdirectory deployment.

4. **Single Production Configuration**: The current setup assumes all production builds should use the subdirectory base path, without considering that custom domains require a different configuration.

## Correctness Properties

Property 1: Fault Condition - Custom Domain Asset Loading

_For any_ deployment where the app is accessed via the custom domain www.non-pro-traveller.xyz, the fixed Vite configuration SHALL generate asset paths using the root base path `/`, causing all JavaScript, CSS, and image assets to load correctly from URLs like `www.non-pro-traveller.xyz/assets/*` instead of `www.non-pro-traveller.xyz/non-pro-traveller/assets/*`.

**Validates: Requirements 2.1, 2.2, 2.3**

Property 2: Preservation - GitHub Pages Subdirectory URL

_For any_ deployment where the app is accessed via the GitHub Pages subdirectory URL (uaresoclever.github.io/non-pro-traveller), the fixed configuration SHALL continue to use the base path `/non-pro-traveller/`, preserving the existing functionality and ensuring assets load correctly from the subdirectory path.

**Validates: Requirements 3.1, 3.2, 3.3**

## Fix Implementation

### Changes Required

Assuming our root cause analysis is correct:

**File**: `vite.config.js`

**Function**: `defineConfig` export

**Specific Changes**:
1. **Add Environment Variable Detection**: Introduce a new environment variable `VITE_USE_CUSTOM_DOMAIN` to explicitly control whether the build is for custom domain deployment
   - When `VITE_USE_CUSTOM_DOMAIN=true`, use base path `/`
   - When `VITE_USE_CUSTOM_DOMAIN` is not set or false, use base path `/non-pro-traveller/` for production
   - Development builds continue to use base path `/`

2. **Update Base Path Logic**: Replace the current base path configuration:
   ```javascript
   base: process.env.NODE_ENV === 'production' ? '/non-pro-traveller/' : '/'
   ```
   With:
   ```javascript
   base: process.env.VITE_USE_CUSTOM_DOMAIN === 'true' ? '/' : 
         (process.env.NODE_ENV === 'production' ? '/non-pro-traveller/' : '/')
   ```

3. **Create CNAME File**: Add a `CNAME` file in the `public/` directory containing:
   ```
   www.non-pro-traveller.xyz
   ```
   This file will be automatically copied to the `dist/` directory during build, persisting the custom domain configuration.

4. **Update GitHub Actions Workflow**: Modify `.github/workflows/deploy.yml` to set the environment variable for custom domain builds:
   ```yaml
   - name: Build
     run: npm run build
     env:
       VITE_USE_CUSTOM_DOMAIN: 'true'
   ```

5. **Document Build Commands**: Update documentation to clarify:
   - `npm run build` - builds for GitHub Pages subdirectory (default)
   - `VITE_USE_CUSTOM_DOMAIN=true npm run build` - builds for custom domain

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate the bug on unfixed code by attempting to load the app via the custom domain, then verify the fix works correctly for custom domain access while preserving GitHub Pages subdirectory URL functionality.

### Exploratory Fault Condition Checking

**Goal**: Surface counterexamples that demonstrate the bug BEFORE implementing the fix. Confirm that the current build configuration produces incorrect asset paths for custom domain deployment.

**Test Plan**: Build the application with the current configuration and inspect the generated HTML to verify asset paths. Deploy to GitHub Pages and attempt to access via both the custom domain and GitHub Pages URL. Run these tests on the UNFIXED code to observe failures and confirm the root cause.

**Test Cases**:
1. **Custom Domain Asset Path Test**: Build app with current config → Inspect `dist/index.html` → Verify asset paths contain `/non-pro-traveller/` prefix (will fail - this is the bug)
2. **Custom Domain Browser Test**: Access `https://www.non-pro-traveller.xyz` → Open browser DevTools Network tab → Verify 404 errors for assets (will fail on unfixed code)
3. **CNAME File Test**: Build app with current config → Check for `dist/CNAME` file → Verify file doesn't exist (will fail on unfixed code)
4. **GitHub Pages URL Test**: Access `https://uaresoclever.github.io/non-pro-traveller/` → Verify app loads correctly (should pass - this is the preserved behavior)

**Expected Counterexamples**:
- Asset paths in `dist/index.html` will contain `/non-pro-traveller/` prefix when accessed via custom domain
- Browser will show 404 errors for all asset requests when accessing via custom domain
- No CNAME file will exist in the dist output
- Possible causes: hardcoded base path, missing environment variable detection, missing CNAME file

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds (custom domain deployment), the fixed configuration produces the expected behavior (correct asset paths).

**Pseudocode:**
```
FOR ALL deploymentContext WHERE isBugCondition(deploymentContext) DO
  result := buildWithFixedConfig(deploymentContext)
  ASSERT result.assetPaths.startsWith('/assets/')
  ASSERT NOT result.assetPaths.contains('/non-pro-traveller/')
  ASSERT result.cnameFile.exists()
  ASSERT result.cnameFile.content == 'www.non-pro-traveller.xyz'
END FOR
```

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold (GitHub Pages subdirectory URL, local development), the fixed configuration produces the same result as the original configuration.

**Pseudocode:**
```
FOR ALL deploymentContext WHERE NOT isBugCondition(deploymentContext) DO
  originalResult := buildWithOriginalConfig(deploymentContext)
  fixedResult := buildWithFixedConfig(deploymentContext)
  ASSERT originalResult.assetPaths == fixedResult.assetPaths
  ASSERT originalResult.appBehavior == fixedResult.appBehavior
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It generates many test cases automatically across different deployment contexts
- It catches edge cases that manual unit tests might miss (e.g., different NODE_ENV values, missing environment variables)
- It provides strong guarantees that behavior is unchanged for all non-custom-domain deployments

**Test Plan**: Observe behavior on UNFIXED code first for GitHub Pages URL and local development, then write property-based tests capturing that behavior.

**Test Cases**:
1. **GitHub Pages URL Preservation**: Observe that `https://uaresoclever.github.io/non-pro-traveller/` works correctly on unfixed code, then verify it continues to work after fix with `VITE_USE_CUSTOM_DOMAIN` not set
2. **Local Development Preservation**: Observe that `npm run dev` works correctly on unfixed code, then verify it continues to work after fix
3. **Build Process Preservation**: Observe that `npm run build` completes successfully on unfixed code, then verify it continues to work after fix
4. **Asset Path Preservation**: For non-custom-domain builds, verify asset paths remain identical to original configuration

### Unit Tests

- Test Vite config base path logic with different environment variable combinations
- Test CNAME file presence in dist output after build
- Test asset path generation in built HTML for both deployment contexts
- Test that local development continues to use root base path

### Property-Based Tests

- Generate random environment variable configurations and verify correct base path selection
- Generate random build scenarios and verify CNAME file is always included in custom domain builds
- Test that all non-custom-domain builds produce identical asset paths to the original configuration

### Integration Tests

- Build and deploy to a test environment with custom domain, verify app loads correctly
- Build and deploy to GitHub Pages subdirectory URL, verify app continues to work
- Test full deployment workflow with GitHub Actions, verify both deployment contexts work
- Test that custom domain configuration persists across multiple deployments (CNAME file is preserved)
