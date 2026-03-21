'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
var defaultTheme = require('../../packages/types/src/Theme/defaultTheme.cjs');
var extendTheme = require('../../packages/types/src/Theme/extendTheme.cjs');
var resolvers = require('../../packages/types/src/Theme/resolvers.cjs');
var reactNative = require('react-native');
var resolvers_native = require('./resolvers.cjs');
require('../../apps/mobile/src/ui/accordion/index.cjs');
require('../../apps/mobile/src/ui/actionsheet/index.cjs');
require('../../apps/mobile/src/ui/alert/index.cjs');
require('../../apps/mobile/src/ui/alert-dialog/index.cjs');
require('../../apps/mobile/src/ui/avatar/index.cjs');
require('../../apps/mobile/src/ui/badge/index.cjs');
require('../../apps/mobile/src/ui/bottomsheet/index.cjs');
require('../../apps/mobile/src/ui/box/index.cjs');
require('../../apps/mobile/src/ui/button/index.cjs');
require('../../apps/mobile/src/ui/card/index.cjs');
require('../../apps/mobile/src/ui/center/index.cjs');
require('../../apps/mobile/src/ui/checkbox/index.cjs');
require('../../apps/mobile/src/ui/divider/index.cjs');
require('../../apps/mobile/src/ui/drawer/index.cjs');
require('../../apps/mobile/src/ui/fab/index.cjs');
require('../../apps/mobile/src/ui/form-control/index.cjs');
require('../../apps/mobile/src/ui/gluestack-ui-provider/config.cjs');
require('@gluestack-ui/core/overlay/creator');
require('@gluestack-ui/core/toast/creator');
require('nativewind');
require('../../apps/mobile/src/ui/grid/index.cjs');
require('../../apps/mobile/src/ui/heading/index.cjs');
require('../../apps/mobile/src/ui/hstack/index.cjs');
require('../../apps/mobile/src/ui/icon/index.cjs');
require('../../apps/mobile/src/ui/image/index.cjs');
require('../../apps/mobile/src/ui/image-background/index.cjs');
require('../../apps/mobile/src/ui/input/index.cjs');
require('../../apps/mobile/src/ui/link/index.cjs');
require('../../apps/mobile/src/ui/menu/index.cjs');
require('../../apps/mobile/src/ui/modal/index.cjs');
require('../../apps/mobile/src/ui/popover/index.cjs');
require('../../apps/mobile/src/ui/portal/index.cjs');
require('../../apps/mobile/src/ui/pressable/index.cjs');
require('../../apps/mobile/src/ui/progress/index.cjs');
require('../../apps/mobile/src/ui/radio/index.cjs');
require('react-native-safe-area-context');
require('../../apps/mobile/src/ui/select/index.cjs');
require('../../apps/mobile/src/ui/skeleton/index.cjs');
require('../../apps/mobile/src/ui/slider/index.cjs');
require('../../apps/mobile/src/ui/spinner/index.cjs');
require('../../apps/mobile/src/ui/switch/index.cjs');
require('../../apps/mobile/src/ui/table/index.cjs');
require('../../apps/mobile/src/ui/text/index.cjs');
require('../../apps/mobile/src/ui/textarea/index.cjs');
require('../../apps/mobile/src/ui/toast/index.cjs');
require('../../apps/mobile/src/ui/tooltip/index.cjs');
require('../../apps/mobile/src/ui/vstack/index.cjs');
require('react-native-reanimated');
var style = require('../../apps/mobile/src/Factory/helpers/style.cjs');
require('../../apps/mobile/src/Factory/DimensionsContext.cjs');
require('i18next');
require('react-i18next');
require('../../apps/mobile/src/Core/AutoComplete/index.cjs');
require('../../apps/mobile/src/Core/Dropdown/index.cjs');
require('../../apps/mobile/src/Core/MultiSelect/index.cjs');
require('../../apps/mobile/src/Core/Trees/components/CoreTree.cjs');
require('../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.cjs');
require('../../apps/mobile/src/Core/Trees/components/CoreToolbar.cjs');
require('../../apps/mobile/src/Core/Paginator/index.cjs');
require('lucide-react-native');
require('../../apps/mobile/src/Core/SelectButton/index.cjs');
require('../../apps/mobile/src/Core/DataTable/DataTable.cjs');
require('../../apps/mobile/src/Core/Tag/index.cjs');
require('../../apps/mobile/src/Core/Badge/index.cjs');
require('../../apps/mobile/src/Core/ProgressBar/index.cjs');
require('../../apps/mobile/src/Core/Checkbox/index.cjs');
require('../../apps/mobile/src/Core/RadioButton/index.cjs');

const KitsThemeContext = React.createContext(null);
const NativeColorMapContext = React.createContext({});
function KitsThemeProvider({ theme: themeOverride, children }) {
  const mergedTheme = React.useMemo(
    () => themeOverride ? extendTheme.deepMerge(defaultTheme.defaultTheme, themeOverride) : defaultTheme.defaultTheme,
    [themeOverride]
  );
  const systemScheme = reactNative.useColorScheme();
  const [colorMode, setColorMode] = React.useState(mergedTheme.config.initialColorMode);
  const manualOverrideRef = React.useRef(false);
  const toggleColorMode = React.useCallback(() => {
    manualOverrideRef.current = true;
    setColorMode((m) => m === "light" ? "dark" : "light");
  }, []);
  const setColorModeManual = React.useCallback((mode) => {
    manualOverrideRef.current = true;
    setColorMode(mode);
  }, []);
  React.useEffect(() => {
    if (mergedTheme.config.useSystemColorMode && systemScheme && !manualOverrideRef.current) {
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
    () => ({ theme: mergedTheme, colorMode, toggleColorMode, setColorMode: setColorModeManual, resolveToken }),
    [mergedTheme, colorMode, toggleColorMode, setColorModeManual, resolveToken]
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
