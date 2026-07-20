# Swiss Web Design

[![npm version](https://img.shields.io/npm/v/swiss-web-design.svg)](https://www.npmjs.com/package/swiss-web-design)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](package.json)

A design skill system for AI coding agents that teaches them to build websites
the way a graphic designer would — composing with type, grid, and space rather
than components, state, and breakpoints. Works with **OpenCode**, **Google
Antigravity**, **Claude Code**, and **Cursor**.

> Framed for **graphic designers directing web output**, not frontend
> developers.

## Quick start

```bash
npx swiss-web-design --opencode
```

Or for another agent:

```bash
npx swiss-web-design --antigravity   # Google Antigravity
npx swiss-web-design --claude        # Claude Code
npx swiss-web-design --cursor        # Cursor
npx swiss-web-design --global        # Install globally (all projects)
npx swiss-web-design --dry-run       # Preview without copying
```

Then restart your AI assistant and ask:

> *"Design a Swiss-style portfolio with a red accent and asymmetric grid."*

---

## What this skill covers

The master skill at `.opencode/skills/swiss-web-design/SKILL.md` contains
**20 sections** spanning three overlapping traditions:

| | Tradition | Description |
|---|-----------|-------------|
| **Swiss Style** | International Typographic Style (1950s) | Grids, sans-serif type, asymmetric balance — Müller-Brockmann, Ruder, Hofmann |
| **Cargo.site** | Contemporary portfolio platform | Constraint model, pinned pages, image-centric grids, CSS overrides |
| **Wayfinder** | 2020s evolution | Dark canvas, ultra-thin type, asynchronous gradients, path-based typography |

### 20 skill domains

| § | Domain | What the agent learns |
|---|--------|----------------------|
| 1 | Philosophy | 6 principles: form follows function, clarity, reduction, objectivity, mathematics, type as interface |
| 2 | Grid Systems | 12-column modular grid, asymmetric spans, 8px baseline |
| 3 | Typography as Interface | Typeface selection, modular scale (perfect fourth), hierarchy |
| 4 | Whitespace as Material | Section gaps, breathing room, 20% emptiness rule |
| 5 | Colour | Minimal palette, single accent, WCAG contrast |
| 6 | Photography over Illustration | Image treatment, cropping, duotone |
| 7 | Asymmetric Composition | 5 compositional patterns, tension, balance |
| 8 | Cargo.site Patterns | Template mapping, CSS injection, pinned/overlaid pages |
| 9 | Wayfinder Design Patterns | Dark canvas, weight-300 type, path illustration |
| 10 | CSS Framework / Design Tokens | Custom properties for every decision — no arbitrary values |
| 11 | Spacing Scale | 8px-based | 0 to 128px |
| 12 | Responsive Behaviour | Breakpoints (1024/768), column collapse strategy |
| 13 | Key Historical References | Foundational texts, designers, manifestos |
| 14 | Contemporary Reference Sites | Live examples, Pinterest board |
| 15 | Design Review Checklist | 30+ point evaluation across grid, type, colour, content |
| 16 | Poster-to-Web Translation | Print-to-screen adaptation patterns |
| 17 | Brutalist Web Design | Raw, intentional anti-aesthetic — system fonts, high contrast |
| 18 | Texture & Material | Halftone, grain, noise, gradients, ink bleed via CSS/SVG |
| 19 | Editorial / Magazine Layout | Multi-column, pull quotes, drop caps, spreads |
| 20 | Image Analysis & Design Extraction | Read images, extract palettes, tailor design to photographic content |

---

## Agents

Set **design-director** as your default agent for design work. It orchestrates
specialist sub-agents automatically.

| Agent | Mode | Role |
|-------|------|------|
| **design-director** | primary | Orchestrator — takes brief, delegates, composes final output |
| **grid-architect** | subagent | Grid math, layout structure, responsive collapse |
| **typographer** | subagent | Typeface, modular scale, leading, tracking, measure |
| **colorist** | subagent | Palette generation, accent strategy, WCAG contrast |
| **texture-artist** | subagent | Halftone, grain, noise, gradients, material effects |
| **image-editor** | subagent | Photography treatment, cropping, duotone, palette extraction |
| **cargo-builder** | subagent | Cargo 3 setup recipes + CSS injection |
| **design-critic** | subagent | Review against comprehensive checklists (read-only) |

---

## Templates

Five standalone HTML templates — open in any browser or drop into your CMS.

| Template | Style | Best for |
|----------|-------|----------|
| `portfolio-swiss.html` | Swiss grid, off-white, red accent | Design portfolio |
| `portfolio-brutalist.html` | System fonts, raw, high contrast | Loud/urgent portfolio |
| `editorial-article.html` | Multi-column, hero spread | Magazine, long-form |
| `wayfinder-landing.html` | Black canvas, centred title-card | Studio landing page |
| `archive-grid.html` | Dense 6-column gallery | Photography, archive |

---

## Image analysis

The `examples/` directory includes an analysis tool that extracts metadata from
your reference images (dimensions, dominant colour, entropy, palette) and
outputs structured data your AI agent can use to tailor designs.

```bash
cd examples
npm install
node analyze-images.js                    # writes references.yaml
node analyze-images.js --format json      # JSON output
node analyze-images.js --output palette   # show extracted colour palette
```

The generated `references.yaml` feeds directly into the **image-editor** agent
so it can recommend treatments (duotone, crop, contrast) that match your
photographic content.

---

## Manual install

If you prefer to install manually without npm:

### OpenCode

```powershell
# Skill
XCOPY /E /I ".opencode\skills\swiss-web-design" "$env:USERPROFILE\.config\opencode\skills\swiss-web-design\"

# Agents
XCOPY /E /I ".opencode\agents" "$env:USERPROFILE\.config\opencode\agents\"
```

Set your default agent in `opencode.json`:

```json
{
  "default_agent": "design-director"
}
```

### Antigravity

```powershell
XCOPY /E /I ".opencode\skills\swiss-web-design" "$env:USERPROFILE\.gemini\antigravity\skills\swiss-web-design\"
```

### Claude Code

```bash
cp -r .opencode/skills/swiss-web-design .claude/skills/swiss-web-design
```

---

## Repository structure

```
swiss-web-design/
  .opencode/
    skills/swiss-web-design/SKILL.md   — 20-section master skill definition
    agents/                            — 8 agent definitions
      design-director.md               —   Orchestrator (primary)
      grid-architect.md                —   Grid & layout
      typographer.md                   —   Type & hierarchy
      colorist.md                      —   Palette & accent
      texture-artist.md                —   Halftone, grain, noise
      image-editor.md                  —   Photography, extraction
      design-critic.md                 —   Review & QA
      cargo-builder.md                 —   Cargo.site builder
  templates/                           — 5 HTML templates
  examples/                            — Reference images + analysis tool
  bin/install.js                       — Multi-agent installer
  test/                                — Test suite
  package.json                         — npm package
  README.md                            — This file
```

## References

- Josef Müller-Brockmann — *Grid Systems in Graphic Design*
- Emil Ruder — *Typographie*
- Armin Hofmann — *Graphic Design Manual*
- Jan Tschichold — *Die neue Typographie*
- [cargo.site](https://cargo.site) — platform for designer portfolios
- [wayfinder.com](https://wayfinder.com) — Wayfinder Ventures by HEX.inc
- [swissincss.com](https://swissincss.com) — Swiss posters in CSS
- [swissthemes.design](https://swissthemes.design) — Swiss design templates

## Licence

MIT
