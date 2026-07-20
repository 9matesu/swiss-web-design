#!/usr/bin/env node

/**
 * swiss-web-design installer
 *
 * Copies skill and agent files to the appropriate directory for the target
 * AI coding assistant.
 *
 * Usage:
 *   npx swiss-web-design
 *   npx swiss-web-design --opencode     (default)
 *   npx swiss-web-design --antigravity
 *   npx swiss-web-design --claude
 *   npx swiss-web-design --cursor
 *   npx swiss-web-design --path ./custom-dir
 *   npx swiss-web-design --global
 *   npx swiss-web-design --dry-run
 */

const fs = require('fs');
const path = require('path');

const SKILL_SRC = path.resolve(__dirname, '..', '.opencode', 'skills', 'swiss-web-design');
const AGENTS_SRC = path.resolve(__dirname, '..', '.opencode', 'agents');
const TEMPLATES_SRC = path.resolve(__dirname, '..', 'templates');

const TARGETS = {
  opencode: {
    global: path.join(process.env.USERPROFILE || process.env.HOME, '.config', 'opencode', 'skills', 'swiss-web-design'),
    local: path.join(process.cwd(), '.opencode', 'skills', 'swiss-web-design'),
    agentGlobal: path.join(process.env.USERPROFILE || process.env.HOME, '.config', 'opencode', 'agents'),
    agentLocal: path.join(process.cwd(), '.opencode', 'agents'),
  },
  antigravity: {
    global: path.join(process.env.USERPROFILE || process.env.HOME, '.gemini', 'antigravity', 'skills', 'swiss-web-design'),
    local: path.join(process.cwd(), '.agent', 'skills', 'swiss-web-design'),
    agentGlobal: null,
    agentLocal: null,
  },
  claude: {
    global: path.join(process.env.USERPROFILE || process.env.HOME, '.claude', 'skills', 'swiss-web-design'),
    local: path.join(process.cwd(), '.claude', 'skills', 'swiss-web-design'),
    agentGlobal: null,
    agentLocal: null,
  },
  cursor: {
    global: path.join(process.env.USERPROFILE || process.env.HOME, '.cursor', 'skills', 'swiss-web-design'),
    local: path.join(process.cwd(), '.cursor', 'skills', 'swiss-web-design'),
    agentGlobal: null,
    agentLocal: null,
  },
};

function copyDir(src, dest, dryRun) {
  if (!fs.existsSync(src)) {
    console.error(`  SKIP  ${src} — not found`);
    return [];
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  const copied = [];

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      if (dryRun) {
        copied.push(destPath);
      } else {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copied.push(...copyDir(srcPath, destPath, dryRun));
    } else if (entry.isFile()) {
      if (dryRun) {
        copied.push(destPath);
      } else {
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.copyFileSync(srcPath, destPath);
        copied.push(destPath);
      }
    }
  }

  return copied;
}

function printBanner() {
  console.log('');
  console.log('  Swiss Web Design — skill installer');
  console.log('  ===================================');
  console.log('');
}

function printHelp() {
  printBanner();
  console.log('  Usage: npx swiss-web-design [options]');
  console.log('');
  console.log('  Options:');
  console.log('    --opencode         Install for OpenCode (default)');
  console.log('    --antigravity      Install for Google Antigravity');
  console.log('    --claude           Install for Claude Code');
  console.log('    --cursor           Install for Cursor');
  console.log('    --global           Install globally (~/.config/opencode/)');
  console.log('    --path <dir>       Install to a custom directory');
  console.log('    --dry-run          Show what would be copied without copying');
  console.log('    --help             Show this help');
  console.log('');
  process.exit(0);
}

function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    return;
  }

  const target = args.includes('--antigravity') ? 'antigravity'
    : args.includes('--claude') ? 'claude'
    : args.includes('--cursor') ? 'cursor'
    : 'opencode';

  const isGlobal = args.includes('--global');
  const dryRun = args.includes('--dry-run');

  const customPathIdx = args.indexOf('--path');
  const customPath = customPathIdx !== -1 ? args[customPathIdx + 1] : null;

  printBanner();
  console.log(`  Target:   ${target}${isGlobal ? ' (global)' : ' (local)'}`);
  console.log(`  Dry run:  ${dryRun ? 'yes' : 'no'}`);
  console.log('');

  if (customPath) {
    const resolved = path.resolve(customPath);
    const skillDest = resolved;
    const agentDest = path.join(path.dirname(resolved), 'agents');

    console.log(`  Installing SKILL.md → ${skillDest}/`);
    const skillFiles = copyDir(SKILL_SRC, skillDest, dryRun);
    console.log(`  ${dryRun ? 'Would copy' : 'Copied'} ${skillFiles.filter(f => f.endsWith('.md')).length} file(s)`);

    if (fs.existsSync(AGENTS_SRC)) {
      console.log(`  Installing agents   → ${agentDest}/`);
      const agentFiles = copyDir(AGENTS_SRC, agentDest, dryRun);
      console.log(`  ${dryRun ? 'Would copy' : 'Copied'} ${agentFiles.filter(f => f.endsWith('.md')).length} agent(s)`);
    }

    console.log('');
    console.log(dryRun ? '  Dry run complete. No files written.' : '  Done.');
    return;
  }

  const cfg = TARGETS[target];
  const skillDest = isGlobal ? cfg.global : cfg.local;
  const agentDest = isGlobal && cfg.agentGlobal ? cfg.agentGlobal
    : !isGlobal && cfg.agentLocal ? cfg.agentLocal
    : path.join(path.dirname(skillDest), '..', 'agents');

  const agentBase = agentDest ? path.dirname(agentDest) : null;

  // Install skill
  console.log(`  Skill  → ${skillDest}/`);
  const skillFiles = copyDir(SKILL_SRC, skillDest, dryRun);
  console.log(`  ${dryRun ? 'Would copy' : 'Copied'} ${skillFiles.filter(f => f.endsWith('.md')).length} file(s)`);

  // Install agents (to adjacent agents/ dir)
  if (agentBase && fs.existsSync(AGENTS_SRC)) {
    const actualAgentDest = path.join(agentBase, 'agents');
    console.log(`  Agents → ${actualAgentDest}/`);
    const agentFiles = copyDir(AGENTS_SRC, actualAgentDest, dryRun);
    console.log(`  ${dryRun ? 'Would copy' : 'Copied'} ${agentFiles.filter(f => f.endsWith('.md')).length} agent(s)`);
  }

  // Install templates (always to project-local templates/ dir)
  const templateDest = path.join(process.cwd(), 'templates', 'swiss-web-design');
  if (!isGlobal && fs.existsSync(TEMPLATES_SRC)) {
    console.log(`  Templates → ${templateDest}/`);
    const templateFiles = copyDir(TEMPLATES_SRC, templateDest, dryRun);
    console.log(`  ${dryRun ? 'Would copy' : 'Copied'} ${templateFiles.length} template(s)`);
  }

  console.log('');
  console.log(dryRun ? '  Dry run complete. No files written.' : '  Done.');
  console.log('');
  console.log('  Next steps:');
  if (target === 'opencode') {
    console.log('    Set your default agent in opencode.json:');
    console.log('    { "default_agent": "design-director", "agent": { "design-director": "allow" } }');
  }
  console.log('    Restart your AI assistant to load the skill.');
  console.log('    To get started, ask: "Design a Swiss-style portfolio"');
  console.log('');
}

main();
