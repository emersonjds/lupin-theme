import { describe, expect, it } from 'vitest';
import { composite, contrast, deltaE, type Hex } from '../src/color';
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
