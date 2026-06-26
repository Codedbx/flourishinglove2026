# Flourish &amp; Godwin — Wedding Invitation Site

A single-page wedding invitation and information site.

> **Saturday, 1 August 2026 · Warri, Delta State, Nigeria**
> `#flourishingLove26`

The page opens with a wax-sealed envelope intro, then flows through the couple's
story, event details, an engagement gallery teaser, RSVP, and a post-wedding
photo link.

---

## Tech

Plain **static site** — no build step, no framework, no dependencies.

- `index.html` — all markup, one file
- `css/style.css` — the full stylesheet (design tokens, layout, animations)
- `js/main.js` — the seal intro, sticky nav, countdown, and reveal-on-scroll
- Fonts (Cormorant Garamond · Pinyon Script · Jost) load from Google Fonts at runtime

## Project structure

```
.
├── index.html          # the site
├── css/style.css
├── js/main.js
├── assets/
│   ├── img/            # optimized .webp photos (lg + sm variants)
│   ├── motifs/         # logo, wordmark, gold leaves, roses, petals
│   ├── favicon.svg
│   └── favicon-256.png
├── README.md
└── .gitignore
```

> **Not tracked in git** (see [.gitignore](.gitignore)): `source/` (raw photos,
> videos, working SVG layers) and `docs/` (briefs, notes, reference images).
> These are kept locally as working material and are not needed to run or deploy
> the site.

## Run locally

It's a static page, so serve the folder with anything:

```bash
# Python
python -m http.server 8000
# then open http://localhost:8000

# …or VS Code "Live Server", or any static file server
```

An internet connection is needed for the Google Fonts to load.

## Links to keep updated

All external links live in `index.html`:

| What | Where it points |
|------|-----------------|
| **RSVP** | Google Form |
| **Engagement gallery** | Pixieset — `clemovisuals949.pixieset.com/mysamplecollection/` |
| **Post-wedding photos** | Google Drive folder (the "View Wedding Photos" button) |
| **Venue maps** | Google Maps links (ceremony &amp; reception) |

Swapping any of these is a one-line `href` change in `index.html`.

## Deploy

Push the repo to any static host — **GitHub Pages**, **Netlify**, **Cloudflare
Pages**, or **Vercel**. No build command is required; serve the repository root.

---

*Made with love for Flourish &amp; Godwin.*
