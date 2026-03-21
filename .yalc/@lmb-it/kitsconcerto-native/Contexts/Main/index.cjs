'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var DialogContext = require('../DialogContext.cjs');
var PermissionsContext = require('../PermissionsContext.cjs');
var index_native$1 = require('../Locale/index.cjs');
var index_native = require('../Theme/index.cjs');
var reactNative = require('react-native');
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
var index = require('../../apps/mobile/src/ui/gluestack-ui-provider/index.cjs');
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
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
var DimensionsContext = require('../../apps/mobile/src/Factory/DimensionsContext.cjs');
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
var KitsThemeProvider_native = require('../Theme/KitsThemeProvider.cjs');

const MainContext = React.createContext({});
function MainContextProvider({
  children,
  theme,
  kitsTheme,
  onLogOut,
  nonAuthRoutes,
  menuItems,
  permissions,
  logo,
  languages,
  defaultLanguage = "en",
  authedRoutes,
  onChangeLanguage
}) {
  const { width, height } = reactNative.useWindowDimensions();
  const mq = {
    isSmall: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    isLandscape: width > height,
    isPortrait: height >= width
  };
  const headerRef = React.useRef(null);
  const appendToHeader = (element) => {
    if (headerRef.current?.appendToHeader) headerRef.current.appendToHeader(element);
  };
  const authLayout = !children && nonAuthRoutes?.length && !authedRoutes?.length;
  const adminLayout = !children && authedRoutes?.length && !nonAuthRoutes?.length;
  return /* @__PURE__ */ jsxRuntime.jsx(MainContext.Provider, { value: { logo, onLogOut, appendToHeader, menuItems, mq }, children: /* @__PURE__ */ jsxRuntime.jsx(index.GluestackUIProvider, { mode: theme, children: /* @__PURE__ */ jsxRuntime.jsx(DimensionsContext.DimensionsProvider, { children: /* @__PURE__ */ jsxRuntime.jsx(KitsThemeProvider_native.KitsThemeProvider, { theme: kitsTheme, children: /* @__PURE__ */ jsxRuntime.jsx(index_native.default, { theme, children: /* @__PURE__ */ jsxRuntime.jsx(
    index_native$1.default,
    {
      defaultLanguage,
      languages,
      onChangeLanguage,
      children: /* @__PURE__ */ jsxRuntime.jsx(DialogContext.default, { children: /* @__PURE__ */ jsxRuntime.jsx(PermissionsContext.default, { roles: permissions, children: !authLayout && !adminLayout && children }) })
    }
  ) }) }) }) }) });
}

exports.MainContext = MainContext;
exports.default = MainContextProvider;
//# sourceMappingURL=index.cjs.map
