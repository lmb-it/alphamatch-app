import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import Animated, { ZoomIn, FadeIn } from 'react-native-reanimated';
import { useSeverityColors, useAllSeverityColors } from '../../../Hooks/useSeverityColors.js';
import { useKitsTheme } from '../../../Contexts/Theme/KitsThemeProvider.js';
import { Icon } from '../../Atoms/Icon/index.js';
import Text from '../UI/Text/index.js';

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
  const { resolveToken, theme } = useKitsTheme();
  const colors = useSeverityColors(type);
  const allColors = useAllSeverityColors();
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
    return /* @__PURE__ */ jsx(Modal, { visible: true, transparent: true, animationType: "none", onRequestClose: hide, children: /* @__PURE__ */ jsxs(Animated.View, { entering: FadeIn.duration(200), style: styles.overlay, children: [
      /* @__PURE__ */ jsx(Pressable, { style: StyleSheet.absoluteFill, onPress: hide }),
      /* @__PURE__ */ jsx(
        Animated.View,
        {
          entering: ZoomIn.springify().damping(40).stiffness(300),
          style: [styles.panel, { backgroundColor: surfaceColor, minWidth: 250, maxWidth: 380 }],
          children: content
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsx(Modal, { visible: true, transparent: true, animationType: "none", onRequestClose: hide, children: /* @__PURE__ */ jsxs(Animated.View, { entering: FadeIn.duration(200), style: styles.overlay, children: [
    /* @__PURE__ */ jsx(Pressable, { style: StyleSheet.absoluteFill, onPress: hide }),
    /* @__PURE__ */ jsxs(View, { style: styles.cardStack, children: [
      showIcon && /* @__PURE__ */ jsx(
        Animated.View,
        {
          entering: ZoomIn.springify().damping(60).stiffness(500).delay(100),
          style: [styles.iconBubble, { backgroundColor: colors.iconBg }],
          children: brandLogo ? brandLogo : typeof icon === "string" ? /* @__PURE__ */ jsx(Icon, { name: icon, size: "xl", color: colors.iconFg }) : icon
        }
      ),
      /* @__PURE__ */ jsxs(
        Animated.View,
        {
          entering: ZoomIn.springify().damping(60).stiffness(500),
          style: [
            styles.panel,
            {
              backgroundColor: panelBg,
              paddingTop: showIcon ? 48 : 24,
              gap: 10
            }
          ],
          children: [
            /* @__PURE__ */ jsx(Pressable, { style: styles.closeBtn, onPress: hide, hitSlop: 12, children: /* @__PURE__ */ jsx(Text, { style: { fontSize: 18, color: subtextColor }, children: "\u2715" }) }),
            header != null && /* @__PURE__ */ jsx(Text, { style: [styles.header, { color: textColor }], children: header }),
            message != null && /* @__PURE__ */ jsx(Text, { style: [styles.message, { color: subtextColor }], children: message }),
            children,
            /* @__PURE__ */ jsx(View, { style: styles.buttonRow, children: buttons?.length ? buttons.map((b, i) => {
              const btnColor = allColors[b.type ?? type]?.solid ?? colors.solid;
              return /* @__PURE__ */ jsx(
                Pressable,
                {
                  disabled: b.disabled,
                  style: [
                    styles.actionBtn,
                    b.outlined ? { backgroundColor: "transparent", borderColor: btnColor, borderWidth: 1.5 } : { backgroundColor: btnColor },
                    b.rounded && { borderRadius: 999 },
                    b.disabled && { opacity: 0.5 }
                  ],
                  onPress: () => b.onClick(hide, accept, reject),
                  children: /* @__PURE__ */ jsx(Text, { style: {
                    color: b.outlined ? btnColor : "#fff",
                    fontWeight: "600",
                    fontSize: 14
                  }, children: b.title })
                },
                i
              );
            }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                Pressable,
                {
                  style: [styles.actionBtn, { backgroundColor: colors.solid, flex: 1 }],
                  onPress: () => doClick(accept),
                  children: /* @__PURE__ */ jsx(Text, { style: styles.btnTextPrimary, children: acceptLabel })
                }
              ),
              !defaultUI && /* @__PURE__ */ jsx(
                Pressable,
                {
                  style: [styles.actionBtn, styles.actionBtnOutlined, { borderColor: colors.solid, flex: 1 }],
                  onPress: () => doClick(reject),
                  children: /* @__PURE__ */ jsx(Text, { style: [styles.btnTextOutlined, { color: colors.solid }], children: rejectLabel })
                }
              )
            ] }) })
          ]
        }
      )
    ] })
  ] }) });
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 28
  },
  cardStack: {
    minWidth: 250,
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
    alignSelf: "stretch",
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

export { KitsConfirm as default };
//# sourceMappingURL=index.js.map
