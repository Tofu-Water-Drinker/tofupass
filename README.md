# TofuPass

Readable passwords for real-world handoffs.

TofuPass makes strong, readable passwords for the moments password managers are awkward: helpdesk resets, Wi-Fi credentials, classroom setup, family tech support, device logins, demos, and other places where random character soup is painful to type, say, teach, or hand off.

Use your password manager for most passwords. Use TofuPass when a password needs to be read, typed, spoken, taught, printed, reset, or shared temporarily. TofuPass does not store, sync, autofill, manage, or remember passwords.

**Live site:** [tofupass.com](https://tofupass.com)
**API backend:** [tofupass-api](https://github.com/Tofu-Water-Drinker/tofupass-api) (separate repo)

## What it does

- Generates readable passwords in the browser using curated word lists + `crypto.getRandomValues()` (the Web Crypto CSPRNG)
- Three web generator tiers: Soft (2 capped words + symbol + two digits), Firm (3 capped words + symbol + two digits), Extra Firm (4 capped words + symbol + two digits)
- Dedicated passphrase generator for long readable word sequences
- Includes a **Stress Tester** that checks passwords against Have I Been Pwned using k-Anonymity (only a 5-char hash prefix leaves your device)
- Offers a free **[API](https://github.com/Tofu-Water-Drinker/tofupass-api)** for server-side programmatic generation. The API returns generated values in the response and should not be described as on-device generation.

No accounts. No ads. No analytics. No tracking pixels. The web generator works locally in your browser after the page loads.

## Tech stack

- [Eleventy](https://www.11ty.dev/) v3 — static site generator, Nunjucks templates
- [Tailwind CSS](https://tailwindcss.com/) via CDN (dark mode: class-based)
- Vanilla JS — no framework, no build step for scripts
- [Electron](https://www.electronjs.org/) + electron-builder — optional desktop app packaging
- [Alpine.js](https://alpinejs.dev/) (FAQ page only, via jsDelivr)
- [Bunny Fonts](https://fonts.bunny.net/) — privacy-friendly Google Fonts alternative

## Local development

Requires Node.js 18+.

```bash
npm install
npm start      # dev server with live-reload at http://localhost:8080
npm run build  # production build -> _site/
npm run clean  # remove _site/
```

## Desktop app builds

`Offline/tofupass-offline.html` is the desktop download page by default. Electron loads the same file with `?shell=desktop`, which reveals the local-only generator and lets each OS show its native window controls.

```bash
npm run desktop      # open the Electron desktop app locally
npm run dist:mac     # build a macOS .dmg on macOS
npm run dist:win     # build a Windows .exe on Windows
npm run dist:linux   # build a Linux .AppImage on Linux
```

Release artifacts are written to `release/`. Cross-platform downloadable builds are handled by `.github/workflows/desktop-release.yml`: push a `v*` tag or run the workflow manually to produce Windows `.exe`, macOS `.dmg`, and Linux `.AppImage` artifacts.

The macOS build is currently unsigned/not notarized. That is fine for internal testing, but public macOS releases should be signed with an Apple Developer ID and notarized so users do not hit Gatekeeper warnings.

## Project structure

```
.
├── .eleventy.js            # Eleventy config
├── src/
│   ├── _data/nav.js        # shared nav config
│   ├── _includes/base.njk  # shared layout (head, nav, footer)
│   ├── index.njk           # home / generator
│   ├── about/              # FAQ
│   ├── api/                # API docs
│   ├── good/               # password guide
│   ├── miso/               # mascot page
│   ├── passphrases/        # passphrase generator
│   ├── privacy/            # privacy policy
│   ├── stresstest/         # HIBP k-anonymity check
│   └── why/                # why TofuPass
├── assets/
│   ├── css/                # per-page stylesheets
│   └── js/
│       ├── home.js         # generator logic
│       ├── stresstest.js   # HIBP client
│       ├── api.js, nav.js, theme.js, konami.js
│       ├── wordlists.js          # (GITIGNORED — production lists)
│       └── wordlists.sample.js   # public stub to keep clones working
├── desktop/
│   └── main.js             # Electron desktop wrapper
├── Offline/
│   ├── build.js            # single-file offline app generator
│   └── tofupass-offline.html
├── tofu.png, alert.png, excited.png, favicon.ico
├── robots.txt, sitemap.xml
└── LICENSE
```

## A note on the word lists

The curated word lists used on the production site are **intentionally kept private** to keep password outputs less predictable. They are not distributed with this repo. A minimal stub lives at `assets/js/wordlists.sample.js` that clones use automatically — the generator will work out of the box, it'll just draw from a smaller pool.

The current private English production list has 848 adjective entries and 3,344 noun entries, with 3,991 unique words across both pools. The public API, offline build, and translated generators use separately maintained word lists, so do not reuse the English browser-generator count for those surfaces unless they are regenerated too.

If you want bigger lists, drop in your own `assets/js/wordlists.js` (same shape as the sample: `adjectives`, `nouns`, `specials` arrays on `window`). The real file is gitignored so your local copy won't leak into commits.

## License

**Code:** [GNU GPL v3](LICENSE). You're free to fork, modify, and self-host — but forks must remain open-source under GPL v3. See the full text in [LICENSE](LICENSE).

**Brand assets (all rights reserved):** The "TofuPass" name and the Miso mascot artwork (`tofu.png`, `alert.png`, `excited.png`, and any derivatives) are **not** covered by the GPL and remain the exclusive property of Matthew Johnson / TofuWater. If you publish a public fork, **use your own branding and mascot**.

## Contributing

Issues and PRs welcome. This is a small personal project, so responses may be unhurried — but I do read everything. Please don't open PRs that add analytics, tracking, or any server-side data collection; those will be closed on sight.

## Credits

Built by [Matthew Johnson / TofuWater](https://tofuwater.com/).
