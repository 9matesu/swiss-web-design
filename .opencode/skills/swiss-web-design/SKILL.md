---
name: swiss-web-design
description: >
  Use when building or reviewing websites in the Swiss Style / International
  Typographic tradition — dark archive/OS interfaces, cargo.site portfolios,
  and European modernist web design. Emphasises grid systems, typographic
  hierarchy, asymmetric composition, hairline rules, and whitespace as an
  active material. The live reference for the dark "Archive OS" direction is
  www.matesu.me. Framed for graphic designers directing web output, not
  frontend developers. Trigger words: Swiss, archive, OS interface, cargo.site,
  modernist, grid system, Helvetica, International Typographic Style, dark
  canvas, graphic designer portfolio.
---

# Swiss Web Design

A design skill for building websites the way a graphic designer would —
composing with type, grid, and space rather than components, state, and
breakpoints. This skill covers two overlapping traditions:

- **Swiss Style / International Typographic Style** — the 1950s movement
  (Müller-Brockmann, Ruder, Hofmann, Bill) that made grids, sans-serif
  typography, and asymmetric balance the lingua franca of modern design.
- **Cargo.site** — the contemporary portfolio platform for designers and
  artists who refuse template-looking templates. Cargo's constraint model
  (pinned pages, overlaid layers, image-centric grids) rewards a Swiss
  approach.
- **Archive OS** — a 2020s direction that turns the portfolio into an
  *instrument*: a dark, appliance-like interface where content is navigated
  like an archive or file system. The live reference is
  [www.matesu.me](https://www.matesu.me) — fixed bio sidebar, search-and-filter
  topbar, typographic navigation columns, a topographic atlas as hero,
  hairline spec boxes, and photographic threshold/halftone treatments. All
  tokens in this skill were extracted from that site's production CSS.

---

## Table of Contents

1. Philosophy
2. Grid Systems
3. Typography as Interface
4. Whitespace as Material
5. Colour
6. Photography over Illustration
7. Asymmetric Composition
8. Cargo.site Patterns
9. Archive OS Pattern (matesu.me)
10. CSS Framework / Design Tokens
11. Spacing Scale
12. Responsive Behaviour
13. Key Historical References
14. Contemporary Reference Sites
15. Design Review Checklist
16. Poster-to-Web Translation
17. Brutalist Web Design
18. Texture & Material
19. Editorial / Magazine Layout
20. Image Analysis & Design Extraction
21. Creative Commission Protocol

---

## 1. Philosophy

Swiss Style is not a look — it is a method. Six principles govern every
decision:

| Principle | Meaning |
|-----------|---------|
| **Form follows function** | Every element earns its place by doing work. If it does not communicate, remove it. |
| **Clarity before expression** | The viewer must understand before they admire. Design succeeds when it stops needing interpretation. |
| **Reduction** | Perfection is achieved not when there is nothing left to add, but when there is nothing left to take away. |
| **Objectivity** | Personal taste is subordinate to the message. Neutrality makes the design a vehicle, not a destination. |
| **Mathematics** | Proportion, scale, and alignment follow rational systems — grids, ratios, modular scales — not intuition. |
| **Typography is the interface** | Type does the work that chrome, shadows, and illustrations do elsewhere. The page is a typographic composition. |

For the Archive OS direction, add three more:

| Principle | Meaning |
|-----------|---------|
| **The site is an instrument** | The portfolio behaves like an appliance: searchable, filterable, adjustable. The visitor *operates* the site, they do not just scroll it. |
| **Honesty of the apparatus** | Show the interface's bones — hairline rules, dotted separators, data tables, filing codes. Do not polish the apparatus into invisibility. |
| **Sovereign defaults, personal adjustments** | Ship strong default design decisions, then give the visitor honest controls: theme, font, grain, hue. Defaults carry; controls never decorate. |

When making decisions, ask: *Does this help someone understand something
faster?* If the answer is no, remove it.

---

## 2. Grid Systems

The grid is the backbone. Müller-Brockmann called it *"a system of order that
makes the message more easily understood."* It is not a cage — it is an
instrument. By settling the boring decisions in advance, it frees you to spend
judgment on what matters.

### Modular Grid — 12 Columns

```css
.swiss-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gap, 20px);
  max-width: var(--max-width, 1200px);
  margin: 0 auto;
  padding: 0 var(--spacing-6, 32px);
}
```

- **12 columns** gives maximum flexibility: 1/12, 2/12, 3/12 … 12/12.
- **Gap** is fixed at 20px (or 1.25rem). Gutter is the same across the whole
  system — never use margin on individual items.
- **Max-width** 1200px or 960px for tighter typographic measure.
- **Baseline grid** 8px increments. Every margin, padding, and height is a
  multiple of 8 (or 4 for fine adjustments).

### Asymmetric Column Spans

Swiss layouts rarely use equal columns. A typical hero:

```
|          |              |     |
|  logo    |  headline    | nav |
|  2 cols  |  6 cols      | 4   |
```

Content sections vary:

```
|  headline — 8 cols   | empty — 4 cols |
| body text — 5 cols   | image — 7 cols |
| image — 12 cols (full-bleed)          |
```

Grid column assignment should vary per section. Never repeat the same grid
template for every row — that is not a Swiss grid, it is a spreadsheet.

### OS Chrome — Panel Math, Not Column Math

Archive OS layouts do not live on a 12-column canvas. They live in a fixed
appliance frame measured in *panels*:

```
| sidebar 250px | main: header 52px + atlas hero (vh) + stage + sheet (vh) |
```

- Heights are tokenised (`--header-h`, `--sheet-h`, `--hero-h`), widths are
  fixed (`--sidebar-w: 250px`, collapse to `48px`).
- Separation inside panels comes from **hairline rules** (`1px`, ~5% alpha)
  and **gaps**, not from cards or shadows.
- Where a 12-column grid does appear (spec sheets, data, novidades), it is
  built from tokenised `fr` splits (`1.35fr 1fr`), not an equal-3 template.

### Cargo-Specific Grid Notes

Cargo 3 uses a freeform coordinate system rather than a strict CSS grid, but
the same principles apply:

- Set **Page Width** to a percentage (80–92%) rather than a pixel value.
- Use **Pinned** pages for persistent navigation overlays.
- Use **Stacked** pages for scroll-based content sections.
- Custom CSS overrides should only adjust the Cargo grid when the template
  forces symmetry you do not want. Inject overrides in the custom CSS panel:

```css
.page {
  max-width: 1200px;
  margin: 0 auto;
}
```

---

## 3. Typography as Interface

Swiss designers did not decorate with type — they built with it. Emil Ruder
argued that legibility and visual rhythm are inseparable. On most pages, type
*is* the interface. Strip away the images and the gradients and what is left is
text doing the work.

### Typeface Selection

| Use | Primary | Fallback Stack |
|-----|---------|----------------|
| Everything (default) | Helvetica Neue | `'Helvetica Neue', Helvetica, Arial, sans-serif` |
| Wide-availability | Inter | `'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif` |
| Classic Swiss era | Akzidenz-Grotesk | `'Akzidenz-Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif` |
| Mono (code / data) | JetBrains Mono | `'JetBrains Mono', 'SF Mono', 'Fira Code', monospace` |

Rules (from the matesu.me reference):

- **One family. Two weights per surface. Three sizes per zone.** Never more
  than one typeface family (except mono for data).
- **Helvetica is the sovereign choice.** Everything on the Archive OS
  reference — the production site's 26px items, 8.5px spec labels, the atlas
  map text (default ships one step tighter: 24px) — is
  Helvetica Neue / Helvetica / Arial.
- **No serifs.** Ever. Garamond, Caslon, Times — all forbidden.
- **No decorative fonts.** The typeface must be neutral, well-drawn, and
  invisible. The message, not the font, is what should be noticed.
- **No modern sans impostors** ('Inter' is acceptable as a fallback only when
  Helvetica Neue cannot be loaded).

### Two Scales: Editorial + App

The **editorial scale** follows a consistent ratio. Perfect fourth (1.25) or
augmented fourth (1.333):

```css
:root {
  /* Perfect fourth scale (1.25) */
  --font-size-xs:   0.75rem;   /* 12px */
  --font-size-sm:   0.875rem;  /* 14px */
  --font-size-base: 1rem;      /* 16px */
  --font-size-md:   1.25rem;   /* 20px */
  --font-size-lg:   1.563rem;  /* 25px */
  --font-size-xl:   1.953rem;  /* 31px */
  --font-size-2xl:  2.441rem;  /* 39px */
  --font-size-3xl:  3.052rem;  /* 49px */
  --font-size-4xl:  3.815rem;  /* 61px */
  --font-size-5xl:  4.768rem;  /* 76px */
}
```

The **app scale** (Archive OS) is built from *actual interface sizes*, in px:

```css
:root {
  --text-item:      24px;  /* archive items / detail titles */
  --text-body:      12.5px;/* detail body, rows, news lead */
  --text-ui:        11px;  /* controls, dropdowns, links */
  --text-meta:      10.5px;/* meta lines, captions, sidebar footer */
  --text-label:     9.5px; /* control labels — sentence case */
  --text-section:   9px;   /* section heads */
  --text-spec:      8.5px; /* spec keys, ISRC, explicit tag */
}
```

Tracking has one working pole: tight, and tight means *tight*. App-scale
items and titles use `-0.05em`; body and meta use `-0.02em`. Labels
(`9.5px` controls, `9px` section heads, `8.5px` spec keys) get **sentence
case and zero letter-spacing** — no uppercase transforms, no wide tracking.
A draft that shouts in tracked-out ALL-CAPS reads as a machine-mannerism,
not as Swiss discipline.

### Weight Distribution

| Token | Value | Used For |
|-------|-------|----------|
| `--font-weight-light` | 300 | Display headlines in editorial Swiss layouts |
| `--font-weight-regular` | 400 | Archive items, body text |
| `--font-weight-medium` | 500 | Active archive items, bold micro-labels, bio keywords |
| `--font-weight-bold` | 700 | Headlines, brand name, emphasis |

Weight is a **structural tool**, not decoration. In the OS frame the bright
hierarchy goes: active `500` > idle `400` > dimmed defaults `400` at lower
alpha steps (never pure grey blocks — stepped alphas, see §10).

### Line Height

| Role | Line Height | Notes |
|------|-------------|-------|
| Items / display | 1.0 – 1.1 | Tight. 24px items run at 1.1. |
| Body text | 1.4 – 1.6 | Detail body 1.45; editorial body 1.6. |
| Captions / Meta | 1.2 – 1.45 | Spec labels 1.2; detail meta 1.25. |

### Alignment

- **Flush left, ragged right** is the default. Justified text creates uneven
  rivers of whitespace — but the Archive OS reference does justify narrow bio
  columns (`text-align: justify; hyphens: auto`). If you justify, follow that
  recipe exactly: narrow column (≤ 320px), `hyphens: auto`,
  `text-justify: inter-word`. Never justify > 66ch measures.
- Centred text is reserved for atlas legenda moments. Never right-align body
  text.

### Measure (Line Length)

- Body text: **45–75 characters per line** (ideal: ~66).
- Constrain width on text-heavy sections:

  ```css
  max-width: 66ch;
  ```

- Detail bodies (OS frame): 46ch soft limit, `line-clamp` where needed.

### OpenType & Numerals

```css
body {
  font-feature-settings: "liga" 1, "calt" 1;
}
```

Data is set in **tabular figures** — durations, counts, dates, ISRC codes:

```css
.track-num, .track-dur, .result-path {
  font-variant-numeric: tabular-nums;
}
```

Data columns that jitter as you read are broken typography.

---

## 4. Whitespace as Material

Swiss designers treated empty space as a material to be shaped, not a void to
be filled. Müller-Brockmann composed his Tonhalle posters around the space as
deliberately as around the type.

### Spacing Philosophy

1. **Start with the space.** Begin the layout with generous whitespace and let
   content earn its way in.
2. **Double the gap.** Whatever padding or margin you think is right, double it
   before you halve it.
3. **The 20% rule.** Remove one-fifth of non-essential elements. What remains
   will breathe better.
4. **Don't fill the margins.** Resist the reflex to add a banner, a button, or
   a third image just because there is room.
5. **On dark, emptiness is the canvas.** In the Archive OS frame the void
   (`#141414`) is the material; rules only ever *divide* it, sparingly. A page
   of nothing but 24px neutral type floating in the dark is a composed page —
   not an empty one.

### Section Gaps

```css
:root {
  --section-gap: clamp(4rem, 8vw, 8rem);
}
```

In OS layouts, rhythm comes from three tokenised breathing rates instead of
one section gap:

- **Row gap:** 7–9px (track rows, link rows)
- **Group gap:** 12–20px (stage padding, sidebar gap, spec boxes)
- **Zone gap:** 24–28px (atlas padding, sheet padding, panel insets)

A headline given a full column of air reads as confident. The same headline
boxed in by three buttons and a banner reads as anxious. Nothing about the
headline changed — only what surrounds it.

---

## 5. Colour

Swiss colour is minimalist. The palette does the work of hierarchy and does
not compete with content.

### Core Palette (Light)

```css
:root {
  /* Greys */
  --color-black:       #1A1A1A;
  --color-dark:        #2D2D2D;
  --color-mid-grey:    #6A6A6A;
  --color-cool-grey:   #A9B2B1;
  --color-light-grey:  #E5E5E5;
  --color-off-white:   #F4F3EE;
  --color-white:       #FFFFFF;

  /* Accent — choose ONE */
  --color-accent:      #D82C2C;   /* signal red (classic Swiss) */

  /* Functional */
  --color-text-primary:   var(--color-black);
  --color-text-secondary: var(--color-mid-grey);
  --color-text-on-dark:   var(--color-white);
  --color-bg-primary:     var(--color-white);
  --color-bg-secondary:   var(--color-off-white);
  --color-bg-dark:        var(--color-black);
  --color-border:         var(--color-black);
}
```

### Rules

- **One accent colour maximum.** Signal red is the canonical Swiss accent.
  Occasionally blue (#2B5FD7) or yellow (#E8B82C) for specific brands.
- **Monochromatic + one accent.** Every other colour should be a grey.
- **No gradients except inside illustration canvases.** Standard Swiss is flat
  colour. The Archive OS reference allows gradients *only* inside the atlas
  (vignette over the drawn paper), never on UI surfaces.
- **No drop shadows, no glow, no card layers.** Swiss design is flat. Depth
  comes from hierarchy, not from shadows. (Sole exception: one soft shadow on
  floating *chrome* — a settings panel — never on content.)
- **Theme is a token pair.** Every theme (dark `#141414`, light `#f5f5f7`
  base) must define a complete matching set: canvas, text steps, borders,
  fields. A theme with undefined members is a bug, and the visitor's choice
  persists (`localStorage`).

### Archive OS Palette (matesu.me, dark / default)

```css
:root {
  --bg-main:        #141414;  /* canvas — warm dark, never pure black */
  --text-bright:    #f5f5f7;  /* brightest level — names, active items */
  --text-active:    #d1d1d6;
  --text-body:      #a1a1a6;
  --text-muted:     #8e8e93;
  --text-dim:       #636366;
  --text-faint:     #48484a;
  --border-subtle:  rgba(255, 255, 255, 0.05);  /* hairline: panels, rows */
  --border-link:    rgba(255, 255, 255, 0.15);  /* hairline: interactive */
  --field-bg:       rgba(255, 255, 255, 0.07);  /* search field, photo slot */
  --map-shade:      #080808;  /* atlas vignette */

  /* Light theme pair (same tokens, swapped) */
  /* --bg-main: #f5f5f7 family; text steps invert via rgba(0,0,0,α) */
}
```

Five text steps on one canvas. If your dark UI has fewer than four text
levels, it is not legible; more than six, it is noise.

---

## 6. Photography over Illustration

Swiss Style favours photography because it is *objective* — it represents
reality without the designer's hand interposing.

### Guidelines

- **Use photography as the primary visual content.** Not illustration, not
  3D renders, not decorative iconography.
- **Full-bleed images** are the default in editorial layouts. Let images reach
  the edge of the grid or the viewport. In OS layouts, images live in *slots*
  with hairline borders (`--field-bg` fits behind the slot). No reference
  photo yet? Ship the empty slot — never a fake, borrowed, or mismatched
  photo.
- **Scale by width, not height.** Images fill their container horizontally and
  crop vertically (`object-fit: cover`).
- **No drop shadows on images. No rounded corners. No decorative frames.**
- **Treat, don't decorate.** The reference site normalises every photo into
  two canonical states (§9): a grayscale **threshold** print (grayscale +
  extreme contrast) and a **halftone dots** print. Colour photos are the
  exception, not the default.
- **Images are documents.** They answer crosshair/grab cursors, not pointer
  cursor toys. Interactions are precise: edge outline on hover, scroll-to-pan
  on the photo, invert on hover.

---

## 7. Asymmetric Composition

Swiss asymmetry is not chaos — it is dynamic balance. The eye moves from a
strong element to a quieter one, guided by the grid.

### Compositional Patterns

```
Pattern A: Off-centre hero
   [  empty (3)  |  headline (7)  |  nav (2)  ]

Pattern B: Split content
   [  body text (5)  |  image (7)  ]

Pattern C: Full-bleed interruption
   [  image (12) — full viewport width  ]

Pattern D: Atlas card
   [  empty (4)  |  centred title (4)  |  empty (4)  ]
   Content vertically and horizontally centred in the viewport.

Pattern E: Three-column data
   [  stat (4)  |  stat (4)  |  stat (4)  ]

Pattern F: OS frame
   [  bio sidebar (fixed)  |  archive stage (horizontal tree)  ]
   Sidebar carries identity; the stage carries the archive.
```

### Rules

- **No equal columns for content sections.** If every section is three equal
  columns, the design is not Swiss — it is a generic template.
- **One section can be asymmetric; the next can be full-bleed; the next can be
  a single centred column.** The grid unifies them.
- **Break the grid deliberately.** A full-bleed image, an oversized number, a
  red bar across all 12 columns — these read as intentional because the grid
  provides the baseline.

---

## 8. Cargo.site Patterns

Cargo is a site builder for designers and artists. Its templates reward a Swiss
approach because the platform itself is image-and-type-centric.

### Template Selection

- **Basic Grid** — good starting point for Swiss layouts. Gives you a
  column-based image grid you can customise.
- **Basic Feed** — single-column vertical scroll. Strong for typographic
  portfolios.
- **Blank** — full control. Start from a CSS grid you define.

### Key Cargo Features for Swiss Design

| Feature | Swiss Application |
|---------|-------------------|
| **Page Width** | Set 80–92%. Gives generous margins. |
| **Content Background** | Set to white or off-white (or the Archive OS `#141414` for a dark archive). |
| **Page Border** | Thin black border (1–2px). Acts like a typographic rule framing the composition. |
| **Site Border** | Optional outer border. Creates a printed-page feeling. |
| **Pinned pages** | Use for persistent navigation sidebar or nameplate. |
| **Overlaid pages** | Creates depth — a background image page with a semi-transparent content page on top. |
| **Colour Filter** | Monochrome filter on images to unify the palette. |
| **Active Link style** | Bold weight or underline for current page in navigation. |

### Custom CSS Overrides for Cargo

```css
/* Typography refinements */
body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #1A1A1A;
}

/* Remove forced image borders */
img {
  border-radius: 0 !important;
  box-shadow: none !important;
}

/* Strict Swiss Image Behaviours */
.cargo-image-zoom {
  pointer-events: none !important; /* Disable image zoom */
}
.cargo-image:hover, .thumbnails a:hover {
  filter: saturate(0.2) contrast(1.1) !important; /* Only colour changes for hover, no generic effects */
  transform: none !important;
}

/* Navigation — sentence case, no tracked-out caps */
nav, .nav, [role="navigation"] {
  font-size: 14px;
  letter-spacing: -0.01em;
}

/* Wider gutters */
.page {
  padding: 40px 32px;
}
```

### Cargo 2 vs Cargo 3

| | Cargo 2 | Cargo 3 |
|--|---------|---------|
| Layout | Column-bound, code-heavy | Freeform coordinates, visual canvas |
| Mobile | Global scaling (can break desktop) | Isolated mobile config |
| Best for | Complex custom grid overrides | Quick asymmetric layouts |
| Swiss fit | Good if you need strict grid control | Better for freeform Swiss asymmetry |

---

## 9. Archive OS Pattern (matesu.me)

The Archive OS is the dark, appliance-like evolution of Swiss discipline used
on [www.matesu.me](https://www.matesu.me). The site is a **personal file
system**: identity in a fixed sidebar, the archive navigated like a tree of
folders and items, detail views filed like data cards, and every control the
visitor may touch tokenised and adjustable. It reads as an instrument, not a
brochure.

### Layout Anatomy

```
┌─────────────┬──────────────────────────────────────────────┐
│             │ #topbar                        52px          │
│             │  search · results · filter · order · gear    │
│  #sidebar   ├──────────────────────────────────────────────┤
│  250px      │ #hero — topographic atlas sheet   38–44vh    │
│  bio photo  │  contours, hachures, routes, marks           │
│  (normal +  ├──────────────────────────────────────────────┤
│   dots)     │ grabber (20px, drag to resize the atlas)     │
│  "matesu"   ├──────────────────────────────────────────────┤
│  bio text   │ #stage — horizontal archive columns          │
│  keyword    │  folder → folder → item → detail             │
│  bold words │  24px / -0.05em · counts superscripted       │
│  link list  ├──────────────────────────────────────────────┤
│  footer     │ #homepage — novidades sheet        26vh      │
│             │  lead + rows, resizable from the grabber     │
└─────────────┴──────────────────────────────────────────────┘
```

- **Everything is fixed inside `100vh`; the archive scrolls horizontally.**
  Vertical scrolling is reserved for two surfaces only: the novidades sheet
  and detail columns (`overflow-y: auto`).
- **Sidebar collapse = 48px tab**, not a hamburger. A vertical-rl label
  (`writing-mode: vertical-rl; transform: rotate(180deg)`) replaces the whole
  bio. Full collapse or full detail — never half-states.
- **Hairline separation.** Panel edges and rows are divided by
  `1px solid var(--border-subtle)` (5% white). Interactive tops get the
  15% line. No card backgrounds, no shadows.

### Type-on-Canvas

| Zone | Spec |
|------|------|
| Archive items | 24px / weight 400 / `-0.05em` / brightens on hover / active = 500 |
| Item count badges | 13px superscripted, faint |
| Detail title | 24px / 600 / `-0.05em` |
| Detail meta/body | 12.5–13px / muted / justified with `hyphens: auto` |
| Track rows | 12.5px titles, 10.5px numbers+durations, 9px ISRC |
| Section heads | 10px sentence case, zero tracking, weight 500 |
| Spec labels | 9px sentence case over 12px values |
| Dropdown labels | 10px sentence case |

### Interaction Vocabulary

Honest, machine-like, and restrained:

1. **Inversion instead of pills.** Hovering a link or row paints an opaque
   bright rectangle behind the text and flips the text colour to the canvas
   colour. `box-decoration-break: clone` keeps multi-line hits whole.
   Transition: `0.16s`.
2. **Colour change, never geometry games.** No scale-up hovers, no shadows on
   hover, no bounce. One exception exists in the reference: a small 5px
   horizontal "push" on click, defined as keyframes — copy it exactly or use
   nothing.
3. **Cursors are documentation.** `grab` for canvas, `crosshair` for photos,
   `grabbing` while dragging, `ns-resize` on the grabber, `pointer` on items.
   The cursor answers "am I allowed to press/take/move this?".
4. **Scrollbars disappear where scroll is horizontal**, and the interface
   offers scrollbar-free motion (wheel, drag, touch) instead.
5. **Anchors open target blanks** with `rel="noopener"`. Every external link
   is honest about leaving the instrument.

### Machine Tells (banned)

The frame reads as an instrument because the interactions are honest, not
because it wears gadgetry. Never ship:

- **Status/utility dots** — the green "available" dot of chat apps and its
  cousins (red recording dots, pulsing presence dots) pasted onto a portfolio.
- **Dotted labels** — dot-leaders, dotted underlines on non-link text, spotted
  micro-labels. Dots belong to images (halftone) and drawn paper, not to UI
  chrome.
- **Tracked-out ALL-CAPS labels** — use sentence case for every label, badge,
  kicker, and section head. Conventional capitalization, zero letter-spacing
  games.
- **Flavor text** — every sentence must carry a fact: a date, a name, a
  dimension, a credit. No "welcome", no manifesto fragments, no template
  self-description, no decorative jargon ("field notes", "musings", "on craft").
- **Badges and signature props** — "made with", "powered by", decor emoji,
  ornamental separators (`— ✦ —`), fake status meters.

### The Archive Tree (data as content)

Content ships as one JS tree object; the UI is a renderer over it:

```js
var tree = {
  "música": {
    "participações": {
      "blackmesa hz": {
        title: "BLACKMESA Hz",
        meta: "07/06/2026",
        body: "Identidade visual e cartaz do BLACKMESA Hz…",
        img: "img/bmhz0/frente.png"
      }
    }
  }
};
```

Rules:

- Keys are user-visible words. What you see at the top level must equal the
  filter list ("tudo", "design", "música"…).
- Details carry their own metadata: `title`, `meta`, `body`, `img`/`images[]`,
  optional `link`. The renderer never invents content.
- Item counts are computed from the tree, not hardcoded.
- Galleries are arrays rendered into a single-column figure list with captions
  — never a carousel.

### The Atlas Hero (topographic SVG sheet)

The hero is not photography — it is a **drawn document**: a topographic paper
sheet as an atlas of the archive, drawn in native SVG with JS:

```css
/* Tokens (light-on-dark, or the paper pair in light theme) */
--map-paper: #141414;      --map-ink: #f5f5f7;
--map-ink-2: rgba(245,245,247,0.72);
--map-ink-3: rgba(245,245,247,0.52);
--map-ink-4: rgba(245,245,247,0.34);
--map-grid: rgba(245,245,247,0.22);
--map-shade: #080808;
```

Drawing vocabulary:

- **Graticule pattern** — 100px squares as a `<pattern>` fill at 0.6 stroke.
- **Contours** — `map-contour` stroked paths (1px), major contours brighter
  (1.8px) at ink-2. Forms the terrain.
- **Hachures** — short strokes on slopes at ink-4, classic relief marks.
- **Folds & cracks** — straight folds at grid colour; thin paper cracks with a
  paper-coloured "gap" stroke underneath so folds/cracks clearly *cut* the
  print.
- **Crosses** — small surveyor's crosses at grid intersections.
- **Route lines** — dashed `stroke-dasharray: 14 10` marching-ants animation
  (`@keyframes mapMarch { to { stroke-dashoffset: -24; } }` at 2.8s) linking
  the navigation marks.
- **Marks** — 11px dots with paper fill + 2px ink stroke; labels in 24px
  Helvetica (`paint-order: stroke` with a 6px paper stroke so type never
  collides with linework); active marks bold; the current mark pulses a halo
  (3s ease-in-out).
- **Vignette** — radial gradient to `--map-shade` at 0.55 outer opacity.
- **Grain** — `feTurbulence` noise rect over the sheet at 0.07 overlay.

Interaction: the sheet pans (grab cursor), `touch-action: none`, pause on
`prefers-reduced-motion`. The atlas may be cropped slightly at the bottom edge
for fold realism — but *crops are part of the drawing*, never lazy sizing.

### Spec Boxes (ficha técnica)

Data is filed in a one-pixel-gap grid, not cards:

```css
.spec-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  background: var(--border-subtle);   /* the grid shows as hairlines */
  border: 1px solid var(--border-subtle);
}
.spec-box { padding: 8px 10px; background: var(--bg-main); }
.spec-label { font-size: 9px; color: var(--text-faint); }
.spec-value { font-size: 12px; color: var(--text-bright); overflow-wrap: anywhere; }
```

- The *gaps* are the rules. Box interiors return to canvas colour.
- Wide entries span `grid-column: 1 / -1` (long values, track lists ledes).
- Values are fields, not prose: dates, credits, ISRC, roles.

### Adjustments Panel (the sovereign-settings contract)

The instrument ships an honest settings panel ("ajustes"), fixed under the
gear button, with:

| Group | Control |
|-------|---------|
| Tema | swatch pairs (dark/light at minimum), grid 1fr 1fr |
| Fonte | button list — Helvetica by default; alternates only if licensed |
| Cursor | choice of the three appropriate cursors |
| Grão | 0–100 slider over the grain overlay (`mix-blend-mode: overlay`, SVG `feTurbulence` 0.82/4 octaves) |
| Matiz | −180°–180° slider via `filter: hue-rotate()` |

Contract: **all choices persist in `localStorage`**, apply globally
(`:root[data-theme]`, body `filter`), and note it to the visitor in a small
footnote. Defaults stay strong — every slider starts neutral (grain 0, hue 0°).

### When to Use Archive OS vs Standard Swiss

| Context | Approach |
|---------|----------|
| Personal archive / multidisciplinary practice | Archive OS |
| Catalogue with data rows (releases, tracks, ISRC) | Archive OS |
| Site as searchable reference (tags, filters, sort) | Archive OS |
| Editorial essays, long-form reading | Standard Swiss |
| Print-led portfolio posters | Standard Swiss |
| Brand/agency site with campaign photography | Standard Swiss |
| Archivo dark + editorial light, same owner | Both: archive frame, editorial spreads inside detail views |

---

## 10. CSS Framework / Design Tokens

A complete set of CSS custom properties defining the design system. Use these
as the single source of truth for any Swiss-Style web project.

```css
:root {
  /*
   * ─── Typography ──────────────────────────────────────────
   */

  /* Families */
  --font-sans: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
  --font-classic: 'Akzidenz-Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif;

  /* Editorial size scale — Perfect Fourth (1.25) */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-md: 1.25rem;
  --text-lg: 1.563rem;
  --text-xl: 1.953rem;
  --text-2xl: 2.441rem;
  --text-3xl: 3.052rem;
  --text-4xl: 3.815rem;
  --text-5xl: 4.768rem;

  /* App size scale (Archive OS, compact) */
  --text-item: 24px;
  --text-body-app: 12.5px;
  --text-ui: 11px;
  --text-meta: 10.5px;
  --text-label: 9.5px;
  --text-section: 9px;
  --text-spec: 8.5px;

  /* Weights */
  --weight-light: 300;
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-bold: 700;

  /* Line heights */
  --leading-tight: 1.0;
  --leading-heading: 1.1;
  --leading-body: 1.6;
  --leading-caption: 1.2;

  /* Tracking */
  --tracking-tight: -0.05em;     /* OS items & display */
  --tracking-snug: -0.02em;      /* body & meta */
  --tracking-normal: 0;          /* labels — sentence case, never wide */

  /*
   * ─── Spacing (8px base) ──────────────────────────────────
   */

  --space-0:  0px;
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  24px;
  --space-6:  32px;
  --space-8:  48px;
  --space-10: 64px;
  --space-12: 96px;
  --space-16: 128px;

  /*
   * ─── Colour ──────────────────────────────────────────────
   */

  --black:       #1A1A1A;
  --dark:        #2D2D2D;
  --mid-grey:    #6A6A6A;
  --cool-grey:   #A9B2B1;
  --light-grey:  #E5E5E5;
  --off-white:   #F4F3EE;
  --white:       #FFFFFF;
  --accent:      #D82C2C;
  --accent-blue: #2B5FD7;

  /* Archive OS canvas set (dark default; pair with a light theme) */
  --canvas:        #141414;
  --text-bright:   #f5f5f7;
  --text-active:   #d1d1d6;
  --text-body:     #a1a1a6;
  --text-muted:    #8e8e93;
  --text-dim:      #636366;
  --text-faint:    #48484a;
  --border-subtle: rgba(255, 255, 255, 0.05);
  --border-link:   rgba(255, 255, 255, 0.15);
  --field-bg:      rgba(255, 255, 255, 0.07);

  /* Semantic (light contexts) */
  --text-primary:   var(--black);
  --text-secondary: var(--mid-grey);
  --text-inverse:   var(--white);
  --bg-primary:     var(--white);
  --bg-secondary:   var(--off-white);
  --bg-inverse:     var(--black);
  --border:         var(--black);

  /*
   * ─── Grid / OS frame ─────────────────────────────────────
   */

  --grid-columns: 12;
  --grid-gap: 20px;
  --max-width: 1200px;
  --content-width: 960px;
  --measure: 66ch;

  --sidebar-w: 250px;
  --sidebar-w-collapsed: 48px;
  --header-h: 52px;
  --hero-h: 38vh;
  --sheet-h: 26vh;

  /*
   * ─── Section ──────────────────────────────────────────────
   */

  --section-gap: clamp(4rem, 8vw, 8rem);
  --border-radius: 0px;   /* fields may use small radii; content never does */
  --transition-ui: 0.16s ease;
}
```

---

## 11. Spacing Scale

Every margin, padding, gap, and dimension must come from this scale. No
arbitrary values.

```
0    →   0px
1    →   4px    (fine)
2    →   8px    (baseline unit)
3    →   12px   (tight)
4    →   16px   (standard)
5    →   24px   (relaxed)
6    →   32px   (generous)
8    →   48px   (section padding)
10   →   64px   (wide)
12   →   96px   (spacious)
16   →   128px  (maximum)
```

### Application Examples

| Context | Token | Value |
|---------|-------|-------|
| Body padding (page edge) | `--space-6` | 32px |
| Gap between sections | `--space-8` or `--section-gap` | 48px – 8rem |
| Gap between grid items | `--grid-gap` | 20px |
| Padding inside a spec box | `--space-2` + 2px | 8–10px |
| Margin below a heading | `--space-3` | 12px |
| Margin below a paragraph | `--space-4` | 16px |
| Small element separation | `--space-2` | 8px |
| OS row padding | tokenised rows | 7–9px |
| Spec grid gap (the rule itself) | hairline grid | 1px |

---

## 12. Responsive Behaviour

Responsive design in Swiss Style is not about hamburger menus and stacked
columns. It is about preserving the composition across screen sizes.

### Breakpoints

```css
/* Tokens */
--bp-sm: 640px;
--bp-md: 768px;
--bp-lg: 1024px;
--bp-xl: 1280px;
```

### Collapse Strategy

| Screen | Grid Behaviour |
|--------|----------------|
| ≥ 1024px | 12-column grid, full compositional freedom |
| 768 – 1023px | 8-column grid, reduce gap to 16px, reduce padding to 24px |
| < 768px | Single column, 16px padding. One image per row. Type sizes reduce one step on the scale. |

Archive OS collapses by **panel strategy**, not column stacking:

- < 1024px: sidebar collapses to the 48px vertical tab automatically.
- < 760px: spec grids go single-column; detail covers shrink; atlas labels
  drop to 15px; hero and novidades heights reduce; the archive stage keeps its
  horizontal scroll (touch `pan-y` drag).
- The **hamburger is only allowed with more than 6 nav items**, and the two
  documented OS collapse modes are the sidebar tab and scrollable stages.

### Mobile Non-Negotiables

- **No hamburger menu** unless the user has >6 nav items. Use the sidebar tab,
  a horizontal word list, or one of the OS collapse modes.
- **Typography does not reflow wildly.** The same hierarchy applies. H1 is
  still bold, still the largest size on the page.
- **Images stay full-width** on mobile. No side-by-side images below 640px.
- **Whitespace shrinks but does not disappear.** Section gap at
  `clamp(2rem, 4vw, 4rem)` on small screens.

```css
@media (max-width: 767px) {
  .swiss-grid {
    grid-template-columns: 1fr;
    gap: 0;
    padding: 0 var(--space-4);
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .swiss-grid {
    grid-template-columns: repeat(8, 1fr);
    gap: 16px;
    padding: 0 var(--space-5);
  }
}
```

---

## 13. Key Historical References

### Foundational Texts

| Work | Author | Relevance |
|------|--------|-----------|
| *Grid Systems in Graphic Design* (1961) | Josef Müller-Brockmann | The definitive book on grid methodology |
| *Typographie* (1967) | Emil Ruder | Typography as the foundation of communication |
| *Graphic Design Manual* (1965) | Armin Hofmann | Systematic approach to visual fundamentals |
| *Die neue Typographie* (1928) | Jan Tschichold | Early modernist typography manifesto |
| *Designing Programmes* (1962) | Karl Gerstner | Programme-driven design — the ancestor of the Archive OS idea |

### Key Designers

| Designer | Known For |
|----------|-----------|
| **Josef Müller-Brockmann** | Grid systems, Tonhalle concert posters, mathematical composition |
| **Emil Ruder** | Typography as primary tool, Basel School of Design |
| **Armin Hofmann** | Basel School, reductionist visual language, colour theory |
| **Max Bill** | Bauhaus connection, Art Concret, geometric abstraction |
| **Adrian Frutiger** | Univers, Frutiger, Avenir — rational typeface design |
| **Karl Gerstner** | Programmatic design, mathematical colour |
| **Wim Crouwel** | Grid-obsessed, New Alphabet, Stedelijk Museum catalogues |
| **Wolfgang Weingart** | Pushed Swiss into postmodernism, "Swiss Punk" typography |
| **April Greiman** | Brought Swiss Style to US, blended with new wave |
| **Hans Neuburg & Richard P. Lohse** | Information graphics and constructive colour systems |

### Iconic Works to Study

- Müller-Brockmann — Tonhalle Zürich concert posters (1950s–60s)
- Müller-Brockmann — *Der Film* poster and *Automobil Club der Schweiz* posters
- Armin Hofmann — Basel Theatre posters
- Emil Ruder — *Typographie* spreads
- Max Bill — Ulm School of Design identity
- Wim Crouwel — Stedelijk Museum catalogues
- Swiss traffic and transit signage systems — the reason the "interface"
  metaphor exists at all (see the signage sheets in `examples/`)

---

## 14. Contemporary Reference Sites

### The Live Reference

| Site | URL | Notes |
|------|-----|-------|
| **matesu.me** | `www.matesu.me` | The canonical Archive OS implementation. Fixed sidebar, search/filter/order, atlas hero, archive tree, spec boxes, adjustments panel. All tokens in this skill come from this site's production CSS. |

### Platforms & Scenes (where this aesthetic lives)

| Site | URL | Notes |
|------|-----|-------|
| Cargo | `cargo.site` | Portfolio platform for designers who refuse templates |
| Cargo Community | `cargo.site/community` | Browse the best current Cargo sites |
| Neocities | `neocities.org` | The personal web scene — small, hand-made, honest |
| Bandcamp | `bandcamp.com` | Music catalogue conventions; strong on plain-field design |
| are.na | `are.na` | Channel-based reference collecting; use as a moodboard tool |
| HTML Energy | `html.energy` | Pamphlet of people making pages that feel like pages |

### Swiss-Style Web Design

| Site | URL | Notes |
|------|-----|-------|
| Swiss in CSS | `swissincss.com` | Historical Swiss posters recreated and animated in CSS (Jon Yablonski) |
| Swiss Themes | `swissthemes.design` | Modern Swiss design templates for Framer |
| Swiss UI Tokens | `github.com/swiss-ui/tokens` | Token set built on Swiss principles (AGPL — check licensing before reuse) |

### Local Reference Images

| File | Notes |
|------|-------|
| `examples/img/signage-toronto.jpg` | Subway signage: Helvetica as a working interface |
| `examples/img/signage-swiss.jpg` | Swiss traffic signage montage: red/blue field system, wayfinding shorthand |

### Reference Hygiene (for skill maintainers)

- Every reference must be **verifiable, public, and relevant** to the skill's
  domain. Never ship someone's personal moodboard (Pinterest boards, private
  channels) as a reference.
- Never invent URLs, case-study slugs, or vendor case studies you have not
  checked.
- Cut references whose only use is name-dropping. A reference should change
  how the agent designs.
- When adapting this skill for a person, the *person's own site belongs in
  "The Live Reference"* — theirs, not anyone else's.

---

## 15. Design Review Checklist

Before considering any design complete, evaluate every point:

### Grid & Layout
- [ ] Is every element aligned to the grid (or OS panel math)?
- [ ] Are column spans varied across sections (no repeated equal columns)?
- [ ] Is the max-width constrained and centred (editorial) / panels tokenised (OS)?
- [ ] Are gutters consistent?
- [ ] Are any grid breaks deliberate rather than accidental?

### Typography
- [ ] Is only one typeface family used (plus mono where appropriate)?
- [ ] Are all font sizes from the editorial modular scale or the app scale?
- [ ] Is hierarchy carried by weight + size + alpha steps, not by colour?
- [ ] Is body text flush left, ragged right (or justified only in narrow hyphenated columns)?
- [ ] Is the measure constrained to ~66ch on text-heavy sections?
- [ ] Are line heights generous (1.4–1.6 for body)?
- [ ] Is tracking tight on display, -0.01em on body, zero on labels?
- [ ] Are all data numerals tabular?

### Whitespace
- [ ] Could any element be removed without losing communication?
- [ ] Is the section gap (or zone gap) generous?
- [ ] Are margins and padding using the spacing scale?
- [ ] Is there at least one moment of deliberate emptiness?

### Colour
- [ ] Is the palette limited to neutrals + one accent?
- [ ] Is the accent used sparingly and meaningfully?
- [ ] Are there any drop shadows (outside chrome), gradients (outside atlas), or rounded corners on content?
- [ ] Do dark themes use the five text steps instead of inline greys?

### Content
- [ ] Is photography the primary visual content?
- [ ] Are images full-bleed, slotted, or aligned to the grid?
- [ ] Would the design work as well in black and white?

### Communication
- [ ] Does someone understand the message in under one second?
- [ ] Would removing the decorative elements change anything?
- [ ] Is the hierarchy clear without needing to interpret it?
- [ ] Does the design say the same thing to everyone?

### Archive-OS-Specific (if applicable)
- [ ] Is the canvas `#141414` (or the theme's token), not pure black?
- [ ] Are nav items 24px with `-0.05em` tracking?
- [ ] Is the sidebar a real panel with a real 48px collapse tab, not a hamburger?
- [ ] Does every interactive element use inversion/hairline feedback at `0.16s`?
- [ ] Does wheeled/touched/drag navigation move the archive without vertical page jumps?
- [ ] Are data sections filed as spec boxes with 1px-gap hairline rules?
- [ ] Does the atlas use the documented drawing vocabulary (graticule, contours, hachures, route dashes, marks, vignette, grain)?
- [ ] Do theme/font/grain/hue controls persist to `localStorage`, defaulting neutral?
- [ ] Are cursors documenting affordances (grab, crosshair, grabbing, ns-resize)?
- [ ] Does `prefers-reduced-motion` stop routes, halos, and pushes?
- [ ] Are hidden scrollbars compensated by visible affordances (grabber, marks)?

### Machine Tells (always run)
- [ ] Are there zero status/utility dots (green presence dots, recording dots, pulse dots)?
- [ ] Are there zero dotted labels, dot-leaders, or dotted decorative rules?
- [ ] Is every label, kicker, and badge in sentence case — no ALL-CAPS, no tracked-out caps?
- [ ] Does every sentence of copy carry a fact (title, date, name, credit, dimension)?
- [ ] Are "made with"/"powered by" badges, ornamental separators, and decor emoji absent?
- [ ] Is at least one graphic treatment earning its presence (SVG filter, gradient map, heatmap, drawn map, interactive canvas) instead of decorative chrome?

### Poster-to-Web / Graphic Design Transfer (if applicable)
- [ ] Does the composition translate to a screen with variable height?
- [ ] Is there a clear focal point (as a poster has)?
- [ ] Does type scale appropriately for the viewport (not fixed poster sizes)?
- [ ] Is the layout still legible when scrolled (not dependent on single-viewport visibility)?
- [ ] Are print conventions (bleed, trim marks, fold) used intentionally rather than accidentally?

### Brutalist (if applicable)
- [ ] Is the rawness intentional and purposeful, not just unfinished?
- [ ] Are system fonts used deliberately?
- [ ] Is there a clear hierarchy despite the anti-design?
- [ ] Does the aesthetic serve the message or just shock?

### Texture & Material (if applicable)
- [ ] Is every texture treatment serving a purpose (atmosphere, depth, focus)?
- [ ] Are textures performant (no massive PNGs, use SVG/CSS filters)?
- [ ] Do textures integrate with the typography rather than compete?

---

## 16. Poster-to-Web Translation

Swiss Style was born in print, and the posters of Müller-Brockmann, Hofmann,
and others remain the purest expression of its principles. Translating a
poster composition to the web requires adapting fixed-canvas thinking to a
variable-viewport medium.

### Key Differences

| Print Poster | Web Equivalent |
|-------------|----------------|
| Fixed dimensions (e.g. 90×128cm) | Variable viewport height, unknown device |
| Single, composed view | Scrollable, composable sections |
| One focal point | Multiple entry points across scroll |
| Exact colour control | Unknown display calibration |
| Physical texture (paper, ink) | CSS/SVG-simulated texture |

### Translation Patterns

**Pattern A: Full-Viewport Poster Hero**
The first viewport is a composed poster. Everything below is details.

```css
.poster-hero {
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  justify-items: start;
}
```

**Pattern B: Poster Strip**
A poster composition used as a full-width interruption within a scroll layout.

```css
.poster-strip {
  height: 80vh;
  min-height: 600px;
  position: relative;
  overflow: hidden;
}
```

**Pattern C: Fixed-Aspect Grid Cell**
Grid cells that maintain poster-like aspect ratios (4:3, 3:4, 2:3).

```css
.aspect-cell {
  aspect-ratio: 3 / 4;
  display: grid;
  place-items: center;
  overflow: hidden;
}
```

The atlas hero of the Archive OS is a fifth pattern: **the printed document
as interface** — a paper sheet drawn in SVG, pan-able, with the reading route
animated between navigation marks. Use it when the content *is* the route.

### Choosing What to Translate

When analysing a print poster for web translation, identify:

1. **Grid structure** — What modular grid underlies the poster? That becomes the
   CSS grid.
2. **Type hierarchy** — What is the primary/secondary/tertiary read? That maps
   to h1/h2/body in HTML.
3. **Focal point** — Where does the eye land first? That is the hero section.
4. **Whitespace** — Where is the breathing room? That becomes section gaps and
   padding.
5. **Texture** — Is there paper grain, halftone, or ink bleed? That becomes
   SVG/CSS filters.

---

## 17. Brutalist Web Design

Brutalism in web design is not about being unfinished — it is about being
**unpolished on purpose**. It rejects the slick, padded, rounded-corners
aesthetic of mainstream web design in favour of raw, honest, confrontational
communication. It shares Swiss Style's commitment to clarity and reduction,
but replaces mathematical neutrality with aggressive directness.

### Core Principles

| Principle | Meaning |
|-----------|---------|
| **Authenticity over elegance** | The design shows its bones. Raw HTML, unfiltered. |
| **Function over beauty** | If it works, it stays. Aesthetics are secondary. |
| **Confrontation** | The design should make you feel something — discomfort, surprise, urgency. |
| **Honesty of materials** | System fonts, default link colours, unstyled elements are features, not bugs. |
| **Maximalism within constraint** | Oversized type, harsh colours, intentionally broken grids. |

### Visual Vocabulary

| Element | Brutalist Approach |
|---------|-------------------|
| Typeface | System sans-serif (Arial/Helvetica) or monospace (Courier New/CONSOLA). No custom webfonts. |
| Type size | Often 2–3× larger than standard. H1 at 4–6rem. |
| Colour | High contrast. Default blue links (#0000EE), lime green on black, highlighter yellow. |
| Grid | 1-column or intentionally broken multi-column. Elements overlap. Margins are tight or zero. |
| Borders | Thick (`3px`–`5px`), black, solid. Underlines on everything. |
| Backgrounds | White, black, or aggressively coloured. No subtle greys. |
| Navigation | Visible list of links. Underlined. Blue. Like 1998. |
| Cursors | Use `cursor: pointer` or `cursor: crosshair` as a statement. |
| Interaction | Links change colour on hover. That's it. No animations, no micro-interactions. |

### When to Use Brutalist vs Swiss

| Context | Approach |
|---------|----------|
| Portfolio — minimal work | Swiss |
| Portfolio — loud, political, urgent work | Brutalist |
| Personal site / experimental | Brutalist or Archive OS |
| Corporate / brand site | Swiss |
| Art / gallery | Either |
| Blog — content-first | Swiss editorial |
| Blog — manifesto / polemic | Brutalist |
| Archive / directory | Brutalist or Archive OS |

### Code Pattern

```html
<!-- A brutalist page — minimal CSS, raw HTML, system defaults respected -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>brutal</title>
  <style>
    body {
      font-family: 'Courier New', Courier, monospace;
      font-size: 1rem;
      line-height: 1.5;
      max-width: 960px;
      margin: 2rem auto;
      padding: 1rem;
      background: #fff;
      color: #000;
    }
    h1 { font-size: 3.5rem; line-height: 1; margin-bottom: 0.5rem; }
    h2 { font-size: 2rem; }
    a { color: #0000EE; text-decoration: underline; }
    a:visited { color: #551A8B; }
    img { display: block; width: 100%; border: 3px solid #000; }
    hr { border: none; border-top: 4px solid #000; margin: 2rem 0; }
    ul { padding-left: 1.5rem; }
    .warning { background: #FF0; color: #000; padding: 1rem; font-weight: bold; }
  </style>
</head>
<body>
  <h1>This is a<br>brutalist page.</h1>
  <hr>
  <p>It looks like this because it has something to say.</p>
  <ul>
    <li><a href="/work">Work</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
  <hr>
  <img src="photo.jpg" alt="Work sample">
  <p class="warning">⚠ This site uses system fonts and default link colours.</p>
</body>
</html>
```

---

## 18. Texture & Material

Swiss design traditionally favours flat, untextured surfaces — but the
contemporary Swiss-adjacent vocabulary often incorporates material texture:
halftone dots, paper grain, ink bleed, noise, and drawn gradients. In the
Archive OS, texture is *adjustable* and always one level quieter than the type.

### Texture Repertoire

| Texture | Technique | Performance |
|---------|-----------|-------------|
| **Halftone** | SVG pattern or sharp-generated dot screens — photos only, never UI chrome | Medium |
| **Paper grain** | CSS `::after` with SVG noise filter | Good |
| **Threshold print** | `filter: grayscale(1) contrast(16)` or `.threshold()` pre-baked | Best |
| **Gradient map** | grayscale source + `mix-blend-mode: color` gradient layer, or `feComponentTransfer` tables | Good |
| **Heatmap** | blurred mono source mapped through a colour ramp (see recipe) | Good |
| **Displacement** | `feTurbulence` + `feDisplacementMap` on photos or drawn maps | Medium |
| **Ink bleed / spread** | SVG filter `feGaussianBlur` + `feColorMatrix` | Medium |
| **Atlas mesh** | Radial vignette over drawn paper (atlas only) | Good |
| **Noise texture** | CSS `::after` with tiny base64 noise PNG or SVG filter | Best |
| **Scan lines / CRT** | CSS `repeating-linear-gradient` overlay | Best |

Dot screens, ramp maps, and filters belong to *images and drawn canvases*.
They never become UI chrome — no dotted labels, no coloured status dots, no
decorative dot grids beside text.

### SVG Noise Filter (Paper Grain)

```css
.noise-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background: transparent;
  pointer-events: none;
  filter: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3C/svg%3E#n");
}
```

Production grade (the reference's own recipe):

```css
#grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 55;
  opacity: 0;                          /* driven by the grain/adjustments slider */
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23g)'/></svg>");
  background-size: 180px 180px;
  mix-blend-mode: overlay;
}
```

### Halftone Pattern (CSS)

```css
.halftone {
  background-image:
    radial-gradient(circle, #000 1px, transparent 1px);
  background-size: 4px 4px;
  background-color: #fff;
}
```

### Halftone (SVG Pattern)

```css
.halftone-svg {
  background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='4' cy='4' r='1.5' fill='%23000'/%3E%3C/svg%3E");
}
```

### Threshold Print (photo treatment)

```css
.bio-photo.threshold {
  filter: grayscale(1) brightness(1) contrast(16);
  outline: 1px solid var(--text-bright);
  outline-offset: -1px;
}
```

Pair a normal photo and a thresholded photo in the same slot and crossfade on
hover — the document answer replaces the photograph answer.

### Gradient Map (image treatment)

Sink a grayscale source into two or three colours. CSS version:

```css
.gradmap { position: relative; }
.gradmap img { filter: grayscale(1) contrast(1.1); display: block; }
.gradmap::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(160deg, #0b2f47 0%, #f5f5f7 55%, #d82c2c 100%);
  mix-blend-mode: color;
  pointer-events: none;
}
```

Precise version with `feComponentTransfer` — map luminosity through colour
ramp tables (change `tableValues` per palette):

```html
<filter id="gradmap" color-interpolation-filters="sRGB">
  <feColorMatrix type="saturate" values="0"/>
  <feComponentTransfer>
    <feFuncR type="table" tableValues="0.04 0.49 0.96"/>
    <feFuncG type="table" tableValues="0.05 0.55 0.19"/>
    <feFuncB type="table" tableValues="0.08 0.60 0.17"/>
  </feComponentTransfer>
</filter>
```

### Heatmap (data or photo intensity)

Convert a blurred grayscale layer into an intensity ramp. On a photo:

```html
<filter id="heat" color-interpolation-filters="sRGB">
  <feColorMatrix type="saturate" values="0"/>
  <feGaussianBlur stdDeviation="6"/>
  <feComponentTransfer>
    <feFuncR type="table" tableValues="0.05 0.2 0.95 1"/>
    <feFuncG type="table" tableValues="0.05 0.7 0.75 0.2"/>
    <feFuncB type="table" tableValues="0.1 0.95 0.15 0"/>
  </feComponentTransfer>
</filter>
```

On real data (values plotted over a map or a grid), prefer explicit surfaces:
a canvas of radial-gradient stops blended with `mix-blend-mode: screen` over
the drawn map, or a `<table>`-driven set of positioned stops. The heat layer
must follow real values — heat that doesn't map to data is decoration.

### Displacement (photo or drawn map edges)

```html
<filter id="displace" color-interpolation-filters="sRGB">
  <feTurbulence type="turbulence" baseFrequency="0.012 0.004" numOctaves="2" result="warp"/>
  <feDisplacementMap in="SourceGraphic" in2="warp" scale="24" xChannelSelector="R" yChannelSelector="G"/>
</filter>
```

Use it to imprint print behaviour on an atlas sheet or a photo slot — not on
text. Scale below ~30 keeps type untouched.

### Atlas Mesh (atmospheric, atlas canvases only)

```css
.map-vignette {
  background:
    radial-gradient(ellipse at 50% 44%, rgba(8,8,8,0) 52%, rgba(8,8,8,0.55) 100%);
}
```

### When to Add Texture

| Context | Texture Recommendation |
|---------|----------------------|
| Swiss portfolio (light) | None or very subtle paper grain |
| Archive OS (dark) | Grain slider, default 0 — visitor opt-in |
| Editorial / magazine | Paper grain, ink bleed |
| Brutalist | Halftone, scan lines, CRT |
| Atlas hero | Vignette + drawn grain at 0.07, always |
| Poster hero section | Halftone, grain |
| Archive / collection | Halftone, gradient map, paper texture |
| Data over a map or grid | Heatmap ramp driven by real values |

---

## 19. Editorial / Magazine Layout

Editorial design for the web adapts magazine spreads — multi-column text, pull
quotes, image hero spreads, captions, bylines — into responsive, scrollable
compositions.

### Spread Anatomy

A magazine spread on the web is a series of section grids, each with a
distinct layout:

```
Section 1: Hero Spread (full-bleed)
  [  image — 12 cols full-width  ]
  [  headline, byline — 6 cols, inset  ]

Section 2: Text Spread (two-column)
  [  body — 5 cols  |  body — 5 cols  |  gutter — 2  ]

Section 3: Image + Caption
  [  image — 8 cols  |  caption — 4 cols  ]

Section 4: Pull Quote Spread
  [  quote — 10 cols, centred  ]
  [  attribution — 4 cols, offset right  ]
```

### CSS Multi-Column for Editorial Text

```css
.editorial-text {
  column-count: 2;
  column-gap: var(--space-6, 32px);
  max-width: var(--measure, 66ch);
}

@media (max-width: 767px) {
  .editorial-text {
    column-count: 1;
  }
}
```

### Pull Quote

```css
.pull-quote {
  grid-column: 2 / 12;
  font-size: var(--text-2xl);
  font-weight: var(--weight-light);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  padding: var(--space-6) 0;
  border-top: 2px solid var(--black);
  border-bottom: 2px solid var(--black);
  margin: var(--space-8) 0;
}
```

### Drop Cap

```css
.drop-cap::first-letter {
  font-size: 4em;
  font-weight: var(--weight-bold);
  float: left;
  line-height: 0.8;
  margin-right: 0.15em;
  padding-top: 0.1em;
}
```

### Byline / Meta Block

```css
.byline {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}
```

### Editorial Type Scale

| Role | Size | Weight | Leading |
|------|------|--------|---------|
| Headline | 3xl–4xl | Bold (700) | 1.0 |
| Subhead | xl | Regular (400) | 1.1 |
| Body | base | Regular (400) | 1.6 |
| Caption | sm | Medium (500) | 1.2 |
| Pull quote | 2xl | Light (300) | 1.0 |
| Byline | xs | Medium (500) | 1.2 |

### Section Rhythms

Editorial pages follow a rhythm: open strong (hero), go deep (text/analysis),
punctuate (pull quote/image break), resolve (closing spread). Each section
type maps to a different grid pattern.

| Rhythm | Grid Pattern | Purpose |
|--------|-------------|---------|
| Hero | Full-bleed image + inset headline | Open the story |
| Text | 2-column or single narrow column | Depth / analysis |
| Break | Full-bleed image or pull quote | Pause / punctuate |
| Data | 3–4 columns of stats/charts | Evidence |
| Close | Full-bleed image or single strong statement | Resolve |

Inside the Archive OS, editorial entries are filed as detail views — the
anatomy stays, the container changes.

---

## 20. Image Analysis & Design Extraction

Photography is the primary visual material in Swiss Style. This section
describes how to read images as data — extracting dimensions, colour palettes,
texture complexity, and composition cues — and use that data to drive design
decisions.

### The Image Analysis Pipeline

When a project includes reference images, follow this pipeline before making
any layout or colour decision:

```
[ Reference images ] → [ Extract metadata ] → [ Generate palette ]
    → [ Recommend treatment ] → [ Assign grid placement ]
```

### Running the Analysis Tool

If `examples/analyze-images.js` exists in the project, run it to produce
structured data:

```bash
cd examples
node analyze-images.js                # outputs references.yaml
node analyze-images.js --format json  # outputs references.json
```

If `examples/treat-images.js` also exists, run it *after* analysis to
normalise working copies (resize cap, threshold print, halftone build) without
touching the originals:

```bash
node treat-images.js    # originals stay untouched in examples/img/original/
```

The output contains per-image metadata with these fields and design uses:

| Field | What it means | Design use |
|-------|---------------|------------|
| `width` / `height` | Pixel dimensions | Determines hero vs inset treatment. Full-width = 12-col hero. |
| `aspectRatio` | width/height | Guides grid column span. 16:9 = 12col. 4:3 = 8col. 1:1 = 6col. |
| `dominantColour` | Most frequent colour hex | Candidate for accent or background. |
| `palette` | Top 5 colours (hex) | Full palette extraction. Map to design tokens. |
| `entropy` | Texture complexity (0–8) | Low = flat/minimal (generous whitespace). High = busy (simple layout). |
| `sizeKB` | File size | Performance consideration. Large files may need compression. |
| `format` | Image format | WebP/AVIF preferred for performance. JPEG acceptable for photos. |

### Extracting a Colour Palette from Images

When no explicit palette is provided, extract one from the reference images:

1. **Collect dominant colours** from each image's `palette` field.
2. **Sort by frequency** — the most common neutral becomes `--off-white` or
   `--black`. The most saturated colour becomes `--accent`.
3. **Fill mid-tones** — intermediate colours map to `--mid-grey`,
   `--cool-grey`, `--text-secondary`.
4. **Output as CSS custom properties** with the standard token names.

Example mapping from image analysis:

```yaml
# references.yaml output
references:
  - file: hero-shot.jpg
    dominantColour: '#2A2A2A'    → --black
    palette:
      - '#2A2A2A'                → --black
      - '#F4F3EE'                → --off-white
      - '#D82C2C'                → --accent
      - '#6A6A6A'                → --mid-grey
      - '#A9B2B1'                → --cool-grey
```

### Tailoring Design to Image Content

Use image characteristics to drive design decisions:

| Image trait | Layout response | Typography response | Colour response |
|-------------|----------------|---------------------|-----------------|
| Low entropy, minimal | Generous whitespace, wide margins | Light weight (300), tight display tracking | Off-white background, dark accent |
| High entropy, textured | Full-bleed, simple grid | Bold weight (700), tight tracking | Solid colour background, reduce noise |
| Dark tones | Light background or white text overlay | Thin weight on dark bg | High contrast accent |
| Light tones | Dark text, thin borders | Regular weight, standard leading | Strong accent for hierarchy |
| Portrait orientation | 6–8 col inset, vertical composition | Size 2xl headline, tight leading | Soft palette |
| Landscape / wide | Full-bleed hero, 12 col | Size 4xl display, tight tracking | Bold accent |

### Colour Palette Extraction Algorithm

When extracting a palette from images automatically:

1. **Quantise** the image to 16 colours using k-means or median cut (sharp
   does this internally via `stats()`).
2. **Select** the 5 most frequent colours.
3. **Classify** each as neutral (low saturation) or accent (high saturation).
4. **Rank** neutrals by luminance — darkest becomes `--black`, lightest
   becomes `--off-white`.
5. **Select** the most saturated colour as `--accent`.
6. **Discard** colours below 5% frequency to avoid noise.

### When Images Are Missing

If the project has no reference images, the agent should:

1. Ask the user for image descriptions or keywords (the grill-me briefing
   covers this in §21).
2. Ship empty slots in OS surfaces, and placehold.co scaffolding images
   (e.g. `https://placehold.co/800x600`) in editorial layouts — sized to the
   slot's aspect ratio, on the domain palette.
3. Propose a colour palette based on the brief's domain (Swiss, Archive OS,
   brutalist, editorial) rather than extracted from images.
4. Note which design tokens are provisional and need real image data to
   finalise.

### Workflow for Designers

When a designer provides reference images:

1. **Analyse** — run the analysis tool to get structured data.
2. **Read** — study the extracted metadata with the image-editor agent.
3. **Extract** — pull palette candidates and composition cues.
4. **Treat** — run the refactor pipeline (`treat-images.js`): resize cap,
   threshold print, halftone build. Originals stay untouched.
5. **Map** — map extracted colours to design tokens.
6. **Design** — make grid, type, and colour decisions informed by the data.
7. **Validate** — delegate to design-critic to review the result.

---

## 21. Creative Commission Protocol

Every commission starts as an interrogation and lands as a compact,
over-composed page — a magazine spread diagrammed by European designers, not
a template filled in. Three disciplines govern this section: ask before you
build, prefer the smaller and denser, dare through contrast rather than
decoration.

### Grill-me briefing (always first)

Before any layout output, interrogate the owner in rounds. Each round offers
a default so the flow survives silence:

1. **Reference** — name the live reference for this project (a site, a person,
   a publication). Ask for up to three items, images, or documents that anchor
   the identity — and one thing the design must *not* look like. Default: the
   Archive OS reference.
2. **Facts** — collect real material: exact names, dates, credits, catalogue
   codes, real links, real photos (offer the analysis pipeline on them). No
   invented brands, no sample copy. Default: the brief as stated.
3. **Grid & layout** — propose two or three panel/column maps as ASCII, state
   the collapse strategy, and make the owner choose. Default: your strongest
   recommendation, named as such.
4. **Boldness** — offer two or three anti-design moves from the ledger below.
   Make the owner commit to at most two per page. Default: pick the move the
   content most clearly earns.
5. **Spec sheet** — print a one-page decision list (reference, palette, grid
   map, type scale, texture budget, boldness moves) and build from it.

The agent's creativity leads every round; the reference disciplines it.
Adapt and innovate on the ideas — the questions exist to extract the
material that makes originality possible, not to converge on sameness.

### Compact doctrine

- **Shorter copy everywhere.** No paragraph longer than three sentences on
  app surfaces. Lead ≤ 40 words. Captions, one line. Data beats prose:
  a date, a credit, a dimension, ISRC — filed in spec boxes, not explained.
- **Smaller sizes, denser rhythm.** App scale runs 24 → 8.5px (§3). Body
  copy on admin/editorial pages lands at 13–14px, never 16px, with leading
  1.35–1.45. Paddings compress to 10–14px inside panels; gaps 8–12px.
  Generous space belongs to the page margins, never to component padding.
- **Reduced kerning.** Display and items `-0.05em`; body `-0.02em`; zero on
  labels. Never compensate readability by loosening tracking — tighten,
  resolve at high weights, and let size breathe instead.

### Justified dossier

Justification earns its place when text lives inside a frame: a bio card, a
detail sheet, a synopsis box. The text block justifies to match the frame's
edges exactly — that is why the box exists.

```css
.boxed-text {
  font-size: var(--text-body-app);   /* 12.5px */
  line-height: 1.42;
  letter-spacing: var(--tracking-snug);
  text-align: justify;
  hyphens: auto;
  text-justify: inter-word;
  text-align-last: left;
  /* the box */
  padding: 10px 12px;
  border-left: 1px solid var(--border-link);
}
```

Rules: column 300–340px; `hyphens: auto` is mandatory (`lang` must be set);
never justify a full-width measure or anything past 66ch; if hyphenation
degrades rag quality, go ragged instead. This pattern is the reference's
own bio column at reduced scale.

### Anti-design ledger (commit to two per page)

Boldness here is *contrast and compression*, never decoration. The page is
read as a magazine spread: every viewport a spread, type the hero, images
the documents.

| Move | Execution |
|------|-----------|
| **Scale jump** | Adjacent type at ×3 ratio (12.5px meta against a 96–127px numeral). The jump *is* the hierarchy. |
| **Full-bleed interruption** | One image or rule crossing all columns, then back inside the margins. |
| **Vertical marginalia** | One caption, one folio, or one label set in `writing-mode: vertical-rl` at the margin — never navigation. |
| **Inverted spread** | One block flips locally (bright field on dark page or the reverse), exactly once, like a magazine plate. |
| **Quote as poster** | A pull quote set at 2xl–4xl with `-0.05em`, tight leading, no quotation furniture. |
| **Folio data at the margins** | Index numbers, dates, and counts living at the edge as marginalia. |
| **Heatmap or gradient map** | Over real data or a real photo (§18 recipes). Heat without data is forbidden. |
| **Map as navigation** | The atlas/series of drawn sheets, interactive where the content is a route. |

Anti-design means anti-decorative and anti-mannerism — it never means
anti-clarity. The reader must still resolve the page in under one second.
Two moves per page, maximum. Every move must trace back to a fact collected
in the briefing.

---

## Usage Notes

When a user says "Swiss style", "archive", "OS interface", "cargo.site",
"modernist", or asks for a "graphic designer portfolio", invoke this skill's
full context. If the brief mentions matesu, matesu.me, or "archive OS",
Section 9 governs precedence over Section 7 patterns.

Output decisions as a designer would: reference grid columns, type scale
steps, and spacing units rather than breakpoints or component props. For
example, say *"this headline spans 8 columns at size 2xl"* not *"this h1 is
32px at desktop"* — or *"archive item at app scale, weight 400, tracking
tight"* not *"a button in 24px"*.

When writing CSS, always use the design tokens defined above. Never use
arbitrary values. Every margin, font-size, and colour should come from the
token system.

Content language follows the owner of the reference: Portuguese (pt-BR) for
matesu.me and its scene. Write UI microcopy in lowercase for brand words
(matesu, bloodworm trax) — never auto-capitalise a brand.

Do not introduce a component framework unless the user explicitly asks for
one. Plain CSS with custom properties is the default.
