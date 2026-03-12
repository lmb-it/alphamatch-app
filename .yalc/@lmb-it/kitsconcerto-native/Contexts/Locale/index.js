import { jsx } from 'react/jsx-runtime';
import { createContext, useRef, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initMobileI18n } from '../../apps/mobile/src/i18n/index.js';
import localeFiles from '../../Locale/index.js';
import i18n from 'i18next';

const LocaleContext = createContext(
  {}
);
const STORAGE_KEY = "currentLanguage";
const LocaleContextProvider = ({
  children,
  languages,
  defaultLanguage = "en",
  onChangeLanguage
}) => {
  const defaultLocal = useRef("");
  const [language, setLanguage] = useState(defaultLanguage);
  const [isRTL, setIsRTL] = useState(defaultLanguage === "ar");
  const [isReady, setIsReady] = useState(false);
  const translationsList = () => {
    const l = {};
    Object.keys(localeFiles).forEach((key) => {
      l[key] = { translation: localeFiles[key] };
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
  useEffect(() => {
    if (defaultLocal.current == defaultLanguage) return;
    const init = async () => {
      await initMobileI18n(translationsList());
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const lang = stored || defaultLanguage;
      await i18n.changeLanguage(lang);
      setLanguage(lang);
      setIsRTL(lang === "ar");
      defaultLocal.current = defaultLanguage;
      setIsReady(true);
    };
    void init();
  }, [defaultLanguage]);
  const isKeyExists = (key) => {
    return i18n.exists(key);
  };
  const changeLanguage = useCallback(
    async (newLang) => {
      setLanguage(newLang);
      setIsRTL(newLang === "ar");
      await i18n.changeLanguage(newLang);
      await AsyncStorage.setItem(STORAGE_KEY, newLang);
      onChangeLanguage?.(newLang);
    },
    [onChangeLanguage]
  );
  const t = useCallback(
    (key, ...params) => i18n.t(key, { replace: params }),
    []
  );
  return /* @__PURE__ */ jsx(
    LocaleContext.Provider,
    {
      value: {
        t,
        changeLanguage,
        currentLanguage: language,
        isRTL,
        isKeyExists
      },
      children: isReady ? children : null
    }
  );
};

export { LocaleContext, LocaleContextProvider as default };
//# sourceMappingURL=index.js.map
