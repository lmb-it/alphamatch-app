'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var reactNative = require('react-native');
var Animated = require('react-native-reanimated');
var useSeverityColors = require('../../../Hooks/useSeverityColors.cjs');
var KitsThemeProvider_native = require('../../../Contexts/Theme/KitsThemeProvider.cjs');
var index_native$1 = require('../UI/Text/index.cjs');
var index_native = require('../../Atoms/Icon/index.cjs');

function KitsDialogControlled({ state, onHide }) {
  const { children, onClose, asyncClose, type, icon, ...rest } = state;
  const { resolveToken, theme } = KitsThemeProvider_native.useKitsTheme();
  const colors = type ? useSeverityColors.useSeverityColors(type) : null;
  const surfaceColor = resolveToken("surface-card");
  const textColor = resolveToken("text");
  const borderColor = colors?.border ?? resolveToken("border");
  const subtextColor = resolveToken("gray.500");
  const brandLogo = type === "brand" ? theme.config.logo : null;
  const hide = async () => {
    if (asyncClose && typeof onClose === "function") {
      await onClose();
    } else {
      onClose?.();
    }
    onHide();
  };
  if (!state.visible) return null;
  const content = typeof children === "function" ? children(hide) : children;
  return /* @__PURE__ */ jsxRuntime.jsx(reactNative.Modal, { visible: true, transparent: true, animationType: "none", onRequestClose: hide, children: /* @__PURE__ */ jsxRuntime.jsxs(Animated.View, { entering: Animated.FadeIn.duration(200), style: styles.overlay, children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactNative.Pressable, { style: reactNative.StyleSheet.absoluteFill, onPress: hide }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      Animated.View,
      {
        entering: Animated.ZoomIn.springify().damping(40).stiffness(300),
        style: [
          styles.panel,
          { backgroundColor: surfaceColor, borderColor },
          rest.contentStyle
        ],
        children: [
          colors && /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: { height: 4, backgroundColor: colors.solid, borderTopLeftRadius: 16, borderTopRightRadius: 16 } }),
          rest.header != null && /* @__PURE__ */ jsxRuntime.jsxs(reactNative.View, { style: [styles.header, { borderBottomColor: borderColor }], children: [
            (icon || brandLogo) && colors && /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: {
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: colors.iconBg,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12
            }, children: brandLogo ? brandLogo : typeof icon === "string" ? /* @__PURE__ */ jsxRuntime.jsx(index_native.Icon, { name: icon, size: "lg", color: colors.iconFg }) : icon }),
            /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, { style: { fontSize: 18, fontWeight: "700", color: textColor, flex: 1 }, children: rest.header }),
            /* @__PURE__ */ jsxRuntime.jsx(reactNative.Pressable, { onPress: hide, hitSlop: 8, children: /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, { style: { fontSize: 18, color: subtextColor }, children: "\u2715" }) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(
            reactNative.ScrollView,
            {
              style: styles.body,
              contentContainerStyle: styles.bodyContent,
              showsVerticalScrollIndicator: false,
              children: content
            }
          ),
          rest.footer != null && /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: [styles.footer, { borderTopColor: borderColor }], children: rest.footer })
        ]
      }
    )
  ] }) });
}
const styles = reactNative.StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24
  },
  panel: {
    borderRadius: 16,
    borderWidth: 1,
    minWidth: 250,
    maxWidth: "90%",
    maxHeight: "80%",
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1
  },
  body: {
    maxHeight: 400
  },
  bodyContent: {
    padding: 20
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    gap: 8
  }
});

exports.default = KitsDialogControlled;
//# sourceMappingURL=index.cjs.map
