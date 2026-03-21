'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var reactNative = require('react-native');
require('../../apps/mobile/src/ui/accordion/index.cjs');
require('../../apps/mobile/src/ui/actionsheet/index.cjs');
require('../../apps/mobile/src/ui/alert/index.cjs');
require('../../apps/mobile/src/ui/alert-dialog/index.cjs');
require('../../apps/mobile/src/ui/avatar/index.cjs');
require('../../apps/mobile/src/ui/badge/index.cjs');
require('../../apps/mobile/src/ui/bottomsheet/index.cjs');
require('../../apps/mobile/src/ui/box/index.cjs');
require('../../apps/mobile/src/ui/button/index.cjs');
require('../../apps/mobile/src/ui/card/index.cjs');
require('../../apps/mobile/src/ui/center/index.cjs');
require('../../apps/mobile/src/ui/checkbox/index.cjs');
require('../../apps/mobile/src/ui/divider/index.cjs');
require('../../apps/mobile/src/ui/drawer/index.cjs');
require('../../apps/mobile/src/ui/fab/index.cjs');
require('../../apps/mobile/src/ui/form-control/index.cjs');
require('react');
require('../../apps/mobile/src/ui/gluestack-ui-provider/config.cjs');
require('@gluestack-ui/core/overlay/creator');
require('@gluestack-ui/core/toast/creator');
require('nativewind');
require('../../apps/mobile/src/ui/grid/index.cjs');
require('../../apps/mobile/src/ui/heading/index.cjs');
require('../../apps/mobile/src/ui/hstack/index.cjs');
require('../../apps/mobile/src/ui/icon/index.cjs');
require('../../apps/mobile/src/ui/image/index.cjs');
require('../../apps/mobile/src/ui/image-background/index.cjs');
require('../../apps/mobile/src/ui/input/index.cjs');
require('../../apps/mobile/src/ui/link/index.cjs');
require('../../apps/mobile/src/ui/menu/index.cjs');
require('../../apps/mobile/src/ui/modal/index.cjs');
require('../../apps/mobile/src/ui/popover/index.cjs');
require('../../apps/mobile/src/ui/portal/index.cjs');
require('../../apps/mobile/src/ui/pressable/index.cjs');
require('../../apps/mobile/src/ui/progress/index.cjs');
require('../../apps/mobile/src/ui/radio/index.cjs');
require('react-native-safe-area-context');
require('../../apps/mobile/src/ui/select/index.cjs');
require('../../apps/mobile/src/ui/skeleton/index.cjs');
require('../../apps/mobile/src/ui/slider/index.cjs');
require('../../apps/mobile/src/ui/spinner/index.cjs');
require('../../apps/mobile/src/ui/switch/index.cjs');
require('../../apps/mobile/src/ui/table/index.cjs');
require('../../apps/mobile/src/ui/text/index.cjs');
require('../../apps/mobile/src/ui/textarea/index.cjs');
require('../../apps/mobile/src/ui/toast/index.cjs');
require('../../apps/mobile/src/ui/tooltip/index.cjs');
require('../../apps/mobile/src/ui/vstack/index.cjs');
require('react-native-reanimated');
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
require('../../apps/mobile/src/Factory/DimensionsContext.cjs');
var useSeparator = require('../../apps/mobile/src/Factory/useSeparator.cjs');
require('i18next');
require('react-i18next');
require('../../apps/mobile/src/Core/AutoComplete/index.cjs');
require('../../apps/mobile/src/Core/Dropdown/index.cjs');
require('../../apps/mobile/src/Core/MultiSelect/index.cjs');
require('../../apps/mobile/src/Core/Trees/components/CoreTree.cjs');
require('../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.cjs');
require('../../apps/mobile/src/Core/Trees/components/CoreToolbar.cjs');
require('../../apps/mobile/src/Core/Paginator/index.cjs');
require('lucide-react-native');
require('../../apps/mobile/src/Core/SelectButton/index.cjs');
require('../../apps/mobile/src/Core/DataTable/DataTable.cjs');
require('../../apps/mobile/src/Core/Tag/index.cjs');
require('../../apps/mobile/src/Core/Badge/index.cjs');
require('../../apps/mobile/src/Core/ProgressBar/index.cjs');
require('../../apps/mobile/src/Core/Checkbox/index.cjs');
require('../../apps/mobile/src/Core/RadioButton/index.cjs');
var KitsThemeProvider_native = require('../../contexts/Theme/KitsThemeProvider.cjs');

const Divider = (props) => {
  const { nativeProps } = useSeparator.default(props);
  const {
    align = "center",
    children,
    layout = "horizontal",
    type: borderType = "solid",
    unstyled = false,
    ...rest
  } = nativeProps;
  const { resolveToken } = KitsThemeProvider_native.useKitsTheme();
  const dividerColor = resolveToken("divider");
  const isHorizontal = layout === "horizontal";
  if (unstyled) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.View,
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
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.View,
      {
        ...rest,
        style: [
          isHorizontal ? styles.horizontal : styles.vertical,
          isHorizontal ? { borderBottomWidth: reactNative.StyleSheet.hairlineWidth, borderBottomColor: dividerColor, borderStyle: borderType } : { borderLeftWidth: reactNative.StyleSheet.hairlineWidth, borderLeftColor: dividerColor, borderStyle: borderType },
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
  return /* @__PURE__ */ jsxRuntime.jsxs(
    reactNative.View,
    {
      ...rest,
      style: [
        isHorizontal ? styles.horizontalWithContent : styles.verticalWithContent,
        { justifyContent },
        rest.style
      ],
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: [
          isHorizontal ? styles.lineSegment : styles.lineSegmentVertical,
          { backgroundColor: dividerColor },
          align === "left" || align === "top" ? { flex: 0, width: isHorizontal ? 24 : void 0, height: !isHorizontal ? 24 : void 0 } : { flex: 1 }
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: [styles.contentText, { color: resolveToken("text-secondary") }], children }),
        /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: [
          isHorizontal ? styles.lineSegment : styles.lineSegmentVertical,
          { backgroundColor: dividerColor },
          align === "right" || align === "bottom" ? { flex: 0, width: isHorizontal ? 24 : void 0, height: !isHorizontal ? 24 : void 0 } : { flex: 1 }
        ] })
      ]
    }
  );
};
const styles = reactNative.StyleSheet.create({
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
    height: reactNative.StyleSheet.hairlineWidth,
    flex: 1
  },
  lineSegmentVertical: {
    width: reactNative.StyleSheet.hairlineWidth,
    flex: 1
  },
  contentText: {
    fontSize: 14
  }
});

exports.default = Divider;
//# sourceMappingURL=index.cjs.map
