# Contributing

## Package structure

```
swiss-web-design/
  .opencode/skills/swiss-web-design/SKILL.md   — master skill definition
  .opencode/agents/*.md                        — agent definitions
  templates/*.html                              — HTML templates
  examples/analyze-images.js                    — image analysis tool
  bin/install.js                                — multi-agent installer
  test/                                         — test suite
```

## Adding a skill section

Append to `.opencode/skills/swiss-web-design/SKILL.md` with a new numbered section. Keep the format consistent: table of contents entry, section header, explanatory text, code examples where applicable.

## Adding an agent

Create a new `.md` file in `.opencode/agents/` with YAML frontmatter:

```yaml
---
description: One-line summary of what this agent does.
mode: subagent
permission:
  edit: allow|deny
  bash: allow|deny
---
```

## Templates

Templates must be standalone HTML files that open in any browser. Use design tokens from the skill's CSS custom properties. No build step. No external dependencies.

## Tests

Run the test suite:

```bash
node test/test-skill-structure.js
node test/test-installer.js
node test/test-templates.js
```

Image analysis tests require sharp:

```bash
cd examples && npm install
node ../test/test-analyze-images.js
```

## Publishing

```bash
npm version patch|minor|major
npm publish
git push --tags
```
