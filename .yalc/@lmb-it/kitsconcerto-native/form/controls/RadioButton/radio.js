import { jsx } from 'react/jsx-runtime';
import { useMemo, useRef } from 'react';
import useSelectionController from '../../../hooks/useSelectionController.js';
import '../../../contexts/DialogContext.js';
import useComponentDefaults from '../../../hooks/useComponentDefaults.js';
import RadioButton from './radiobutton.js';
import KitsContainer from '../../helpers/FormContainer/index.js';
import Flex from '../../../layout/Flex/index.js';

const KitsRadio = ({
  ref,
  ...rawProps
}) => {
  const { mergedProps: props, themeStyle, elementStyles } = useComponentDefaults("Radio", rawProps, "Input");
  const {
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
    invalid,
    containerStyle
  } = props;
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
      containerStyle: { borderRadius: 0, overflow: "visible", ...containerStyle, borderWidth: 0 },
      elementStyles,
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
