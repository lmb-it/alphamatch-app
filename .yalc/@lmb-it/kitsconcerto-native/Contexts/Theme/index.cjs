'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
var KitsThemeProvider_native = require('./KitsThemeProvider.cjs');
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
require('../../packages/types/src/Css/map/index.cjs');

const ThemeContext = React.createContext({});
const ThemeContextProvider = ({ children, theme }) => {
  const systemScheme = reactNative.useColorScheme();
  const [selectedTheme, setTheme] = React.useState(systemScheme ?? "light");
  const [colorMode, setColorMode] = React.useState();
  React.useEffect(() => {
    theme && setTheme(theme);
  }, [theme]);
  const switchTheme = (themeFile) => {
    const newTheme = selectedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (setColorMode) setColorMode(newTheme);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(ThemeContext.Provider, { value: { switchTheme, theme: selectedTheme }, children });
};
const useTheme = () => React.useContext(ThemeContext);

exports.KitsThemeProvider = KitsThemeProvider_native.KitsThemeProvider;
exports.useKitsTheme = KitsThemeProvider_native.useKitsTheme;
exports.useNativeColorMap = KitsThemeProvider_native.useNativeColorMap;
exports.default = ThemeContextProvider;
exports.useTheme = useTheme;
//# sourceMappingURL=index.cjs.map
