import { describe, expect, it } from 'vitest';
import validIds from './fixtures/vscode-color-ids.json';
import { roles, type Style } from '../src/roles';
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

  it('underlines the active tab with accent, no top border', () => {
    expect(colors['tab.activeBorder']).toBe(roles.accent.base);
    expect(colors).not.toHaveProperty(['tab.activeBorderTop']);
  });

  const { accent, bg, border, editor, fg, scrollbar, status, syntax, ui } = roles;
  it.each([
    ...[1, 2, 3, 4, 5, 6].map((depth) => [`editorBracketHighlight.foreground${depth}`, syntax.punctuation.color]),
    ['editorBracketHighlight.unexpectedBracket.foreground', status.error],
    ['editorBracketMatch.background', editor.bracketMatch],
    ['editorBracketMatch.border', editor.bracketMatchBorder],
    ['editorWidget.background', bg.overlay],
    ['editorWidget.border', border.strong],
    ['editorLineNumber.foreground', fg.subtle],
    ['gitDecoration.ignoredResourceForeground', fg.subtle],
    ['activityBar.inactiveForeground', fg.subtle],
    ['statusBar.noFolderForeground', fg.muted],
    ['input.placeholderForeground', fg.subtle],
    ['input.border', border.strong],
    ['button.hoverBackground', accent.hover],
    ['button.secondaryHoverBackground', bg.overlay],
    ['progressBar.background', accent.base],
    ['editorInlayHint.foreground', fg.subtle],
    ['editorInlayHint.background', bg.raised],
    ['pickerGroup.foreground', fg.muted],
    ['pickerGroup.border', border.subtle],
    ['debugToolBar.background', bg.overlay],
    ['editorOverviewRuler.findMatchForeground', editor.findMark],
    ['editorOverviewRuler.selectionHighlightForeground', editor.wordMark],
    ['editorOverviewRuler.wordHighlightForeground', editor.wordMark],
    ['minimap.findMatchHighlight', editor.findMark],
    ['minimap.selectionHighlight', editor.selectionMark],
    ['minimap.selectionOccurrenceHighlight', editor.wordMark],
    ['scrollbarSlider.background', scrollbar.thumb],
    ['scrollbarSlider.hoverBackground', scrollbar.thumbHover],
    ['scrollbarSlider.activeBackground', scrollbar.thumbActive],
    ['minimapSlider.background', scrollbar.minimap],
    ['minimapSlider.hoverBackground', scrollbar.minimapHover],
    ['minimapSlider.activeBackground', scrollbar.minimapActive],
    ['textLink.foreground', ui.link],
    ['notificationLink.foreground', ui.link],
  ])('maps %s to %s', (key, value) => expect(colors[key]).toBe(value));

  it.each(Object.entries(roles.scrollbar))('keeps scrollbar.%s translucent', (_, value) => expect(value).toHaveLength(9));

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

  it('keeps rule names unique', () => {
    const names = tokenColors.map((rule) => rule.name);
    expect(names.filter((name, index) => names.indexOf(name) !== index)).toEqual([]);
  });

  it.each([
    ['punctuation.definition.string', roles.syntax.string],
    ['punctuation.definition.template-expression', roles.syntax.escape],
    ['punctuation.section.embedded', roles.syntax.escape],
    ['entity.name.namespace', roles.syntax.namespace],
    ['invalid.deprecated', roles.syntax.deprecated],
    ['keyword.other.declaration-specifier.swift', roles.syntax.modifier],
    ['variable.parameter.sql', roles.syntax.variable],
  ])('colors %s with its role', (scope, style) => {
    const owners = tokenColors.filter((rule) => rule.scope.includes(scope));
    expect(owners.map((rule) => rule.settings.foreground)).toEqual([style.color]);
  });

  it('uses every syntax role at least once', () => {
    const used = new Set(tokenColors.map((rule) => `${rule.settings.foreground}/${rule.settings.fontStyle ?? ''}`));
    const unused = Object.entries<Style>(roles.syntax)
      .filter(([, style]) => !used.has(`${style.color}/${style.fontStyle ?? ''}`))
      .map(([name]) => name);
    expect(unused).toEqual([]);
  });
});

describe('vscode semantic tokens', () => {
  it('enables semantic highlighting', () => expect(vscodeTheme.semanticHighlighting).toBe(true));
  it.each(['class', 'interface', 'enumMember', 'parameter', 'property', 'function', 'method', 'macro', 'namespace', 'decorator'])(
    'colors %s', (selector) => expect(semanticTokenColors).toHaveProperty([selector]));

  it('keeps readonly variables in the variable color, like Zed', () =>
    expect(semanticTokenColors['variable.readonly']).toEqual({ foreground: roles.syntax.variable.color }));
});
