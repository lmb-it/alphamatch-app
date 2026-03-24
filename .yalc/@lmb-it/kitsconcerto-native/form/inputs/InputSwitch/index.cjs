'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
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
var index = require('../../../apps/mobile/src/ui/switch/index.cjs');
require('../../../apps/mobile/src/ui/table/index.cjs');
require('../../../apps/mobile/src/ui/text/index.cjs');
require('../../../apps/mobile/src/ui/textarea/index.cjs');
require('../../../apps/mobile/src/ui/toast/index.cjs');
require('../../../apps/mobile/src/ui/tooltip/index.cjs');
require('../../../apps/mobile/src/ui/vstack/index.cjs');
require('react-native-reanimated');
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
require('../../../apps/mobile/src/Factory/DimensionsContext.cjs');
var useSeparator = require('../../../apps/mobile/src/Factory/useSeparator.cjs');
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
var index_native = require('../../helpers/FormContainer/index.cjs');
require('../../../contexts/DialogContext.cjs');
var useComponentDefaults = require('../../../hooks/useComponentDefaults.cjs');
var useResolvedStyle = require('../../../hooks/useResolvedStyle.cjs');
var checkbox_native = require('../../controls/Checkbox/checkbox.cjs');

const KitsInputSwitch = ({ ref, ...rawProps }) => {
  const { mergedProps: props, themeStyle, elementStyles } = useComponentDefaults.default("Switch", rawProps);
  const resolvedThemeStyle = useResolvedStyle.default(themeStyle);
  const resolvedRootStyle = useResolvedStyle.default(elementStyles?.root || {});
  const {
    id,
    label,
    helperText,
    errors,
    invalid,
    required,
    disabled,
    value,
    checked,
    onChange,
    displayAs,
    containerStyle,
    localProps,
    ...rest
  } = props;
  const isCheckbox = displayAs === "checkbox";
  const incoming = typeof checked === "boolean" ? checked : value;
  const isControlled = typeof incoming !== "undefined" && typeof onChange === "function";
  const [internal, setInternal] = React.useState(incoming ?? false);
  React.useEffect(() => {
    if (isControlled) {
      setInternal(incoming);
    }
  }, [incoming, isControlled]);
  const handleToggle = (newVal) => {
    if (!isControlled) {
      setInternal(newVal);
    }
    onChange?.({ target: { value: newVal }, value: newVal });
  };
  const { nativeProps, cssProps } = useSeparator.default({ ...rest, ...localProps });
  const labelText = typeof label === "string" ? label : typeof label === "object" && label !== null && "text" in label ? label.text : void 0;
  const Element = isCheckbox ? /* @__PURE__ */ jsxRuntime.jsx(
    checkbox_native.default,
    {
      item: {
        value: true,
        label: labelText ?? "",
        withBulbs: true,
        labelPosition: "right"
      },
      selected: !!internal,
      disabled,
      isInvalid: invalid,
      onToggle: () => handleToggle(!internal)
    }
  ) : /* @__PURE__ */ jsxRuntime.jsx(
    index.Switch,
    {
      ...nativeProps,
      ref,
      style: { ...resolvedRootStyle && Object.keys(resolvedRootStyle).length > 0 ? resolvedRootStyle : resolvedThemeStyle, ...cssProps },
      value: internal,
      isDisabled: !!disabled,
      isInvalid: !!invalid,
      onToggle: handleToggle
    }
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
    {
      id,
      required,
      helperText,
      errors,
      invalid,
      label: isCheckbox ? void 0 : label,
      disabled,
      containerStyle: { borderRadius: 0, overflow: "visible", ...containerStyle, borderWidth: 0 },
      elementStyles,
      children: Element
    }
  );
};

exports.default = KitsInputSwitch;
//# sourceMappingURL=index.cjs.map
