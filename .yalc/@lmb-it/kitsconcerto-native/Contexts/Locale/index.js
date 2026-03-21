import { jsx } from 'react/jsx-runtime';
import { createContext, useRef, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import 'react-native';
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
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
import '../../apps/mobile/src/Factory/DimensionsContext.js';
import { initMobileI18n } from '../../apps/mobile/src/i18n/index.js';
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
import localeFiles from '../../locale/index.js';
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
