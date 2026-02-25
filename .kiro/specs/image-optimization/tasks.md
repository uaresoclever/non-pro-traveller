# Implementation Plan: Image Optimization

## Overview

This implementation plan builds a comprehensive image optimization system consisting of three integrated components: a Vite plugin for build-time image compression using Sharp, a React LazyImage component for lazy loading, and integration with the existing Vite build pipeline. The implementation follows an incremental approach, building and testing each component before integration.

## Tasks

- [x] 1. Set up dependencies and project structure
  - Install Sharp library for image processing (`npm install --save-dev sharp`)
  - Create directory structure for plugin and components
  - Set up test fixtures directory with sample images
  - _Requirements: 2.2_

- [x] 2. Implement core Vite plugin for image optimization
  - [x] 2.1 Create vite-plugin-image-optimizer.js with plugin scaffold
    - Implement plugin factory function with configuration options
    - Define buildStart and closeBundle hooks
    - Set up default configuration (sourceDir, targetSize, quality settings)
    - _Requirements: 2.1, 2.2, 2.3_
  
  - [x] 2.2 Implement image discovery and scanning logic
    - Scan public/images directory recursively
    - Filter for supported image formats (jpg, jpeg, png)
    - Build list of images to process
    - _Requirements: 2.1, 2.4_
  
  - [x] 2.3 Implement core compression logic with Sharp
    - Load images using Sharp
    - Apply JPEG compression with quality settings (75-85 range)
    - Implement iterative quality adjustment to hit target size (200-300KB)
    - Preserve aspect ratio and strip metadata
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 4.1, 4.2, 4.3_
  
  - [ ]* 2.4 Write property test for image size constraint
    - **Property 1: Image Size Constraint**
    - **Validates: Requirements 1.1, 1.2**
  
  - [ ]* 2.5 Write property test for aspect ratio preservation
    - **Property 2: Aspect Ratio Preservation**
    - **Validates: Requirements 1.4**

- [x] 3. Implement WebP generation and file output
  - [x] 3.1 Add WebP generation logic
    - Generate WebP versions of JPEG/PNG images
    - Use separate quality settings for WebP
    - Maintain same base filename with .webp extension
    - _Requirements: 4.4_
  
  - [ ]* 3.2 Write property test for WebP generation
    - **Property 11: WebP Generation**
    - **Validates: Requirements 4.4**
  
  - [x] 3.3 Implement file writing to dist directory
    - Write optimized images to dist/images preserving directory structure
    - Preserve original filenames
    - Handle file system errors gracefully
    - _Requirements: 1.5, 5.1, 5.2_
  
  - [ ]* 3.4 Write property test for path and filename preservation
    - **Property 3: Path and Filename Preservation**
    - **Validates: Requirements 1.5, 5.1, 5.2**

- [x] 4. Implement compression statistics and logging
  - [x] 4.1 Create statistics tracking system
    - Track original size, optimized size, compression ratio per image
    - Accumulate totals across all processed images
    - Collect warnings for images outside target range
    - _Requirements: 2.5, 6.1, 6.2_
  
  - [x] 4.2 Implement build output logging
    - Format and display summary table with statistics
    - Show individual image results with compression ratios
    - Display warnings for images outside target size
    - Fail build if compression produces larger files
    - _Requirements: 2.5, 6.1, 6.2, 6.3, 6.4, 6.5_
  
  - [ ]* 4.3 Write property test for compression statistics logging
    - **Property 5: Compression Statistics Logging**
    - **Validates: Requirements 2.5**
  
  - [ ]* 4.4 Write property test for build statistics summary
    - **Property 12: Build Statistics Summary**
    - **Validates: Requirements 6.1, 6.2, 6.3**
  
  - [ ]* 4.5 Write property test for target size warning
    - **Property 13: Target Size Warning**
    - **Validates: Requirements 6.4**

- [x] 5. Checkpoint - Verify plugin functionality
  - Run build with sample images and verify compression works
  - Check that statistics are logged correctly
  - Ensure all tests pass, ask the user if questions arise

- [x] 6. Implement LazyImage React component
  - [x] 6.1 Create src/components/LazyImage.jsx
    - Implement functional component with props interface
    - Add loading state management (loading, loaded, error)
    - Render img element with loading="lazy" attribute
    - Handle onLoad and onError callbacks
    - _Requirements: 3.1, 3.5, 3.6_
  
  - [ ]* 6.2 Write property test for native lazy loading attribute
    - **Property 9: Native Lazy Loading Attribute**
    - **Validates: Requirements 3.5**
  
  - [x] 6.3 Implement placeholder and error state rendering
    - Show placeholder during loading state
    - Display fallback image or error state on load failure
    - Apply appropriate CSS classes based on state
    - _Requirements: 3.3, 3.4_
  
  - [ ]* 6.4 Write property test for loading state placeholder
    - **Property 7: Loading State Placeholder**
    - **Validates: Requirements 3.3**
  
  - [ ]* 6.5 Write property test for error state fallback
    - **Property 8: Error State Fallback**
    - **Validates: Requirements 3.4**
  
  - [ ]* 6.6 Write unit tests for LazyImage component
    - Test rendering with various props
    - Test state transitions (loading → loaded, loading → error)
    - Test callback invocations
    - _Requirements: 3.3, 3.4, 3.6_

- [x] 7. Integrate plugin with Vite configuration
  - [x] 7.1 Update vite.config.js to include image optimizer plugin
    - Import the plugin
    - Add to plugins array with configuration
    - Configure source directory and quality settings
    - Ensure compatibility with existing base path configuration
    - _Requirements: 2.2, 5.4_
  
  - [ ]* 7.2 Write property test for automatic image processing
    - **Property 4: Automatic Image Processing**
    - **Validates: Requirements 2.1, 2.3, 2.4**
  
  - [x] 7.3 Verify dev server compatibility
    - Test that plugin doesn't interfere with hot module replacement
    - Ensure dev server starts without errors
    - _Requirements: 5.5_

- [x] 8. Process existing images in the repository
  - [x] 8.1 Run build to optimize existing images
    - Execute build process on public/images/khao-yai-WatPaPuHaiLong
    - Execute build process on public/images/khao-yai
    - Verify total optimized size is under 3MB
    - _Requirements: 1.1, 1.2, 1.6_
  
  - [x] 8.2 Verify image quality and visual fidelity
    - Manually inspect optimized images for compression artifacts
    - Check sky gradients and foliage details
    - Verify color accuracy
    - _Requirements: 1.3, 4.1, 4.3, 4.5_

- [x] 9. Create usage documentation and examples
  - [x] 9.1 Document LazyImage component usage
    - Create example showing how to use LazyImage in React components
    - Document props and their purposes
    - Show error handling patterns
    - _Requirements: 3.6, 5.3_
  
  - [x] 9.2 Document plugin configuration options
    - List all available configuration options
    - Explain quality settings and target size ranges
    - Provide examples of custom configurations
    - _Requirements: 2.2, 4.2_

- [x] 10. Final checkpoint and integration testing
  - Run full build with all images
  - Verify all property tests pass
  - Verify all unit tests pass
  - Check that total page size is reduced from ~17MB to under 3MB
  - Ensure all tests pass, ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The plugin uses Sharp library for high-quality image compression
- LazyImage component uses native browser lazy loading for broad compatibility
- Property tests use fast-check library (already in devDependencies)
- All property tests should run with minimum 100 iterations
- Checkpoints ensure incremental validation of functionality
