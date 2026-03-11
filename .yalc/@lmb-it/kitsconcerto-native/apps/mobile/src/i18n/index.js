import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

async function initMobileI18n(resources) {
  await i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    resources
  });
  return i18n;
}

export { initMobileI18n };
//# sourceMappingURL=index.js.map
