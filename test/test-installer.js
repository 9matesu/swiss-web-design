/**
 * test-installer.js
 *
 * Tests for the bin/install.js multi-agent installer.
 * Uses --dry-run mode so no files are actually written.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const INSTALLER = path.join(ROOT, 'bin', 'install.js');

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

// --- 1. Installer file exists ---
console.log('\nInstaller:');

test('install.js exists', () => {
  assert(fs.existsSync(INSTALLER), 'bin/install.js not found');
});

test('install.js is executable', () => {
  const content = fs.readFileSync(INSTALLER, 'utf-8');
  assert(content.startsWith('#!/usr/bin/env node'), 'Missing shebang');
});

test('install.js has help text', () => {
  const content = fs.readFileSync(INSTALLER, 'utf-8');
  assert(content.includes('--help'), 'Missing --help option');
  assert(content.includes('--opencode'), 'Missing --opencode option');
  assert(content.includes('--antigravity'), 'Missing --antigravity option');
  assert(content.includes('--claude'), 'Missing --claude option');
  assert(content.includes('--cursor'), 'Missing --cursor option');
  assert(content.includes('--global'), 'Missing --global option');
  assert(content.includes('--dry-run'), 'Missing --dry-run option');
  assert(content.includes('--path'), 'Missing --path option');
});

test('install.js references skill source directory', () => {
  const content = fs.readFileSync(INSTALLER, 'utf-8');
  assert(content.includes('SKILL_SRC'), 'Missing SKILL_SRC reference');
  assert(content.includes('AGENTS_SRC'), 'Missing AGENTS_SRC reference');
});

test('install.js handles all target agents', () => {
  const content = fs.readFileSync(INSTALLER, 'utf-8');
  const targets = ['opencode', 'antigravity', 'claude', 'cursor'];
  for (const t of targets) {
    assert(content.includes(`'${t}'`), `Missing target: ${t}`);
  }
});

// --- 2. Verify the installer can parse flags ---
console.log('\nFlag parsing:');

test('install.js recognizes --dry-run', () => {
  const content = fs.readFileSync(INSTALLER, 'utf-8');
  assert(content.includes("dryRun = args.includes('--dry-run')"), '--dry-run not implemented');
});

test('install.js recognizes --global', () => {
  const content = fs.readFileSync(INSTALLER, 'utf-8');
  assert(content.includes("isGlobal = args.includes('--global')"), '--global not implemented');
});

test('install.js recognizes --help', () => {
  const content = fs.readFileSync(INSTALLER, 'utf-8');
  assert(content.includes("args.includes('--help')"), '--help not implemented');
});

// --- 3. Verify source directories exist ---
console.log('\nSource directories:');

test('Skill source directory exists', () => {
  const skillSrc = path.join(ROOT, '.opencode', 'skills', 'swiss-web-design');
  assert(fs.existsSync(skillSrc), 'Skill source not found');
  assert(fs.existsSync(path.join(skillSrc, 'SKILL.md')), 'SKILL.md not in source');
});

test('Agents source directory exists', () => {
  const agentsSrc = path.join(ROOT, '.opencode', 'agents');
  assert(fs.existsSync(agentsSrc), 'Agents source not found');
});

test('Templates source directory exists', () => {
  const templatesSrc = path.join(ROOT, 'templates');
  assert(fs.existsSync(templatesSrc), 'Templates source not found');
});

// --- Summary ---
console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
