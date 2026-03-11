import { useMemo } from 'react';
import { useKitsTheme } from '../Contexts/Theme/KitsThemeProvider.js';

function useKitsColorScheme(colorScheme, variant) {
  const { resolveToken, colorMode } = useKitsTheme();
  return useMemo(() => {
    if (!colorScheme) return {};
    const isDark = colorMode === "dark";
    const baseShade = isDark ? "200" : "500";
    const subtleBg = isDark ? "800" : "100";
    const subtleText = isDark ? "200" : "700";
    switch (variant) {
      case "subtle":
      case "ghost":
        return {
          bgColor: resolveToken(`${colorScheme}.${subtleBg}`),
          fontColor: resolveToken(`${colorScheme}.${subtleText}`)
        };
      case "outline":
        return {
          borderColor: resolveToken(`${colorScheme}.${baseShade}`),
          fontColor: resolveToken(`${colorScheme}.${baseShade}`),
          borderWidth: "1px",
          borderStyle: "solid"
        };
      default:
        return {
          bgColor: resolveToken(`${colorScheme}.${baseShade}`),
          fontColor: "#FFFFFF"
        };
    }
  }, [colorScheme, variant, resolveToken, colorMode]);
}

export { useKitsColorScheme as default };
//# sourceMappingURL=useColorScheme.js.map
