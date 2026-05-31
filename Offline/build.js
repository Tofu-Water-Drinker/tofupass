#!/usr/bin/env node
/*
 * build.js — emits Offline/tofupass-offline.html
 *
 * Reads the public word lists from the sibling `tofupass-api` repo
 * (https://github.com/Tofu-Water-Drinker/tofupass-api), lowercases and dedupes
 * them, then writes a single-file HTML with the lists inlined.
 *
 * Assumptions
 *   - This script lives at ./Offline/build.js inside the tofupass repo.
 *   - The tofupass-api repo is cloned as a sibling directory.
 *     i.e. ~/code/tofupass and ~/code/tofupass-api
 *
 * Run:
 *   node Offline/build.js
 *
 * The output file is fully self-contained. No external assets, no CDNs.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const apiRepo  = process.env.TOFUPASS_API_PATH
  || path.resolve(repoRoot, '..', 'tofupass-api');
const apiWordlists = path.join(apiRepo, 'wordlists.js');

if (!fs.existsSync(apiWordlists)) {
  console.error('error: could not find ' + apiWordlists);
  console.error('Clone tofupass-api as a sibling of tofupass, or set');
  console.error('TOFUPASS_API_PATH=/path/to/tofupass-api before running.');
  process.exit(1);
}

const w = require(apiWordlists);
const lower = (arr) => Array.from(new Set(arr.map((s) => String(s).toLowerCase().trim()).filter(Boolean)));
const adjectives = lower(w.firstWords);
const nouns      = lower(w.secondWords);

const arrLiteral = (arr) =>
  '[' + arr.map((x) => JSON.stringify(x)).join(',') + ']';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="light" />
<title>TofuPass — Offline Generator</title>
<!--
  TofuPass — single-file offline / desktop-forward generator.
  Inherits GPL v3 from the parent repo. Brand assets (the "TofuPass" name and
  the Miso mascot) are all rights reserved; this file uses a small inline SVG
  treatment of Miso, not the production PNG.

  Word lists below are copied from the public tofupass-api repo
  (https://github.com/Tofu-Water-Drinker/tofupass-api), also GPL v3.
  Generation logic mirrors assets/js/home.js to preserve existing behavior:
    - Soft        : 2 capped words + symbol + 2-digit number
    - Firm        : 3 capped words + symbol + 2-digit number
    - Extra Firm  : 4 capped words + symbol + 2-digit number

  All randomness uses Web Crypto's getRandomValues — never Math.random.
  No network calls happen during password generation.
  The Stress Tester sends only a 5-char SHA-1 prefix to api.pwnedpasswords.com
  (HIBP k-anonymity). It is automatically disabled when offline.

  Append ?test=1 to the URL (or location.search) to run a small console
  self-check of the generator behavior. See runSelfTests() at the bottom.
-->
<style>
  *, *::before, *::after { box-sizing: border-box; }

  :root {
    --bg-page:        #EDE6D8;
    --bg-window:      #FFFBF3;
    --bg-titlebar:    #F4ECDC;
    --bg-panel:       #FAF3E4;
    --bg-panel-soft:  #FFF8EA;
    --border-soft:    rgba(74, 55, 40, 0.12);
    --border-strong:  rgba(74, 55, 40, 0.22);
    --text-primary:   #4A3728;
    --text-secondary: #8B7355;
    --text-tertiary:  #B8A890;
    --accent-green:   #6BBF59;
    --accent-green-d: #4A9F3F;
    --accent-yellow:  #E6A800;
    --accent-pink:    #FF7A7A;
    --accent-purple:  #9B6DD7;
    --accent-blue:    #5B9FD6;
    --shadow-window:  0 24px 48px -16px rgba(74, 55, 40, 0.28),
                      0 8px 16px -8px rgba(74, 55, 40, 0.18);
    --shadow-inset:   inset 0 1px 0 rgba(255, 255, 255, 0.6);
    --radius-window:  16px;
    --radius-panel:   12px;
    --font-sans:      -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter",
                      "Helvetica Neue", system-ui, sans-serif;
    --font-mono:      "SF Mono", "JetBrains Mono", "Menlo", "Consolas", monospace;
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: var(--font-sans);
    color: var(--text-primary);
    background: var(--bg-page);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
  }
  body {
    min-height: 100vh;
    padding: clamp(12px, 4vw, 48px);
    display: grid;
    place-items: start center;
    background:
      radial-gradient(1200px 600px at 50% -10%, rgba(107,191,89,0.10), transparent 60%),
      radial-gradient(800px 600px at 100% 100%, rgba(155,109,215,0.08), transparent 60%),
      var(--bg-page);
  }

  .window {
    width: 100%;
    max-width: 720px;
    background: var(--bg-window);
    border-radius: var(--radius-window);
    border: 1px solid var(--border-soft);
    box-shadow: var(--shadow-window);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .titlebar {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    background: var(--bg-titlebar);
    border-bottom: 1px solid var(--border-soft);
    user-select: none;
  }
  .window-dots { display: inline-flex; gap: 6px; flex-shrink: 0; }
  .window-dots .dot {
    width: 12px; height: 12px; border-radius: 50%;
    border: 1px solid rgba(0,0,0,0.08);
    box-shadow: var(--shadow-inset);
  }
  .dot-red    { background: #FF7A7A; }
  .dot-yellow { background: #FFD166; }
  .dot-green  { background: #6BBF59; }

  .title-text {
    flex: 1 1 auto; min-width: 0;
    display: flex; align-items: center; gap: 8px;
    font-size: 12.5px;
    color: var(--text-secondary);
    letter-spacing: 0.01em;
    overflow: hidden;
    white-space: nowrap;
  }
  .title-text > span:last-child {
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }
  .title-text strong { color: var(--text-primary); font-weight: 700; }
  .title-text .brand-mark {
    display: inline-flex; width: 18px; height: 18px;
    flex-shrink: 0;
  }
  .title-text .brand-mark svg { width: 100%; height: 100%; }

  .status-pill {
    flex-shrink: 0;
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 11px; font-weight: 600;
    background: rgba(107,191,89,0.10);
    color: var(--accent-green-d);
    border: 1px solid rgba(107,191,89,0.22);
    white-space: nowrap;
  }
  /* On very narrow widths, drop the subtitle so the title and status fit */
  @media (max-width: 480px) {
    .title-text > span:last-child .subtitle { display: none; }
  }
  .status-pill .status-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent-green);
    box-shadow: 0 0 0 2px rgba(107,191,89,0.18);
  }
  .status-pill.is-offline { background: rgba(139,115,85,0.10); color: var(--text-secondary); border-color: rgba(139,115,85,0.22); }
  .status-pill.is-offline .status-dot { background: var(--text-secondary); box-shadow: 0 0 0 2px rgba(139,115,85,0.18); }

  .toolbar {
    display: flex;
    gap: 6px;
    padding: 10px 12px 0;
  }
  .mode-btn {
    flex: 1;
    appearance: none;
    background: transparent;
    color: var(--text-secondary);
    border: 1px solid transparent;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 13px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: background 120ms ease, color 120ms ease, border-color 120ms ease;
  }
  .mode-btn:hover { color: var(--text-primary); background: rgba(74,55,40,0.04); }
  .mode-btn[aria-selected="true"] {
    background: var(--bg-panel);
    color: var(--text-primary);
    border-color: var(--border-soft);
    box-shadow: var(--shadow-inset);
  }
  .mode-btn:focus-visible { outline: 2px solid var(--accent-green); outline-offset: 2px; }

  .generator { padding: 14px 18px 18px; }
  .mode-desc {
    margin: 4px 4px 12px;
    font-size: 12px;
    color: var(--text-secondary);
    min-height: 16px;
  }

  .password-panel {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    width: 100%;
    padding: 22px 14px 16px;
    background: var(--bg-panel);
    border: 1px solid var(--border-soft);
    border-radius: var(--radius-panel);
    cursor: pointer;
    transition: background 160ms ease, border-color 160ms ease, transform 80ms ease;
    text-align: center;
    appearance: none;
    font-family: inherit;
    color: inherit;
  }
  .password-panel:hover { border-color: var(--border-strong); background: var(--bg-panel-soft); }
  .password-panel:active { transform: translateY(1px); }
  .password-panel:focus-visible { outline: 2px solid var(--accent-green); outline-offset: 2px; }
  .password-panel.copied { border-color: rgba(107,191,89,0.45); background: rgba(107,191,89,0.06); }

  .password-display {
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: clamp(20px, 4.5vw, 28px);
    line-height: 1.25;
    color: var(--accent-green-d);
    word-break: break-all;
    letter-spacing: -0.005em;
    margin: 0;
  }
  .password-display.is-refresh { animation: pwFade 320ms ease both; }
  @keyframes pwFade {
    0%   { opacity: 0; transform: translateY(2px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .password-hint {
    margin-top: 10px;
    font-size: 10.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: var(--text-tertiary);
  }
  .password-panel.copied .password-hint { color: var(--accent-green-d); }

  .actions {
    margin-top: 12px;
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr;
    gap: 8px;
  }
  @media (max-width: 480px) {
    .actions { grid-template-columns: 1fr 1fr; }
    .actions .btn.primary { grid-column: 1 / -1; }
  }
  .btn {
    appearance: none;
    border: 1px solid var(--border-soft);
    background: var(--bg-window);
    color: var(--text-primary);
    border-radius: 10px;
    padding: 10px 14px;
    font-size: 13px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: background 120ms ease, border-color 120ms ease, transform 80ms ease, color 120ms ease;
  }
  .btn:hover { border-color: var(--border-strong); background: var(--bg-panel-soft); }
  .btn:active { transform: translateY(1px); }
  .btn:focus-visible { outline: 2px solid var(--accent-green); outline-offset: 2px; }
  .btn[disabled] { opacity: 0.5; cursor: not-allowed; }
  .btn.primary {
    background: linear-gradient(180deg, #7DD668 0%, var(--accent-green) 100%);
    color: #ffffff;
    border-color: rgba(74,159,63,0.5);
    box-shadow: 0 1px 0 rgba(255,255,255,0.35) inset, 0 1px 2px rgba(74,55,40,0.18);
  }
  .btn.primary:hover { filter: brightness(1.03); }
  .btn.ghost { background: transparent; }
  .btn.small { padding: 6px 10px; font-size: 12px; }

  .phonetic {
    margin: 0 18px 14px;
    padding: 12px;
    background: var(--bg-panel-soft);
    border: 1px solid var(--border-soft);
    border-radius: var(--radius-panel);
  }
  .phonetic[hidden] { display: none; }
  .phonetic-tabs {
    display: flex; align-items: center; gap: 6px;
    margin-bottom: 10px;
  }
  .phon-tab {
    appearance: none;
    background: transparent;
    border: 1px solid var(--border-soft);
    color: var(--text-secondary);
    border-radius: 8px;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
  }
  .phon-tab.active { background: var(--bg-window); color: var(--text-primary); border-color: var(--border-strong); }
  .phon-tab:focus-visible { outline: 2px solid var(--accent-green); outline-offset: 2px; }
  #copyPhoneticBtn { margin-left: auto; }
  .phonetic-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 6px;
  }
  .phon-item {
    display: flex; align-items: baseline; gap: 6px;
    background: var(--bg-window);
    border: 1px solid var(--border-soft);
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 12px;
  }
  .phon-item .phon-char {
    font-family: var(--font-mono);
    font-weight: 700;
    color: var(--text-primary);
    min-width: 14px;
    text-align: center;
  }
  .phon-item .phon-arrow { color: var(--text-tertiary); }
  .phon-item .phon-word { color: var(--text-secondary); }
  .phon-item.is-uppercase .phon-word { color: var(--accent-purple); }
  .phon-item.is-number    .phon-word { color: var(--accent-blue); }
  .phon-item.is-symbol    .phon-word { color: var(--accent-pink); }
  .phon-empty { color: var(--text-tertiary); font-size: 12px; padding: 4px 2px; }

  .stresstest {
    margin: 0 18px 14px;
    border: 1px solid var(--border-soft);
    border-radius: var(--radius-panel);
    background: var(--bg-window);
    overflow: hidden;
  }
  .stresstest details { padding: 0; }
  .stresstest summary {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 14px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
    list-style: none;
  }
  .stresstest summary::-webkit-details-marker { display: none; }
  .stresstest summary::after {
    content: "›";
    margin-left: auto;
    color: var(--text-tertiary);
    transform: rotate(90deg);
    transition: transform 150ms ease;
  }
  .stresstest details[open] summary::after { transform: rotate(-90deg); }
  .online-pill {
    display: inline-flex; align-items: center; gap: 6px;
    margin-left: 6px;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 10.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: rgba(91,159,214,0.10);
    color: var(--accent-blue);
    border: 1px solid rgba(91,159,214,0.30);
  }
  .online-pill.is-offline { background: rgba(139,115,85,0.10); color: var(--text-secondary); border-color: rgba(139,115,85,0.22); }

  .stresstest-body { padding: 0 14px 14px; }
  .muted { color: var(--text-secondary); font-size: 12px; line-height: 1.5; margin: 0 0 10px; }
  .field {
    display: flex; align-items: center; gap: 8px;
    background: var(--bg-panel-soft);
    border: 1px solid var(--border-soft);
    border-radius: 8px;
    padding: 8px 10px;
  }
  .field-label { display: none; }
  .field input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font: inherit;
    font-family: var(--font-mono);
    color: var(--text-primary);
    min-width: 0;
  }
  .field input::placeholder { color: var(--text-tertiary); }
  .link-btn {
    appearance: none;
    border: none;
    background: transparent;
    color: var(--text-secondary);
    font: inherit;
    font-size: 12px;
    font-weight: 600;
    padding: 2px 6px;
    cursor: pointer;
  }
  .link-btn:hover { color: var(--text-primary); }
  .link-btn:focus-visible { outline: 2px solid var(--accent-green); outline-offset: 2px; border-radius: 4px; }

  .stress-result { margin-top: 12px; display: grid; gap: 10px; }
  .stress-result[hidden] { display: none; }
  .stress-result .stress-stat {
    display: inline-flex; gap: 6px; font-size: 12px; margin-right: 12px;
  }
  .stress-result .stress-stat b { color: var(--text-primary); }
  .stress-meter {
    width: 100%; height: 8px;
    background: rgba(74,55,40,0.08);
    border-radius: 999px;
    overflow: hidden;
  }
  .stress-meter-fill {
    height: 100%; width: 0%;
    background: var(--accent-green);
    transition: width 240ms ease, background 240ms ease;
  }
  .stress-time {
    display: flex; align-items: center; gap: 10px;
    font-size: 14px;
    color: var(--accent-green-d);
    font-weight: 700;
  }
  .stress-label {
    margin-left: auto;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 3px 8px;
    border-radius: 999px;
    background: rgba(107,191,89,0.10);
    color: var(--accent-green-d);
  }
  .breach {
    background: rgba(255,122,122,0.08);
    border: 1px solid rgba(255,122,122,0.32);
    color: #B8443D;
    padding: 8px 10px;
    border-radius: 8px;
    font-size: 12.5px;
  }
  .breach[hidden] { display: none; }

  .local-foot {
    display: flex; flex-wrap: wrap; gap: 8px;
    align-items: center;
    padding: 10px 18px 14px;
    border-top: 1px solid var(--border-soft);
    background: var(--bg-titlebar);
    color: var(--text-tertiary);
    font-size: 11px;
  }
  .local-foot code {
    font-family: var(--font-mono);
    font-size: 10.5px;
    color: var(--text-secondary);
  }
  .local-foot .version { margin-left: auto; }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .password-display.is-refresh { animation: none; }
    .stress-meter-fill { transition: none; }
  }

  /* Print: dump just the password */
  @media print {
    body { background: #fff; padding: 0; }
    .titlebar, .toolbar, .actions, .phonetic, .stresstest, .local-foot { display: none !important; }
    .window { box-shadow: none; border: none; }
  }
</style>
</head>
<body>

<main class="window" role="main" aria-label="TofuPass offline password generator">

  <header class="titlebar">
    <span class="window-dots" aria-hidden="true">
      <span class="dot dot-red"></span>
      <span class="dot dot-yellow"></span>
      <span class="dot dot-green"></span>
    </span>
    <span class="title-text">
      <span class="brand-mark" aria-hidden="true">
        <!-- Tasteful inline Miso: rounded square with two eyes + a smile. No external assets. -->
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Miso">
          <rect x="2" y="3" width="20" height="18" rx="5" fill="#FFFBF3" stroke="#6BBF59" stroke-width="1.6"/>
          <circle cx="9"  cy="11" r="1.4" fill="#4A3728"/>
          <circle cx="15" cy="11" r="1.4" fill="#4A3728"/>
          <path d="M9 15.2 Q12 17.4 15 15.2" stroke="#4A3728" stroke-width="1.4" fill="none" stroke-linecap="round"/>
          <ellipse cx="6.6" cy="13.8" rx="1.1" ry="0.7" fill="#FFC2C2" opacity="0.7"/>
          <ellipse cx="17.4" cy="13.8" rx="1.1" ry="0.7" fill="#FFC2C2" opacity="0.7"/>
        </svg>
      </span>
      <span><strong>TofuPass</strong><span class="subtitle"> &middot; Local password generator</span></span>
    </span>
    <span class="status-pill" id="statusPill" title="No network needed for password generation.">
      <span class="status-dot"></span>
      <span id="statusText">Local &middot; offline-ready</span>
    </span>
  </header>

  <div class="toolbar" role="tablist" aria-label="Strength mode">
    <button class="mode-btn" role="tab" aria-selected="false" data-mode="soft"  type="button">Soft</button>
    <button class="mode-btn" role="tab" aria-selected="true"  data-mode="firm"  type="button">Firm</button>
    <button class="mode-btn" role="tab" aria-selected="false" data-mode="extra" type="button">Extra Firm</button>
  </div>

  <section class="generator">
    <p class="mode-desc" id="modeDesc">Capitalized word + word + 2-digit number, with one symbol sprinkled in.</p>

    <button id="passwordPanel" class="password-panel" type="button" aria-label="Generated password. Click to copy.">
      <output id="passwordDisplay" class="password-display" aria-live="polite">…</output>
      <span id="passwordHint" class="password-hint">Click password to copy</span>
    </button>

    <div class="actions">
      <button id="regenBtn"    class="btn primary" type="button" aria-keyshortcuts="Space" title="Regenerate (Space)">Regenerate</button>
      <button id="copyBtn"     class="btn"        type="button" aria-keyshortcuts="C">Copy</button>
      <button id="phoneticBtn" class="btn ghost"  type="button" aria-expanded="false" aria-controls="phoneticPanel">Phonetic</button>
    </div>
  </section>

  <section class="phonetic" id="phoneticPanel" hidden>
    <div class="phonetic-tabs" role="tablist" aria-label="Phonetic mode">
      <button class="phon-tab active" role="tab" aria-selected="true"  data-mode="military" type="button">NATO</button>
      <button class="phon-tab"        role="tab" aria-selected="false" data-mode="kid"      type="button">Kid-friendly</button>
      <button id="copyPhoneticBtn" class="btn ghost small" type="button" title="Copy a support-friendly spelled-out version">Copy spelled-out</button>
    </div>
    <div id="phoneticList" class="phonetic-list" aria-live="polite"></div>
  </section>

  <section class="stresstest" id="stresstestPanel">
    <details>
      <summary>
        <span>Privacy-preserving breach &amp; strength check</span>
        <span class="online-pill" id="onlinePill"><span>Online-only</span></span>
      </summary>
      <div class="stresstest-body">
        <p class="muted">
          This check uses
          <a href="https://haveibeenpwned.com/Passwords" target="_blank" rel="noopener noreferrer">Have I Been Pwned</a>
          via k-anonymity: only the first 5 characters of the SHA-1 hash are sent to Have I Been Pwned. Your password itself is not sent. Disabled when you're offline.
        </p>
        <label class="field">
          <span class="field-label">Password to test</span>
          <input id="stresspwd" type="password" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" placeholder="Type or paste a password to test" />
          <button class="link-btn" id="stressVis" type="button" aria-pressed="false">Show</button>
        </label>
        <div class="stress-result" id="stressResult" hidden>
          <div>
            <span class="stress-stat"><span class="muted">Length</span><b id="statLen">0</b></span>
            <span class="stress-stat"><span class="muted">Pool</span><b id="statPool">0</b></span>
            <span class="stress-stat"><span class="muted">Entropy</span><b id="statEntropy">0</b> bits</span>
          </div>
          <div class="stress-meter"><div id="meterFill" class="stress-meter-fill"></div></div>
          <div class="stress-time">
            <span id="timeDisplay">Not yet</span>
            <span id="strengthLabel" class="stress-label">Waiting</span>
          </div>
          <div id="breachCard" class="breach" hidden>This password appeared in <b id="breachCount">0</b> known data breaches.</div>
        </div>
      </div>
    </details>
  </section>

  <footer class="local-foot">
    <span>Generated locally with <code>crypto.getRandomValues</code>. Nothing saved; breach checks only send a hash prefix.</span>
    <span class="version">Offline v1 &middot; GPL v3</span>
  </footer>

</main>

<script>
/* ===========================================================================
   TofuPass — Offline single-file generator
   ===========================================================================
   Inherits GPL v3 from the parent repo. Word lists below are copied from the
   public tofupass-api repo, also GPL v3.

   The generator behavior intentionally mirrors assets/js/home.js so this
   offline version stays consistent with the live site.
=========================================================================== */

(function () {
  'use strict';

  // --- Public word lists (lowercase, deduped from tofupass-api) ----------- //
  var adjectives = ${arrLiteral(adjectives)};
  var nouns      = ${arrLiteral(nouns)};
  var specials   = ['!', '@', '#', '$', '?', '*'];

  // --- Phonetic dictionaries (mirrors home.js) --------------------------- //
  var natoAlphabet = {a:'alpha',b:'bravo',c:'charlie',d:'delta',e:'echo',f:'foxtrot',g:'golf',h:'hotel',i:'india',j:'juliett',k:'kilo',l:'lima',m:'mike',n:'november',o:'oscar',p:'papa',q:'quebec',r:'romeo',s:'sierra',t:'tango',u:'uniform',v:'victor',w:'whiskey',x:'x-ray',y:'yankee',z:'zulu'};
  var kidAlphabet  = {a:'apple',b:'bear',c:'cat',d:'dog',e:'elephant',f:'frog',g:'giraffe',h:'hat',i:'igloo',j:'juice',k:'kite',l:'lion',m:'monkey',n:'nest',o:'octopus',p:'penguin',q:'queen',r:'rabbit',s:'sun',t:'turtle',u:'umbrella',v:'van',w:'whale',x:'xylophone',y:'yo-yo',z:'zebra'};
  var symbolNames  = {'!':'Exclamation Mark','@':'At Symbol','#':'Hash','$':'Dollar Sign','?':'Question Mark','*':'Asterisk'};
  var numberNames  = {'0':'zero','1':'one','2':'two','3':'three','4':'four','5':'five','6':'six','7':'seven','8':'eight','9':'nine'};

  // --- Mode descriptions (visible above the password) -------------------- //
  var modeDescriptions = {
    soft:  '2 words + symbol + number. Easiest to type for low-risk temporary uses.',
    firm:  '3 words + symbol + number. Recommended default for readable handoffs.',
    extra: '4 words + symbol + number. Stronger when a longer password is accepted.'
  };

  // --- Cryptographic random helpers (matches home.js getSecureRandomInt) // //
  function getSecureRandomInt(max) {
    if (!Number.isInteger(max) || max <= 0) {
      throw new Error('max must be a positive integer');
    }
    var buffer = new Uint32Array(1);
    var limit = Math.floor(0x100000000 / max) * max;

    do {
      window.crypto.getRandomValues(buffer);
    } while (buffer[0] >= limit);

    return buffer[0] % max;
  }
  function pick(list) { return list[getSecureRandomInt(list.length)]; }
  function cap(s)    { return s.charAt(0).toUpperCase() + s.slice(1); }

  /**
   * generate(firmness) — produces a password string. Mirrors home.js exactly.
   *   'soft'  -> adjective + noun + symbol + (10..99)
   *   'firm'  -> adjective + noun + noun + symbol + (10..99)
   *   'extra' -> adjective + noun + adjective + noun + symbol + (10..99)
   */
  function generate(firmness) {
    function buildPassword(words) {
      var number = String(getSecureRandomInt(90) + 10);
      var special = pick(specials);
      var parts = words.slice();
      parts.push(number);
      var insertAt = getSecureRandomInt(parts.length + 1);
      parts.splice(insertAt, 0, special);
      return parts.join('');
    }

    if (firmness === 'soft') {
      return buildPassword([cap(pick(adjectives)), cap(pick(nouns))]);
    } else if (firmness === 'firm') {
      return buildPassword([cap(pick(adjectives)), cap(pick(nouns)), cap(pick(nouns))]);
    }
    return buildPassword([cap(pick(adjectives)), cap(pick(nouns)), cap(pick(adjectives)), cap(pick(nouns))]);
  }

  // --- DOM wiring -------------------------------------------------------- //

  var $  = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

  var currentLevel    = 'firm';
  var currentPassword = '';
  var phoneticMode    = 'military';

  var passwordDisplay = $('#passwordDisplay');
  var passwordPanel   = $('#passwordPanel');
  var passwordHint    = $('#passwordHint');
  var modeDesc        = $('#modeDesc');
  var phoneticPanel   = $('#phoneticPanel');
  var phoneticList    = $('#phoneticList');
  var phoneticBtn     = $('#phoneticBtn');

  function setMode(level) {
    currentLevel = level;
    $$('.mode-btn').forEach(function (btn) {
      var on = btn.getAttribute('data-mode') === level;
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    modeDesc.textContent = modeDescriptions[level] || '';
    refresh();
  }

  function refresh() {
    var pwd = generate(currentLevel);
    currentPassword = pwd;
    passwordDisplay.classList.remove('is-refresh');
    /* force reflow to restart the animation */
    void passwordDisplay.offsetWidth;
    passwordDisplay.textContent = pwd;
    passwordDisplay.classList.add('is-refresh');
    passwordPanel.classList.remove('copied');
    passwordHint.textContent = 'Click password to copy';
    if (!phoneticPanel.hidden) renderPhonetic();
  }

  // Clipboard with the AGENTS.md-mandated textarea fallback.
  function copy(text, onSuccess) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try { document.execCommand('copy'); onSuccess && onSuccess(); }
      catch (_) { /* ignore */ }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onSuccess, fallback);
    } else { fallback(); }
  }

  function copyCurrent() {
    if (!currentPassword) return;
    copy(currentPassword, function () {
      passwordPanel.classList.add('copied');
      passwordHint.textContent = 'Copied to clipboard';
      setTimeout(function () {
        passwordHint.textContent = 'Click password to copy';
        passwordPanel.classList.remove('copied');
      }, 1800);
    });
  }

  // --- Phonetic helper (mirrors home.js describeCharacter / render) ----- //

  function describeCharacter(ch) {
    var dict     = (phoneticMode === 'military') ? natoAlphabet : kidAlphabet;
    var lower    = ch.toLowerCase();
    var isLetter = /[a-z]/i.test(ch);
    var isNumber = /\\d/.test(ch);
    var isSymbol = Boolean(symbolNames[ch]);
    var isUpper  = isLetter && ch !== lower;
    var word = symbolNames[ch] || numberNames[ch] || dict[lower] || ch;
    if (isUpper) word = word.charAt(0).toUpperCase() + word.slice(1);

    var tone = 'letter', detail = 'Letter', spoken = word;
    if (isUpper)         { tone = 'uppercase'; detail = 'Uppercase letter'; spoken = 'capital ' + word; }
    else if (isNumber)   { tone = 'number';    detail = 'Number'; }
    else if (isSymbol)   { tone = 'symbol';    detail = 'Symbol'; }

    return { char: ch, word: word, tone: tone, detail: detail, spoken: spoken };
  }

  function renderPhonetic() {
    phoneticList.innerHTML = '';
    var details = [].map.call(currentPassword, describeCharacter);
    if (!details.length) {
      var empty = document.createElement('div');
      empty.className = 'phon-empty';
      empty.textContent = 'Generate a password to see a readable phonetic spelling.';
      phoneticList.appendChild(empty);
      return;
    }
    details.forEach(function (d) {
      var row = document.createElement('div');
      row.className = 'phon-item is-' + d.tone;
      var c = document.createElement('span'); c.className = 'phon-char';  c.textContent = d.char; row.appendChild(c);
      var a = document.createElement('span'); a.className = 'phon-arrow'; a.setAttribute('aria-hidden','true'); a.textContent = '→'; row.appendChild(a);
      var w = document.createElement('span'); w.className = 'phon-word';  w.textContent = d.word; row.appendChild(w);
      phoneticList.appendChild(row);
    });
  }

  function spelledOut() {
    return [].map.call(currentPassword, describeCharacter).map(function (d) {
      return d.char + ' = ' + d.spoken;
    }).join('\\n');
  }

  function setPhoneticMode(mode) {
    phoneticMode = mode;
    $$('.phon-tab').forEach(function (btn) {
      var on = btn.getAttribute('data-mode') === mode;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    renderPhonetic();
  }

  function togglePhonetic() {
    var open = phoneticPanel.hidden;
    phoneticPanel.hidden = !open;
    phoneticBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) renderPhonetic();
  }

  // --- Online-only stress tester (k-anonymity HIBP, exactly as web app) - //

  var statusPill   = $('#statusPill');
  var statusText   = $('#statusText');
  var onlinePill   = $('#onlinePill');
  var stressInput  = $('#stresspwd');
  var stressResult = $('#stressResult');
  var statLen      = $('#statLen');
  var statPool     = $('#statPool');
  var statEntropy  = $('#statEntropy');
  var meterFill    = $('#meterFill');
  var timeDisplay  = $('#timeDisplay');
  var strengthLabel= $('#strengthLabel');
  var breachCard   = $('#breachCard');
  var breachCount  = $('#breachCount');
  var stressVis    = $('#stressVis');

  // Hardware speed assumption: ~10 billion guesses/sec (mid-tier GPU).
  // The live site offers a selector; for this compact UI we hardcode a
  // sensible default and surface the entropy value so power users can think
  // in bits.
  var GUESSES_PER_SEC = 1e10;

  function strengthFromScore(score) {
    if (score < 25) return { text: 'Very weak', color: '#FF7A7A', bg: 'rgba(255,122,122,0.10)' };
    if (score < 50) return { text: 'Weak',      color: '#FF9F6B', bg: 'rgba(255,159,107,0.10)' };
    if (score < 70) return { text: 'Moderate',  color: '#E6A800', bg: 'rgba(230,168,0,0.10)'   };
    if (score < 88) return { text: 'Strong',    color: '#6BBF59', bg: 'rgba(107,191,89,0.10)'  };
    return            { text: 'Very strong',     color: '#4A9F3F', bg: 'rgba(107,191,89,0.12)' };
  }

  function humanTime(seconds) {
    if (!isFinite(seconds)) return 'Eons';
    if (seconds < 1)         return 'Instantaneous';
    if (seconds < 60)        return Math.floor(seconds) + ' seconds';
    if (seconds < 3600)      return Math.floor(seconds/60) + ' minutes';
    if (seconds < 86400)     return Math.floor(seconds/3600) + ' hours';
    if (seconds < 31536000)  return Math.floor(seconds/86400) + ' days';
    if (seconds < 1e12)      return Math.floor(seconds/31536000).toLocaleString() + ' years';
    if (seconds < 1e15)      return (seconds/31536000/1e6).toFixed(1) + ' million years';
    return 'Eons';
  }

  function poolFor(value) {
    var pool = 0;
    if (/[a-z]/.test(value))        pool += 26;
    if (/[A-Z]/.test(value))        pool += 26;
    if (/[0-9]/.test(value))        pool += 10;
    if (/[^a-zA-Z0-9]/.test(value)) pool += 33;
    return pool;
  }

  function resetStressUI() {
    stressResult.hidden = true;
    breachCard.hidden = true;
    statLen.textContent = '0'; statPool.textContent = '0'; statEntropy.textContent = '0';
    meterFill.style.width = '0%'; meterFill.style.background = '';
    timeDisplay.textContent = 'Not yet';
    strengthLabel.textContent = 'Waiting';
    strengthLabel.style.color = ''; strengthLabel.style.background = '';
  }

  function renderStress(seconds, isBreached, count) {
    stressResult.hidden = false;
    if (isBreached) {
      breachCard.hidden = false;
      breachCount.textContent = (count || 0).toLocaleString();
      meterFill.style.width = '100%';
      meterFill.style.background = '#FF7A7A';
      timeDisplay.textContent = 'Compromised';
      strengthLabel.textContent = 'Compromised';
      strengthLabel.style.color = '#FF7A7A';
      strengthLabel.style.background = 'rgba(255,122,122,0.12)';
      return;
    }
    breachCard.hidden = true;
    var score = Math.max(0, Math.min(100, (Math.log10((seconds || 0) + 1) / 14) * 100));
    var label = strengthFromScore(score);
    meterFill.style.width = score + '%';
    meterFill.style.background = label.color;
    timeDisplay.textContent = humanTime(seconds);
    strengthLabel.textContent = label.text;
    strengthLabel.style.color = label.color;
    strengthLabel.style.background = label.bg;
  }

  function setOfflineUI(isOffline) {
    if (isOffline) {
      statusPill.classList.add('is-offline');
      statusText.textContent = 'Offline';
      onlinePill.classList.add('is-offline');
      onlinePill.firstElementChild.textContent = 'Disabled offline';
      stressInput.disabled = true;
      stressInput.placeholder = 'Reconnect to run the breach check';
    } else {
      statusPill.classList.remove('is-offline');
      statusText.textContent = 'Local · offline-ready';
      onlinePill.classList.remove('is-offline');
      onlinePill.firstElementChild.textContent = 'Online-only';
      stressInput.disabled = false;
      stressInput.placeholder = 'Type or paste a password to test';
    }
  }

  async function sha1Hex(value) {
    var data = new TextEncoder().encode(value);
    var buf  = await crypto.subtle.digest('SHA-1', data);
    var arr  = Array.from(new Uint8Array(buf));
    return arr.map(function (b) { return b.toString(16).padStart(2, '0'); }).join('').toUpperCase();
  }

  async function checkBreach(value) {
    try {
      var hash = await sha1Hex(value);
      var prefix = hash.substring(0, 5);
      var suffix = hash.substring(5);
      var res = await fetch('https://api.pwnedpasswords.com/range/' + prefix);
      if (!res.ok) return 0;
      var text = await res.text();
      var match = text.split('\\n').find(function (l) { return l.startsWith(suffix); });
      return match ? parseInt(match.split(':')[1], 10) : 0;
    } catch (_) { return 0; }
  }

  var stressDebounce = null;
  function onStressInput() {
    var value = stressInput.value;
    if (!value) { resetStressUI(); return; }
    var pool    = poolFor(value);
    var entropy = pool > 0 ? Math.round(value.length * Math.log2(pool)) : 0;
    var combos  = Math.pow(pool, value.length);
    var seconds = combos / GUESSES_PER_SEC;

    statLen.textContent = String(value.length);
    statPool.textContent = String(pool);
    statEntropy.textContent = String(entropy);
    renderStress(seconds, false, 0);

    clearTimeout(stressDebounce);
    if (!navigator.onLine || value.length < 4) return;
    stressDebounce = setTimeout(async function () {
      var n = await checkBreach(value);
      if (n > 0) renderStress(0, true, n);
    }, 600);
  }

  // --- Wire up events ---------------------------------------------------- //

  $$('.mode-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { setMode(btn.getAttribute('data-mode')); });
  });
  $$('.phon-tab').forEach(function (btn) {
    btn.addEventListener('click', function () { setPhoneticMode(btn.getAttribute('data-mode')); });
  });
  $('#regenBtn').addEventListener('click', refresh);
  $('#copyBtn').addEventListener('click', copyCurrent);
  passwordPanel.addEventListener('click', copyCurrent);
  phoneticBtn.addEventListener('click', togglePhonetic);
  $('#copyPhoneticBtn').addEventListener('click', function () {
    copy(spelledOut(), function () {
      var btn = $('#copyPhoneticBtn');
      var prev = btn.textContent;
      btn.textContent = 'Copied';
      setTimeout(function () { btn.textContent = prev; }, 1500);
    });
  });
  stressVis.addEventListener('click', function () {
    var showing = stressInput.type === 'text';
    stressInput.type = showing ? 'password' : 'text';
    stressVis.textContent = showing ? 'Show' : 'Hide';
    stressVis.setAttribute('aria-pressed', showing ? 'false' : 'true');
  });
  stressInput.addEventListener('input', onStressInput);

  // Spacebar regenerates (only when not typing in a field).
  document.addEventListener('keydown', function (e) {
    var t = e.target;
    var typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
    if (typing) return;
    if (e.key === ' ') { e.preventDefault(); refresh(); }
    else if (e.key === 'c' || e.key === 'C') { if (!e.metaKey && !e.ctrlKey) copyCurrent(); }
  });

  // Online/offline detection drives the stress tester + status pill.
  window.addEventListener('online',  function () { setOfflineUI(false); });
  window.addEventListener('offline', function () { setOfflineUI(true); resetStressUI(); });

  // Boot.
  setOfflineUI(!navigator.onLine);
  setMode('firm');

  // --- Self-tests (?test=1) --------------------------------------------- //
  // Minimal generator behavior tests. Run with file://.../tofupass-offline.html?test=1
  // Output goes to console; results also surface as a small banner.
  function runSelfTests() {
    var pass = 0, fail = 0, log = [];
    function ok(name, cond) {
      if (cond) { pass++; log.push('✓ ' + name); }
      else      { fail++; log.push('✗ ' + name); }
    }

    // getSecureRandomInt range
    var inRange = true;
    for (var i = 0; i < 5000; i++) {
      var n = getSecureRandomInt(7);
      if (n < 0 || n >= 7 || !Number.isInteger(n)) { inRange = false; break; }
    }
    ok('getSecureRandomInt(7) stays in [0,7) over 5000 samples', inRange);

    // Soft mode: 2 capped words, one symbol, and 2 digits
    var softOK = true;
    for (i = 0; i < 200; i++) {
      var s = generate('soft');
      var softWords = s.match(/[A-Z][a-z]+/g) || [];
      if (softWords.length !== 2 || !/[!@#\\$\\?\\*]/.test(s) || !/\\d{2}/.test(s)) { softOK = false; break; }
    }
    ok('soft mode has 2 capped words + symbol + 2 digits', softOK);

    // Firm mode: 3 capped words, one symbol, and 2 digits
    var firmOK = true;
    for (i = 0; i < 200; i++) {
      var f = generate('firm');
      var firmWords = f.match(/[A-Z][a-z]+/g) || [];
      if (firmWords.length !== 3 || !/[!@#\\$\\?\\*]/.test(f) || !/\\d{2}/.test(f)) { firmOK = false; break; }
    }
    ok('firm mode has 3 capped words + symbol + 2 digits', firmOK);

    // Extra mode: 4 capped words, one symbol, and 2 digits
    var extraOK = true;
    for (i = 0; i < 200; i++) {
      var x = generate('extra');
      var extraWords = x.match(/[A-Z][a-z]+/g) || [];
      if (extraWords.length !== 4 || !/[!@#\\$\\?\\*]/.test(x) || !/\\d{2}/.test(x)) { extraOK = false; break; }
    }
    ok('extra mode has 4 capped words + symbol + 2 digits', extraOK);

    // Determinism / variety: 200 firms should not all be equal
    var s1 = generate('firm'), allSame = true;
    for (i = 0; i < 200; i++) { if (generate('firm') !== s1) { allSame = false; break; } }
    ok('firm mode produces varied output', !allSame);

    // describeCharacter sanity
    ok('describeCharacter("A").detail === "Uppercase letter"', describeCharacter('A').detail === 'Uppercase letter');
    ok('describeCharacter("3").detail === "Number"',           describeCharacter('3').detail === 'Number');
    ok('describeCharacter("@").detail === "Symbol"',           describeCharacter('@').detail === 'Symbol');

    var summary = 'TofuPass offline self-tests: ' + pass + ' passed, ' + fail + ' failed';
    log.unshift(summary);
    console[fail ? 'error' : 'log']('%c' + summary, 'font-weight:bold;color:' + (fail ? '#B8443D' : '#4A9F3F'));
    log.slice(1).forEach(function (l) { console.log(l); });

    var banner = document.createElement('div');
    banner.style.cssText = 'position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:9999;'
      + 'padding:8px 14px;border-radius:8px;font:600 12px/1 -apple-system,system-ui,sans-serif;'
      + 'background:' + (fail ? '#FFD9D6' : '#D7F0CD') + ';color:' + (fail ? '#B8443D' : '#3F7C36')
      + ';box-shadow:0 2px 6px rgba(0,0,0,0.15)';
    banner.textContent = summary;
    document.body.appendChild(banner);
    return { pass: pass, fail: fail };
  }
  if (/[?&]test=1\\b/.test(location.search)) {
    setTimeout(runSelfTests, 0);
  }
  // Expose generate() for external test runners (Node test harness, future use).
  window.__tofupassOffline = {
    generate: generate,
    getSecureRandomInt: getSecureRandomInt,
    describeCharacter: describeCharacter,
    adjectivesCount: adjectives.length,
    nounsCount: nouns.length
  };
})();
</script>
</body>
</html>
`;

const outDir  = path.join(repoRoot, 'Offline');
const outPath = path.join(outDir, 'tofupass-offline.html');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, html);
const stat = fs.statSync(outPath);
console.log('wrote ' + outPath);
console.log('size: ' + (stat.size / 1024).toFixed(1) + ' KB');
console.log('adjectives: ' + adjectives.length + ', nouns: ' + nouns.length);
