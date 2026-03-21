'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var index$1 = require('../../apps/mobile/src/ui/accordion/index.cjs');
require('../../apps/mobile/src/ui/actionsheet/index.cjs');
require('../../apps/mobile/src/ui/alert/index.cjs');
require('../../apps/mobile/src/ui/alert-dialog/index.cjs');
require('../../apps/mobile/src/ui/avatar/index.cjs');
require('../../apps/mobile/src/ui/badge/index.cjs');
require('../../apps/mobile/src/ui/bottomsheet/index.cjs');
require('../../apps/mobile/src/ui/box/index.cjs');
require('../../apps/mobile/src/ui/button/index.cjs');
require('../../apps/mobile/src/ui/card/index.cjs');
require('../../apps/mobile/src/ui/center/index.cjs');
require('../../apps/mobile/src/ui/checkbox/index.cjs');
var index$3 = require('../../apps/mobile/src/ui/divider/index.cjs');
require('../../apps/mobile/src/ui/drawer/index.cjs');
require('../../apps/mobile/src/ui/fab/index.cjs');
require('react-native');
require('../../apps/mobile/src/ui/form-control/index.cjs');
require('../../apps/mobile/src/ui/gluestack-ui-provider/config.cjs');
require('@gluestack-ui/core/overlay/creator');
require('@gluestack-ui/core/toast/creator');
require('nativewind');
require('../../apps/mobile/src/ui/grid/index.cjs');
require('../../apps/mobile/src/ui/heading/index.cjs');
require('../../apps/mobile/src/ui/hstack/index.cjs');
var index$2 = require('../../apps/mobile/src/ui/icon/index.cjs');
require('../../apps/mobile/src/ui/image/index.cjs');
require('../../apps/mobile/src/ui/image-background/index.cjs');
require('../../apps/mobile/src/ui/input/index.cjs');
require('../../apps/mobile/src/ui/link/index.cjs');
require('../../apps/mobile/src/ui/menu/index.cjs');
require('../../apps/mobile/src/ui/modal/index.cjs');
require('../../apps/mobile/src/ui/popover/index.cjs');
require('../../apps/mobile/src/ui/portal/index.cjs');
require('../../apps/mobile/src/ui/pressable/index.cjs');
require('../../apps/mobile/src/ui/progress/index.cjs');
require('../../apps/mobile/src/ui/radio/index.cjs');
require('react-native-safe-area-context');
require('../../apps/mobile/src/ui/select/index.cjs');
require('../../apps/mobile/src/ui/skeleton/index.cjs');
require('../../apps/mobile/src/ui/slider/index.cjs');
require('../../apps/mobile/src/ui/spinner/index.cjs');
require('../../apps/mobile/src/ui/switch/index.cjs');
require('../../apps/mobile/src/ui/table/index.cjs');
require('../../apps/mobile/src/ui/text/index.cjs');
require('../../apps/mobile/src/ui/textarea/index.cjs');
require('../../apps/mobile/src/ui/toast/index.cjs');
require('../../apps/mobile/src/ui/tooltip/index.cjs');
require('../../apps/mobile/src/ui/vstack/index.cjs');
require('react-native-reanimated');
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
require('../../apps/mobile/src/Factory/DimensionsContext.cjs');
require('i18next');
require('react-i18next');
require('../../apps/mobile/src/Core/AutoComplete/index.cjs');
require('../../apps/mobile/src/Core/Dropdown/index.cjs');
require('../../apps/mobile/src/Core/MultiSelect/index.cjs');
require('../../apps/mobile/src/Core/Trees/components/CoreTree.cjs');
require('../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.cjs');
require('../../apps/mobile/src/Core/Trees/components/CoreToolbar.cjs');
require('../../apps/mobile/src/Core/Paginator/index.cjs');
require('lucide-react-native');
require('../../apps/mobile/src/Core/SelectButton/index.cjs');
require('../../apps/mobile/src/Core/DataTable/DataTable.cjs');
require('../../apps/mobile/src/Core/Tag/index.cjs');
require('../../apps/mobile/src/Core/Badge/index.cjs');
require('../../apps/mobile/src/Core/ProgressBar/index.cjs');
require('../../apps/mobile/src/Core/Checkbox/index.cjs');
require('../../apps/mobile/src/Core/RadioButton/index.cjs');
var index = require('../../primitives/Box/index.cjs');
var index_native = require('../../primitives/Heading/index.cjs');

const CustomAccordion = ({
  accordionTitle,
  accordionItems,
  isLoading,
  allOpenedByDefault,
  localProps
}) => {
  const [expanded, setExpanded] = React.useState(
    localProps?.multiple ? ["0"] : "0"
  );
  React.useEffect(() => {
    if (allOpenedByDefault && accordionItems?.length) {
      const allValues = accordionItems.map((_, i) => `${i}`);
      setExpanded(localProps?.multiple ? allValues ?? ["0"] : allValues[0] ?? "0");
    }
  }, [allOpenedByDefault]);
  const type = localProps?.multiple ? "multiple" : "single";
  const handleChange = (val) => {
    setExpanded(val);
    if (accordionItems) {
      if (Array.isArray(val)) {
        val.forEach((key) => {
          const index = parseInt(key, 10);
          accordionItems[index]?.onToggle?.(true);
        });
      } else {
        const index = parseInt(val, 10);
        accordionItems[index]?.onToggle?.(true);
      }
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(index.default, { w: "100%", borderRadius: 8, overflow: "hidden", className: "bg-background-0", children: [
    !!accordionTitle && /* @__PURE__ */ jsxRuntime.jsx(index_native.default, { as: "h2", p: 4, fontSize: "lg", className: "bg-background-100", children: accordionTitle }),
    isLoading ? /* @__PURE__ */ jsxRuntime.jsx(index.default, { p: 4 }) : /* @__PURE__ */ jsxRuntime.jsx(
      index$1.Accordion,
      {
        ...localProps,
        value: expanded,
        onValueChange: handleChange,
        type,
        className: "w-full",
        children: accordionItems?.map(({ button, panel }, i) => /* @__PURE__ */ jsxRuntime.jsxs(React.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(index$1.AccordionItem, { value: `${i}`, children: [
            /* @__PURE__ */ jsxRuntime.jsx(index$1.AccordionHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(index$1.AccordionTrigger, { children: ({ isExpanded }) => /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(index$1.AccordionTitleText, { children: button }),
              /* @__PURE__ */ jsxRuntime.jsx(
                index$1.AccordionIcon,
                {
                  as: isExpanded ? index$2.ChevronUpIcon : index$2.ChevronDownIcon,
                  className: "ml-3"
                }
              )
            ] }) }) }),
            /* @__PURE__ */ jsxRuntime.jsx(index$1.AccordionContent, { children: /* @__PURE__ */ jsxRuntime.jsx(index$1.AccordionContentText, { children: panel }) })
          ] }),
          i !== accordionItems.length - 1 && /* @__PURE__ */ jsxRuntime.jsx(index$3.Divider, {})
        ] }, i))
      }
    )
  ] });
};

exports.default = CustomAccordion;
//# sourceMappingURL=accordion.cjs.map
