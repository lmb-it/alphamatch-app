'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var index_native = require('../../Helpers/FormContainer/index.cjs');
require('axios');
var useSelectionController = require('../../../../../Hooks/useSelectionController.cjs');
require('../../../../../Contexts/DialogContext.cjs');
require('../../../../../Hooks/useKeyboardNavigation.cjs');
require('../../KitsSelect/SelectContext.cjs');
var index = require('../../../UI/Flex/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');
var radiobutton_native = require('./radiobutton.cjs');

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
  const items = React.useMemo(
    () => Array.isArray(item) ? item : [item],
    [item]
  );
  const lastToggledIndex = React.useRef(null);
  const controller = useSelectionController.default({
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
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
      children: /* @__PURE__ */ jsxRuntime.jsx(index.default, { flexDirection: direction, gap: 10, children: items.map((it, index) => {
        const selected = controller.isSelected(it);
        return /* @__PURE__ */ jsxRuntime.jsx(
          radiobutton_native.default,
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

exports.default = KitsRadio;
//# sourceMappingURL=radio.cjs.map
