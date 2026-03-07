'use strict';

var jsxRuntime = require('react/jsx-runtime');
var SelectContext = require('./SelectContext.cjs');

const KitsAutoComplete = (props) => {
  return /* @__PURE__ */ jsxRuntime.jsx(SelectContext.default, { shape: "autocomplete", ...props });
};
const KitsDropdown = (props) => {
  return /* @__PURE__ */ jsxRuntime.jsx(SelectContext.default, { shape: "dropdown", ...props });
};
const KitsMultiSelect = (props) => {
  return /* @__PURE__ */ jsxRuntime.jsx(SelectContext.default, { shape: "multiselect", ...props });
};
const KitsTreeSelect = (props) => {
  return /* @__PURE__ */ jsxRuntime.jsx(SelectContext.default, { shape: "treeSelect", ...props });
};
const KitsListBox = (props) => {
  return /* @__PURE__ */ jsxRuntime.jsx(SelectContext.default, { shape: "listBox", ...props });
};
const KitsCascadeSelect = (props) => {
  return /* @__PURE__ */ jsxRuntime.jsx(SelectContext.default, { shape: "cascade", ...props });
};

exports.KitsAutoComplete = KitsAutoComplete;
exports.KitsCascadeSelect = KitsCascadeSelect;
exports.KitsDropdown = KitsDropdown;
exports.KitsListBox = KitsListBox;
exports.KitsMultiSelect = KitsMultiSelect;
exports.KitsTreeSelect = KitsTreeSelect;
exports.MultiSelect = KitsMultiSelect;
exports.TreeSelect = KitsTreeSelect;
//# sourceMappingURL=index.cjs.map
