import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useCallback } from 'react';
import Flex from '../../layout/Flex/index.js';
import Text from '../../primitives/Text/index.js';
import KitsInputText from '../inputs/InputText/index.js';
import KitsInputTextarea from '../inputs/InputTextarea/index.js';
import { Button } from '../../components/Button/Button.js';

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
  const [isEditing, setIsEditing] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const val = value ?? internalValue;
  const startEditing = () => {
    if (!disabled) setIsEditing(true);
  };
  const stopEditing = useCallback(() => {
    setIsEditing(false);
    onSubmit?.(val);
    onChange?.(val);
  }, [val, onSubmit, onChange]);
  const cancelEditing = useCallback(() => {
    setIsEditing(false);
    setInternalValue(defaultValue);
  }, [defaultValue]);
  const handleInputChange = (e) => {
    setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };
  return /* @__PURE__ */ jsxs(Flex, { flexDirection: "column", justifyContent: "flex-start", gap: 10, position: "relative", children: [
    !isEditing && /* @__PURE__ */ jsx(
      Text,
      {
        onPress: activationMode === "click" ? startEditing : void 0,
        onLongPress: activationMode === "dblclick" ? startEditing : void 0,
        disabled,
        py: 10,
        px: 12,
        minH: "3rem",
        lineHeight: "1.5rem",
        ...previewProps,
        children: val
      }
    ),
    isEditing && /* @__PURE__ */ jsxs(Fragment, { children: [
      type === "input" ? /* @__PURE__ */ jsx(
        KitsInputText,
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
      ) : /* @__PURE__ */ jsx(
        KitsInputTextarea,
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
      }) : /* @__PURE__ */ jsxs(Flex, { flexDirection: "row", gap: 8, justifyContent: "flex-end", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            onPress: cancelEditing,
            severity: "danger",
            icon: "pi pi-times",
            size: "sm"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
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

export { Editable as default };
//# sourceMappingURL=index.js.map
