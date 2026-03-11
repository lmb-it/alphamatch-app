import { jsx } from 'react/jsx-runtime';
import { View, StyleSheet } from 'react-native';

const SIZES = { sm: 18, md: 22, lg: 28 };
const DOT_SIZES = { sm: 8, md: 10, lg: 14 };
function RadioIndicator({
  checked,
  disabled,
  invalid,
  size = "md",
  borderColor = "#d1d5db",
  checkedBorderColor = "#6366f1",
  dotColor = "#6366f1",
  invalidBorderColor = "#ef4444",
  backgroundColor = "#ffffff"
}) {
  const s = SIZES[size];
  const dot = DOT_SIZES[size];
  const finalBorderColor = invalid ? invalidBorderColor : checked ? checkedBorderColor : borderColor;
  return /* @__PURE__ */ jsx(
    View,
    {
      style: [
        styles.circle,
        {
          width: s,
          height: s,
          borderRadius: s / 2,
          borderColor: finalBorderColor,
          backgroundColor,
          opacity: disabled ? 0.5 : 1
        }
      ],
      children: checked && /* @__PURE__ */ jsx(
        View,
        {
          style: {
            width: dot,
            height: dot,
            borderRadius: dot / 2,
            backgroundColor: dotColor
          }
        }
      )
    }
  );
}
const styles = StyleSheet.create({
  circle: {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center"
  }
});

export { RadioIndicator as default };
//# sourceMappingURL=index.js.map
