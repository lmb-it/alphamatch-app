import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { View } from 'react-native';
import ColorPicker, { colorKit, Panel1, HueSlider, OpacitySlider, Swatches, PreviewText } from 'reanimated-color-picker';
import KitsContainer from '../../helpers/FormContainer/index.js';
import { useFormInputController } from '../../helpers/useFormInputController/useFormInputController.js';
import Addons from '../../helpers/Addons/index.js';
import { createColorPickerStyle } from './colorPickerStyle.js';
import '../../../contexts/DialogContext.js';
import useComponentDefaults from '../../../hooks/useComponentDefaults.js';
import useResolvedStyle from '../../../hooks/useResolvedStyle.js';
import { useKitsTheme } from '../../../contexts/Theme/KitsThemeProvider.js';

const KitsInputColorPicker = ({ ref, ...rawProps }) => {
  const { mergedProps: props, themeStyle, elementStyles } = useComponentDefaults("ColorPicker", rawProps, "Input");
  const resolvedThemeStyle = useResolvedStyle(themeStyle);
  const resolvedRootStyle = useResolvedStyle(elementStyles?.root || {});
  const { resolveToken } = useKitsTheme();
  const colorPickerStyle = createColorPickerStyle(resolveToken);
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
  const customSwatches = new Array(6).fill("#fff").map(() => colorKit.randomRgbColor().hex());
  const [resultColor, setResultColor] = useState(customSwatches[0]);
  const { emitChange, onWorkletChange} = useFormInputController({
    value,
    defaultValue,
    onChange
  });
  const onColorChange = (color) => {
    "worklet";
    onWorkletChange(color.hex);
  };
  return /* @__PURE__ */ jsx(
    KitsContainer,
    {
      id,
      label,
      helperText,
      errors,
      invalid,
      disabled,
      required,
      elementStyles,
      children: /* @__PURE__ */ jsx(Addons, { leftAddon, rightAddon, invalid: !!invalid, children: /* @__PURE__ */ jsx(View, { style: { width: "100%", ...resolvedRootStyle && Object.keys(resolvedRootStyle).length > 0 ? resolvedRootStyle : resolvedThemeStyle }, children: /* @__PURE__ */ jsxs(
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
            /* @__PURE__ */ jsx(Panel1, { style: colorPickerStyle.panelStyle }),
            /* @__PURE__ */ jsx(HueSlider, { style: colorPickerStyle.sliderStyle }),
            /* @__PURE__ */ jsx(OpacitySlider, { style: colorPickerStyle.sliderStyle }),
            /* @__PURE__ */ jsx(
              Swatches,
              {
                style: colorPickerStyle.swatchesContainer,
                swatchStyle: colorPickerStyle.swatchStyle,
                colors: customSwatches
              }
            ),
            /* @__PURE__ */ jsx(PreviewText, { style: colorPickerStyle.previewTxt, colorFormat: "hwba" })
          ]
        }
      ) }) })
    }
  );
};

export { KitsInputColorPicker as default };
//# sourceMappingURL=index.js.map
