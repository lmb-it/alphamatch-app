import { jsx } from 'react/jsx-runtime';
import { useContext, useMemo, useState, useCallback, useEffect, createContext } from 'react';
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
import '../../packages/types/src/Css/map/index.js';
import { defaultTheme } from '../../packages/types/src/Theme/defaultTheme.js';
import { deepMerge } from '../../packages/types/src/Theme/extendTheme.js';
import { resolveTokenValue } from '../../packages/types/src/Theme/resolvers.js';
import { useColorScheme } from 'react-native';
import { buildNativeColorMap } from './resolvers.js';
import { setActiveColorMap } from '../../apps/mobile/src/Factory/helpers/style.js';

const KitsThemeContext = createContext(null);
const NativeColorMapContext = createContext({});
function KitsThemeProvider({ theme: themeOverride, children }) {
  const mergedTheme = useMemo(
    () => themeOverride ? deepMerge(defaultTheme, themeOverride) : defaultTheme,
    [themeOverride]
  );
  const systemScheme = useColorScheme();
  const [colorMode, setColorMode] = useState(mergedTheme.config.initialColorMode);
  const toggleColorMode = useCallback(
    () => setColorMode((m) => m === "light" ? "dark" : "light"),
    []
  );
  useEffect(() => {
    if (mergedTheme.config.useSystemColorMode && systemScheme) {
      setColorMode(systemScheme);
    }
  }, [systemScheme, mergedTheme.config.useSystemColorMode]);
  const resolvedColorMap = useMemo(
    () => buildNativeColorMap(mergedTheme, colorMode),
    [mergedTheme, colorMode]
  );
  setActiveColorMap(resolvedColorMap);
  const resolveToken = useCallback(
    (token) => resolveTokenValue(mergedTheme, colorMode, token, "native"),
    [mergedTheme, colorMode]
  );
  const value = useMemo(
    () => ({ theme: mergedTheme, colorMode, toggleColorMode, setColorMode, resolveToken }),
    [mergedTheme, colorMode, toggleColorMode, resolveToken]
  );
  return /* @__PURE__ */ jsx(KitsThemeContext.Provider, { value, children: /* @__PURE__ */ jsx(NativeColorMapContext.Provider, { value: resolvedColorMap, children }) });
}
function useKitsTheme() {
  const ctx = useContext(KitsThemeContext);
  if (!ctx) {
    return {
      theme: defaultTheme,
      colorMode: "light",
      toggleColorMode: () => {
      },
      setColorMode: () => {
      },
      resolveToken: (token) => resolveTokenValue(defaultTheme, "light", token, "native")
    };
  }
  return ctx;
}
function useNativeColorMap() {
  return useContext(NativeColorMapContext);
}

export { KitsThemeContext, KitsThemeProvider, NativeColorMapContext, useKitsTheme, useNativeColorMap };
//# sourceMappingURL=KitsThemeProvider.js.map
