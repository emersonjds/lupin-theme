import { describe, expect, it } from 'vitest';
import { composite, contrast, deltaE, oklab, type Hex } from '../src/color';
import { palette } from '../src/palette';
import { roles } from '../src/roles';

const { syntax, bg, fg, editor } = roles;
const nonCode = new Set(['comment', 'quote', 'deprecated']);
const codeTokens = Object.entries(syntax).filter(([name]) => !nonCode.has(name));

describe('contrast gates (01 §5)', () => {
  it.each(codeTokens)('%s is at least 4.5:1 on bg.base', (_, style) =>
    expect(contrast(style.color, bg.base)).toBeGreaterThanOrEqual(4.5));

  it.each([...nonCode])('%s is at least 3:1 on bg.base', (name) =>
    expect(contrast(syntax[name as keyof typeof syntax].color, bg.base)).toBeGreaterThanOrEqual(3));

  it.each([bg.base, bg.raised, bg.overlay])('fg.muted is at least 4.5:1 on %s', (surface) =>
    expect(contrast(fg.muted, surface)).toBeGreaterThanOrEqual(4.5));

  const overlays: Hex[] = [
    editor.selection, editor.selectionInactive, editor.findMatch, editor.findCurrent, editor.wordHighlight,
    editor.lineCurrent, editor.bracketMatch, editor.invalidBackground, editor.diffAdded, editor.diffDeleted,
    editor.diffAddedText, editor.diffDeletedText, editor.conflictBackground,
  ];
  it.each(overlays)('overlay %s keeps every code token at least 3:1', (overlay) => {
    const surface = composite(overlay, bg.base);
    const failing = codeTokens.filter(([, style]) => contrast(style.color, surface) < 3).map(([name]) => name);
    expect(failing).toEqual([]);
  });

  it.each(overlays.filter((overlay) => overlay !== editor.lineCurrent))('overlay %s stacked on line.current keeps every code token at least 3:1', (overlay) => {
    const surface = composite(overlay, composite(editor.lineCurrent, bg.base));
    const failing = codeTokens.filter(([, style]) => contrast(style.color, surface) < 3).map(([name]) => name);
    expect(failing).toEqual([]);
  });
});

describe('hue separation gates (01 §5)', () => {
  const gated = ['keyword', 'modifier', 'property', 'string', 'function', 'type', 'number', 'invalid', 'variable', 'punctuation', 'comment'] as const;
  const accepted = new Set(['function/variable/deuteranopia', 'function/variable/protanopia']);
  const pairs = gated.flatMap((first, index) => gated.slice(index + 1).map((second) => [first, second] as const));

  it.each(pairs)('%s vs %s is at least 0.08 apart', (first, second) =>
    expect(deltaE(syntax[first].color, syntax[second].color)).toBeGreaterThanOrEqual(0.08));

  it.each(pairs)('%s vs %s stays at least 0.05 apart under deuteranopia and protanopia', (first, second) => {
    const failing = (['deuteranopia', 'protanopia'] as const).filter(
      (vision) => !accepted.has(`${first}/${second}/${vision}`) && deltaE(syntax[first].color, syntax[second].color, vision) < 0.05,
    );
    expect(failing).toEqual([]);
  });
});

const lch = (hex: Hex) => {
  const [lightness, a, b] = oklab(hex);
  return { lightness, chroma: Math.hypot(a, b), hue: ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360 };
};

describe('rule checks (01 §5)', () => {
  const accents = (['keyword', 'modifier', 'property', 'string', 'function', 'number', 'type', 'invalid'] as const).map((name) => [name, syntax[name].color] as const);
  const chromatic = (['aqua', 'fuchsia', 'orchid', 'sky', 'emerald', 'yellow', 'peach', 'red', 'lime', 'pistachio'] as const).map((name) => [name, palette[name]] as const);
  const neutrals = Object.entries({ ...palette }).filter(([name]) => /^(bg|border)[A-Z][a-z]+$|^fg(Muted|Subtle|Faint)$/.test(name));
  const siblings = new Set(['fuchsia/orchid', 'emerald/lime', 'lime/pistachio']);
  const closeHues = chromatic
    .flatMap(([first, firstHex], index) => chromatic.slice(index + 1).map(([second, secondHex]) => [`${first}/${second}`, firstHex, secondHex] as const))
    .filter(([pair, first, second]) => !siblings.has(pair) && 180 - Math.abs(Math.abs(lch(first).hue - lch(second).hue) - 180) < 30);

  it('keyword and modifier siblings differ in chroma by at least 0.10', () =>
    expect(Math.abs(lch(syntax.keyword.color).chroma - lch(syntax.modifier.color).chroma)).toBeGreaterThanOrEqual(0.1));

  it.each(accents)('R3: %s has L in [0.70, 0.89] and C in [0.10, 0.21]', (_, hex) => {
    const { lightness, chroma } = lch(hex);
    expect([lightness >= 0.7, lightness <= 0.89, chroma >= 0.1, chroma <= 0.21]).toEqual([true, true, true, true]);
  });

  it.each(closeHues)('R9: %s, closer than 30° in hue, differ in L by at least 0.10', (_, first, second) =>
    expect(Math.abs(lch(first).lightness - lch(second).lightness)).toBeGreaterThanOrEqual(0.1));

  it.each(chromatic)('R11: %s is darker than fg.base', (_, hex) => expect(lch(hex).lightness).toBeLessThan(lch(fg.base).lightness));

  it.each(neutrals)('R1: neutral %s keeps its hue in [238, 250] when chromatic', (_, hex) => {
    const { chroma, hue } = lch(hex);
    if (chroma > 0.01) expect([hue >= 238, hue <= 250]).toEqual([true, true]);
  });
});

describe('string, constant and current line retune (01 §9 #11)', () => {
  const hueGap = (first: Hex, second: Hex) => 180 - Math.abs(Math.abs(lch(first).hue - lch(second).hue) - 180);

  it('string sits at least 30° in hue from function', () =>
    expect(hueGap(syntax.string.color, syntax.function.color)).toBeGreaterThanOrEqual(30));

  it('regexp and inline code follow string', () =>
    expect([syntax.regexp.color, syntax.literal.color]).toEqual([syntax.string.color, syntax.string.color]));
});
