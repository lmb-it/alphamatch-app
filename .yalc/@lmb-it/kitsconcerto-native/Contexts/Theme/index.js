import { jsx } from 'react/jsx-runtime';
import { useState, useEffect, useContext, createContext } from 'react';
import { useColorScheme } from 'react-native';
export { KitsThemeProvider, useKitsTheme, useNativeColorMap } from './KitsThemeProvider.js';
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';

const ThemeContext = createContext({});
const ThemeContextProvider = ({ children, theme }) => {
  const systemScheme = useColorScheme();
  const [selectedTheme, setTheme] = useState(systemScheme ?? "light");
  const [colorMode, setColorMode] = useState();
  useEffect(() => {
    theme && setTheme(theme);
  }, [theme]);
  const switchTheme = (themeFile) => {
    const newTheme = selectedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (setColorMode) setColorMode(newTheme);
  };
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { switchTheme, theme: selectedTheme }, children });
};
const useTheme = () => useContext(ThemeContext);

export { ThemeContextProvider as default, useTheme };
//# sourceMappingURL=index.js.map
