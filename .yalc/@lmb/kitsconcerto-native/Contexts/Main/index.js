import { jsx } from 'react/jsx-runtime';
import { useRef, createContext } from 'react';
import PopupProvider from '../DialogContext.js';
import PermissionsProvider from '../PermissionsContext.js';
import LocaleContextProvider from '../Locale/index.js';
import ThemeContextProvider from '../Theme/index.js';
import { useWindowDimensions } from 'react-native';
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
import { GluestackUIProvider } from '../../apps/mobile/src/ui/gluestack-ui-provider/index.js';
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
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
import '../../packages/types/src/Css/map/index.js';
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
  return /* @__PURE__ */ jsx(MainContext.Provider, { value: { logo, onLogOut, appendToHeader, menuItems, mq }, children: /* @__PURE__ */ jsx(GluestackUIProvider, { mode: theme, children: /* @__PURE__ */ jsx(KitsThemeProvider, { theme: kitsTheme, children: /* @__PURE__ */ jsx(ThemeContextProvider, { theme, children: /* @__PURE__ */ jsx(
    LocaleContextProvider,
    {
      defaultLanguage,
      languages,
      onChangeLanguage,
      children: /* @__PURE__ */ jsx(PopupProvider, { children: /* @__PURE__ */ jsx(PermissionsProvider, { roles: permissions, children: !authLayout && !adminLayout && children }) })
    }
  ) }) }) }) });
}

export { MainContext, MainContextProvider as default };
//# sourceMappingURL=index.js.map
