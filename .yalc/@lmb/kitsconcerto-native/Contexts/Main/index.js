import { jsx } from 'react/jsx-runtime';
import { useRef, createContext } from 'react';
import PopupProvider from '../DialogContext.js';
import PermissionsProvider from '../PermissionsContext.js';
import LocaleContextProvider from '../Locale/index.js';
import ThemeContextProvider from '../Theme/index.js';
import { useWindowDimensions } from 'react-native';
import { GluestackUIProvider } from '../../apps/mobile/src/ui/gluestack-ui-provider/index.js';
import { DimensionsProvider } from '../../apps/mobile/src/Factory/DimensionsContext.js';
import { KitsThemeProvider } from '../Theme/KitsThemeProvider.js';

const MainContext = createContext({});
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
  const { width, height } = useWindowDimensions();
  const mq = {
    isSmall: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    isLandscape: width > height,
    isPortrait: height >= width
  };
  const headerRef = useRef(null);
  const appendToHeader = (element) => {
    if (headerRef.current?.appendToHeader) headerRef.current.appendToHeader(element);
  };
  const authLayout = !children && nonAuthRoutes?.length && !authedRoutes?.length;
  const adminLayout = !children && authedRoutes?.length && !nonAuthRoutes?.length;
  return /* @__PURE__ */ jsx(MainContext.Provider, { value: { logo, onLogOut, appendToHeader, menuItems, mq }, children: /* @__PURE__ */ jsx(GluestackUIProvider, { mode: theme, children: /* @__PURE__ */ jsx(DimensionsProvider, { children: /* @__PURE__ */ jsx(KitsThemeProvider, { theme: kitsTheme, children: /* @__PURE__ */ jsx(ThemeContextProvider, { theme, children: /* @__PURE__ */ jsx(
    LocaleContextProvider,
    {
      defaultLanguage,
      languages,
      onChangeLanguage,
      children: /* @__PURE__ */ jsx(PopupProvider, { children: /* @__PURE__ */ jsx(PermissionsProvider, { roles: permissions, children: !authLayout && !adminLayout && children }) })
    }
  ) }) }) }) }) });
}

export { MainContext, MainContextProvider as default };
//# sourceMappingURL=index.js.map
