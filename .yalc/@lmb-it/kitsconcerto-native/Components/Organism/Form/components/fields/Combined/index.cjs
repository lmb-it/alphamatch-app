'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactHookForm = require('react-hook-form');
var index_native = require('../../../../../Molecules/Form/Helpers/FormContainer/index.cjs');
require('axios');
require('../../../../../../Contexts/DialogContext.cjs');
require('../../../../../../Hooks/useKeyboardNavigation.cjs');
require('../../../../../Molecules/Form/KitsSelect/SelectContext.cjs');
var index = require('../../../../../Molecules/UI/Flex/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');
var index_native$1 = require('../../FormRenderer/index.cjs');

const CombinedElement = ({
  element,
  control,
  getValues,
  groupField,
  focusedField,
  setFocusedField,
  fieldLogic
}) => {
  const {
    isShown,
    label,
    helperText,
    field,
    fieldState,
    isRequired,
    isDisabled,
    formContext,
    hideError
  } = fieldLogic;
  const combinedElement = element;
  const { grid, output, elements: childElements } = combinedElement;
  const childIds = React.useMemo(
    () => childElements.map((el) => el.id),
    [childElements]
  );
  const childValues = reactHookForm.useWatch({
    name: childIds,
    control
  });
  React.useEffect(() => {
    const outputTokens = output.trim().split(/\s+/);
    let computedValue;
    if (outputTokens.length === 1) {
      const childIndex = childIds.indexOf(outputTokens[0]);
      computedValue = childIndex >= 0 ? childValues[childIndex] : void 0;
    } else {
      computedValue = outputTokens.map((token) => {
        const childIndex = childIds.indexOf(token);
        return childIndex >= 0 ? childValues[childIndex] ?? "" : "";
      }).filter((v) => v !== "").join(" ");
    }
    const currentValue = formContext.getValues(field.name);
    if (currentValue !== computedValue) {
      formContext.setValue(field.name, computedValue, {
        shouldValidate: true,
        shouldDirty: true
      });
    }
  }, [childValues, output, childIds, field.name, formContext]);
  const attachedElements = React.useMemo(
    () => childElements.map((el) => ({
      ...el,
      // Remove label and schema from children — parent handles these
      label: void 0,
      schema: void 0,
      hideError: true,
      attached: true
    })),
    [childElements]
  );
  if (!isShown) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
    {
      id: element.id,
      label,
      required: isRequired,
      errors: fieldState.error?.message,
      invalid: fieldState.invalid,
      helperText,
      hideError,
      disabled: isDisabled,
      children: /* @__PURE__ */ jsxRuntime.jsx(index.default, { w: "full", gap: 8, alignItems: "center", children: /* @__PURE__ */ jsxRuntime.jsx(
        index_native$1.FormRenderer,
        {
          elements: attachedElements,
          control,
          getValues,
          groupField,
          focusedField,
          setFocusedField,
          grid: {
            columns: 12,
            columnGap: 8,
            rowGap: 0,
            colSpan: 12,
            ...grid
          }
        }
      ) })
    }
  );
};

exports.CombinedElement = CombinedElement;
exports.default = CombinedElement;
//# sourceMappingURL=index.cjs.map
