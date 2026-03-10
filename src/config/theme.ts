/**
 * AlphaMatch brand theme — extends KitsConcerto defaults
 */
import {extendTheme} from '@lmb/kitsconcerto';

export const alphaMatchTheme = extendTheme({
  severity:{

  },
  colors: {
    primary: {
      50: '#E0F7F8',
      100: '#B2EBF2',
      200: '#80DEEA',
      300: '#4DD0E1',
      400: '#26C6DA',
      500: '#20AAB0',
      600: '#1B9399',
      700: '#157C82',
      800: '#10656B',
      900: '#0A4E54',
    },
    brand: {
      50: '#E0F7F8',
      100: '#B2EBF2',
      200: '#80DEEA',
      300: '#4DD0E1',
      400: '#26C6DA',
      500: '#20AAB0',
      600: '#1B9399',
      700: '#157C82',
      800: '#10656B',
      900: '#0A4E54',
    },
  },
  semanticTokens: {
    light: {
      primary: '#20AAB0',
      secondary: '#6B7280',
      danger: '#EF4444',
      'text-primary': '#111827',
      'text-subtle': '#6B7280',
      'text-muted': '#9CA3AF',
      'border-default': '#E5E7EB',
      divider: '#E5E7EB',
      text: '#111827',
      bg: '#FFFFFF',
      border: '#E5E7EB',
    },
    dark: {
      primary: '#20AAB0',
      secondary: '#9CA3AF',
      danger: '#F87171',
      'text-primary': '#F9FAFB',
      'text-subtle': '#9CA3AF',
      'text-muted': '#6B7280',
      'border-default': '#374151',
      divider: '#374151',
      text: '#F9FAFB',
      bg: '#111827',
      border: '#374151',
    },
  },
  fonts: {
    heading: 'System',
    body: 'System',
    mono: 'System',
  },
  components: {
    Button: {
      props: {
        rounded: true,
        size: 'lg',
        severity: 'primary',
      },
      style: {
        borderRadius: 28,
        fontWeight: '600',
        // paddingHorizontal: 24,
        height: 52,
        // minHeight: 52,
      },
    },
    Input: {
      props: {
        inputSize: 'lg',
      },
      style: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        paddingHorizontal: 16,
        height: 52,
        minHeight: 52,
        backgroundColor: '#F9FAFC',
        fontSize: 14,
        color: '#263238',
      },
    },
    FormContainer: {
      style: {
        gap: 8,
      },
    },
    Card: {
      props: {
        variant: 'elevated',
      },
      style: {
        borderRadius: 16,
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#F3F4F6',
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});
