'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var AsyncStorage = require('@react-native-async-storage/async-storage');
var index = require('../../apps/mobile/src/i18n/index.cjs');
var index$1 = require('../../Locale/index.cjs');
var i18n = require('i18next');

const LocaleContext = React.createContext(
  {}
);
const STORAGE_KEY = "currentLanguage";
const LocaleContextProvider = ({
  children,
  languages,
  defaultLanguage = "en",
  onChangeLanguage
}) => {
  const defaultLocal = React.useRef("");
  const [language, setLanguage] = React.useState(defaultLanguage);
  const [isRTL, setIsRTL] = React.useState(defaultLanguage === "ar");
  const translationsList = () => {
    const l = {};
    Object.keys(index$1.default).forEach((key) => {
      l[key] = { translation: index$1.default[key] };
    });
    if (languages) {
      languages.forEach(({ lang, translations }) => {
        if (lang in l) {
          l[lang] = {
            translation: {
              ...l[lang].translation,
              ...translations
            }
          };
        } else {
          l[lang] = {
            translation: {
              ...translations
            }
          };
        }
      });
    }
    return l;
  };
  React.useEffect(() => {
    if (defaultLocal.current == defaultLanguage) return;
    const init = async () => {
      await index.initMobileI18n(translationsList());
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const lang = stored || defaultLanguage;
      await i18n.changeLanguage(lang);
      setLanguage(lang);
      setIsRTL(lang === "ar");
      defaultLocal.current = defaultLanguage;
    };
    void init();
  }, [defaultLanguage]);
  const isKeyExists = (key) => {
    return i18n.exists(key);
  };
  const changeLanguage = React.useCallback(
    async (newLang) => {
      setLanguage(newLang);
      setIsRTL(newLang === "ar");
      await i18n.changeLanguage(newLang);
      await AsyncStorage.setItem(STORAGE_KEY, newLang);
      onChangeLanguage?.(newLang);
    },
    [onChangeLanguage]
  );
  const t = React.useCallback(
    (key, ...params) => i18n.t(key, { replace: params }),
    []
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    LocaleContext.Provider,
    {
      value: {
        t,
        changeLanguage,
        currentLanguage: language,
        isRTL,
        isKeyExists
      },
      children
    }
  );
};

exports.LocaleContext = LocaleContext;
exports.default = LocaleContextProvider;
//# sourceMappingURL=index.cjs.map
