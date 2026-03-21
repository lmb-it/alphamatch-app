import { useMemo } from 'react';
import { useKitsTheme } from '../contexts/Theme/KitsThemeProvider.js';

function useSeverityColors(severity) {
  const { theme, resolveToken, colorMode } = useKitsTheme();
  return useMemo(() => {
    const slots = theme.severity?.[severity] ?? theme.severity?.secondary;
    if (!slots) {
      const fallback = resolveToken("gray.500");
      return { solid: fallback, bgTint: fallback, iconFg: fallback, iconBg: fallback, text: fallback, border: fallback };
    }
    if (severity === "brand") {
      const primary = resolveToken("primary");
      if (colorMode === "dark") {
        const swapShade = (token, target) => resolveToken(token.replace(/\.\d+$/, `.${target}`));
        return {
          solid: primary,
          bgTint: swapShade(slots.solid, "900"),
          iconFg: primary,
          iconBg: swapShade(slots.solid, "800"),
          text: swapShade(slots.solid, "200"),
          border: primary
        };
      }
      return {
        solid: primary,
        bgTint: resolveToken(slots.bgTint),
        iconFg: primary,
        iconBg: resolveToken(slots.iconBg),
        text: resolveToken(slots.text),
        border: primary
      };
    }
    if (colorMode === "dark") {
      const swapShade = (token, target) => {
        return resolveToken(token.replace(/\.\d+$/, `.${target}`));
      };
      return {
        solid: resolveToken(slots.solid),
        bgTint: swapShade(slots.solid, "900"),
        iconFg: swapShade(slots.solid, "300"),
        iconBg: swapShade(slots.solid, "800"),
        text: swapShade(slots.solid, "200"),
        border: resolveToken(slots.border)
      };
    }
    return {
      solid: resolveToken(slots.solid),
      bgTint: resolveToken(slots.bgTint),
      iconFg: resolveToken(slots.iconFg),
      iconBg: resolveToken(slots.iconBg),
      text: resolveToken(slots.text),
      border: resolveToken(slots.border)
    };
  }, [theme.severity, severity, resolveToken, colorMode]);
}
function useAllSeverityColors() {
  const { theme, resolveToken, colorMode } = useKitsTheme();
  return useMemo(() => {
    const severities = ["success", "info", "warning", "danger", "help", "secondary", "brand"];
    const result = {};
    const primary = resolveToken("primary");
    for (const key of severities) {
      const slots = theme.severity?.[key];
      if (!slots) continue;
      const isBrand = key === "brand";
      if (colorMode === "dark") {
        const swapShade = (token, target) => {
          return resolveToken(token.replace(/\.\d+$/, `.${target}`));
        };
        result[key] = {
          solid: isBrand ? primary : resolveToken(slots.solid),
          bgTint: swapShade(slots.solid, "900"),
          iconFg: isBrand ? primary : swapShade(slots.solid, "300"),
          iconBg: swapShade(slots.solid, "800"),
          text: swapShade(slots.solid, "200"),
          border: isBrand ? primary : resolveToken(slots.border)
        };
      } else {
        result[key] = {
          solid: isBrand ? primary : resolveToken(slots.solid),
          bgTint: resolveToken(slots.bgTint),
          iconFg: isBrand ? primary : resolveToken(slots.iconFg),
          iconBg: resolveToken(slots.iconBg),
          text: resolveToken(slots.text),
          border: isBrand ? primary : resolveToken(slots.border)
        };
      }
    }
    return result;
  }, [theme.severity, resolveToken, colorMode]);
}

export { useAllSeverityColors, useSeverityColors };
//# sourceMappingURL=useSeverityColors.js.map
