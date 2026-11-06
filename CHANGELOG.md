# Changelog

## 1.4.0 (2026-11-06)

- Doctrine revision from the owner: sentence case everywhere (no tracked-out
  caps labels), machine-tells ban (no status dots, dotted labels, flavor text,
  badges), hairlines downgraded to a rare dividing device.
- Cut the type down and in: app scale tightened (24px items, 12.5px body,
  9.5px labels), display tracking to -0.05em, body to -0.02em; condensed
  paddings and gaps; data over prose.
- New §21 Creative Commission Protocol: grill-me briefing rounds (reference,
  facts, grid, boldness, spec sheet), the justified-dossier recipe, and an
  anti-design ledger — bold through contrast and compression, not decoration.
- §18 expanded to cover what the owner can push: gradient maps, heatmaps,
  displacement maps — with filter recipes; dot patterns kept for images only.
- Personal photography pulled from the repo. Templates now ship with empty
  photo slots and the two signage reference sheets; `treat-images.js` turned
  into a generic, recipe-driven pipeline; `references.yaml` regenerated.

## 1.3.0 (2026-11-06)

- Rebased the dark direction on **www.matesu.me** (Archive OS): the skill's
  tokens, system anatomy, interaction vocabulary, and atlas hero now come from
  that site's production CSS. Removed the Wayfinder tradition, the `Enreal`
  typeface reference, and all Wide tracking values (`0.042em`) that contradicted
  the reference (`tracking tight —0.04em / micro-labels 0.15em`).
- New Section 9 **Archive OS Pattern (matesu.me)**: layout anatomy (sidebar,
  topbar, atlas hero, archive stage, novidades sheet), spec boxes, the archive
  tree, the adjustments panel contract, and interaction vocabulary (inversion
  hover, cursors as affordances, push animation, sidebar collapse to a 48px
  tab).
- Reference hygiene: removed non-relevant references (personal Pinterest board,
  Pulumi/Apple/Medium/Stripe name-drops, HEX.inc/Wayfinder case studies) and
  added platform references (Neocities, Bandcamp, are.na, HTML Energy) plus
  `www.matesu.me` as the live reference. Documented a "Reference Hygiene"
  contract for maintainers.
- Replaced the `wayfinder-landing.html` template with **`archive-os.html`**
  (dark canvas, sidebar, search/filter/order, atlas SVG hero, spec boxes,
  settings panel with persisted theme/font/grain/hue). Updated the test suite.
- Agent corpus updated to the Archive OS doctrine: typographer (Helvetica-first,
  two-scale system with the app scale, tracking poles, tabular numerals),
  colorist (matesu.me dark palette with five text steps), grid-architect
  (panel maps), texture-artist (threshold print, atlas vignette), image-editor
  (threshold/dots treatments), design-critic (Archive OS checklist),
  design-director and cargo-builder (dark canvas recipe at `#141414`).
- Examples rebuilt with treated images: added `treat-images.js`
  (resize cap, threshold print, halftone build — originals untouched), reorganised
  `examples/img/` (photo refactors + signage sheets), refreshed
  `references.yaml`, and refactored `matesu-grid-system.html` to the token set.

## 1.2.0 (2026-07-20)

- Removed all personalized portfolio examples (`matesu-portfolio.html` and `portfolio-yellow-black.html`) from templates and examples.
- Updated the test suite to align with deleted templates.
- Expanded `SKILL.md` in the Wayfinder section to include guidelines for geometric ASCII/Unicode symbols (arrows, stars, Metro-like symbols) and Modernist Multi-Layering techniques.

## 1.1.1 (2026-07-20)

- Added a new yellow and black modernist portfolio template (`portfolio-yellow-black.html`) and example (`matesu-yellow-black.html`) implementing strict Swiss principles, big display typography, and duotone image multiply mix-blend-mode.

## 1.1.0 (2026-07-20)

- Enforced strict Helvetica/Helvetica Neue typography by removing 'Inter' fallback across all templates and SKILL.md
- Restored missing Section 8 (Cargo.site Patterns) heading in SKILL.md
- Added strict CSS overrides for Cargo.site in SKILL.md and cargo-builder agent, enforcing no generic hover effects and disabled image zoom
## 1.0.0 (2026-07-20)

- Initial release as npm package `swiss-web-design`
- 19-section skill definition covering Swiss Style, Wayfinder, brutalist, editorial, and Cargo.site design
- 8 specialist agents (design-director, grid-architect, typographer, colorist, texture-artist, image-editor, design-critic, cargo-builder)
- 5 HTML templates (portfolio-swiss, portfolio-brutalist, editorial-article, wayfinder-landing, archive-grid)
- Image analysis script with palette extraction and composition analysis
- Multi-agent installer (opencode, antigravity, claude-code, cursor)
- Full test suite
