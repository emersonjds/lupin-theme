# Lupin Theme

Dark theme for VS Code and Zed, inspired by the code blocks on [turso.tech](https://turso.tech). Not affiliated with Turso.

## Install

### VS Code

```bash
npm ci && npm run package
```

Then either:

```bash
code --install-extension lupin-theme.vsix
```

(use `code-insiders` for VS Code Insiders) or Extensions panel → `...` menu → **Install from VSIX...**.

Then: `Preferences: Color Theme` → **Lupin Theme**.

### Zed

Command Palette → `zed: install dev extension` → select `extensions/zed`.

Then: `theme selector: toggle` → **Lupin Theme**.

## Fonts

Themes cannot set fonts. Recommended: [Geist Mono](https://vercel.com/font) for code, Inter for UI (Zed only).

```bash
brew install --cask font-geist-mono font-inter
```

Other OS: see https://vercel.com/font.

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

19 core colors. Full numbers (OKLCH, WCAG, APCA) and the gates behind each choice: `docs/specs/01-palette.md`.

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
| aqua | `#4FF8D2` | accent, cursor, function, method, constant, md heading |
| fuchsia | `#E879F9` | keyword (control, import, return), tag, escape |
| orchid | `#B98CCD` | storage/modifier, self/this, lifetime, label, preproc |
| sky | `#7DD3FC` | property, attribute/decorator, object key, md link text |
| emerald | `#34D399` | string, regexp, md inline code |
| yellow | `#E0CA3C` | type, class, interface, generic, warning |
| peach | `#FDA77F` | number, boolean, null/nil |
| red | `#FF6663` | error, invalid, git deleted |
| lime | `#A4DF95` | success, git added |

Code tokens pass WCAG >= 4.5:1, comments >= 3.88:1, syntax pairs checked for deuteranopia/protanopia separation. Details and the full gate table: `docs/specs/01-palette.md`.

## Development

```bash
npm test            # vitest, coverage gate >90% on all four metrics
npm run build        # regenerate extensions/*/themes from src/
npm run preview      # writes preview/index.html with all fixtures rendered
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run package      # build the .vsix
```

Generated files in `extensions/*/themes/` are committed but never edited by hand — they come from `scripts/build.ts`. A test fails if they drift from the build output.

Screenshots: run `npm run preview` and open `preview/index.html`.

## Languages tested

TypeScript, JavaScript, Java, Kotlin, C#, Python, Go, Rust, C, C++, PHP, Ruby, Swift, SQL, HTML, CSS, SCSS, JSON, YAML, TOML, Markdown, Shell, Dockerfile.

## Credit

Inspired by the code blocks on turso.tech. Not affiliated with Turso. No Turso logo is used.

## License

MIT
