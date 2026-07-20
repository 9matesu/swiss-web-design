/**
 * test-skill-structure.js
 *
 * Validates the Swiss Web Design skill file structure:
 * - SKILL.md has required frontmatter
 * - All agent files have valid frontmatter
 * - File tree matches expected structure
 * - Templates contain required design tokens
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKILL_DIR = path.join(ROOT, '.opencode', 'skills', 'swiss-web-design');
const AGENTS_DIR = path.join(ROOT, '.opencode', 'agents');
const TEMPLATES_DIR = path.join(ROOT, 'templates');
const SKILL_MD = path.join(SKILL_DIR, 'SKILL.md');

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

// --- Parse frontmatter from a .md file ---
function parseFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return null;

  const fm = {};
  const lines = match[1].split('\n');
  let currentKey = null;
  let currentVal = [];
  let isFolded = false;

  for (const line of lines) {
    const indent = line.search(/\S/);
    // Top-level key:value line
    const topMatch = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (topMatch && indent === 0) {
      // Save previous folded value
      if (currentKey && isFolded) {
        fm[currentKey] = currentVal.join(' ').replace(/\s+/g, ' ').trim();
      } else if (currentKey) {
        fm[currentKey] = currentVal.join('\n').trim();
      }
      currentKey = topMatch[1];
      currentVal = [];
      isFolded = topMatch[2].trim() === '>' || topMatch[2].trim() === '|';
      const rest = topMatch[2].trim();
      if (rest && rest !== '>' && rest !== '|') {
        currentVal.push(rest);
      }
    } else if (currentKey) {
      currentVal.push(line);
    }
  }

  // Save last key
  if (currentKey && isFolded) {
    fm[currentKey] = currentVal.join(' ').replace(/\s+/g, ' ').trim();
  } else if (currentKey) {
    fm[currentKey] = currentVal.join('\n').trim();
  }

  // Flatten nested permission: key
  if (fm.permission && typeof fm.permission === 'string') {
    const permMatch = fm.permission.match(/edit:\s*(\w+)/);
    const bashMatch = fm.permission.match(/bash:\s*(\w+)/);
    fm.permission = {
      edit: permMatch ? permMatch[1] : 'deny',
      bash: bashMatch ? bashMatch[1] : 'deny',
    };
  }

  return fm;
}

// --- 1. SKILL.md exists and has valid frontmatter ---
console.log('\nSkill file:');
console.log('  File:', path.relative(ROOT, SKILL_MD));

test('SKILL.md exists', () => {
  assert(fs.existsSync(SKILL_MD), 'File not found');
});

test('SKILL.md has frontmatter', () => {
  const fm = parseFrontmatter(SKILL_MD);
  assert(fm !== null, 'No YAML frontmatter found');
  assert(fm.name === 'swiss-web-design', `Expected name "swiss-web-design", got "${fm.name}"`);
  assert(fm.description && fm.description.length > 0, 'Description is missing or empty');
});

test('SKILL.md has TOC entry for section 20', () => {
  const content = fs.readFileSync(SKILL_MD, 'utf-8');
  assert(content.includes('20. Image Analysis'), 'Section 20 not found in TOC');
});

test('SKILL.md contains section 20 body', () => {
  const content = fs.readFileSync(SKILL_MD, 'utf-8');
  assert(content.includes('## 20. Image Analysis & Design Extraction'), 'Section 20 body not found');
});

test('SKILL.md contains Usage Notes', () => {
  const content = fs.readFileSync(SKILL_MD, 'utf-8');
  assert(content.includes('## Usage Notes'), 'Usage Notes section not found');
});

// --- 2. Agent files ---
console.log('\nAgents:');

const expectedAgents = [
  'cargo-builder.md',
  'colorist.md',
  'design-critic.md',
  'design-director.md',
  'grid-architect.md',
  'image-editor.md',
  'texture-artist.md',
  'typographer.md',
];

for (const agentFile of expectedAgents) {
  const agentPath = path.join(AGENTS_DIR, agentFile);

  test(`${agentFile} exists`, () => {
    assert(fs.existsSync(agentPath), `File not found: ${agentPath}`);
  });

  test(`${agentFile} has frontmatter`, () => {
    const fm = parseFrontmatter(agentPath);
    assert(fm !== null, 'No frontmatter');
    assert(fm.description && fm.description.length > 0, 'Missing description');
    assert(fm.mode === 'primary' || fm.mode === 'subagent', `Invalid mode: ${fm.mode}`);
    assert(fm.permission, 'Missing permission section');
  });

  if (agentFile === 'design-director.md') {
    test(`${agentFile} is primary mode`, () => {
      const fm = parseFrontmatter(agentPath);
      assert(fm.mode === 'primary', `Expected primary mode, got ${fm.mode}`);
    });
  } else {
    test(`${agentFile} is subagent mode`, () => {
      const fm = parseFrontmatter(agentPath);
      assert(fm.mode === 'subagent', `Expected subagent mode, got ${fm.mode}`);
    });
  }
}

test('No unexpected agent files', () => {
  const files = fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith('.md'));
  for (const f of files) {
    assert(expectedAgents.includes(f), `Unexpected file: ${f}`);
  }
});

// --- 3. Templates ---
console.log('\nTemplates:');

const expectedTemplates = [
  'archive-grid.html',
  'editorial-article.html',
  'portfolio-brutalist.html',
  'portfolio-swiss.html',
  'wayfinder-landing.html',
];

for (const tmpl of expectedTemplates) {
  const tmplPath = path.join(TEMPLATES_DIR, tmpl);

  test(`${tmpl} exists`, () => {
    assert(fs.existsSync(tmplPath), `File not found: ${tmplPath}`);
  });

  test(`${tmpl} is valid HTML5`, () => {
    const content = fs.readFileSync(tmplPath, 'utf-8');
    assert(content.startsWith('<!DOCTYPE html>'), 'Missing DOCTYPE');
  });

  test(`${tmpl} contains design tokens`, () => {
    const content = fs.readFileSync(tmplPath, 'utf-8');
    if (tmpl === 'portfolio-brutalist.html') {
      // Brutalist template intentionally uses raw values, not custom properties
      assert(content.includes('font-family'), 'Missing font declarations');
      assert(content.includes('#000') || content.includes('#0000EE'), 'Missing colours');
    } else if (tmpl === 'wayfinder-landing.html') {
      // Wayfinder uses its own token set
      assert(content.includes('--bg') && content.includes('--text'), 'Missing Wayfinder tokens');
      assert(content.includes('--font-display') || content.includes('--font-body'), 'Missing Wayfinder font tokens');
    } else {
      assert(content.includes('--font-sans'), 'Missing --font-sans token');
      assert(content.includes('--accent'), 'Missing --accent token');
      assert(content.includes('--grid-gap'), 'Missing --grid-gap token');
    }
  });
}

test('No unexpected template files', () => {
  const files = fs.readdirSync(TEMPLATES_DIR).filter(f => f.endsWith('.html'));
  for (const f of files) {
    assert(expectedTemplates.includes(f), `Unexpected template: ${f}`);
  }
});

// --- 4. Package files ---
console.log('\nPackage:');

test('package.json exists at root', () => {
  assert(fs.existsSync(path.join(ROOT, 'package.json')), 'package.json not found');
});

test('LICENSE exists', () => {
  assert(fs.existsSync(path.join(ROOT, 'LICENSE')), 'LICENSE not found');
});

test('CHANGELOG.md exists', () => {
  assert(fs.existsSync(path.join(ROOT, 'CHANGELOG.md')), 'CHANGELOG.md not found');
});

test('bin/install.js exists', () => {
  assert(fs.existsSync(path.join(ROOT, 'bin', 'install.js')), 'bin/install.js not found');
});

// --- Summary ---
console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
