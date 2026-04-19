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

## Easter egg

Konami code (↑↑↓↓←→←→BA) navigates to `/cheater/`. Listener lives in `assets/js/konami.js` and is loaded globally. Inputs/textareas/contenteditable reset the sequence so it never fires while typing.

## Preview quirks

- `navigator.clipboard` is blocked inside the preview iframe ("Document is not focused") — not a real bug, test clipboard flows on a real browser.
- `preview_screenshot` sometimes times out on fresh navigations; `preview_eval` works fine and is a good fallback for verification.
