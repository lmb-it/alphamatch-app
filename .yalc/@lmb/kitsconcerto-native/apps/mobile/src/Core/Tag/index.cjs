'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
require('../../ui/accordion/index.cjs');
require('../../ui/actionsheet/index.cjs');
require('../../ui/alert/index.cjs');
require('../../ui/alert-dialog/index.cjs');
require('../../ui/avatar/index.cjs');
require('../../ui/badge/index.cjs');
require('../../ui/bottomsheet/index.cjs');
var index = require('../../ui/box/index.cjs');
require('../../ui/button/index.cjs');
require('../../ui/card/index.cjs');
require('../../ui/center/index.cjs');
require('../../ui/checkbox/index.cjs');
require('../../ui/divider/index.cjs');
require('../../ui/drawer/index.cjs');
require('../../ui/fab/index.cjs');
require('../../ui/form-control/index.cjs');
require('../../ui/gluestack-ui-provider/config.cjs');
require('@gluestack-ui/core/overlay/creator');
require('@gluestack-ui/core/toast/creator');
require('nativewind');
require('../../ui/grid/index.cjs');
require('../../ui/heading/index.cjs');
require('../../ui/hstack/index.cjs');
require('../../ui/icon/index.cjs');
require('../../ui/image/index.cjs');
require('../../ui/image-background/index.cjs');
require('../../ui/input/index.cjs');
require('../../ui/link/index.cjs');
require('../../ui/menu/index.cjs');
require('../../ui/modal/index.cjs');
require('../../ui/popover/index.cjs');
require('../../ui/portal/index.cjs');
require('../../ui/pressable/index.cjs');
require('../../ui/progress/index.cjs');
require('../../ui/radio/index.cjs');
require('react-native-safe-area-context');
require('../../ui/select/index.cjs');
require('../../ui/skeleton/index.cjs');
require('../../ui/slider/index.cjs');
require('../../ui/spinner/index.cjs');
require('../../ui/switch/index.cjs');
require('../../ui/table/index.cjs');
require('../../ui/text/index.cjs');
require('../../ui/textarea/index.cjs');
require('../../ui/toast/index.cjs');
require('../../ui/tooltip/index.cjs');
require('../../ui/vstack/index.cjs');
var style = require('../../Factory/helpers/style.cjs');

const severityStyles = (severity, unstyled) => {
  if (unstyled) return {};
  switch (severity) {
    case "success":
      return { backgroundColor: style.resolveThemeTokenForNative("green.600"), color: "#fff" };
    case "warning":
      return { backgroundColor: style.resolveThemeTokenForNative("yellow.400"), color: "#000" };
    case "info":
      return { backgroundColor: style.resolveThemeTokenForNative("blue.600"), color: "#fff" };
    case "danger":
      return { backgroundColor: style.resolveThemeTokenForNative("red.600"), color: "#fff" };
    case "contrast":
      return { backgroundColor: "#000", color: "#fff" };
    case "secondary":
      return { backgroundColor: style.resolveThemeTokenForNative("gray.600"), color: "#fff" };
    default:
      return { backgroundColor: style.resolveThemeTokenForNative("gray.200"), color: "#000" };
  }
};
const Tag = React.forwardRef((props, ref) => {
  const {
    value,
    children,
    icon,
    severity = null,
    rounded = false,
    unstyled = false,
    style,
    testID
  } = props;
  const rootRef = React.useRef(null);
  React.useImperativeHandle(ref, () => ({
    getElement: () => rootRef.current
  }));
  const content = children ?? value;
  const resolvedIcon = React.useMemo(() => {
    if (!icon) return null;
    return typeof icon === "function" ? icon({ props }) : icon;
  }, [icon, props]);
  const colors = severityStyles(severity, unstyled);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    index.Box,
    {
      ref: rootRef,
      testID,
      style: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: rounded ? 999 : 6,
        backgroundColor: colors.backgroundColor,
        ...style
      },
      children: [
        resolvedIcon ? /* @__PURE__ */ jsxRuntime.jsx(index.Box, { style: { marginRight: 6 }, children: resolvedIcon }) : null,
        typeof content === "string" || typeof content === "number" ? /* @__PURE__ */ jsxRuntime.jsx(
          reactNative.Text,
          {
            style: {
              fontSize: 12,
              fontWeight: "600",
              color: colors.color
            },
            children: content
          }
        ) : content
      ]
    }
  );
});
Tag.displayName = "Tag";

exports.Tag = Tag;
//# sourceMappingURL=index.cjs.map
