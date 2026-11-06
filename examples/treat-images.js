#!/usr/bin/env node

/**
 * treat-images.js
 *
 * The image refactor pipeline for the examples directory.
 * Generates design-ready working copies from the ORIGINAL reference
 * images, in the two canonical states of the skill:
 *
 *   normal build    — grayscale, contrast lifted, resize-capped
 *   threshold print — hard grayscale threshold (grayscale + contrast 16 look)
 *
 * The originals are moved to img/original/ the first time this runs and
 * are never modified afterwards. Run again any time to regenerate.
 *
 * Usage:
 *   node treat-images.js            # build all working copies
 *   node treat-images.js --summary  # plus a size table of outputs
 *
 * Requires: sharp  (cd examples && npm install)
 */

const fs = require('fs');
const path = require('path');

const IMG_DIR = path.join(__dirname, 'img');
const ORIGINAL_DIR = path.join(IMG_DIR, 'original', path.sep);
const SIGNAGE_DIR = __dirname; // legacy reference sheets live at examples root

const SUMMARY_FLAG = process.argv.includes('--summary');

let sharp;
try {
  sharp = require('sharp');
} catch {
  console.error('Error: sharp is required. Run: cd examples && npm install');
  process.exit(1);
}

/* ── Recipe table ─────────────────────────────────────────────────────────
 * source (in img/original/) → outputs (in img/)
 * width caps keep the repo light; nothing is enlarged.
 * ─────────────────────────────────────────────────────────────────────── */
const RECIPES = [
  {
    source: 'matesu-normal.jpg',
    outputs: [
      { file: 'matesu-normal.jpg', width: 800, treatment: 'normal' },
      { file: 'matesu-threshold.jpg', width: 800, treatment: 'threshold' },
    ],
  },
  {
    source: 'matesu-dots.jpg',
    outputs: [
      { file: 'matesu-dots.jpg', width: 800, treatment: 'normal' },
    ],
  },
  {
    source: 'BMV1-9.jpg',
    outputs: [
      { file: 'BMV1-9.jpg', width: 1200, treatment: 'normal' },
    ],
  },
  {
    source: 'BMV1-21.jpg',
    outputs: [
      { file: 'BMV1-21.jpg', width: 1200, treatment: 'normal' },
    ],
  },
];

const SIGNAGE = [
  { from: 'b1.jpg', to: path.join('img', 'signage-toronto.jpg'), name: 'signage-toronto.jpg' },
  { from: 'b2.jpg', to: path.join('img', 'signage-swiss.jpg'), name: 'signage-swiss.jpg' },
];

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

/** Collect original sources into img/original/ exactly once. */
function collectOriginals() {
  ensureDir(ORIGINAL_DIR);
  let moved = 0;
  for (const recipe of RECIPES) {
    const src = path.join(IMG_DIR, recipe.source);
    const dst = path.join(ORIGINAL_DIR, recipe.source);
    if (fs.existsSync(src) && !fs.existsSync(dst)) {
      fs.renameSync(src, dst);
      moved++;
    }
  }
  return moved;
}

async function build(sourceFile, out) {
  const src = path.join(ORIGINAL_DIR, sourceFile);
  const dst = path.join(IMG_DIR, out.file);

  let img = sharp(src).rotate(); // honour EXIF orientation
  img = img.resize({ width: out.width, withoutEnlargement: true });

  if (out.treatment === 'threshold') {
    // The canonical threshold print: grayscale, hard cut at mid.
    img = img.grayscale().threshold(128);
  } else {
    // The normal build: objective photography, lifted for dark layouts.
    // linear(a, b) clamps output = a·input + b — a gentle 1.2 slope.
    img = img.grayscale().linear(1.2, 0);
  }

  await img.jpeg({ quality: 82, mozjpeg: true }).toFile(dst);
  return dst;
}

async function moveSignage() {
  for (const s of SIGNAGE) {
    const from = path.join(SIGNAGE_DIR, s.from);
    const to = path.join(__dirname, s.to);
    if (fs.existsSync(from) && !fs.existsSync(to)) {
      fs.renameSync(from, to);
      const meta = await sharp(to).metadata();
      console.log(`  moved ${s.from} → img/${s.name} (${meta.width}×${meta.height})`);
    }
  }
}

async function main() {
  console.log('treat-images.js — image refactor pipeline\n');
  const moved = collectOriginals();
  if (moved) console.log(`  filed ${moved} original(s) into img/original/ (never modified again)\n`);
  await moveSignage();

  const table = [];
  for (const recipe of RECIPES) {
    const src = path.join(ORIGINAL_DIR, recipe.source);
    if (!fs.existsSync(src)) {
      console.log(`  SKIP  missing original: ${recipe.source}`);
      continue;
    }
    for (const out of recipe.outputs) {
      const dst = await build(recipe.source, out);
      const meta = await sharp(dst).metadata();
      const kb = Math.round(fs.statSync(dst).size / 1024);
      table.push([out.file, meta.width, meta.height, kb, out.treatment]);
      console.log(`  build ${out.file}  (${meta.width}×${meta.height}, ${kb} KB, ${out.treatment})`);
    }
  }

  if (SUMMARY_FLAG && table.length) {
    console.log('\n  file                    W×H        KB   state');
    for (const [f, w, h, kb, t] of table) {
      console.log(`  ${f.padEnd(22)} ${String(w).padStart(4)}×${String(h).padEnd(4)} ${String(kb).padStart(5)}   ${t}`);
    }
  }

  console.log('\nDone — run: node analyze-images.js to refresh references.yaml');
}

main().catch((err) => {
  console.error(`treat-images.js failed: ${err.message}`);
  process.exit(1);
});
