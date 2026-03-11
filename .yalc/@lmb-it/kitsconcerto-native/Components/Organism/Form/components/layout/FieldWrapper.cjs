'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactHookForm = require('react-hook-form');
var useFieldLogic = require('../../hooks/useFieldLogic.cjs');
require('@hookform/resolvers/yup');
require('yup');
require('axios');
require('../../../../../Contexts/DialogContext.cjs');
require('../../../../../Hooks/useKeyboardNavigation.cjs');
require('../../../../Molecules/Form/KitsSelect/SelectContext.cjs');
var index = require('../../../../Molecules/UI/Flex/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');
var style = require('../../../../../apps/mobile/src/Factory/helpers/style.cjs');

const FieldWrapper = ({
  element,
  control,
  getValues,
  setFocusedField,
  focusedField,
  children,
  grid,
  onGridChange,
  groupField
}) => {
  const currentLayout = React.useRef(null);
  const resolveDepPath = (dep, groupField2) => {
    if (!groupField2 || groupField2.index === void 0 || groupField2.index < 0) return dep;
    const parts = dep.split(".");
    const { name, index } = groupField2;
    if (parts.length < 2) return dep;
    if (parts[0] !== name) return dep;
    if (parts[1] === "current") {
      parts[1] = String(index);
      return parts.join(".");
    }
    return dep;
  };
  const flattenPaths = (obj, prefix = "") => Object.keys(obj ?? {}).flatMap((key) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof obj[key] === "object" && obj[key] !== null ? [path, ...flattenPaths(obj[key], path)] : [path];
  });
  const dependencies = React.useMemo(() => {
    const deps = /* @__PURE__ */ new Set([...element.deps ?? [], ...element.logic?.deps ?? []]);
    if (deps.has("*")) {
      return flattenPaths(getValues());
    }
    return Array.from(deps).map((d) => resolveDepPath(d, groupField));
  }, [element, groupField]);
  const watchedValues = reactHookForm.useWatch({
    name: dependencies,
    compute: (fieldValue) => {
      return fieldValue;
    },
    exact: true,
    disabled: dependencies.length === 0
  });
  React.useEffect(() => {
  }, [watchedValues]);
  const fieldLogic = useFieldLogic.useFieldLogic({ element, control, getValues, isFocused: focusedField === element.id, groupField, watchedValues });
  const {
    field,
    isShown,
    layout,
    style: elementStyle,
    animation
  } = fieldLogic;
  const isFocused = focusedField === field.name;
  const onFocus = React.useCallback(() => setFocusedField(field.name), [setFocusedField, field.name]);
  React.useCallback((event) => {
    const cl = event.target["className"];
    if (!cl || cl.includes(`${element.id}_option_item`) || cl.includes(`p-multiselect-filter`)) {
      return;
    }
    setFocusedField("");
    field.onBlur();
  }, [setFocusedField, field.onBlur]);
  React.useEffect(() => {
    if (layout.colSpan && currentLayout.current != JSON.stringify(layout)) {
      const ctx = style.createStyleContext();
      const colSpan = style.resolveResponsiveValue(layout.colSpan, ctx);
      onGridChange?.(colSpan?.toString() ?? "12");
      currentLayout.current = JSON.stringify(layout);
    }
  }, [layout]);
  if (!isShown || !children) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    index.default,
    {
      ...elementStyle?.container,
      ...animation,
      zIndex: isFocused ? 1e3 : "auto",
      w: "100%",
      onTouchStart: onFocus,
      children: children(fieldLogic)
    }
  );
};

exports.FieldWrapper = FieldWrapper;
//# sourceMappingURL=FieldWrapper.cjs.map
