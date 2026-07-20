/**
 * analyze-images.js
 *
 * Reads all images from the examples/ directory, extracts metadata
 * (dimensions, aspect ratio, dominant colour, entropy, exif),
 * and writes structured data to references.yaml.
 *
 * Usage: node analyze-images.js
 *
 * Requires: sharp (npm install sharp js-yaml)
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const yaml = require('js-yaml');

const EXAMPLES_DIR = __dirname;
const OUTPUT = path.join(EXAMPLES_DIR, 'references.yaml');
const SUPPORTED = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.tiff', '.avif'];

async function analyzeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!SUPPORTED.includes(ext)) return null;

  const stats = fs.statSync(filePath);
  const image = sharp(filePath);
  const metadata = await image.metadata();
  const { dominant } = await image.stats();

  // entropy = texture complexity proxy: higher = more detail/noise
  const channels = await image.raw().toBuffer({ resolveWithObject: true });
  const { data, info } = channels;
  const histogram = new Array(256).fill(0);
  for (let i = 0; i < data.length; i++) {
    histogram[data[i]]++;
  }
  const total = data.length;
  let entropy = 0;
  for (let i = 0; i < 256; i++) {
    if (histogram[i] > 0) {
      const p = histogram[i] / total;
      entropy -= p * Math.log2(p);
    }
  }

  const aspectRatio = metadata.width && metadata.height
    ? (metadata.width / metadata.height).toFixed(3)
    : null;

  const dominantColour = dominant
    ? `#${[dominant.r, dominant.g, dominant.b].map(c => c.toString(16).padStart(2, '0')).join('')}`
    : null;

  return {
    file: path.basename(filePath),
    format: metadata.format,
    width: metadata.width,
    height: metadata.height,
    aspectRatio: aspectRatio,
    sizeKB: Math.round(stats.size / 1024),
    dominantColour: dominantColour,
    channels: metadata.channels,
    hasAlpha: metadata.hasAlpha,
    entropy: parseFloat(entropy.toFixed(2)),
    exif: metadata.exif
      ? { preview: 'exif data present, length: ' + metadata.exif.length + ' bytes' }
      : null,
  };
}

async function main() {
  const files = fs.readdirSync(EXAMPLES_DIR)
    .filter(f => SUPPORTED.includes(path.extname(f).toLowerCase()))
    .sort();

  if (files.length === 0) {
    console.log('No image files found in examples/');
    return;
  }

  console.log(`Analyzing ${files.length} image(s)...`);

  const results = [];
  for (const file of files) {
    try {
      const data = await analyzeFile(path.join(EXAMPLES_DIR, file));
      if (data) {
        console.log(`  ✓ ${data.file}: ${data.width}×${data.height}, ${data.sizeKB}KB, dominant ${data.dominantColour}, entropy ${data.entropy}`);
        results.push(data);
      }
    } catch (err) {
      console.error(`  ✗ ${file}: ${err.message}`);
    }
  }

  const doc = {
    generated: new Date().toISOString(),
    total: results.length,
    references: results,
  };

  fs.writeFileSync(OUTPUT, yaml.dump(doc, { indent: 2, lineWidth: 120 }), 'utf-8');
  console.log(`\nWrote ${OUTPUT}`);
}

main().catch(console.error);
