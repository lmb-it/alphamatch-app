'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
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
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
require('../../../apps/mobile/src/Factory/DimensionsContext.cjs');
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
var index$1 = require('../../../apps/mobile/src/Core/Checkbox/index.cjs');
require('../../../apps/mobile/src/Core/RadioButton/index.cjs');
var KitsThemeProvider_native = require('../../../contexts/Theme/KitsThemeProvider.cjs');
var index = require('../../../layout/Flex/index.cjs');
var index_native = require('../../../primitives/Text/index.cjs');

const indicatorSize = (s) => {
  switch (s) {
    case "xs":
    case "sm":
      return "sm";
    case "lg":
    case "xl":
      return "lg";
    default:
      return "md";
  }
};
const CheckboxButton = ({
  item,
  selected,
  disabled,
  isInvalid,
  onToggle
}) => {
  const { resolveToken } = KitsThemeProvider_native.useKitsTheme();
  const primaryColor = resolveToken("primary");
  const borderColor = resolveToken("gray.300");
  const sizes = {
    xs: 13,
    sm: 17,
    md: 22,
    lg: 27,
    xl: 30
  };
  const paddings = {
    xs: [1, 3],
    sm: [2, 5],
    md: [3, 7],
    lg: [4, 9],
    xl: [5, 13]
  };
  const size = item.size ? sizes[item.size] : sizes.xs;
  const padding = item.size ? paddings[item.size] : paddings.xs;
  const leftLabel = item.labelPosition === "left";
  const bottomLabel = item.labelPosition === "bottom";
  const topLabel = item.labelPosition === "top";
  const direction = leftLabel ? "row-reverse" : bottomLabel ? "column" : topLabel ? "column-reverse" : "row";
  const containerStyle = React.useMemo(() => ({
    opacity: disabled ? 40 : 100,
    borderWidth: item.component ? 0 : 1,
    borderRadius: item.component ? 0 : 8,
    borderColor: selected ? primaryColor : borderColor,
    backgroundColor: selected ? primaryColor : "transparent",
    paddingHorizontal: item.component ? 0 : padding?.[1],
    paddingVertical: item.component ? 0 : padding?.[0]
  }), [disabled, selected, item.component, padding]);
  const renderContent = () => {
    if (item.component) {
      return typeof item.component === "function" ? item.component({ selected, value: item.value, isInvalid: !!isInvalid }) : item.component;
    }
    return /* @__PURE__ */ jsxRuntime.jsx(index_native.default, { fontSize: size, fontColor: selected && !item.withBulbs ? "#fff" : void 0, m: 0, children: item.label });
  };
  const renderBulb = () => /* @__PURE__ */ jsxRuntime.jsx(
    reactNative.Pressable,
    {
      onPress: () => {
        if (!disabled) onToggle();
      },
      disabled,
      children: /* @__PURE__ */ jsxRuntime.jsxs(index.default, { alignItems: "center", gap: 6, flexDirection: direction, children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          index$1.default,
          {
            checked: selected,
            disabled,
            invalid: isInvalid,
            checkedBackgroundColor: primaryColor,
            checkedBorderColor: primaryColor,
            size: indicatorSize(item.size)
          }
        ),
        renderContent()
      ] })
    }
  );
  const renderButton = () => /* @__PURE__ */ jsxRuntime.jsx(
    reactNative.Pressable,
    {
      onPress: () => {
        if (!disabled) onToggle();
      },
      disabled,
      children: /* @__PURE__ */ jsxRuntime.jsx(index.default, { style: containerStyle, children: renderContent() })
    }
  );
  const renderComponent = () => /* @__PURE__ */ jsxRuntime.jsx(
    reactNative.Pressable,
    {
      onPress: () => {
        if (!disabled) onToggle();
      },
      disabled,
      children: /* @__PURE__ */ jsxRuntime.jsxs(index.default, { flexDirection: direction, alignItems: "center", gap: 4, children: [
        renderContent(),
        !!item.label && /* @__PURE__ */ jsxRuntime.jsx(index_native.default, { children: item.label })
      ] })
    }
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    index.default,
    {
      pointerEvents: disabled ? "none" : "auto",
      w: item.w,
      alignItems: "flex-start",
      children: item.withBulbs ? renderBulb() : item.component ? renderComponent() : renderButton()
    }
  );
};

exports.default = CheckboxButton;
//# sourceMappingURL=checkbox.cjs.map
