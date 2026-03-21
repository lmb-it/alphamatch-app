'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var helper = require('./helper.cjs');
var index_native$2 = require('./Dropdown/index.cjs');
var index_native$3 = require('./MultiSelect/index.cjs');
var index_native = require('./AutoComplete/index.cjs');
var index_native$5 = require('./TreeSelect/index.cjs');
var index_native$1 = require('./ListBox/index.cjs');
var index_native$4 = require('./CascadeSelect/index.cjs');

const IFormSelectContext = React.createContext({});
const FormSelect = ({ ref, ...props }) => {
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [rendererList, setData] = React.useState([]);
  const {
    withFilter = false,
    shape = "dropdown",
    list,
    onChange,
    labelKey = "label",
    valueKey = "value",
    outputValueKey = "*",
    childrenKey,
    filterBy,
    hideError,
    value
  } = props;
  const isMultiple = "isMultiple" in props && props.isMultiple;
  const isAutocompleteComponent = shape == "autocomplete";
  const isListBoxComponent = shape == "listBox";
  const isDropdownComponent = shape == "dropdown";
  const isMultiSelectComponent = shape == "multiselect";
  const isCascadeSelectComponent = shape == "cascade";
  const isTreeSelectComponent = shape == "treeSelect";
  const onItemChange = (e, item = void 0) => {
    onChange && onChange(e, item);
    const val = e?.target?.value ?? e?.value;
    if (val !== void 0) {
      setSelectedValue(val);
    }
  };
  const bookTheList = (list2) => {
    helper.checkKeys(list2, labelKey, valueKey);
    const mapped = helper.reMapping(list2, 0, labelKey, valueKey, childrenKey);
    setData(mapped);
  };
  const getData = React.useCallback(() => {
    if (typeof list === "function") {
      list().then((res) => {
        if (res.success && res.data) {
          bookTheList(res.data);
        }
      });
    } else {
      if (list) {
        bookTheList(list);
      }
    }
  }, [list]);
  React.useEffect(() => {
    getData();
  }, [list]);
  React.useEffect(() => {
    setSelectedValue(value);
  }, [value]);
  React.useImperativeHandle(
    ref,
    () => ({
      value: selectedValue,
      setValue: setSelectedValue,
      focus: () => {
      }
    }),
    []
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(
    IFormSelectContext.Provider,
    {
      value: {
        onChange: onItemChange,
        selectedValue,
        list: rendererList,
        labelKey,
        valueKey,
        outputValueKey,
        hideError,
        childrenKey: childrenKey ? childrenKey : helper.arrayType(list) == 1 ? "children" : ""
      },
      children: [
        isAutocompleteComponent && /* @__PURE__ */ jsxRuntime.jsx(
          index_native.default,
          {
            isMultiple,
            withFilter,
            filterBy,
            ...props
          }
        ),
        isListBoxComponent && /* @__PURE__ */ jsxRuntime.jsx(
          index_native$1.default,
          {
            ref,
            withFilter,
            filterBy,
            ...props
          }
        ),
        isDropdownComponent && /* @__PURE__ */ jsxRuntime.jsx(
          index_native$2.default,
          {
            withFilter,
            filterBy,
            ...props
          }
        ),
        isMultiSelectComponent && /* @__PURE__ */ jsxRuntime.jsx(
          index_native$3.default,
          {
            withFilter,
            filterBy,
            ...props
          }
        ),
        isCascadeSelectComponent && /* @__PURE__ */ jsxRuntime.jsx(
          index_native$4.default,
          {
            withFilter,
            filterBy,
            ...props
          }
        ),
        isTreeSelectComponent && /* @__PURE__ */ jsxRuntime.jsx(
          index_native$5.default,
          {
            withFilter,
            filterBy,
            ...props
          }
        )
      ]
    }
  );
};
const useSelect = () => React.useContext(IFormSelectContext);

exports.default = FormSelect;
exports.useSelect = useSelect;
//# sourceMappingURL=SelectContext.cjs.map
