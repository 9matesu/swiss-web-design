#!/usr/bin/env node

/**
 * analyze-images.js
 *
 * Reads all images from the examples/ directory, extracts metadata
 * (dimensions, aspect ratio, dominant colour, entropy, exif, palette),
 * and writes structured data to references.yaml or references.json.
 *
 * Usage:
 *   node analyze-images.js                      # YAML output (default)
 *   node analyze-images.js --format json        # JSON output
 *   node analyze-images.js --output palette     # Show colour palette only
 *   node analyze-images.js --dir ./my-images    # Scan a custom directory
 *   node analyze-images.js --watch              # Watch for new images
 *   node analyze-images.js --help               # Show help
 *
 * Requires: sharp, js-yaml
 *   npm install sharp js-yaml
 */

const fs = require('fs');
const path = require('path');

let sharp, yaml;
try {
  sharp = require('sharp');
} catch {
  console.error('Error: sharp is required. Run: npm install sharp js-yaml');
  process.exit(1);
}
try {
  yaml = require('js-yaml');
} catch {
  // yaml is optional — falls back to JSON for default output
}

const EXAMPLES_DIR = __dirname;
const SUPPORTED = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.tiff', '.avif'];

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    format: 'yaml',
    output: null,
    dir: EXAMPLES_DIR,
    watch: false,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--format':
        opts.format = args[++i] || 'yaml';
        break;
      case '--output':
        opts.output = args[++i] || 'all';
        break;
      case '--dir':
        opts.dir = path.resolve(args[++i] || EXAMPLES_DIR);
        break;
      case '--watch':
        opts.watch = true;
        break;
      case '--help':
      case '-h':
        opts.help = true;
        break;
    }
  }

  return opts;
}

function printHelp() {
  console.log(`
  analyze-images.js — Extract design data from images

  Usage:
    node analyze-images.js [options]

  Options:
    --format <yaml|json>   Output format (default: yaml)
    --output <all|palette> What to output (default: all)
    --dir <path>           Directory to scan (default: examples/)
    --watch                Watch directory for new images
    --help, -h             Show this help

  Examples:
    node analyze-images.js
    node analyze-images.js --format json
    node analyze-images.js --output palette
    node analyze-images.js --dir ../assets
    node analyze-images.js --watch
  `);
}

/**
 * Extract a 5-colour palette from an image using pixel sampling.
 */
async function extractPalette(image, sampleRate) {
  sampleRate = sampleRate || 4;
  const meta = await image.metadata();
  const { data, info } = await image
    .resize(Math.ceil(meta.width / sampleRate), Math.ceil(meta.height / sampleRate), { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Quantize colours to 12-bit (4 bits per channel) for histogram
  const colourMap = new Map();
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i] >> 4;
    const g = data[i + 1] >> 4;
    const b = data[i + 2] >> 4;
    const key = (r << 8) | (g << 4) | b;
    colourMap.set(key, (colourMap.get(key) || 0) + 1);
  }

  const total = data.length / info.channels;
  const minFrequency = 0.05; // ignore colours below 5%

  const sorted = [...colourMap.entries()]
    .map(([key, count]) => ({
      r: (key >> 8) << 4,
      g: ((key >> 4) & 0xf) << 4,
      b: (key & 0xf) << 4,
      freq: count / total,
    }))
    .filter(c => c.freq >= minFrequency)
    .sort((a, b) => b.freq - a.freq)
    .slice(0, 5);

  return sorted.map(c => ({
    hex: `#${[c.r, c.g, c.b].map(v => v.toString(16).padStart(2, '0')).join('')}`,
    frequency: parseFloat(c.freq.toFixed(3)),
  }));
}

/**
 * Calculate saturation for a colour to classify neutral vs accent.
 */
function saturation(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max === 0 ? 0 : (max - min) / max;
}

/**
 * Classify a palette into design token roles.
 */
function classifyPalette(palette) {
  const classified = palette.map(c => {
    const r = parseInt(c.hex.slice(1, 3), 16);
    const g = parseInt(c.hex.slice(3, 5), 16);
    const b = parseInt(c.hex.slice(5, 7), 16);
    const sat = saturation(r, g, b);
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    return { ...c, sat, lum };
  });

  const sorted = [...classified].sort((a, b) => b.freq - a.freq);
  const neutrals = sorted.filter(c => c.sat < 0.3);
  const accents = sorted.filter(c => c.sat >= 0.3);

  return {
    palette: sorted,
    tokens: {
      background: neutrals.sort((a, b) => b.lum - a.lum)[0]?.hex || '#FFFFFF',
      text: neutrals.sort((a, b) => a.lum - b.lum)[0]?.hex || '#1A1A1A',
      accent: accents[0]?.hex || '#D82C2C',
      muted: neutrals.filter(n => n.lum > 100 && n.lum < 240).sort((a, b) => b.lum - a.lum)[0]?.hex || '#6A6A6A',
      offWhite: neutrals.filter(n => n.lum >= 200).sort((a, b) => b.lum - a.lum)[0]?.hex || '#F4F3EE',
    },
  };
}

async function analyzeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!SUPPORTED.includes(ext)) return null;

  const stats = fs.statSync(filePath);
  const image = sharp(filePath);
  const metadata = await image.metadata();
  const { dominant } = await image.stats();

  // entropy = texture complexity proxy
  const channels = await image.raw().toBuffer({ resolveWithObject: true });
  const { data } = channels;
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

  // Extract full palette
  const palette = await extractPalette(image);
  const classified = classifyPalette(palette);

  const result = {
    file: path.basename(filePath),
    format: metadata.format,
    width: metadata.width,
    height: metadata.height,
    aspectRatio: aspectRatio,
    sizeKB: Math.round(stats.size / 1024),
    dominantColour: dominantColour,
    palette: palette,
    classifiedTokens: classified.tokens,
    channels: metadata.channels,
    hasAlpha: metadata.hasAlpha,
    entropy: parseFloat(entropy.toFixed(2)),
    exif: metadata.exif
      ? { preview: 'exif data present, length: ' + metadata.exif.length + ' bytes' }
      : null,
  };

  return result;
}

async function scanDirectory(dirPath) {
  const files = fs.readdirSync(dirPath)
    .filter(f => SUPPORTED.includes(path.extname(f).toLowerCase()))
    .sort();

  if (files.length === 0) {
    console.log('No image files found in', dirPath);
    return [];
  }

  console.log(`Analyzing ${files.length} image(s) in ${dirPath}...`);

  const results = [];
  for (const file of files) {
    try {
      const data = await analyzeFile(path.join(dirPath, file));
      if (data) {
        console.log(`  ${data.file}: ${data.width}x${data.height}, ${data.sizeKB}KB, entropy ${data.entropy}, ${data.palette.length} colours`);
        results.push(data);
      }
    } catch (err) {
      console.error(`  X ${file}: ${err.message}`);
    }
  }

  return results;
}

function writeOutput(results, opts) {
  if (opts.output === 'palette') {
    console.log('\n--- Extracted Palettes ---');
    for (const r of results) {
      console.log(`\n${r.file}:`);
      console.log(`  Dominant: ${r.dominantColour}`);
      console.log(`  Palette:`);
      for (const c of r.palette) {
        console.log(`    ${c.hex}  (${(c.frequency * 100).toFixed(1)}%)`);
      }
      console.log(`  Design tokens:`);
      for (const [role, hex] of Object.entries(r.classifiedTokens)) {
        console.log(`    --${role}: ${hex}`);
      }
    }
    return;
  }

  const doc = {
    generated: new Date().toISOString(),
    total: results.length,
    references: results,
  };

  const outputPath = path.join(opts.dir, opts.format === 'json' ? 'references.json' : 'references.yaml');

  if (opts.format === 'json') {
    fs.writeFileSync(outputPath, JSON.stringify(doc, null, 2), 'utf-8');
  } else if (yaml) {
    fs.writeFileSync(outputPath, yaml.dump(doc, { indent: 2, lineWidth: 120 }), 'utf-8');
  } else {
    // Fallback to JSON if js-yaml not installed
    fs.writeFileSync(path.join(opts.dir, 'references.json'), JSON.stringify(doc, null, 2), 'utf-8');
    console.log('  (js-yaml not found, fell back to JSON)');
  }

  console.log(`\nWrote ${outputPath}`);
}

async function main() {
  const opts = parseArgs();

  if (opts.help) {
    printHelp();
    return;
  }

  const results = await scanDirectory(opts.dir);
  if (results.length === 0) return;

  writeOutput(results, opts);
}

main().catch(console.error);
