import { jsx } from 'react/jsx-runtime';
import { useRef, useMemo, useEffect, useCallback } from 'react';
import { useWatch } from 'react-hook-form';
import { useFieldLogic } from '../../hooks/useFieldLogic.js';
import '@hookform/resolvers/yup';
import 'yup';
import '../../../apps/mobile/src/ui/accordion/index.js';
import '../../../apps/mobile/src/ui/actionsheet/index.js';
import '../../../apps/mobile/src/ui/alert/index.js';
import '../../../apps/mobile/src/ui/alert-dialog/index.js';
import '../../../apps/mobile/src/ui/avatar/index.js';
import '../../../apps/mobile/src/ui/badge/index.js';
import '../../../apps/mobile/src/ui/bottomsheet/index.js';
import '../../../apps/mobile/src/ui/box/index.js';
import '../../../apps/mobile/src/ui/button/index.js';
import '../../../apps/mobile/src/ui/card/index.js';
import '../../../apps/mobile/src/ui/center/index.js';
import '../../../apps/mobile/src/ui/checkbox/index.js';
import '../../../apps/mobile/src/ui/divider/index.js';
import '../../../apps/mobile/src/ui/drawer/index.js';
import '../../../apps/mobile/src/ui/fab/index.js';
import 'react-native';
import '../../../apps/mobile/src/ui/form-control/index.js';
import '../../../apps/mobile/src/ui/gluestack-ui-provider/config.js';
import '@gluestack-ui/core/overlay/creator';
import '@gluestack-ui/core/toast/creator';
import 'nativewind';
import '../../../apps/mobile/src/ui/grid/index.js';
import '../../../apps/mobile/src/ui/heading/index.js';
import '../../../apps/mobile/src/ui/hstack/index.js';
import '../../../apps/mobile/src/ui/icon/index.js';
import '../../../apps/mobile/src/ui/image/index.js';
import '../../../apps/mobile/src/ui/image-background/index.js';
import '../../../apps/mobile/src/ui/input/index.js';
import '../../../apps/mobile/src/ui/link/index.js';
import '../../../apps/mobile/src/ui/menu/index.js';
import '../../../apps/mobile/src/ui/modal/index.js';
import '../../../apps/mobile/src/ui/popover/index.js';
import '../../../apps/mobile/src/ui/portal/index.js';
import '../../../apps/mobile/src/ui/pressable/index.js';
import '../../../apps/mobile/src/ui/progress/index.js';
import '../../../apps/mobile/src/ui/radio/index.js';
import 'react-native-safe-area-context';
import '../../../apps/mobile/src/ui/select/index.js';
import '../../../apps/mobile/src/ui/skeleton/index.js';
import '../../../apps/mobile/src/ui/slider/index.js';
import '../../../apps/mobile/src/ui/spinner/index.js';
import '../../../apps/mobile/src/ui/switch/index.js';
import '../../../apps/mobile/src/ui/table/index.js';
import '../../../apps/mobile/src/ui/text/index.js';
import '../../../apps/mobile/src/ui/textarea/index.js';
import '../../../apps/mobile/src/ui/toast/index.js';
import '../../../apps/mobile/src/ui/tooltip/index.js';
import '../../../apps/mobile/src/ui/vstack/index.js';
import 'react-native-reanimated';
import { createStyleContext, resolveResponsiveValue } from '../../../apps/mobile/src/Factory/helpers/style.js';
import '../../../apps/mobile/src/Factory/DimensionsContext.js';
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'i18next';
import 'react-i18next';
import '../../../apps/mobile/src/Core/AutoComplete/index.js';
import '../../../apps/mobile/src/Core/Dropdown/index.js';
import '../../../apps/mobile/src/Core/MultiSelect/index.js';
import '../../../apps/mobile/src/Core/Trees/components/CoreTree.js';
import '../../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.js';
import '../../../apps/mobile/src/Core/Trees/components/CoreToolbar.js';
import '../../../apps/mobile/src/Core/Paginator/index.js';
import 'lucide-react-native';
import '../../../apps/mobile/src/Core/SelectButton/index.js';
import '../../../apps/mobile/src/Core/DataTable/DataTable.js';
import '../../../apps/mobile/src/Core/Tag/index.js';
import '../../../apps/mobile/src/Core/Badge/index.js';
import '../../../apps/mobile/src/Core/ProgressBar/index.js';
import '../../../apps/mobile/src/Core/Checkbox/index.js';
import '../../../apps/mobile/src/Core/RadioButton/index.js';
import Flex from '../../../layout/Flex/index.js';

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
