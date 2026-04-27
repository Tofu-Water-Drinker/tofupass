# TofuPass

A privacy-focused, client-side password generator. Everything runs in your browser. No server ever sees what you generate.

**Live site:** [tofupass.com](https://tofupass.com)
**API backend:** [tofupass-api](https://github.com/Tofu-Water-Drinker/tofupass-api) (separate repo)

## What it does

- Generates memorable passwords using curated word lists + `crypto.getRandomValues()` (the Web Crypto CSPRNG)
- Three strength tiers: Soft (word+word+number), Firm (symbol+Word+Word+number), Extra Firm (four-word passphrase)
- Includes a **Stress Tester** that checks passwords against Have I Been Pwned using k-Anonymity (only a 5-char hash prefix leaves your device)
- Offers a free **[API](https://github.com/Tofu-Water-Drinker/tofupass-api)** for programmatic generation. No auth, no rate limiting.

No accounts. No analytics. No cookies. No tracking pixels. Works offline once loaded.

## Tech stack

- [Eleventy](https://www.11ty.dev/) v3 (static site generator, Nunjucks templates)
- [Tailwind CSS](https://tailwindcss.com/) via CDN (dark mode: class-based)
- Vanilla JS (no framework, no build step for scripts)
- [Alpine.js](https://alpinejs.dev/) (FAQ page only, via jsDelivr)
- [Bunny Fonts](https://fonts.bunny.net/) (privacy-friendly Google Fonts alternative)

## Local development

Requires Node.js 18+.

```bash
npm install
npm start      # dev server with live-reload at http://localhost:8080
npm run build  # production build -> _site/
npm run clean  # remove _site/
```

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
│   ├── privacy/            # privacy policy
│   ├── stresstest/         # HIBP k-anonymity check
│   └── why/                # why TofuPass
├── assets/
│   ├── css/                # per-page stylesheets
│   └── js/
│       ├── home.js         # generator logic
│       ├── stresstest.js   # HIBP client
│       ├── api.js, nav.js, theme.js, konami.js
│       ├── wordlists.js          # (gitignored, production lists)
│       └── wordlists.sample.js   # public stub to keep clones working
├── tofu.png, alert.png, excited.png, favicon.ico
├── robots.txt, sitemap.xml
└── LICENSE
```

## A note on the word lists

The curated word lists used on the production site are **intentionally kept private** to keep password outputs less predictable. They are not distributed with this repo. A minimal stub lives at `assets/js/wordlists.sample.js` that clones use automatically. The generator will work out of the box, it'll just draw from a smaller pool.

If you want bigger lists, drop in your own `assets/js/wordlists.js` (same shape as the sample: `adjectives`, `nouns`, `specials` arrays on `window`). The real file is gitignored so your local copy won't leak into commits.

## License

[GNU GPL v3](LICENSE). You're free to fork, modify, and self-host, but forks must remain open-source under GPL v3. See the full text in [LICENSE](LICENSE).

## Contributing

Issues and PRs welcome. This is a small personal project so responses may be slow, but I do read everything. Please don't open PRs that add analytics, tracking, or any server-side data collection; those will be closed on sight.

## Credits

Built by [Matthew Johnson / TofuWater](https://tofuwater.com/).

Big hat tip to [DinoPass](https://www.dinopass.com/). It's a genuinely great password generator that directly inspired this one. Friendly competition is the best kind.
