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
});
