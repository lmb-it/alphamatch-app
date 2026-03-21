'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
require('react');
var locale = require('../../hooks/locale.cjs');
require('../../contexts/DialogContext.cjs');

const Translate = ({ label, children }) => {
  const { t } = locale.useLanguage();
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: label ? t(label) : typeof children == "string" ? t(children) : children });
};

exports.default = Translate;
//# sourceMappingURL=index.cjs.map
