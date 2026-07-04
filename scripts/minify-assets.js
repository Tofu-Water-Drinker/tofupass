#!/usr/bin/env node
// Minify the CSS/JS copied into _site after an Eleventy build.
// Source files in assets/ stay readable; only the built output shrinks.
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const ROOT = path.join(__dirname, '..', '_site', 'assets');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(js|css)$/.test(entry.name)) out.push(full);
  }
  return out;
}

(async () => {
  if (!fs.existsSync(ROOT)) {
    console.error('minify-assets: _site/assets not found — run eleventy first.');
    process.exit(1);
  }
  let before = 0;
  let after = 0;
  for (const file of walk(ROOT)) {
    const source = fs.readFileSync(file, 'utf8');
    const loader = file.endsWith('.css') ? 'css' : 'js';
    try {
      const { code } = await esbuild.transform(source, { loader, minify: true, charset: 'utf8' });
      before += Buffer.byteLength(source);
      after += Buffer.byteLength(code);
      fs.writeFileSync(file, code);
    } catch (err) {
      console.warn(`minify-assets: skipped ${path.relative(ROOT, file)} (${err.message.split('\n')[0]})`);
    }
  }
  const kb = (n) => (n / 1024).toFixed(1) + ' KB';
  console.log(`minify-assets: ${kb(before)} -> ${kb(after)}`);
})();
