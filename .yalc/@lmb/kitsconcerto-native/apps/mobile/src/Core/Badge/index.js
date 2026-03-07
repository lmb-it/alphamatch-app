import { jsx } from 'react/jsx-runtime';
import { forwardRef, useRef, useImperativeHandle, useMemo } from 'react';
import { Text } from 'react-native';
import '../../ui/accordion/index.js';
import '../../ui/actionsheet/index.js';
import '../../ui/alert/index.js';
import '../../ui/alert-dialog/index.js';
import '../../ui/avatar/index.js';
import '../../ui/badge/index.js';
import '../../ui/bottomsheet/index.js';
import { Box } from '../../ui/box/index.js';
import '../../ui/button/index.js';
import '../../ui/card/index.js';
import '../../ui/center/index.js';
import '../../ui/checkbox/index.js';
import '../../ui/divider/index.js';
import '../../ui/drawer/index.js';
import '../../ui/fab/index.js';
import '../../ui/form-control/index.js';
import '../../ui/gluestack-ui-provider/config.js';
import '@gluestack-ui/core/overlay/creator';
import '@gluestack-ui/core/toast/creator';
import 'nativewind';
import '../../ui/grid/index.js';
import '../../ui/heading/index.js';
import '../../ui/hstack/index.js';
import '../../ui/icon/index.js';
import '../../ui/image/index.js';
import '../../ui/image-background/index.js';
import '../../ui/input/index.js';
import '../../ui/link/index.js';
import '../../ui/menu/index.js';
import '../../ui/modal/index.js';
import '../../ui/popover/index.js';
import '../../ui/portal/index.js';
import '../../ui/pressable/index.js';
import '../../ui/progress/index.js';
import '../../ui/radio/index.js';
import 'react-native-safe-area-context';
import '../../ui/select/index.js';
import '../../ui/skeleton/index.js';
import '../../ui/slider/index.js';
import '../../ui/spinner/index.js';
import '../../ui/switch/index.js';
import '../../ui/table/index.js';
import '../../ui/text/index.js';
import '../../ui/textarea/index.js';
import '../../ui/toast/index.js';
import '../../ui/tooltip/index.js';
import '../../ui/vstack/index.js';
import { resolveThemeTokenForNative } from '../../Factory/helpers/style.js';

const severityStyles = (severity, unstyled) => {
  if (unstyled) return {};
  switch (severity) {
    case "success":
      return { backgroundColor: resolveThemeTokenForNative("green.600"), color: "#fff" };
    case "warning":
      return { backgroundColor: resolveThemeTokenForNative("yellow.400"), color: "#000" };
    case "info":
      return { backgroundColor: resolveThemeTokenForNative("blue.600"), color: "#fff" };
    case "danger":
      return { backgroundColor: resolveThemeTokenForNative("red.600"), color: "#fff" };
    case "contrast":
      return { backgroundColor: "#000", color: "#fff" };
    case "secondary":
      return { backgroundColor: resolveThemeTokenForNative("gray.600"), color: "#fff" };
    default:
      return { backgroundColor: resolveThemeTokenForNative("gray.200"), color: "#000" };
  }
};
const sizeStyles = (size) => {
  switch (size) {
    case "large":
      return { paddingX: 8, fontSize: 12, minHeight: 20 };
    case "xlarge":
      return { paddingX: 10, fontSize: 14, minHeight: 24 };
    default:
      return { paddingX: 6, fontSize: 11, minHeight: 18 };
  }
};
const PrimeBadge = forwardRef((props, ref) => {
  const {
    value,
    children,
    severity = null,
    size = null,
    unstyled = false,
    style,
    testID
  } = props;
  const rootRef = useRef(null);
  useImperativeHandle(ref, () => ({
    getElement: () => rootRef.current
  }));
  const content = children ?? value;
  const colors = useMemo(
    () => severityStyles(severity, unstyled),
    [severity, unstyled]
  );
  const sizing = useMemo(
    () => sizeStyles(size),
    [size]
  );
  if (content === null || content === void 0) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    Box,
    {
      ref: rootRef,
      testID,
      style: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        paddingHorizontal: sizing.paddingX,
        minHeight: sizing.minHeight,
        backgroundColor: colors.backgroundColor,
        ...style
      },
      children: typeof content === "string" || typeof content === "number" ? /* @__PURE__ */ jsx(
        Text,
        {
          style: {
            fontSize: sizing.fontSize,
            fontWeight: "600",
            color: colors.color
          },
          children: content
        }
      ) : content
    }
  );
});
PrimeBadge.displayName = "PrimeBadge";

export { PrimeBadge };
//# sourceMappingURL=index.js.map
