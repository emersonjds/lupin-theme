import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { roles } from '../src/roles';
import { directory, fixtures, highlighter, theme } from './shiki-fixtures';

const sections = fixtures.map(({ file, language }) =>
  `<h2>${file}</h2>${highlighter.codeToHtml(readFileSync(`${directory}/${file}`, 'utf8'), { lang: language, theme })}`,
);

mkdirSync('preview', { recursive: true });
writeFileSync(
  'preview/index.html',
  `<!doctype html><meta charset="utf-8"><title>Lupin Theme preview</title>
<style>body{background:${roles.bg.deep};color:${roles.fg.muted};font:14px/1.6 "Geist Mono",ui-monospace,monospace;padding:24px}pre{padding:16px;border:1px solid ${roles.border.strong};border-radius:12px;overflow-x:auto}</style>
${sections.join('\n')}`,
);
