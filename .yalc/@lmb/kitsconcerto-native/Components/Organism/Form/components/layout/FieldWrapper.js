import { jsx } from 'react/jsx-runtime';
import { useRef, useMemo, useEffect, useCallback } from 'react';
import { useWatch } from 'react-hook-form';
import { useFieldLogic } from '../../hooks/useFieldLogic.js';
import '@hookform/resolvers/yup';
import 'yup';
import 'axios';
import '../../../../../Contexts/DialogContext.js';
import '../../../../Molecules/Form/KitsSelect/SelectContext.js';
import Flex from '../../../../Molecules/UI/Flex/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';
import { createStyleContext, resolveResponsiveValue } from '../../../../../apps/mobile/src/Factory/helpers/style.js';

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
  const currentLayout = useRef(null);
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
  const dependencies = useMemo(() => {
    const deps = /* @__PURE__ */ new Set([...element.deps ?? [], ...element.logic?.deps ?? []]);
    if (deps.has("*")) {
      return flattenPaths(getValues());
    }
    return Array.from(deps).map((d) => resolveDepPath(d, groupField));
  }, [element, groupField]);
  const watchedValues = useWatch({
    name: dependencies,
    compute: (fieldValue) => {
      return fieldValue;
    },
    exact: true,
    disabled: dependencies.length === 0
  });
  useEffect(() => {
  }, [watchedValues]);
  const fieldLogic = useFieldLogic({ element, control, getValues, isFocused: focusedField === element.id, groupField, watchedValues });
  const {
    field,
    isShown,
    layout,
    style: elementStyle,
    animation
  } = fieldLogic;
  const isFocused = focusedField === field.name;
  const onFocus = useCallback(() => setFocusedField(field.name), [setFocusedField, field.name]);
  useCallback((event) => {
    const cl = event.target["className"];
    if (!cl || cl.includes(`${element.id}_option_item`) || cl.includes(`p-multiselect-filter`)) {
      return;
    }
    setFocusedField("");
    field.onBlur();
  }, [setFocusedField, field.onBlur]);
  useEffect(() => {
    if (layout.colSpan && currentLayout.current != JSON.stringify(layout)) {
      const ctx = createStyleContext();
      const colSpan = resolveResponsiveValue(layout.colSpan, ctx);
      onGridChange?.(colSpan?.toString() ?? "12");
      currentLayout.current = JSON.stringify(layout);
    }
  }, [layout]);
  if (!isShown || !children) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    Flex,
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

export { FieldWrapper };
//# sourceMappingURL=FieldWrapper.js.map
