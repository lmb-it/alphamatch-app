'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactHookForm = require('react-hook-form');
var useFieldLogic = require('../../hooks/useFieldLogic.cjs');
require('@hookform/resolvers/yup');
require('yup');
require('../../../apps/mobile/src/ui/accordion/index.cjs');
require('../../../apps/mobile/src/ui/actionsheet/index.cjs');
require('../../../apps/mobile/src/ui/alert/index.cjs');
require('../../../apps/mobile/src/ui/alert-dialog/index.cjs');
require('../../../apps/mobile/src/ui/avatar/index.cjs');
require('../../../apps/mobile/src/ui/badge/index.cjs');
require('../../../apps/mobile/src/ui/bottomsheet/index.cjs');
require('../../../apps/mobile/src/ui/box/index.cjs');
require('../../../apps/mobile/src/ui/button/index.cjs');
require('../../../apps/mobile/src/ui/card/index.cjs');
require('../../../apps/mobile/src/ui/center/index.cjs');
require('../../../apps/mobile/src/ui/checkbox/index.cjs');
require('../../../apps/mobile/src/ui/divider/index.cjs');
require('../../../apps/mobile/src/ui/drawer/index.cjs');
require('../../../apps/mobile/src/ui/fab/index.cjs');
require('react-native');
require('../../../apps/mobile/src/ui/form-control/index.cjs');
require('../../../apps/mobile/src/ui/gluestack-ui-provider/config.cjs');
require('@gluestack-ui/core/overlay/creator');
require('@gluestack-ui/core/toast/creator');
require('nativewind');
require('../../../apps/mobile/src/ui/grid/index.cjs');
require('../../../apps/mobile/src/ui/heading/index.cjs');
require('../../../apps/mobile/src/ui/hstack/index.cjs');
require('../../../apps/mobile/src/ui/icon/index.cjs');
require('../../../apps/mobile/src/ui/image/index.cjs');
require('../../../apps/mobile/src/ui/image-background/index.cjs');
require('../../../apps/mobile/src/ui/input/index.cjs');
require('../../../apps/mobile/src/ui/link/index.cjs');
require('../../../apps/mobile/src/ui/menu/index.cjs');
require('../../../apps/mobile/src/ui/modal/index.cjs');
require('../../../apps/mobile/src/ui/popover/index.cjs');
require('../../../apps/mobile/src/ui/portal/index.cjs');
require('../../../apps/mobile/src/ui/pressable/index.cjs');
require('../../../apps/mobile/src/ui/progress/index.cjs');
require('../../../apps/mobile/src/ui/radio/index.cjs');
require('react-native-safe-area-context');
require('../../../apps/mobile/src/ui/select/index.cjs');
require('../../../apps/mobile/src/ui/skeleton/index.cjs');
require('../../../apps/mobile/src/ui/slider/index.cjs');
require('../../../apps/mobile/src/ui/spinner/index.cjs');
require('../../../apps/mobile/src/ui/switch/index.cjs');
require('../../../apps/mobile/src/ui/table/index.cjs');
require('../../../apps/mobile/src/ui/text/index.cjs');
require('../../../apps/mobile/src/ui/textarea/index.cjs');
require('../../../apps/mobile/src/ui/toast/index.cjs');
require('../../../apps/mobile/src/ui/tooltip/index.cjs');
require('../../../apps/mobile/src/ui/vstack/index.cjs');
require('react-native-reanimated');
var style = require('../../../apps/mobile/src/Factory/helpers/style.cjs');
require('../../../apps/mobile/src/Factory/DimensionsContext.cjs');
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('i18next');
require('react-i18next');
require('../../../apps/mobile/src/Core/AutoComplete/index.cjs');
require('../../../apps/mobile/src/Core/Dropdown/index.cjs');
require('../../../apps/mobile/src/Core/MultiSelect/index.cjs');
require('../../../apps/mobile/src/Core/Trees/components/CoreTree.cjs');
require('../../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.cjs');
require('../../../apps/mobile/src/Core/Trees/components/CoreToolbar.cjs');
require('../../../apps/mobile/src/Core/Paginator/index.cjs');
require('lucide-react-native');
require('../../../apps/mobile/src/Core/SelectButton/index.cjs');
require('../../../apps/mobile/src/Core/DataTable/DataTable.cjs');
require('../../../apps/mobile/src/Core/Tag/index.cjs');
require('../../../apps/mobile/src/Core/Badge/index.cjs');
require('../../../apps/mobile/src/Core/ProgressBar/index.cjs');
require('../../../apps/mobile/src/Core/Checkbox/index.cjs');
require('../../../apps/mobile/src/Core/RadioButton/index.cjs');
var index = require('../../../layout/Flex/index.cjs');

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
