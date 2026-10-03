# Dracula lessons for Lupin

Card: ZED-5. Computed 2026-10-02. Math: OKLab/OKLCH (Ottosson), WCAG 2.x ratio, APCA-W3 0.0.98G Lc (negative = light text on dark), CVD = Machado 2009 severity 1.0. `dE` = OKLab Euclidean; triples are normal/deuteranopia/protanopia. Gate from the palette spec: tokens >= 4.5:1, comments >= 3:1, syntax pairs dE >= 0.08 in all three.

## Sources

| Source | What it gives | Status |
|---|---|---|
| draculatheme.com/spec | classic palette, token classification, italic rules | official |
| draculatheme.com/pro | variants, "normalizes luminosity and saturation" claim | official, no hex |
| dracula/dracula-ui `src/styles/colors.css` | Pro accents as `hsl(h, 100%, 75%)` | official, public |
| logaretm/vee-validate `docs/theme.json` | Pro bg `#22212C`, comment `#7970A9`, 7 accents in a VS Code export | third party, matches dracula-ui |
| bragamat/station-flow `dotfiles/dracula_PRO/design/PALETTE.md` | variant bg/comment/selection | community, consistent with Pro bg; Van Helsing hex `#0B0D0F` contradicts its own HSL (210 15% 15% = `#212629`) |
| dracula/visual-studio-code `src/dracula.yml` | scope -> color map | official |
| dracula/zed `themes/dracula.json` | capture -> color map | official |
| facelessuser (merge-dracula-theme discussion #4) | Pro rule: comment = `accent hue, s25%, l55%`, selection = `bg hue, s15%, l30%` | community |

## 1. Palettes measured

### Dracula classic, bg `#282A36` (L .288 C .022 h278)

| Role (spec) | Hex | L | C | h | WCAG | Lc |
|---|---|---|---|---|---|---|
| fg | `#F8F8F2` | .977 | .008 | 107 | 13.36 | -99 |
| comment | `#6272A4` | .560 | .080 | 270 | 3.03 | -25 |
| selection | `#44475A` | .403 | .032 | 278 | 1.56 | 0 |
| pink: keyword, storage | `#FF79C6` | .755 | .183 | 347 | 5.97 | -52 |
| purple: constant, this | `#BD93F9` | .742 | .149 | 302 | 5.90 | -51 |
| cyan: class, type, support | `#8BE9FD` | .883 | .093 | 213 | 10.29 | -81 |
| green: function | `#50FA7B` | .871 | .220 | 148 | 10.38 | -82 |
| yellow: string | `#F1FA8C` | .955 | .134 | 113 | 12.74 | -96 |
| orange: number, param | `#FFB86C` | .834 | .124 | 67 | 8.36 | -68 |
| red: error | `#FF5555` | .682 | .206 | 24 | 4.53 | -40 |

Accents: L mean .817 sd .088; C mean .158 sd .043. Hue gaps 35-89 deg. Closest pairs: green/yellow .159/.084/**.031**, green/orange .239/**.032**/.127, pink/purple .131/.099/.076.

### Dracula Pro, bg `#22212C` (L .254 C .021 h289)

All accents `hsl(h, 100%, 75%)`, hues 10/35/60/115/170/250/330.

| Role | Hex | L | C | h | WCAG | Lc |
|---|---|---|---|---|---|---|
| fg | `#F8F8F2` | .977 | .008 | 107 | 14.90 | -101 |
| comment | `#7970A9` | .576 | .087 | 291 | 3.56 | -28 |
| selection | `#454158` | .389 | .039 | 292 | 1.63 | -7 |
| pink | `#FF80BF` | .762 | .168 | 351 | 6.88 | -55 |
| purple | `#9580FF` | .678 | .181 | 288 | 5.15 | -42 |
| cyan | `#80FFEA` | .921 | .118 | 181 | 13.17 | -92 |
| green | `#8AFF80` | .903 | .197 | 142 | 12.63 | -89 |
| yellow | `#FFFF80` | .975 | .149 | 109 | 15.03 | -101 |
| orange | `#FFCA80` | .870 | .110 | 75 | 10.60 | -77 |
| red | `#FF9580` | .777 | .132 | 32 | 7.46 | -58 |

Accents: L mean .841 sd **.097** (equal HSL L, unequal OKLCH L); C mean .151 sd .031. Max hue gap 107 (cyan->purple). Closest: green/yellow .131/.071/**.026**, green/orange .188/**.028**/.102.

### Pro variants (bg + comment + selection rotate to one hue; accents unchanged)

| Variant | Signature | bg | bg L/C/h | comment |
|---|---|---|---|---|
| Pro | purple | `#22212C` | .254/.021/289 | `#7970A9` |
| Blade | cyan | `#212C2A` | .282/.016/183 | `#70A99F` |
| Buffy | pink | `#2A212C` | .263/.024/320 | `#9F70A9` |
| Lincoln | yellow | `#2C2A21` | .284/.016/97 | `#A99F70` |
| Morbius | red | `#2C2122` | .261/.017/12 | `#A97079` |
| Van Helsing | blue | `#0B0D0F` | .158/.005/248 | `#708CA9` (WCAG 5.57, Lc -39) |

Van Helsing is Lupin's nearest neighbor (Lupin bg L .183 h244).

### Classic -> Pro delta (why Pro reads "premium")

| Metric | Classic | Pro | Effect |
|---|---|---|---|
| bg L | .288 | .254 | deeper, accents pop more |
| bg hue = signature accent hue | 278 vs purple 302 | 289 vs purple 288 | surface and accent one family |
| comment/selection hue vs bg | 270/278 vs 278 | 291/292 vs 289 | every neutral tinted same hue (dh <= 3) |
| comment WCAG | 3.03 | 3.56 | comments readable, still recessive |
| accent C sd | .043 | .031 | no single hue shouts |
| red C | .206 | .132 | errors less alarming, pastel family |
| accent L mean | .817 | .841 | brighter pastel set |

### Lupin today, bg `#0D1318` (L .183 C .014 h244)

| Role | Hex | L | C | h | WCAG | Lc |
|---|---|---|---|---|---|---|
| fg (white/90) | `#E7E7E8` | .928 | .001 | 286 | 15.13 | -92 |
| comment (white/35) | `#626669` | .508 | .007 | 240 | 3.23 | -22 |
| keyword fuchsia | `#E879F9` | .748 | .207 | 322 | 7.60 | -53 |
| property sky | `#7DD3FC` | .828 | .101 | 230 | 11.21 | -73 |
| string emerald | `#34D399` | .773 | .153 | 163 | 9.72 | -66 |
| function aqua | `#4FF8D2` | .884 | .148 | 174 | 13.97 | -87 |
| turso yellow | `#E0CA3C` | .833 | .155 | 100 | 11.29 | -73 |
| turso red | `#FF6663` | .704 | .188 | 24 | 6.53 | -47 |
| turso lime | `#A4DF95` | .845 | .117 | 139 | 12.08 | -77 |
| turso gray | `#7B8690` | .614 | .020 | 246 | 5.03 | -36 |

Turso-4: L mean .808 sd .052. Hue gaps: string->aqua **11**, aqua->sky 56, sky->fuchsia 92, fuchsia->string **201** (whole warm half empty).
Brand surfaces `#0F1317`..`#283945`: h 240-248, C <= .031. Already one family, like Pro.

## 2. Why Dracula works

| Principle | Evidence | Lupin status |
|---|---|---|
| One role per hue, same meaning across languages | spec "Semantic Consistency: same meaning = same color"; fallback = fg | adopt |
| Hues spread round the wheel | 7 hues, gaps 33-107 deg | gap of 201 deg, fix with R4 |
| Neutrals share bg hue | Pro bg/comment/selection h 289/291/292 | surfaces yes, comment no (R2) |
| fg off-white, brightest token | fg L .977 | fg L .928 > aqua .884, ok |
| Comment desaturated blue-gray | C .080-.087, WCAG 3.0-3.6 | neutral C .007 (R2) |
| Italic = second channel | params, this/self, types, inherited class, decorators, attr names | adopt subset (R6) |
| Not CVD-safe | green/yellow prot .026, green/orange deut .028 | Lupin gate stricter, so fewer hues (R5) |
| Spec vs ports drift | spec: numbers orange, booleans orange, generics orange italic. VS Code: `constant` (numbers incl.) purple. Zed: number purple, boolean **pink**, constructor pink, `comment.doc` pink | one roles table, R8 |

## 3. Scope groups that make Dracula consistent

VS Code `src/dracula.yml` (no `semanticTokenColors`; relies on TextMate):

| Group | Scopes (key ones) | Color / style |
|---|---|---|
| Keywords | `keyword`, `punctuation.definition.keyword` | pink |
| Storage | `storage`, `storage.modifier` | pink, `regular` |
| Types | `entity.name.type`, `source.java storage.type`, `source.go storage.type`, `storage.type.c`, `storage.type.core.rust`, `storage.class.std.rust`, `storage.type.cs`, `storage.type.php` | cyan **italic** |
| Class names | `entity.name.type.class`, `entity.name.class` | cyan `normal` |
| Inherited class | `entity.other.inherited-class` | cyan italic |
| Generics | `entity.name.type.type-parameter`, `meta.indexer.mappedtype.declaration` | orange |
| Instance words | `variable.language`, `keyword.other.this` | purple italic |
| Functions | `entity.name.function`, `meta.function-call.object` | green |
| Decorators | `meta.decorator variable.other.readwrite|property` | green italic |
| Parameters | `variable.parameter`, `entity.name.variable.parameter` | orange italic |
| Constants | `constant`, `variable.other.constant` | purple |
| Escapes | `constant.character.escape` | pink |
| Built-ins | `support` | cyan italic; `support.function` regular |
| Variables, properties | `variable`, `support.variable.property`, `variable.other.property` | fg |
| Serializable keys | `entity.name.section.toml`, `entity.name.tag.yaml`, `support.type.property-name.json` | cyan |
| Strings / regex | `string` / `string.regexp` | yellow / yellow, regex delimiters red |
| Docstrings | `string.quoted.docstring.multi.python` | comment |
| Invalid | `invalid` | red, underline italic |
| `new` | `keyword.operator.new` | bold |
| Markup | heading purple bold, bold orange, italic yellow, inline code green, link cyan | |
| SQL | no SQL block; DML falls to `keyword` (pink), builtins to `support` | inherit |

Key move: `storage.type` is split. Declaration words (`const`, `let`, `function`, `class`) stay keyword pink; primitive type names (`int` in Java/C, Rust core types, Go types) become type cyan italic. Same meaning, same color, across grammars that scope them differently.

Zed captures: `keyword`/`operator`/`punctuation` pink, `punctuation.bracket` fg, `function` green, `type` cyan, `type.interface`/`type.super` cyan italic, `property`/`attribute` cyan, `variable`/`variable.member` fg, `variable.parameter` orange italic, `variable.special` purple italic, `number`/`constant`/`enum`/`variant` purple, `string.escape` pink, `string.regex` red, `title` purple 600, `preproc` comment.

## 4. Recommendations

| # | Rule | Evidence | Test |
|---|---|---|---|
| R1 | All neutrals (bg, panels, borders, selection, comment, line numbers) sit on h 244 +-6 when C > .01. | Pro bg/comment/selection dh <= 3. Lupin surfaces already h 240-248. | `oklch(c).h` in [238, 250] for every neutral with C > .01 |
| R2 | Comment = turso gray `#7B8690` (brand exact), not white/35. Not italic. | white/35: C .007, WCAG 3.23, Lc -22 (flat, too faint). Gray: h246 C .020, WCAG 5.03, Lc -36, matches Van Helsing comment (Lc -39) on the nearest Pro bg. Tinted fallback `#6A849A` (L .60 C .045 h244, WCAG 4.79, Lc -35). Dracula ships comments upright in VS Code and Zed. | comment WCAG in [3, 5.6]; comment h within R1 band |
| R3 | Rhythm in OKLCH, not HSL: syntax accents L in [.70, .89], C in [.10, .21]; new hues target L ~.81. | Pro equal HSL L gives OKLCH L sd .097 (purple .678 to yellow .975). Lupin 6-role set: L mean .808 sd .045. | assert range per accent |
| R4 | Add one warm hue: turso yellow `#E0CA3C` for numbers, booleans, `constant.language`, enum members, `variable.other.constant`. | L .833 C .155, on rhythm. WCAG 11.29, Lc -73. Fills the 201 deg gap; max gap drops to 92 (Pro: 107). dE vs string .172/.138/.102, vs aqua .153 min. | pair gate |
| R5 | No orange. Parameters = fg italic. | Best in-gamut orange on rhythm `#E8A869` (L .78 C .11 h65): deut dE .072 vs yellow, string, red. Global best `#EC9A09` .077. Below .08. Dracula's own orange fails (green/orange deut .028). Italic survives every CVD. | no syntax role uses h 30-90 except yellow |
| R6 | Italic set, nothing else: `variable.parameter`, `variable.language` (this/self/super/cls), type annotations and built-in types (`entity.name.type`, `support.type`, primitive `storage.type`), `entity.other.inherited-class`, decorators/annotations, `markup.italic`. Declared class names upright. | Dracula types italic, class names `normal`; spec "Italic: type parameters, instance reserved words". | snapshot of italic scope list |
| R7 | `this`/`self`/`super` = fuchsia italic (keyword hue), not a new violet. Reject lime for syntax. | Violet `#B296FF` vs fuchsia min dE .025 (deut). Lime vs emerald .098/.084/**.055**, vs aqua .093/**.074**. | pair gate |
| R8 | Role map, one table for both editors (Dracula drifts: spec orange numbers, ports purple; Zed booleans pink). | see map below | per role: VS Code scope color == Zed capture color |
| R9 | Hue pairs closer than 30 deg must differ by L >= .10. | emerald/aqua: dh 11, dL .111, dE .115/.113/.120, passes only through lightness. | assert for every pair |
| R10 | Red `#FF6663` only for `invalid`, diagnostics error, diff deleted; always paired with underline or gutter, never valid code. | WCAG 6.53, Lc -47; vs emerald deut .080 (edge), so needs the non-color cue. Dracula: `invalid` red underline italic. | red role not in syntax map except invalid |
| R11 | fg stays the brightest text: every accent L < fg L. | fg .928 > aqua .884. Dracula fg .977 vs yellow .975 lets strings compete with identifiers. | assert |
| R12 | One signature accent for UI (cursor, focus, active tab, badges) = aqua `#4FF8D2`, the Pro "accent: purple" move. | Pro ties bg hue to signature hue (289 vs 288). Lupin bg h244 is brand-blue, aqua is turso's mark. | UI accent keys resolve to aqua |

### R8 role map

| Role | Dracula | Lupin | Style |
|---|---|---|---|
| keyword, storage, storage.modifier, operator word, string escape | pink | fuchsia `#E879F9` | upright |
| this/self/super | purple | fuchsia `#E879F9` | italic |
| function decl/call, method, decorator/annotation | green | aqua `#4FF8D2` | decorator italic |
| class name, type, built-in type, interface, `support` | cyan | sky `#7DD3FC` | types italic, class decl upright |
| object literal key, JSON/YAML/TOML key, CSS property, HTML attribute | cyan | sky `#7DD3FC` | upright |
| member access `a.b`, variable | fg | fg | upright |
| string, template, markup inline code, regex | yellow | emerald `#34D399` | upright |
| number, boolean, null, constant, enum member | purple/orange | yellow `#E0CA3C` | upright |
| parameter | orange | fg | italic |
| generic type parameter | orange | sky `#7DD3FC` | italic |
| comment, docstring | comment | `#7B8690` | upright |
| HTML tag | pink | fuchsia `#E879F9` | upright |
| markup heading | purple | fuchsia `#E879F9` | bold |
| invalid, error, diff deleted | red | `#FF6663` | underline |

### Final syntax set gate check

`{fuchsia, sky, emerald, aqua, yellow, red}` lowest pairs (normal/deut/prot): emerald/red .327/.080/.204, fuchsia/sky .247/.081/.181, emerald/yellow .172/.138/.102, emerald/aqua .115/.113/.120. All >= .08. Fuchsia/sky and emerald/red sit on the edge and are brand-exact; do not shift them closer.
