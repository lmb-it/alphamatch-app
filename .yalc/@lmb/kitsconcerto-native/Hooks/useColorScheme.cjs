'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var KitsThemeProvider_native = require('../Contexts/Theme/KitsThemeProvider.cjs');

function useKitsColorScheme(colorScheme, variant) {
  const { resolveToken, colorMode } = KitsThemeProvider_native.useKitsTheme();
  return React.useMemo(() => {
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

exports.default = useKitsColorScheme;
//# sourceMappingURL=useColorScheme.cjs.map
