import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Creates test images for image optimization testing
 */
async function createTestImages() {
  const outputDir = join(__dirname, 'images');
  
  // Create a large test image (simulating travel photography)
  // 2000x1500 pixels with a gradient pattern
  const largeImage = await sharp({
    create: {
      width: 2000,
      height: 1500,
      channels: 3,
      background: { r: 100, g: 150, b: 200 }
    }
  })
  .jpeg({ quality: 100 })
  .toBuffer();
  
  writeFileSync(join(outputDir, 'large-test-image.jpg'), largeImage);
  
  // Create a medium test image
  const mediumImage = await sharp({
    create: {
      width: 1600,
      height: 1200,
      channels: 3,
      background: { r: 150, g: 100, b: 50 }
    }
  })
  .jpeg({ quality: 100 })
  .toBuffer();
  
  writeFileSync(join(outputDir, 'medium-test-image.jpg'), mediumImage);
  
  // Create a small test image
  const smallImage = await sharp({
    create: {
      width: 800,
      height: 600,
      channels: 3,
      background: { r: 50, g: 200, b: 100 }
    }
  })
  .jpeg({ quality: 100 })
  .toBuffer();
  
  writeFileSync(join(outputDir, 'small-test-image.jpg'), smallImage);
  
  console.log('Test images created successfully in tests/fixtures/images/');
}

createTestImages().catch(console.error);
