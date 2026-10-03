import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { palette } from '../src/palette';
import { roles } from '../src/roles';
import { directory, highlighter, theme } from './shiki-fixtures';

// ponytail: macOS Chrome path only; take it from an env var if another OS ever renders the images.
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const swatches: [keyof typeof palette, string][] = [
  ['bgDeep', 'bg.deep (title/activity bar)'],
  ['bgBase', 'bg.base (editor background)'],
  ['bgRaised', 'bg.raised (panels, sidebar, tabs)'],
  ['bgOverlay', 'bg.overlay (popups, menus, hover)'],
  ['borderSubtle', 'border.subtle, indent.guide'],
  ['borderStrong', 'border.strong, ansi black'],
  ['fgBase', 'fg.base, variable, parameter'],
  ['fgMuted', 'fg.muted, punctuation, operator'],
  ['fgSubtle', 'fg.subtle, comment, hint'],
  ['fgFaint', 'fg.faint, inactive line numbers'],
  ['aqua', 'accent, cursor, function'],
  ['fuchsia', 'keyword, tag, escape'],
  ['orchid', 'storage/modifier, self/this'],
  ['sky', 'property, attribute, object key'],
  ['pistachio', 'string, regexp, inline code'],
  ['yellow', 'type, class, interface, generic'],
  ['peach', 'number, boolean, null, constant'],
  ['red', 'error, invalid, git deleted'],
  ['lime', 'success, git added'],
  ['emerald', 'terminal green'],
];

const showcase: [string, string][] = [
  ['typescript.ts', 'user-service.ts'],
  ['java.java', 'UserService.java'],
  ['rust.rs', 'user_service.rs'],
  ['sql.sql', 'schema.sql'],
];

const page = (title: string, style: string, body: string) => `<!doctype html><meta charset="utf-8"><title>${title}</title>
<style>*{box-sizing:border-box;margin:0}body{background:${roles.bg.deep};color:${roles.fg.base};font-family:"Geist Mono",ui-monospace,monospace;padding:40px}${style}</style>
${body}`;

const paletteHtml = page(
  'Lupin Theme palette',
  `h1{font-size:20px;font-weight:500;margin-bottom:24px}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.card{border:1px solid ${roles.border.strong};border-radius:8px;overflow:hidden;background:${roles.bg.raised}}
.swatch{height:64px}.info{padding:12px;display:grid;gap:2px}.name{font-size:13px}.hex{font-size:12px;color:${roles.accent.base}}.role{font-size:11px;color:${roles.fg.muted};margin-top:4px}`,
  `<h1>Lupin Theme — ${swatches.length} core colors</h1><div class="grid">${swatches
    .map(([name, role]) => `<div class="card"><div class="swatch" style="background:${palette[name]}"></div><div class="info"><span class="name">${name}</span><span class="hex">${palette[name]}</span><span class="role">${role}</span></div></div>`)
    .join('')}</div>`,
);

const showcaseHtml = page(
  'Lupin Theme showcase',
  `.grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start}
.card{border:1px solid ${roles.border.subtle};border-radius:12px;overflow:hidden;background:${roles.bg.base}}
.tab{display:flex;align-items:center;gap:8px;padding:10px 16px;font-size:13px;background:${roles.bg.raised};border-bottom:2px solid ${roles.accent.base}}
.dot{width:7px;height:7px;border-radius:50%;background:${roles.accent.base}}
pre.shiki{background:${roles.bg.base}!important;padding:16px;font-size:13px;line-height:1.55}`,
  `<div class="grid">${showcase
    .map(([file, label]) => `<div class="card"><div class="tab"><span class="dot"></span>${label}</div>${highlighter.codeToHtml(readFileSync(`${directory}/${file}`, 'utf8'), { lang: file.split('.')[0], theme })}</div>`)
    .join('')}</div>`,
);

const shoot = (name: string, html: string, width: number, height: number) => {
  const source = resolve(`preview/${name}.html`);
  writeFileSync(source, html);
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', `--window-size=${width},${height}`, `--screenshot=${resolve(`docs/images/${name}.png`)}`, `file://${source}`], { stdio: 'ignore' });
};

mkdirSync('preview', { recursive: true });
shoot('palette', paletteHtml, 1480, 900);
const lines = showcase.map(([file]) => readFileSync(`${directory}/${file}`, 'utf8').trimEnd().split('\n').length);
const rowHeight = (first: number, second: number) => 76 + Math.ceil(Math.max(first, second) * 13 * 1.55);
shoot('preview', showcaseHtml, 1600, 80 + 24 + rowHeight(lines[0], lines[1]) + rowHeight(lines[2], lines[3]));
