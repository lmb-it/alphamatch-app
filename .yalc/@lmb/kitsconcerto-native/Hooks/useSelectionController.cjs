'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

const isEqual = (a, b) => Object.is(a, b);
function useSelectionController(params) {
  const isControlled = "value" in params && params.value !== void 0;
  const [internalValue, setInternalValue] = React.useState(() => {
    if (params.defaultValue !== void 0) return params.defaultValue;
    if (params.mode === "multiple") return [];
    if (params.mode === "tristate") return null;
    if (params.mode === "boolean") return false;
    return void 0;
  });
  const value = isControlled ? params.value : internalValue;
  const triggerChange = React.useCallback(
    (newValue) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      if (params.onChange) {
        params.onChange(newValue);
      }
    },
    [isControlled, params]
  );
  const onChange = React.useCallback(
    (input) => {
      const rawValue = input && typeof input === "object" && "value" in input ? input.value : input;
      switch (params.mode) {
        case "boolean": {
          const next = !value;
          triggerChange(next);
          break;
        }
        case "tristate": {
          let next = false;
          if (value === false) next = true;
          else if (value === true) next = null;
          else if (value === null) next = false;
          triggerChange(next);
          break;
        }
        case "single": {
          if (isEqual(value, rawValue)) {
            if (params.allowDeselect) {
              triggerChange(void 0);
            }
          } else {
            triggerChange(rawValue);
          }
          break;
        }
        case "multiple": {
          const currentArray = value || [];
          const exists = currentArray.some((v) => isEqual(v, rawValue));
          let nextArray;
          if (exists) {
            nextArray = currentArray.filter((v) => !isEqual(v, rawValue));
          } else {
            nextArray = [...currentArray, rawValue];
          }
          triggerChange(nextArray);
          break;
        }
      }
    },
    [params.mode, value, triggerChange, params]
    // Added params to dependency
  );
  const isSelected = React.useCallback(
    (itemValue) => {
      const target = itemValue && typeof itemValue === "object" && "value" in itemValue ? itemValue.value : itemValue;
      if (params.mode === "multiple") {
        return (value || []).some((v) => isEqual(v, target));
      }
      if (params.mode === "single") {
        return isEqual(value, target);
      }
      return value === true;
    },
    [value, params.mode]
  );
  const checked = React.useMemo(() => {
    if (params.mode === "multiple") return Array.isArray(value) && value.length > 0;
    if (params.mode === "single") return value !== void 0 && value !== null;
    return value;
  }, [value, params.mode]);
  return {
    mode: params.mode,
    /**
     * The current state.
     * Type: boolean | null | T | T[]
     */
    value,
    /**
     * Call this to toggle or select an item.
     * @param input Optional. The value or item object (required for single/multi).
     */
    onChange,
    /**
     * Helper to check if a specific value is selected.
     */
    isSelected,
    /**
     * Derived boolean state (mostly for simple checkboxes).
     */
    checked
  };
}

exports.default = useSelectionController;
//# sourceMappingURL=useSelectionController.cjs.map
