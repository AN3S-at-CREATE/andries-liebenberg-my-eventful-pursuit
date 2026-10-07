#!/usr/bin/env node
// Guards the rule that the AN3S design system is this site's only source of truth for colours,
// fonts, radii, glows and gradients. Exits 1 when:
//   1. src/design-system/ no longer matches its manifest (hand edits, partial syncs, extra files);
//   2. index.html loads fonts other than the design system's Google Fonts URL;
//   3. tailwind.config.ts doesn't load the design-system preset, or redefines what it owns;
//   4. code hard-codes a colour or a font: hex, rgb()/hsl() literals, stock Tailwind palette
//      classes, arbitrary colour values or font-family declarations.
// To keep a justified exception, put `ds-allow: <reason>` in a comment on that line or the line
// above it. Run: node scripts/check-design-system.mjs
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DS = join(ROOT, 'src', 'design-system');
const toPosix = (p) => p.split('\\').join('/');
const problems = [];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}

// 1. The vendored export matches its manifest.
const manifestPath = join(DS, 'manifest.json');
let manifest = null;
if (!existsSync(manifestPath)) {
  problems.push('src/design-system/manifest.json is missing: run node scripts/sync-design-system.mjs');
} else {
  manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const TEXT = /\.(css|js|ts|json|md|svg)$/;
  const hash = (file, buf) =>
    createHash('sha256')
      .update(TEXT.test(file) ? Buffer.from(buf.toString('utf8').replace(/\r\n/g, '\n')) : buf)
      .digest('hex');
  for (const [file, sum] of Object.entries(manifest.files)) {
    const path = join(DS, file);
    if (!existsSync(path)) problems.push(`src/design-system/${file} is missing: re-run the sync`);
    else if (hash(file, readFileSync(path)) !== sum) problems.push(`src/design-system/${file} differs from the design system: re-run the sync, never edit it here`);
  }
  for (const path of walk(DS)) {
    const file = toPosix(relative(DS, path));
    if (file !== 'manifest.json' && !(file in manifest.files)) problems.push(`src/design-system/${file} is not part of the design-system export`);
  }
}

// 2. Fonts come only from the design system.
const html = readFileSync(join(ROOT, 'index.html'), 'utf8');
const fontLinks = [...html.matchAll(/https:\/\/fonts\.googleapis\.com\/css2\?[^"'\s>]+/g)].map((m) => m[0].replace(/&amp;/g, '&'));
if (manifest && !fontLinks.includes(manifest.googleFontsHref)) problems.push(`index.html must load the design-system fonts: ${manifest.googleFontsHref}`);
for (const link of fontLinks) if (manifest && link !== manifest.googleFontsHref) problems.push(`index.html loads fonts outside the design system: ${link}`);

// 3. Tailwind takes its palette, fonts, radii and shadows from the preset.
const tailwind = readFileSync(join(ROOT, 'tailwind.config.ts'), 'utf8');
if (!/presets:\s*\[/.test(tailwind) || !tailwind.includes('./src/design-system/tailwind-preset')) {
  problems.push('tailwind.config.ts must load ./src/design-system/tailwind-preset.js through `presets`');
}
for (const key of ['colors', 'fontFamily', 'borderRadius', 'fontSize']) {
  if (new RegExp(`^\\s{4,8}${key}\\s*:`, 'm').test(tailwind)) problems.push(`tailwind.config.ts defines theme.${key}: it comes from the design-system preset`);
}

// 4. No hard-coded colours or fonts in code.
const HUES = 'slate|gray|grey|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|sky|indigo|purple|fuchsia|rose|white|black';
const UTILS = 'text|bg|border|border-[trblxy]|from|via|to|ring|ring-offset|outline|shadow|fill|stroke|divide|placeholder|decoration|accent|caret';
const RULES = [
  [/#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![\w-])/g, 'hex colour (use a design-system token)'],
  [/(?<![A-Za-z-])(?:rgba?|hsla?)\(\s*[\d.]/g, 'colour literal (use a design-system token)'],
  [new RegExp(`(?<![\\w-])(?:${UTILS})-(?:${HUES})(?:-\\d{2,3})?(?![\\w-])`, 'g'), 'stock Tailwind colour (use a design-system token class)'],
  [new RegExp(`(?<![\\w-])(?:${UTILS})-(?:cyan|pink|blue|violet)-\\d{2,3}(?![\\w-])`, 'g'), 'stock Tailwind shade (use the design-system token)'],
  [new RegExp(`(?<![\\w-])(?:${UTILS})-\\[(?:#|rgb|hsl|color)`, 'g'), 'arbitrary colour value'],
  [/\bfont-family\s*:|\bfontFamily\s*:|(?<![\w-])font-\[/g, 'font family outside the design system'],
];
const SKIP = [/^src\/design-system\//, /^src\/integrations\/supabase\/types\.ts$/];
const scanTargets = ['tailwind.config.ts', ...[...walk(join(ROOT, 'src'))].map((p) => toPosix(relative(ROOT, p)))];
for (const file of scanTargets) {
  if (!['.ts', '.tsx', '.css'].includes(extname(file)) || SKIP.some((re) => re.test(file))) continue;
  const lines = readFileSync(join(ROOT, file), 'utf8').split(/\r?\n/);
  lines.forEach((line, i) => {
    if (line.includes('ds-allow:') || (i > 0 && lines[i - 1].includes('ds-allow:'))) return;
    for (const [re, why] of RULES) {
      for (const m of line.matchAll(re)) problems.push(`${file}:${i + 1}  ${why}: ${m[0]}`);
    }
  });
}

if (problems.length) {
  console.error(`Design-system check failed (${problems.length}):\n  ${problems.join('\n  ')}`);
  console.error('\nThe AN3S design system is the only source of truth. See AGENTS.md, "Design system".');
  process.exit(1);
}
console.log(`Design-system check passed: ${Object.keys(manifest.files).length} vendored files intact, fonts and Tailwind preset wired, no hard-coded colours or fonts.`);
