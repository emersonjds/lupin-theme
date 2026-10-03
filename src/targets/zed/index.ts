import { captures } from './syntax';
import { style } from './style';

export const zedTheme = {
  $schema: 'https://zed.dev/schema/themes/v0.2.0.json',
  name: 'Lupin Theme',
  author: 'Emerson Silva',
  themes: [{ name: 'Lupin Theme', appearance: 'dark', style: { ...style, syntax: captures } }],
};
