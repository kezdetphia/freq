import { config } from '@tamagui/config/v3';
import { createTamagui } from 'tamagui';

const customConfig = createTamagui({
  ...config,
  themes: {
    ...config.themes,
    light: {
      ...config.themes.light,
      background: '#BFD7EA', // soft bluish
      color: '#1B1B2F',
      accent: '#A78BFA', // lavender accent
    },
    dark: {
      ...config.themes.dark,
      background: '#1E1B3E', // deep purple/navy
      color: '#E6E6FA',
      accent: '#7DD3FC', // light teal accent
    },
  },
});

export const tamaguiConfig = customConfig;
export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
