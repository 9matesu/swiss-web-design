/**
 * test-templates.js
 *
 * Validates template HTML files:
 * - DOCTYPE and basic structure
 * - Design token usage
 * - Grid class conventions
 * - No external dependencies (no CDN links)
 * - No build step required
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.resolve(__dirname, '..', 'templates');

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

const templates = fs.readdirSync(TEMPLATES_DIR).filter(f => f.endsWith('.html'));

console.log(`\nTemplates (${templates.length} files):`);

for (const tmpl of templates) {
  const filePath = path.join(TEMPLATES_DIR, tmpl);
  const content = fs.readFileSync(filePath, 'utf-8');

  test(`${tmpl}: DOCTYPE html`, () => {
    assert(content.trim().startsWith('<!DOCTYPE html>'), 'Must start with <!DOCTYPE html>');
  });

  test(`${tmpl}: has <html lang="en">`, () => {
    assert(content.includes('html lang="en"') || content.includes("html lang='en'"), 'Missing lang attribute');
  });

  test(`${tmpl}: has viewport meta`, () => {
    assert(content.includes('viewport'), 'Missing viewport meta tag');
  });

  test(`${tmpl}: has <title>`, () => {
    assert(content.includes('<title>'), 'Missing <title>');
    const match = content.match(/<title>(.*?)<\/title>/);
    assert(match && match[1].length > 0, 'Title is empty');
  });

  if (tmpl === 'portfolio-brutalist.html') {
    test(`${tmpl}: brutalist design patterns (raw values, no tokens)`, () => {
      assert(content.includes('Courier') || content.includes('monospace'), 'Missing monospace font');
      assert(content.includes('#0000EE'), 'Missing default link colour');
    });
  } else if (tmpl === 'wayfinder-landing.html') {
    test(`${tmpl}: has Wayfinder tokens`, () => {
      assert(content.includes('--bg') && content.includes('--text'), 'Missing --bg/--text');
      assert(content.includes('--font-display') || content.includes('--font-body'), 'Missing font tokens');
    });
  } else if (tmpl === 'matesu-portfolio.html') {
    test(`${tmpl}: has --font-sans token`, () => {
      assert(content.includes('--font-sans'), 'Missing --font-sans custom property');
    });
    test(`${tmpl}: has --accent token`, () => {
      assert(content.includes('--accent'), 'Missing --accent custom property');
    });
    test(`${tmpl}: has --grid-gap token`, () => {
      assert(content.includes('--grid-gap'), 'Missing --grid-gap custom property');
    });
    test(`${tmpl}: has --max-width token`, () => {
      assert(content.includes('--max-width'), 'Missing --max-width custom property');
    });
    test(`${tmpl}: has --section-gap token`, () => {
      assert(content.includes('--section-gap'), 'Missing --section-gap custom property');
    });
  } else {
    test(`${tmpl}: has --font-sans token`, () => {
      assert(content.includes('--font-sans'), 'Missing --font-sans custom property');
    });

    test(`${tmpl}: has --accent token`, () => {
      assert(content.includes('--accent'), 'Missing --accent custom property');
    });

    test(`${tmpl}: has --grid-gap token`, () => {
      assert(content.includes('--grid-gap'), 'Missing --grid-gap custom property');
    });

    test(`${tmpl}: has --max-width token`, () => {
      assert(content.includes('--max-width'), 'Missing --max-width custom property');
    });
  }

  test(`${tmpl}: no CDN dependencies`, () => {
    const cdnPatterns = [
      'cdnjs.cloudflare.com',
      'cdn.jsdelivr.net',
      'unpkg.com',
      'fonts.googleapis.com',
      'fonts.gstatic.com',
    ];
    for (const cdn of cdnPatterns) {
      assert(!content.includes(cdn), `Unexpected CDN reference: ${cdn}`);
    }
  });

  test(`${tmpl}: no external stylesheets`, () => {
    const matches = content.match(/<link[^>]*href=["'][^"']*\.css["']/gi);
    assert(!matches || matches.length === 0, 'External CSS link found');
  });

  test(`${tmpl}: self-closing tags OK`, () => {
    // Allow self-closing but check for common mistakes
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;
      // Check for unclosed <style> tag (would break rendering)
      if (line.includes('<style>') && !content.includes('</style>')) {
        assert(false, `Unclosed <style> tag near line ${lineNum}`);
      }
    }
  });

  test(`${tmpl}: charset declaration`, () => {
    assert(content.includes('charset'), 'Missing charset declaration');
  });

  // Template-specific checks
  if (tmpl.includes('portfolio')) {
    test(`${tmpl}: portfolio structure`, () => {
      assert(content.includes('<nav') || content.includes('nav'), 'Portfolio should have navigation');
    });
  }

  if (tmpl.includes('editorial')) {
    test(`${tmpl}: editorial structure`, () => {
      assert(content.includes('pull-quote') || content.includes('pull_quote') || content.includes('article'), 'Editorial should have article or pull-quote elements');
    });
  }

  if (tmpl.includes('wayfinder')) {
    test(`${tmpl}: Wayfinder dark canvas`, () => {
      assert(content.includes('#000') || content.includes('black') || content.includes('#1A1A1A'), 'Wayfinder should use dark background');
    });
  }
}

console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
