'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
require('../../packages/types/src/Css/map/index.cjs');
var defaultTheme = require('../../packages/types/src/Theme/defaultTheme.cjs');
var extendTheme = require('../../packages/types/src/Theme/extendTheme.cjs');
var resolvers = require('../../packages/types/src/Theme/resolvers.cjs');
var reactNative = require('react-native');
var resolvers_native = require('./resolvers.cjs');
var style = require('../../apps/mobile/src/Factory/helpers/style.cjs');

const KitsThemeContext = React.createContext(null);
const NativeColorMapContext = React.createContext({});
function KitsThemeProvider({ theme: themeOverride, children }) {
  const mergedTheme = React.useMemo(
    () => themeOverride ? extendTheme.deepMerge(defaultTheme.defaultTheme, themeOverride) : defaultTheme.defaultTheme,
    [themeOverride]
  );
  const systemScheme = reactNative.useColorScheme();
  const [colorMode, setColorMode] = React.useState(mergedTheme.config.initialColorMode);
  const toggleColorMode = React.useCallback(
    () => setColorMode((m) => m === "light" ? "dark" : "light"),
    []
  );
  React.useEffect(() => {
    if (mergedTheme.config.useSystemColorMode && systemScheme) {
      setColorMode(systemScheme);
    }
  }, [systemScheme, mergedTheme.config.useSystemColorMode]);
  const resolvedColorMap = React.useMemo(
    () => resolvers_native.buildNativeColorMap(mergedTheme, colorMode),
    [mergedTheme, colorMode]
  );
  style.setActiveColorMap(resolvedColorMap);
  const resolveToken = React.useCallback(
    (token) => resolvers.resolveTokenValue(mergedTheme, colorMode, token, "native"),
    [mergedTheme, colorMode]
  );
  const value = React.useMemo(
    () => ({ theme: mergedTheme, colorMode, toggleColorMode, setColorMode, resolveToken }),
    [mergedTheme, colorMode, toggleColorMode, resolveToken]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(KitsThemeContext.Provider, { value, children: /* @__PURE__ */ jsxRuntime.jsx(NativeColorMapContext.Provider, { value: resolvedColorMap, children }) });
}
function useKitsTheme() {
  const ctx = React.useContext(KitsThemeContext);
  if (!ctx) {
    return {
      theme: defaultTheme.defaultTheme,
      colorMode: "light",
      toggleColorMode: () => {
      },
      setColorMode: () => {
      },
      resolveToken: (token) => resolvers.resolveTokenValue(defaultTheme.defaultTheme, "light", token, "native")
    };
  }
  return ctx;
}
function useNativeColorMap() {
  return React.useContext(NativeColorMapContext);
}

exports.KitsThemeContext = KitsThemeContext;
exports.KitsThemeProvider = KitsThemeProvider;
exports.NativeColorMapContext = NativeColorMapContext;
exports.useKitsTheme = useKitsTheme;
exports.useNativeColorMap = useNativeColorMap;
//# sourceMappingURL=KitsThemeProvider.cjs.map
