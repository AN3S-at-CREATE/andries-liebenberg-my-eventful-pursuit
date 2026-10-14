#!/usr/bin/env node
// Copies the AN3S design system's web export into src/design-system/, and its favicon, touch icon,
// share image and logo into public/ (PUBLIC_COPIES below).
//
// The design system (github.com/AN3S-CREATE/an3s-design-system) is the only source of truth for
// this site's colours, fonts, radii, glows, gradients, logo and icons. Change it there, run its
// `node tools/export.mjs`, then run this script; never edit src/design-system/ by hand.
//
//   node scripts/sync-design-system.mjs [--from <design-system repo, or its dist/web folder>]
//
// Source, in order: --from, $AN3S_DESIGN_SYSTEM, then a sibling checkout at ../Design Sytsem AN3S.
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEST = join(ROOT, 'src', 'design-system');

const flag = process.argv.indexOf('--from');
let source = resolve(
  flag > -1 ? process.argv[flag + 1] : process.env.AN3S_DESIGN_SYSTEM ?? join(ROOT, '..', 'Design Sytsem AN3S'),
);
if (existsSync(join(source, 'dist', 'web', 'manifest.json'))) source = join(source, 'dist', 'web');
if (!existsSync(join(source, 'manifest.json'))) {
  console.error(
    `No design-system export at ${source}.\n` +
      'Run `node tools/export.mjs` in the design-system repo, then pass --from <path to it>.',
  );
  process.exit(1);
}

rmSync(DEST, { recursive: true, force: true });
mkdirSync(DEST, { recursive: true });
cpSync(source, DEST, { recursive: true });

// Brand files the site serves at fixed URLs (index.html's favicon and touch icon, the og:image, the
// JSON-LD logo) are copies of design-system assets, refreshed on every sync so they can't drift.
const PUBLIC_COPIES = {
  'favicon.svg': 'assets/an3s-mark.svg',
  'apple-touch-icon.png': 'assets/an3s-mark-180.png',
  'an3s-mark-512.png': 'assets/an3s-mark-512.png',
  'an3s-share.png': 'assets/an3s-share.png',
};
for (const [file, asset] of Object.entries(PUBLIC_COPIES)) {
  if (!existsSync(join(DEST, asset))) {
    console.error(`The design-system export has no ${asset}, which public/${file} is copied from.`);
    process.exit(1);
  }
  cpSync(join(DEST, asset), join(ROOT, 'public', file));
}

const manifest = JSON.parse(readFileSync(join(DEST, 'manifest.json'), 'utf8'));
console.log(
  `Synced ${Object.keys(manifest.files).length + 1} files from ${source} ` +
    `(tokens ${manifest.tokensSha256.slice(0, 12)}), and ${Object.keys(PUBLIC_COPIES).length} brand files into public/.\n` +
    'Next: node scripts/check-design-system.mjs, and update index.html if the font URL changed.',
);
