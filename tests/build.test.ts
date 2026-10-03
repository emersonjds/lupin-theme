import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import { outputs, render } from '../src/build';

it('renders pretty JSON with a trailing newline', () => expect(render({ a: 1 })).toBe('{\n  "a": 1\n}\n'));

it.each(Object.entries(outputs))('%s matches a fresh build (run npm run build)', (path, theme) =>
  expect(readFileSync(path, 'utf8')).toBe(render(theme)));
