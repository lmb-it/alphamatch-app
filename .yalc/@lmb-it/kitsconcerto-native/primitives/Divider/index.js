import { jsx, jsxs } from 'react/jsx-runtime';
import { View, StyleSheet, Text } from 'react-native';
import '../../apps/mobile/src/ui/accordion/index.js';
import '../../apps/mobile/src/ui/actionsheet/index.js';
import '../../apps/mobile/src/ui/alert/index.js';
import '../../apps/mobile/src/ui/alert-dialog/index.js';
import '../../apps/mobile/src/ui/avatar/index.js';
import '../../apps/mobile/src/ui/badge/index.js';
import '../../apps/mobile/src/ui/bottomsheet/index.js';
import '../../apps/mobile/src/ui/box/index.js';
import '../../apps/mobile/src/ui/button/index.js';
import '../../apps/mobile/src/ui/card/index.js';
import '../../apps/mobile/src/ui/center/index.js';
import '../../apps/mobile/src/ui/checkbox/index.js';
import '../../apps/mobile/src/ui/divider/index.js';
import '../../apps/mobile/src/ui/drawer/index.js';
import '../../apps/mobile/src/ui/fab/index.js';
import '../../apps/mobile/src/ui/form-control/index.js';
import 'react';
import '../../apps/mobile/src/ui/gluestack-ui-provider/config.js';
import '@gluestack-ui/core/overlay/creator';
import '@gluestack-ui/core/toast/creator';
import 'nativewind';
import '../../apps/mobile/src/ui/grid/index.js';
import '../../apps/mobile/src/ui/heading/index.js';
import '../../apps/mobile/src/ui/hstack/index.js';
import '../../apps/mobile/src/ui/icon/index.js';
import '../../apps/mobile/src/ui/image/index.js';
import '../../apps/mobile/src/ui/image-background/index.js';
import '../../apps/mobile/src/ui/input/index.js';
import '../../apps/mobile/src/ui/link/index.js';
import '../../apps/mobile/src/ui/menu/index.js';
import '../../apps/mobile/src/ui/modal/index.js';
import '../../apps/mobile/src/ui/popover/index.js';
import '../../apps/mobile/src/ui/portal/index.js';
import '../../apps/mobile/src/ui/pressable/index.js';
import '../../apps/mobile/src/ui/progress/index.js';
import '../../apps/mobile/src/ui/radio/index.js';
import 'react-native-safe-area-context';
import '../../apps/mobile/src/ui/select/index.js';
import '../../apps/mobile/src/ui/skeleton/index.js';
import '../../apps/mobile/src/ui/slider/index.js';
import '../../apps/mobile/src/ui/spinner/index.js';
import '../../apps/mobile/src/ui/switch/index.js';
import '../../apps/mobile/src/ui/table/index.js';
import '../../apps/mobile/src/ui/text/index.js';
import '../../apps/mobile/src/ui/textarea/index.js';
import '../../apps/mobile/src/ui/toast/index.js';
import '../../apps/mobile/src/ui/tooltip/index.js';
import '../../apps/mobile/src/ui/vstack/index.js';
import 'react-native-reanimated';
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
import '../../apps/mobile/src/Factory/DimensionsContext.js';
import useSeparator from '../../apps/mobile/src/Factory/useSeparator.js';
import 'i18next';
import 'react-i18next';
import '../../apps/mobile/src/Core/AutoComplete/index.js';
import '../../apps/mobile/src/Core/Dropdown/index.js';
import '../../apps/mobile/src/Core/MultiSelect/index.js';
import '../../apps/mobile/src/Core/Trees/components/CoreTree.js';
import '../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.js';
import '../../apps/mobile/src/Core/Trees/components/CoreToolbar.js';
import '../../apps/mobile/src/Core/Paginator/index.js';
import 'lucide-react-native';
import '../../apps/mobile/src/Core/SelectButton/index.js';
import '../../apps/mobile/src/Core/DataTable/DataTable.js';
import '../../apps/mobile/src/Core/Tag/index.js';
import '../../apps/mobile/src/Core/Badge/index.js';
import '../../apps/mobile/src/Core/ProgressBar/index.js';
import '../../apps/mobile/src/Core/Checkbox/index.js';
import '../../apps/mobile/src/Core/RadioButton/index.js';
import { useKitsTheme } from '../../contexts/Theme/KitsThemeProvider.js';

const Divider = (props) => {
  const { nativeProps } = useSeparator(props);
  const {
    align = "center",
    children,
    layout = "horizontal",
    type: borderType = "solid",
    unstyled = false,
    ...rest
  } = nativeProps;
  const { resolveToken } = useKitsTheme();
  const dividerColor = resolveToken("divider");
  const isHorizontal = layout === "horizontal";
  if (unstyled) {
    return /* @__PURE__ */ jsx(
      View,
      {
        ...rest,
        style: [
          isHorizontal ? styles.horizontal : styles.vertical,
          rest.style
        ]
      }
    );
  }
  isHorizontal ? [styles.horizontalLine, { borderBottomStyle: borderType, borderBottomColor: dividerColor }] : [styles.verticalLine, { borderLeftStyle: borderType, borderLeftColor: dividerColor }];
  if (!children) {
    return /* @__PURE__ */ jsx(
      View,
      {
        ...rest,
        style: [
          isHorizontal ? styles.horizontal : styles.vertical,
          isHorizontal ? { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: dividerColor, borderStyle: borderType } : { borderLeftWidth: StyleSheet.hairlineWidth, borderLeftColor: dividerColor, borderStyle: borderType },
          rest.style
        ]
      }
    );
  }
  const alignMap = {
    left: "flex-start",
    top: "flex-start",
    center: "center",
    right: "flex-end",
    bottom: "flex-end"
  };
  const justifyContent = alignMap[align] ?? "center";
  return /* @__PURE__ */ jsxs(
    View,
    {
      ...rest,
      style: [
        isHorizontal ? styles.horizontalWithContent : styles.verticalWithContent,
        { justifyContent },
        rest.style
      ],
      children: [
        /* @__PURE__ */ jsx(View, { style: [
          isHorizontal ? styles.lineSegment : styles.lineSegmentVertical,
          { backgroundColor: dividerColor },
          align === "left" || align === "top" ? { flex: 0, width: isHorizontal ? 24 : void 0, height: !isHorizontal ? 24 : void 0 } : { flex: 1 }
        ] }),
        /* @__PURE__ */ jsx(Text, { style: [styles.contentText, { color: resolveToken("text-secondary") }], children }),
        /* @__PURE__ */ jsx(View, { style: [
          isHorizontal ? styles.lineSegment : styles.lineSegmentVertical,
          { backgroundColor: dividerColor },
          align === "right" || align === "bottom" ? { flex: 0, width: isHorizontal ? 24 : void 0, height: !isHorizontal ? 24 : void 0 } : { flex: 1 }
        ] })
      ]
    }
  );
};
const styles = StyleSheet.create({
  horizontal: {
    width: "100%",
    flexDirection: "row"
  },
  vertical: {
    height: "100%",
    flexDirection: "column"
  },
  horizontalWithContent: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  verticalWithContent: {
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 12
  },
  horizontalLine: {
    width: "100%"
  },
  verticalLine: {
    height: "100%"
  },
  lineSegment: {
    height: StyleSheet.hairlineWidth,
    flex: 1
  },
  lineSegmentVertical: {
    width: StyleSheet.hairlineWidth,
    flex: 1
  },
  contentText: {
    fontSize: 14
  }
});

export { Divider as default };
//# sourceMappingURL=index.js.map
