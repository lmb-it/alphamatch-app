import { jsx } from 'react/jsx-runtime';
import { View, StyleSheet } from 'react-native';

const SIZES = { sm: 18, md: 22, lg: 28 };
const BORDER_RADII = { sm: 3, md: 4, lg: 5 };
function CheckboxIndicator({
  checked,
  disabled,
  invalid,
  size = "md",
  borderColor = "#d1d5db",
  checkedBorderColor = "#6366f1",
  checkedBackgroundColor = "#6366f1",
  checkmarkColor = "#ffffff",
  invalidBorderColor = "#ef4444",
  backgroundColor = "#ffffff"
}) {
  const s = SIZES[size];
  const r = BORDER_RADII[size];
  const checkSize = s * 0.5;
  const finalBorderColor = invalid ? invalidBorderColor : checked ? checkedBorderColor : borderColor;
  const finalBackgroundColor = checked ? checkedBackgroundColor : backgroundColor;
  return /* @__PURE__ */ jsx(
    View,
    {
      style: [
        styles.box,
        {
          width: s,
          height: s,
          borderRadius: r,
          borderColor: finalBorderColor,
          backgroundColor: finalBackgroundColor,
          opacity: disabled ? 0.5 : 1
        }
      ],
      children: checked && /* @__PURE__ */ jsx(
        View,
        {
          style: [
            styles.checkmark,
            {
              width: checkSize,
              height: checkSize * 0.6,
              borderColor: checkmarkColor
            }
          ]
        }
      )
    }
  );
}
const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  checkmark: {
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: "-45deg" }, { translateY: -1 }]
  }
});

export { CheckboxIndicator as default };
//# sourceMappingURL=index.js.map
