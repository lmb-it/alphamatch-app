'use strict';

var i18n = require('i18next');
var reactI18next = require('react-i18next');

async function initMobileI18n(resources) {
  await i18n.use(reactI18next.initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    resources
  });
  return i18n;
}

exports.initMobileI18n = initMobileI18n;
//# sourceMappingURL=index.cjs.map
