# Spec 04: Surface map — Lupin Theme

Card: ZED-5. Role names only (from `01-palette.md`), no hex — color-scientist owns values, this spec owns which VS Code/Zed key gets which role. Keys verified against: VS Code theme color reference (code.visualstudio.com/api/references/theme-color, fetched 2026-10-02), VS Code semantic highlight guide (same date), Zed theme schema v0.2.0 (zed.dev/schema/themes/v0.2.0.json), Dracula `src/dracula.yml` + `dracula/zed` `themes/dracula.json` as scope/capture reference. No key below is invented — every VS Code key and every Zed `style` key is cross-checked against the fetched lists; Zed `syntax` capture names have no fixed schema enum (`syntax` is `additionalProperties`), so that list is checked against Dracula's real `dracula.json` captures (43) instead.

"unset" = key intentionally left out; VS Code/Zed derives it from a key we do set (documented inline). "n/a" = key exists but out of scope for this theme (not in the 02 element table).

## 1. VS Code workbench colors

Ordered to match `02-attention-hierarchy.md` §3 element table groups.

### Editor core (T0)

| Key | Role | Notes |
|---|---|---|
| `editor.background` | bg.base | |
| `editor.foreground` | fg.base | |
| `editorLineNumber.foreground` | fg.faint | inactive lines |
| `editorLineNumber.activeForeground` | accent | accent spot #5 |
| `editor.lineHighlightBackground` | line.current | alpha wash, `01` §1 |
| `editor.lineHighlightBorder` | unset | fill-only per 02, no outline |
| `editorCursor.foreground` | accent | accent spot #1 |
| `editorCursor.background` | bg.deep | ink under block cursor |

### Selection / find / word / bracket (T0/T1)

| Key | Role | Notes |
|---|---|---|
| `editor.selectionBackground` | selection | |
| `editor.selectionForeground` | unset | syntax colors show through, per 02 |
| `editor.inactiveSelectionBackground` | selection.inactive | |
| `editor.selectionHighlightBackground` | word.highlight | plain-text occurrences |
| `editor.selectionHighlightBorder` | unset | |
| `editor.wordHighlightBackground` | word.highlight | symbol read occurrence |
| `editor.wordHighlightBorder` | unset | |
| `editor.wordHighlightStrongBackground` | word.highlight | write occurrence, same role (no split in `01`) |
| `editor.wordHighlightStrongBorder` | unset | |
| `editor.wordHighlightTextBackground` | word.highlight | textual occurrence |
| `editor.wordHighlightTextBorder` | unset | |
| `editor.findMatchBackground` | find.current | |
| `editor.findMatchBorder` | border.strong | |
| `editor.findMatchForeground` | unset | |
| `editor.findMatchHighlightBackground` | find.match | |
| `editor.findMatchHighlightBorder` | unset | |
| `editor.findMatchHighlightForeground` | unset | |
| `editorBracketMatch.background` | unset | no fill, per 02 rule |
| `editorBracketMatch.border` | bracket.match | box outline only |
| `editorBracketMatch.foreground` | unset | |

### Indent guides / whitespace (T3)

| Key | Role | Notes |
|---|---|---|
| `editorIndentGuide.background` | indent.guide | = border.subtle |
| `editorIndentGuide.activeBackground` | indent.guide.active | = fg.faint |
| `editorWhitespace.foreground` | fg.faint | |

Per-depth bracket-pair-colorization variants (`editorIndentGuide.(active)Background1-6`, `editorBracketPairGuide.*`) intentionally unset — Lupin doesn't enable rainbow bracket-pair colorization; VS Code falls back to the two keys above.

### Gutter — git + diagnostics (T1)

| Key | Role | Notes |
|---|---|---|
| `editorGutter.background` | bg.base | unset would also resolve here; explicit for clarity |
| `editorGutter.addedBackground` | git.added | |
| `editorGutter.modifiedBackground` | git.modified | |
| `editorGutter.deletedBackground` | git.deleted | |
| `editorError.foreground` | error | squiggle color; gutter icon derives from this, no separate key |
| `editorError.border` | unset | boxes rarely rendered |
| `editorError.background` | unset | avoid double emphasis, squiggle+gutter+ruler already carry it |
| `editorWarning.foreground` | warning | |
| `editorInfo.foreground` | info | |
| `editorHint.foreground` | hint | `editorHint.background` does not exist as a key (verified) |
| `editorHint.border` | unset | |

### Diagnostics / git overview ruler ticks + minimap (T1/T2)

| Key | Role | Notes |
|---|---|---|
| `editorOverviewRuler.border` | border.subtle | |
| `editorOverviewRuler.errorForeground` | error | |
| `editorOverviewRuler.warningForeground` | warning | |
| `editorOverviewRuler.infoForeground` | info | |
| `editorOverviewRuler.addedForeground` | git.added | |
| `editorOverviewRuler.modifiedForeground` | git.modified | |
| `editorOverviewRuler.deletedForeground` | git.deleted | |
| `editorOverviewRuler.findMatchForeground` | find.match | |
| `editorOverviewRuler.selectionHighlightForeground` | word.highlight | |
| `editorOverviewRuler.wordHighlightForeground` | word.highlight | |
| `editorOverviewRuler.wordHighlightStrongForeground` | word.highlight | |
| `editorOverviewRuler.wordHighlightTextForeground` | word.highlight | |
| `editorOverviewRuler.bracketMatchForeground` | bracket.match | |
| `minimap.background` | bg.base | |
| `minimap.findMatchHighlight` | find.match | |
| `minimap.selectionHighlight` | selection | |
| `minimap.selectionOccurrenceHighlight` | word.highlight | |
| `minimap.errorHighlight` | error | |
| `minimap.warningHighlight` | warning | |
| `minimap.infoHighlight` | info | |
| `minimapGutter.addedBackground` | git.added | |
| `minimapGutter.modifiedBackground` | git.modified | |
| `minimapGutter.deletedBackground` | git.deleted | |
| `minimapSlider.background` | border.subtle | viewport box |
| `minimapSlider.hoverBackground` | border.strong | |
| `minimapSlider.activeBackground` | border.strong | |

### Scrollbar (T2)

| Key | Role | Notes |
|---|---|---|
| `scrollbarSlider.background` | fg.faint | default thumb |
| `scrollbarSlider.hoverBackground` | fg.subtle | |
| `scrollbarSlider.activeBackground` | fg.muted | drag |
| `scrollbar.shadow` | unset | |

### Tabs + editorGroupHeader (T2/T3)

| Key | Role | Notes |
|---|---|---|
| `tab.activeBackground` | bg.base | |
| `tab.activeForeground` | fg.base | |
| `tab.activeBorder` | accent | accent spot #2 (shared active-indicator pattern); bottom border carries the indicator, matching turso.tech's active-tab underline |
| `tab.activeBorderTop` | unset | no top border, the bottom underline is the indicator |
| `tab.border` | border.subtle | |
| `tab.inactiveBackground` | bg.deep | |
| `tab.inactiveForeground` | fg.muted | |
| `tab.hoverBackground` | bg.base | lightens from bg.deep |
| `tab.hoverForeground` | fg.base | |
| `tab.hoverBorder` | unset | |
| `tab.unfocusedActiveBackground` | bg.base | reuses focused-active mapping, no dedicated role in 02 |
| `tab.unfocusedActiveForeground` | fg.base | |
| `tab.activeModifiedBorder` | fg.muted | closest key to the "modified dot", kept neutral per 02 |
| `tab.inactiveModifiedBorder` | fg.muted | |
| `tab.unfocusedActiveModifiedBorder` | fg.muted | |
| `tab.unfocusedInactiveModifiedBorder` | fg.muted | |
| `editorGroupHeader.tabsBackground` | bg.deep | tab-bar strip container |
| `editorGroupHeader.tabsBorder` | border.subtle | |
| `editorGroupHeader.noTabsBackground` | bg.deep | |
| `editorGroupHeader.border` | border.subtle | |
| `editorGroup.border` | border.subtle | split border between editor groups |

### Panel tabs — reuse of tab pattern

| Key | Role | Notes |
|---|---|---|
| `panelTitle.activeForeground` | fg.base | |
| `panelTitle.activeBorder` | accent | same accent spot #2 pattern |
| `panelTitle.inactiveForeground` | fg.muted | |
| `panelTitle.border` | border.subtle | |
| `panelTitleBadge.background` | bg.raised | |
| `panelTitleBadge.foreground` | fg.base | |

### Sidebar / list / tree (T2)

| Key | Role | Notes |
|---|---|---|
| `sideBar.background` | bg.base | |
| `sideBar.foreground` | fg.muted | default row text |
| `sideBar.border` | border.subtle | |
| `sideBarTitle.foreground` | fg.base | |
| `sideBarSectionHeader.background` | bg.base | unset would also resolve here |
| `sideBarSectionHeader.foreground` | fg.muted | |
| `list.hoverBackground` | bg.deep | wash |
| `list.hoverForeground` | fg.base | |
| `list.focusBackground` | accent.soft | selected, panel focused (keyboard focus) |
| `list.focusForeground` | fg.base | |
| `list.focusOutline` | border.strong | focus outline |
| `list.activeSelectionBackground` | accent.soft | selected, panel focused |
| `list.activeSelectionForeground` | fg.base | |
| `list.inactiveSelectionBackground` | bg.raised | selected, panel unfocused |
| `list.inactiveSelectionForeground` | fg.base | |
| `list.dropBackground` | accent.soft | drop target reuses selection fill |
| `list.errorForeground` | error | |
| `list.warningForeground` | warning | |
| `list.highlightForeground` | find.match | fuzzy-matched chars, text-weight not fill; reuses find hue, not accent (stays inside the 5-spot budget) |
| `list.focusHighlightForeground` | find.match | same reuse |
| `tree.indentGuidesStroke` | indent.guide | |
| `tree.inactiveIndentGuidesStroke` | indent.guide | |

### Git decorations in tree (T2)

| Key | Role | Notes |
|---|---|---|
| `gitDecoration.addedResourceForeground` | git.added | |
| `gitDecoration.modifiedResourceForeground` | git.modified | |
| `gitDecoration.deletedResourceForeground` | git.deleted | |
| `gitDecoration.untrackedResourceForeground` | git.added | no dedicated role, reuse |
| `gitDecoration.ignoredResourceForeground` | git.ignored | = fg.faint |
| `gitDecoration.conflictingResourceForeground` | git.conflict | = peach |
| `gitDecoration.renamedResourceForeground` | git.modified | no dedicated role, reuse |
| `gitDecoration.stageModifiedResourceForeground` | git.modified | |
| `gitDecoration.stageDeletedResourceForeground` | git.deleted | |
| `gitDecoration.submoduleResourceForeground` | fg.muted | neutral |

### Activity bar (T2/T3)

| Key | Role | Notes |
|---|---|---|
| `activityBar.background` | bg.deep | |
| `activityBar.foreground` | fg.base | active/selected icon |
| `activityBar.inactiveForeground` | fg.faint | default icon |
| `activityBar.activeBorder` | accent | accent spot #2 (edge bar, same pattern as tab underline) |
| `activityBar.activeBackground` | unset | never a fill, per 02 |
| `activityBar.activeFocusBorder` | accent | same spot, focus variant |
| `activityBar.border` | border.subtle | |
| `activityBarBadge.background` | bg.raised | generic count badge |
| `activityBarBadge.foreground` | fg.base | |

### Status bar (T3)

| Key | Role | Notes |
|---|---|---|
| `statusBar.background` | bg.deep | |
| `statusBar.foreground` | fg.muted | |
| `statusBar.border` | border.subtle | |
| `statusBar.debuggingBackground` | bg.deep | unchanged — deliberate deviation, 02 |
| `statusBar.debuggingForeground` | warning | |
| `statusBar.debuggingBorder` | warning | top edge, signals via hue not a full recolor |
| `statusBar.noFolderBackground` | bg.deep | |
| `statusBar.noFolderForeground` | fg.faint | |
| `statusBar.noFolderBorder` | border.subtle | |
| `statusBarItem.hoverBackground` | bg.base | |
| `statusBarItem.activeBackground` | bg.raised | pressed |
| `statusBarItem.prominentBackground` | bg.raised | |
| `statusBarItem.prominentForeground` | fg.base | |
| `statusBarItem.errorBackground` | error | |
| `statusBarItem.errorForeground` | bg.deep | ink on severity fill |
| `statusBarItem.warningBackground` | warning | |
| `statusBarItem.warningForeground` | bg.deep | |
| `statusBarItem.remoteBackground` | bg.raised | |
| `statusBarItem.remoteForeground` | fg.base | |
| `statusBarItem.focusBorder` | accent | covered by spot #3 ("any focusable control"), not a new spot |

### Panel / terminal (T0 content, T2/T3 chrome)

| Key | Role | Notes |
|---|---|---|
| `panel.background` | bg.base | |
| `panel.border` | border.subtle | |
| `panelInput.border` | border.subtle | input itself still uses `input.*` (bg.deep) |
| `panelSection.border` | border.subtle | |
| `panelSectionHeader.background` | bg.base | |
| `panelSectionHeader.foreground` | fg.muted | |
| `terminal.background` | bg.base | |
| `terminal.foreground` | fg.base | |
| `terminal.border` | border.subtle | |
| `terminal.selectionBackground` | selection | |
| `terminal.inactiveSelectionBackground` | selection.inactive | |
| `terminal.findMatchBackground` | find.current | |
| `terminal.findMatchHighlightBackground` | find.match | |

### Terminal — 16 ANSI (content, out of 02's scope but required for completeness)

| Key | Role (`01` terminal table) |
|---|---|
| `terminal.ansiBlack` | borderStrong |
| `terminal.ansiRed` | red |
| `terminal.ansiGreen` | emerald |
| `terminal.ansiYellow` | yellow |
| `terminal.ansiBlue` | blue (terminal-only) |
| `terminal.ansiMagenta` | fuchsia |
| `terminal.ansiCyan` | aqua |
| `terminal.ansiWhite` | grayLight (terminal-only) |
| `terminal.ansiBrightBlack` | fgSubtle |
| `terminal.ansiBrightRed` | redBright (terminal-only) |
| `terminal.ansiBrightGreen` | lime |
| `terminal.ansiBrightYellow` | yellowBright (terminal-only) |
| `terminal.ansiBrightBlue` | sky |
| `terminal.ansiBrightMagenta` | fuchsiaBright (terminal-only) |
| `terminal.ansiBrightCyan` | aquaBright (terminal-only) |
| `terminal.ansiBrightWhite` | white (terminal-only) |

### Inputs (T1)

| Key | Role | Notes |
|---|---|---|
| `input.background` | bg.deep | inset "well" rule applies everywhere, incl. inside overlays |
| `input.foreground` | fg.base | |
| `input.border` | border.subtle | border.strong on hover/focus is state, not a separate key — VS Code has no `input.hoverBorder`; focus uses `focusBorder` globally |
| `input.placeholderForeground` | fg.faint | |
| `inputOption.activeBorder` | accent | covered by spot #3 |
| `inputOption.activeBackground` | accent.soft | |
| `inputOption.activeForeground` | fg.base | |
| `inputValidation.errorBackground` | bg.deep | |
| `inputValidation.errorBorder` | error | |
| `inputValidation.errorForeground` | fg.base | |
| `inputValidation.warningBorder` | warning | |
| `inputValidation.infoBorder` | info | |

### Focus / button / badge / dropdown (T1)

| Key | Role | Notes |
|---|---|---|
| `focusBorder` | accent | accent spot #3, global fallback |
| `button.background` | accent | accent spot #4 |
| `button.foreground` | bg.deep | ink on accent, contrast-check flagged to color-scientist |
| `button.hoverBackground` | accent | same fill, color-scientist tunes the delta |
| `button.border` | unset | |
| `button.secondaryBackground` | bg.raised | |
| `button.secondaryForeground` | fg.base | |
| `button.secondaryBorder` | border.subtle | |
| `button.secondaryHoverBackground` | bg.raised | VS Code has no secondary-hover-border key; the border.strong-on-hover intent from 02 can't be expressed here — **gap**, see §bottom |
| `badge.background` | bg.raised | generic count |
| `badge.foreground` | fg.base | |
| `dropdown.background` | bg.raised | |
| `dropdown.foreground` | fg.base | |
| `dropdown.border` | border.strong | |
| `dropdown.listBackground` | bg.raised | |

### Quick input / command palette (T1)

| Key | Role | Notes |
|---|---|---|
| `quickInput.background` | bg.overlay | |
| `quickInput.foreground` | fg.base | |
| `quickInputTitle.background` | bg.overlay | |
| `quickInputList.focusBackground` | accent.soft | result row selected |
| `quickInputList.focusForeground` | fg.base | |
| `quickInputList.focusIconForeground` | fg.base | |

No dedicated "input row" background key exists for quick input — the text box inherits `input.background` (bg.deep), matching 02's "inputs stay bg.deep even inside an overlay" rule without a separate key.

### Notifications (T1)

| Key | Role | Notes |
|---|---|---|
| `notifications.background` | bg.overlay | |
| `notifications.foreground` | fg.base | |
| `notifications.border` | border.strong | |
| `notificationCenterHeader.background` | bg.overlay | |
| `notificationsErrorIcon.foreground` | error | |
| `notificationsWarningIcon.foreground` | warning | |
| `notificationsInfoIcon.foreground` | info | |
| `notificationLink.foreground` | sky | reuse of markdown link_text role, not accent |
| `notificationToast.border` | border.strong | |

### Peek view (T1)

| Key | Role | Notes |
|---|---|---|
| `peekView.border` | border.strong | |
| `peekViewTitle.background` | bg.deep | |
| `peekViewTitleLabel.foreground` | fg.base | |
| `peekViewTitleDescription.foreground` | fg.muted | |
| `peekViewEditor.background` | bg.overlay | |
| `peekViewEditor.matchHighlightBackground` | find.match | |
| `peekViewEditor.matchHighlightBorder` | border.strong | |
| `peekViewEditorGutter.background` | bg.overlay | |
| `peekViewResult.background` | bg.overlay | |
| `peekViewResult.fileForeground` | fg.base | |
| `peekViewResult.lineForeground` | fg.muted | |
| `peekViewResult.matchHighlightBackground` | find.match | |
| `peekViewResult.selectionBackground` | accent.soft | |
| `peekViewResult.selectionForeground` | fg.base | |

### Diff editor (T1/T0)

| Key | Role | Notes |
|---|---|---|
| `diffEditor.border` | border.subtle | |
| `diffEditor.diagonalFill` | border.subtle | |
| `diffEditor.insertedLineBackground` | git.added | low alpha, whole line |
| `diffEditor.insertedTextBackground` | git.added | higher alpha, char-level |
| `diffEditor.removedLineBackground` | git.deleted | low alpha |
| `diffEditor.removedTextBackground` | git.deleted | higher alpha |
| `diffEditorGutter.insertedLineBackground` | git.added | |
| `diffEditorGutter.removedLineBackground` | git.deleted | |
| `diffEditorOverview.insertedForeground` | git.added | |
| `diffEditorOverview.removedForeground` | git.deleted | |
| `diffEditor.unchangedRegionBackground` | bg.deep | collapsed fold, recessed |
| `diffEditor.unchangedCodeBackground` | unset | plain bg.base |
| `diffEditor.move.border` | info | moved-block border, no dedicated role, reuse |

### Merge conflict (T1)

| Key | Role | Notes |
|---|---|---|
| `merge.border` | border.strong | |
| `merge.currentContentBackground` | git.added | "ours" wash, reused, per 02 |
| `merge.currentHeaderBackground` | git.added | |
| `merge.incomingContentBackground` | info | "theirs" wash, reused |
| `merge.incomingHeaderBackground` | info | |
| `merge.commonContentBackground` | bg.deep | common-ancestor region, neutral |
| `merge.commonHeaderBackground` | bg.deep | |
| `mergeEditor.conflict.input1.background` | git.added | 3-way merge editor, reuse |
| `mergeEditor.conflict.input2.background` | info | |
| `mergeEditor.conflictingLines.background` | git.conflict | **gap**: no alpha wash variant exists for git.conflict (peach) in `01` §1; needs a low-alpha composite like the other alpha-variant rows — flag to color-scientist |

### Breadcrumb (T2)

| Key | Role | Notes |
|---|---|---|
| `breadcrumb.background` | bg.base | |
| `breadcrumb.foreground` | fg.muted | |
| `breadcrumb.focusForeground` | fg.base | |
| `breadcrumb.activeSelectionForeground` | fg.base | |
| `breadcrumbPicker.background` | bg.overlay | floating picker |

### Title bar (T3)

| Key | Role | Notes |
|---|---|---|
| `titleBar.activeBackground` | bg.deep | |
| `titleBar.activeForeground` | fg.muted | |
| `titleBar.inactiveBackground` | bg.deep | |
| `titleBar.inactiveForeground` | fg.faint | |
| `titleBar.border` | border.subtle | |

### Menu (T1/T2)

| Key | Role | Notes |
|---|---|---|
| `menu.background` | bg.overlay | |
| `menu.foreground` | fg.base | |
| `menu.border` | border.strong | |
| `menu.selectionBackground` | accent.soft | |
| `menu.selectionForeground` | fg.base | |
| `menu.separatorBackground` | border.subtle | |
| `menubar.selectionBackground` | bg.raised | top menu bar hover, chrome-level, not accent |

### Widget / global misc

| Key | Role | Notes |
|---|---|---|
| `widget.border` | border.subtle | |
| `widget.shadow` | unset | |
| `sash.hoverBorder` | border.strong | drag-handle hover, kept out of the accent budget (not a focus ring) |
| `textLink.foreground` | sky | reuse markdown link_text role |
| `textLink.activeForeground` | sky | no distinct hover hue defined, reuse |
| `icon.foreground` | fg.muted | |
| `descriptionForeground` | fg.muted | |
| `errorForeground` | error | global fallback |
| `foreground` | fg.base | global fallback |
| `disabledForeground` | fg.faint | |
| `selection.background` | accent.soft | workbench text-field selection (not editor) |

Count: ~195 keys set across the groups above (excludes `symbolIcon.*`, `charts.*`, `debugIcon.*`, `debugToolBar.*`, bracket-pair per-depth 1-6, `mergeEditor.conflict.*handled*` — all exist in the VS Code reference but are outside the 02 element table, intentionally left to derive VS Code defaults).

## 2. VS Code tokenColors

**Order**: generic scope groups first, language/grammar-specific overrides after — later rules in the array win ties on specificity in VS Code's TextMate tokenizer, same convention `dracula.yml` uses (generic `storage`/`keyword`/`string`/`entity.name.type` first, per-grammar `source.java storage.type`, `storage.type.core.rust`, etc. layered after).

### Generic (apply everywhere first)

| Scope(s) | Role | fontStyle |
|---|---|---|
| `comment`, `comment.line`, `comment.block` | comment | italic |
| `comment.block.documentation` | comment.doc | italic |
| `string`, `string.quoted` | string | — |
| `string.quoted.docstring.multi.python` | comment | italic (Dracula precedent: docstrings read as comments) |
| `constant.numeric`, `keyword.other.unit` (`0x` prefix in C/C++) | number | — |
| `constant.language` (`true`/`false`/`null`/`nil`/`None`) | number | — |
| `constant.character.escape` | escape | — |
| `constant.other.symbol`, `constant.other.key` | constant | — |
| `variable.language` (`self`/`this`/`super`/`cls`) | variable.special | italic |
| `variable.parameter`, `entity.name.variable.parameter` | parameter | italic |
| `variable.other.constant`, `variable.other.enummember` | constant | — |
| `variable.other.readwrite`, `variable.other.object`, `variable` | variable | — |
| `support.variable.property`, `variable.other.property`, `support.type.property-name` (fallback, e.g. `max-width` in `@media`) | property | — |
| `keyword` (fallback for grammar-specific `keyword.other.*`: `import`/`package`/`use`/`namespace`/`new`, Dockerfile and Ruby `keyword.other.special-method`, SQL `keyword.other.sql`/`keyword.other.create.sql`/`keyword.other.DML.II.sql`), `keyword.control`, `keyword.control.flow`, `keyword.control.return`, `keyword.control.import`, `keyword.control.export` | keyword | — |
| `keyword.operator.new`, `keyword.operator.expression` | keyword | — |
| `keyword.operator` | operator | — |
| `storage`, `storage.type`, `storage.modifier` | modifier | — |
| `storage.type.primitive`, `support.type.primitive` | type | — |
| `entity.name.type`, `entity.name.type.class`, `entity.other.inherited-class`, `support.type`, `support.class` (Python `str`, Swift `String`, PHP/Ruby classes, TS `object`) | type | italic (except declared class name, upright — see override below) |
| `entity.name.class` | type | — (declared class name, upright, Dracula precedent) |
| `entity.name.type.type-parameter`, `meta.indexer.mappedtype.declaration` | property | italic (generic type param) |
| `entity.name.function`, `meta.function-call.object`, `support.function` | function | — |
| `meta.decorator variable.other.readwrite`, `meta.decorator variable.other.object` | attribute | italic |
| `entity.name.namespace` | namespace | — |
| `entity.name.tag` | tag | — |
| `entity.other.attribute-name` | attribute | italic |
| `punctuation`, `punctuation.definition`, `punctuation.separator`, `punctuation.terminator` | punctuation | — |
| `punctuation.definition.string` (begin/end: `'`, `"`, `` ` ``) | string | — (quotes take the string color, matching turso.tech; after `punctuation` so it wins) |
| `punctuation.definition.template-expression`, `punctuation.section.embedded` | escape | — (interpolation punctuation, `01` §4 fuchsia) |
| `punctuation.definition.keyword` | keyword | — |
| `string.regexp` | regexp | — |
| `punctuation.definition.string.begin.regexp`, `punctuation.definition.group.regexp`, `punctuation.definition.character-class.regexp` | regexp | — |
| `invalid` | invalid | underline |
| `invalid.deprecated` | fg.subtle | strikethrough (deprecated, separate from invalid) |

### Markdown

| Scope(s) | Role | fontStyle |
|---|---|---|
| `markup.heading`, `entity.name.section.markdown` | title | bold |
| `markup.bold`, `strong` | fg.base | bold |
| `markup.italic`, `emphasis` | fg.base | italic |
| `markup.inline.raw`, `fenced_code.block.language`, `markup.fenced_code.block` | text.literal | — |
| `markup.underline.link`, `meta.link` | link_uri | underline |
| `string.other.link.title.markdown`, `meta.link.inline.description` | link_text | — |
| `beginning.punctuation.definition.list.markdown` | modifier | — (list marker) |
| `markup.quote.markdown` | comment | italic |
| `markup.inserted`, `meta.diff.header.to-file` | git.added | — |
| `markup.deleted`, `meta.diff.header.from-file` | git.deleted | — |
| `markup.changed` | git.modified | — |
| `meta.separator.markdown` | border.subtle | — |

### HTML / JSX

| Scope(s) | Role | fontStyle |
|---|---|---|
| `entity.name.tag`, `punctuation.definition.tag` | tag | — |
| `entity.other.attribute-name.html`, `entity.other.attribute-name.jsx` | attribute | italic |
| `support.class.component` (JSX component tag) | type | — |
| `string.quoted` inside tag attribute | string | — |

### CSS / SCSS

| Scope(s) | Role | fontStyle |
|---|---|---|
| `entity.other.attribute-name.class.css`, `entity.other.attribute-name.id.css`, `entity.other.attribute-name.parent-selector` | type | — |
| `entity.other.attribute-name.pseudo-class`, `entity.other.attribute-name.pseudo-element` | modifier | — |
| `support.type.property-name.css` | property | — |
| `constant.numeric.css`, `keyword.other.unit.css` | number | — |
| `constant.other.color.rgb-value.css`, `constant.other.color.rgb-value.hex.css`, `support.constant.color.w3c-standard-color-name.css` | number | (color literal, same role as other literals) |
| `meta.property-value.css`, `support.constant.property-value.css` | fg.base | — |
| `entity.name.tag.css` (element selector) | type | — |
| `keyword.control.at-rule` (`@media`) | keyword | — |

### JSON / YAML / TOML

| Scope(s) | Role | fontStyle |
|---|---|---|
| `support.type.property-name.json`, `entity.name.tag.yaml`, `entity.name.section.toml` | property | — |
| `string.quoted.double.json` (value) | string | — |
| `constant.language.json` (`true`/`false`/`null`) | number | — |
| `entity.other.attribute-name.toml` (`[table]` header) | type | — |

### Shell / Dockerfile

| Scope(s) | Role | fontStyle |
|---|---|---|
| `source.shell variable.other`, `variable.other.readwrite.shell` | variable | — |
| `string.quoted.double.shell`, `punctuation.definition.variable.shell` | string | — |
| `keyword.control.shell` (`if`, `then`, `fi`) | keyword | — |
| `support.function.builtin.shell` | function | — |
| `keyword.other.dockerfile` (`FROM`, `RUN`, `AS`) | keyword | — |
| `entity.name.image.dockerfile` | type | — |

### Java

| Scope(s) | Role | fontStyle |
|---|---|---|
| `storage.modifier.java` (`public static final`) | modifier | — |
| `storage.type.java` (primitives) | type | italic |
| `storage.type.annotation.java`, `meta.declaration.annotation.java punctuation.definition.annotation.java` | attribute | italic |
| `entity.name.type.class.java` | type | — |

### Kotlin

| Scope(s) | Role | fontStyle |
|---|---|---|
| `storage.modifier.kotlin` (`val`, `var`, `fun`, `data`, `sealed`) | modifier | — |
| `entity.name.function.kotlin` | function | — |
| `support.type.primitive.kotlin` | type | italic |
| `keyword.hard.kotlin` (`val`, `as`, `is`, `in`), `keyword.hard.class.kotlin`, `keyword.hard.fun.kotlin`, `keyword.hard.object.kotlin`, `keyword.hard.typealias.kotlin` | modifier | — (declarations, `01` §8) |

### C\#

| Scope(s) | Role | fontStyle |
|---|---|---|
| `storage.modifier.cs` | modifier | — |
| `storage.type.cs` (primitives), `source.cs keyword.type` (`string`, `int`, `bool`) | type | italic |
| `punctuation.definition.attribute.cs`, `entity.name.type.attribute.cs` (`[Attr]`) | attribute | italic |

### Python

| Scope(s) | Role | fontStyle |
|---|---|---|
| `storage.modifier.python` (`global`, `nonlocal`) | modifier | — |
| `meta.function.decorator.python`, `entity.name.function.decorator.python` | attribute | italic |
| `variable.parameter.function.language.python` (`self`, `cls`) | variable.special | italic |
| `string.quoted.f-string.python` delimiters | string | — ; embedded `{expr}` → `escape` (fuchsia), matches interpolation-punctuation rule |

### Go

| Scope(s) | Role | fontStyle |
|---|---|---|
| `storage.type.go` (primitives) | type | italic |
| `entity.name.function.go` | function | — |
| `keyword.import.go` | keyword | — |
| `keyword.const.go`, `keyword.var.go`, `keyword.type.go`, `keyword.struct.go`, `keyword.interface.go`, `keyword.function.go`, `keyword.map.go`, `keyword.channel.go` | modifier | — (declarations, `01` §8) |

### Rust

| Scope(s) | Role | fontStyle |
|---|---|---|
| `storage.type.core.rust`, `storage.class.std.rust` | type | italic |
| `storage.modifier.lifetime.rust` (`'a`) | lifetime | italic |
| `entity.name.function.macro.rust` (`println!`) | function | — |
| `meta.attribute.rust` (`#[derive]`) | attribute | italic |
| `keyword.other.fn.rust` (`fn`) | modifier | — (`use`/`impl`/`as` share `keyword.other.rust` and fall back to keyword) |

### C / C++

| Scope(s) | Role | fontStyle |
|---|---|---|
| `storage.type.c`, `storage.type.cpp` (primitives) | type | italic |
| `keyword.control.import.c`, `meta.preprocessor.c`, `keyword.control.directive.c` (`#include`, `#define`) | preproc | — |
| `entity.name.function.preprocessor.c` | function | — (macro call) |
| `keyword.other.typedef.c`, `keyword.other.default.destructor.cpp` (`= default`) | modifier | — |

### PHP

| Scope(s) | Role | fontStyle |
|---|---|---|
| `variable.other.php` (`$var`) | variable | — |
| `storage.type.php`, `keyword.other.type.php` (`string`, `int`) | type | italic |
| `entity.name.function.php` | function | — |

### Ruby

| Scope(s) | Role | fontStyle |
|---|---|---|
| `constant.other.symbol.ruby`, `constant.other.symbol.hashkey.ruby` | constant | — |
| `variable.other.readwrite.instance.ruby` (`@ivar`) | variable.special | italic |
| `entity.name.function.ruby` | function | — |

### Swift

| Scope(s) | Role | fontStyle |
|---|---|---|
| `storage.modifier.swift`, `keyword.other.declaration-specifier` (`let`, `var`, `private`) | modifier | — |
| `keyword.expressions-and-types.swift` (primitives/`self`) | type | italic |
| `support.type.attribute.swift` (`@State`) | attribute | italic |

### SQL

| Scope(s) | Role | fontStyle |
|---|---|---|
| `keyword.other.DML.sql` (`SELECT`, `INSERT`) | keyword | — |
| `keyword.other.alias.sql`, `keyword.other.order.sql`, `keyword.operator.logical.sql`, `keyword.other.DDL.create.II.sql` (`AS`, `AND`, `OR`, `IN`, `ASC`/`DESC`, `NOT NULL`, `ON`) | modifier | — (connectives, per `01` §8) |
| `support.function.sql` | function | — |
| `support.type.sql` (table-like), `storage.type.sql` (`INTEGER`, `TEXT`) | type | — |
| `variable.parameter.sql` (column identifiers, fallback) | fg.base | — |

### Diff / deprecated (editor-adjacent syntax, not the VS Code `diffEditor.*` workbench colors)

| Scope(s) | Role | fontStyle |
|---|---|---|
| `markup.inserted.diff` | git.added | — |
| `markup.deleted.diff` | git.deleted | — |
| `meta.diff.header` | fg.muted | — |

`invalid.deprecated` lives in the Generic group only.

## 3. VS Code semanticTokenColors

`"editor.semanticHighlighting": true`. Standard types (23) and modifiers (10) per the semantic highlight guide, fetched 2026-10-02.

| Selector | Role | fontStyle |
|---|---|---|
| `namespace` | namespace | — |
| `class` | type | — |
| `class.declaration` | type | — (upright, same as class — Dracula "class names normal") |
| `enum` | type | — |
| `enumMember` | constant | — |
| `interface` | type | italic |
| `struct` | type | italic |
| `typeParameter` | property | italic |
| `type` | type | italic |
| `parameter` | parameter | italic |
| `variable` | variable | — |
| `variable.readonly` | constant | — |
| `property` | property | — |
| `property.readonly` | property | — |
| `decorator` | attribute | italic |
| `event` | property | — |
| `function` | function | — |
| `function.defaultLibrary` | function | — (no dim-for-stdlib rule defined, same color) |
| `method` | function | — |
| `macro` | function | — |
| `label` | label | italic |
| `comment` | comment | italic |
| `string` | string | — |
| `keyword` | keyword | — |
| `number` | number | — |
| `regexp` | regexp | — |
| `operator` | operator | — |
| `*.defaultLibrary` | fg.base | — (no distinct treatment, stays role-colored) |
| `*.declaration` | (same role as base type, unstyled) | — |

Modifiers only change fontStyle, never color, except `deprecated`:

| Modifier | Effect |
|---|---|
| `declaration`, `definition` | no change |
| `readonly` | color → constant (see `variable.readonly`/`property.readonly` rows above) |
| `static` | no change (Dracula doesn't split static visually either) |
| `deprecated` | strikethrough, color unchanged |
| `abstract` | italic added |
| `async` | italic added |
| `modification` | no change |
| `documentation` | italic added (doc-comment context) |
| `defaultLibrary` | no change — degrades to the base type color |

## 4. Zed style keys

From `ThemeStyleContent` (142 properties total in schema v0.2.0). `_background`/`_border` suffix pairs listed together.

### Core surfaces / text / borders

| Key | Role |
|---|---|
| `background` | bg.base |
| `surface.background` | bg.deep |
| `elevated_surface.background` | bg.overlay |
| `panel.background` | bg.base |
| `border` | border.subtle |
| `border.variant` | border.subtle |
| `border.focused` | accent |
| `border.selected` | border.strong |
| `border.transparent` | unset |
| `border.disabled` | fg.faint |
| `text` | fg.base |
| `text.muted` | fg.muted |
| `text.disabled` | fg.faint |
| `text.placeholder` | fg.faint |
| `text.accent` | accent |
| `icon` | fg.muted |
| `icon.muted` | fg.subtle |
| `icon.disabled` | fg.faint |
| `icon.placeholder` | fg.faint |
| `icon.accent` | accent |

### Element / ghost_element states (buttons, list rows, menu items)

| Key | Role |
|---|---|
| `element.background` | bg.raised |
| `element.hover` | bg.deep |
| `element.active` | accent.soft |
| `element.selected` | accent.soft |
| `element.disabled` | fg.faint |
| `ghost_element.background` | unset (transparent) |
| `ghost_element.hover` | bg.deep |
| `ghost_element.active` | bg.raised |
| `ghost_element.selected` | accent.soft |
| `ghost_element.disabled` | fg.faint |

### Editor

| Key | Role |
|---|---|
| `editor.background` | bg.base |
| `editor.foreground` | fg.base |
| `editor.gutter.background` | bg.base |
| `editor.line_number` | fg.faint |
| `editor.active_line_number` | accent |
| `editor.active_line.background` | line.current |
| `editor.highlighted_line.background` | word.highlight |
| `editor.document_highlight.read_background` | word.highlight |
| `editor.document_highlight.write_background` | word.highlight |
| `editor.document_highlight.bracket_background` | bracket.match |
| `editor.indent_guide` | indent.guide |
| `editor.indent_guide_active` | indent.guide.active |
| `editor.invisible` | fg.faint |
| `editor.wrap_guide` | indent.guide |
| `editor.active_wrap_guide` | indent.guide.active |
| `editor.subheader.background` | bg.deep |

Selection and find fills are not `ThemeStyleContent` keys — Zed derives `selection` from `players[0].selection` (see below) and `search.match_background` covers both find roles (Zed has one search fill; per `01` §1 note, `find.current`'s border is the only differentiator Zed can't reproduce).

| Key | Role |
|---|---|
| `search.match_background` | find.match |

Status/git families: `<status>` and `<status>.border` take the solid role; `<status>.background` takes a translucent wash, because Zed paints `.background` as a fill (diff hunks, inlay hints, diagnostic blocks) and a solid role color would flood the text.

| Key | `<status>` / `.border` | `.background` |
|---|---|---|
| `conflict` | git.conflict | editor.conflictBackground (orchidSoft) |
| `created` | git.added | editor.diffAdded (limeFaint) |
| `deleted` | git.deleted | editor.diffDeleted (redFaint) |
| `modified` | git.modified | editor.wordHighlight (skyFaint) |
| `ignored` | git.ignored | bg.raised (no gray wash role) |
| `renamed` | git.modified (no dedicated role, reuse — matches VS Code gap above) | editor.wordHighlight (skyFaint) |
| `error` | error | editor.invalidBackground (redSoft) |
| `warning` | warning | editor.findMatch (yellowSoft) |
| `info` | info | editor.wordHighlight (skyFaint) |
| `hint` | hint | bg.raised (no gray wash role) |
| `success` | success | editor.diffAdded (limeFaint) |
| `hidden` | fg.faint | bg.raised (no gray wash role) |
| `unreachable` | fg.subtle | bg.raised (no gray wash role) |
| `predictive` | fg.subtle | bg.raised (no gray wash role) |

### Terminal + 16 ANSI

| Key | Role |
|---|---|
| `terminal.background` | bg.base |
| `terminal.foreground` | fg.base |
| `terminal.bright_foreground` | fgBase (same, no distinct bright-default) |
| `terminal.dim_foreground` | fg.muted |
| `terminal.ansi.background` | bg.base |
| `terminal.ansi.black` / `.bright_black` / `.dim_black` | borderStrong / fgSubtle / borderStrong (dim = same as normal, Zed has no dim-ANSI role in `01`) |
| `terminal.ansi.red` / `.bright_red` / `.dim_red` | red / redBright / red |
| `terminal.ansi.green` / `.bright_green` / `.dim_green` | emerald / lime / emerald |
| `terminal.ansi.yellow` / `.bright_yellow` / `.dim_yellow` | yellow / yellowBright / yellow |
| `terminal.ansi.blue` / `.bright_blue` / `.dim_blue` | blue / sky / blue |
| `terminal.ansi.magenta` / `.bright_magenta` / `.dim_magenta` | fuchsia / fuchsiaBright / fuchsia |
| `terminal.ansi.cyan` / `.bright_cyan` / `.dim_cyan` | aqua / aquaBright / aqua |
| `terminal.ansi.white` / `.bright_white` / `.dim_white` | grayLight / white / grayLight |

### Scrollbar / tab / panel / pane / title_bar / status_bar / toolbar

| Key | Role |
|---|---|
| `scrollbar.track.background` | unset (transparent, matches bg.base) |
| `scrollbar.track.border` | unset |
| `scrollbar.thumb.background` | fg.faint |
| `scrollbar.thumb.hover_background` | fg.subtle |
| `scrollbar.thumb.border` | unset |
| `tab_bar.background` | bg.deep |
| `tab.active_background` | bg.base |
| `tab.inactive_background` | bg.deep |
| `panel.focused_border` | accent (covered by spot #3, focusable panel) |
| `panel.indent_guide` | indent.guide |
| `panel.indent_guide_active` | indent.guide.active |
| `panel.indent_guide_hover` | border.strong |
| `pane.focused_border` | accent (spot #3) |
| `pane_group.border` | border.subtle |
| `title_bar.background` | bg.deep |
| `title_bar.inactive_background` | bg.deep |
| `status_bar.background` | bg.deep |
| `toolbar.background` | bg.base |
| `drop_target.background` | accent.soft |
| `link_text.hover` | sky |

### Players (multiplayer cursors) + accents

| Key | Role |
|---|---|
| `players[0].cursor` | accent |
| `players[0].selection` | selection |
| `players[0].background` | accent |
| `players[1..].*` | out of scope — Lupin is a single-variant theme, no collab palette defined in `01`; leave Zed defaults if the field is required, or omit (schema default `[]`) |
| `accents[]` | out of scope, same reasoning — array default `[]`, omit |

## 5. Zed syntax captures

`syntax` has no fixed schema enum (`additionalProperties`); capture names are convention. Base list = `01-palette.md` §8 "Zed capture map (complete)" (34 captures, already role-assigned there — not repeated in full here, see that file). This section only adds captures that exist in real-world Zed themes (verified against `dracula/zed` `themes/dracula.json`, 43 captures) but aren't in `01`'s table, derived from roles `01` already defines:

| Capture | Role | font_style |
|---|---|---|
| `hint` | hint | italic |
| `predictive` | fg.subtle | italic (ghost/inline-completion text, same "ambient, recedes" treatment as inline diagnostic) |
| `primary` | fg.base | — (fallback/base text capture some grammars emit) |
| `type.interface` | type | italic (matches R6 italic-types rule) |
| `type.super` | type | italic (superclass reference, same rule) |
| `variable.member` | property | — (Zed's name for member/field access, maps to `01`'s property role) |
| `variable.parameter` | parameter | italic (= fg.base italic, matches `01` §4) |

**Degradation**: Zed's fixed capture set has no `modifier`/`storage` split (`05-dracula-lessons.md` §"Zed capture map" note). Declaration keywords (`public static final fn let`) that VS Code colors `modifier` (orchid) all fall to Zed's `keyword` (fuchsia) capture in Zed — same degradation `01-palette.md` §8 already measured and accepted (max fuchsia share 47% TS, longest run 3).

## 6. Parity table (R8)

Role → VS Code representative scope/key → Zed capture/key, to drive a test asserting equal resolved color.

| Role | VS Code representative | Zed representative |
|---|---|---|
| bg.base | `editor.background` | `editor.background` |
| bg.deep | `activityBar.background` | `surface.background` |
| bg.raised | `dropdown.background` | `element.background` |
| bg.overlay | `quickInput.background` | `elevated_surface.background` |
| border.subtle | `editorIndentGuide.background` | `border.variant` |
| border.strong | `dropdown.border` | `border.selected` |
| fg.base | `editor.foreground` | `editor.foreground` / `text` |
| fg.muted | `sideBar.foreground` | `text.muted` |
| fg.subtle | — (no dedicated workbench key; syntax `comment` scope) | `icon.muted` |
| fg.faint | `editorLineNumber.foreground` | `editor.line_number` |
| accent | `editorCursor.foreground` | `editor.active_line_number` / `players[0].cursor` |
| accent.soft | `list.activeSelectionBackground` | `element.selected` |
| error | `editorError.foreground` | `error` |
| warning | `editorWarning.foreground` | `warning` |
| info | `editorInfo.foreground` | `info` |
| hint | `editorHint.foreground` | `hint` |
| success | — (no workbench UI key uses success directly outside git) | `success` |
| git.added | `editorGutter.addedBackground` | `created` |
| git.modified | `editorGutter.modifiedBackground` | `modified` |
| git.deleted | `editorGutter.deletedBackground` | `deleted` |
| git.ignored | `gitDecoration.ignoredResourceForeground` | `ignored` |
| git.conflict | `gitDecoration.conflictingResourceForeground` | `conflict` |
| keyword | `keyword.control` (tokenColors) | `keyword` |
| modifier | `storage.modifier` (tokenColors) | `keyword` (degrades, §5) |
| property | `variable.other.property` (tokenColors) / `property` (semanticTokenColors) | `property` |
| string | `string.quoted` (tokenColors) | `string` |
| function | `entity.name.function` (tokenColors) / `function` (semanticTokenColors) | `function` |
| constant | `variable.other.constant` (tokenColors) / `variable.readonly` (semanticTokenColors) | `constant` |
| number | `constant.numeric` (tokenColors) | `number` |
| type | `entity.name.type` (tokenColors) / `type` (semanticTokenColors) | `type` |
| variable | `variable` (tokenColors) | `variable` |
| parameter | `variable.parameter` (tokenColors) / `parameter` (semanticTokenColors) | `variable.parameter` |
| variable.special | `variable.language` (tokenColors) | `variable.special` |
| operator | `keyword.operator` (tokenColors) / `operator` (semanticTokenColors) | `operator` |
| punctuation | `punctuation` (tokenColors) | `punctuation` |
| comment | `comment` (tokenColors) | `comment` |
| tag | `entity.name.tag` (tokenColors) | `tag` |
| attribute | `entity.other.attribute-name` (tokenColors) / `decorator` (semanticTokenColors) | `attribute` |
| regexp | `string.regexp` (tokenColors) | `string.regex` |
| escape | `constant.character.escape` (tokenColors) | `string.escape` |
| invalid | `invalid` (tokenColors) | — (Zed has no `invalid` capture; degrades to `string.regex`-adjacent red or unstyled — gap, see below) |
| namespace | `entity.name.namespace` (tokenColors) / `namespace` (semanticTokenColors) | — (Zed has no `namespace` capture in the base set; degrades to `variable` — gap) |
| label | `entity.name.label` (tokenColors) / `label` (semanticTokenColors) | `label` |
| lifetime | `storage.modifier.lifetime.rust` (tokenColors) | `label` (Zed has no `lifetime` capture; closest styled capture — gap) |
| preproc | `meta.preprocessor` (tokenColors) | `preproc` |
| selection | `editor.selectionBackground` | `players[0].selection` |
| find.match | `editor.findMatchHighlightBackground` | `search.match_background` |
| word.highlight | `editor.wordHighlightBackground` | `editor.document_highlight.read_background` |
| line.current | `editor.lineHighlightBackground` | `editor.active_line.background` |
| bracket.match | `editorBracketMatch.border` | `editor.document_highlight.bracket_background` |
| indent.guide | `editorIndentGuide.background` | `editor.indent_guide` |
| cursor | `editorCursor.foreground` | `players[0].cursor` |

## Gaps / degradations summary

1. **Zed has no `invalid` syntax capture** — regex-invalid/error-token styling degrades to plain `string.regex`/unstyled text in Zed; parity test must special-case this role as "VS Code only."
2. **Zed has no `namespace` capture** in the base set — degrades to `variable` (fg.base), losing the namespace role distinction in Zed only.
3. **Zed has no `lifetime` capture** — closest is `label` (orchid, italic), same color family as `01` already assigns to lifetime, so visually harmless; capture-name gap only.
4. **Zed has no `modifier`/`storage` capture** (already known from `05-dracula-lessons.md`) — declaration keywords fall to `keyword` (fuchsia) in Zed, accepted degradation.
5. **`git.conflict` has no alpha-wash variant** in `01-palette.md` §1 — needed for `mergeEditor.conflictingLines.background`; flagged to color-scientist, not invented here.
6. **`button.secondaryHoverBackground`** can't express 02's "border.strong on hover" rule — VS Code has no secondary-button hover-border key, only hover-background; mapped to bg.raised (no-op) instead.
7. **No dedicated roles exist for**: `gitDecoration.untrackedResourceForeground`, `gitDecoration.renamedResourceForeground` (VS Code), Zed's `renamed` — all reuse `git.added`/`git.modified` per existing "no dedicated role" notes already present in `01-palette.md`'s own alpha-variant and role-map sections, not new gaps introduced here.

## Roles referenced that are NOT in 01-palette.md

None. Every role used above (including the 7 extra Zed captures in §5 and the `fg.subtle`/`success`/`hint` keys) resolves to a role already named in `01-palette.md` §1/§4/§8 or `02-attention-hierarchy.md`'s surface-layering vocabulary (bg.deep/base/raised/overlay, border.subtle/strong).
