import { expect, it } from 'vitest';
import { composite, contrast, type Hex } from '../src/color';
import { zedTheme } from '../src/targets/zed';

const style: Record<string, Hex> = Object.fromEntries(
  Object.entries(zedTheme.themes[0].style).flatMap(([key, value]): [string, Hex][] => (typeof value === 'string' ? [[key, value]] : [])),
);
const text = 4.5;
// Non-text UI (WCAG 1.4.11) and the fg.subtle tier: placeholders, line numbers, hints.
const secondary = 3;
const surfaces = ['background', 'surface.background', 'elevated_surface.background', 'editor.background'];

// [foreground key, background key, minimum, surface under a translucent background]. Disabled states are exempt.
// text.muted on element.selected (3.84 on bg.base) is an accepted exception, 04 §4.
const pairs: [string, string, number, string?][] = [
  ...surfaces.flatMap((surface): [string, string, number, string?][] => [
    ['text', surface, text],
    ['text.muted', surface, text],
    ['text.placeholder', surface, secondary],
    ['icon', surface, secondary],
    ['border.focused', surface, secondary],
    ['text', 'element.selected', text, surface],
    ['text', 'ghost_element.selected', text, surface],
  ]),
  ['editor.foreground', 'editor.background', text],
  ['editor.line_number', 'editor.background', secondary],
  ['editor.active_line_number', 'editor.background', text],
  ['text', 'status_bar.background', text],
  ['text.muted', 'status_bar.background', text],
  ['text', 'title_bar.background', text],
  ['text', 'tab_bar.background', text],
  ['text', 'tab.active_background', text],
  ['text.muted', 'tab.inactive_background', text],
  ['text', 'element.background', text],
  ['text', 'element.hover', text],
  ['text', 'ghost_element.active', text],
  ['hint', 'hint.background', secondary],
  ['terminal.foreground', 'terminal.background', text],
];

it.each(pairs)('%s on %s is at least %s:1', (foreground, background, minimum, surface = 'editor.background') =>
  expect(contrast(style[foreground], composite(style[background], style[surface]))).toBeGreaterThanOrEqual(minimum));
