'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var DateTimePicker = require('@react-native-community/datetimepicker');
var index_native = require('../../Helpers/FormContainer/index.cjs');
var useFormInputController_native = require('../../Helpers/useFormInputController/useFormInputController.cjs');
var index$1 = require('../../Helpers/Addons/index.cjs');
require('react');
require('axios');
require('../../../../../Contexts/DialogContext.cjs');
require('../../KitsSelect/SelectContext.cjs');
var index = require('../../../UI/Flex/index.cjs');
var index_native$1 = require('../../../UI/Text/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

const KitsInputCalendar = ({ ref, ...props }) => {
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
    borderColor: invalid ? "#e24c4c" : "rgba(213, 212, 212, 1)",
    width: "100%"
  };
  const val = internalVal instanceof Date ? internalVal : /* @__PURE__ */ new Date();
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
      children: /* @__PURE__ */ jsxRuntime.jsx(index.default, { ...containerStyle, children: /* @__PURE__ */ jsxRuntime.jsx(index$1.default, { leftAddon, rightAddon, children: /* @__PURE__ */ jsxRuntime.jsxs(index.default, { alignItems: "center", w: "full", backgroundColor: "#8d8d8d", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          DateTimePicker,
          {
            value: val,
            onChange: onSelectDate,
            mode: "date",
            display: "default",
            disabled,
            ...localProps
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(index.default, { alignItems: "center", w: "full", h: "full", paddingHorizontal: 10, backgroundColor: "white", pointerEvents: "none", position: "absolute", top: 0, children: /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, { children: val.toLocaleDateString() }) })
      ] }) }) })
    }
  );
};

exports.default = KitsInputCalendar;
//# sourceMappingURL=index.cjs.map
