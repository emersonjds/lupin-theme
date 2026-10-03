import Ajv from 'ajv';
import { describe, expect, it } from 'vitest';
import schema from './fixtures/zed-schema-v0.2.0.json';
import { roles } from '../src/roles';
import { zedTheme } from '../src/targets/zed';

const { syntax: captures, ...style } = zedTheme.themes[0].style;
const knownStyleKeys = Object.keys(schema.definitions.ThemeStyleContent.properties);

// 01 §8 "Zed capture map (complete)" plus the 04 §5 extras.
const requiredCaptures = [
  'attribute', 'boolean', 'comment', 'comment.doc', 'constant', 'constructor', 'embedded', 'emphasis',
  'emphasis.strong', 'enum', 'function', 'hint', 'keyword', 'label', 'link_text', 'link_uri', 'number',
  'operator', 'predictive', 'preproc', 'primary', 'property', 'punctuation', 'punctuation.bracket',
  'punctuation.delimiter', 'punctuation.list_marker', 'punctuation.special', 'string', 'string.escape',
  'string.regex', 'string.special', 'string.special.symbol', 'tag', 'text.literal', 'title', 'type',
  'type.interface', 'type.super', 'variable', 'variable.member', 'variable.parameter', 'variable.special', 'variant',
];

describe('zed theme', () => {
  it('validates against schema v0.2.0', () => {
    const validate = new Ajv({ strict: false }).compile(schema);
    expect(validate(zedTheme), JSON.stringify(validate.errors)).toBe(true);
  });

  it('uses only style keys the schema knows', () =>
    expect(Object.keys(style).filter((key) => !knownStyleKeys.includes(key))).toEqual([]));

  it.each(requiredCaptures)('maps capture %s', (capture) => expect(captures).toHaveProperty([capture]));

  it('sets the local player cursor and selection to the accent', () => {
    expect(style.players[0].cursor).toBe(roles.accent.base);
    expect(style.players[0].selection).toBe(roles.editor.selection);
  });
});
