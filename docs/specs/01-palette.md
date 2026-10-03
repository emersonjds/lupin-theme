# Spec 01: Lupin palette

Card: ZED-5. Source: `00-research.md` (turso.tech). Theme "Lupin Theme", id `lupin-theme`, one dark variant. **Single source of truth for color**: where `05-dracula-lessons.md` disagrees, this file wins (§9).

All numbers computed (sRGB → OKLab/OKLCH per Ottosson; WCAG 2.x relative luminance; APCA 0.0.98G-4g, negative Lc = light text on dark; CVD = Machado 2009 severity 1.0 in linear RGB, clamped; alpha composited in sRGB space, as editors do). Contrast is against `bg.base` `#0D1318` unless stated.

## 1. Palette

19 core colors + 7 terminal-only + alpha overlays. Hex is the only output; OKLCH is `L C H`.

### Core

| Name | Hex | OKLCH | WCAG | APCA Lc | Role | Perceived value |
|---|---|---|---|---|---|---|
| bgDeep | `#080E13` | 0.160 0.014 243 | 15.80 (fg on it) | -92.5 | bg.deep | Recessed chrome (title/activity bar); one step darker pushes the editor forward. |
| bgBase | `#0D1318` | 0.183 0.014 244 | 15.23 (fg on it) | -92.2 | bg.base | turso exact. Near-black blue, not `#000`: calm, cuts halation, reads "night", not "void". |
| bgRaised | `#152029` | 0.237 0.023 244 | 13.46 (fg on it) | -90.8 | bg.raised | turso exact. Panels, sidebar, tabs strip: lifts by lightness only, same hue, no new color. |
| bgOverlay | `#1B252D` | 0.259 0.021 243 | 12.68 (fg on it) | -90.1 | bg.overlay | turso `blue-3`. Popups, menus, hover: highest surface, still blue-black. |
| borderSubtle | `#1D2A33` | 0.277 0.024 239 | 1.27 vs base | — | border.subtle, indent.guide | turso `#283945` @60% flattened. Divides without drawing a line the eye has to read. |
| borderStrong | `#283945` | 0.335 0.031 240 | 1.57 vs base | — | border.strong, ansi black | turso exact. Focused/active edges. |
| fgBase | `#E7E8E8` | 0.930 0.001 197 | 15.23 | -92.2 | fg.base, variable, parameter | turso white/90 flattened. Off-white: full legibility without glare. Brightest text (R11). |
| fgMuted | `#818C96` | 0.634 0.020 246 | 5.45 | -39.3 | fg.muted, punctuation, operator, link uri | turso gray lifted +0.020 L (§2). Structure glyphs recede; still AA everywhere. |
| fgSubtle | `#5B758A` | 0.550 0.045 243 | 3.88 | -27.7 | fg.subtle, comment, hint, deprecated, md quote, line numbers (inactive), placeholders, inlay hints, git.ignored, inactive activity-bar icons, ansi bright black | 4.02 deep / 3.88 base / 3.43 raised / 3.23 overlay: the >= 3 secondary tier. Blue-steel on the bg hue (R1). Comments recede by L (-0.085 vs punctuation) and tint (+0.025 C), still read comfortably (§9.4). |
| fgFaint | `#3D4246` | 0.376 0.010 242 | 1.84 | -8.3 | fg.faint, whitespace, indent.guide.active, disabled text/icons | turso white/20 flattened. 1.91 deep / 1.84 base / 1.63 raised / 1.53 overlay. Decorative only, never content (line numbers, placeholders, git.ignored moved to fgSubtle). |
| aqua | `#4FF8D2` | 0.884 0.148 174 | 13.97 | -86.8 | accent (single UI accent, R12), cursor, function, method, macro, md heading, ansi cyan | turso brand. The one saturated signature: "this acts" (calls) and "you are here" (cursor). |
| fuchsia | `#E879F9` | 0.748 0.207 322 | 7.60 | -53.5 | keyword (control, import, return), tag, escape, interpolation punctuation, ansi magenta | turso exact. Highest chroma: flow changes and structure break-points jump out. |
| orchid | `#B98CCD` | 0.706 0.105 315 | 6.85 | -48.5 | storage/modifier (public static final class fn def let), self/this, lifetime, label, preproc, md list marker, git.conflict | Fuchsia hue, half chroma (dC 0.102): declaration words stay in the keyword family but stop shouting (§8). |
| sky | `#7DD3FC` | 0.828 0.101 230 | 11.21 | -73.1 | property, attribute/annotation/decorator, object/JSON/YAML/TOML key, md link text, UI link, info, git.modified, ansi bright blue | turso exact. Cool, low chroma: names of things inside things, quiet metadata. |
| emerald | `#34D399` | 0.773 0.153 163 | 9.72 | -65.6 | ansi green | turso exact. Was string until §9 #11; kept for the terminal so ANSI output does not change. |
| yellow | `#E0CA3C` | 0.833 0.155 100 | 11.29 | -73.5 | type, class, interface, generic, enum, constructor, warning, find.* fills, ansi yellow | turso exact. Warm and bright: in type-heavy languages the shape of the program is its types. |
| peach | `#FDA77F` | 0.804 0.115 46 | 9.80 | -65.7 | number, boolean, null/nil/None, constant, enum member, symbol, CSS color/unit | New, between turso red and yellow. Fixed values: everything that cannot change at runtime shares one warm hue (§9 #11). |
| red | `#FF6663` | 0.704 0.188 24 | 6.53 | -47.3 | error, invalid, git.deleted, ansi red | turso exact. Danger only (R10); never valid code. |
| lime | `#A4DF95` | 0.845 0.117 139 | 12.08 | -77.4 | success, git.added, ansi bright green | turso exact. UI-only green; never in syntax. |
| pistachio | `#B9EC89` | 0.885 0.138 131 | 13.73 | -85.4 | string, regexp, md inline code | New (§9 #11). Literal text moved 43° away from function aqua, so the two read apart by hue, not only by lightness. |

### Terminal-only

Normal set reuses core (black `borderStrong`, red `red`, green `emerald`, yellow `yellow`, magenta `fuchsia`, cyan `aqua`, bright black `fgSubtle`, bright green `lime`, bright blue `sky`). New entries:

| Name | Hex | OKLCH | WCAG | APCA Lc | ANSI | Derivation |
|---|---|---|---|---|---|---|
| blue | `#42A3FD` | 0.700 0.160 250 | 7.02 | -49.9 | blue | L 0.70 on red/fuchsia rhythm, H 250; dE 0.147 vs sky |
| redBright | `#FE9892` | 0.784 0.123 24 | 9.01 | -61.4 | bright red | red +0.08 L, chroma to gamut; dE 0.103 |
| yellowBright | `#F7E158` | 0.903 0.155 100 | 14.12 | -87.2 | bright yellow | yellow +0.07 L; dE 0.070 |
| fuchsiaBright | `#F3A5FF` | 0.827 0.147 322 | 10.36 | -68.7 | bright magenta | fuchsia +0.08 L; dE 0.100 |
| aquaBright | `#88FFE4` | 0.923 0.115 177 | 15.55 | -93.9 | bright cyan | turso `--turso-aqua-text`; dE 0.051. Also accent.hover (VS Code `button.hoverBackground`, turso hover color): bgDeep ink on it 16.14 |
| grayLight | `#C5CACE` | 0.836 0.008 242 | 11.32 | -73.4 | white | turso `light-gray`; dE 0.094 vs fg |
| white | `#FAFAFA` | 0.985 0.000 90 | 17.91 | -104.0 | bright white | turso `white` |

Bright black `fgSubtle` vs black `borderStrong`: dE 0.215; 3.88 on base, 4.02 on bgDeep.

### Alpha variants (overlays)

Composited on `bg.base`. "min code" = lowest WCAG of every code token color (punctuation is always the floor). "stacked" = same overlay on top of line.current (cursor line, worst case).

| Role | Value | Composite | min code | comment | dE vs bg | stacked min code / comment | Note |
|---|---|---|---|---|---|---|---|
| accent.soft, selection | `#4FF8D226` | `#173534` | 3.84 | 2.73 | 0.126 | 3.09 / 2.20 | Brand-tinted selection |
| selection.inactive | `#28394580` | `#1B262F` | 4.49 | 3.19 | 0.080 | 3.99 / 2.84 | Neutral: "dormant" |
| find.match | `#E0CA3C26` | `#2C2E1D` | 4.04 | 2.87 | 0.118 | 3.24 / 2.31 | |
| find.current | `#E0CA3C2C` + border `#E0CA3C` | `#31331E` | 3.77 | 2.68 | 0.138 | 3.06 / 2.18 | dE 0.020 vs find.match; the yellow border carries the difference (§9 #11) (VS Code `editor.findMatchBorder`; Zed has one search fill, uses find.match) |
| word.highlight | `#7DD3FC1A` | `#18272F` | 4.47 | 3.18 | 0.081 | 3.63 / 2.58 | dE 0.048 vs selection (different hue) |
| line.current | `#FFFFFF12` | `#1E2428` | 4.58 | 3.26 | 0.073 | — | Brighter wash so the cursor line is found at a glance (§9 #11) |
| bracket.match | `#4FF8D21A` + border `#4FF8D299` | `#142A2B` | 4.39 | 3.12 | 0.087 | 3.53 / 2.51 | |
| invalid background | `#FF666326` | `#311F23` | 4.53 | 3.22 | 0.089 | 3.71 / 2.64 | |
| diff added bg | `#A4DF951A` | `#1C2825` | 4.44 | 3.16 | 0.083 | 3.60 / 2.56 | |
| diff deleted bg | `#FF66631A` | `#261B20` | 4.86 | 3.46 | 0.061 | 3.99 / 2.84 | |
| find.mark | `#E0CA3C80` (yellowHalf) | `#776F2A` | — | — | — | — | Overview ruler / minimap only, never under code. 3.64 vs bg.base (find.match at 15% was 1.35) |
| word.mark | `#7DD3FC80` (skyHalf) | `#45738A` | — | — | — | — | Same lane. 3.62 (word.highlight was 1.22) |
| selection.mark | `#4FF8D280` (aquaHalf) | `#2E8675` | — | — | — | — | Minimap selection. 4.26 (selection was 1.42) |
| scrollbar.thumb / hover / active | `#5B758A66` / `99` / `B3` (subtleThumb*) | `#2C3A46` / `#3C4E5C` / `#445868` | — | — | — | — | fgSubtle at 40/60/70%, translucent so code under the thumb stays visible. 1.60 / 2.17 / 2.53 vs bg.base (was opaque fgFaint/fgSubtle/fgMuted) |
| scrollbar.minimap / hover / active | `#5B758A33` / `4D` / `59` (subtleMinimap*) | `#1D272F` / `#25313A` / `#283540` | — | — | — | — | Minimap viewport box, about half the scrollbar alpha |
| cursor | `#4FF8D2` | — | 13.97 | — | — | — | non-text, >= 3:1 |
| indent.guide | `#1D2A33` | — | 1.27 | — | — | — | borderSubtle |
| indent.guide.active | `#3D4246` | — | 1.84 | — | — | — | fgFaint |

## 2. Turso values: kept vs changed

| Value | Decision | Before → after | Why |
|---|---|---|---|
| `#0D1318` bg, `#152029` raised, `#283945` border | kept | — | |
| `#E879F9` keyword, `#7DD3FC` property, `#4FF8D2` function | kept | — | all pass every gate except fn/fg protan (§5) |
| `#34D399` string | **moved** | string → pistachio `#B9EC89`, emerald stays ANSI green | §9 #11 |
| comment white/35 | **replaced** | `#616569` → `#5B758A` | 3.18 → 3.88:1, Lc -21.8 → -27.7; neutral C 0.008 → bg-hue tint C 0.045 h243 (R1). §9.4 |
| fg white/90 | kept, flattened | → `#E7E8E8` | 15.23:1 |
| white/20 label | kept, flattened | → `#3D4246` | decorative only |
| border @60% | kept, flattened | → `#1D2A33` | |
| `--turso-gray` as fg.muted | **adjusted** | `#7B8690` → `#818C96` | 5.03 base OK, but 4.45 on raised and 4.19 on overlay (fails 4.5 where muted UI text lives). +0.020 L, same H/C, dE 0.020 (~1 JND): 4.82 raised, 4.54 overlay, 5.45 base |
| red, yellow, lime, aqua-text, light-gray, white | kept | — | red narrowed to danger roles (R10) |

Derived (non-turso) values changed in reconciliation: bgDeep `#080E12` → `#080E13` (h 237 → 243, R1; dE 0.002), orchid `#B085C3` → `#B98CCD` (L 0.680 → 0.706, R3; dE 0.026), peach `#FEA47C` → `#FDA77F` (L 0.800 → 0.804, R9 vs red; dE 0.007).

## 3. String `#B9EC89` vs function `#4FF8D2`

| Metric | Value |
|---|---|
| OKLCH | 0.885 0.138 131 vs 0.884 0.148 174 |
| Hue gap | 43° (was 11° with emerald) |
| OKLab dE | 0.106 |
| dE deuteranopia / protanopia | 0.095 / 0.089 |

With emerald the pair was separated only by lightness (ΔL 0.111, hue gap 11°). On a 1080p panel at 12–13 px the eye reads hue before lightness, so strings and calls blurred together in practice. Pistachio puts 43° of hue between them at equal lightness: total dE is about the same (0.106 vs 0.115), but it is now carried by the channel that small glyphs keep. Passes 0.08 normal and 0.05 CVD. Context still helps: strings sit inside quotes, functions precede `(`.

## 4. Role map

Collapsed roles share one palette entry. Font style is part of the role. Italic is a second channel used only for: parameter, variable.special, attribute/decorator, markdown emphasis (§9.5).

| Group | Role | Color | Style |
|---|---|---|---|
| Surface | bg.deep / base / raised / overlay | bgDeep / bgBase / bgRaised / bgOverlay | |
| Surface | border.subtle / border.strong | borderSubtle / borderStrong | |
| Text | fg.base / muted / subtle / faint | fgBase / fgMuted / fgSubtle / fgFaint | |
| Accent | accent / accent.soft / accent.hover | aqua / `#4FF8D226` / aquaBright | |
| UI | link | sky | |
| Status | error / warning / info / hint / success | red / yellow / sky / fgSubtle / lime | |
| Git | added / modified / deleted / ignored / conflict | lime / sky / red / fgSubtle / orchid | |
| Syntax | keyword | fuchsia | |
| Syntax | storage / modifier | orchid | |
| Syntax | property | sky | |
| Syntax | string | pistachio | |
| Syntax | function (method, macro, builtin call) | aqua | |
| Syntax | constant (named const, enum member, symbol) | peach | |
| Syntax | number (incl. boolean, null) | peach | |
| Syntax | type (class, interface, struct, enum, generic, primitive, constructor) | yellow | |
| Syntax | variable | fgBase | |
| Syntax | parameter | fgBase | italic |
| Syntax | variable.special (self, this, it, super) | orchid | italic |
| Syntax | operator | fgMuted | |
| Syntax | punctuation | fgMuted | |
| Syntax | comment, comment.doc | fgSubtle | |
| Syntax | tag | fuchsia | |
| Syntax | attribute (HTML attr, @annotation, @decorator, `#[attr]`) | sky | italic |
| Syntax | regexp | pistachio | (escapes/quantifiers inside take `escape` fuchsia) |
| Syntax | escape (`\n`, `${ }`, `#{ }`, `\( )`) | fuchsia | |
| Syntax | invalid | red | underline + `#FF666326` bg |
| Syntax | deprecated | fgSubtle | strikethrough (comment tier, >= 3) |
| Syntax | namespace / package | fgBase | |
| Syntax | label, lifetime | orchid | |
| Syntax | preproc (`#include`, `#define`) | orchid | |
| Markdown | title (heading) | aqua | bold |
| Markdown | link_text / link_uri | sky / fgMuted | — / underline |
| Markdown | emphasis / strong | fgBase | italic / bold |
| Markdown | text.literal (inline code) | pistachio | |
| Markdown | list marker, quote | orchid / fgSubtle | |
| Editor | selection / selection.inactive / find.* / word.highlight / line.current / bracket.match / indent guides | §1 alpha table | |
| Editor | cursor | aqua | |
| Editor | find.mark / word.mark / selection.mark, scrollbar.* | §1 alpha table | |
| Terminal | 16 ANSI | §1 terminal table | |

R8: each role resolves to one color in both editors; the VS Code scope and the Zed capture for a role take the same color and style. Exceptions are listed in §8 (Zed capture gaps).

## 5. Gates

Thresholds (settled in §9.1):

- Code tokens >= 4.5:1; comment >= 3:1 (target 3.5–4.5).
- Syntax pairs, normal vision: dE >= 0.08 (4 × the 0.02 JND of CSS Color 4 dEOK).
- Syntax pairs, deuteranopia and protanopia: dE >= 0.05 (2.5 × JND) for every pair whose roles can sit adjacent on one line. All 55 pairs are treated as adjacent-capable.
- Intentional siblings (keyword / modifier) exempt from R9 but must differ in chroma by >= 0.10.
- R9: chromatic hues closer than 30° differ in L by >= 0.10. R3: syntax accents L in [0.70, 0.89], C in [0.10, 0.21]. R11: every accent L < fg L. R1: every neutral with C > 0.01 has h in [238, 250].
- Tritanopia: informative only.

### Contrast (WCAG on bg.base)

| Gate | Result |
|---|---|
| Code tokens >= 4.5:1 | pass. Min = punctuation/operator `#818C96` 5.45; red 6.53; orchid 6.85; fuchsia 7.60; rest >= 9.7 |
| Comment >= 3:1, target 3.5–4.5 | pass, 3.88 base / 3.43 raised / 3.23 overlay / 4.02 deep |
| fg.muted >= 4.5:1 | pass, 5.45 base / 4.82 raised / 4.54 overlay |
| UI pairs in both editors (04 "UI contrast gates") | pass. Text >= 4.5, indicators and the fgSubtle tier >= 3. Zed `hint` on `hint.background` (bg.raised) 3.43, accepted as comment tier |
| Overlays keep code >= 3:1 | pass on bg.base (min 3.77 find.current) and stacked on line.current (min 3.06 find.current) |
| Overlays keep comment >= 3:1 | pass for selection.inactive, word.highlight, line.current (3.26), bracket.match, invalid, diff.*; **fail** selection 2.73, find.match 2.87, find.current 2.68 (stacked on line.current: 2.18–2.84) |

### Hue separation (OKLab dE)

Syntax colors: keyword, modifier, property, string, function, type, number, invalid, variable, punctuation, comment (55 pairs).

| Closest pairs | normal | deutan | protan | tritan | Verdict |
|---|---|---|---|---|---|
| function / variable | 0.154 | **0.0495** | **0.033** | 0.159 | **fail deutan + protan** (accepted, below) |
| string / number | 0.191 | 0.076 | 0.151 | — | pass |
| keyword / modifier | 0.112 | 0.062 | 0.072 | 0.087 | pass (sibling, dC 0.102) |
| type / number | 0.132 | 0.068 | 0.110 | 0.081 | pass |
| invalid / punctuation | 0.214 | 0.140 | 0.072 | 0.243 | pass |
| string / invalid | 0.319 | 0.171 | 0.297 | — | pass |
| punctuation / comment | 0.088 | 0.090 | 0.080 | 0.091 | pass (lowest normal pair) |
| modifier / punctuation | 0.122 | 0.086 | 0.083 | 0.098 | pass |
| keyword / property | 0.247 | 0.084 | 0.182 | 0.263 | pass |
| string / function | 0.106 | 0.095 | 0.089 | — | pass |
| string / type | 0.095 | 0.071 | 0.096 | — | pass (second-lowest normal pair) |

Normal-vision minimum over all 55 pairs: 0.088 (punctuation/comment). CVD minimum except function/variable: 0.062 (keyword/modifier, deutan). Tritan figures predate §9 #11 and were not recomputed for pistachio (`src/color.ts` has no tritan matrix); informative only.

UI pairs (normal / deutan / protan): error/warning 0.249/0.138/0.234; git added/deleted 0.296/0.131/0.255; added/modified 0.157/0.157/0.154; conflict(orchid)/added 0.262/0.202/0.246; conflict/modified 0.185/0.118/0.173; conflict/deleted 0.179/0.162/0.154; hint/info 0.284/0.276/0.299.

### Rule checks

| Rule | Result |
|---|---|
| Tested in | `tests/palette.test.ts` "rule checks": sibling chroma, R1, R3, R9, R11, overlays stacked on line.current |
| R1 neutral hue | pass: bgDeep 243, bgBase 244, bgRaised 244, bgOverlay 243, borderSubtle 239, borderStrong 240, fgMuted 246, fgSubtle 243, fgFaint 242 (C 0.010); fgBase C 0.001 exempt |
| R3 accent band | pass: L 0.704 (red) – 0.885 (pistachio); C 0.101 (sky) – 0.207 (fuchsia) |
| R9 hues < 30° apart | aqua/emerald dh 11 dL 0.111 pass; peach/red dh 21 dL 0.100 pass; fuchsia/orchid dh 7 dL 0.042 sibling-exempt (dC 0.102); emerald/lime dh 24 dL 0.072 exempt (ANSI green/bright-green pair by design); yellow/pistachio dh 31, outside the rule; lime/pistachio dh 8 dL 0.040 sibling-exempt (lime is UI only: gutter, diff wash, terminal; pistachio is code text) |
| R10 red scope | pass: red only error, invalid, git.deleted, diff deleted, ansi red |
| R11 fg brightest | pass: fg L 0.930 > aqua 0.884 (max accent) |
| R12 single UI accent | pass: accent, cursor, focus resolve to aqua |

### Failures and decisions

| Failure | Decision |
|---|---|
| function `#4FF8D2` vs variable `#E7E8E8` under protanopia (0.033) and deuteranopia (0.0495, rounds to 0.050) | Accept. Both turso values. Fixing it through fg needs `#F5F5F5` (protan 0.051) at 17.15:1, Lc -100.7: glare, and drops turso white/90. Tinting fg (C <= 0.012, any hue, L <= 0.94) peaks at 0.046. Position cue `name(` disambiguates calls. |
| comment under selection / find.* < 3:1 | Accept. Transient states; code stays >= 3:1. Was 1.95–2.98 with the old comment; now fails only on the three strongest fills. |
| tritan property/string 0.049 (emerald era, not recomputed) | Accept. Not a gate (tritanopia ~0.01% prevalence); key vs value also separated by `:`/quotes. |
| APCA: red -47.3, orchid -48.5, punctuation -39.3, comment -27.7 below Lc 60 | Informative only (spec gate is WCAG). Short tokens inside lines carried by fg at -92. |

## 6. Perceived value

| Decision | Number | Support |
|---|---|---|
| Near-black blue bg, not `#000` | bg L 0.183, C 0.014 | Material dark theme: dark gray over pure black, lower eye strain and room for elevation [2]; Apple HIG: dimmer, non-pure-black backgrounds in dark mode [3] |
| Low-chroma chrome | every surface/border C <= 0.031; neutrals <= 0.045 | Material: desaturated colors on dark surfaces to avoid vibration [2] |
| All neutrals on one hue | h 239–246 for every neutral with C > 0.01 | Dracula Pro: bg/comment/selection within 3° [1] |
| One saturated signature | aqua carries cursor, accent, functions; fuchsia is the only other C > 0.19 | Dracula spec: each color has one job and a reason [1] |
| Surfaces step by L only | deep → base → raised → overlay: dE 0.023 / 0.055 / 0.021 (base → overlay 0.076), same hue 243–244 | Material elevation by lightness [2] |
| Off-white text, not white | fg 15.23:1, APCA -92 | APCA: dark mode needs less luminance contrast than light; excess contrast adds glare [4] |
| Comment readable but receded | 3.88:1 (Dracula Pro 3.56, classic 3.03) | Dracula Pro comment rule [1] |
| Contrast gates by number | WCAG + APCA + OKLab | APCA polarity-aware [4]; OKLab dE perceptual [5]; Machado CVD [6] |

1. Dracula specification, https://spec.draculatheme.com ; Dracula Pro values in `05-dracula-lessons.md`
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
| keyword + modifier | run of 3 at C 0.105 (orchid), 1.97× less chroma, same hue family | **chosen** |

- `keyword` (fuchsia): control flow (`if for while match switch case break continue`), `return yield await throw try catch`, `import export from use package`, `new`, word operators that change flow.
- `modifier` (orchid): declarations and modifiers (`public private protected static final abstract override async const let var val fn fun func def class struct interface enum impl trait type`), SQL connectives (`AS AND OR NOT IN ON BY ASC DESC IS`, VS Code only), preproc.
- Rule of thumb: fuchsia = "something happens here"; orchid = "something is declared here".

### Operator

`operator` sits on `fgMuted`, not the keyword hue. Symbolic operators are glue, same tier as punctuation (Rosé Pine precedent); orchid operators would push C/C++ to 50% orchid.

### Typical-line mix

Representative 2–4 lines per language, each token tagged by role, punctuation excluded (script: tokens → role → color per map). "Hues" = distinct chromatic hues (fg/fgMuted excluded). "Top" = largest chromatic hue share. "Run" = longest adjacent same-hue run on one line. "Clash" = adjacent tokens of different roles that render the same color.

| Language | Sample | VS Code hues / top / run / clash | Zed hues / top | Verdict |
|---|---|---|---|---|
| TS/JS | `export const getUser = async (id: string): Promise<User> =>` / `return await db.users.find((u) => u.id === id)` | 5 / fuchsia 25% / 3 / 0 | 4 / fuchsia 42% | ok |
| Java | `@Override` / `public static final List<String> NAMES = List.of("a")` / for loop / `this.name = name` / ternary on `user.name` | 7 / sky 20% / 3 (orchid) / 0 | 7 / fuchsia 25% | ok |
| Kotlin | `data class User(val id: Long, val name: String)` / `fun greet(u: User) = println("Hi ${u.name}")` | 6 / orchid 31% / 2 / 0 | 5 / fuchsia 44% | ok |
| C# | `public async Task<IActionResult> Get(int id)` / `var user = await _db.Users.FindAsync(id)` / `return user is null ? NotFound() : Ok(user)` | 6 / aqua 27% / 2 / 0 | 5 / fuchsia 40% | ok |
| Python | `@dataclass` / `def greet(self, name: str = "x") -> str:` / f-string with `self.name` | 6 / orchid 21% / 1 / 0 | 6 / fuchsia 29% | ok |
| Go | `func (s *Server) Handle(w http.ResponseWriter, r *http.Request) error` / `if err != nil { return err }` / `s.count += 1` | 6 / yellow 36% / 2 / 0 | 5 / yellow 36% | ok |
| Rust | `#[derive(Debug, Clone)]` / `pub struct Point<'a> { x: f64, name: &'a str }` / `impl Point { fn len(&self) -> f64 { self.x.hypot(self.y) } }` / `println!` | 5 / orchid 35% / 3 (sky, derive list) / 0 | 6 / sky 31% | ok |
| C/C++ | `#include <stdio.h>` / `static int count(const char *s)` / while loop | 5 / orchid 33% / 1 / 0 | 5 / fuchsia 44% | ok |
| PHP | `public function store(Request $request): JsonResponse` / `User::create(...)` / `return response()->json($user, 201)` | 5 / aqua 42% / 2 / 0 | 4 / aqua 42% | borderline ok (calls dominate Laravel style) |
| Ruby | `class User < ApplicationRecord` / `has_many :posts` / interpolation | 5 / aqua 25% / 2 / 1 (`has_many :posts`, both turso aqua) | 4 / fuchsia 42% | ok |
| Swift | `struct ContentView: View` / `@State private var count = 0` / `Text("\(count)")` | 6 / orchid 27% / 2 / 0 | 5 / fuchsia 47% | ok |
| SQL | `SELECT u.id, COUNT(*) AS total FROM users u WHERE ... = TRUE AND ... > 18 GROUP BY u.id LIMIT 10` | 4 / fuchsia 42% / 1 / 0 | 3 / **fuchsia 67%** | VS Code ok; Zed limitation: `keyword` capture cannot split connectives |
| HTML | `<a href="/docs" class="btn">Docs</a>` | 3 / fuchsia 33% / 1 / 0 | same | ok |
| CSS/SCSS | `.btn:hover { color: #4FF8D2; padding: 4px 8px }` / `@media (max-width: 600px)` | 5 / peach 40% / 2 / 0 | 4 / peach 40% | ok |
| JSON | `{"name": "lupin", "version": 1, "private": true}` | 3 / sky 50% / 1 / 0 | same | accepted: key/value alternation |
| YAML | nested `services: db: image: ports:` | 2 / **sky 67%** / 1 / 0 | same | accepted: keys are structure; sky is low chroma (0.101) |
| TOML | `[package]` / `name = "lupin"` / `edition = 2021` | 4 / sky 40% / 1 / 0 | same | ok |
| Markdown | `## Install` / inline code / link / list | 4 / aqua 25% / 1 / 0 | same | ok (fg prose is 56% of all tokens) |
| Shell | `export PATH="$HOME/bin:$PATH"` / `if [ -f .env ]; then source .env; fi` | 3 / fuchsia 50% / 1 / 0 | same | ok |
| Dockerfile | `FROM node:20-alpine AS build` / `RUN npm ci && npm run build` | 1 / fuchsia 100% / 1 / 0 | same | accepted: grammar scopes only instructions; fg command text is 73% of tokens |

Clash totals over the 20 samples: VS Code 1, Zed 3.

Type-heavy check (Java, C#, Rust, Go, Kotlin, Swift): type = yellow at dE 0.190 vs function, 0.234 vs property, 0.279 vs modifier; all CVD >= 0.152. Type vs property (`User` vs `user.name`): 0.234 / 0.236 / 0.233 (normal / deut / prot).

### Language-specific roles

| Construct | Role | Color |
|---|---|---|
| `@Override`, `@decorator`, `#[derive]`, `@State`, C# `[Attr]` | attribute | sky italic |
| `println!`, `vec!` | function (macro) | aqua |
| `#include`, `#define`, `#if` | preproc | orchid |
| C macro call `MAX(a, b)` | function | aqua |
| `std::`, `java.util`, `http.` | namespace | fgBase |
| `'a` (Rust) | lifetime | orchid |
| `self`, `this`, `it`, `super` | variable.special | orchid italic |
| `true false null nil None undefined` | number (constant.language) | peach |
| enum member, `UPPER_CONST`, Ruby `:symbol`, Elixir atom | constant | peach |
| interface vs class | type (same) | yellow; shape differs by name convention, not color |
| `outer:` loop label | label | orchid |
| regex literal `/^\d+$/` | regexp | pistachio; `\d`, quantifiers → escape fuchsia |
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
| comment | fgSubtle | |
| comment.doc | fgSubtle | |
| constant | peach | |
| constructor | yellow | |
| embedded | fgBase | |
| emphasis | fgBase | italic |
| emphasis.strong | fgBase | bold |
| enum | yellow | |
| function | aqua | |
| keyword | fuchsia | |
| label | orchid | |
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
| string | pistachio | |
| string.escape | fuchsia | |
| string.regex | pistachio | |
| string.special | pistachio | |
| string.special.symbol | peach | |
| tag | fuchsia | |
| text.literal | pistachio | |
| title | aqua | bold |
| type | yellow | |
| variable | fgBase | |
| variable.parameter | fgBase | italic |
| variable.special | orchid | italic |
| variant | aqua | |

Zed capture gaps (R8 exceptions):

- No `modifier`/`storage` capture in the fixed set: declaration keywords render fuchsia in Zed, orchid in VS Code. Zed numbers in the mix table above. Revisit if Zed adds a modifier capture.
- `variable.parameter` applies only where the grammar emits it; elsewhere parameters fall back to `variable` (fgBase upright).

VS Code maps orchid via (`storage.type`, `storage.modifier`, `keyword.other.alias.sql`, `keyword.other.order.sql`, `keyword.operator.logical.sql`, `meta.preprocessor`). Primitive types (`storage.type.primitive`, `support.type.primitive`) map to yellow upright in VS Code to match Zed's `type`. `string.regexp` maps to pistachio.

## 9. Reconciliation with 05-dracula-lessons

05's rules R1, R3, R9, R10, R11, R12 adopted as gates (§5 rule checks). Conflicts:

| # | Conflict | 01 said | 05 said | Decision | Number |
|---|---|---|---|---|---|
| 1 | CVD gate | dE >= 0.05 | dE >= 0.08 | normal >= 0.08; CVD >= 0.05 for adjacent-capable pairs (all 55); siblings dC >= 0.10 | Under 0.08 CVD, 7 pairs fail (fn/var 0.033, string/number 0.060, keyword/modifier 0.062, type/number 0.068, invalid/punct 0.072, string/invalid 0.079, punct/comment 0.080); passing them means dropping peach and orchid, and fn/var, string/invalid still fail on turso-exact colors. Under 0.05 only fn/var fails. 0.05 = 2.5 × JND 0.02 |
| 2 | Types | yellow `#E0CA3C` | sky (shared with property); yellow for constants/numbers | **yellow**, distinct from property | type/property 0.234/0.236/0.233. Mix (05 map vs final, Zed): hues Java 5 vs 7, C# 4 vs 5, Kotlin 4 vs 5, Go 4 vs 5, Rust 4 vs 6; sky top share Java 35%, Go 45%, Rust 38% under 05; clashes 5 vs 3 (Rust `x: f64` renders prop and type both sky) |
| 3 | Numbers/booleans/null | peach `#FEA47C` | yellow; "no orange" (R5, fails 0.08 at 0.072) | **peach**, nudged to `#FDA77F` | Passes 0.05: vs yellow 0.132/0.068/0.110, vs string 0.233/0.069/0.060. Old peach failed R9 vs red (dL 0.096); new dL 0.100, dE 0.007 from old |
| 4 | Comment | `#616569` white/35 italic | `#7B8690` upright | **`#5B758A` upright** (L 0.550 C 0.045 h243) | Before 3.18:1, Lc -21.8, raised 2.81, overlay 2.65, C 0.008. After 3.88:1, Lc -27.7, raised 3.43, overlay 3.23, h243 (R1). `#7B8690` rejected: 5.03:1 above the 4.5 cap and dE 0.020 vs punctuation `#818C96` (merges). vs punctuation: dE 0.088/0.090/0.080, dL 0.085, dC 0.025: separated by color alone, so no italic needed |
| 5 | Italic set | params, self, attribute, comment, label, lifetime, md quote | R6: params, this/self, types (annotations, built-ins, inherited class), decorators, `markup.italic`; R7 self = fuchsia italic | italic only: parameter, variable.special, attribute/decorator, emphasis. Types upright. self/this stays **orchid** italic | Types: Zed `type` covers declaration and use, so italic annotations break R8 parity. R7's goal (no new violet) met: orchid is already in palette; orchid vs fuchsia 0.112/0.062/0.072, versus R7's rejected violet 0.025. Fuchsia `this` would add C 0.207 tokens to every Java/TS constructor |
| 6 | Orchid band | `#B085C3` L 0.680 | R3 L >= 0.70 | `#B98CCD` L 0.706 C 0.105 | R3 pass; vs punctuation 0.122/0.086/0.083 (was 0.106/0.065/0.068) |
| 7 | Regexp | red | R10: red only invalid/error/deleted | regexp → string color (emerald, pistachio since #11; Dracula precedent) | red now in 4 roles, all danger |
| 8 | git.conflict | peach | — | orchid | peach vs lime (added) deut 0.039 < 0.05; orchid vs added/modified/deleted min CVD 0.118 |
| 9 | bgDeep hue | `#080E12` h237 | R1 h in [238, 250] | `#080E13` h243 | dE 0.002, fg on it 15.80 |
| 10 | Constants, decorators, md heading (R8 map) | aqua / sky italic / aqua bold | yellow / aqua italic / fuchsia bold | kept 01 (constants superseded by #11) | turso code block uses aqua for constants (`00-research.md`); decorators are metadata like keys (sky); heading aqua keeps markdown at 4 hues vs 3 |
| 11 | Daily-use retune (2026-10-03) | string emerald, constant aqua, line.current `#FFFFFF08`, find.current `#E0CA3C38` | — | string → pistachio `#B9EC89`; constant → peach; line.current `#FFFFFF12`; find.current `#E0CA3C2C` | **String:** emerald/aqua hue gap 11° made strings and calls blur at 12–13 px on a 1080p panel; pistachio 0.885 0.138 131 sits 43° from aqua, R3 in band (L 0.885 ≤ 0.89), R9 vs yellow dh 31, all 55 pairs ≥ 0.088 normal and ≥ 0.062 CVD (fn/var accepted as before). The candidate the user validated on screen, `#C3F08A`, had L 0.901 (fails R3); pistachio is dE 0.017 from it, under 1 JND. A look-alike check against Catppuccin Mocha's `#A6E3A1` (CIE76 ΔE 4, near-identical) ruled out lime-adjacent `#A4DF95`. **Constant:** with tsgo (no semantic tokens) `UPPER_CONST` fell back to TextMate and rendered exactly like function calls; peach groups every fixed value (numbers, booleans, null, constants, enum members, symbols) under one warm hue, which is what the reader needs from the token. **line.current:** 0x08 (3.1%, dE 0.032 vs bg) was invisible on a non-retina panel; 0x12 (7.1%, dE 0.073) finds the cursor line without a border. Stacking find.current on the brighter line dropped punctuation to 2.73:1, so find.current goes 0x38 → 0x2C (stacked 3.06, gate kept); its border still marks the current match. Comment under line.current drops 3.63 → 3.26, still ≥ 3. Tested in `tests/palette.test.ts` "string, constant and current line retune" |
