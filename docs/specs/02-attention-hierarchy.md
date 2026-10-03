# Attention hierarchy — Lupin Theme

Role names only, no hex. Color-scientist owns values; this spec owns which role goes where and why.

## 1. Attention tiers

| Tier | Covers | Contrast/lightness budget | Accent allowed |
|---|---|---|---|
| T0 — code + cursor | editor text, line numbers, cursor, bracket match | full range, highest contrast in the theme (fg.base vs bg.base/bg.deep) | only on the cursor glyph and the active line number; never on plain text/syntax |
| T1 — active state / feedback | selection, find, word highlight, diagnostics, git decorations, diff, hover/focus feedback | mid contrast, must beat T0/T2 background but not beat T0 foreground text | yes, but prefer status roles (error/warning/info/hint/success) and accent.soft over solid accent; solid accent only for focus ring |
| T2 — navigation | sidebar, tabs, activity bar icons, scrollbar, minimap, breadcrumbs | low contrast, legible but recedes versus T0/T1 | single indicator marks only (active tab underline, active activity-bar bar) — never a fill |
| T3 — chrome | title bar, status bar, panel/tab-bar container backgrounds, borders | lowest contrast, near bg-on-bg, must not compete for the eye | forbidden — chrome never carries accent; status bar debugging state uses `warning`, not accent |

Principle: contrast budget shrinks tier by tier. If two elements in different tiers end up the same visual weight, the lower tier is wrong, not the higher one.

## 2. Surface layering

Turso look: editor and chrome sit at nearly the same near-black. Separation comes from `border.subtle` hairlines, not from lightness jumps. `bg.raised`/`bg.overlay` are reserved for things that actually float above the content plane (z-index), not for docked panels next to it.

| Role | Used by | Why |
|---|---|---|
| bg.deep | title bar, activity bar, tab bar strip (container), inactive tabs, status bar, inputs | outermost chrome + "inset" fields — recedes furthest, no docked panel competes with the editor |
| bg.base | editor, sidebar/project panel, active tab, panel/terminal | the main content plane. Editor and sidebar share this tone on purpose — same plane, separated only by `border.subtle` |
| bg.raised | hover tooltip, parameter hints, autocomplete/suggest widget | floating, anchored to a text position — needs `border.strong` to read as lifted since it's close in lightness to bg.base |
| bg.overlay | command palette, quick-open, notifications/toast, context menu, peek view | floating, not anchored to a position — app-level modal layer, always above bg.raised |

Decisions that need calling out:
- Active tab = bg.base, not bg.raised. It must look like a continuation of the editor below it, not a floating chip.
- Inactive tab = bg.deep, matching the tab-bar strip it sits in — it should visually merge into the chrome until hovered/activated.
- Activity bar and sidebar are both docked chrome-adjacent to the editor; they get bg.deep/bg.base respectively, never bg.raised — raised is earned only by leaving the docked layout.
- Inputs use bg.deep (inset "well" look) even inside a bg.raised/bg.overlay container (command palette input row, search box) — the recess reads as "type here" regardless of what it sits in.

## 3. Element table

| Element | VS Code area | Zed area | Tier | bg role | fg role | border/indicator role | States |
|---|---|---|---|---|---|---|---|
| Editor text | `editor.background/foreground` | editor pane | T0 | bg.base | fg.base | — | n/a (syntax colors out of this spec) |
| Line numbers, inactive | `editorLineNumber.foreground` | gutter | T0 | bg.base | fg.subtle | — | default; fg.faint (1.84) was unreadable |
| Line numbers, active (cursor line) | `editorLineNumber.activeForeground` | gutter active | T0 | bg.base | accent | — | only on the line holding the cursor |
| Current line highlight | `editor.lineHighlightBackground` | active_line | T0 | line.current | fg.base (text unaffected) | border.subtle outline (optional) | editor-focused only; drop to no fill when editor unfocused |
| Cursor | `editorCursor.foreground` | cursor | T0 | — | — | cursor | blink default, solid while typing |
| Selection, focused | `editor.selectionBackground` | selection | T0 | selection | fg.base | — | window focused |
| Selection, unfocused | `editor.inactiveSelectionBackground` | — | T0 | selection.inactive | fg.base | — | window/pane unfocused, selection persists |
| Find — all matches | `editorFindMatchHighlightBackground` | search matches | T1 | find.match | fg.base | — | lowest-alpha of the three find/word roles |
| Find — current match | `editorFindMatchBackground` | active search match | T1 | find.current | fg.base | border.strong | highest-alpha, always wins over find.match |
| Word highlight (occurrences) | `editor.wordHighlightBackground` | selection-matches | T1 | word.highlight | fg.base | — | weaker than find.match so it never reads as a search |
| Bracket match | `editorBracketMatch.border` | bracket highlight | T0 | — (no fill) | — | bracket.match | box outline only, no background |
| Indent guides, normal | `editorIndentGuide.background` | indent guides | T3 | — | — | indent.guide | always-on, near-invisible |
| Indent guides, active | `editorIndentGuide.activeBackground` | active indent guide | T3 | — | — | indent.guide.active | one step up from indent.guide, still not accent |
| Whitespace render | `editorWhitespace.foreground` | whitespace | T3 | — | fg.faint | — | toggle on/off, no state change |
| Gutter git markers | `gitDecoration.*` gutter | git gutter | T1 | bg.base (gutter bg) | — | git.added / git.modified / git.deleted | hover → tooltip in bg.raised |
| Diagnostics — squiggle | `editorError/Warning/Info.border` | diagnostic underline | T1 | — | — | error / warning / info / hint | wavy underline, color = severity |
| Diagnostics — gutter icon | problems gutter icon | diagnostic gutter icon | T1 | bg.base | — | error / warning / info / hint | same severity color as squiggle |
| Diagnostics — inline message | ghost text at EOL | inline diagnostic | T1 | — | error / warning / info / hint (as text color) | — | dimmed via the status color itself, not fg.muted — must keep hue |
| Tabs — active | active tab | active tab | T2 | bg.base | fg.base | accent (underline) | one of the ~5 accent spots |
| Tabs — inactive | inactive tab | inactive tab | T2 | bg.deep | fg.muted | — | default |
| Tabs — hover | tab hover | tab hover | T2 | bg.base (lightens from bg.deep) | fg.base | — | pointer over, not active |
| Tabs — modified (unsaved dot) | dirty indicator | modified dot | T2 | — | fg.muted | — | neutral dot — must not be accent, or it collides with the active-tab underline on an active+modified tab |
| Active tab/view indicator | tab underline, activity-bar bar | tab underline, activity-bar bar | T2 | — | — | accent | shared pattern: editor tabs, panel tabs, activity-bar selected icon all use this one accent rule |
| Sidebar file tree — default | tree row | project panel row | T2 | bg.base (transparent) | fg.muted | — | default |
| Sidebar file tree — hover | tree row hover | panel row hover | T2 | bg.deep (wash) | fg.base | — | pointer over |
| Sidebar file tree — selected, panel focused | tree row selected (focused) | panel row selected | T2 | accent.soft | fg.base | border.strong (focus outline) | this panel has keyboard focus |
| Sidebar file tree — selected, panel unfocused | tree row selected (unfocused) | — | T2 | bg.raised | fg.base | — | selection persists, focus moved elsewhere |
| Git decorations in tree | filename color + badge | filename color + badge | T2 | — | git.added / git.modified / git.deleted / git.ignored / git.conflict | same roles as badge | color + letter badge (A/M/D), never color alone |
| Activity bar icons — default | activity bar icon | activity bar icon | T2/T3 | bg.deep | fg.subtle | — | default, 4.02 |
| Activity bar icons — hover | icon hover | icon hover | T2/T3 | bg.deep | fg.muted | — | pointer over |
| Activity bar icons — active (selected view) | selected icon | selected icon | T2/T3 | bg.deep | fg.base | accent (edge bar) | counts toward the active-indicator accent rule |
| Status bar — normal | status bar | status bar | T3 | bg.deep | fg.muted | — | default |
| Status bar — debugging | status bar (debug) | status bar (debug) | T3 | bg.deep (unchanged) | warning | border.subtle top edge in warning | deliberate deviation from VS Code's full-bar orange recolor — keeps chrome near-black, signals via text/icon tint only |
| Status bar — no folder open | status bar (no workspace) | status bar (no project) | T3 | bg.deep | fg.subtle | — | fewer segments, everything dimmer (4.02, still readable) |
| Panel tabs (Problems/Output/Terminal) | panel tab headers | panel tab headers | T2 | same active/inactive/hover pattern as editor tabs | — | — | — |
| Terminal | integrated terminal | terminal pane | T0 (content) | bg.base | fg.base | border.subtle (panel edge) | ANSI colors out of this spec |
| Scrollbar — thumb | scrollbar slider | scrollbar | T2 | — | — | fg.subtle at 40% (default) / 60% (hover) / 70% (drag), translucent | track stays bg.base/transparent |
| Scrollbar — overview ruler ticks | error/warning/git ticks on scrollbar | — | T1 | — | — | error / warning / git.added / git.modified / git.deleted | thin tick, same severity roles as gutter |
| Minimap | minimap | minimap | T2 | bg.base | — | find.mark / word.mark / selection.mark (50% alpha marks, readable at minimap size) | viewport slider box = fg.subtle at 20/30/35%, translucent |
| Inputs — default | text input | text input | T1 | bg.deep | fg.base (fg.subtle placeholder) | border.strong | default |
| Inputs — hover | — | — | T1 | bg.deep | fg.base | border.strong | pointer over |
| Inputs — focus | — | — | T1 | bg.deep | fg.base | accent (focus ring) | one of the ~5 accent spots |
| Inputs — invalid | validation error | — | T1 | bg.deep | fg.base | error | validation failed |
| Buttons — primary | primary button | primary button | T1 | accent | bg.deep (ink on accent, needs contrast check) | — | hover = accent.hover (aquaBright, turso hover color), press = accent; disabled → bg.raised + fg.faint |
| Buttons — secondary | secondary button | secondary button | T1 | bg.raised (bg.overlay on hover) | fg.base | border.subtle (border.strong on hover) | focus → accent ring |
| Badges — generic count | badge | badge | T2 | bg.raised | fg.base | — | default |
| Badges — severity (e.g. problem count) | badge | badge | T1 | error / warning (as bg) | bg.deep (ink) | — | severity-colored only when it represents that severity |
| Dropdowns/autocomplete/hover widgets — container | suggest widget | completion menu | T1 | bg.overlay | fg.base | border.strong | floating — highest surface (VS Code `editorWidget.background`, Zed `elevated_surface.background`); border carries the separation |
| Dropdown row — hover | item hover | item hover | T1 | — | fg.base | border.subtle outline (no fill) | pointer over, not the highlighted/selected item |
| Dropdown row — selected/highlighted | keyboard-selected item | keyboard-selected item | T1 | accent.soft | fg.base | — | same fill pattern as tree selection |
| Command palette — container | quick input widget | command palette | T1 | bg.overlay | fg.base | border.strong | modal-level float, above bg.raised |
| Command palette — input row | quick input text box | palette input | T1 | bg.deep | fg.base | border.subtle (separator to results) | same inset-input rule applies even inside an overlay |
| Command palette — result row | quick-pick item | result item | T1 | dropdown row pattern (hover/selected above) | — | — | — |
| Notifications/toast | notification toast | toast | T1 | bg.overlay | fg.base (fg.muted for timestamp) | error/warning/info (left stripe, by severity) | severity shown by stripe + icon, never accent |
| Peek view — container | peek view widget | — | T1 | bg.overlay | fg.base | border.strong | embedded overlay inside the editor |
| Peek view — header | peek view title bar | — | T1 | bg.deep | fg.base | — | — |
| Peek view — result list | peek result list | — | T1 | dropdown row pattern | — | find.match (matched text) | — |
| Diff editor — inserted line | `diffEditor.insertedLineBackground` | diff added line | T1 | git.added (low alpha, whole line) | fg.base | — | — |
| Diff editor — inserted text (char-level) | `diffEditor.insertedTextBackground` | diff added chars | T1 | git.added (higher alpha) | fg.base | — | — |
| Diff editor — removed line | `diffEditor.removedLineBackground` | diff removed line | T1 | git.deleted (low alpha, whole line) | fg.base | — | — |
| Diff editor — removed text (char-level) | `diffEditor.removedTextBackground` | diff removed chars | T1 | git.deleted (higher alpha) | fg.base | — | — |
| Diff editor — unchanged | unchanged region | unchanged region | T0 | bg.base | fg.base | — | — |
| Merge conflict — current/ours region | current-change block | — | T1 | git.added (wash, reused — no dedicated "ours" role) | fg.base | border.strong between regions | — |
| Merge conflict — incoming/theirs region | incoming-change block | — | T1 | info (wash, reused — no dedicated "theirs" role) | fg.base | border.strong between regions | — |
| Merge conflict — markers (`<<<<<<<`/`=======`/`>>>>>>>`) | conflict marker lines | — | T1 | — | git.conflict | — | text color only, shape (the marker glyphs) carries the rest |

## 4. Rules

**Accent budget — max 5 spots, nowhere else:**
1. Cursor
2. Active tab/view indicator (editor tab underline, panel tab underline, activity-bar selected icon bar — one pattern, counted once)
3. Focus ring (inputs, buttons, any focusable control, including dropdown/tree keyboard focus outline)
4. Primary button background
5. Active line number

Sanctioned extra uses (not counted as spots: they mark where the eye already is, never decorate chrome):
6. Search match highlight in pickers (Zed `text.accent`/`icon.accent`: fuzzy-match characters, links)
7. Progress bar (VS Code `progressBar.background`): transient activity indicator

Forbidden: chrome backgrounds (T3), inactive tabs, badges that represent a severity (those use the severity role, not accent), the tab "modified" dot, any diagnostic/git/diff color.

**Keeping selection / find / word-highlight distinguishable** (fill vs border, alpha ranking, low → high prominence):
1. word.highlight — weakest, border or lowest-alpha fill. It's ambient context, not a result.
2. selection.inactive — low-alpha fill, same hue family as selection but clearly quieter.
3. find.match — mid-alpha fill, stronger than word.highlight since it's an active search result.
4. selection — full-alpha fill, the strongest "this is what I'm acting on" state.
5. find.current — mid-alpha fill + border.strong outline. The outline, not raw alpha, is what makes the *current* match findable among many find.match fills.

Rule: no two of these ever share both the same alpha band and the same treatment (fill-only vs fill+border). If a future role needs to coexist with selection on the same character, it must take the border-only lane (like bracket.match) rather than compete on fill.

**Diagnostics never rely on hue alone:** every diagnostic surface pairs the severity color with a shape — squiggle underline in the text, icon in the gutter, stripe on a notification, badge letter in the tree. A severity role (error/warning/info/hint) never appears as the only differentiator on a plain fill with no icon/shape attached.

## 5. Accessibility notes

- Focus ring (accent) must stay visible on every background it can land on — bg.deep, bg.base, bg.raised, bg.overlay. Flag to color-scientist: compute accent-vs-each-bg contrast, record in the palette spec; if any bg fails, the focus ring needs its own outline/offset trick, not a weaker color.
- Never remove a focus outline without replacing it with an equally visible one — no `outline: none` with nothing in its place, in either editor's theme-level styling hooks.
- No meaning by color alone anywhere: diagnostics (icon+squiggle+badge), git status (color+letter badge), diff (color+gutter sign), merge regions (color+region label/CodeLens text). This is the same rule as the diagnostics note in §4, applied theme-wide.
- Text contrast: fg.base vs bg.base/bg.deep targets body-text WCAG AA (4.5:1). Non-text UI (borders, icons, focus ring, indicators) targets 3:1 minimum (WCAG 2.2 §1.4.11). Both are computed numbers for the color-scientist's palette spec, not decided here.
- Primary button ink (bg.deep text on accent fill) is the one place text sits on a bright/saturated role instead of a neutral — contrast must be checked explicitly since accent is tuned for recognizability, not guaranteed text-safe.
