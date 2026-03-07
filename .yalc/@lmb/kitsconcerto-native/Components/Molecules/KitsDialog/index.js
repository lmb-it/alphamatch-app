import { jsx, jsxs } from 'react/jsx-runtime';
import { Modal, Pressable, StyleSheet, View, ScrollView } from 'react-native';
import Animated, { ZoomIn, FadeIn } from 'react-native-reanimated';
import { useSeverityColors } from '../../../Hooks/useSeverityColors.js';
import { useKitsTheme } from '../../../Contexts/Theme/KitsThemeProvider.js';
import Text from '../UI/Text/index.js';
import { Icon } from '../../Atoms/Icon/index.js';

function KitsDialogControlled({ state, onHide }) {
  const { children, onClose, asyncClose, type, icon, ...rest } = state;
  const { resolveToken, theme } = useKitsTheme();
  const colors = type ? useSeverityColors(type) : null;
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
  return /* @__PURE__ */ jsx(Modal, { visible: true, transparent: true, animationType: "none", onRequestClose: hide, children: /* @__PURE__ */ jsxs(Animated.View, { entering: FadeIn.duration(200), style: styles.overlay, children: [
    /* @__PURE__ */ jsx(Pressable, { style: StyleSheet.absoluteFill, onPress: hide }),
    /* @__PURE__ */ jsxs(
      Animated.View,
      {
        entering: ZoomIn.springify().damping(40).stiffness(300),
        style: [
          styles.panel,
          { backgroundColor: surfaceColor, borderColor },
          rest.contentStyle
        ],
        children: [
          colors && /* @__PURE__ */ jsx(View, { style: { height: 4, backgroundColor: colors.solid, borderTopLeftRadius: 16, borderTopRightRadius: 16 } }),
          rest.header != null && /* @__PURE__ */ jsxs(View, { style: [styles.header, { borderBottomColor: borderColor }], children: [
            (icon || brandLogo) && colors && /* @__PURE__ */ jsx(View, { style: {
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: colors.iconBg,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12
            }, children: brandLogo ? brandLogo : typeof icon === "string" ? /* @__PURE__ */ jsx(Icon, { name: icon, size: "lg", color: colors.iconFg }) : icon }),
            /* @__PURE__ */ jsx(Text, { style: { fontSize: 18, fontWeight: "700", color: textColor, flex: 1 }, children: rest.header }),
            /* @__PURE__ */ jsx(Pressable, { onPress: hide, hitSlop: 8, children: /* @__PURE__ */ jsx(Text, { style: { fontSize: 18, color: subtextColor }, children: "\u2715" }) })
          ] }),
          /* @__PURE__ */ jsx(
            ScrollView,
            {
              style: styles.body,
              contentContainerStyle: styles.bodyContent,
              showsVerticalScrollIndicator: false,
              children: content
            }
          ),
          rest.footer != null && /* @__PURE__ */ jsx(View, { style: [styles.footer, { borderTopColor: borderColor }], children: rest.footer })
        ]
      }
    )
  ] }) });
}
const styles = StyleSheet.create({
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
    width: "100%",
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

export { KitsDialogControlled as default };
//# sourceMappingURL=index.js.map
