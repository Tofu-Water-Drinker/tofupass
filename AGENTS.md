# AGENTS.md — TofuPass

Notes for AI agents working on this repo. Keep this file current: add rules you wish you'd known before starting, and trim anything that goes stale.

## Project shape

Static site. No build step, no framework. Vanilla HTML/CSS/JS served as-is.
- **Styling**: Tailwind via CDN (`darkMode: 'class'`) + per-page CSS files under `assets/css/`.
- **JS**: vanilla scripts under `assets/js/`, one per page plus shared helpers (`nav.js`, `theme.js`, `konami.js`).
- **Pages**: `index.html` at root, plus `about/`, `api/`, `miso/`, `privacy/`, `stresstest/`, `why/`, `cheater/` — each is a self-contained `index.html`.
- **No navigation framework**: the nav markup is duplicated inline in every page.

## Conventions

### Colors & theming
- The warm palette lives in CSS custom properties in `assets/css/base.css` (`:root` for light, `html.dark` for dark).
- **Never hardcode `#FFF8F0`, `#4A3728`, `#8B7355`, `#6B5744` in new CSS** — use `var(--bg)`, `var(--text-primary)`, `var(--text-secondary)`, `var(--text-tertiary)`.
- Accent colors (green `#6BBF59`, pink `#FF7A7A`, yellow `#FFD166`, purple `#9B6DD7`, blue `#5B9FD6`) stay hardcoded — they work in both themes.
- When adding inline Tailwind color classes, always pair them with a `dark:` variant, e.g. `text-[#4A3728] dark:text-[#F0E6D8]`.

### Scripts
- **Every page's `<head>`** must include the FOUC-prevention theme script before the stylesheet loads (see any existing page for the exact IIFE).
- **Every page's bottom** should include `nav.js`, `theme.js`, and `konami.js` in that order, with the correct relative path (`./` from root, `../` from subpages).
- Do not load Tailwind without the `tailwind.config = { darkMode: 'class' }` script immediately after the CDN tag.

### Nav structure
The nav bar uses `flex justify-between` with exactly two children:
1. Left: logo wrapper
2. Right: one flex container holding **nav-links → theme-toggle → nav-toggle (hamburger)** in that order

Putting the toggle as a standalone sibling breaks `justify-between` (it ends up centered). Always nest toggle buttons inside the right-side wrapper.

### Clipboard
`navigator.clipboard.writeText()` silently fails on HTTP or restricted mobile contexts. Any new copy-to-clipboard code must include a `textarea + document.execCommand('copy')` fallback, matching the pattern in `home.js` `copyPassword()`.

## Offline / desktop-forward build

`Offline/tofupass-offline.html` is a single-file, fully self-contained version of the generator. **No external CSS, JS, fonts, images, or CDNs.** Open from `file://` and it works.

- **Generation logic** mirrors `assets/js/home.js` exactly (Soft / Firm / Extra Firm). If you change generation behavior in `home.js`, change it here too — the brief is "same outputs as the live site."
- **Word lists** are copied from the public `tofupass-api` repo (GPL v3) — lowercase, deduped — *not* the private `assets/js/wordlists.js`. The offline file is shipped in this repo, so it must only ever embed public lists.
- **No `Math.random`** — only `crypto.getRandomValues` (and `crypto.subtle.digest` for the breach check).
- **Stress tester** preserves the same HIBP k-anonymity flow (5-char SHA-1 prefix → `api.pwnedpasswords.com`). It auto-disables when `navigator.onLine === false` and listens for `online`/`offline` events.
- **Visual style is light-mode-only and desktop-utility**: traffic-light titlebar + warm cream stage + a hero "tofu-block" password card with a peeking Miso. Avoid SaaS hero / marketing energy here even if it sneaks into the live site. Avoid macOS-clone flatness — the offline UI should read as **TofuPass Desktop Edition** the moment you see it (chunky green accents, branded firmness cards, dotted texture on the password card).
- **Mascot** is rendered as inline SVG (two poses: small header Miso ~26px + larger Miso peeking from the password card ~56px). Production Miso PNGs cannot be referenced — single-file constraint. Brand carve-out in `LICENSE` still applies — public forks must replace both SVGs with their own.
- **Firmness selector** uses three branded cards (`.firm-card`), not generic tabs. Each has a tiny tofu-block icon, a name, and a 2-word descriptor (`memorable` / `balanced` / `passphrase`). Selected card lifts and gains a green border.
- **Privacy copy** uses the friendly TofuPass voice: *"Made right here on your device. No saving. No sending. No sneaky business."* Don't replace it with sterile / legal phrasing.
- **Self-tests** live in the same file behind `?test=1` and assert generator behavior. Add to them (don't drop them) when you change generation.
- **Build script**: `Offline/build.js` regenerates the HTML by inlining word lists from the sibling `tofupass-api` repo. Run with `node Offline/build.js`. Override the API path via `TOFUPASS_API_PATH=/some/where/tofupass-api`. The script is a build helper — the HTML is the artifact and is checked in alongside it. Re-run after any change to the file (don't edit the generated HTML directly; edit `build.js`).
- **Eleventy passthrough**: `Offline/` is in `.eleventy.js` so the dev server serves it at `/Offline/tofupass-offline.html`. The file is a peer of the site, not a route inside it.

## Easter egg

Konami code (↑↑↓↓←→←→BA) navigates to `/cheater/`. Listener lives in `assets/js/konami.js` and is loaded globally. Inputs/textareas/contenteditable reset the sequence so it never fires while typing.

## Preview quirks

- `navigator.clipboard` is blocked inside the preview iframe ("Document is not focused") — not a real bug, test clipboard flows on a real browser.
- `preview_screenshot` sometimes times out on fresh navigations; `preview_eval` works fine and is a good fallback for verification.
