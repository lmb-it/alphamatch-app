'use strict';

var defaultSeverityTheme = require('./defaultSeverityTheme.cjs');

const defaultTheme = {
  colors: {
    blue: {
      50: "#EFF6FF",
      100: "#DBEAFE",
      200: "#BFDBFE",
      300: "#93C5FD",
      400: "#60A5FA",
      500: "#3B82F6",
      600: "#2563EB",
      700: "#1D4ED8",
      800: "#1E40AF",
      900: "#1E3A8A"
    },
    green: {
      50: "#F0FDF4",
      100: "#DCFCE7",
      200: "#BBF7D0",
      300: "#86EFAC",
      400: "#4ADE80",
      500: "#22C55E",
      600: "#16A34A",
      700: "#15803D",
      800: "#166534",
      900: "#14532D"
    },
    red: {
      50: "#FEF2F2",
      100: "#FEE2E2",
      200: "#FECACA",
      300: "#FCA5A5",
      400: "#F87171",
      500: "#EF4444",
      600: "#DC2626",
      700: "#B91C1C",
      800: "#991B1B",
      900: "#7F1D1D"
    },
    yellow: {
      50: "#FEFCE8",
      100: "#FEF9C3",
      200: "#FEF08A",
      300: "#FDE047",
      400: "#FACC15",
      500: "#EAB308",
      600: "#CA8A04",
      700: "#A16207",
      800: "#854D0E",
      900: "#713F12"
    },
    orange: {
      50: "#FFF7ED",
      100: "#FFEDD5",
      200: "#FED7AA",
      300: "#FDBA74",
      400: "#FB923C",
      500: "#F97316",
      600: "#EA580C",
      700: "#C2410C",
      800: "#9A3412",
      900: "#7C2D12"
    },
    purple: {
      50: "#FAF5FF",
      100: "#F3E8FF",
      200: "#E9D5FF",
      300: "#D8B4FE",
      400: "#C084FC",
      500: "#8B5CF6",
      600: "#7C3AED",
      700: "#6D28D9",
      800: "#5B21B6",
      900: "#4C1D95"
    },
    teal: {
      50: "#F0FDFA",
      100: "#CCFBF1",
      200: "#99F6E4",
      300: "#5EEAD4",
      400: "#2DD4BF",
      500: "#14B8A6",
      600: "#0D9488",
      700: "#0F766E",
      800: "#115E59",
      900: "#134E4A"
    },
    cyan: {
      50: "#ECFEFF",
      100: "#CFFAFE",
      200: "#A5F3FC",
      300: "#67E8F9",
      400: "#22D3EE",
      500: "#06B6D4",
      600: "#0891B2",
      700: "#0E7490",
      800: "#155E75",
      900: "#164E63"
    },
    pink: {
      50: "#FDF2F8",
      100: "#FCE7F3",
      200: "#FBCFE8",
      300: "#F9A8D4",
      400: "#F472B6",
      500: "#EC4899",
      600: "#DB2777",
      700: "#BE185D",
      800: "#9D174D",
      900: "#831843"
    },
    gray: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827"
    },
    indigo: {
      50: "#EEF2FF",
      100: "#E0E7FF",
      200: "#C7D2FE",
      300: "#A5B4FC",
      400: "#818CF8",
      500: "#6366F1",
      600: "#4F46E5",
      700: "#4338CA",
      800: "#3730A3",
      900: "#312E81"
    }
  },
  semanticTokens: {
    light: {
      primary: "#20aab0",
      secondary: "gray.600",
      success: "green.500",
      danger: "red.500",
      warning: "yellow.500",
      info: "blue.400",
      text: "gray.900",
      "text-secondary": "gray.500",
      bg: "#FFFFFF",
      "bg-subtle": "gray.50",
      border: "gray.200",
      "surface-ground": "gray.50",
      "surface-card": "#FFFFFF",
      "surface-overlay": "gray.300",
      "surface-hover": "gray.100"
    },
    dark: {
      primary: "teal.400",
      secondary: "gray.400",
      success: "green.400",
      danger: "red.400",
      warning: "yellow.400",
      info: "blue.300",
      text: "gray.50",
      "text-secondary": "gray.400",
      bg: "gray.900",
      "bg-subtle": "gray.800",
      border: "gray.700",
      "surface-ground": "gray.900",
      "surface-card": "gray.800",
      "surface-overlay": "gray.700",
      "surface-hover": "gray.700"
    }
  },
  spacing: {
    "0": "0",
    "0.5": "0.125rem",
    "1": "0.25rem",
    "1.5": "0.375rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "8": "2rem",
    "10": "2.5rem",
    "12": "3rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem"
  },
  radii: {
    none: "0",
    sm: "0.125rem",
    base: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px"
  },
  shadows: {
    none: "none",
    sm: "0 1px 2px 0 rgba(0,0,0,0.05)",
    base: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
    md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
    lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
    xl: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
    "2xl": "0 25px 50px -12px rgba(0,0,0,0.25)",
    inner: "inset 0 2px 4px 0 rgba(0,0,0,0.05)"
  },
  fonts: {
    heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace'
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem"
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2
  },
  severity: defaultSeverityTheme.defaultSeverityTheme,
  components: {},
  config: {
    initialColorMode: "light",
    useSystemColorMode: false
  }
};

exports.defaultTheme = defaultTheme;
//# sourceMappingURL=defaultTheme.cjs.map
