# Lupin Theme Implementation Plan

**Goal:** Ship Lupin Theme, a dark VS Code and Zed theme generated from one turso.tech-derived palette, usable today through a local `.vsix` and a Zed dev extension.

**Architecture:** `src/palette.ts` holds every hex. `src/roles.ts` names them semantically. Two target folders turn roles into each editor's theme object, and `src/build.ts` lists the output files. `scripts/build.ts` writes them. Tests gate contrast, hue separation, key validity, cross-editor parity, build drift and per-language rendering.

**Tech Stack:** Node 24, TypeScript strict, tsx, vitest + @vitest/coverage-v8, shiki, ajv, eslint + typescript-eslint, @vscode/vsce.

**Specs:** `docs/specs/00-research.md`, `01-palette.md` (colors, roles, gates; single source of truth), `02-attention-hierarchy.md`, `03-architecture.md`, `04-surface-map.md` (exact key maps), `05-dracula-lessons.md`.

## Global Constraints

- Repo `/Users/emerson/Documents/workspace/open-source/lupin-theme`, branch `feat/ZED-5-lupin-theme`.
- Display name `Lupin Theme`, id `lupin-theme`, publisher `emersonjds`, author `Emerson Silva`, license MIT, repository `https://github.com/emersonjds/lupin-theme`.
- Hex literals only in `src/palette.ts`.
- No `any`, no `as unknown as`, named exports, arrow functions, no abbreviations in names.
- Coverage above 90% for statements, branches, functions and lines on `src/**`.
- Commits: Conventional Commits in English, author `Emerson Silva <emerson_jdss@hotmail.com>`, no AI trailer, files added by name.
- Generated files in `extensions/*/themes/` are never edited by hand.
- TDD: each task reports one red run and one green run.

## File structure

```
package.json, tsconfig.json, vitest.config.ts, eslint.config.js, .gitignore
src/color.ts                        Hex type, contrast, composite, oklab, deltaE (+ CVD)
src/palette.ts                      every hex (core, terminal, overlays)
src/roles.ts                        Style type + roles object
src/targets/vscode/colors.ts        workbench colors (04 §1)
src/targets/vscode/token-colors.ts  TextMate rules (04 §2)
src/targets/vscode/semantic-tokens.ts  semanticTokenColors (04 §3)
src/targets/vscode/index.ts         vscodeTheme
src/targets/zed/style.ts            style keys + players (04 §4)
src/targets/zed/syntax.ts           captures (01 §8 + 04 §5)
src/targets/zed/index.ts            zedTheme
src/build.ts                        outputs map + render
scripts/build.ts                    writes outputs
scripts/preview.ts                  preview/index.html
extensions/vscode/                  package.json, README.md, LICENSE, themes/ (generated)
extensions/zed/                     extension.toml, LICENSE, themes/ (generated)
tests/*.test.ts, tests/fixtures/
```

---

### Task 1: Scaffold and color math

**Files:**
- Create: `package.json`, `tsconfig.json`, `vitest.config.ts`, `eslint.config.js`, `src/color.ts`, `tests/color.test.ts`
- Modify: `.gitignore` (add `preview/`)

**Interfaces:**
- Produces: `type Hex = \`#${string}\``; `contrast(a: Hex, b: Hex): number`; `composite(over: Hex, base: Hex): Hex` (over may be `#RRGGBBAA`); `oklab(hex: Hex): number[]`; `type Vision = 'normal' | 'deuteranopia' | 'protanopia'`; `deltaE(a: Hex, b: Hex, vision?: Vision): number`.

- [ ] **Step 1: Scaffold**

`package.json`:
```json
{
  "name": "lupin-theme",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsx scripts/build.ts",
    "preview": "tsx scripts/preview.ts",
    "test": "vitest run --coverage",
    "typecheck": "tsc --noEmit",
    "lint": "eslint .",
    "package": "npm run build && cd extensions/vscode && vsce package --no-dependencies --out ../../lupin-theme.vsix"
  }
}
```
Run: `npm i -D typescript tsx vitest @vitest/coverage-v8 eslint typescript-eslint @types/node`

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2023",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noEmit": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "types": ["node"]
  },
  "include": ["src", "scripts", "tests", "*.ts"],
  "exclude": ["tests/fixtures"]
}
```

`vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      thresholds: { statements: 90, branches: 90, functions: 90, lines: 90 },
    },
  },
});
```

`eslint.config.js`:
```js
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['node_modules', 'coverage', 'preview', 'extensions', 'tests/fixtures'] },
  ...tseslint.configs.strict,
);
```

- [ ] **Step 2: Write the failing test** `tests/color.test.ts`
```ts
import { describe, expect, it } from 'vitest';
import { composite, contrast, deltaE, oklab } from '../src/color';

describe('contrast', () => {
  it('is 21 for black on white', () => expect(contrast('#000000', '#FFFFFF')).toBeCloseTo(21, 5));
  it('matches the known AA gray', () => expect(contrast('#767676', '#FFFFFF')).toBeCloseTo(4.54, 2));
  it('is symmetric', () => expect(contrast('#FFFFFF', '#767676')).toBe(contrast('#767676', '#FFFFFF')));
});

describe('composite', () => {
  it('blends half white over black', () => expect(composite('#FFFFFF80', '#000000')).toBe('#808080'));
  it('returns the color itself when opaque', () => expect(composite('#4FF8D2', '#000000')).toBe('#4FF8D2'));
});

describe('oklab', () => {
  it('puts white at L 1', () => expect(oklab('#FFFFFF')[0]).toBeCloseTo(1, 3));
  it('puts black at L 0', () => expect(oklab('#000000')[0]).toBeCloseTo(0, 5));
});

describe('deltaE', () => {
  it('is 1 between black and white', () => expect(deltaE('#000000', '#FFFFFF')).toBeCloseTo(1, 3));
  it('is 0 for the same color under any vision', () => expect(deltaE('#808080', '#808080', 'protanopia')).toBe(0));
  it('shrinks red/green under deuteranopia', () =>
    expect(deltaE('#FF0000', '#00FF00', 'deuteranopia')).toBeLessThan(deltaE('#FF0000', '#00FF00')));
  it('shrinks red/green under protanopia', () =>
    expect(deltaE('#FF0000', '#00FF00', 'protanopia')).toBeLessThan(deltaE('#FF0000', '#00FF00')));
});
```

- [ ] **Step 3: Run, expect FAIL** — `npx vitest run tests/color.test.ts` fails with "Cannot find module '../src/color'".

- [ ] **Step 4: Implement** `src/color.ts`
```ts
export type Hex = `#${string}`;
export type Vision = 'normal' | 'deuteranopia' | 'protanopia';

// Machado, Oliveira & Fernandes 2009, severity 1.0, applied to linear RGB.
const visionMatrices: Record<Exclude<Vision, 'normal'>, number[][]> = {
  deuteranopia: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.01182, 0.04294, 0.968881],
  ],
  protanopia: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
};

const channels = (hex: Hex): number[] => [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16) / 255);

const opacity = (hex: Hex): number => (hex.length === 9 ? parseInt(hex.slice(7, 9), 16) / 255 : 1);

const toLinear = (channel: number): number =>
  channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;

const toHex = (rgb: number[]): Hex =>
  `#${rgb.map((channel) => Math.round(channel * 255).toString(16).padStart(2, '0')).join('').toUpperCase()}`;

const luminance = (hex: Hex): number => {
  const [red, green, blue] = channels(hex).map(toLinear);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

export const contrast = (first: Hex, second: Hex): number => {
  const [lighter, darker] = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
};

export const composite = (over: Hex, base: Hex): Hex => {
  const alpha = opacity(over);
  const top = channels(over);
  return toHex(channels(base).map((channel, index) => top[index] * alpha + channel * (1 - alpha)));
};

// Björn Ottosson's OKLab, from linear sRGB.
const linearToOklab = ([red, green, blue]: number[]): number[] => {
  const long = Math.cbrt(0.4122214708 * red + 0.5363710372 * green + 0.0514459929 * blue);
  const medium = Math.cbrt(0.2119034982 * red + 0.6806995764 * green + 0.1073969266 * blue);
  const short = Math.cbrt(0.0883024619 * red + 0.2817188376 * green + 0.6299787005 * blue);
  return [
    0.2104542553 * long + 0.793617785 * medium - 0.0040720468 * short,
    1.9779984951 * long - 2.428592205 * medium + 0.4505937099 * short,
    0.0259040371 * long + 0.7827717662 * medium - 0.808675766 * short,
  ];
};

const simulate = (linear: number[], vision: Vision): number[] =>
  vision === 'normal'
    ? linear
    : visionMatrices[vision].map((row) => row.reduce((sum, weight, index) => sum + weight * linear[index], 0));

export const oklab = (hex: Hex): number[] => linearToOklab(channels(hex).map(toLinear));

export const deltaE = (first: Hex, second: Hex, vision: Vision = 'normal'): number => {
  const [a, b] = [first, second].map((hex) => linearToOklab(simulate(channels(hex).map(toLinear), vision)));
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
};
```

- [ ] **Step 5: Run, expect PASS** — `npx vitest run tests/color.test.ts`; then `npx tsc --noEmit` and `npx eslint .` clean.

- [ ] **Step 6: Commit**
```bash
git add package.json package-lock.json tsconfig.json vitest.config.ts eslint.config.js .gitignore src/color.ts tests/color.test.ts
git commit -m "feat: add color math for contrast, OKLab and color-vision checks"
```

---

### Task 2: Palette, roles and gates

**Files:**
- Create: `src/palette.ts`, `src/roles.ts`, `tests/palette.test.ts`, `tests/hex-only-in-palette.test.ts`

**Interfaces:**
- Consumes: `Hex`, `contrast`, `composite`, `deltaE` from Task 1.
- Produces: `palette` (const object of `Hex`); `type Style = { color: Hex; fontStyle?: 'italic' | 'bold' | 'underline' }`; `roles` with groups `bg`, `border`, `fg`, `accent`, `status`, `git`, `editor`, `syntax` (each entry a `Style`), `ansi`.

- [ ] **Step 1: Write the failing tests**

`tests/palette.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { composite, contrast, deltaE, type Hex } from '../src/color';
import { roles } from '../src/roles';

const { syntax, bg, fg, editor } = roles;
const nonCode = new Set(['comment', 'quote']);
const codeTokens = Object.entries(syntax).filter(([name]) => !nonCode.has(name));

describe('contrast gates (01 §5)', () => {
  it.each(codeTokens)('%s is at least 4.5:1 on bg.base', (_, style) =>
    expect(contrast(style.color, bg.base)).toBeGreaterThanOrEqual(4.5));

  it('comment is at least 3:1 on bg.base', () => expect(contrast(syntax.comment.color, bg.base)).toBeGreaterThanOrEqual(3));

  it.each([bg.base, bg.raised, bg.overlay])('fg.muted is at least 4.5:1 on %s', (surface) =>
    expect(contrast(fg.muted, surface)).toBeGreaterThanOrEqual(4.5));

  const overlays: Hex[] = [
    editor.selection, editor.selectionInactive, editor.findMatch, editor.findCurrent, editor.wordHighlight,
    editor.lineCurrent, editor.bracketMatch, editor.invalidBackground, editor.diffAdded, editor.diffDeleted,
    editor.conflictBackground,
  ];
  it.each(overlays)('overlay %s keeps every code token at least 3:1', (overlay) => {
    const surface = composite(overlay, bg.base);
    const failing = codeTokens.filter(([, style]) => contrast(style.color, surface) < 3).map(([name]) => name);
    expect(failing).toEqual([]);
  });
});

describe('hue separation gates (01 §5)', () => {
  const gated = ['keyword', 'modifier', 'property', 'string', 'function', 'type', 'number', 'invalid', 'variable', 'punctuation', 'comment'] as const;
  const accepted = new Set(['function/variable/protanopia']);
  const pairs = gated.flatMap((first, index) => gated.slice(index + 1).map((second) => [first, second] as const));

  it.each(pairs)('%s vs %s is at least 0.08 apart', (first, second) =>
    expect(deltaE(syntax[first].color, syntax[second].color)).toBeGreaterThanOrEqual(0.08));

  it.each(pairs)('%s vs %s stays at least 0.05 apart under deuteranopia and protanopia', (first, second) => {
    const failing = (['deuteranopia', 'protanopia'] as const).filter(
      (vision) => !accepted.has(`${first}/${second}/${vision}`) && deltaE(syntax[first].color, syntax[second].color, vision) < 0.05,
    );
    expect(failing).toEqual([]);
  });
});
```

`tests/hex-only-in-palette.test.ts`:
```ts
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, it } from 'vitest';

it('keeps hex literals inside src/palette.ts only', () => {
  const files = readdirSync('src', { recursive: true, encoding: 'utf8' })
    .filter((file) => file.endsWith('.ts') && file !== 'palette.ts');
  const offenders = files.filter((file) => /#[0-9a-fA-F]{6}\b/.test(readFileSync(join('src', file), 'utf8')));
  expect(offenders).toEqual([]);
});
```

- [ ] **Step 2: Run, expect FAIL** — `npx vitest run tests/palette.test.ts tests/hex-only-in-palette.test.ts` fails on missing `../src/roles`.

- [ ] **Step 3: Implement** `src/palette.ts` with every value from `01-palette.md` §1 (core, terminal-only, alpha table), names camelCase as in the spec. Add one value the spec lacks, the merge-conflict wash `orchidSoft: '#B98CCD26'`; the overlay gate above covers it.
```ts
import type { Hex } from './color';

export const palette = {
  bgDeep: '#080E13',
  bgBase: '#0D1318',
  bgRaised: '#152029',
  bgOverlay: '#1B252D',
  borderSubtle: '#1D2A33',
  borderStrong: '#283945',
  fgBase: '#E7E8E8',
  fgMuted: '#818C96',
  fgSubtle: '#5B758A',
  fgFaint: '#3D4246',
  aqua: '#4FF8D2',
  fuchsia: '#E879F9',
  orchid: '#B98CCD',
  sky: '#7DD3FC',
  emerald: '#34D399',
  yellow: '#E0CA3C',
  peach: '#FDA77F',
  red: '#FF6663',
  lime: '#A4DF95',
  // terminal-only
  blue: '#42A3FD',
  redBright: '#FE9892',
  yellowBright: '#F7E158',
  fuchsiaBright: '#F3A5FF',
  aquaBright: '#88FFE4',
  grayLight: '#C5CACE',
  white: '#FAFAFA',
  // overlays, composited on bgBase
  aquaSoft: '#4FF8D226',
  aquaFaint: '#4FF8D21A',
  aquaBorder: '#4FF8D299',
  borderStrongHalf: '#28394580',
  yellowSoft: '#E0CA3C26',
  yellowStrong: '#E0CA3C38',
  skyFaint: '#7DD3FC1A',
  whiteTrace: '#FFFFFF08',
  redSoft: '#FF666326',
  redFaint: '#FF66631A',
  limeFaint: '#A4DF951A',
  orchidSoft: '#B98CCD26',
} as const satisfies Record<string, Hex>;
```

`src/roles.ts` (role map is `01-palette.md` §4):
```ts
import type { Hex } from './color';
import { palette as p } from './palette';

export type Style = { color: Hex; fontStyle?: 'italic' | 'bold' | 'underline' };

export const roles = {
  bg: { deep: p.bgDeep, base: p.bgBase, raised: p.bgRaised, overlay: p.bgOverlay },
  border: { subtle: p.borderSubtle, strong: p.borderStrong },
  fg: { base: p.fgBase, muted: p.fgMuted, subtle: p.fgSubtle, faint: p.fgFaint },
  accent: { base: p.aqua, soft: p.aquaSoft },
  status: { error: p.red, warning: p.yellow, info: p.sky, hint: p.fgSubtle, success: p.lime },
  git: { added: p.lime, modified: p.sky, deleted: p.red, ignored: p.fgFaint, conflict: p.orchid },
  editor: {
    cursor: p.aqua,
    selection: p.aquaSoft,
    selectionInactive: p.borderStrongHalf,
    findMatch: p.yellowSoft,
    findCurrent: p.yellowStrong,
    findCurrentBorder: p.yellow,
    wordHighlight: p.skyFaint,
    lineCurrent: p.whiteTrace,
    bracketMatch: p.aquaFaint,
    bracketMatchBorder: p.aquaBorder,
    indentGuide: p.borderSubtle,
    indentGuideActive: p.fgFaint,
    invalidBackground: p.redSoft,
    diffAdded: p.limeFaint,
    diffDeleted: p.redFaint,
    conflictBackground: p.orchidSoft,
  },
  syntax: {
    keyword: { color: p.fuchsia },
    modifier: { color: p.orchid },
    property: { color: p.sky },
    string: { color: p.emerald },
    function: { color: p.aqua },
    constant: { color: p.aqua },
    number: { color: p.peach },
    type: { color: p.yellow },
    variable: { color: p.fgBase },
    parameter: { color: p.fgBase, fontStyle: 'italic' },
    variableSpecial: { color: p.orchid, fontStyle: 'italic' },
    operator: { color: p.fgMuted },
    punctuation: { color: p.fgMuted },
    comment: { color: p.fgSubtle },
    tag: { color: p.fuchsia },
    attribute: { color: p.sky, fontStyle: 'italic' },
    regexp: { color: p.emerald },
    escape: { color: p.fuchsia },
    invalid: { color: p.red, fontStyle: 'underline' },
    namespace: { color: p.fgBase },
    label: { color: p.orchid },
    preproc: { color: p.orchid },
    title: { color: p.aqua, fontStyle: 'bold' },
    linkText: { color: p.sky },
    linkUri: { color: p.fgMuted, fontStyle: 'underline' },
    emphasis: { color: p.fgBase, fontStyle: 'italic' },
    strong: { color: p.fgBase, fontStyle: 'bold' },
    literal: { color: p.emerald },
    listMarker: { color: p.orchid },
    quote: { color: p.fgSubtle },
  },
  ansi: {
    black: p.borderStrong, red: p.red, green: p.emerald, yellow: p.yellow,
    blue: p.blue, magenta: p.fuchsia, cyan: p.aqua, white: p.grayLight,
    brightBlack: p.fgSubtle, brightRed: p.redBright, brightGreen: p.lime, brightYellow: p.yellowBright,
    brightBlue: p.sky, brightMagenta: p.fuchsiaBright, brightCyan: p.aquaBright, brightWhite: p.white,
  },
} as const satisfies {
  syntax: Record<string, Style>;
  [group: string]: Record<string, Hex | Style>;
};
```

- [ ] **Step 4: Run, expect PASS** — same command. If a gate fails, stop and report the number; do not tweak hex (color decisions belong to the palette spec).

- [ ] **Step 5: Commit**
```bash
git add src/palette.ts src/roles.ts tests/palette.test.ts tests/hex-only-in-palette.test.ts
git commit -m "feat: add Lupin palette and semantic roles with contrast and hue gates"
```

---

### Task 3: VS Code target

**Files:**
- Create: `src/targets/vscode/colors.ts`, `src/targets/vscode/token-colors.ts`, `src/targets/vscode/semantic-tokens.ts`, `src/targets/vscode/index.ts`, `tests/vscode.test.ts`, `tests/fixtures/vscode-color-ids.json`

**Interfaces:**
- Consumes: `roles`, `Style`.
- Produces: `vscodeTheme` = `{ $schema, name: 'Lupin Theme', type: 'dark', semanticHighlighting: true, colors, tokenColors, semanticTokenColors }`; `tokenColors: { name: string; scope: string[]; settings: { foreground: Hex; fontStyle?: string } }[]`.

- [ ] **Step 1: Vendor the valid key list.** Extract every color id from https://code.visualstudio.com/api/references/theme-color (lines like `` `editor.background`: ``) into `tests/fixtures/vscode-color-ids.json` as a sorted string array. Do it with a one-off `ctx_execute` fetch; do not commit the script.

- [ ] **Step 2: Write the failing test** `tests/vscode.test.ts`
```ts
import { describe, expect, it } from 'vitest';
import validIds from './fixtures/vscode-color-ids.json';
import { roles } from '../src/roles';
import { vscodeTheme } from '../src/targets/vscode';

const hexPattern = /^#[0-9A-F]{6}([0-9A-F]{2})?$/;
const { colors, tokenColors, semanticTokenColors } = vscodeTheme;

describe('vscode workbench colors', () => {
  it('uses only keys VS Code knows', () =>
    expect(Object.keys(colors).filter((key) => !validIds.includes(key))).toEqual([]));

  it('uses only uppercase hex values', () =>
    expect(Object.values(colors).filter((value) => !hexPattern.test(value))).toEqual([]));

  it.each(['editor.background', 'editor.foreground', 'editorCursor.foreground', 'focusBorder', 'tab.activeBorder', 'statusBar.background', 'terminal.ansiCyan'])(
    'sets %s', (key) => expect(colors).toHaveProperty([key]));

  it('paints the editor with bg.base and fg.base', () => {
    expect(colors['editor.background']).toBe(roles.bg.base);
    expect(colors['editor.foreground']).toBe(roles.fg.base);
  });
});

describe('vscode token colors', () => {
  it('gives every rule a scope and a hex foreground', () => {
    const broken = tokenColors.filter((rule) => rule.scope.length === 0 || !hexPattern.test(rule.settings.foreground));
    expect(broken).toEqual([]);
  });

  it('uses every syntax role at least once', () => {
    const used = new Set(tokenColors.map((rule) => `${rule.settings.foreground}/${rule.settings.fontStyle ?? ''}`));
    const unused = Object.entries(roles.syntax)
      .filter(([, style]) => !used.has(`${style.color}/${style.fontStyle ?? ''}`))
      .map(([name]) => name);
    expect(unused).toEqual([]);
  });
});

describe('vscode semantic tokens', () => {
  it('enables semantic highlighting', () => expect(vscodeTheme.semanticHighlighting).toBe(true));
  it.each(['class', 'interface', 'enumMember', 'parameter', 'property', 'function', 'method', 'macro', 'namespace', 'decorator'])(
    'colors %s', (selector) => expect(semanticTokenColors).toHaveProperty([selector]));
});
```

- [ ] **Step 3: Run, expect FAIL** — `npx vitest run tests/vscode.test.ts` fails on missing module.

- [ ] **Step 4: Implement.** Transcribe `04-surface-map.md` §1, §2 and §3 tables into the three data files. Resolve each role name through `roles` (e.g. `bg.base` becomes `roles.bg.base`, `selection` becomes `roles.editor.selection`, syntax roles become `roles.syntax.<name>`). Keep the section order and the 04 group headings as one-line comments. Order of token rules matters: generic groups first, language groups after (04 §2).

`src/targets/vscode/token-colors.ts` shape:
```ts
import type { Hex } from '../../color';
import { roles, type Style } from '../../roles';

const { syntax } = roles;

export type TokenColor = { name: string; scope: string[]; settings: { foreground: Hex; fontStyle?: string } };

const rule = (name: string, scope: string[], style: Style): TokenColor => ({
  name,
  scope,
  settings: style.fontStyle ? { foreground: style.color, fontStyle: style.fontStyle } : { foreground: style.color },
});

export const tokenColors: TokenColor[] = [
  // Generic
  rule('Comment', ['comment', 'punctuation.definition.comment'], syntax.comment),
  rule('Keyword', ['keyword', 'keyword.control'], syntax.keyword),
  rule('Storage and modifiers', ['storage.type', 'storage.modifier'], syntax.modifier),
  // ... every row of 04 §2, in order
];
```

`src/targets/vscode/colors.ts` shape:
```ts
import type { Hex } from '../../color';
import { roles } from '../../roles';

const { bg, fg, border, accent, editor, status, git, ansi } = roles;

export const colors: Record<string, Hex> = {
  // Editor core
  'editor.background': bg.base,
  'editor.foreground': fg.base,
  'editorCursor.foreground': editor.cursor,
  // ... every row of 04 §1, in order
};
```

`src/targets/vscode/semantic-tokens.ts` shape:
```ts
import { roles, type Style } from '../../roles';

const { syntax } = roles;

const toSemantic = (style: Style) => (style.fontStyle ? { foreground: style.color, fontStyle: style.fontStyle } : { foreground: style.color });

export const semanticTokenColors = {
  class: toSemantic(syntax.type),
  parameter: toSemantic(syntax.parameter),
  // ... every row of 04 §3
};
```

`src/targets/vscode/index.ts`:
```ts
import { colors } from './colors';
import { semanticTokenColors } from './semantic-tokens';
import { tokenColors } from './token-colors';

export const vscodeTheme = {
  $schema: 'vscode://schemas/color-theme',
  name: 'Lupin Theme',
  type: 'dark',
  semanticHighlighting: true,
  colors,
  tokenColors,
  semanticTokenColors,
};
```
Move the `rule`/`toSemantic` helper into whichever file uses it; do not create a shared helpers file for one function.

- [ ] **Step 5: Run, expect PASS**; typecheck and lint clean.

- [ ] **Step 6: Commit**
```bash
git add src/targets/vscode tests/vscode.test.ts tests/fixtures/vscode-color-ids.json
git commit -m "feat: generate VS Code workbench, token and semantic colors from roles"
```

---

### Task 4: Zed target and cross-editor parity

**Files:**
- Create: `src/targets/zed/style.ts`, `src/targets/zed/syntax.ts`, `src/targets/zed/index.ts`, `tests/zed.test.ts`, `tests/parity.test.ts`, `tests/fixtures/zed-schema-v0.2.0.json`
- Run: `npm i -D ajv`

**Interfaces:**
- Consumes: `roles`, `Style`, `vscodeTheme.tokenColors`.
- Produces: `zedTheme` = `{ $schema: 'https://zed.dev/schema/themes/v0.2.0.json', name: 'Lupin Theme', author: 'Emerson Silva', themes: [{ name: 'Lupin Theme', appearance: 'dark', style }] }`, where `style.syntax: Record<string, { color: Hex; font_style?: 'italic'; font_weight?: number }>`.

- [ ] **Step 1: Vendor schema.** Save https://zed.dev/schema/themes/v0.2.0.json verbatim to `tests/fixtures/zed-schema-v0.2.0.json` (draft-07, so the default `Ajv` export works).

- [ ] **Step 2: Write the failing tests**

`tests/zed.test.ts`:
```ts
import Ajv from 'ajv';
import { describe, expect, it } from 'vitest';
import schema from './fixtures/zed-schema-v0.2.0.json';
import { roles } from '../src/roles';
import { zedTheme } from '../src/targets/zed';

const { syntax: captures, ...style } = zedTheme.themes[0].style;
const knownStyleKeys = Object.keys(schema.definitions.ThemeStyleContent.properties);

// 01 §8 "Zed capture map (complete)" plus the 04 §5 extras.
const requiredCaptures = [
  'attribute', 'boolean', 'comment', 'comment.doc', 'constant', 'constructor', 'embedded', 'emphasis',
  'emphasis.strong', 'enum', 'function', 'hint', 'keyword', 'label', 'link_text', 'link_uri', 'number',
  'operator', 'predictive', 'preproc', 'primary', 'property', 'punctuation', 'punctuation.bracket',
  'punctuation.delimiter', 'punctuation.list_marker', 'punctuation.special', 'string', 'string.escape',
  'string.regex', 'string.special', 'string.special.symbol', 'tag', 'text.literal', 'title', 'type',
  'type.interface', 'type.super', 'variable', 'variable.member', 'variable.parameter', 'variable.special', 'variant',
];

describe('zed theme', () => {
  it('validates against schema v0.2.0', () => {
    const validate = new Ajv({ strict: false }).compile(schema);
    expect(validate(zedTheme), JSON.stringify(validate.errors)).toBe(true);
  });

  it('uses only style keys the schema knows', () =>
    expect(Object.keys(style).filter((key) => !knownStyleKeys.includes(key))).toEqual([]));

  it.each(requiredCaptures)('maps capture %s', (capture) => expect(captures).toHaveProperty([capture]));

  it('sets the local player cursor and selection to the accent', () => {
    expect(style.players[0].cursor).toBe(roles.accent.base);
    expect(style.players[0].selection).toBe(roles.editor.selection);
  });
});
```

`tests/parity.test.ts` (04 §6; R8):
```ts
import { expect, it } from 'vitest';
import { vscodeTheme } from '../src/targets/vscode';
import { zedTheme } from '../src/targets/zed';

const captures = zedTheme.themes[0].style.syntax;

const scopeColor = (scope: string) =>
  vscodeTheme.tokenColors.findLast((rule) => rule.scope.includes(scope))?.settings.foreground;

// [VS Code scope, Zed capture] for every syntax row of 04 §6 where both editors have a match.
const pairs = [
  ['keyword.control', 'keyword'],
  ['string', 'string'],
  ['comment', 'comment'],
  // ... every syntax row of 04 §6 except the documented gaps (modifier, invalid, namespace, lifetime)
] as const;

it.each(pairs)('VS Code %s and Zed %s share one color', (scope, capture) =>
  expect(scopeColor(scope)).toBe(captures[capture].color));
```

- [ ] **Step 3: Run, expect FAIL** — `npx vitest run tests/zed.test.ts tests/parity.test.ts`.

- [ ] **Step 4: Implement.** Transcribe `04-surface-map.md` §4 into `style.ts` and `01-palette.md` §8 capture map plus 04 §5 extras into `syntax.ts`, resolving role names through `roles`. Add `players` with one entry `{ cursor: roles.accent.base, background: roles.accent.base, selection: roles.editor.selection }`. Style conversion for captures: `italic` → `font_style: 'italic'`; `bold` → `font_weight: 700`; `underline` → dropped (Zed has no underline for syntax).

`src/targets/zed/syntax.ts` shape:
```ts
import { roles, type Style } from '../../roles';

const { syntax } = roles;

const toCapture = ({ color, fontStyle }: Style) => ({
  color,
  ...(fontStyle === 'italic' && { font_style: 'italic' as const }),
  ...(fontStyle === 'bold' && { font_weight: 700 }),
});

export const captures = {
  attribute: toCapture(syntax.attribute),
  boolean: toCapture(syntax.number),
  // ... every capture
};
```

`src/targets/zed/index.ts`:
```ts
import { captures } from './syntax';
import { style } from './style';

export const zedTheme = {
  $schema: 'https://zed.dev/schema/themes/v0.2.0.json',
  name: 'Lupin Theme',
  author: 'Emerson Silva',
  themes: [{ name: 'Lupin Theme', appearance: 'dark', style: { ...style, syntax: captures } }],
};
```

- [ ] **Step 5: Run, expect PASS**; typecheck and lint clean.

- [ ] **Step 6: Commit**
```bash
git add package.json package-lock.json src/targets/zed tests/zed.test.ts tests/parity.test.ts tests/fixtures/zed-schema-v0.2.0.json
git commit -m "feat: generate Zed theme from roles with schema and parity checks"
```

---

### Task 5: Build, extension manifests and packaging

**Files:**
- Create: `src/build.ts`, `scripts/build.ts`, `tests/build.test.ts`, `extensions/vscode/package.json`, `extensions/vscode/README.md`, `extensions/vscode/LICENSE` (copy of root), `extensions/zed/extension.toml`, `extensions/zed/LICENSE` (copy of root), generated `extensions/vscode/themes/lupin-theme-color-theme.json`, `extensions/zed/themes/lupin-theme.json`
- Run: `npm i -D @vscode/vsce`

**Interfaces:**
- Consumes: `vscodeTheme`, `zedTheme`.
- Produces: `outputs: Record<string, object>` (path → theme), `render(theme: object): string`.

- [ ] **Step 1: Write the failing test** `tests/build.test.ts`
```ts
import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import { outputs, render } from '../src/build';

it('renders pretty JSON with a trailing newline', () => expect(render({ a: 1 })).toBe('{\n  "a": 1\n}\n'));

it.each(Object.entries(outputs))('%s matches a fresh build (run npm run build)', (path, theme) =>
  expect(readFileSync(path, 'utf8')).toBe(render(theme)));
```

- [ ] **Step 2: Run, expect FAIL** — `npx vitest run tests/build.test.ts`.

- [ ] **Step 3: Implement**

`src/build.ts`:
```ts
import { vscodeTheme } from './targets/vscode';
import { zedTheme } from './targets/zed';

export const outputs: Record<string, object> = {
  'extensions/vscode/themes/lupin-theme-color-theme.json': vscodeTheme,
  'extensions/zed/themes/lupin-theme.json': zedTheme,
};

export const render = (theme: object): string => `${JSON.stringify(theme, null, 2)}\n`;
```

`scripts/build.ts`:
```ts
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { outputs, render } from '../src/build';

for (const [path, theme] of Object.entries(outputs)) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, render(theme));
}
```

`extensions/vscode/package.json`:
```json
{
  "name": "lupin-theme",
  "displayName": "Lupin Theme",
  "description": "A calm dark theme inspired by the turso.tech code blocks.",
  "version": "0.1.0",
  "publisher": "emersonjds",
  "author": "Emerson Silva",
  "license": "MIT",
  "repository": { "type": "git", "url": "https://github.com/emersonjds/lupin-theme" },
  "engines": { "vscode": "^1.80.0" },
  "categories": ["Themes"],
  "keywords": ["lupin", "lupin-theme", "dark", "theme", "turso"],
  "contributes": {
    "themes": [{ "label": "Lupin Theme", "uiTheme": "vs-dark", "path": "./themes/lupin-theme-color-theme.json" }]
  }
}
```

`extensions/zed/extension.toml`:
```toml
id = "lupin-theme"
name = "Lupin Theme"
version = "0.1.0"
schema_version = 1
authors = ["Emerson Silva <emerson_jdss@hotmail.com>"]
description = "A calm dark theme inspired by the turso.tech code blocks."
repository = "https://github.com/emersonjds/lupin-theme"
```

`extensions/vscode/README.md`: three lines (name, one-line description, link to the repository README).

- [ ] **Step 4: Generate and run, expect PASS** — `npm run build && npx vitest run tests/build.test.ts`.

- [ ] **Step 5: Package** — `npm run package`; expect `lupin-theme.vsix` at repo root and no interactive prompt. Add `*.vsix` is already ignored.

- [ ] **Step 6: Commit**
```bash
git add package.json package-lock.json src/build.ts scripts/build.ts tests/build.test.ts extensions/vscode/package.json extensions/vscode/README.md extensions/vscode/LICENSE extensions/vscode/themes/lupin-theme-color-theme.json extensions/zed/extension.toml extensions/zed/LICENSE extensions/zed/themes/lupin-theme.json
git commit -m "feat: build VS Code and Zed extensions from the generator"
```

---

### Task 6: Cross-language fixtures, Shiki checks and preview

**Files:**
- Create: `tests/fixtures/languages/<shiki-id>.<ext>` × 23, `tests/languages.test.ts`, `scripts/preview.ts`
- Run: `npm i -D shiki`

**Interfaces:**
- Consumes: `vscodeTheme`, `roles`.

Fixture names (Shiki id before the first dot): `typescript.ts`, `javascript.js`, `java.java`, `kotlin.kt`, `csharp.cs`, `python.py`, `go.go`, `rust.rs`, `c.c`, `cpp.cpp`, `php.php`, `ruby.rb`, `swift.swift`, `sql.sql`, `html.html`, `css.css`, `scss.scss`, `json.json`, `yaml.yaml`, `toml.toml`, `markdown.md`, `shellscript.sh`, `dockerfile.dockerfile`.

- [ ] **Step 1: Write fixtures.** Each 25–45 lines of idiomatic, realistic code covering: imports, a class/struct/type, a function with typed parameters, generics, annotation/decorator/attribute where the language has one, a string with escape and interpolation, numbers, boolean and null, a line comment and a doc comment. SQL: DDL + a query with JOIN, aggregate, CTE. Data and markup files: nested keys, all value kinds.

- [ ] **Step 2: Write the failing test** `tests/languages.test.ts`
```ts
import { readdirSync, readFileSync } from 'node:fs';
import { createHighlighter } from 'shiki';
import { describe, expect, it } from 'vitest';
import { roles } from '../src/roles';
import { vscodeTheme } from '../src/targets/vscode';

const directory = 'tests/fixtures/languages';
const fixtures = readdirSync(directory).map((file) => ({ file, language: file.split('.')[0] }));
const highlighter = await createHighlighter({ themes: [vscodeTheme], langs: fixtures.map(({ language }) => language) });

const mustBeColored = /^(keyword|storage|entity\.name\.(type|class|function|tag)|support\.(type|class|function)|string|constant\.(numeric|language)|comment|entity\.other\.attribute-name|meta\.decorator|support\.type\.property-name)/;
const neutral = new Set<string>([roles.fg.base, roles.fg.muted, roles.syntax.comment.color]);
const dataLanguages = new Set(['json', 'yaml', 'toml']);

const tokenize = (file: string, language: string) =>
  highlighter.codeToTokensBase(readFileSync(`${directory}/${file}`, 'utf8'), { lang: language, theme: 'Lupin Theme', includeExplanation: true }).flat();

describe.each(fixtures)('$file', ({ file, language }) => {
  const tokens = tokenize(file, language);

  it('colors every keyword, type, function, string, number, constant, comment and attribute', () => {
    const uncolored = tokens.flatMap((token) =>
      (token.explanation ?? [])
        .filter((part) => part.content.trim() && mustBeColored.test(part.scopes.at(-1)?.scopeName ?? '') && token.color?.toUpperCase() === roles.fg.base)
        .map((part) => `${part.content.trim()} <${part.scopes.at(-1)?.scopeName}>`),
    );
    expect(uncolored).toEqual([]);
  });

  it('balances hues: at least 3, none above 45% of colored characters', () => {
    const shares = new Map<string, number>();
    for (const token of tokens) {
      const color = token.color?.toUpperCase() ?? roles.fg.base;
      if (!neutral.has(color) && token.content.trim()) shares.set(color, (shares.get(color) ?? 0) + token.content.trim().length);
    }
    const total = [...shares.values()].reduce((sum, count) => sum + count, 0);
    expect(shares.size).toBeGreaterThanOrEqual(3);
    if (!dataLanguages.has(language)) expect(Math.max(...shares.values()) / total).toBeLessThanOrEqual(0.45);
  });
});
```

- [ ] **Step 3: Run, expect FAIL** — first run fails because `shiki` is missing or because fixtures expose unmapped scopes. Record the failing list in the report.

- [ ] **Step 4: Fix.** For each uncolored scope, add the scope to the right 04 §2 group in `token-colors.ts` (same role 04 assigns to that kind of token). For a hue-balance failure, stop and report the language and shares; color changes go through the palette spec. Update `04-surface-map.md` §2 with every scope you added.

- [ ] **Step 5: Preview script** `scripts/preview.ts`
```ts
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHighlighter } from 'shiki';
import { roles } from '../src/roles';
import { vscodeTheme } from '../src/targets/vscode';

const directory = 'tests/fixtures/languages';
const files = readdirSync(directory);
const languages = files.map((file) => file.split('.')[0]);
const highlighter = await createHighlighter({ themes: [vscodeTheme], langs: languages });

const sections = files.map((file, index) =>
  `<h2>${file}</h2>${highlighter.codeToHtml(readFileSync(`${directory}/${file}`, 'utf8'), { lang: languages[index], theme: 'Lupin Theme' })}`,
);

mkdirSync('preview', { recursive: true });
writeFileSync(
  'preview/index.html',
  `<!doctype html><meta charset="utf-8"><title>Lupin Theme preview</title>
<style>body{background:${roles.bg.deep};color:${roles.fg.muted};font:14px/1.6 "Geist Mono",ui-monospace,monospace;padding:24px}pre{padding:16px;border:1px solid ${roles.border.strong};border-radius:12px;overflow-x:auto}</style>
${sections.join('\n')}`,
);
```

- [ ] **Step 6: Run, expect PASS** — `npm run build && npx vitest run tests/languages.test.ts && npm run preview`.

- [ ] **Step 7: Commit**
```bash
git add package.json package-lock.json tests/fixtures/languages tests/languages.test.ts scripts/preview.ts src/targets/vscode/token-colors.ts docs/specs/04-surface-map.md extensions/vscode/themes/lupin-theme-color-theme.json
git commit -m "test: check syntax coverage and hue balance across 23 languages"
```

---

### Task 7: README and final verification

**Files:**
- Create: `README.md`

- [ ] **Step 1: README** with: one-line pitch and "inspired by turso.tech" credit (no Turso logo, not affiliated); palette table (name, hex, role) from 01 §1 core; install for VS Code (`npm ci && npm run package`, then `code --install-extension lupin-theme.vsix` or Extensions → Install from VSIX) and Zed (Command Palette → `zed: install dev extension` → select `extensions/zed`); fonts section copied from 01 §7 (Geist Mono, Inter, settings snippets for both editors); development commands; license.

- [ ] **Step 2: Full verification** (one run each, report output summary):
```bash
npm run typecheck && npm run lint && npm run build && npm test && git status --short
```
Expect: no type errors, 0 lint errors, all tests green, coverage ≥ 90% on all four metrics, and no diff in `extensions/*/themes/` after build.

- [ ] **Step 3: Commit**
```bash
git add README.md
git commit -m "docs: add README with install, palette and font setup"
```
