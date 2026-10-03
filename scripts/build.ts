import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { outputs, render } from '../src/build';

for (const [path, theme] of Object.entries(outputs)) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, render(theme));
}
