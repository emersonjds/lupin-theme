# Lupin Theme: architecture, testing and distribution

Card: ZED-5. Display name "Lupin Theme", id and search slug `lupin-theme`.
Single dark variant. Targets: VS Code and Zed. JetBrains is out of scope (future card).

Related specs: `00-research.md` (turso.tech source), `01-palette.md` (colors and gates),
`02-attention-hierarchy.md` (what pops and what recedes), `04-surface-map.md` (role to editor key).

## Goals

- Use the theme today in VS Code (local `.vsix`) and Zed (dev extension).
- One palette drives both editors; changing a color changes both.
- Any dev from intern to staff reads any source file in under 10 seconds.

## Non-goals

- Light or extra dark variants.
- Marketplace, Open VSX or Zed registry publishing. That gets its own card.
- Fonts in the theme. Neither editor lets a theme set fonts; the README recommends them.

## Decision: palette as source, generator per editor

This is the model Catppuccin, Rosé Pine and Poimandres use. The alternatives were
hand-written JSON per editor, which drifts between editors and has no automated contrast
check, and a third-party templating tool such as Catppuccin whiskers, which adds a DSL and
a dependency for no gain at one variant.

```
src/palette.ts         raw colors; the only file allowed to contain hex
src/roles.ts           semantic roles (bg.base, syntax.keyword, ...) -> palette entries
src/color.ts           WCAG contrast, OKLab deltaE, alpha compositing (pure functions)
src/targets/vscode.ts  roles -> VS Code theme object (colors, tokenColors, semanticTokenColors)
src/targets/zed.ts     roles -> Zed theme family object (schema v0.2.0)
scripts/build.ts       writes target objects as JSON into extensions/
extensions/vscode/     package.json, README, LICENSE, themes/lupin-theme-color-theme.json
extensions/zed/        extension.toml, LICENSE, themes/lupin-theme.json
tests/                 one test file per src module
```

Data flow: `palette -> roles -> target(roles) -> JSON file`. Targets are pure functions
of `roles`, so they are tested without touching the disk.

## Stack

| Tool | Why |
|---|---|
| TypeScript (strict) | typed role names catch a typo before it reaches a JSON key |
| tsx | runs `scripts/build.ts` without a compile step |
| vitest + @vitest/coverage-v8 | test runner with coverage thresholds at 90% |
| shiki | tokenizes per-language fixtures with VS Code grammars for tests and preview |
| ajv | validates Zed output against the official schema, because Zed ignores invalid keys without warning |
| eslint + typescript-eslint | lint, zero errors |
| @vscode/vsce | packages the `.vsix` |

Color math (contrast, OKLab, compositing) is written in `src/color.ts`, about 40 lines,
with no color library.

## Tests

| Test | Fails when |
|---|---|
| `color.test.ts` | contrast or deltaE math deviates from known reference values |
| `palette.test.ts` | a gate from `01-palette.md` breaks: code tokens < 4.5:1, comment < 3:1, syntax hues deltaE < 0.08, a token < 3:1 under selection |
| `roles.test.ts` | a role points to a missing palette entry |
| `vscode.test.ts` | a required workbench key or TextMate scope is missing, or a value is not a valid hex |
| `zed.test.ts` | output fails the vendored Zed schema v0.2.0, or a required style or syntax key is missing |
| `build.test.ts` | the committed files in `extensions/*/themes/` differ from fresh build output |
| `hex-only-in-palette.test.ts` | a hex literal appears in `src/` outside `palette.ts` |

## Cross-language quality

The theme must read as well in Java, Rust or SQL as in TypeScript. A theme tuned on one
language usually falls apart on keyword-dense (Java, C#) or type-dense (Rust, Go) code.

Languages under test: TypeScript, JavaScript, Java, Kotlin, C#, Python, Go, Rust, C, C++, PHP,
Ruby, Swift, SQL, HTML, CSS, SCSS, JSON, YAML, TOML, Markdown, Shell, Dockerfile.

- `tests/fixtures/<lang>.<ext>` holds one realistic snippet per language: imports, a class
  or type, a function, generics, annotation or decorator, string with escape and
  interpolation, number, boolean/null, comment, doc comment.
- `languages.test.ts` tokenizes each fixture with Shiki, which uses the same TextMate
  grammars as VS Code, under the generated Lupin VS Code theme. It fails when:
  - a token the grammar marks as keyword, type, function, string, number, constant,
    comment, annotation or property renders in the default foreground
  - one hue covers more than 45% of the colored characters in a fixture (JSON, YAML and TOML exempt: keys are their structure, 01 §8)
  - a fixture shows fewer than 3 syntax hues
- The VS Code theme sets `semanticHighlighting: true` and maps `semanticTokenColors`.
  Language servers for Java, C#, Rust, Go and Kotlin then color by meaning rather than by grammar.
- Every Zed tree-sitter capture name in schema v0.2.0 maps to a role. Zed grammars share
  one capture vocabulary, so full capture coverage means coverage in every language.
- `npm run preview` writes `preview/index.html` with all fixtures rendered by Shiki. It is
  used for visual review and README screenshots.

Shiki is a dev dependency, used only for tests and the preview.

The coverage gate is above 90% for statements, branches, functions and lines, locked in
`vitest.config.ts`.

## Distribution (today)

- VS Code: `npm run package` creates `lupin-theme-<version>.vsix`. Install it with
  `code --install-extension` or through Extensions: Install from VSIX.
- Zed: run Command Palette, then `zed: install dev extension`, and select `extensions/zed`.
- Fonts: the README has `settings.json` snippets for both editors (Geist Mono, Inter).

## Acceptance (ZED-5)

1. Lupin Theme is selectable in VS Code and in Zed, and both match the turso.tech code block look.
2. Both editors use the same color for every shared role.
3. All gates in `01-palette.md` pass in tests, including the cross-language fixtures (23 languages).
4. Typecheck clean, lint 0 errors, suite green, coverage above 90% on all four metrics.
5. README covers install for both editors, font setup and screenshots.
