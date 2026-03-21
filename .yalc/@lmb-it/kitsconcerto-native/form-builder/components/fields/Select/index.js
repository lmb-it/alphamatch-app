import { useState, useEffect, createElement } from 'react';
import { uniqueId } from 'lodash';
import FormSelect from '../../../../form/selects/SelectContext.js';

const Select = ({
  element,
  control,
  getValues,
  fieldLogic
}) => {
  const [elementKey, setElementKey] = useState(uniqueId(element.id.toString()));
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
    attached,
    style: elementStyle
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
  useEffect(() => {
    setElementKey(uniqueId(element.id.toString()));
  }, [list]);
  return /* @__PURE__ */ createElement(
    FormSelect,
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
      style: elementStyle?.input,
      containerStyle: elementStyle?.container,
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

export { Select, Select as default };
//# sourceMappingURL=index.js.map
