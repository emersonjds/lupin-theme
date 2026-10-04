# Lupin Theme

Dark theme for VS Code and Zed, inspired by the code blocks on [turso.tech](https://turso.tech). Not affiliated with Turso.

![Lupin Theme preview: TypeScript, Java, Rust and SQL](docs/images/preview.png)

## What it is

Lupin is a single dark theme, built for long sessions on ordinary monitors. The background is a near-black blue, the text is a soft off-white, and one bright color (aqua) is kept for the things you act on: the cursor, function calls and keyboard focus. Everything else is deliberately quieter.

Each kind of code gets one color, and that color means the same thing in every language:

| You see | It is |
|---|---|
| aqua | a function or method |
| fuchsia | a keyword that drives the flow (`if`, `return`, `import`) |
| orchid | a modifier (`public`, `static`, `const`) or `self`/`this` |
| yellow | a type, class or interface |
| sky | a property, object key or decorator |
| pistachio | a string |
| peach | a fixed value: number, boolean, `null`, `UPPER_CASE` constant, enum member |
| off-white | a variable or parameter |
| blue-steel | a comment |

The VS Code and Zed versions are generated from the same palette, so the theme looks the same in both editors. Current version: 0.1.1.

## Why Lupin

- Colors start from turso.tech's own code blocks, then are tuned for all-day reading: every change is measured, not eyeballed.
- Calm near-black blue background (`#0D1318`), not pure black — less glare, more room to layer panels and popups.
- One saturated accent (aqua `#4FF8D2`) for cursor, functions and focus; everything else stays low-chroma so the accent actually means something.
- Strings, calls and fixed values read apart by hue, not only by brightness, so they stay distinct at small font sizes on 1080p panels.
- Tuned and tested across 23 languages, not just the two or three a theme author happens to write in.
- Every contrast and hue decision is a computed number, checked for deuteranopia and protanopia, not an eyeball call.

## Install

### VS Code

Build from source (no Marketplace listing yet):

```bash
npm ci && npm run package
```

Then either:

```bash
code --install-extension lupin-theme.vsix
```

(use `code-insiders` for VS Code Insiders), or open the Extensions panel → `...` menu → **Install from VSIX...**.

Then: `Preferences: Color Theme` → **Lupin Theme**.

### Zed

Command Palette → `zed: install dev extension` → select `extensions/zed`.

Then: `theme selector: toggle` → **Lupin Theme**.

> Marketplace, Open VSX and Zed registry publishing are coming — see Roadmap.

## Recommended fonts

Editor themes cannot set fonts. Lupin is tuned for Geist Mono (code) and Inter (UI, Zed only):

```bash
brew install --cask font-geist-mono font-inter
```

VS Code `settings.json`:

```json
{
  "workbench.colorTheme": "Lupin Theme",
  "editor.fontFamily": "'Geist Mono', Menlo, monospace",
  "editor.fontSize": 14,
  "editor.lineHeight": 1.6,
  "editor.fontLigatures": true,
  "terminal.integrated.fontFamily": "'Geist Mono'",
  "terminal.integrated.fontSize": 14
}
```

Zed `settings.json`:

```json
{
  "theme": "Lupin Theme",
  "buffer_font_family": "Geist Mono",
  "buffer_font_size": 14,
  "buffer_line_height": { "custom": 1.6 },
  "buffer_font_features": { "calt": true, "liga": true },
  "ui_font_family": "Inter",
  "ui_font_size": 15,
  "terminal": { "font_family": "Geist Mono" }
}
```

## Palette

20 core colors. Full numbers (OKLCH, WCAG, APCA) and the gates behind each choice: `docs/specs/01-palette.md`.

![Lupin Theme palette swatches](docs/images/palette.png)

| Name | Hex | Role |
|---|---|---|
| bgDeep | `#080E13` | bg.deep (title/activity bar) |
| bgBase | `#0D1318` | bg.base (editor background) |
| bgRaised | `#152029` | bg.raised (panels, sidebar, tabs) |
| bgOverlay | `#1B252D` | bg.overlay (popups, menus, hover) |
| borderSubtle | `#1D2A33` | border.subtle, indent.guide |
| borderStrong | `#283945` | border.strong, ansi black |
| fgBase | `#E7E8E8` | fg.base, variable, parameter |
| fgMuted | `#818C96` | fg.muted, punctuation, operator, link uri |
| fgSubtle | `#5B758A` | fg.subtle, comment, hint, md quote |
| fgFaint | `#3D4246` | fg.faint, inactive line numbers |
| aqua | `#4FF8D2` | accent, cursor, function, method, md heading |
| fuchsia | `#E879F9` | keyword (control, import, return), tag, escape |
| orchid | `#B98CCD` | storage/modifier, self/this, lifetime, label, preproc |
| sky | `#7DD3FC` | property, attribute/decorator, object key, md link text |
| pistachio | `#B9EC89` | string, regexp, md inline code |
| emerald | `#34D399` | terminal green |
| yellow | `#E0CA3C` | type, class, interface, generic, warning |
| peach | `#FDA77F` | number, boolean, null/nil, constant, enum member, symbol |
| red | `#FF6663` | error, invalid, git deleted |
| lime | `#A4DF95` | success, git added |

## Design principles

**Attention tiers** (contrast budget shrinks tier by tier): code + cursor > active state/feedback (selection, find, diagnostics) > navigation (sidebar, tabs, scrollbar) > chrome (title bar, status bar). If two elements in different tiers read with the same visual weight, the lower tier is wrong, not the higher one. Full element-by-element map: `docs/specs/02-attention-hierarchy.md`.

**Accent budget:** aqua is the single UI accent — cursor, active tab/view indicator, focus ring, primary button, active line number. Five spots, nowhere else. Two transient extras are allowed because they mark where the eye already is: the matched characters in Zed's pickers and the VS Code progress bar. Chrome never carries accent.

**Syntax decisions:**
- Keyword (`if`, `return`, `import`, fuchsia) vs. modifier (`public`, `static`, `final`, orchid) — same hue family, modifier at ~half the chroma, so a Java signature doesn't turn into a wall of one color.
- Types (class, interface, generic) get their own hue, yellow — distinct from properties, so type-heavy code (Java, Rust, Go) still reads its shape.
- Strings are pistachio, 43° of hue away from aqua function calls. The old turso emerald sat only 11° away and relied on brightness alone, which small glyphs lose.
- Numbers, booleans, null, named constants (`UPPER_CASE`), enum members and symbols share peach: everything that cannot change at runtime reads as one warm "fixed value" family.
- Comments are tinted on the background hue, not neutral gray, and held to >= 3.88:1 — readable, still clearly receded.
- Italic is reserved for exactly four roles: parameter, `self`/`this`, attribute/decorator, markdown emphasis. Nothing else gets a second channel.

## Color science: why these colors are easy on the eyes

The theme is meant for eight-hour sessions, so the goal is less effort per glance, not maximum punch. Each point below is a measured number in `docs/specs/01-palette.md`.

- **Dark blue background, not pure black.** `#0D1318` (OKLCH L 0.18, on hue 244). Bright text on pure `#000` produces halation, a glow that bleeds around letters and is worst for people with astigmatism. A slightly lifted, tinted background reduces it and leaves room for raised panels and popups.
- **Off-white text, not pure white.** `#E7E8E8` gives 15.2:1 contrast: far above the WCAG 7:1 AAA line, without the glare of 21:1 white on black.
- **Mid-chroma accents only.** Every syntax color sits in a fixed band: OKLCH lightness 0.70 to 0.89 and chroma 0.10 to 0.21. Very saturated colors on dark backgrounds appear to vibrate and tire the eye. The band keeps every token readable (≥ 4.5:1) without any color shouting over the code.
- **Separated in a perceptual color space.** Distances are measured in OKLab (Ottosson, 2020), where equal numbers mean roughly equal visible differences. Every pair of syntax colors is at least ΔE 0.088 apart, about 4 just-noticeable differences.
- **Hue before lightness for small text.** At 12 to 14 px the eye separates letters by hue much better than by small brightness steps. Strings (pistachio, hue 131°) and calls (aqua, 174°) differ by 43° of hue, so they separate at a glance.
- **Color-vision deficiency checked.** Every pair is simulated for deuteranopia, protanopia and tritanopia (Machado, Oliveira and Fernandes, 2009) and kept at least ΔE 0.05 apart, with one documented exception below.
- **Visible current line, without a border.** The cursor line gets a 7% white wash (ΔE 0.073 from the background), easy to find on non-retina panels. Every code token stays at least 3:1 even under a search match stacked on the current line.
- **Comments recede by design.** Blue-steel `#5B758A` at 3.88:1: readable when you look for them, quiet when you don't.
- **One accent.** Aqua marks only what acts or where you are (cursor, function calls, focus). When few things are bright, the bright things mean something.

## Accessibility

- Code tokens >= 4.5:1, comments >= 3:1 (tuned to 3.88 on the editor background), UI text >= 4.5:1, secondary/indicator UI >= 3:1 — all WCAG 2.x on `bg.base`.
- Every syntax pair checked in OKLab ΔE under simulated deuteranopia and protanopia (gated) and tritanopia (informative), Machado 2009, not just normal vision.
- Known accepted exceptions:
  - `function` (aqua) vs. `variable` (fgBase) falls under the deuteranopia/protanopia threshold — fixing it would mean glare-level fg or dropping turso's own aqua; position (`name(`) disambiguates.
  - Comment contrast drops below 3:1 under the three strongest selection/find fills, and under most fills stacked on the current line — code itself stays >= 3:1 throughout.
  - Tritanopia is informative only (~0.01% prevalence): lowest pair keyword/number at ΔE 0.061, every pair above 0.05.

## Languages tested

TypeScript, JavaScript, Java, Kotlin, C#, Python, Go, Rust, C, C++, PHP, Ruby, Swift, SQL, HTML, CSS, SCSS, JSON, YAML, TOML, Markdown, Shell, Dockerfile.

Dockerfile and Shell have sparse TextMate grammars — Dockerfile only colors instructions (command text stays `fg.base`), and shell arguments tokenize as strings. Both are exempted from the theme's "3+ hues per fixture" test gate for that reason.

## Good to know

- **Brackets are not rainbow-colored.** VS Code colors bracket pairs gold, pink and blue by default, outside any theme's palette. Lupin sets all of them to the punctuation color so brackets stay quiet.
- **`const` does not make a name peach.** A `const` variable in TypeScript keeps the variable color. Only `UPPER_CASE` constants and enum members read as fixed values, which is also how Zed sees them.
- **Semantic highlighting changes some colors in VS Code.** With the TypeScript native preview (`js/ts.experimental.useTsgo`) there are no semantic tokens, so only the TextMate colors apply. The theme is checked in both modes.
- **Some differences come from the language grammar, not the theme.** In Rust, `use`, `impl` and `as` share a scope with `fn`. In Ruby, `attr_accessor` reads as a keyword (fuchsia). In Kotlin, `as`, `is` and `in` read as modifiers (orchid).
- **Fonts are yours to set.** A theme cannot choose a font. See Recommended fonts above.

## How it works

One palette, one generator per editor:

```
palette.ts  ->  roles.ts  ->  targets/{vscode,zed}/  ->  extensions/*/themes/*.json
(raw hex)       (semantic      (role -> editor key)      (generated, committed)
                 roles)
```

```
src/palette.ts         raw colors; the only file allowed to contain hex
src/roles.ts           semantic roles (bg.base, syntax.keyword, ...) -> palette entries
src/color.ts           WCAG contrast, OKLab deltaE, alpha compositing, CVD simulation
src/targets/vscode/    roles -> VS Code theme object (colors, token colors, semantic tokens)
src/targets/zed/       roles -> Zed theme family object (schema v0.2.0)
scripts/build.ts       writes target objects as JSON into extensions/
extensions/vscode/     package.json, themes/lupin-theme-color-theme.json
extensions/zed/        extension.toml, themes/lupin-theme.json
tests/                 contrast, hue separation, schema, key coverage, parity, drift
```

Never edit `extensions/*/themes/*.json` by hand — they're generated, and a test fails if they drift from `scripts/build.ts` output.

## Development

| Command | Does |
|---|---|
| `npm test` | vitest, coverage gate >90% on statements/branches/functions/lines |
| `npm run build` | regenerate `extensions/*/themes` from `src/` |
| `npm run preview` | writes `preview/index.html` with every language fixture rendered |
| `npm run images` | renders `docs/images/palette.png` and `preview.png` from `src/` with headless Chrome (macOS) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | eslint, zero errors |
| `npm run package` | build the VS Code `.vsix` |

Specs: `docs/specs/` (research, palette, attention hierarchy, architecture). Plans: `docs/plans/`.

Test suite, one line each:

- `color.test.ts` — contrast/deltaE math against known reference values
- `palette.test.ts` — every gate in `01-palette.md`: contrast floors, hue separation, CVD
- `roles.test.ts` — every role resolves to a real palette entry
- `vscode.test.ts` — required workbench keys and TextMate scopes present, valid hex
- `zed.test.ts` — output validates against the vendored Zed schema v0.2.0
- `vscode-contrast.test.ts`, `zed-contrast.test.ts` — syntax and UI contrast floors in each editor's real output
- `parity.test.ts` — both editors assign the same role to the same thing
- `build.test.ts` — committed `extensions/*/themes/` match fresh build output
- `hex-only-in-palette.test.ts` — no hex literal outside `palette.ts`
- `languages.test.ts` — Shiki-tokenizes all 23 fixtures, checks role coverage and hue spread

## Releases

Tagged on GitHub: [tags](https://github.com/emersonjds/lupin-theme/tags).

- **0.1.1** — retune after daily use: strings moved to pistachio (further from the aqua of function calls), constants and enum members joined numbers in peach, the current line became visible, and tritanopia was added to the color-vision checks.
- **0.1.0** — first release for VS Code and Zed.

## Roadmap

- JetBrains/WebStorm port.
- Publish to VS Code Marketplace, Open VSX and the Zed extension registry.
- Light variant (maybe).

## Credits

Inspired by the code blocks on [turso.tech](https://turso.tech). Not affiliated with Turso. No Turso logo is used.

Color-theory reference: the Dracula and Dracula Pro specifications — see `docs/specs/05-dracula-lessons.md` for what was adopted and what was changed.

## License

MIT © Emerson Silva
