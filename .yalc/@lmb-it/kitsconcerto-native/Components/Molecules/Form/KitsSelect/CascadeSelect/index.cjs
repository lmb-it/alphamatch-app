'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
require('react');
require('axios');
require('../../../../../Contexts/DialogContext.cjs');
var useComponentDefaults = require('../../../../../Hooks/useComponentDefaults.cjs');
require('../../../../../Hooks/useKeyboardNavigation.cjs');
require('../SelectContext.cjs');
require('../../../UI/Flex/index.cjs');
var index_native = require('../../../UI/Text/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

const KitsCascadeSelect = (rawProps = {}) => {
  const { mergedProps: props, themeStyle } = useComponentDefaults.default("CascadeSelect", rawProps, "Select");
  return /* @__PURE__ */ jsxRuntime.jsx(index_native.default, { children: "CascadeSelect is not yet available on native." });
};

exports.default = KitsCascadeSelect;
//# sourceMappingURL=index.cjs.map
