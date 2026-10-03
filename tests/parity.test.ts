import { expect, it } from 'vitest';
import { vscodeTheme } from '../src/targets/vscode';
import { zedTheme } from '../src/targets/zed';

const captures = zedTheme.themes[0].style.syntax;

const scopeColor = (scope: string) =>
  vscodeTheme.tokenColors.findLast((rule) => rule.scope.includes(scope))?.settings.foreground;

// [VS Code scope, Zed capture] for every syntax row of 04 §6; gaps skipped: modifier, invalid, namespace, lifetime.
const pairs = [
  ['keyword.control', 'keyword'],
  ['variable.other.property', 'property'],
  ['string', 'string'],
  ['string.quoted', 'string'],
  ['entity.name.function', 'function'],
  ['variable.other.constant', 'constant'],
  ['constant.numeric', 'number'],
  ['entity.name.type', 'type'],
  ['variable', 'variable'],
  ['variable.parameter', 'variable.parameter'],
  ['variable.language', 'variable.special'],
  ['keyword.operator', 'operator'],
  ['punctuation', 'punctuation'],
  ['comment', 'comment'],
  ['entity.name.tag', 'tag'],
  ['entity.other.attribute-name', 'attribute'],
  ['string.regexp', 'string.regex'],
  ['constant.character.escape', 'string.escape'],
  ['entity.name.label', 'label'],
  ['meta.preprocessor', 'preproc'],
] as const;

it.each(pairs)('VS Code %s and Zed %s share one color', (scope, capture) =>
  expect(scopeColor(scope)).toBe(captures[capture].color));
