import { readdirSync } from 'node:fs';
import { bundledLanguages, createHighlighter, type BundledLanguage, type ThemeRegistration } from 'shiki';
import { vscodeTheme } from '../src/targets/vscode';

export const directory = 'tests/fixtures/languages';

const isLanguage = (name: string): name is BundledLanguage => Object.hasOwn(bundledLanguages, name);

const toLanguage = (file: string): BundledLanguage => {
  const name = file.split('.')[0];
  if (!isLanguage(name)) throw new Error(`No Shiki grammar named "${name}" for fixture ${file}`);
  return name;
};

export const fixtures = readdirSync(directory).map((file) => ({ file, language: toLanguage(file) }));

export const theme: ThemeRegistration = { name: vscodeTheme.name, type: 'dark', colors: vscodeTheme.colors, tokenColors: vscodeTheme.tokenColors };

export const highlighter = await createHighlighter({ themes: [theme], langs: fixtures.map(({ language }) => language) });
