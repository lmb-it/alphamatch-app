'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var reactNative = require('react-native');
var Animated = require('react-native-reanimated');
var useSeverityColors = require('../../../Hooks/useSeverityColors.cjs');
var KitsThemeProvider_native = require('../../../Contexts/Theme/KitsThemeProvider.cjs');
var index_native = require('../../Atoms/Icon/index.cjs');
var index_native$1 = require('../UI/Text/index.cjs');

function KitsConfirm(props) {
  const {
    visible,
    header,
    message,
    icon,
    type = "secondary",
    accept,
    reject,
    acceptLabel = "Accept",
    rejectLabel = "Reject",
    buttons,
    headless,
    defaultUI,
    async: asyncMode,
    onHide,
    content,
    children,
    ...rest
  } = props;
  const { resolveToken, theme } = KitsThemeProvider_native.useKitsTheme();
  const colors = useSeverityColors.useSeverityColors(type);
  const allColors = useSeverityColors.useAllSeverityColors();
  const surfaceColor = resolveToken("surface-card");
  const textColor = resolveToken("text");
  const subtextColor = resolveToken("gray.500");
  const brandLogo = type === "brand" ? theme.config.logo : null;
  if (!visible) return null;
  const hide = () => onHide?.("hide");
  const doClick = async (callback) => {
    if (asyncMode) {
      await callback?.();
      hide();
    } else {
      hide();
      callback?.();
    }
  };
  const showIcon = icon != null || brandLogo != null;
  const panelBg = type !== "secondary" ? colors.bgTint : surfaceColor;
  if (content) {
    return /* @__PURE__ */ jsxRuntime.jsx(reactNative.Modal, { visible: true, transparent: true, animationType: "none", onRequestClose: hide, children: /* @__PURE__ */ jsxRuntime.jsxs(Animated.View, { entering: Animated.FadeIn.duration(200), style: styles.overlay, children: [
      /* @__PURE__ */ jsxRuntime.jsx(reactNative.Pressable, { style: reactNative.StyleSheet.absoluteFill, onPress: hide }),
      /* @__PURE__ */ jsxRuntime.jsx(
        Animated.View,
        {
          entering: Animated.ZoomIn.springify().damping(40).stiffness(300),
          style: [styles.panel, { backgroundColor: surfaceColor }],
          children: content
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(reactNative.Modal, { visible: true, transparent: true, animationType: "none", onRequestClose: hide, children: /* @__PURE__ */ jsxRuntime.jsxs(Animated.View, { entering: Animated.FadeIn.duration(200), style: styles.overlay, children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactNative.Pressable, { style: reactNative.StyleSheet.absoluteFill, onPress: hide }),
    /* @__PURE__ */ jsxRuntime.jsxs(reactNative.View, { style: styles.cardStack, children: [
      showIcon && /* @__PURE__ */ jsxRuntime.jsx(
        Animated.View,
        {
          entering: Animated.ZoomIn.springify().damping(60).stiffness(500).delay(100),
          style: [styles.iconBubble, { backgroundColor: colors.iconBg }],
          children: brandLogo ? brandLogo : typeof icon === "string" ? /* @__PURE__ */ jsxRuntime.jsx(index_native.Icon, { name: icon, size: "xl", color: colors.iconFg }) : icon
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(
        Animated.View,
        {
          entering: Animated.ZoomIn.springify().damping(60).stiffness(500),
          style: [
            styles.panel,
            {
              backgroundColor: panelBg,
              paddingTop: showIcon ? 48 : 24,
              gap: 10
            }
          ],
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(reactNative.Pressable, { style: styles.closeBtn, onPress: hide, hitSlop: 12, children: /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, { style: { fontSize: 18, color: subtextColor }, children: "\u2715" }) }),
            header != null && /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, { style: [styles.header, { color: textColor }], children: header }),
            message != null && /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, { style: [styles.message, { color: subtextColor }], children: message }),
            children,
            /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: styles.buttonRow, children: buttons?.length ? buttons.map((b, i) => {
              const btnColor = allColors[b.type ?? type]?.solid ?? colors.solid;
              return /* @__PURE__ */ jsxRuntime.jsx(
                reactNative.Pressable,
                {
                  disabled: b.disabled,
                  style: [
                    styles.actionBtn,
                    b.outlined ? { backgroundColor: "transparent", borderColor: btnColor, borderWidth: 1.5 } : { backgroundColor: btnColor },
                    b.rounded && { borderRadius: 999 },
                    b.disabled && { opacity: 0.5 }
                  ],
                  onPress: () => b.onClick(hide, accept, reject),
                  children: /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, { style: {
                    color: b.outlined ? btnColor : "#fff",
                    fontWeight: "600",
                    fontSize: 14
                  }, children: b.title })
                },
                i
              );
            }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                reactNative.Pressable,
                {
                  style: [styles.actionBtn, { backgroundColor: colors.solid, flex: 1 }],
                  onPress: () => doClick(accept),
                  children: /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, { style: styles.btnTextPrimary, children: acceptLabel })
                }
              ),
              !defaultUI && /* @__PURE__ */ jsxRuntime.jsx(
                reactNative.Pressable,
                {
                  style: [styles.actionBtn, styles.actionBtnOutlined, { borderColor: colors.solid, flex: 1 }],
                  onPress: () => doClick(reject),
                  children: /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, { style: [styles.btnTextOutlined, { color: colors.solid }], children: rejectLabel })
                }
              )
            ] }) })
          ]
        }
      )
    ] })
  ] }) });
}
const styles = reactNative.StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 28
  },
  cardStack: {
    width: "100%",
    maxWidth: 380,
    alignItems: "center"
  },
  iconBubble: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    marginBottom: -36,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8
  },
  panel: {
    width: "100%",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingBottom: 24,
    elevation: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    alignItems: "center"
  },
  closeBtn: {
    position: "absolute",
    top: 12,
    right: 14,
    zIndex: 3
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    width: "100%"
  },
  actionBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center"
  },
  actionBtnOutlined: {
    backgroundColor: "transparent",
    borderWidth: 1.5
  },
  btnTextPrimary: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14
  },
  btnTextOutlined: {
    fontWeight: "600",
    fontSize: 14
  }
});

exports.default = KitsConfirm;
//# sourceMappingURL=index.cjs.map
