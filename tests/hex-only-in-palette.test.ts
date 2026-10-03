import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, it } from 'vitest';

it('keeps hex literals inside src/palette.ts only', () => {
  const files = readdirSync('src', { recursive: true, encoding: 'utf8' })
    .filter((file) => file.endsWith('.ts') && file !== 'palette.ts');
  const offenders = files.filter((file) => /#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})\b/i.test(readFileSync(join('src', file), 'utf8')));
  expect(offenders).toEqual([]);
});
