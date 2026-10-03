import { expect, it } from 'vitest';
import { composite, contrast } from '../src/color';
import { vscodeTheme } from '../src/targets/vscode';

const { colors } = vscodeTheme;
const text = 4.5;
// Non-text UI (WCAG 1.4.11) and the fg.subtle tier: comments, line numbers, placeholders, inlay hints, dimmed chrome text.
const secondary = 3;

// [foreground key, background key, minimum, surface under a translucent background]. Disabled states are exempt.
const pairs: [string, string, number, string?][] = [
  ['editor.foreground', 'editor.background', text],
  ['editorLineNumber.foreground', 'editor.background', secondary],
  ['editorLineNumber.activeForeground', 'editor.background', text],
  ['editorCursor.foreground', 'editor.background', secondary],
  ['editorBracketHighlight.foreground1', 'editor.background', text],
  ['editorInlayHint.foreground', 'editorInlayHint.background', secondary],
  ['editorWidget.foreground', 'editorWidget.background', text],
  ['sideBar.foreground', 'sideBar.background', text],
  ['sideBarTitle.foreground', 'sideBar.background', text],
  ['list.activeSelectionForeground', 'list.activeSelectionBackground', text, 'sideBar.background'],
  ['list.inactiveSelectionForeground', 'list.inactiveSelectionBackground', text],
  ['list.hoverForeground', 'list.hoverBackground', text],
  ['gitDecoration.ignoredResourceForeground', 'sideBar.background', secondary],
  ['statusBar.foreground', 'statusBar.background', text],
  ['statusBar.noFolderForeground', 'statusBar.noFolderBackground', text],
  ['tab.activeForeground', 'tab.activeBackground', text],
  ['tab.inactiveForeground', 'tab.inactiveBackground', text],
  ['tab.activeBorder', 'tab.activeBackground', secondary],
  ['activityBar.foreground', 'activityBar.background', secondary],
  ['activityBar.inactiveForeground', 'activityBar.background', secondary],
  ['activityBar.activeBorder', 'activityBar.background', secondary],
  ['button.foreground', 'button.background', text],
  ['button.foreground', 'button.hoverBackground', text],
  ['button.secondaryForeground', 'button.secondaryBackground', text],
  ['button.secondaryForeground', 'button.secondaryHoverBackground', text],
  ['badge.foreground', 'badge.background', text],
  ['input.foreground', 'input.background', text],
  ['input.placeholderForeground', 'input.background', secondary],
  ['focusBorder', 'input.background', secondary],
  ['dropdown.foreground', 'dropdown.background', text],
  ['quickInput.foreground', 'quickInput.background', text],
  ['quickInputList.focusForeground', 'quickInputList.focusBackground', text, 'quickInput.background'],
  ['pickerGroup.foreground', 'quickInput.background', text],
  ['notifications.foreground', 'notifications.background', text],
  ['notificationLink.foreground', 'notifications.background', text],
  ['menu.foreground', 'menu.background', text],
  ['menu.selectionForeground', 'menu.selectionBackground', text, 'menu.background'],
  ['panelTitle.activeForeground', 'panel.background', text],
  ['panelTitle.inactiveForeground', 'panel.background', text],
  ['terminal.foreground', 'terminal.background', text],
  ['breadcrumb.foreground', 'breadcrumb.background', text],
  ['titleBar.activeForeground', 'titleBar.activeBackground', text],
  ['peekViewResult.lineForeground', 'peekViewResult.background', text],
  ['progressBar.background', 'editor.background', secondary],
];

it.each(pairs)('%s on %s is at least %s:1', (foreground, background, minimum, surface = 'editor.background') =>
  expect(contrast(colors[foreground], composite(colors[background], colors[surface]))).toBeGreaterThanOrEqual(minimum));
