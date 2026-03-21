'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var AsyncStorage = require('@react-native-async-storage/async-storage');
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
require('react-native');
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
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
require('../../apps/mobile/src/Factory/DimensionsContext.cjs');
var index = require('../../apps/mobile/src/i18n/index.cjs');
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
var index$1 = require('../../locale/index.cjs');
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
  const [isReady, setIsReady] = React.useState(false);
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
      setIsReady(true);
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
      children: isReady ? children : null
    }
  );
};

exports.LocaleContext = LocaleContext;
exports.default = LocaleContextProvider;
//# sourceMappingURL=index.cjs.map
