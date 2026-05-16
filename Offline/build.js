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
    - Soft        : adjective + noun + 2-digit number   (lowercase)
    - Firm        : Adjective + Noun + 2-digit number, with one symbol inserted
                    at a random position among the three slots
    - Extra Firm  : adjective-noun-adjective-noun (4-word hyphenated passphrase)

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
    --bg-page:          #F1E8D2;
    --bg-window:        #FFFBF1;
    --bg-titlebar:      #F2E9D0;
    --bg-card:          #FFF7E2;
    --bg-card-soft:     #FFFAEA;
    --bg-card-warm:     #F7EDCF;
    --border-soft:      rgba(74, 55, 40, 0.10);
    --border-strong:    rgba(74, 55, 40, 0.20);
    --border-green:     rgba(107, 191, 89, 0.55);
    --border-green-soft:rgba(107, 191, 89, 0.30);
    --text-primary:     #4A3728;
    --text-secondary:   #7B6346;
    --text-tertiary:    #A89473;
    --accent-green:     #6BBF59;
    --accent-green-d:   #3F8E36;
    --accent-green-dd:  #2E6B27;
    --accent-yellow:    #E6A800;
    --accent-pink:      #FF7A7A;
    --accent-purple:    #9B6DD7;
    --accent-blue:      #5B9FD6;
    --accent-soy:       #C28D3A;
    --shadow-window:    0 28px 56px -18px rgba(74, 55, 40, 0.32),
                        0 10px 20px -10px rgba(74, 55, 40, 0.20);
    --shadow-card:      0 12px 28px -14px rgba(74, 55, 40, 0.30),
                        0 4px 10px -6px rgba(74, 55, 40, 0.18);
    --shadow-glow:      0 0 0 1px rgba(107,191,89,0.18),
                        0 14px 36px -14px rgba(107,191,89,0.45),
                        0 4px 12px -6px rgba(74,55,40,0.18);
    --shadow-inset:     inset 0 1px 0 rgba(255, 255, 255, 0.6);
    --radius-window:    20px;
    --radius-card:      18px;
    --radius-pill:      14px;
    --font-sans:        -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter",
                        "Helvetica Neue", system-ui, sans-serif;
    --font-mono:        "SF Mono", "JetBrains Mono", "Menlo", "Consolas", monospace;
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: var(--font-sans);
    color: var(--text-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
  }
  body {
    min-height: 100vh;
    padding: clamp(12px, 4vw, 48px);
    display: grid;
    place-items: start center;
    background-color: var(--bg-page);
    background-image:
      radial-gradient(1300px 700px at 50% -15%, rgba(107,191,89,0.18), transparent 60%),
      radial-gradient(900px 700px at 110% 110%, rgba(230,168,0,0.12), transparent 60%),
      radial-gradient(700px 600px at -10% 100%, rgba(155,109,215,0.08), transparent 60%),
      /* tiny scattered tofu-cube pattern, baked in as data URI */
      url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><g fill='none' stroke='rgba(74,55,40,0.06)' stroke-width='1.2'><rect x='14' y='14' width='10' height='10' rx='2'/><rect x='52' y='30' width='8' height='8' rx='2'/><rect x='28' y='56' width='12' height='12' rx='2'/></g></svg>");
    background-attachment: fixed;
  }

  .window {
    width: 100%;
    max-width: 740px;
    background: var(--bg-window);
    border-radius: var(--radius-window);
    border: 1px solid var(--border-soft);
    box-shadow: var(--shadow-window);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  /* Soft green halo top-edge so the window feels alive, not flat */
  .window::before {
    content: "";
    position: absolute;
    inset: 0 0 auto 0;
    height: 4px;
    background: linear-gradient(90deg, transparent, rgba(107,191,89,0.45), transparent);
    pointer-events: none;
  }

  .titlebar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 16px;
    background: linear-gradient(180deg, #F8EFD7 0%, #EFE3C2 100%);
    border-bottom: 1px solid var(--border-soft);
    user-select: none;
    position: relative;
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
    display: flex; align-items: center; gap: 10px;
    color: var(--text-secondary);
    overflow: hidden;
    white-space: nowrap;
  }
  .title-text .brand-mark {
    display: inline-flex; width: 26px; height: 26px;
    flex-shrink: 0;
    filter: drop-shadow(0 1px 2px rgba(74,55,40,0.18));
  }
  .title-text .brand-mark svg { width: 100%; height: 100%; }
  .title-stack {
    display: flex; flex-direction: column; gap: 1px;
    min-width: 0;
    overflow: hidden;
  }
  .title-stack .wordmark {
    font-size: 14.5px;
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: -0.005em;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .title-stack .wordmark .accent { color: var(--accent-green-d); }
  .title-stack .subtitle {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-tertiary);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .status-pill {
    flex-shrink: 0;
    display: inline-flex; align-items: center; gap: 7px;
    padding: 5px 11px;
    border-radius: 999px;
    font-size: 11px; font-weight: 700;
    background: linear-gradient(180deg, rgba(107,191,89,0.18) 0%, rgba(107,191,89,0.12) 100%);
    color: var(--accent-green-dd);
    border: 1px solid rgba(107,191,89,0.45);
    white-space: nowrap;
    box-shadow: 0 1px 0 rgba(255,255,255,0.4) inset;
  }
  @media (max-width: 480px) {
    .title-stack .subtitle { display: none; }
    .status-pill .status-text { display: none; }
  }
  .status-pill .status-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--accent-green);
    box-shadow: 0 0 0 3px rgba(107,191,89,0.20);
    animation: pulseDot 2.4s ease-in-out infinite;
  }
  @keyframes pulseDot {
    0%, 100% { box-shadow: 0 0 0 3px rgba(107,191,89,0.20); }
    50%      { box-shadow: 0 0 0 5px rgba(107,191,89,0.05); }
  }
  .status-pill.is-offline {
    background: linear-gradient(180deg, rgba(194,141,58,0.18) 0%, rgba(194,141,58,0.10) 100%);
    color: var(--accent-soy);
    border-color: rgba(194,141,58,0.40);
  }
  .status-pill.is-offline .status-dot { background: var(--accent-soy); box-shadow: 0 0 0 3px rgba(194,141,58,0.18); animation: none; }

  /* Stage = the warm cream room everything sits inside */
  .stage {
    padding: 22px 22px 6px;
    display: flex; flex-direction: column; gap: 18px;
  }

  /* ============================================================
     PASSWORD CARD — the visual hero
  ============================================================ */
  .pw-shell { position: relative; }
  .pw-card {
    position: relative;
    width: 100%;
    padding: 26px 22px 32px;
    background:
      radial-gradient(120% 120% at 50% 0%, #FFFCEF 0%, var(--bg-card) 70%),
      var(--bg-card);
    border: 1.5px solid var(--border-green-soft);
    border-radius: var(--radius-card);
    box-shadow: var(--shadow-glow);
    cursor: pointer;
    transition: transform 120ms ease, box-shadow 200ms ease, border-color 200ms ease;
    appearance: none;
    font-family: inherit;
    color: inherit;
    text-align: center;
    overflow: hidden;
  }
  /* Soft dotted texture on the card surface so it's not flat beige */
  .pw-card::before {
    content: "";
    position: absolute; inset: 0;
    pointer-events: none;
    opacity: 0.55;
    background-image: radial-gradient(rgba(107,191,89,0.12) 1px, transparent 1.4px);
    background-size: 14px 14px;
    background-position: 0 0;
    mix-blend-mode: multiply;
  }
  /* Tiny corner sparkle */
  .pw-card::after {
    content: "";
    position: absolute;
    top: 14px; right: 16px;
    width: 36px; height: 36px;
    background: radial-gradient(circle, rgba(255,255,255,0.65), transparent 60%);
    pointer-events: none;
  }
  .pw-card:hover  { transform: translateY(-1px); border-color: var(--border-green); }
  .pw-card:active { transform: translateY(1px); }
  .pw-card:focus-visible { outline: 3px solid var(--accent-green); outline-offset: 3px; }
  .pw-card.copied {
    border-color: var(--accent-green);
    box-shadow: 0 0 0 2px rgba(107,191,89,0.30),
                0 14px 36px -14px rgba(107,191,89,0.55),
                0 4px 12px -6px rgba(74,55,40,0.18);
  }

  .pw-badge {
    position: relative;
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 10px 4px 8px;
    background: rgba(107,191,89,0.14);
    border: 1px solid rgba(107,191,89,0.40);
    color: var(--accent-green-dd);
    font-size: 10.5px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border-radius: 999px;
    margin-bottom: 14px;
  }
  .pw-badge svg { width: 12px; height: 12px; }

  .password-display {
    position: relative;
    font-family: var(--font-mono);
    font-weight: 800;
    font-size: clamp(22px, 5vw, 34px);
    line-height: 1.18;
    color: var(--accent-green-dd);
    word-break: break-all;
    letter-spacing: -0.012em;
    margin: 0;
    text-shadow: 0 1px 0 rgba(255,255,255,0.65);
  }
  .password-display.is-refresh { animation: pwFade 380ms cubic-bezier(.2,.7,.2,1) both; }
  @keyframes pwFade {
    0%   { opacity: 0; transform: translateY(4px) scale(0.99); }
    60%  { opacity: 1; transform: translateY(0) scale(1.005); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }

  .pw-hint {
    position: relative;
    margin-top: 14px;
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 10.5px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: var(--text-tertiary);
  }
  .pw-card.copied .pw-hint { color: var(--accent-green-d); }

  /* Miso peeking from the bottom-right of the card */
  .pw-miso {
    position: absolute;
    right: 12px; bottom: -18px;
    width: 56px; height: 56px;
    pointer-events: none;
    filter: drop-shadow(0 6px 8px rgba(74,55,40,0.18));
    transition: transform 240ms cubic-bezier(.2,.7,.2,1);
  }
  .pw-card:hover .pw-miso { transform: translateY(-3px) rotate(-3deg); }
  .pw-card.copied .pw-miso { transform: translateY(-6px) rotate(4deg); }

  /* ============================================================
     FIRMNESS SELECTOR — three branded tofu cards
  ============================================================ */
  .firmness {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  @media (max-width: 540px) {
    .firmness { grid-template-columns: 1fr; }
  }
  .firm-card {
    appearance: none;
    text-align: left;
    background: var(--bg-window);
    border: 1.5px solid var(--border-soft);
    border-radius: 14px;
    padding: 12px 12px 14px;
    cursor: pointer;
    font-family: inherit;
    color: var(--text-primary);
    display: grid;
    grid-template-columns: 28px 1fr;
    grid-template-rows: auto auto;
    column-gap: 10px;
    row-gap: 1px;
    align-items: start;
    position: relative;
    transition: transform 120ms ease, border-color 200ms ease, box-shadow 200ms ease, background 200ms ease;
  }
  .firm-card:hover { border-color: var(--border-strong); transform: translateY(-1px); }
  .firm-card:focus-visible { outline: 2px solid var(--accent-green); outline-offset: 2px; }
  .firm-card .firm-icon {
    grid-row: 1 / 3;
    width: 28px; height: 28px;
    display: grid; place-items: center;
    color: var(--text-tertiary);
    transition: color 200ms ease, transform 200ms ease;
  }
  .firm-card .firm-icon svg { width: 26px; height: 26px; }
  .firm-card .firm-name {
    font-size: 13.5px;
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: -0.005em;
    line-height: 1.2;
  }
  .firm-card .firm-desc {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .firm-card[aria-selected="true"] {
    background: linear-gradient(180deg, rgba(107,191,89,0.10) 0%, rgba(107,191,89,0.04) 100%);
    border-color: var(--accent-green);
    box-shadow: 0 6px 16px -10px rgba(107,191,89,0.55),
                0 0 0 3px rgba(107,191,89,0.10);
    transform: translateY(-1px);
  }
  .firm-card[aria-selected="true"] .firm-icon { color: var(--accent-green-d); transform: scale(1.05); }
  .firm-card[aria-selected="true"] .firm-name { color: var(--accent-green-dd); }
  .firm-card[aria-selected="true"] .firm-desc { color: var(--accent-green-d); }

  /* ============================================================
     ACTIONS
  ============================================================ */
  .actions {
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr;
    gap: 10px;
  }
  @media (max-width: 480px) {
    .actions { grid-template-columns: 1fr 1fr; }
    .actions .btn.primary { grid-column: 1 / -1; }
  }
  .btn {
    appearance: none;
    border: 1.5px solid var(--border-soft);
    background: var(--bg-window);
    color: var(--text-primary);
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 13.5px;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    transition: background 120ms ease, border-color 120ms ease, transform 80ms ease, color 120ms ease, box-shadow 200ms ease;
  }
  .btn:hover { border-color: var(--border-strong); background: var(--bg-card-soft); }
  .btn:active { transform: translateY(1px); }
  .btn:focus-visible { outline: 2px solid var(--accent-green); outline-offset: 2px; }
  .btn[disabled] { opacity: 0.5; cursor: not-allowed; }
  .btn .btn-ico { width: 16px; height: 16px; flex-shrink: 0; }
  .btn.primary {
    background: linear-gradient(180deg, #82DC6E 0%, var(--accent-green) 55%, #5BB04D 100%);
    color: #ffffff;
    border-color: rgba(46,107,39,0.5);
    box-shadow: 0 1px 0 rgba(255,255,255,0.40) inset,
                0 8px 18px -8px rgba(46,107,39,0.55),
                0 2px 4px rgba(74,55,40,0.18);
    text-shadow: 0 1px 1px rgba(46,107,39,0.35);
  }
  .btn.primary:hover { filter: brightness(1.04); border-color: rgba(46,107,39,0.65); }
  .btn.copy-btn {
    border-color: var(--border-green);
    color: var(--accent-green-dd);
    background: rgba(107,191,89,0.06);
  }
  .btn.copy-btn:hover { background: rgba(107,191,89,0.12); border-color: var(--accent-green); }
  .btn.ghost { background: transparent; border-color: var(--border-soft); color: var(--text-secondary); }
  .btn.ghost:hover { color: var(--text-primary); }
  .btn.small { padding: 7px 12px; font-size: 12px; border-radius: 10px; }

  /* ============================================================
     PHONETIC PANEL — Miso's reading helper
  ============================================================ */
  .phonetic {
    padding: 14px;
    background: linear-gradient(180deg, var(--bg-card-soft) 0%, var(--bg-window) 100%);
    border: 1.5px solid var(--border-soft);
    border-radius: 14px;
    position: relative;
  }
  .phonetic[hidden] { display: none; }
  .phon-header {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 12px;
  }
  .phon-header .phon-title {
    font-size: 12px;
    font-weight: 800;
    color: var(--text-secondary);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .phon-tabs {
    display: inline-flex; align-items: center; gap: 4px;
    background: var(--bg-window);
    border: 1px solid var(--border-soft);
    border-radius: 999px;
    padding: 3px;
  }
  .phon-tab {
    appearance: none;
    background: transparent;
    border: none;
    color: var(--text-secondary);
    border-radius: 999px;
    padding: 4px 12px;
    font-size: 11.5px;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition: background 150ms ease, color 150ms ease;
  }
  .phon-tab:hover { color: var(--text-primary); }
  .phon-tab.active {
    background: linear-gradient(180deg, rgba(107,191,89,0.18) 0%, rgba(107,191,89,0.08) 100%);
    color: var(--accent-green-dd);
    box-shadow: 0 1px 0 rgba(255,255,255,0.5) inset;
  }
  .phon-tab:focus-visible { outline: 2px solid var(--accent-green); outline-offset: 2px; }
  #copyPhoneticBtn { margin-left: auto; }
  .phon-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 6px;
  }
  .phon-item {
    display: flex; align-items: baseline; gap: 8px;
    background: var(--bg-window);
    border: 1px solid var(--border-soft);
    border-radius: 10px;
    padding: 7px 11px;
    font-size: 12px;
    transition: border-color 150ms ease, transform 80ms ease;
  }
  .phon-item:hover { border-color: var(--border-strong); }
  .phon-item .phon-char {
    font-family: var(--font-mono);
    font-weight: 800;
    color: var(--text-primary);
    min-width: 14px;
    text-align: center;
  }
  .phon-item .phon-arrow { color: var(--text-tertiary); }
  .phon-item .phon-word { color: var(--text-secondary); font-weight: 600; }
  .phon-item.is-uppercase { background: rgba(155,109,215,0.06); border-color: rgba(155,109,215,0.22); }
  .phon-item.is-uppercase .phon-word { color: var(--accent-purple); }
  .phon-item.is-number    { background: rgba(91,159,214,0.06);  border-color: rgba(91,159,214,0.22);  }
  .phon-item.is-number    .phon-word { color: var(--accent-blue); }
  .phon-item.is-symbol    { background: rgba(255,122,122,0.06); border-color: rgba(255,122,122,0.26); }
  .phon-item.is-symbol    .phon-word { color: var(--accent-pink); }
  .phon-empty { color: var(--text-tertiary); font-size: 12px; padding: 4px 2px; }

  /* ============================================================
     STRESS TESTER — collapsible, online-only
  ============================================================ */
  .stresstest {
    border: 1.5px solid var(--border-soft);
    border-radius: 14px;
    background: linear-gradient(180deg, var(--bg-window) 0%, var(--bg-card-soft) 100%);
    overflow: hidden;
  }
  .stresstest details { padding: 0; }
  .stresstest summary {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 16px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 700;
    color: var(--text-primary);
    list-style: none;
    user-select: none;
  }
  .stresstest summary::-webkit-details-marker { display: none; }
  .stresstest summary .stress-icon {
    width: 18px; height: 18px;
    color: var(--accent-blue);
    flex-shrink: 0;
  }
  .stresstest summary::after {
    content: "›";
    margin-left: auto;
    color: var(--text-tertiary);
    font-size: 18px;
    transform: rotate(90deg);
    transition: transform 200ms ease;
  }
  .stresstest details[open] summary::after { transform: rotate(-90deg); }
  .online-pill {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 2px 9px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    background: linear-gradient(180deg, rgba(91,159,214,0.16) 0%, rgba(91,159,214,0.08) 100%);
    color: var(--accent-blue);
    border: 1px solid rgba(91,159,214,0.40);
  }
  .online-pill.is-offline {
    background: linear-gradient(180deg, rgba(194,141,58,0.16) 0%, rgba(194,141,58,0.08) 100%);
    color: var(--accent-soy);
    border-color: rgba(194,141,58,0.40);
  }

  .stresstest-body { padding: 0 16px 16px; }
  .muted { color: var(--text-secondary); font-size: 12px; line-height: 1.55; margin: 0 0 12px; }
  .muted a { color: var(--accent-green-d); text-decoration: underline; text-underline-offset: 2px; }
  .muted a:hover { color: var(--accent-green-dd); }
  .field {
    display: flex; align-items: center; gap: 8px;
    background: var(--bg-window);
    border: 1.5px solid var(--border-soft);
    border-radius: 10px;
    padding: 9px 12px;
    transition: border-color 150ms ease, box-shadow 150ms ease;
  }
  .field:focus-within {
    border-color: var(--accent-green);
    box-shadow: 0 0 0 3px rgba(107,191,89,0.12);
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
    font-weight: 700;
    padding: 2px 6px;
    cursor: pointer;
  }
  .link-btn:hover { color: var(--text-primary); }
  .link-btn:focus-visible { outline: 2px solid var(--accent-green); outline-offset: 2px; border-radius: 4px; }

  .stress-result { margin-top: 14px; display: grid; gap: 10px; }
  .stress-result[hidden] { display: none; }
  .stress-result .stress-stat {
    display: inline-flex; gap: 6px; font-size: 12px; margin-right: 14px;
  }
  .stress-result .stress-stat b { color: var(--text-primary); font-weight: 800; }
  .stress-meter {
    width: 100%; height: 10px;
    background: rgba(74,55,40,0.08);
    border-radius: 999px;
    overflow: hidden;
    box-shadow: inset 0 1px 2px rgba(74,55,40,0.10);
  }
  .stress-meter-fill {
    height: 100%; width: 0%;
    background: var(--accent-green);
    border-radius: 999px;
    transition: width 280ms cubic-bezier(.2,.7,.2,1), background 240ms ease;
    box-shadow: 0 0 8px rgba(107,191,89,0.45);
  }
  .stress-time {
    display: flex; align-items: center; gap: 10px;
    font-size: 14px;
    color: var(--accent-green-dd);
    font-weight: 800;
  }
  .stress-label {
    margin-left: auto;
    font-size: 10.5px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.10em;
    padding: 3px 10px;
    border-radius: 999px;
    background: rgba(107,191,89,0.14);
    color: var(--accent-green-dd);
    border: 1px solid rgba(107,191,89,0.35);
  }
  .breach {
    background: rgba(255,122,122,0.10);
    border: 1.5px solid rgba(255,122,122,0.40);
    color: #A93934;
    padding: 10px 12px;
    border-radius: 10px;
    font-size: 12.5px;
    font-weight: 600;
  }
  .breach[hidden] { display: none; }

  /* ============================================================
     LOCAL FOOTER — friendly privacy line
  ============================================================ */
  .local-foot {
    margin-top: 4px;
    display: flex; flex-wrap: wrap; gap: 10px 14px;
    align-items: center;
    padding: 14px 22px 18px;
    border-top: 1px solid var(--border-soft);
    background: linear-gradient(180deg, transparent 0%, rgba(247,237,207,0.55) 100%);
    color: var(--text-secondary);
    font-size: 12px;
    line-height: 1.5;
  }
  .local-foot .foot-mark {
    display: inline-flex; width: 18px; height: 18px;
    flex-shrink: 0;
    color: var(--accent-green-d);
  }
  .local-foot .foot-mark svg { width: 100%; height: 100%; }
  .local-foot strong { color: var(--text-primary); font-weight: 700; }
  .local-foot .version {
    margin-left: auto;
    font-size: 10.5px;
    font-weight: 800;
    letter-spacing: 0.10em;
    text-transform: uppercase;
    color: var(--text-tertiary);
  }

  /* ============================================================
     Decorative section spacer
  ============================================================ */
  .stage > .gap-flex { flex: 1; }

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

<main class="window" role="main" aria-label="TofuPass desktop password generator">

  <header class="titlebar">
    <span class="window-dots" aria-hidden="true">
      <span class="dot dot-red"></span>
      <span class="dot dot-yellow"></span>
      <span class="dot dot-green"></span>
    </span>
    <span class="title-text">
      <span class="brand-mark" aria-hidden="true">
        <!--
          Miso (header). Inline SVG, no external assets.
          A friendly tofu cube with eyes, a smile, and rosy cheeks.
        -->
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Miso">
          <defs>
            <linearGradient id="misoBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stop-color="#FFFCEF"/>
              <stop offset="100%" stop-color="#F4ECCC"/>
            </linearGradient>
          </defs>
          <rect x="3" y="4" width="26" height="24" rx="7" fill="url(#misoBody)" stroke="#6BBF59" stroke-width="1.8"/>
          <rect x="3" y="4" width="26" height="6"  rx="7" fill="#6BBF59" opacity="0.10"/>
          <circle cx="12" cy="15" r="1.7" fill="#4A3728"/>
          <circle cx="20" cy="15" r="1.7" fill="#4A3728"/>
          <circle cx="11.5" cy="14.5" r="0.5" fill="#FFFFFF"/>
          <circle cx="19.5" cy="14.5" r="0.5" fill="#FFFFFF"/>
          <path d="M11.5 20 Q16 23.5 20.5 20" stroke="#4A3728" stroke-width="1.7" fill="none" stroke-linecap="round"/>
          <ellipse cx="9"  cy="19" rx="1.4" ry="0.9" fill="#FFC2C2" opacity="0.85"/>
          <ellipse cx="23" cy="19" rx="1.4" ry="0.9" fill="#FFC2C2" opacity="0.85"/>
        </svg>
      </span>
      <span class="title-stack">
        <span class="wordmark">Tofu<span class="accent">Pass</span> <span style="color:var(--text-tertiary);font-weight:600">&middot;</span> Desktop Edition</span>
        <span class="subtitle">Local password generator</span>
      </span>
    </span>
    <span class="status-pill" id="statusPill" title="No network needed for password generation.">
      <span class="status-dot"></span>
      <span class="status-text" id="statusText">Offline-ready</span>
    </span>
  </header>

  <div class="stage">

    <!-- ========================================================
         PASSWORD CARD — the visual hero
    ======================================================== -->
    <div class="pw-shell">
      <button id="passwordPanel" class="pw-card" type="button" aria-label="Generated password. Click to copy.">
        <span class="pw-badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6"></path><path d="M12 8c-3 0-6 2-6 6 0 5 6 8 6 8s6-3 6-8c0-4-3-6-6-6z"></path></svg>
          Freshly generated
        </span>
        <output id="passwordDisplay" class="password-display" aria-live="polite">…</output>
        <span id="passwordHint" class="pw-hint">Click password to copy</span>

        <!--
          Miso peeking up from the bottom-right of the card.
          Slightly different pose than the header Miso — a little wave with
          one paw raised, like he just delivered the password.
        -->
        <span class="pw-miso" aria-hidden="true">
          <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="pwMisoBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stop-color="#FFFCEF"/>
                <stop offset="100%" stop-color="#F0E2BD"/>
              </linearGradient>
            </defs>
            <!-- raised paw -->
            <rect x="38" y="6" width="9" height="14" rx="3.5" fill="url(#pwMisoBody)" stroke="#6BBF59" stroke-width="1.8"/>
            <!-- body cube -->
            <rect x="6"  y="14" width="44" height="38" rx="11" fill="url(#pwMisoBody)" stroke="#6BBF59" stroke-width="2"/>
            <rect x="6"  y="14" width="44" height="9" rx="11" fill="#6BBF59" opacity="0.10"/>
            <!-- eyes -->
            <circle cx="20" cy="32" r="2.6" fill="#4A3728"/>
            <circle cx="34" cy="32" r="2.6" fill="#4A3728"/>
            <circle cx="19" cy="31" r="0.8" fill="#FFFFFF"/>
            <circle cx="33" cy="31" r="0.8" fill="#FFFFFF"/>
            <!-- happy smile -->
            <path d="M19 41 Q27 47 35 41" stroke="#4A3728" stroke-width="2.2" fill="none" stroke-linecap="round"/>
            <!-- rosy cheeks -->
            <ellipse cx="14" cy="39" rx="2.4" ry="1.4" fill="#FFC2C2" opacity="0.85"/>
            <ellipse cx="40" cy="39" rx="2.4" ry="1.4" fill="#FFC2C2" opacity="0.85"/>
          </svg>
        </span>
      </button>
    </div>

    <!-- ========================================================
         FIRMNESS SELECTOR — three branded tofu cards
    ======================================================== -->
    <div class="firmness" role="tablist" aria-label="Tofu firmness">
      <button class="firm-card" role="tab" aria-selected="false" data-mode="soft" type="button">
        <span class="firm-icon" aria-hidden="true">
          <!-- Soft: a wobbly squishy block -->
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">
            <path d="M5 8 Q5 5 8 5 H16 Q19 5 19 8 V16 Q19 19 16 19 H8 Q5 19 5 16 Z"/>
            <path d="M5 8 Q9 9 12 8 T19 8" stroke-width="1.4" opacity="0.55"/>
            <path d="M5 13 Q9 14 12 13 T19 13" stroke-width="1.4" opacity="0.55"/>
          </svg>
        </span>
        <span class="firm-name">Soft</span>
        <span class="firm-desc">memorable</span>
      </button>
      <button class="firm-card" role="tab" aria-selected="true" data-mode="firm" type="button">
        <span class="firm-icon" aria-hidden="true">
          <!-- Firm: a clean cube with a single highlight -->
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">
            <rect x="5" y="5" width="14" height="14" rx="3"/>
            <path d="M8 8 L11 8" stroke-width="1.6" opacity="0.7"/>
          </svg>
        </span>
        <span class="firm-name">Firm</span>
        <span class="firm-desc">balanced</span>
      </button>
      <button class="firm-card" role="tab" aria-selected="false" data-mode="extra" type="button">
        <span class="firm-icon" aria-hidden="true">
          <!-- Extra Firm: stacked cubes / cross-hatched grid -->
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">
            <rect x="3" y="9" width="11" height="11" rx="2.4"/>
            <rect x="10" y="4" width="11" height="11" rx="2.4"/>
          </svg>
        </span>
        <span class="firm-name">Extra Firm</span>
        <span class="firm-desc">passphrase</span>
      </button>
    </div>

    <!-- ========================================================
         ACTIONS
    ======================================================== -->
    <div class="actions">
      <button id="regenBtn" class="btn primary" type="button" aria-keyshortcuts="Space" title="Regenerate (Space)">
        <svg class="btn-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"></path>
          <path d="M21 3v5h-5"></path>
          <path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"></path>
          <path d="M3 21v-5h5"></path>
        </svg>
        Regenerate
      </button>
      <button id="copyBtn" class="btn copy-btn" type="button" aria-keyshortcuts="C">
        <svg class="btn-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="11" height="11" rx="2"></rect>
          <path d="M5 15V6a2 2 0 0 1 2-2h9"></path>
        </svg>
        Copy
      </button>
      <button id="phoneticBtn" class="btn ghost" type="button" aria-expanded="false" aria-controls="phoneticPanel">
        <svg class="btn-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 6h6"></path>
          <path d="M4 10h10"></path>
          <path d="M4 14h7"></path>
          <path d="M15 6l5 5-5 5"></path>
        </svg>
        Phonetic
      </button>
    </div>

    <!-- ========================================================
         PHONETIC PANEL
    ======================================================== -->
    <section class="phonetic" id="phoneticPanel" hidden>
      <div class="phon-header">
        <span class="phon-title">How to read it out loud</span>
        <div class="phon-tabs" role="tablist" aria-label="Phonetic mode">
          <button class="phon-tab active" role="tab" aria-selected="true"  data-mode="military" type="button">NATO</button>
          <button class="phon-tab"        role="tab" aria-selected="false" data-mode="kid"      type="button">Kid-friendly</button>
        </div>
        <button id="copyPhoneticBtn" class="btn ghost small" type="button" title="Copy a support-friendly spelled-out version">Copy spelled-out</button>
      </div>
      <div id="phoneticList" class="phon-list" aria-live="polite"></div>
    </section>

    <!-- ========================================================
         STRESS TESTER — collapsible, online-only
    ======================================================== -->
    <section class="stresstest" id="stresstestPanel">
      <details>
        <summary>
          <svg class="stress-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 2 L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6z"></path>
            <path d="M9 12l2 2 4-4"></path>
          </svg>
          <span>Check a password against breaches</span>
          <span class="online-pill" id="onlinePill"><span>Online-only</span></span>
        </summary>
        <div class="stresstest-body">
          <p class="muted">
            We use <a href="https://haveibeenpwned.com/Passwords" target="_blank" rel="noopener noreferrer">Have I Been Pwned</a>'s k-anonymity API: only the first 5 characters of the SHA-1 hash leave your device. Your password itself <strong>never</strong> travels. Disabled while you're offline.
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

  </div>

  <footer class="local-foot">
    <span class="foot-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="4"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    </span>
    <span>Made right here on <strong>your device</strong>. No saving. No sending. No sneaky business.</span>
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
    soft:  'Two lowercase words plus a 2-digit number. Easy to remember.',
    firm:  'Capitalized Word + Word + 2-digit number, with one symbol sprinkled in.',
    extra: 'Four-word hyphenated passphrase. Long, friendly, very high entropy.'
  };

  // --- Cryptographic random helpers (matches home.js getSecureRandomInt) // //
  function getSecureRandomInt(max) {
    if (!max || max <= 0) return 0;
    var buffer = new Uint32Array(1);
    window.crypto.getRandomValues(buffer);
    return buffer[0] % max;
  }
  function pick(list) { return list[getSecureRandomInt(list.length)]; }
  function cap(s)    { return s.charAt(0).toUpperCase() + s.slice(1); }

  /**
   * generate(firmness) — produces a password string. Mirrors home.js exactly.
   *   'soft'  -> adjective + noun + (10..99)
   *   'firm'  -> capitalized adjective + capitalized noun + (10..99),
   *              with one random special inserted at a random one of 4 slots
   *   'extra' -> adj-noun-adj-noun (lowercase)
   */
  function generate(firmness) {
    var pwd;
    if (firmness === 'soft') {
      pwd = pick(adjectives) + pick(nouns) + (getSecureRandomInt(90) + 10);
    } else if (firmness === 'firm') {
      var adjective = cap(pick(adjectives));
      var noun      = cap(pick(nouns));
      var number    = String(getSecureRandomInt(90) + 10);
      var special   = pick(specials);
      var parts     = [adjective, noun, number];
      var insertAt  = getSecureRandomInt(parts.length + 1);
      parts.splice(insertAt, 0, special);
      pwd = parts.join('');
    } else {
      pwd = [pick(adjectives), pick(nouns), pick(adjectives), pick(nouns)].join('-');
    }
    return pwd;
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
    $$('.firm-card').forEach(function (btn) {
      var on = btn.getAttribute('data-mode') === level;
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    if (modeDesc) modeDesc.textContent = modeDescriptions[level] || '';
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
      statusText.textContent = 'Offline-ready';
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

  $$('.firm-card').forEach(function (btn) {
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

    // Soft mode: lowercase letters then 2 digits
    var softOK = true;
    for (i = 0; i < 200; i++) {
      var s = generate('soft');
      if (!/^[a-z]+\\d{2}$/.test(s)) { softOK = false; break; }
    }
    ok('soft mode matches /^[a-z]+\\\\d{2}$/', softOK);

    // Firm mode: contains a special, contains an uppercase, contains 2 digits
    var firmOK = true;
    for (i = 0; i < 200; i++) {
      var f = generate('firm');
      var hasSpecial = /[!@#\\$\\?\\*]/.test(f);
      var hasUpper   = /[A-Z]/.test(f);
      var hasDigits  = /\\d{2}/.test(f);
      if (!(hasSpecial && hasUpper && hasDigits)) { firmOK = false; break; }
    }
    ok('firm mode has uppercase + symbol + 2 digits', firmOK);

    // Extra mode: 4 hyphenated lowercase tokens
    var extraOK = true;
    for (i = 0; i < 200; i++) {
      var x = generate('extra');
      var parts = x.split('-');
      if (parts.length !== 4) { extraOK = false; break; }
      if (!parts.every(function (p) { return /^[a-z]+$/.test(p); })) { extraOK = false; break; }
    }
    ok('extra mode produces 4 lowercase hyphenated tokens', extraOK);

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
