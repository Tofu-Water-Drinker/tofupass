# AGENTS.md — TofuPass

Notes for AI agents working on this repo. Keep this file current: add rules you wish you'd known before starting, and trim anything that goes stale.

## Project shape

Static Eleventy site. Source lives in `src/`, Eleventy writes `_site/`, and vanilla HTML/CSS/JS is served as-is after build.
- **Styling**: Tailwind via CDN (`darkMode: 'class'`) + per-page CSS files under `assets/css/`.
- **JS**: vanilla scripts under `assets/js/`, one per page plus shared helpers (`nav.js`, `language.js`, `theme.js`, `konami.js`).
- **Templates**: pages are Nunjucks files under `src/`; shared head/nav/footer live in `src/_includes/base.njk`.
- **Build/dev**: `npm run build` runs Eleventy into `_site/`; `npm start` serves the site locally. Do not edit `_site/` directly.
- **Localized pages**: supported prefixes are `es`, `pt`, `fr`, `de`, `ja`, `zh-cn`, `ar`, `id`, `hi`, and `ru`. Localized page bodies are duplicated under `src/<locale>/`.
- **Navigation/footer data**: English primary nav comes from `src/_data/nav.js`; most localized nav/footer labels are in `src/_includes/base.njk`. Spanish also has `src/es/es.11tydata.js`, including a `footerNavItems` override, so site-wide footer changes must be mirrored there.
- **Route exposure**: public routes can also appear in `assets/js/language.js` and `sitemap.xml`; update both when hiding, adding, or removing a visible route.
- **Printable API guide**: `assets/docs/tofupass-api-guide.html` is the source for `assets/docs/tofupass-api-guide.pdf`; update the HTML and run `npm run build:api-pdf` when API docs change.
- **PWA status**: the site does not currently ship a service worker or manifest. "Offline" means the web generator keeps working after the page is loaded, plus the separate single-file app in `Offline/`.

## Conventions

### Colors & theming
- The warm palette lives in CSS custom properties in `assets/css/base.css` (`:root` for light, `html.dark` for dark).
- **Never hardcode `#FFF8F0`, `#4A3728`, `#8B7355`, `#6B5744` in new CSS** — use `var(--bg)`, `var(--text-primary)`, `var(--text-secondary)`, `var(--text-tertiary)`.
- Accent colors (green `#6BBF59`, pink `#FF7A7A`, yellow `#FFD166`, purple `#9B6DD7`, blue `#5B9FD6`) stay hardcoded — they work in both themes.
- When adding inline Tailwind color classes, always pair them with a `dark:` variant, e.g. `text-[#4A3728] dark:text-[#F0E6D8]`.

### Scripts
- **Every page's `<head>`** should come through `base.njk`, which includes the FOUC-prevention theme script before the stylesheet loads.
- **Every page's bottom** should come through `base.njk`, which loads `nav.js`, `language.js`, `theme.js`, and `konami.js` in that order.
- Do not load Tailwind without the `tailwind.config = { darkMode: 'class' }` script immediately after the CDN tag.

### Nav structure
The nav bar uses `flex justify-between` with exactly two children:
1. Left: logo wrapper
2. Right: one flex container holding **nav-links → theme-toggle → language-switcher → nav-toggle (hamburger)** in that order

Putting the toggle as a standalone sibling breaks `justify-between` (it ends up centered). Always nest toggle buttons inside the right-side wrapper.

### Footer/external links
- The site-wide footer is generated in `src/_includes/base.njk`; update both `localizedFooter` and `defaultFooterLinks` when adding footer links.
- If a locale defines `footerNavItems` (currently Spanish in `src/es/es.11tydata.js`), mirror the same footer link changes there.
- Social/support links are separate from nav links. Add icon-only actions to `defaultFooterSocialLinks` in `src/_includes/base.njk` so future social accounts do not crowd the main footer nav.
- Footer social items without `href` render as non-clickable placeholder icons; use that for accounts that are planned but not live yet.
- External footer links should use `external: true` so `base.njk` emits `target="_blank" rel="noopener noreferrer"`.

### Clipboard
`navigator.clipboard.writeText()` silently fails on HTTP or restricted mobile contexts. Any new copy-to-clipboard code must include a `textarea + document.execCommand('copy')` fallback, matching the pattern in `home.js` `copyPassword()`.

## Offline / desktop-forward build

`Offline/tofupass-offline.html` is a single-file, fully self-contained version of the generator. **No external CSS, JS, fonts, images, or CDNs.** Open from `file://` and it works.

- **Generation logic** mirrors `assets/js/home.js` exactly (Soft / Firm / Extra Firm). If you change generation behavior in `home.js`, change it here too — the brief is "same outputs as the live site."
- **Word lists** are copied from the public `tofupass-api` repo (GPL v3) — lowercase, deduped — *not* the private `assets/js/wordlists.js`. The offline file is shipped in this repo, so it must only ever embed public lists.
- **English production word-list counts** are mentioned on `/good/` and in `README.md`. If the private `assets/js/wordlists.js` list changes, recalculate the unique adjective/noun totals and Soft combination count, then update those references. Do not apply the English browser-generator count to the API, offline app, or translated generators unless those separate lists are regenerated too.
- **No `Math.random`** — only `crypto.getRandomValues` (and `crypto.subtle.digest` for the breach check).
- **Stress tester** preserves the same HIBP k-anonymity flow (5-char SHA-1 prefix → `api.pwnedpasswords.com`). It auto-disables when `navigator.onLine === false` and listens for `online`/`offline` events.
- **Visual style is light-mode-only and desktop-utility**: title bar with traffic-light dots, status pill, app window card. Avoid SaaS hero / marketing energy here even if it sneaks into the live site.
- **Mascot** is a tiny inline SVG, not the production Miso PNG (single-file constraint). Brand carve-out in `LICENSE` still applies — public forks must replace it.
- **Self-tests** live in the same file behind `?test=1` and assert generator behavior. Add to them (don't drop them) when you change generation.
- **Build script**: `Offline/build.js` regenerates the HTML by inlining word lists from the sibling `tofupass-api` repo. Run with `node Offline/build.js`. Override the API path via `TOFUPASS_API_PATH=/some/where/tofupass-api`. The script is a build helper — the HTML is the artifact and is checked in alongside it. Re-run after any change to the file (don't edit the generated HTML directly; edit `build.js`).
- **Eleventy passthrough**: `Offline/` is in `.eleventy.js` so the dev server serves it at `/Offline/tofupass-offline.html`. The file is a peer of the site, not a route inside it.

## Easter egg

Konami code (↑↑↓↓←→←→BA) navigates to `/cheater/`. Listener lives in `assets/js/konami.js` and is loaded globally. Inputs/textareas/contenteditable reset the sequence so it never fires while typing.

## Preview quirks

- `navigator.clipboard` is blocked inside the preview iframe ("Document is not focused") — not a real bug, test clipboard flows on a real browser.
- `preview_screenshot` sometimes times out on fresh navigations; `preview_eval` works fine and is a good fallback for verification.
