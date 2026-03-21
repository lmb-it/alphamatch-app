'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var DateTimePicker = require('@react-native-community/datetimepicker');
var index_native = require('../../helpers/FormContainer/index.cjs');
var useFormInputController_native = require('../../helpers/useFormInputController/useFormInputController.cjs');
var index$1 = require('../../helpers/Addons/index.cjs');
require('react');
require('../../../contexts/DialogContext.cjs');
var useComponentDefaults = require('../../../hooks/useComponentDefaults.cjs');
var useResolvedStyle = require('../../../hooks/useResolvedStyle.cjs');
var KitsThemeProvider_native = require('../../../contexts/Theme/KitsThemeProvider.cjs');
var index = require('../../../layout/Flex/index.cjs');
var index_native$1 = require('../../../primitives/Text/index.cjs');

const KitsInputCalendar = ({ ref, ...rawProps }) => {
  const { mergedProps: props, themeStyle, elementStyles } = useComponentDefaults.default("Datepicker", rawProps, "Input");
  const resolvedThemeStyle = useResolvedStyle.default(themeStyle);
  const resolvedRootStyle = useResolvedStyle.default(elementStyles?.root || {});
  const { resolveToken } = KitsThemeProvider_native.useKitsTheme();
  const {
    id,
    label,
    helperText,
    errors,
    invalid,
    required,
    hideError,
    disabled,
    isFloatedLabel,
    leftAddon,
    rightAddon,
    inputSize,
    value,
    defaultValue,
    onChange,
    localProps = {}
  } = props;
  const { value: internalVal, emitChange } = useFormInputController_native.useFormInputController({
    value,
    defaultValue,
    onChange: (event) => {
      onChange?.(event.target.value);
    }
  });
  const onSelectDate = (_event, date) => {
    if (date) emitChange(date);
  };
  const containerStyle = {
    height: 35,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 3.5,
    borderWidth: 1,
    borderColor: invalid ? resolveToken("danger") : resolveToken("border"),
    width: "100%",
    ...resolvedThemeStyle,
    ...resolvedRootStyle || {}
  };
  const val = internalVal instanceof Date ? internalVal : null;
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
    {
      id,
      helperText,
      errors,
      invalid,
      label,
      required,
      hideError,
      isFloatedLabel,
      disabled,
      elementStyles,
      children: /* @__PURE__ */ jsxRuntime.jsx(index.default, { ...containerStyle, children: /* @__PURE__ */ jsxRuntime.jsx(index$1.default, { leftAddon, rightAddon, invalid: !!invalid, children: /* @__PURE__ */ jsxRuntime.jsxs(index.default, { alignItems: "center", w: "full", backgroundColor: resolveToken("text-secondary"), children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          DateTimePicker,
          {
            value: val ?? /* @__PURE__ */ new Date(),
            onChange: onSelectDate,
            mode: "date",
            display: "default",
            disabled,
            ...localProps
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(index.default, { alignItems: "center", w: "full", h: "full", paddingHorizontal: 10, backgroundColor: containerStyle.backgroundColor ?? resolveToken("surface-card"), pointerEvents: "none", position: "absolute", top: 0, children: /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, { children: val ? val.toLocaleDateString() : "" }) })
      ] }) }) })
    }
  );
};

exports.default = KitsInputCalendar;
//# sourceMappingURL=index.cjs.map
