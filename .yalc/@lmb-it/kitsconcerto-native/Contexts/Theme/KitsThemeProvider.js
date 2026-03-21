import { jsx } from 'react/jsx-runtime';
import { useContext, useMemo, useState, useRef, useCallback, useEffect, createContext } from 'react';
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
import { defaultTheme } from '../../packages/types/src/Theme/defaultTheme.js';
import { deepMerge } from '../../packages/types/src/Theme/extendTheme.js';
import { resolveTokenValue } from '../../packages/types/src/Theme/resolvers.js';
import { useColorScheme } from 'react-native';
import { buildNativeColorMap } from './resolvers.js';
import '../../apps/mobile/src/ui/accordion/index.js';
import '../../apps/mobile/src/ui/actionsheet/index.js';
import '../../apps/mobile/src/ui/alert/index.js';
import '../../apps/mobile/src/ui/alert-dialog/index.js';
import '../../apps/mobile/src/ui/avatar/index.js';
import '../../apps/mobile/src/ui/badge/index.js';
import '../../apps/mobile/src/ui/bottomsheet/index.js';
import '../../apps/mobile/src/ui/box/index.js';
import '../../apps/mobile/src/ui/button/index.js';
import '../../apps/mobile/src/ui/card/index.js';
import '../../apps/mobile/src/ui/center/index.js';
import '../../apps/mobile/src/ui/checkbox/index.js';
import '../../apps/mobile/src/ui/divider/index.js';
import '../../apps/mobile/src/ui/drawer/index.js';
import '../../apps/mobile/src/ui/fab/index.js';
import '../../apps/mobile/src/ui/form-control/index.js';
import '../../apps/mobile/src/ui/gluestack-ui-provider/config.js';
import '@gluestack-ui/core/overlay/creator';
import '@gluestack-ui/core/toast/creator';
import 'nativewind';
import '../../apps/mobile/src/ui/grid/index.js';
import '../../apps/mobile/src/ui/heading/index.js';
import '../../apps/mobile/src/ui/hstack/index.js';
import '../../apps/mobile/src/ui/icon/index.js';
import '../../apps/mobile/src/ui/image/index.js';
import '../../apps/mobile/src/ui/image-background/index.js';
import '../../apps/mobile/src/ui/input/index.js';
import '../../apps/mobile/src/ui/link/index.js';
import '../../apps/mobile/src/ui/menu/index.js';
import '../../apps/mobile/src/ui/modal/index.js';
import '../../apps/mobile/src/ui/popover/index.js';
import '../../apps/mobile/src/ui/portal/index.js';
import '../../apps/mobile/src/ui/pressable/index.js';
import '../../apps/mobile/src/ui/progress/index.js';
import '../../apps/mobile/src/ui/radio/index.js';
import 'react-native-safe-area-context';
import '../../apps/mobile/src/ui/select/index.js';
import '../../apps/mobile/src/ui/skeleton/index.js';
import '../../apps/mobile/src/ui/slider/index.js';
import '../../apps/mobile/src/ui/spinner/index.js';
import '../../apps/mobile/src/ui/switch/index.js';
import '../../apps/mobile/src/ui/table/index.js';
import '../../apps/mobile/src/ui/text/index.js';
import '../../apps/mobile/src/ui/textarea/index.js';
import '../../apps/mobile/src/ui/toast/index.js';
import '../../apps/mobile/src/ui/tooltip/index.js';
import '../../apps/mobile/src/ui/vstack/index.js';
import 'react-native-reanimated';
import { setActiveColorMap } from '../../apps/mobile/src/Factory/helpers/style.js';
import '../../apps/mobile/src/Factory/DimensionsContext.js';
import 'i18next';
import 'react-i18next';
import '../../apps/mobile/src/Core/AutoComplete/index.js';
import '../../apps/mobile/src/Core/Dropdown/index.js';
import '../../apps/mobile/src/Core/MultiSelect/index.js';
import '../../apps/mobile/src/Core/Trees/components/CoreTree.js';
import '../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.js';
import '../../apps/mobile/src/Core/Trees/components/CoreToolbar.js';
import '../../apps/mobile/src/Core/Paginator/index.js';
import 'lucide-react-native';
import '../../apps/mobile/src/Core/SelectButton/index.js';
import '../../apps/mobile/src/Core/DataTable/DataTable.js';
import '../../apps/mobile/src/Core/Tag/index.js';
import '../../apps/mobile/src/Core/Badge/index.js';
import '../../apps/mobile/src/Core/ProgressBar/index.js';
import '../../apps/mobile/src/Core/Checkbox/index.js';
import '../../apps/mobile/src/Core/RadioButton/index.js';

const KitsThemeContext = createContext(null);
const NativeColorMapContext = createContext({});
function KitsThemeProvider({ theme: themeOverride, children }) {
  const mergedTheme = useMemo(
    () => themeOverride ? deepMerge(defaultTheme, themeOverride) : defaultTheme,
    [themeOverride]
  );
  const systemScheme = useColorScheme();
  const [colorMode, setColorMode] = useState(mergedTheme.config.initialColorMode);
  const manualOverrideRef = useRef(false);
  const toggleColorMode = useCallback(() => {
    manualOverrideRef.current = true;
    setColorMode((m) => m === "light" ? "dark" : "light");
  }, []);
  const setColorModeManual = useCallback((mode) => {
    manualOverrideRef.current = true;
    setColorMode(mode);
  }, []);
  useEffect(() => {
    if (mergedTheme.config.useSystemColorMode && systemScheme && !manualOverrideRef.current) {
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
    () => ({ theme: mergedTheme, colorMode, toggleColorMode, setColorMode: setColorModeManual, resolveToken }),
    [mergedTheme, colorMode, toggleColorMode, setColorModeManual, resolveToken]
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
