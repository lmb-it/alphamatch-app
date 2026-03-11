import { jsx } from 'react/jsx-runtime';
import FormSelect from './SelectContext.js';

const KitsAutoComplete = (props) => {
  return /* @__PURE__ */ jsx(FormSelect, { shape: "autocomplete", ...props });
};
const KitsDropdown = (props) => {
  return /* @__PURE__ */ jsx(FormSelect, { shape: "dropdown", ...props });
};
const KitsMultiSelect = (props) => {
  return /* @__PURE__ */ jsx(FormSelect, { shape: "multiselect", ...props });
};
const KitsTreeSelect = (props) => {
  return /* @__PURE__ */ jsx(FormSelect, { shape: "treeSelect", ...props });
};
const KitsListBox = (props) => {
  return /* @__PURE__ */ jsx(FormSelect, { shape: "listBox", ...props });
};
const KitsCascadeSelect = (props) => {
  return /* @__PURE__ */ jsx(FormSelect, { shape: "cascade", ...props });
};

export { KitsAutoComplete, KitsCascadeSelect, KitsDropdown, KitsListBox, KitsMultiSelect, KitsTreeSelect, KitsMultiSelect as MultiSelect, KitsTreeSelect as TreeSelect };
//# sourceMappingURL=index.js.map
