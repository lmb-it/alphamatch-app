import { jsx, jsxs } from 'react/jsx-runtime';
import { useRef } from 'react';
import KitsContainer from '../../Helpers/FormContainer/index.js';
import 'axios';
import useSelectionController from '../../../../../Hooks/useSelectionController.js';
import '../../../../../Contexts/DialogContext.js';
import CheckboxButton from './checkbox.js';
import '../../KitsSelect/SelectContext.js';
import Flex from '../../../UI/Flex/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

const KitsCheckbox = ({
  id,
  label,
  required,
  errors,
  hideError,
  isFloatedLabel,
  helperText,
  item,
  value,
  checked,
  defaultValue,
  onChange,
  limit,
  appearanceMode = "vertical",
  disabled,
  invalid
}) => {
  const lastToggledIndex = useRef(null);
  const controller = useSelectionController(checked != void 0 ? {
    mode: "boolean",
    value: checked,
    defaultValue,
    onChange
  } : {
    mode: "multiple",
    value,
    defaultValue,
    onChange
  });
  const direction = appearanceMode === "horizontal" ? "row" : "column";
  return /* @__PURE__ */ jsx(
    KitsContainer,
    {
      id,
      helperText,
      isFloatedLabel,
      errors,
      invalid,
      label,
      hideError,
      required,
      disabled,
      children: /* @__PURE__ */ jsxs(Flex, { id, flexDirection: direction, gap: "1rem", children: [
        !Array.isArray(item) && /* @__PURE__ */ jsx(
          CheckboxButton,
          {
            item,
            selected: !!checked,
            disabled,
            isInvalid: invalid,
            onToggle: () => {
              controller.onChange(item);
            }
          },
          String(item.value)
        ),
        Array.isArray(item) && item.map((it, index) => {
          return /* @__PURE__ */ jsx(
            CheckboxButton,
            {
              item: it,
              selected: controller.isSelected(it),
              disabled,
              isInvalid: invalid,
              onToggle: () => {
                lastToggledIndex.current = index;
                controller.onChange(it);
              }
            },
            String(it.value)
          );
        })
      ] })
    }
  );
};

export { KitsCheckbox as default };
//# sourceMappingURL=index.js.map
