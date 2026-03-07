import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { View } from 'react-native';
import ColorPicker, { colorKit, Panel1, HueSlider, OpacitySlider, Swatches, PreviewText } from 'reanimated-color-picker';
import KitsContainer from '../../Helpers/FormContainer/index.js';
import { useFormInputController } from '../../Helpers/useFormInputController/useFormInputController.js';
import Addons from '../../Helpers/Addons/index.js';
import { createColorPickerStyle } from './colorPickerStyle.js';
import '../../../../../Contexts/DialogContext.js';
import useComponentDefaults from '../../../../../Hooks/useComponentDefaults.js';
import { useKitsTheme } from '../../../../../Contexts/Theme/KitsThemeProvider.js';

const KitsInputColorPicker = ({ ref, ...rawProps }) => {
  const { mergedProps: props, themeStyle } = useComponentDefaults("ColorPicker", rawProps, "Input");
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
      children: /* @__PURE__ */ jsx(Addons, { leftAddon, rightAddon, invalid: !!invalid, children: /* @__PURE__ */ jsx(View, { style: { width: "100%", ...themeStyle }, children: /* @__PURE__ */ jsxs(
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
