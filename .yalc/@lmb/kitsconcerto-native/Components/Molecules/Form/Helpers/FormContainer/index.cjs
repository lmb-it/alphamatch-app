'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
var _ = require('lodash');
var errormessage_native = require('../ErrorMessage/errormessage.cjs');
var index$1 = require('../Addons/index.cjs');
require('../../../../../apps/mobile/src/ui/accordion/index.cjs');
require('../../../../../apps/mobile/src/ui/actionsheet/index.cjs');
require('../../../../../apps/mobile/src/ui/alert/index.cjs');
require('../../../../../apps/mobile/src/ui/alert-dialog/index.cjs');
require('../../../../../apps/mobile/src/ui/avatar/index.cjs');
require('../../../../../apps/mobile/src/ui/badge/index.cjs');
require('../../../../../apps/mobile/src/ui/bottomsheet/index.cjs');
require('../../../../../apps/mobile/src/ui/box/index.cjs');
require('../../../../../apps/mobile/src/ui/button/index.cjs');
require('../../../../../apps/mobile/src/ui/card/index.cjs');
require('../../../../../apps/mobile/src/ui/center/index.cjs');
require('../../../../../apps/mobile/src/ui/checkbox/index.cjs');
require('../../../../../apps/mobile/src/ui/divider/index.cjs');
require('../../../../../apps/mobile/src/ui/drawer/index.cjs');
require('../../../../../apps/mobile/src/ui/fab/index.cjs');
var index = require('../../../../../apps/mobile/src/ui/form-control/index.cjs');
require('../../../../../apps/mobile/src/ui/gluestack-ui-provider/config.cjs');
require('@gluestack-ui/core/overlay/creator');
require('@gluestack-ui/core/toast/creator');
require('nativewind');
require('../../../../../apps/mobile/src/ui/grid/index.cjs');
require('../../../../../apps/mobile/src/ui/heading/index.cjs');
require('../../../../../apps/mobile/src/ui/hstack/index.cjs');
require('../../../../../apps/mobile/src/ui/icon/index.cjs');
require('../../../../../apps/mobile/src/ui/image/index.cjs');
require('../../../../../apps/mobile/src/ui/image-background/index.cjs');
require('../../../../../apps/mobile/src/ui/input/index.cjs');
require('../../../../../apps/mobile/src/ui/link/index.cjs');
require('../../../../../apps/mobile/src/ui/menu/index.cjs');
require('../../../../../apps/mobile/src/ui/modal/index.cjs');
require('../../../../../apps/mobile/src/ui/popover/index.cjs');
require('../../../../../apps/mobile/src/ui/portal/index.cjs');
require('../../../../../apps/mobile/src/ui/pressable/index.cjs');
require('../../../../../apps/mobile/src/ui/progress/index.cjs');
require('../../../../../apps/mobile/src/ui/radio/index.cjs');
require('react-native-safe-area-context');
require('../../../../../apps/mobile/src/ui/select/index.cjs');
require('../../../../../apps/mobile/src/ui/skeleton/index.cjs');
require('../../../../../apps/mobile/src/ui/slider/index.cjs');
require('../../../../../apps/mobile/src/ui/spinner/index.cjs');
require('../../../../../apps/mobile/src/ui/switch/index.cjs');
require('../../../../../apps/mobile/src/ui/table/index.cjs');
require('../../../../../apps/mobile/src/ui/text/index.cjs');
require('../../../../../apps/mobile/src/ui/textarea/index.cjs');
require('../../../../../apps/mobile/src/ui/toast/index.cjs');
require('../../../../../apps/mobile/src/ui/tooltip/index.cjs');
require('../../../../../apps/mobile/src/ui/vstack/index.cjs');
require('react-native-reanimated');
var style = require('../../../../../apps/mobile/src/Factory/helpers/style.cjs');
require('../../../../../apps/mobile/src/Factory/DimensionsContext.cjs');
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
require('../../../../../packages/types/src/Css/map/index.cjs');
require('i18next');
require('react-i18next');
require('../../../../../apps/mobile/src/Core/AutoComplete/index.cjs');
require('../../../../../apps/mobile/src/Core/Dropdown/index.cjs');
require('../../../../../apps/mobile/src/Core/MultiSelect/index.cjs');
require('../../../../../apps/mobile/src/Core/Trees/components/CoreTree.cjs');
require('../../../../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.cjs');
require('../../../../../apps/mobile/src/Core/Trees/components/CoreToolbar.cjs');
require('../../../../../apps/mobile/src/Core/Paginator/index.cjs');
require('lucide-react-native');
require('../../../../../apps/mobile/src/Core/SelectButton/index.cjs');
require('../../../../../apps/mobile/src/Core/DataTable/DataTable.cjs');
require('../../../../../apps/mobile/src/Core/Tag/index.cjs');
require('../../../../../apps/mobile/src/Core/Badge/index.cjs');
require('../../../../../apps/mobile/src/Core/ProgressBar/index.cjs');
require('../../../../../apps/mobile/src/Core/Checkbox/index.cjs');
require('../../../../../apps/mobile/src/Core/RadioButton/index.cjs');
require('axios');
require('../../../UI/Flex/index.cjs');
require('../../../../../Contexts/DialogContext.cjs');
var useComponentDefaults = require('../../../../../Hooks/useComponentDefaults.cjs');
require('primereact/tooltip');
require('primereact/skeleton');
require('../../KitsSelect/SelectContext.cjs');
var label_native = require('../Label/label.cjs');

const KitsContainer = (rawProps) => {
  const { mergedProps: props, themeStyle } = useComponentDefaults.default("FormContainer", rawProps);
  const {
    id,
    helperText,
    className,
    children,
    rightAddon,
    leftAddon,
    errors,
    invalid,
    required,
    hideError,
    additionalClassName,
    label,
    isFloatedLabel,
    containerStyle,
    disabled
  } = props;
  const elementId = id ? `${id}_element` : _.uniqueId("element_");
  const placement = React.useMemo(() => {
    if (label && typeof label === "object" && "placement" in label) {
      return label.placement;
    }
    return "T";
  }, [label]);
  const isHorizontal = placement === "RL";
  const isBottom = placement === "B";
  const labelElement = !isFloatedLabel ? /* @__PURE__ */ jsxRuntime.jsx(label_native.default, { isFormControl: true, label, elementId }) : null;
  const contentElement = /* @__PURE__ */ jsxRuntime.jsx(index$1.default, { additionalClassName, leftAddon, rightAddon, invalid, children });
  const themeRnStyle = React.useMemo(
    () => themeStyle && Object.keys(themeStyle).length ? style.style(themeStyle) : {},
    [themeStyle]
  );
  const containerRnStyle = React.useMemo(
    () => containerStyle && Object.keys(containerStyle).length ? style.style(containerStyle) : {},
    [containerStyle]
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(
    index.FormControl,
    {
      isInvalid: invalid,
      size: "md",
      isDisabled: disabled,
      isReadOnly: disabled,
      isRequired: required,
      style: { width: "100%", gap: 4, ...themeRnStyle, ...containerRnStyle },
      children: [
        isHorizontal ? /* @__PURE__ */ jsxRuntime.jsxs(reactNative.View, { style: { flexDirection: "row", alignItems: "center", gap: 8, width: "100%" }, children: [
          labelElement,
          /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: { flex: 1 }, children: contentElement })
        ] }) : isBottom ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          contentElement,
          labelElement
        ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          labelElement,
          contentElement
        ] }),
        helperText && typeof helperText !== "function" && /* @__PURE__ */ jsxRuntime.jsx(index.FormControlHelper, { children: /* @__PURE__ */ jsxRuntime.jsx(index.FormControlHelperText, { children: helperText }) }),
        !hideError && /* @__PURE__ */ jsxRuntime.jsx(errormessage_native.default, { invalid, errors })
      ]
    }
  );
};

exports.default = KitsContainer;
//# sourceMappingURL=index.cjs.map
