/**
 * AlphaMatch brand theme — extends KitsConcerto defaults
 */
import {extendTheme} from '@lmb/kitsconcerto';

export const alphaMatchTheme = extendTheme({
  colors: {
    brand: {
      50: '#E6F7F8',
      100: '#B3E8EB',
      200: '#80D9DE',
      300: '#4DCAD1',
      400: '#26BEC6',
      500: '#20AAB0', // Primary brand
      600: '#1A8E93',
      700: '#136B6F',
      800: '#0D494B',
      900: '#062627',
    },
  },
  semanticTokens: {
    light: {
      primary: '#20AAB0',
      secondary: 'gray.600',
    },
    dark: {
      primary: 'brand.400',
      secondary: 'gray.400',
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
});
