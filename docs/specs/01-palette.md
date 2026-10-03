# Spec 01: Lupin palette

Card: ZED-5. Source: `00-research.md` (turso.tech). Theme "Lupin Theme", id `lupin-theme`, one dark variant.

All numbers computed (sRGB → OKLab/OKLCH per Ottosson; WCAG 2.x relative luminance; APCA 0.0.98G-4g, negative Lc = light text on dark; CVD = Machado 2009 severity 1.0 in linear RGB; alpha composited in sRGB space, as editors do). Contrast is against `bg.base` `#0D1318` unless stated.

## 1. Palette

19 core colors + 7 terminal-only. Hex is the only output; OKLCH is `L C H`.

### Core

| Name | Hex | OKLCH | WCAG | APCA Lc | Role | Perceived value |
|---|---|---|---|---|---|---|
| bgDeep | `#080E12` | 0.159 0.013 237 | 15.81 (fg on it) | -92.5 | bg.deep | Recessed chrome (title/activity bar); one step darker pushes the editor forward. |
| bgBase | `#0D1318` | 0.183 0.014 244 | 15.23 (fg on it) | -92.2 | bg.base | turso exact. Near-black blue, not `#000`: calm, cuts halation, reads "night", not "void". |
| bgRaised | `#152029` | 0.237 0.023 244 | 13.46 (fg on it) | -90.8 | bg.raised | turso exact. Panels, sidebar, tabs strip: lifts by lightness only, same hue, no new color. |
| bgOverlay | `#1B252D` | 0.259 0.021 243 | 12.68 (fg on it) | -90.1 | bg.overlay | turso `blue-3`. Popups, menus, hover: highest surface, still blue-black. |
| borderSubtle | `#1D2A33` | 0.277 0.024 239 | 1.27 vs base | — | border.subtle, indent.guide | turso `#283945` @60% flattened. Divides without drawing a line the eye has to read. |
| borderStrong | `#283945` | 0.335 0.031 240 | 1.57 vs base | — | border.strong, ansi black | turso exact. Focused/active edges. |
| fgBase | `#E7E8E8` | 0.930 0.001 197 | 15.23 | -92.2 | fg.base, variable, parameter | turso white/90 flattened. Off-white: full legibility without glare. |
| fgMuted | `#818C96` | 0.634 0.020 246 | 5.45 | -39.3 | fg.muted, punctuation, operator, link uri | turso gray lifted +0.020 L (see §2). Structure glyphs recede; still AA everywhere. |
| fgSubtle | `#616569` | 0.505 0.008 248 | 3.18 | -21.8 | fg.subtle, comment, hint, ansi bright black | turso white/35 flattened. Comments whisper: present, never competing with code. |
| fgFaint | `#3D4246` | 0.376 0.010 242 | 1.84 | -8.3 | fg.faint, line numbers (inactive), git.ignored, indent.guide.active | turso white/20 flattened. Decorative only, never content. |
| aqua | `#4FF8D2` | 0.884 0.148 174 | 13.97 | -86.8 | accent, cursor, function, method, macro, constant, enum member, md heading, ansi cyan | turso brand. The one saturated signature: "this acts" (calls) and "you are here" (cursor). |
| fuchsia | `#E879F9` | 0.748 0.207 322 | 7.60 | -53.5 | keyword (control, import, return), tag, escape, interpolation punctuation, ansi magenta | turso exact. Highest chroma: flow changes and structure break-points jump out. |
| orchid | `#B085C3` | 0.680 0.101 315 | 6.22 | -44.5 | storage/modifier (public static final class fn def let), self/this, lifetime, label, preproc, md list marker | New. Fuchsia hue, half chroma: declaration words stay in the keyword family but stop shouting (§8). |
| sky | `#7DD3FC` | 0.828 0.101 230 | 11.21 | -73.1 | property, attribute/annotation/decorator, object/JSON/YAML/TOML key, md link text, info, git.modified, ansi bright blue | turso exact. Cool, low chroma: names of things inside things, quiet metadata. |
| emerald | `#34D399` | 0.773 0.153 163 | 9.72 | -65.6 | string, md inline code, ansi green | turso exact. Literal text: "data, not code". |
| yellow | `#E0CA3C` | 0.833 0.155 100 | 11.29 | -73.5 | type, class, interface, generic, enum, constructor, warning, find.* fills, ansi yellow | turso exact. Warm and bright: in type-heavy languages the shape of the program is its types. |
| peach | `#FEA47C` | 0.800 0.120 45 | 9.63 | -64.8 | number, boolean, null/nil/None, CSS color/unit, git.conflict | New, between turso red and yellow. Literal values: warm like strings but not text. |
| red | `#FF6663` | 0.704 0.188 24 | 6.53 | -47.3 | error, invalid, regexp, git.deleted, ansi red | turso exact. Danger, and regex as "handle with care". |
| lime | `#A4DF95` | 0.845 0.117 139 | 12.08 | -77.4 | success, git.added, ansi bright green | turso exact. UI-only green; never in syntax (keeps the string/function greens from tripling). |

### Terminal-only

Normal set reuses core (black `borderStrong`, red `red`, green `emerald`, yellow `yellow`, magenta `fuchsia`, cyan `aqua`, bright black `fgSubtle`, bright green `lime`, bright blue `sky`). New entries:

| Name | Hex | OKLCH | WCAG | APCA Lc | ANSI | Derivation |
|---|---|---|---|---|---|---|
| blue | `#42A3FD` | 0.700 0.160 250 | 7.02 | -49.9 | blue | L 0.70 on red/fuchsia rhythm, H 250; dE 0.147 vs sky |
| redBright | `#FE9892` | 0.784 0.123 24 | 9.01 | -61.4 | bright red | red +0.08 L, chroma to gamut; dE 0.103 |
| yellowBright | `#F7E158` | 0.903 0.155 100 | 14.12 | -87.2 | bright yellow | yellow +0.07 L; dE 0.070 |
| fuchsiaBright | `#F3A5FF` | 0.827 0.147 322 | 10.36 | -68.7 | bright magenta | fuchsia +0.08 L; dE 0.100 |
| aquaBright | `#88FFE4` | 0.923 0.115 177 | 15.55 | -93.9 | bright cyan | turso `--turso-aqua-text`; dE 0.051 |
| grayLight | `#C5CACE` | 0.836 0.008 242 | 11.32 | -73.4 | white | turso `light-gray` |
| white | `#FAFAFA` | 0.985 0.000 90 | 17.91 | -104.0 | bright white | turso `white` |

### Alpha variants (overlays)

Composited on `bg.base`. "min code" = lowest WCAG of every code token color (punctuation is always the floor).

| Role | Value | Composite | min code | comment | dE vs bg | Note |
|---|---|---|---|---|---|---|
| accent.soft, selection | `#4FF8D226` | `#173534` | 3.84 | 2.24 | 0.126 | Brand-tinted selection |
| selection.inactive | `#28394580` | `#1B262F` | 4.49 | 2.62 | 0.080 | Neutral: "dormant" |
| find.match | `#E0CA3C26` | `#2C2E1D` | 4.04 | 2.36 | 0.118 | |
| find.current | `#E0CA3C38` + border `#E0CA3C` | `#3B3B20` | 3.34 | 1.95 | 0.173 | dE 0.053 vs find.match; border carries the rest (VS Code `editor.findMatchBorder`; Zed has one search fill, uses find.match) |
| word.highlight | `#7DD3FC1A` | `#18272F` | 4.47 | 2.61 | 0.081 | dE 0.048 vs selection (different hue) |
| line.current | `#FFFFFF08` | `#151A1F` | 5.11 | 2.98 | 0.032 | |
| bracket.match | `#4FF8D21A` + border `#4FF8D299` | `#142A2B` | 4.39 | 2.56 | 0.087 | |
| invalid background | `#FF666326` | `#311F23` | 4.53 | 2.65 | 0.089 | |
| diff added bg | `#A4DF951A` | `#1C2825` | 4.44 | 2.59 | 0.083 | |
| diff deleted bg | `#FF66631A` | `#261B20` | 4.86 | 2.84 | 0.061 | |
| cursor | `#4FF8D2` | — | 13.97 | — | — | non-text, >= 3:1 |
| indent.guide | `#1D2A33` | — | 1.27 | — | — | borderSubtle |
| indent.guide.active | `#3D4246` | — | 1.84 | — | — | fgFaint |

Stacked on line.current (cursor line, worst case): selection 3.52, find.match 3.70, find.current 3.04, word.highlight 4.11.

## 2. Turso values: kept vs changed

| Value | Decision | Before → after | Why |
|---|---|---|---|
| `#0D1318` bg, `#152029` raised, `#283945` border | kept | — | |
| `#E879F9` keyword, `#7DD3FC` property, `#34D399` string, `#4FF8D2` function/constant | kept | — | all pass every gate except fn/fg CVD (§5) |
| comment white/35 | kept, flattened | → `#616569` | 3.18:1, passes 3:1 |
| fg white/90 | kept, flattened | → `#E7E8E8` | 15.23:1 |
| white/20 label | kept, flattened | → `#3D4246` | decorative only |
| border @60% | kept, flattened | → `#1D2A33` | |
| `--turso-gray` as fg.muted | **adjusted** | `#7B8690` → `#818C96` | 5.03 base OK, but 4.45 on raised and 4.19 on overlay (fails 4.5 where muted UI text lives). +0.020 L, same H/C, dE 0.020 (~1 JND): 4.82 raised, 4.54 overlay, 5.45 base |
| red, yellow, lime, aqua-text, light-gray, white | kept | — | |

## 3. String `#34D399` vs function `#4FF8D2`

| Metric | Value |
|---|---|
| OKLCH | 0.773 0.153 163 vs 0.884 0.148 174 |
| Hue gap | 11° (close) |
| OKLab dE | 0.115 |
| dE deuteranopia / protanopia / tritanopia | 0.113 / 0.120 / 0.112 |

Separation is carried by lightness (ΔL 0.111), which CVD does not erase. Passes 0.08 normal and 0.05 CVD with margin. **No shift.** Context helps too: strings sit inside quotes, functions precede `(`.

## 4. Role map

Collapsed roles share one palette entry. Font style is part of the role.

| Group | Role | Color | Style |
|---|---|---|---|
| Surface | bg.deep / base / raised / overlay | bgDeep / bgBase / bgRaised / bgOverlay | |
| Surface | border.subtle / border.strong | borderSubtle / borderStrong | |
| Text | fg.base / muted / subtle / faint | fgBase / fgMuted / fgSubtle / fgFaint | |
| Accent | accent / accent.soft | aqua / `#4FF8D226` | |
| Status | error / warning / info / hint / success | red / yellow / sky / fgSubtle / lime | |
| Git | added / modified / deleted / ignored / conflict | lime / sky / red / fgFaint / peach | |
| Syntax | keyword | fuchsia | |
| Syntax | storage / modifier (new) | orchid | |
| Syntax | property | sky | |
| Syntax | string | emerald | |
| Syntax | function (method, macro, builtin call) | aqua | |
| Syntax | constant (named const, enum member, symbol) | aqua | |
| Syntax | number (incl. boolean, null) | peach | |
| Syntax | type (class, interface, struct, enum, generic, primitive, constructor) | yellow | |
| Syntax | variable | fgBase | |
| Syntax | parameter | fgBase | italic |
| Syntax | variable.special (self, this, it, super) (new) | orchid | italic |
| Syntax | operator | fgMuted | |
| Syntax | punctuation | fgMuted | |
| Syntax | comment, comment.doc | fgSubtle | italic |
| Syntax | tag | fuchsia | |
| Syntax | attribute (HTML attr, @annotation, @decorator, `#[attr]`) | sky | italic |
| Syntax | regexp | red | |
| Syntax | escape (`\n`, `${ }`, `#{ }`, `\( )`) | fuchsia | |
| Syntax | invalid | red | underline + `#FF666326` bg |
| Syntax | namespace / package (new) | fgBase | |
| Syntax | label, lifetime (new) | orchid | italic |
| Syntax | preproc (`#include`, `#define`) (new) | orchid | |
| Markdown | title (heading) | aqua | bold |
| Markdown | link_text / link_uri | sky / fgMuted | — / underline |
| Markdown | emphasis / strong | fgBase | italic / bold |
| Markdown | text.literal (inline code) | emerald | |
| Markdown | list marker, quote | orchid / fgSubtle | — / italic |
| Editor | selection / selection.inactive / find.* / word.highlight / line.current / bracket.match / indent guides | §1 alpha table | |
| Editor | cursor | aqua | |
| Terminal | 16 ANSI | §1 terminal table | |

## 5. Gates

### Contrast (WCAG on bg.base)

| Gate | Result |
|---|---|
| Code tokens >= 4.5:1 | pass. Min = punctuation/operator `#818C96` 5.45; orchid 6.22; red 6.53; fuchsia 7.60; rest >= 9.6 |
| Comment >= 3:1 | pass, 3.18 |
| fg.muted >= 4.5:1 | pass, 5.45 base / 4.82 raised / 4.54 overlay |
| Overlays keep code >= 3:1 | pass on bg.base (min 3.34 find.current) and stacked on line.current (min 3.04 find.current) |
| Overlays keep comment >= 3:1 | **fail**, every visible overlay (1.95–2.98) |

### Hue separation (OKLab dE; normal >= 0.08; CVD >= 0.05 = 2.5 × the 0.02 JND of CSS Color 4 dEOK)

Syntax colors: keyword, modifier, property, string, function, type, number, regexp, variable, punctuation, comment (55 pairs).

| Closest pairs | normal | deutan | protan | Verdict |
|---|---|---|---|---|
| function / variable | 0.154 | 0.050 | **0.034** | **fail protan** |
| modifier / punctuation | 0.106 | 0.064 | 0.067 | pass |
| string / number | 0.237 | 0.070 | 0.067 | pass |
| type / number | 0.136 | 0.068 | 0.113 | pass |
| regexp / punctuation | 0.214 | 0.139 | 0.072 | pass |
| string / regexp | 0.327 | 0.080 | 0.204 | pass |
| keyword / property | 0.247 | 0.081 | 0.181 | pass |
| keyword / modifier | 0.127 | 0.083 | 0.083 | pass |
| string / function | 0.115 | 0.113 | 0.120 | pass |

Normal-vision minimum over all 55 pairs: 0.106 (modifier/punctuation). Every other pair >= 0.08 CVD.

UI pairs: error/warning CVD 0.138/0.234; git added/deleted 0.132/0.255; added/modified deutan 0.158.

### Failures and decisions

| Failure | Decision |
|---|---|
| function `#4FF8D2` vs variable `#E7E8E8` under protanopia (0.034) | Accept. Both turso values. Only fix is fg → `#FAFAFA` (0.062) at 17.9:1, which brings back glare and drops the turso white/90. Position cue `name(` disambiguates calls. |
| comment under any overlay < 3:1 | Accept. Selection/find are transient states; contrast drops for comments only, code stays >= 3:1. Gate is met for code. |
| comment on bg.overlay 2.65, bg.raised 2.81 | Accept. Comment gate is defined on the editor surface; hover popups rarely show comments. |
| hint `#616569` on raised/overlay 2.81/2.65 | Accept. Inlay hints are meant to recede. |
| APCA: keyword -53.5, red -47.3, orchid -44.5, punctuation -39.3 below Lc 60 | Informative only (spec gate is WCAG). Short tokens inside lines carried by fg at -92. |

## 6. Perceived value

| Decision | Number | Support |
|---|---|---|
| Near-black blue bg, not `#000` | bg L 0.183, C 0.014 | Material dark theme: dark gray over pure black, lower eye strain and room for elevation [2]; Apple HIG: dimmer, non-pure-black backgrounds in dark mode [3] |
| Low-chroma chrome | every surface/border C <= 0.031; neutrals <= 0.020 | Material: desaturated colors on dark surfaces to avoid vibration [2] |
| One saturated signature | aqua carries cursor, accent, functions; fuchsia is the only other C > 0.19 | Dracula spec: each color has one job and a reason [1] |
| Surfaces step by L only | deep → base → raised → overlay: dE 0.024 / 0.055 / 0.076, same hue 237–244 | Material elevation by lightness [2] |
| Off-white text, not white | fg 15.23:1, APCA -92 | APCA: dark mode needs less luminance contrast than light; excess contrast adds glare [4] |
| Contrast gates by number | WCAG + APCA + OKLab | APCA polarity-aware [4]; OKLab dE perceptual [5]; Machado CVD [6] |

1. Dracula specification, https://spec.draculatheme.com
2. Material Design 2, Dark theme, https://m2.material.io/design/color/dark-theme.html
3. Apple Human Interface Guidelines, Dark Mode, https://developer.apple.com/design/human-interface-guidelines/dark-mode
4. APCA in a Nutshell, https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell
5. Ottosson, "A perceptual color space for image processing" (OKLab), https://bottosson.github.io/posts/oklab/ ; CSS Color 4 dEOK JND 0.02
6. Machado, Oliveira, Fernandes, "A Physiologically-based Model for Simulation of Color Vision Deficiency", IEEE TVCG 2009

## 7. Fonts

Themes cannot set fonts (VS Code and Zed). README recommendation only. Geist Mono for code, Inter for UI (Zed only: VS Code has no workbench font setting). Ligatures: enabled; no-op if the installed Geist Mono build has none.

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

(`editor.lineHeight` below 8 is a multiplier of font size.)

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

## 8. Cross-language behavior

### Keyword split

| Option | `public static final List<String> X` | Decision |
|---|---|---|
| one keyword color | run of 3 tokens at C 0.207 (fuchsia) | rejected |
| keyword + modifier | run of 3 at C 0.101 (orchid), 2.05× less chroma, same hue family | **chosen** |

- `keyword` (fuchsia): control flow (`if for while match switch case break continue`), `return yield await throw try catch`, `import export from use package`, `new`, word operators that change flow.
- `modifier` (orchid): declarations and modifiers (`public private protected static final abstract override async const let var val fn fun func def class struct interface enum impl trait type`), SQL connectives (`AS AND OR NOT IN ON BY ASC DESC IS`, VS Code only), preproc.
- Rule of thumb: fuchsia = "something happens here"; orchid = "something is declared here".

### Operator

`operator` moved from keyword hue to `fgMuted`. With orchid operators, C/C++ hit 50% orchid and Kotlin 43%; as fgMuted, max orchid share is 35%. Symbolic operators are glue, same tier as punctuation (Rosé Pine precedent).

### Typical-line mix

Representative 2–3 lines per language, tokens tagged by role, punctuation excluded. "Top" = largest chromatic hue share among colored tokens (fg/fgMuted excluded). "Run" = longest adjacent same-hue run.

| Language | Sample | Chromatic hues | Top | Run | Verdict |
|---|---|---|---|---|---|
| TS/JS | `export const getUser = async (id: string): Promise<User> =>` / `return await db.users.find(...)` | 6 | fuchsia 35% | 3 | ok |
| Java | `@Override public static final List<String> NAMES = List.of("a")` / for loop / ternary | 7 | aqua 23% | 3 (orchid) | ok |
| Kotlin | `data class User(val id: Long, ...)` / `fun greet(...) = println("${u.name}")` | 7 | orchid 35% | 2 | ok |
| C# | `public async Task<IActionResult> Get(int id)` / `var user = await ...` | 6 | aqua 27% | 2 | ok |
| Python | `@dataclass` / `def greet(self, name: str = "x") -> str:` / f-string | 7 | fuchsia 28% | 2 | ok |
| Go | `func (s *Server) Handle(w http.ResponseWriter, ...) error` / `if err != nil` | 7 | yellow 29% | 2 | ok |
| Rust | `#[derive(Debug, Clone)]` / `pub struct Point<'a>` / `println!` | 6 | orchid 32% | 3 (sky, derive list) | ok |
| C/C++ | `#include` / `static int count(const char *s)` / while loop | 6 | orchid 27% | 1 | ok |
| PHP | `public function store(Request $request): JsonResponse` / `User::create(...)` | 5 | aqua 42% | 2 | borderline ok (calls dominate Laravel style) |
| Ruby | `class User < ApplicationRecord` / `has_many :posts` / interpolation | 6 | aqua 27% | 2 | ok |
| Swift | `struct ContentView: View` / `@State private var count = 0` / `Text("\(count)")` | 7 | orchid 29% | 2 | ok |
| SQL (VS Code) | `SELECT u.id, COUNT(*) AS total FROM users u WHERE ... AND ... GROUP BY ... LIMIT 10` | 6 | fuchsia 42% | 2 | borderline ok: clause keywords are the skeleton |
| SQL (Zed) | same | 5 | **fuchsia 58%** | 2 | limitation: Zed `keyword` capture cannot split connectives |
| HTML | `<a href="/docs" class="btn">Docs</a>` | 3 | sky 40% | 2 | ok |
| CSS/SCSS | `.btn:hover { color: #4FF8D2; padding: 4px 8px }` / `@media` | 5 | peach 40% | 2 | ok |
| JSON | `{"name": "lupin", "version": 1, "private": true}` | 3 | sky 50% | 1 | accepted: key/value alternation |
| YAML | nested `services: db: image: ports:` | 3 | **sky 63%** | 3 | accepted: keys are structure; sky is low chroma (0.101) |
| TOML | `[package]` / `name = "lupin"` / `edition = 2021` | 4 | sky 43% | 1 | ok |
| Markdown | `## Install` / inline code / link / list | 4 | aqua 40% | 2 | ok (fg prose dominates, 50% of all) |
| Shell | `export PATH="$HOME/bin:$PATH"` / `if [ -f .env ]; then source .env; fi` | 4 | fuchsia 33% | 1 | ok |
| Dockerfile | `FROM node:20-alpine AS build` / `RUN npm ci && ...` | 1 | fuchsia (5 of 19 tokens, 26% of all) | 1 | accepted: grammar scopes only instructions; fg command text is 74% |

Type-heavy check (Java, C#, Rust, Go, Kotlin, Swift): type = yellow at dE 0.190 vs function, 0.234 vs property, 0.289 vs modifier; all CVD >= 0.153.

### Language-specific roles

| Construct | Role | Color |
|---|---|---|
| `@Override`, `@decorator`, `#[derive]`, `@State`, C# `[Attr]` | attribute | sky italic |
| `println!`, `vec!` | function (macro) | aqua |
| `#include`, `#define`, `#if` | preproc | orchid |
| C macro call `MAX(a, b)` | function | aqua |
| `std::`, `java.util`, `http.` | namespace | fgBase |
| `'a` (Rust) | lifetime | orchid italic |
| `self`, `this`, `it`, `super` | variable.special | orchid italic |
| `true false null nil None undefined` | number (constant.language) | peach |
| enum member, `UPPER_CONST`, Ruby `:symbol`, Elixir atom | constant | aqua |
| interface vs class | type (same) | yellow; shape differs by name convention, not color |
| `outer:` loop label | label | orchid italic |
| SQL keyword / function / table / column | keyword (VS Code connectives → modifier) / function / type / property | fuchsia (orchid) / aqua / yellow / sky; grammar-dependent, plain identifiers fall back to fgBase |
| JSON/YAML/TOML key | property | sky; no per-depth colors |
| TOML `[table]` header | type | yellow |
| CSS selector class/id, pseudo-class, property, value number/color | type / modifier / property / number | yellow / orchid / sky / peach |
| JSX component tag `<Button>` | type (when grammar distinguishes) | yellow; HTML tags fuchsia |

### Zed capture map (complete)

| Capture | Color | Style |
|---|---|---|
| attribute | sky | italic |
| boolean | peach | |
| comment | fgSubtle | italic |
| comment.doc | fgSubtle | italic |
| constant | aqua | |
| constructor | yellow | |
| embedded | fgBase | |
| emphasis | fgBase | italic |
| emphasis.strong | fgBase | bold |
| enum | yellow | |
| function | aqua | |
| keyword | fuchsia | |
| label | orchid | italic |
| link_text | sky | |
| link_uri | fgMuted | underline |
| number | peach | |
| operator | fgMuted | |
| preproc | orchid | |
| property | sky | |
| punctuation | fgMuted | |
| punctuation.bracket | fgMuted | |
| punctuation.delimiter | fgMuted | |
| punctuation.list_marker | orchid | |
| punctuation.special | fuchsia | |
| string | emerald | |
| string.escape | fuchsia | |
| string.regex | red | |
| string.special | emerald | |
| string.special.symbol | aqua | |
| tag | fuchsia | |
| text.literal | emerald | |
| title | aqua | bold |
| type | yellow | |
| variable | fgBase | |
| variable.special | orchid | italic |
| variant | aqua | |

Zed has no `modifier`/`storage` capture in its fixed set, so declaration keywords render fuchsia in Zed. Same samples with modifier folded into fuchsia: TS 47%, C/C++ 45%, Swift 43%, Kotlin/C#/Ruby 40%, Python 39%, Go 29%, PHP 25%, Java/Rust 23%; longest fuchsia run 3 (Java). Known limitation: revisit if Zed adds a modifier capture. VS Code maps orchid via (`storage.type`, `storage.modifier`, `keyword.other.alias.sql`, `keyword.other.order.sql`, `keyword.operator.logical.sql`, `meta.preprocessor`). Primitive types (`storage.type.primitive`, `support.type.primitive`) map to yellow in VS Code to match Zed's `type`.
