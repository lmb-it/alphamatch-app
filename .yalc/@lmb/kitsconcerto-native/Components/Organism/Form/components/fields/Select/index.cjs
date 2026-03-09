'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _ = require('lodash');
require('react/jsx-runtime');
require('axios');
require('../../../../../../Contexts/DialogContext.cjs');
var SelectContext = require('../../../../../Molecules/Form/KitsSelect/SelectContext.cjs');
require('../../../../../Molecules/UI/Flex/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

const Select = ({
  element,
  control,
  getValues,
  fieldLogic
}) => {
  const [elementKey, setElementKey] = React.useState(_.uniqueId(element.id.toString()));
  const {
    field,
    fieldState,
    label,
    placeholder,
    isDisabled,
    isRequired,
    helperText,
    watchedValues,
    list,
    attached
  } = fieldLogic;
  const shapeMap = {
    Select: "dropdown",
    Multiselect: "multiselect",
    Tags: "autocomplete",
    ListBox: "listBox",
    TreeSelect: "treeSelect"
  };
  const shape = shapeMap[element.type] || "dropdown";
  const {
    // Common
    labelKey,
    valueKey,
    outputValueKey,
    childrenKey,
    withFilter,
    filterBy,
    virtualScroll,
    // Specific
    withArrow,
    isMultiple,
    forceSelection,
    completeMethod,
    valueMode,
    selectionLimit,
    hideError,
    // TreeSelect specific
    onlyParentsWithChildren,
    isStructured
  } = element;
  React.useEffect(() => {
    setElementKey(_.uniqueId(element.id.toString()));
  }, [list]);
  return /* @__PURE__ */ React.createElement(
    SelectContext.default,
    {
      ...field,
      key: elementKey,
      id: field.name,
      shape,
      label,
      placeholder,
      disabled: isDisabled,
      required: isRequired,
      invalid: fieldState.invalid,
      errors: fieldState.error?.message,
      helperText,
      list,
      hideError,
      attached,
      labelKey,
      valueKey,
      outputValueKey,
      childrenKey,
      withFilter,
      filterBy,
      virtualScroll,
      withArrow,
      isMultiple,
      forceSelection,
      completeMethod,
      valueMode,
      selectionLimit,
      onlyParentsWithChildren,
      isStructured
    }
  );
};

exports.Select = Select;
exports.default = Select;
//# sourceMappingURL=index.cjs.map
