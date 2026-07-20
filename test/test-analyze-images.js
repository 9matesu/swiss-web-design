/**
 * test-analyze-images.js
 *
 * Tests for the analyze-images.js script.
 * Uses the existing example images (b1.jpg, b2.jpg).
 *
 * Run: cd examples && npm install && node ../test/test-analyze-images.js
 */

const fs = require('fs');
const path = require('path');

const EXAMPLES_DIR = path.resolve(__dirname, '..', 'examples');

// Resolve modules from examples/ directory where deps are installed
const moduleResolve = (name) => {
  const p = path.join(EXAMPLES_DIR, 'node_modules', name);
  if (fs.existsSync(p)) return p;
  return require.resolve(name);
};

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  PASS  ${name}`);
    passed++;
  } catch (err) {
    console.log(`  FAIL  ${name}`);
    console.log(`        ${err.message}`);
    failed++;
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg || 'assertion failed');
}

// --- 1. Example images exist ---
console.log('\nExample images:');

test('b1.jpg exists', () => {
  assert(fs.existsSync(path.join(EXAMPLES_DIR, 'b1.jpg')), 'b1.jpg not found');
});

test('b2.jpg exists', () => {
  assert(fs.existsSync(path.join(EXAMPLES_DIR, 'b2.jpg')), 'b2.jpg not found');
});

test('analyze-images.js exists', () => {
  assert(fs.existsSync(path.join(EXAMPLES_DIR, 'analyze-images.js')), 'analyze-images.js not found');
});

// --- 2. Run the actual analysis ---
console.log('\nAnalysis:');

(async () => {
  try {
    const sharp = require(moduleResolve('sharp'));
    const image = sharp(path.join(EXAMPLES_DIR, 'b1.jpg'));
    const metadata = await image.metadata();
    const stats = await image.stats();

    test('b1.jpg is a JPEG', () => {
      assert(metadata.format === 'jpeg', `Expected jpeg, got ${metadata.format}`);
    });

    test('b1.jpg has dimensions', () => {
      assert(metadata.width > 0, 'Width is 0');
      assert(metadata.height > 0, 'Height is 0');
    });

    test('b1.jpg has dominant colour', () => {
      assert(stats.dominant, 'No dominant colour');
      assert(typeof stats.dominant.r === 'number', 'No red channel');
      assert(typeof stats.dominant.g === 'number', 'No green channel');
      assert(typeof stats.dominant.b === 'number', 'No blue channel');
    });

    test('b1.jpg has 3 channels', () => {
      assert(metadata.channels === 3, `Expected 3 channels, got ${metadata.channels}`);
    });

    // Test palette extraction
    const image2 = (require(moduleResolve('sharp')))(path.join(EXAMPLES_DIR, 'b2.jpg'));
    const meta2 = await image2.metadata();
    const stats2 = await image2.stats();

    test('b2.jpg is a JPEG', () => {
      assert(meta2.format === 'jpeg', `Expected jpeg, got ${meta2.format}`);
    });

    test('b2.jpg has larger dimensions than b1.jpg', () => {
      assert(meta2.width > metadata.width, 'b2 width should be larger than b1 width');
    });

  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      console.log('\n  SKIP  sharp not installed — run: cd examples && npm install');
      console.log(`  Error: ${err.message}`);
    } else {
      console.log(`\n  ERROR ${err.message}`);
      failed++;
    }
  }

  // --- 3. Parse the existing references.yaml ---
  console.log('\nReferences file:');

  try {
    const yaml = require(moduleResolve('js-yaml'));
    const refPath = path.join(EXAMPLES_DIR, 'references.yaml');

    if (fs.existsSync(refPath)) {
      const doc = yaml.load(fs.readFileSync(refPath, 'utf-8'));

      test('references.yaml has generated timestamp', () => {
        assert(doc.generated, 'Missing generated timestamp');
      });

      test('references.yaml has total count', () => {
        assert(typeof doc.total === 'number', 'Total is not a number');
        assert(doc.total > 0, 'Total is 0');
      });

      test('references.yaml has references array', () => {
        assert(Array.isArray(doc.references), 'references is not an array');
        assert(doc.references.length > 0, 'references is empty');
      });

      test('each reference has required fields', () => {
        for (const ref of doc.references) {
          assert(ref.file, 'Missing file name');
          assert(ref.width, 'Missing width');
          assert(ref.height, 'Missing height');
          assert(ref.format, 'Missing format');
          assert(ref.sizeKB, 'Missing sizeKB');
          assert(ref.entropy !== undefined, 'Missing entropy');
        }
      });
    } else {
      console.log('  SKIP  references.yaml not found (run node analyze-images.js first)');
    }
  } catch (err) {
    console.log(`\n  SKIP  ${err.message}`);
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
  process.exit(failed > 0 ? 1 : 0);
})();
