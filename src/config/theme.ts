/**
 * AlphaMatch brand theme — extends KitsConcerto defaults
 */
import {extendTheme} from '@lmb/kitsconcerto';

export const alphaMatchTheme = extendTheme({
  colors: {
    brand: {
      50: '#E0F2F1',
      100: '#B2DFDB',
      200: '#80CBC4',
      300: '#4DB6AC',
      400: '#26A69A',
      500: '#00ACC1', // Approximate primary from button
      600: '#0097A7',
      700: '#00838F',
      800: '#006064',
      900: '#004D40',
    },
  },
  semanticTokens: {
    light: {
      primary: '#00ACC1',
      secondary: 'gray.600',
      'text-primary': '#111827', // Dark gray for high contrast text
      'text-subtle': '#6B7280',
      'border-default': '#E5E7EB',
      text: '#111827',
      bg: '#FFFFFF',
      border: 'gray.200',
    },
    dark: {
      primary: 'brand.400',
      secondary: 'gray.400',
      'text-primary': 'gray.50',
      'text-subtle': 'gray.400',
      'border-default': 'gray.700',
      text: 'gray.50',
      bg: 'gray.900',
      border: 'gray.700',
    },
  },
  fonts: {
    heading: 'System', // Often standard System/Roboto/SF Pro on mobile Native
    body: 'System',
    mono: 'System',
  },
  components: {
    Button: {
      props: {
        rounded: true,
        size: 'md',
        severity: 'primary',
      },
      style: {
        borderRadius: 24, // Pill shape for main buttons
        fontWeight: 'bold', // Typically '700' or 'bold'
        paddingHorizontal: 24,
        paddingVertical: 14,
      },
    },
    Input: {
      props: {
        inputSize: 'md',
      },
      style: {
        borderRadius: 20, // Rounded inputs
        borderWidth: 1,
        borderColor: '#E5E7EB', // Approx gray.200
        paddingHorizontal: 16, 
        paddingVertical: 12, 
        backgroundColor: '#FCFCFD', // slightly off-white bg or white depending on mode
      },
    },
    Card: {
      props: {
        variant: 'elevated',
      },
      style: {
        borderRadius: 16, 
        padding: 16, 
        backgroundColor: 'bg',
        borderWidth: 1,
        borderColor: '#F3F4F6', // Lighter border
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
});
