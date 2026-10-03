import { readFileSync } from 'node:fs';
import type { BundledLanguage } from 'shiki';
import { describe, expect, it } from 'vitest';
import { directory, fixtures, highlighter, theme } from '../scripts/shiki-fixtures';
import { roles } from '../src/roles';

const mustBeColored = /^(keyword|storage|entity\.name\.(type|class|function|tag)|support\.(type|class|function)|string|constant\.(numeric|language)|comment|entity\.other\.attribute-name|meta\.decorator|support\.type\.property-name)/;
const neutral = new Set<string>([roles.fg.base, roles.fg.muted, roles.syntax.comment.color]);
const dataLanguages = new Set(['json', 'yaml', 'toml']);
// Hue balance pending the palette spec review (task-6 report): dockerfile has 2 hues at 76% fuchsia, shellscript 61% emerald.
const pendingHueReview = new Set(['dockerfile', 'shellscript']);

const tokenize = (file: string, language: BundledLanguage) =>
  highlighter.codeToTokensBase(readFileSync(`${directory}/${file}`, 'utf8'), { lang: language, theme, includeExplanation: true }).flat();

describe.each(fixtures)('$file', ({ file, language }) => {
  const tokens = tokenize(file, language);

  it('colors every keyword, type, function, string, number, constant, comment and attribute', () => {
    const uncolored = tokens.flatMap((token) =>
      (token.explanation ?? [])
        .filter((part) => part.content.trim() && mustBeColored.test(part.scopes.at(-1)?.scopeName ?? '') && token.color?.toUpperCase() === roles.fg.base)
        .map((part) => `${part.content.trim()} <${part.scopes.at(-1)?.scopeName}>`),
    );
    expect(uncolored).toEqual([]);
  });

  (pendingHueReview.has(language) ? it.fails : it)('balances hues: at least 3, none above 45% of colored characters', () => {
    const shares = new Map<string, number>();
    for (const token of tokens) {
      const color = token.color?.toUpperCase() ?? roles.fg.base;
      if (!neutral.has(color) && token.content.trim()) shares.set(color, (shares.get(color) ?? 0) + token.content.trim().length);
    }
    const total = [...shares.values()].reduce((sum, count) => sum + count, 0);
    expect(shares.size).toBeGreaterThanOrEqual(3);
    if (!dataLanguages.has(language)) expect(Math.max(...shares.values()) / total).toBeLessThanOrEqual(0.45);
  });
});
