'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var index_native$1 = require('../KitsInput/InputText/index.cjs');
var index_native$2 = require('../KitsInput/InputTextarea/index.cjs');
require('axios');
require('../../../../Contexts/DialogContext.cjs');
require('../../../../Hooks/useKeyboardNavigation.cjs');
require('../KitsSelect/SelectContext.cjs');
var index = require('../../UI/Flex/index.cjs');
var index_native = require('../../UI/Text/index.cjs');
var Button_native = require('../../Button/Button.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

const Editable = ({
  defaultValue = "",
  value,
  onChange,
  onSubmit,
  activationMode = "click",
  disabled = false,
  type = "input",
  previewProps,
  inputProps,
  textareaProps,
  controls
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const val = value ?? internalValue;
  const startEditing = () => {
    if (!disabled) setIsEditing(true);
  };
  const stopEditing = React.useCallback(() => {
    setIsEditing(false);
    onSubmit?.(val);
    onChange?.(val);
  }, [val, onSubmit, onChange]);
  const cancelEditing = React.useCallback(() => {
    setIsEditing(false);
    setInternalValue(defaultValue);
  }, [defaultValue]);
  const handleInputChange = (e) => {
    setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(index.default, { flexDirection: "column", justifyContent: "flex-start", gap: 10, position: "relative", children: [
    !isEditing && /* @__PURE__ */ jsxRuntime.jsx(
      index_native.default,
      {
        onPress: activationMode === "click" ? startEditing : void 0,
        onLongPress: activationMode === "dblclick" ? startEditing : void 0,
        disabled,
        ...previewProps,
        children: val
      }
    ),
    isEditing && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      type === "input" ? /* @__PURE__ */ jsxRuntime.jsx(
        index_native$1.default,
        {
          autoFocus: true,
          attached: true,
          value: val,
          onChange: handleInputChange,
          onSubmitEditing: stopEditing,
          onKeyDown: (e) => {
            if (e && "code" in e && e.code == "Escape") {
              cancelEditing();
            }
          },
          ...inputProps
        }
      ) : /* @__PURE__ */ jsxRuntime.jsx(
        index_native$2.default,
        {
          autoFocus: true,
          value: val,
          onChange: handleInputChange,
          onSubmitEditing: stopEditing,
          onKeyDown: (e) => {
            if (e && "code" in e && e.code == "Escape") {
              cancelEditing();
            }
          },
          ...textareaProps
        }
      ),
      controls ? controls({
        submit: stopEditing,
        cancel: cancelEditing
      }) : /* @__PURE__ */ jsxRuntime.jsxs(index.default, { flexDirection: "row", gap: 8, justifyContent: "flex-end", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          Button_native.Button,
          {
            onPress: cancelEditing,
            severity: "danger",
            icon: "pi pi-times",
            size: "sm"
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          Button_native.Button,
          {
            onPress: stopEditing,
            icon: "pi pi-check",
            size: "sm"
          }
        )
      ] })
    ] })
  ] });
};

exports.default = Editable;
//# sourceMappingURL=index.cjs.map
