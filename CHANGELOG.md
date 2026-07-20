# Changelog

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
