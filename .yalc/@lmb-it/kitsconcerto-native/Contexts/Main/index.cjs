'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var DialogContext = require('../DialogContext.cjs');
var PermissionsContext = require('../PermissionsContext.cjs');
var index_native$1 = require('../Locale/index.cjs');
var index_native = require('../Theme/index.cjs');
var reactNative = require('react-native');
var index = require('../../apps/mobile/src/ui/gluestack-ui-provider/index.cjs');
var DimensionsContext = require('../../apps/mobile/src/Factory/DimensionsContext.cjs');
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
