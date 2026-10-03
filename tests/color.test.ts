import { describe, expect, it } from 'vitest';
import { composite, contrast, deltaE, oklab } from '../src/color';

describe('contrast', () => {
  it('is 21 for black on white', () => expect(contrast('#000000', '#FFFFFF')).toBeCloseTo(21, 5));
  it('matches the known AA gray', () => expect(contrast('#767676', '#FFFFFF')).toBeCloseTo(4.54, 2));
  it('is symmetric', () => expect(contrast('#FFFFFF', '#767676')).toBe(contrast('#767676', '#FFFFFF')));
});

describe('composite', () => {
  it('blends half white over black', () => expect(composite('#FFFFFF80', '#000000')).toBe('#808080'));
  it('returns the color itself when opaque', () => expect(composite('#4FF8D2', '#000000')).toBe('#4FF8D2'));
});

describe('oklab', () => {
  it('puts white at L 1', () => expect(oklab('#FFFFFF')[0]).toBeCloseTo(1, 3));
  it('puts black at L 0', () => expect(oklab('#000000')[0]).toBeCloseTo(0, 5));
});

describe('deltaE', () => {
  it('is 1 between black and white', () => expect(deltaE('#000000', '#FFFFFF')).toBeCloseTo(1, 3));
  it('is 0 for the same color under any vision', () => expect(deltaE('#808080', '#808080', 'protanopia')).toBe(0));
  it('shrinks red/green under deuteranopia', () =>
    expect(deltaE('#FF0000', '#00FF00', 'deuteranopia')).toBeLessThan(deltaE('#FF0000', '#00FF00')));
  it('shrinks red/green under protanopia', () =>
    expect(deltaE('#FF0000', '#00FF00', 'protanopia')).toBeLessThan(deltaE('#FF0000', '#00FF00')));
});
