import { jsx } from 'react/jsx-runtime';
import { useMemo, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import KitsContainer from '../../../../../Molecules/Form/Helpers/FormContainer/index.js';
import 'axios';
import '../../../../../../Contexts/DialogContext.js';
import '../../../../../../Hooks/useKeyboardNavigation.js';
import '../../../../../Molecules/Form/KitsSelect/SelectContext.js';
import Flex from '../../../../../Molecules/UI/Flex/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';
import { FormRenderer } from '../../FormRenderer/index.js';

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
  const childIds = useMemo(
    () => childElements.map((el) => el.id),
    [childElements]
  );
  const childValues = useWatch({
    name: childIds,
    control
  });
  useEffect(() => {
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
  const attachedElements = useMemo(
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
  return /* @__PURE__ */ jsx(
    KitsContainer,
    {
      id: element.id,
      label,
      required: isRequired,
      errors: fieldState.error?.message,
      invalid: fieldState.invalid,
      helperText,
      hideError,
      disabled: isDisabled,
      children: /* @__PURE__ */ jsx(Flex, { w: "full", gap: 8, alignItems: "center", children: /* @__PURE__ */ jsx(
        FormRenderer,
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

export { CombinedElement, CombinedElement as default };
//# sourceMappingURL=index.js.map
