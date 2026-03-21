import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useCallback, useImperativeHandle, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import Animated, { SlideInUp, SlideInDown, SlideOutUp, SlideOutDown, FadeOut, FadeIn, Layout } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKitsTheme } from '../../contexts/Theme/KitsThemeProvider.js';
import Text from '../../primitives/Text/index.js';

let toastIdCounter = 0;
const LIFE = 3e3;
const SIZE_CONFIG = {
  sm: { paddingV: 8, paddingH: 10, summarySize: 12, bodySize: 10, accentWidth: 3, closeSize: 14, minW: 200 },
  md: { paddingV: 12, paddingH: 14, summarySize: 14, bodySize: 12, accentWidth: 4, closeSize: 16, minW: 280 },
  lg: { paddingV: 16, paddingH: 18, summarySize: 16, bodySize: 14, accentWidth: 5, closeSize: 18, minW: 320 }
};
const KitsToast = ({ ref }) => {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(/* @__PURE__ */ new Map());
  const { resolveToken } = useKitsTheme();
  const insets = useSafeAreaInsets();
  const severityColors = {
    success: resolveToken("green.500"),
    info: resolveToken("blue.500"),
    warn: resolveToken("yellow.500"),
    error: resolveToken("red.500"),
    loading: resolveToken("blue.500"),
    brand: resolveToken("primary")
  };
  const surfaceColor = resolveToken("surface-card");
  const textColor = resolveToken("text");
  const borderColor = resolveToken("border");
  const removeToast = useCallback((id) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const toast = useCallback((severity, summary, body = "", position = "bottom-center", _isUpdate = false, size = "md") => {
    const id = ++toastIdCounter;
    const item = { id, severity, summary, body, position, size, sticky: severity === "loading" };
    setToasts((prev) => [...prev, item]);
    if (!item.sticky) {
      const timer = setTimeout(() => removeToast(id), LIFE);
      timersRef.current.set(id, timer);
    }
  }, [removeToast]);
  const dismiss = useCallback((position) => {
    setToasts((prev) => {
      const toRemove = position ? prev.filter((t) => t.position === position) : prev;
      toRemove.forEach((t) => {
        const timer = timersRef.current.get(t.id);
        if (timer) {
          clearTimeout(timer);
          timersRef.current.delete(t.id);
        }
      });
      return position ? prev.filter((t) => t.position !== position) : [];
    });
  }, []);
  const dismissAll = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current.clear();
    setToasts([]);
  }, []);
  useImperativeHandle(ref, () => ({ toast, dismiss, dismissAll }));
  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);
  if (toasts.length === 0) return null;
  const getAlignment = (position) => {
    if (position.endsWith("-left")) return "flex-start";
    if (position.endsWith("-right")) return "flex-end";
    return "center";
  };
  const isTop = (position) => position.startsWith("top");
  return /* @__PURE__ */ jsx(View, { style: StyleSheet.absoluteFill, pointerEvents: "box-none", children: toasts.map((item) => {
    const top = isTop(item.position);
    const align = getAlignment(item.position);
    const entering = top ? SlideInUp.duration(300) : SlideInDown.duration(300);
    const exiting = top ? SlideOutUp.duration(200) : SlideOutDown.duration(200);
    const s = SIZE_CONFIG[item.size] ?? SIZE_CONFIG.md;
    const accentColor = severityColors[item.severity] ?? severityColors.info;
    return /* @__PURE__ */ jsx(
      Animated.View,
      {
        entering,
        exiting,
        layout: Layout.duration(200),
        style: [
          styles.toastWrapper,
          {
            alignItems: align,
            ...top ? { top: insets.top + 8 } : { bottom: insets.bottom + 8 }
          }
        ],
        pointerEvents: "box-none",
        children: /* @__PURE__ */ jsxs(
          Animated.View,
          {
            entering: FadeIn.duration(200),
            exiting: FadeOut.duration(150),
            style: [
              styles.toast,
              {
                backgroundColor: surfaceColor,
                borderColor,
                minWidth: s.minW
              }
            ],
            children: [
              /* @__PURE__ */ jsx(View, { style: [styles.accentBar, { backgroundColor: accentColor, width: s.accentWidth }] }),
              /* @__PURE__ */ jsxs(View, { style: [styles.content, { paddingVertical: s.paddingV, paddingHorizontal: s.paddingH, gap: s.paddingH * 0.7 }], children: [
                item.severity === "loading" && /* @__PURE__ */ jsx(ActivityIndicator, { size: "small", color: accentColor }),
                /* @__PURE__ */ jsxs(View, { style: styles.textContainer, children: [
                  /* @__PURE__ */ jsx(Text, { style: { fontWeight: "600", fontSize: s.summarySize, color: textColor }, children: item.summary }),
                  !!item.body && /* @__PURE__ */ jsx(Text, { style: { fontSize: s.bodySize, marginTop: 2, color: textColor, opacity: 0.7 }, children: item.body })
                ] }),
                /* @__PURE__ */ jsx(Pressable, { onPress: () => removeToast(item.id), hitSlop: 8, children: /* @__PURE__ */ jsx(Text, { style: { fontSize: s.closeSize, fontWeight: "bold", color: textColor, opacity: 0.4 }, children: "\u2715" }) })
              ] })
            ]
          }
        )
      },
      item.id
    );
  }) });
};
const styles = StyleSheet.create({
  toastWrapper: {
    position: "absolute",
    left: 16,
    right: 16,
    zIndex: 9999
  },
  toast: {
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6
  },
  accentBar: {},
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  textContainer: {
    flex: 1
  }
});

export { KitsToast as default };
//# sourceMappingURL=index.js.map
