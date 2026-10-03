import { colors } from './colors';
import { semanticTokenColors } from './semantic-tokens';
import { tokenColors } from './token-colors';

export const vscodeTheme = {
  $schema: 'vscode://schemas/color-theme',
  name: 'Lupin Theme',
  type: 'dark',
  semanticHighlighting: true,
  colors,
  tokenColors,
  semanticTokenColors,
};
