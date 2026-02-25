/**
 * Vite Plugin for Image Optimization
 * 
 * This plugin automatically compresses images during the build process using Sharp.
 * It processes images from the public/images directory and outputs optimized versions
 * to the dist/images directory.
 * 
 * Features:
 * - Compresses images to target size range (200-300KB)
 * - Generates WebP versions alongside JPEG
 * - Preserves aspect ratios and directory structure
 * - Logs compression statistics
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * Creates the image optimizer Vite plugin
 * 
 * @param {Object} options - Plugin configuration options
 * @param {string} options.sourceDir - Source directory for images (default: 'public/images')
 * @param {number} options.targetSizeMin - Minimum target size in bytes (default: 200KB)
 * @param {number} options.targetSizeMax - Maximum target size in bytes (default: 300KB)
 * @param {number} options.jpegQuality - JPEG quality setting 75-85 (default: 80)
 * @param {number} options.webpQuality - WebP quality setting (default: 80)
 * @param {boolean} options.generateWebP - Generate WebP versions (default: true)
 * @param {boolean} options.logStats - Log compression statistics (default: true)
 * @returns {Object} Vite plugin object
 */
export default function imageOptimizer(options = {}) {
  const config = {
    sourceDir: options.sourceDir || 'public/images',
    targetSizeMin: options.targetSizeMin || 200 * 1024,
    targetSizeMax: options.targetSizeMax || 300 * 1024,
    jpegQuality: options.jpegQuality || 80,
    webpQuality: options.webpQuality || 80,
    generateWebP: options.generateWebP !== false,
    logStats: options.logStats !== false
  };

  let imagesToProcess = [];

  /**
   * Recursively scans a directory for image files
   * @param {string} dir - Directory to scan
   * @returns {string[]} Array of image file paths
   */
  function scanDirectory(dir) {
    const images = [];
    
    if (!fs.existsSync(dir)) {
      return images;
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        images.push(...scanDirectory(fullPath));
      } else if (entry.isFile()) {
        // Check if file is a supported image format
        const ext = path.extname(entry.name).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          images.push(fullPath);
        }
      }
    }
    
    return images;
  }

  /**
   * Compresses an image to target size range using Sharp
   * @param {string} filePath - Path to source image
   * @returns {Promise<{buffer: Buffer, size: number, quality: number, originalSize: number}>}
   */
  async function compressImage(filePath) {
    const originalSize = fs.statSync(filePath).size;
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Start with configured quality
    let quality = config.jpegQuality;
    let buffer;
    let size;
    let resizeWidth = metadata.width;
    
    // Iteratively adjust quality and size to hit target
    const maxAttempts = 25;
    let attempt = 0;
    let minQuality = 75;
    let maxQuality = 85;
    
    while (attempt < maxAttempts) {
      // Apply compression with current quality and size
      let processor = sharp(filePath);
      
      // Resize if needed (preserve aspect ratio)
      if (resizeWidth < metadata.width) {
        processor = processor.resize(resizeWidth, null, {
          fit: 'inside',
          withoutEnlargement: true
        });
      }
      
      buffer = await processor
        .jpeg({
          quality,
          progressive: true,
          mozjpeg: true
        })
        .toBuffer();
      
      size = buffer.length;
      
      // Check if we're in target range
      if (size >= config.targetSizeMin && size <= config.targetSizeMax) {
        break;
      }
      
      // Adjust quality or size based on how far we are from target
      if (size > config.targetSizeMax) {
        // Too large
        const ratio = size / config.targetSizeMax;
        
        if (ratio > 1.3 && resizeWidth > 1000) {
          // Significantly too large, reduce dimensions more aggressively
          resizeWidth = Math.floor(resizeWidth * 0.8);
        } else if (ratio > 1.1 && quality > minQuality + 2) {
          // Moderately too large, reduce quality
          maxQuality = quality;
          quality = Math.floor((minQuality + quality) / 2);
        } else if (resizeWidth > 800) {
          // Still too large, try reducing size
          resizeWidth = Math.floor(resizeWidth * 0.9);
        } else {
          // Last resort, reduce quality to minimum
          quality = minQuality;
        }
      } else if (size < config.targetSizeMin) {
        // Too small, increase quality (but stay in 75-85 range)
        minQuality = quality;
        quality = Math.min(85, Math.ceil((quality + maxQuality) / 2));
      }
      
      attempt++;
      
      // If we've converged, accept the result
      if (Math.abs(maxQuality - minQuality) <= 1 && resizeWidth >= metadata.width * 0.6) {
        break;
      }
    }
    
    return {
      buffer,
      size,
      quality,
      originalSize,
      width: metadata.width,
      height: metadata.height
    };
  }

  /**
   * Generates WebP version of an image
   * @param {string} filePath - Path to source image
   * @returns {Promise<{buffer: Buffer, size: number}>}
   */
  async function generateWebP(filePath) {
    const buffer = await sharp(filePath)
      .webp({
        quality: config.webpQuality,
        effort: 4
      })
      .toBuffer();
    
    return {
      buffer,
      size: buffer.length
    };
  }

  return {
    name: 'vite-plugin-image-optimizer',
    
    /**
     * Hook that runs at the start of the build
     * Scans the source directory for images to process
     */
    async buildStart() {
      console.log('Image optimizer plugin initialized');
      
      // Scan for images to process
      imagesToProcess = scanDirectory(config.sourceDir);
      
      if (config.logStats) {
        console.log(`Found ${imagesToProcess.length} images to optimize`);
      }
    },
    
    /**
     * Hook that runs after bundle generation
     * Processes all discovered images and writes optimized versions
     */
    async closeBundle() {
      if (imagesToProcess.length === 0) {
        console.log('No images to optimize');
        return;
      }

      console.log(`Processing ${imagesToProcess.length} images...`);

      for (const imagePath of imagesToProcess) {
        try {
          // Compress the image
          const compressed = await compressImage(imagePath);
          
          // Calculate output path in dist directory
          const relativePath = path.relative(config.sourceDir, imagePath);
          const outputDir = path.join('dist', 'images', path.dirname(relativePath));
          const filename = path.basename(imagePath);
          const outputPath = path.join(outputDir, filename);
          
          // Create output directory if it doesn't exist
          fs.mkdirSync(outputDir, { recursive: true });
          
          // Write compressed JPEG
          fs.writeFileSync(outputPath, compressed.buffer);
          
          if (config.logStats) {
            const reduction = ((1 - compressed.size / compressed.originalSize) * 100).toFixed(1);
            console.log(`  ✓ ${filename}: ${(compressed.originalSize / 1024 / 1024).toFixed(2)} MB → ${(compressed.size / 1024).toFixed(0)} KB (${reduction}% reduction)`);
          }
          
          // Generate WebP version if enabled
          if (config.generateWebP) {
            const webp = await generateWebP(imagePath);
            const webpFilename = filename.replace(/\.(jpg|jpeg|png)$/i, '.webp');
            const webpOutputPath = path.join(outputDir, webpFilename);
            
            fs.writeFileSync(webpOutputPath, webp.buffer);
            
            if (config.logStats) {
              console.log(`  ✓ ${webpFilename}: ${(webp.size / 1024).toFixed(0)} KB (WebP)`);
            }
          }
        } catch (error) {
          console.error(`  ✗ Failed to process ${path.basename(imagePath)}: ${error.message}`);
        }
      }

      console.log('Image optimization complete');
    }
  };
}
