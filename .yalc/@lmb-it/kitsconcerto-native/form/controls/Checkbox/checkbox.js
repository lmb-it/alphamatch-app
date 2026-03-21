import { jsx, jsxs } from 'react/jsx-runtime';
import { useMemo } from 'react';
import { Pressable } from 'react-native';
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
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
import '../../../apps/mobile/src/Factory/DimensionsContext.js';
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
import CheckboxIndicator from '../../../apps/mobile/src/Core/Checkbox/index.js';
import '../../../apps/mobile/src/Core/RadioButton/index.js';
import { useKitsTheme } from '../../../contexts/Theme/KitsThemeProvider.js';
import Flex from '../../../layout/Flex/index.js';
import Text from '../../../primitives/Text/index.js';

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
  const { resolveToken } = useKitsTheme();
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
  const containerStyle = useMemo(() => ({
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
    return /* @__PURE__ */ jsx(Text, { fontSize: size, fontColor: selected && !item.withBulbs ? "#fff" : void 0, m: 0, children: item.label });
  };
  const renderBulb = () => /* @__PURE__ */ jsx(
    Pressable,
    {
      onPress: () => {
        if (!disabled) onToggle();
      },
      disabled,
      children: /* @__PURE__ */ jsxs(Flex, { alignItems: "center", gap: 6, flexDirection: direction, children: [
        /* @__PURE__ */ jsx(
          CheckboxIndicator,
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
  const renderButton = () => /* @__PURE__ */ jsx(
    Pressable,
    {
      onPress: () => {
        if (!disabled) onToggle();
      },
      disabled,
      children: /* @__PURE__ */ jsx(Flex, { style: containerStyle, children: renderContent() })
    }
  );
  const renderComponent = () => /* @__PURE__ */ jsx(
    Pressable,
    {
      onPress: () => {
        if (!disabled) onToggle();
      },
      disabled,
      children: /* @__PURE__ */ jsxs(Flex, { flexDirection: direction, alignItems: "center", gap: 4, children: [
        renderContent(),
        !!item.label && /* @__PURE__ */ jsx(Text, { children: item.label })
      ] })
    }
  );
  return /* @__PURE__ */ jsx(
    Flex,
    {
      pointerEvents: disabled ? "none" : "auto",
      w: item.w,
      alignItems: "flex-start",
      children: item.withBulbs ? renderBulb() : item.component ? renderComponent() : renderButton()
    }
  );
};

export { CheckboxButton as default };
//# sourceMappingURL=checkbox.js.map
