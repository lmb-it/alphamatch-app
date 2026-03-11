import { jsx } from 'react/jsx-runtime';
import { useMemo, useRef } from 'react';
import KitsContainer from '../../Helpers/FormContainer/index.js';
import 'axios';
import useSelectionController from '../../../../../Hooks/useSelectionController.js';
import '../../../../../Contexts/DialogContext.js';
import '../../../../../Hooks/useKeyboardNavigation.js';
import '../../KitsSelect/SelectContext.js';
import Flex from '../../../UI/Flex/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';
import RadioButton from './radiobutton.js';

const KitsRadio = ({
  id,
  label,
  required,
  errors,
  hideError,
  isFloatedLabel,
  helperText,
  item,
  value,
  defaultValue,
  onChange,
  appearanceMode = "vertical",
  disabled,
  invalid
}) => {
  const items = useMemo(
    () => Array.isArray(item) ? item : [item],
    [item]
  );
  const lastToggledIndex = useRef(null);
  const controller = useSelectionController({
    mode: "single",
    value,
    defaultValue,
    onChange: (selectedValue) => {
      const index = lastToggledIndex.current;
      if (index == null) return;
      const currentItem = items[index];
      if (currentItem)
        onChange?.(selectedValue === currentItem?.value, {
          item: currentItem,
          index,
          value: currentItem.value
        });
    }
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
      children: /* @__PURE__ */ jsx(Flex, { flexDirection: direction, gap: 10, children: items.map((it, index) => {
        const selected = controller.isSelected(it);
        return /* @__PURE__ */ jsx(
          RadioButton,
          {
            item: it,
            selected,
            disabled,
            isInvalid: invalid,
            onToggle: () => {
              lastToggledIndex.current = index;
              controller.onChange(it);
            }
          },
          String(it.value)
        );
      }) })
    }
  );
};

export { KitsRadio as default };
//# sourceMappingURL=radio.js.map
