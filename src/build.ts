import { vscodeTheme } from './targets/vscode';
import { zedTheme } from './targets/zed';

export const outputs: Record<string, object> = {
  'extensions/vscode/themes/lupin-theme-color-theme.json': vscodeTheme,
  'extensions/zed/themes/lupin-theme.json': zedTheme,
};

export const render = (theme: object): string => `${JSON.stringify(theme, null, 2)}\n`;
