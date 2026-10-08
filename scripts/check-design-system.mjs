#!/usr/bin/env node
// Guards the rule that the AN3S design system is this site's only source of truth for colours,
// fonts, radii, glows and gradients. Exits 1 when:
//   1. src/design-system/ no longer matches its manifest (hand edits, partial syncs, extra files),
//      or the manifest itself is missing or malformed;
//   2. index.html loads fonts other than the design system's Google Fonts URL;
//   3. tailwind.config.ts doesn't load the design-system preset, or its `theme` / `theme.extend`
//      defines what the preset owns (colors, fontFamily, borderRadius, fontSize, boxShadow,
//      backgroundImage), including through spreads or computed keys;
//   4. code or an SVG (index.html, tailwind.config.ts, and .ts/.tsx/.js/.jsx/.mjs/.css/.html/.svg
//      files under src/ and public/) hard-codes a colour or a font: hex,
//      rgb()/hsl() literals, named CSS colours, stock Tailwind palette classes, arbitrary colour
//      values, font families, `font:` shorthands, @font-face rules or font-host URLs;
//   5. code puts a role tint on an edge or a glow (borders, rings, shadows take pink and cyan);
//   6. code redeclares a variable the design system exports (`--primary: …`, `"--primary": …`,
//      `["--primary"]: …`, `setProperty("--primary", …)`, `@property --primary`);
//   7. a scanned path is a symbolic link (or junction): index.html, tailwind.config.ts, anything
//      under src/ or public/ (a linked src/ or public/ itself included, even dangling), or anything
//      in src/design-system/. Links aren't followed, because they can leave the repo or loop, so
//      commit real files instead.
// Comments are ignored. To keep a justified exception, put `ds-allow: <reason>` in a comment on
// that line or the line above it. Run: node scripts/check-design-system.mjs
import { createHash } from 'node:crypto';
import { existsSync, lstatSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DS = join(ROOT, 'src', 'design-system');
const toPosix = (p) => p.split('\\').join('/');
const problems = [];

// Every entry under `dir`. Real folders are descended into; symbolic links (and Windows junctions)
// are never followed, since a link can leave the repo or loop back on itself. Links come back as
// entries so the checks below can report them.
function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (lstatSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}
// Never throws: a path through a looping link (ELOOP) or a missing one just isn't a link itself.
const isLink = (path) => {
  try {
    return lstatSync(path).isSymbolicLink();
  } catch {
    return false;
  }
};

// index.html or tailwind.config.ts; null (and a problem) when it's a link or can't be read, so a
// dangling or looping link there is reported instead of crashing the check.
function readRoot(name) {
  const path = join(ROOT, name);
  if (isLink(path)) {
    problems.push(`${name} is a symbolic link: the check doesn't follow links (they can leave the repo or loop), so commit the file itself`);
    return null;
  }
  try {
    return readFileSync(path, 'utf8');
  } catch (error) {
    problems.push(`${name} can't be read (${error.code ?? error.message})`);
    return null;
  }
}

// --- Source scanning helpers -------------------------------------------------------------------

// Index just past the string literal opening at `i` (a JS/TS string or template, or a CSS string).
// Unterminated ' and " strings end at the line break, which keeps JSX text like "don't" harmless.
function skipString(code, i) {
  const quote = code[i];
  let j = i + 1;
  while (j < code.length) {
    const c = code[j];
    if (c === '\\') j += 2;
    else if (c === quote) return j + 1;
    else if (c === '\n' && quote !== '`') return j;
    else if (quote === '`' && c === '$' && code[j + 1] === '{') j = matchClose(code, j + 1) + 1 || code.length;
    else j++;
  }
  return code.length;
}

// Index of the bracket that closes the one at `open`, skipping strings; -1 when unbalanced.
function matchClose(code, open, limit = code.length) {
  const pairs = { '{': '}', '[': ']', '(': ')' };
  const stack = [];
  for (let i = open; i < limit; i++) {
    const c = code[i];
    if (c === '"' || c === "'" || c === '`') {
      i = skipString(code, i) - 1;
    } else if (c in pairs) {
      stack.push(pairs[c]);
    } else if (c === '}' || c === ']' || c === ')') {
      if (stack.pop() !== c) return -1;
      if (!stack.length) return i;
    }
  }
  return -1;
}

// The text with its comments blanked to spaces (line breaks kept), so offsets and line numbers
// still match the file. JS/TS: // and /* */ outside strings. CSS: /* */. HTML and SVG: <!-- -->.
function blankComments(text, ext) {
  const blank = (s) => s.replace(/[^\n]/g, ' ');
  if (ext === '.html' || ext === '.svg') return text.replace(/<!--[\s\S]*?-->/g, blank);
  const js = ext !== '.css';
  let out = '';
  let i = 0;
  while (i < text.length) {
    const c = text[i];
    if (c === '"' || c === "'" || (js && c === '`')) {
      const end = skipString(text, i);
      out += text.slice(i, end);
      i = end;
    } else if (c === '/' && text[i + 1] === '*') {
      const end = text.indexOf('*/', i + 2);
      const stop = end === -1 ? text.length : end + 2;
      out += blank(text.slice(i, stop));
      i = stop;
    } else if (js && c === '/' && text[i + 1] === '/') {
      const end = text.indexOf('\n', i);
      const stop = end === -1 ? text.length : end;
      out += blank(text.slice(i, stop));
      i = stop;
    } else {
      out += c;
      i++;
    }
  }
  return out;
}

// 1-based line number of each offset, and whether that line or the one above carries ds-allow.
function lineTools(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i++) if (text[i] === '\n') starts.push(i + 1);
  const lines = text.split('\n');
  const lineOf = (index) => {
    let lo = 0;
    let hi = starts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (starts[mid] <= index) lo = mid;
      else hi = mid - 1;
    }
    return lo + 1;
  };
  const allowed = (line) => lines[line - 1].includes('ds-allow:') || (line > 1 && lines[line - 2].includes('ds-allow:'));
  return { lineOf, allowed };
}

// --- 1. The vendored export matches its manifest -----------------------------------------------
const manifestPath = join(DS, 'manifest.json');
const isMap = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
let manifest = null;
let vendored = null; // manifest.files (vendored path → sha256), once the manifest checks out
if (!existsSync(manifestPath)) {
  problems.push('src/design-system/manifest.json is missing: run node scripts/sync-design-system.mjs');
} else {
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(manifestPath, 'utf8'));
  } catch (error) {
    problems.push(`src/design-system/manifest.json is not valid JSON (${error.message}): re-run the sync`);
  }
  if (parsed !== undefined && !isMap(parsed)) problems.push('src/design-system/manifest.json is not an object: re-run the sync');
  else if (parsed !== undefined) manifest = parsed;
  if (manifest && !isMap(manifest.files)) problems.push('src/design-system/manifest.json has no `files` map: re-run the sync');
  else if (manifest) vendored = manifest.files;
}
if (vendored) {
  const TEXT = /\.(css|js|ts|json|md|svg)$/;
  const hash = (file, buf) =>
    createHash('sha256')
      .update(TEXT.test(file) ? Buffer.from(buf.toString('utf8').replace(/\r\n/g, '\n')) : buf)
      .digest('hex');
  for (const [file, sum] of Object.entries(vendored)) {
    const path = join(DS, file);
    if (typeof sum !== 'string') problems.push(`src/design-system/manifest.json lists ${file} without a sha256: re-run the sync`);
    else if (isLink(path)) continue; // reported by the walk below, dangling or not
    else if (!existsSync(path)) problems.push(`src/design-system/${file} is missing: re-run the sync`);
    else if (!statSync(path).isFile()) problems.push(`src/design-system/manifest.json lists ${file}, which is not a file: re-run the sync`);
    else if (hash(file, readFileSync(path)) !== sum) problems.push(`src/design-system/${file} differs from the design system: re-run the sync, never edit it here`);
  }
  for (const path of walk(DS)) {
    const file = toPosix(relative(DS, path));
    if (isLink(path)) problems.push(`src/design-system/${file} is a symbolic link: re-run the sync, which writes real files`);
    else if (file !== 'manifest.json' && !Object.hasOwn(vendored, file)) problems.push(`src/design-system/${file} is not part of the design-system export`);
  }
}

// --- 2. Fonts come only from the design system -------------------------------------------------
// Any URL on a web-font host. Bare origins (preconnect hints) are fine; a stylesheet or file on
// one must be the design system's Google Fonts URL, which index.html must load.
const FONT_HOSTS = 'fonts\\.googleapis\\.com|fonts\\.gstatic\\.com|use\\.typekit\\.net|p\\.typekit\\.net|fonts\\.bunny\\.net|fonts\\.cdnfonts\\.com|api\\.fontshare\\.com|cdn\\.fontshare\\.com';
const FONT_URL = new RegExp(`(?:https?:)?//(?:${FONT_HOSTS})(?:/[^"'\\s>)]*)?`, 'g');
const htmlRaw = readRoot('index.html');
const fontsHref = typeof manifest?.googleFontsHref === 'string' && manifest.googleFontsHref ? manifest.googleFontsHref : null;
if (manifest && !fontsHref) problems.push('src/design-system/manifest.json has no googleFontsHref: re-run the sync');
if (htmlRaw !== null) {
  const fontLinks = [...blankComments(htmlRaw, '.html').matchAll(FONT_URL)].map((m) => m[0].replace(/&amp;/g, '&'));
  if (fontsHref && !fontLinks.includes(fontsHref)) problems.push(`index.html must load the design-system fonts: ${fontsHref}`);
  for (const link of fontLinks) {
    const bareOrigin = /^(?:https?:)?\/\/[^/]+\/?$/.test(link);
    if (fontsHref && !bareOrigin && link !== fontsHref) problems.push(`index.html loads fonts outside the design system: ${link}`);
  }
}

// --- 3. Tailwind takes palette, fonts, radii, shadows, gradients and type sizes from the preset -
const OWNED_THEME_KEYS = ['colors', 'fontFamily', 'borderRadius', 'fontSize', 'boxShadow', 'backgroundImage'];

// The properties of the object literal opening at `open`: { key, kind: key|shorthand|spread|computed, valueStart }.
function properties(code, open) {
  const close = matchClose(code, open);
  if (close === -1) return null;
  const skipValue = (i) => {
    while (i < close && code[i] !== ',') {
      const c = code[i];
      if (c === '"' || c === "'" || c === '`') i = skipString(code, i);
      else if (c === '{' || c === '[' || c === '(') i = matchClose(code, i) + 1 || close;
      else i++;
    }
    return i;
  };
  const props = [];
  let i = open + 1;
  while (i < close) {
    while (i < close && /[\s,]/.test(code[i])) i++;
    if (i >= close) break;
    let key = null;
    let kind = 'key';
    if (code.startsWith('...', i)) {
      kind = 'spread';
      i += 3;
    } else if (code[i] === '[') {
      kind = 'computed';
      const end = matchClose(code, i);
      key = code.slice(i + 1, end).trim();
      i = end + 1;
    } else if (/["'`]/.test(code[i])) {
      const end = skipString(code, i);
      key = code.slice(i + 1, end - 1);
      i = end;
    } else {
      const m = /^[\w$]+/.exec(code.slice(i, close));
      if (!m) {
        i = skipValue(i);
        continue;
      }
      key = m[0];
      i += key.length;
    }
    while (i < close && /\s/.test(code[i])) i++;
    let valueStart = -1;
    if (kind !== 'spread' && code[i] === ':') {
      i++;
      while (i < close && /\s/.test(code[i])) i++;
      valueStart = i;
    } else if (kind === 'key' && (code[i] === ',' || i >= close)) {
      kind = 'shorthand';
    }
    props.push({ key, kind, valueStart });
    i = skipValue(i);
  }
  return props;
}

const tailwindRaw = readRoot('tailwind.config.ts');
const tailwind = blankComments(tailwindRaw ?? '', '.ts');
const presetImport = /import\s+([\w$]+)\s+from\s+["']\.\/src\/design-system\/tailwind-preset(?:\.js)?["']/.exec(tailwind);
let configOpen = -1;
const exported = /export\s+default\s+(\{|[\w$]+)/.exec(tailwind);
if (exported?.[1] === '{') configOpen = exported.index + exported[0].length - 1;
else if (exported) {
  const decl = new RegExp(`(?:const|let|var)\\s+${exported[1]}\\b[^=]*=\\s*\\{`).exec(tailwind);
  if (decl) configOpen = decl.index + decl[0].length - 1;
}
const config = configOpen === -1 ? null : properties(tailwind, configOpen);
if (tailwindRaw === null) {
  // Already reported by readRoot.
} else if (!config) {
  problems.push('tailwind.config.ts: could not find the exported config object literal to check');
} else {
  const presets = config.find((p) => p.key === 'presets' && p.valueStart !== -1);
  const presetsValue = presets ? tailwind.slice(presets.valueStart, matchClose(tailwind, presets.valueStart) + 1) : '';
  if (!presetImport || !new RegExp(`(?<![\\w$])${presetImport[1]}(?![\\w$])`).test(presetsValue)) {
    problems.push('tailwind.config.ts must import ./src/design-system/tailwind-preset.js and list it in `presets`');
  }
  const checkLevel = (props, where) => {
    for (const p of props) {
      if (p.kind === 'spread') problems.push(`tailwind.config.ts spreads into ${where}: list keys explicitly so the design-system keys stay with the preset`);
      else if (p.kind === 'computed') problems.push(`tailwind.config.ts uses a computed key in ${where} ([${p.key}]): use a plain key`);
      else if (OWNED_THEME_KEYS.includes(p.key)) problems.push(`tailwind.config.ts defines ${where}.${p.key}: it comes from the design-system preset`);
    }
  };
  for (const p of config) {
    if (p.kind === 'spread') problems.push('tailwind.config.ts spreads into the config: list keys explicitly so `theme` can be checked');
    if (p.key !== 'theme') continue;
    if (p.valueStart === -1 || tailwind[p.valueStart] !== '{') {
      problems.push('tailwind.config.ts: `theme` must be an object literal so it can be checked');
      continue;
    }
    const theme = properties(tailwind, p.valueStart);
    checkLevel(theme, 'theme');
    for (const e of theme.filter((t) => t.key === 'extend')) {
      if (e.valueStart === -1 || tailwind[e.valueStart] !== '{') problems.push('tailwind.config.ts: `theme.extend` must be an object literal so it can be checked');
      else checkLevel(properties(tailwind, e.valueStart), 'theme.extend');
    }
  }
}

// --- 4-6. Code ---------------------------------------------------------------------------------
// Variables the design system exports (tokens and shadcn roles).
const ownedVars = new Set();
for (const css of ['tokens.css', 'shadcn.css']) {
  const path = join(DS, css);
  if (!existsSync(path)) continue;
  for (const m of blankComments(readFileSync(path, 'utf8'), '.css').matchAll(/(--[\w-]+)\s*:/g)) ownedVars.add(m[1]);
}
if (!ownedVars.size) problems.push('src/design-system/tokens.css and shadcn.css declare no variables: re-run the sync');

// Ways to declare a custom property. A ternary branch (`? "--a" : "--b"`) and a `case "--a":`
// label aren't declarations.
const DECLARATIONS = [
  /(?<!\?\s*|\bcase\s+)(?<![\w-])(["'`]?)(--[\w-]+)\1\s*:/g,
  /\[\s*(["'`])(--[\w-]+)\1(?:\s+as\s+[^\]]+?)?\s*\]\s*:/g,
  /\bsetProperty\s*\(\s*(["'`])(--[\w-]+)\1/g,
  /@property\s+()(--[\w-]+)/g,
];

const NAMED_COLOURS =
  'aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen';
const COLOUR_PROPS =
  'color|background|background-color|backgroundColor|border|border-(?:top|right|bottom|left)|border(?:-(?:top|right|bottom|left))?-color|border(?:Top|Right|Bottom|Left)?Color|border(?:Top|Right|Bottom|Left)|outline|outline-color|outlineColor|fill|stroke|box-shadow|boxShadow|text-shadow|textShadow|caret-color|caretColor|accent-color|accentColor|text-decoration-color|textDecorationColor|text-decoration|textDecoration|stop-color|stopColor|flood-color|floodColor|lighting-color|lightingColor';
// Attributes that take a colour (SVG markup, JSX props).
const COLOUR_ATTRS = 'fill|stroke|color|bgcolor|stop-color|stopColor|flood-color|floodColor|lighting-color|lightingColor';
const HUES = 'slate|gray|grey|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|sky|indigo|purple|fuchsia|rose|white|black';
const UTILS = 'text|bg|border|border-[trblxy]|from|via|to|ring|ring-offset|outline|shadow|fill|stroke|divide|placeholder|decoration|accent|caret';
const RULES = [
  // Not an HTML entity (&#123;), a URL fragment (/page#abc), or an id reference (url(#abc), href="#abc").
  [/(?<![&/\w]|url\(\s*["']?|href\s*=\s*["'])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![\w-])/g, 'hex colour (use a design-system token)'],
  [/(?<![A-Za-z-])(?:rgba?|hsla?)\(\s*[\d.]/g, 'colour literal (use a design-system token)'],
  // Not a TypeScript union such as `color: "pink" | "cyan"`, where the strings name tokens.
  [new RegExp(`(?<![\\w-])(?:${COLOUR_PROPS})["'\`]?\\s*:\\s*["'\`]?[^;{}\\n"'\`]*?(?<![\\w#-])(?:${NAMED_COLOURS})(?![\\w-])(?!["'\`]?\\s*\\|)`, 'gi'), 'named colour (use a design-system token)'],
  // Colour attributes. Markup may space out the `=`; in scripts a spaced `=` is an assignment
  // (`color = "pink"` naming a token), so only JSX's `fill="red"` form counts there.
  [new RegExp(`(?<![\\w-])(?:${COLOUR_ATTRS})\\s*=\\s*["']\\s*(?:${NAMED_COLOURS})\\s*["']`, 'gi'), 'named colour (use a design-system token)', (file) => /\.(?:svg|html)$/.test(file)],
  [new RegExp(`(?<![\\w$.-])(?:${COLOUR_ATTRS})=\\{?\\s*["'\`]\\s*(?:${NAMED_COLOURS})\\s*["'\`]`, 'gi'), 'named colour (use a design-system token)', (file) => !/\.(?:svg|html)$/.test(file)],
  [new RegExp(`(?<![\\w-])(?:${UTILS})-(?:${HUES})(?:-\\d{2,3})?(?![\\w-])`, 'g'), 'stock Tailwind colour (use a design-system token class)'],
  [new RegExp(`(?<![\\w-])(?:${UTILS})-(?:cyan|pink|blue|violet)-\\d{2,3}(?![\\w-])`, 'g'), 'stock Tailwind shade (use the design-system token)'],
  [new RegExp(`(?<![\\w-])(?:${UTILS})-\\[(?:#|rgb|hsl|color)`, 'g'), 'arbitrary colour value'],
  // `font-family` can't be a JS identifier, so `font-family=` is always markup. `fontFamily` counts
  // as a style key, a JSX prop or a property assignment, not a variable, comparison or arrow parameter.
  [/\bfont-family\s*[:=]|\bfontFamily\s*:|(?<![\w$.-])fontFamily=["'{]|\.fontFamily\s*=(?![=>])|(?<![\w-])font-\[|(?<![\w-])["'`]?font["'`]?\s*:(?!:)|@font-face\b|\bnew\s+FontFace\s*\(/g, 'font outside the design system'],
  // A font stack ending in a generic family names families wherever it's written, e.g. a constant
  // that's later interpolated into `ctx.font`.
  [/["'`][^"'`\n]*,\s*(?:sans-serif|serif|monospace|system-ui|cursive|fantasy|ui-sans-serif|ui-serif|ui-monospace|ui-rounded)\s*["'`]/g, 'font outside the design system'],
  [FONT_URL, 'font host URL (fonts load once, from index.html)', (file) => file !== 'index.html'],
  [/(?<![\w-])(?:border(?:-[trblxy])?|ring(?:-offset)?|outline|divide|shadow|drop-shadow)-(?:primary|secondary)(?![\w-])/g, 'role tint on an edge or glow (edges and glows use pink and cyan; roles are for words and fills)'],
  [/hsla?\(\s*var\(--(?:primary|secondary)\)/g, 'raw role colour (glows and edges use --pink-hsl / --cyan-hsl; fills use the role classes)'],
];

// Values set from code. Canvas paint, element styles, colour attributes and gradient stops take a
// colour; `.font` and the font properties take a font. Plain variables and object fields
// (`star.color = "pink"`) often name tokens, so only these targets count. Each target's value is
// read as one expression with the string-aware helpers, so only its literal text counts: not
// identifiers (`color.pink`), `${…}` interpolations, comparison operands (`theme === "dark"`) or
// bracket keys (`palette["white"]`).
const COLOUR_TARGET = new RegExp(
  `(?:\\.(?:fillStyle|strokeStyle|shadowColor)|\\bstyle\\.(?:${COLOUR_PROPS}))\\s*=(?![=>])` +
    `|\\b(?:setProperty|setAttribute)\\s*\\(\\s*(["'\`])(?:${COLOUR_PROPS}|${COLOUR_ATTRS})\\1\\s*,` +
    `|\\baddColorStop\\s*\\([^,;()]*,`,
  'gi',
);
const FONT_TARGET = /\.font\s*=(?![=>])|\b(?:setProperty|setAttribute)\s*\(\s*(["'`])font(?:-family)?\1\s*,/g;
const NAMED_COLOUR_WORD = new RegExp(`(?<![\\w#-])(?:${NAMED_COLOURS})(?![\\w-])`, 'i');
// A literal family: after a size (a number, an interpolation, or the start of a concatenated piece),
// a family name rather than an interpolation; or a generic family anywhere. \0 marks an interpolation.
const LITERAL_FAMILY =
  /(?:^|[\d\0])(?:px|pt|pc|em|rem|ex|ch|vw|vh|%)(?:\s*\/\s*(?:[\d.]+[a-z%]*|\0))?\s+["'A-Za-z_-]|(?<![\w-])(?:sans-serif|serif|monospace|system-ui|cursive|fantasy)(?![\w-])/;
const SCRIPT_EXTS = ['.ts', '.tsx', '.js', '.jsx', '.mjs'];

// End of the expression starting at `start`: a top-level `;` or `,`, a bracket it didn't open, or a
// line break that ends the statement. A break right after `=`, after an operator, or before a
// continuation (`?`, `:`, `+`, `.`, `&&`, `||`, `??`…) doesn't, which is how Prettier wraps values.
// Capped at 600 characters: a real value is far shorter, and the cap keeps long minified lines linear.
function expressionEnd(code, start) {
  const limit = Math.min(code.length, start + 600);
  let depth = 0;
  for (let i = start; i < limit; i++) {
    const c = code[i];
    if (c === '"' || c === "'" || c === '`') {
      i = skipString(code, i) - 1;
    } else if (c === '(' || c === '[' || c === '{') {
      depth++;
    } else if (c === ')' || c === ']' || c === '}') {
      if (!depth) return i;
      depth--;
    } else if (!depth && (c === ';' || c === ',')) {
      return i;
    } else if (!depth && c === '\n') {
      let p = i - 1;
      while (p >= start && /\s/.test(code[p])) p--;
      let n = i + 1;
      while (n < code.length && /\s/.test(code[n])) n++;
      const unfinished = p < start || /[=?:+\-*/%&|^<>!~]/.test(code[p]);
      const continued = /[?:+*/%&|^.]/.test(code[n] ?? '');
      if (!unfinished && !continued) return i;
    }
  }
  return limit;
}

// The literal text in code[start, end): every string, and every template's text with each `${…}`
// replaced by \0 (the code inside is read the same way). Comparison operands and bracket keys are
// left out: they test or look up values rather than set them.
function literalTexts(code, start, end, out = []) {
  for (let i = start; i < end; i++) {
    const quote = code[i];
    if (quote !== '"' && quote !== "'" && quote !== '`') continue;
    const close = Math.min(skipString(code, i), end);
    const before = code.slice(Math.max(start, i - 12), i);
    const after = code.slice(close, close + 12);
    const skip = /[=!]==?\s*$/.test(before) || /^\s*[=!]==?/.test(after) || (/\[\s*$/.test(before) && /^\s*\]/.test(after));
    let text = '';
    for (let j = i + 1; j < close - 1; j++) {
      if (code[j] === '\\') {
        text += code[j + 1] ?? '';
        j++;
      } else if (quote === '`' && code[j] === '$' && code[j + 1] === '{') {
        const stop = matchClose(code, j + 1, close);
        if (stop === -1) break;
        literalTexts(code, j + 2, stop, out);
        text += '\0';
        j = stop;
      } else {
        text += code[j];
      }
    }
    if (!skip) out.push(text);
    i = close - 1;
  }
  return out;
}

// The first literal in the value after a target match that `test` accepts, or undefined.
function literalIn(code, match, test) {
  const start = match.index + match[0].length;
  return literalTexts(code, start, expressionEnd(code, start)).find((text) => test(text));
}
const snippet = (text) => JSON.stringify(text.replace(/\0/g, '${…}').slice(0, 60));

const EXTS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css', '.html', '.svg'];
const SKIP = [/^src\/design-system\//, /^src\/integrations\/supabase\/types\.ts$/];
// Served assets count too: public/ ships as-is. A linked src/ or public/ is reported, not walked.
const scanTargets = [
  // Only when readRoot could read them; otherwise they're already reported.
  ...(htmlRaw === null ? [] : ['index.html']),
  ...(tailwindRaw === null ? [] : ['tailwind.config.ts']),
  ...['src', 'public']
    // lstat, not existsSync: a dangling or looping src/ or public/ link must still be reported.
    .filter((dir) => lstatSync(join(ROOT, dir), { throwIfNoEntry: false }))
    .flatMap((dir) => (isLink(join(ROOT, dir)) ? [dir] : [...walk(join(ROOT, dir))].map((p) => toPosix(relative(ROOT, p))))),
];
for (const file of scanTargets) {
  const ext = extname(file);
  if (file.startsWith('src/design-system/')) continue; // the manifest check covers these, links included
  // Before the extension and skip filters, so a linked folder or skipped file can't slip through.
  if (isLink(join(ROOT, file))) {
    problems.push(`${file} is a symbolic link: the check doesn't follow links (they can leave the repo or loop), so commit the file or folder itself`);
    continue;
  }
  if (!EXTS.includes(ext) || SKIP.some((re) => re.test(file))) continue;
  const raw = readFileSync(join(ROOT, file), 'utf8').replace(/\r\n/g, '\n');
  const code = blankComments(raw, ext);
  const { lineOf, allowed } = lineTools(raw);
  const report = (index, message) => {
    const line = lineOf(index);
    if (!allowed(line)) problems.push(`${file}:${line}  ${message}`);
  };
  for (const [re, why, appliesTo] of RULES) {
    if (appliesTo && !appliesTo(file)) continue;
    for (const m of code.matchAll(re)) report(m.index, `${why}: ${m[0].trim()}`);
  }
  for (const re of DECLARATIONS) {
    for (const m of code.matchAll(re)) {
      if (ownedVars.has(m[2])) report(m.index, `redeclares design-system variable ${m[2]} (change the design system instead)`);
    }
  }
  if (!SCRIPT_EXTS.includes(ext)) continue;
  for (const m of code.matchAll(COLOUR_TARGET)) {
    const text = literalIn(code, m, (t) => NAMED_COLOUR_WORD.test(t));
    if (text !== undefined) report(m.index, `named colour (use a design-system token): ${m[0].trim()} ${snippet(text)}`);
  }
  for (const m of code.matchAll(FONT_TARGET)) {
    // A `font-family` value is all family, so any literal word counts there (CSS-wide keywords aside).
    const familyOnly = /font-family/.test(m[0]);
    const test = familyOnly ? (t) => /[A-Za-z]/.test(t) && !/^\s*(?:inherit|initial|unset|revert(?:-layer)?)\s*$/.test(t) : (t) => LITERAL_FAMILY.test(t);
    const text = literalIn(code, m, test);
    if (text !== undefined) report(m.index, `font outside the design system: ${m[0].trim()} ${snippet(text)}`);
  }
}

if (problems.length) {
  console.error(`Design-system check failed (${problems.length}):\n  ${problems.join('\n  ')}`);
  console.error('\nThe AN3S design system is the only source of truth. See AGENTS.md, "Design system".');
  process.exit(1);
}
console.log(`Design-system check passed: ${Object.keys(vendored).length} vendored files intact, fonts and Tailwind preset wired, no hard-coded colours or fonts, no role-tinted edges or glows.`);
