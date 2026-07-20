# Swiss Web Design

An opencode skill system for building websites in the Swiss Style /
International Typographic tradition — cargo.site portfolios, Wayfinder-style
brand sites, brutalist web, editorial layouts, and European modernist web
design. Framed for **graphic designers directing web output**, not frontend
developers.

## Repository Structure

```
I:\swiss-web-design\
├── .opencode/
│   ├── skills/swiss-web-design/SKILL.md   ← 19-section master skill definition
│   └── agents/
│       ├── design-director.md      ← Primary agent (orchestrator)
│       ├── grid-architect.md       ← Grid & layout specialist
│       ├── typographer.md          ← Type & hierarchy specialist
│       ├── colorist.md             ← Palette generation specialist
│       ├── texture-artist.md       ← Halftone, grain, noise specialist
│       ├── image-editor.md         ← Photography treatment specialist
│       ├── cargo-builder.md        ← Cargo.site-specific builder
│       └── design-critic.md        ← Review & QA (read-only)
├── examples/
│   ├── b1.jpg                      ← Reference image
│   ├── b2.jpg                      ← Reference image
│   └── analyze-images.js           ← Metadata extraction script (requires sharp)
├── templates/
│   ├── portfolio-swiss.html        ← 12-column Swiss grid portfolio
│   ├── portfolio-brutalist.html    ← Raw system-font brutalist portfolio
│   ├── editorial-article.html      ← Magazine spread layout
│   ├── wayfinder-landing.html      ← Dark canvas title-card landing
│   └── archive-grid.html           ← Masonry archive / gallery
└── README.md
```

## Skill Domains (19 sections)

The master skill at `.opencode/skills/swiss-web-design/SKILL.md` covers:

| § | Domain | Description |
|---|--------|-------------|
| 1 | Philosophy | 6 core principles |
| 2 | Grid Systems | 12-column modular grid, asymmetric spans |
| 3 | Typography as Interface | Typeface selection, scale, hierarchy |
| 4 | Whitespace as Material | Spacing philosophy, 20% rule |
| 5 | Colour | Minimal palette, single accent |
| 6 | Photography over Illustration | Image treatment principles |
| 7 | Asymmetric Composition | 5 compositional patterns |
| 8 | Cargo.site Patterns | Template mapping, CSS overrides |
| 9 | Wayfinder Design Patterns | Dark canvas, thin type, centred |
| 10 | CSS Framework / Design Tokens | Complete custom property set |
| 11 | Spacing Scale | 8px-based from 0 to 128px |
| 12 | Responsive Behaviour | Breakpoints, collapse strategy |
| 13 | Key Historical References | Foundational texts & designers |
| 14 | Contemporary Reference Sites | Live examples + Pinterest board |
| 15 | Design Review Checklist | 30+ point evaluation |
| 16 | Poster-to-Web Translation | Print to screen adaptation |
| 17 | Brutalist Web Design | Raw, intentional anti-aesthetic |
| 18 | Texture & Material | Halftone, grain, noise, gradients |
| 19 | Editorial / Magazine Layout | Multi-column, pulls, spreads |

## Agents

Set `design-director` as your default agent for design work. It orchestrates
the sub-agents automatically.

| Agent | Mode | Role |
|-------|------|------|
| **design-director** | primary | Orchestrator — takes brief, delegates, composes |
| **grid-architect** | subagent | Grid math, layout structure, responsive collapse |
| **typographer** | subagent | Typeface, scale, leading, tracking |
| **colorist** | subagent | Palette, accent, contrast |
| **texture-artist** | subagent | Halftone, grain, noise, gradients |
| **image-editor** | subagent | Crop, filter, duotone, placement |
| **cargo-builder** | subagent | Cargo 3 setup recipes + CSS injection |
| **design-critic** | subagent | Review against checklists (read-only) |

## Templates

Each template is a standalone HTML file — open in any browser or drop into
your CMS. Use `placehold.co` placeholder images as scaffolding.

| Template | Style | Best for |
|----------|-------|----------|
| `portfolio-swiss.html` | Swiss grid, off-white, red accent | Design portfolio |
| `portfolio-brutalist.html` | System fonts, raw, high contrast | Loud/urgent portfolio |
| `editorial-article.html` | Multi-column, hero spread | Magazine, long-form |
| `wayfinder-landing.html` | Black canvas, centred title-card | Studio landing page |
| `archive-grid.html` | Dense 6-column gallery | Photography, archive |

## How to Install

### Skill + Agents (global)

```powershell
# Copy skill
XCOPY /E /I ".opencode\skills\swiss-web-design" "$env:USERPROFILE\.config\opencode\skills\swiss-web-design\"

# Copy agents
XCOPY /E /I ".opencode\agents" "$env:USERPROFILE\.config\opencode\agents\"
```

Set your default agent in `opencode.json`:
```json
{
  "default_agent": "design-director"
}
```

Then restart opencode.

### Image Analysis Script

```bash
cd examples
npm install sharp js-yaml
node analyze-images.js    # writes references.yaml
```

## References

- Josef Müller-Brockmann — *Grid Systems in Graphic Design*
- Emil Ruder — *Typographie*
- Armin Hofmann — *Graphic Design Manual*
- Jan Tschichold — *Die neue Typographie*
- cargo.site — platform for designer portfolios
- wayfinder.com — Wayfinder Ventures by HEX.inc
- hex.inc/work/wayfinder — Case study
- swissincss.com — Swiss posters in CSS
- swissthemes.design — Swiss design templates
- br.pinterest.com/mytezy/imagery/ — Personal design reference board

## Licence

MIT
