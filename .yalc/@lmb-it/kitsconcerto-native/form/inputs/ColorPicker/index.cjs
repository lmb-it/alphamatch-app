'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
var ColorPicker = require('reanimated-color-picker');
var index_native = require('../../helpers/FormContainer/index.cjs');
var useFormInputController_native = require('../../helpers/useFormInputController/useFormInputController.cjs');
var index = require('../../helpers/Addons/index.cjs');
var colorPickerStyle_native = require('./colorPickerStyle.cjs');
require('../../../contexts/DialogContext.cjs');
var useComponentDefaults = require('../../../hooks/useComponentDefaults.cjs');
var useResolvedStyle = require('../../../hooks/useResolvedStyle.cjs');
var KitsThemeProvider_native = require('../../../contexts/Theme/KitsThemeProvider.cjs');

const KitsInputColorPicker = ({ ref, ...rawProps }) => {
  const { mergedProps: props, themeStyle, elementStyles } = useComponentDefaults.default("ColorPicker", rawProps, "Input");
  const resolvedThemeStyle = useResolvedStyle.default(themeStyle);
  const resolvedRootStyle = useResolvedStyle.default(elementStyles?.root || {});
  const { resolveToken } = KitsThemeProvider_native.useKitsTheme();
  const colorPickerStyle = colorPickerStyle_native.createColorPickerStyle(resolveToken);
  const {
    id,
    label,
    required,
    disabled,
    errors,
    invalid,
    helperText,
    value,
    defaultValue,
    onChange,
    leftAddon,
    rightAddon,
    colorFormat,
    // optional: may not be used directly in reanimated-color-picker
    localProps = {},
    ...rest
  } = props;
  const customSwatches = new Array(6).fill("#fff").map(() => ColorPicker.colorKit.randomRgbColor().hex());
  const [resultColor, setResultColor] = React.useState(customSwatches[0]);
  const { emitChange, onWorkletChange} = useFormInputController_native.useFormInputController({
    value,
    defaultValue,
    onChange
  });
  const onColorChange = (color) => {
    "worklet";
    onWorkletChange(color.hex);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
    {
      id,
      label,
      helperText,
      errors,
      invalid,
      disabled,
      required,
      elementStyles,
      children: /* @__PURE__ */ jsxRuntime.jsx(index.default, { leftAddon, rightAddon, invalid: !!invalid, children: /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: { width: "100%", ...resolvedRootStyle && Object.keys(resolvedRootStyle).length > 0 ? resolvedRootStyle : resolvedThemeStyle }, children: /* @__PURE__ */ jsxRuntime.jsxs(
        ColorPicker,
        {
          value: resultColor,
          sliderThickness: 25,
          thumbSize: 24,
          thumbShape: "circle",
          onChange: onColorChange,
          onCompleteJS: (color) => emitChange(color.hex),
          style: colorPickerStyle.picker,
          boundedThumb: true,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(ColorPicker.Panel1, { style: colorPickerStyle.panelStyle }),
            /* @__PURE__ */ jsxRuntime.jsx(ColorPicker.HueSlider, { style: colorPickerStyle.sliderStyle }),
            /* @__PURE__ */ jsxRuntime.jsx(ColorPicker.OpacitySlider, { style: colorPickerStyle.sliderStyle }),
            /* @__PURE__ */ jsxRuntime.jsx(
              ColorPicker.Swatches,
              {
                style: colorPickerStyle.swatchesContainer,
                swatchStyle: colorPickerStyle.swatchStyle,
                colors: customSwatches
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(ColorPicker.PreviewText, { style: colorPickerStyle.previewTxt, colorFormat: "hwba" })
          ]
        }
      ) }) })
    }
  );
};

exports.default = KitsInputColorPicker;
//# sourceMappingURL=index.cjs.map
