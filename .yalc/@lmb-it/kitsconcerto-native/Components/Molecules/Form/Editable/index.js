import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useCallback } from 'react';
import KitsInputText from '../KitsInput/InputText/index.js';
import KitsInputTextarea from '../KitsInput/InputTextarea/index.js';
import 'axios';
import '../../../../Contexts/DialogContext.js';
import '../../../../Hooks/useKeyboardNavigation.js';
import '../KitsSelect/SelectContext.js';
import Flex from '../../UI/Flex/index.js';
import Text from '../../UI/Text/index.js';
import { Button } from '../../Button/Button.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

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
