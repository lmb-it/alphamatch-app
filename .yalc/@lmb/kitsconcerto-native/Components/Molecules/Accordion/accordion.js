import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import React, { useState, useEffect } from 'react';
import { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionTitleText, AccordionIcon, AccordionContent, AccordionContentText } from '../../../apps/mobile/src/ui/accordion/index.js';
import '../../../apps/mobile/src/ui/actionsheet/index.js';
import '../../../apps/mobile/src/ui/alert/index.js';
import '../../../apps/mobile/src/ui/alert-dialog/index.js';
import '../../../apps/mobile/src/ui/avatar/index.js';
import '../../../apps/mobile/src/ui/badge/index.js';
import '../../../apps/mobile/src/ui/bottomsheet/index.js';
import '../../../apps/mobile/src/ui/box/index.js';
import '../../../apps/mobile/src/ui/button/index.js';
import '../../../apps/mobile/src/ui/card/index.js';
import '../../../apps/mobile/src/ui/center/index.js';
import '../../../apps/mobile/src/ui/checkbox/index.js';
import { Divider } from '../../../apps/mobile/src/ui/divider/index.js';
import '../../../apps/mobile/src/ui/drawer/index.js';
import '../../../apps/mobile/src/ui/fab/index.js';
import 'react-native';
import '../../../apps/mobile/src/ui/form-control/index.js';
import '../../../apps/mobile/src/ui/gluestack-ui-provider/config.js';
import '@gluestack-ui/core/overlay/creator';
import '@gluestack-ui/core/toast/creator';
import 'nativewind';
import '../../../apps/mobile/src/ui/grid/index.js';
import '../../../apps/mobile/src/ui/heading/index.js';
import '../../../apps/mobile/src/ui/hstack/index.js';
import { ChevronUpIcon, ChevronDownIcon } from '../../../apps/mobile/src/ui/icon/index.js';
import '../../../apps/mobile/src/ui/image/index.js';
import '../../../apps/mobile/src/ui/image-background/index.js';
import '../../../apps/mobile/src/ui/input/index.js';
import '../../../apps/mobile/src/ui/link/index.js';
import '../../../apps/mobile/src/ui/menu/index.js';
import '../../../apps/mobile/src/ui/modal/index.js';
import '../../../apps/mobile/src/ui/popover/index.js';
import '../../../apps/mobile/src/ui/portal/index.js';
import '../../../apps/mobile/src/ui/pressable/index.js';
import '../../../apps/mobile/src/ui/progress/index.js';
import '../../../apps/mobile/src/ui/radio/index.js';
import 'react-native-safe-area-context';
import '../../../apps/mobile/src/ui/select/index.js';
import '../../../apps/mobile/src/ui/skeleton/index.js';
import '../../../apps/mobile/src/ui/slider/index.js';
import '../../../apps/mobile/src/ui/spinner/index.js';
import '../../../apps/mobile/src/ui/switch/index.js';
import '../../../apps/mobile/src/ui/table/index.js';
import '../../../apps/mobile/src/ui/text/index.js';
import '../../../apps/mobile/src/ui/textarea/index.js';
import '../../../apps/mobile/src/ui/toast/index.js';
import '../../../apps/mobile/src/ui/tooltip/index.js';
import '../../../apps/mobile/src/ui/vstack/index.js';
import 'react-native-reanimated';
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
import '../../../packages/types/src/Css/map/index.js';
import '../../../apps/mobile/src/Factory/DimensionsContext.js';
import 'i18next';
import 'react-i18next';
import '../../../apps/mobile/src/Core/AutoComplete/index.js';
import '../../../apps/mobile/src/Core/Dropdown/index.js';
import '../../../apps/mobile/src/Core/MultiSelect/index.js';
import '../../../apps/mobile/src/Core/Trees/components/CoreTree.js';
import '../../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.js';
import '../../../apps/mobile/src/Core/Trees/components/CoreToolbar.js';
import '../../../apps/mobile/src/Core/Paginator/index.js';
import 'lucide-react-native';
import '../../../apps/mobile/src/Core/SelectButton/index.js';
import '../../../apps/mobile/src/Core/DataTable/DataTable.js';
import '../../../apps/mobile/src/Core/Tag/index.js';
import '../../../apps/mobile/src/Core/Badge/index.js';
import '../../../apps/mobile/src/Core/ProgressBar/index.js';
import '../../../apps/mobile/src/Core/Checkbox/index.js';
import '../../../apps/mobile/src/Core/RadioButton/index.js';
import 'axios';
import '../../../Contexts/DialogContext.js';
import '../Form/KitsSelect/SelectContext.js';
import '../UI/Flex/index.js';
import Heading from '../UI/Heading/index.js';
import Box from '../UI/Box/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

const CustomAccordion = ({
  accordionTitle,
  accordionItems,
  isLoading,
  allOpenedByDefault,
  localProps
}) => {
  const [expanded, setExpanded] = useState(
    localProps?.multiple ? ["0"] : "0"
  );
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs(Box, { w: "100%", borderRadius: 8, overflow: "hidden", className: "bg-background-0", children: [
    !!accordionTitle && /* @__PURE__ */ jsx(Heading, { as: "h2", p: 4, fontSize: "lg", className: "bg-background-100", children: accordionTitle }),
    isLoading ? /* @__PURE__ */ jsx(Box, { p: 4 }) : /* @__PURE__ */ jsx(
      Accordion,
      {
        ...localProps,
        value: expanded,
        onValueChange: handleChange,
        type,
        className: "w-full",
        children: accordionItems?.map(({ button, panel }, i) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
          /* @__PURE__ */ jsxs(AccordionItem, { value: `${i}`, children: [
            /* @__PURE__ */ jsx(AccordionHeader, { children: /* @__PURE__ */ jsx(AccordionTrigger, { children: ({ isExpanded }) => /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(AccordionTitleText, { children: button }),
              /* @__PURE__ */ jsx(
                AccordionIcon,
                {
                  as: isExpanded ? ChevronUpIcon : ChevronDownIcon,
                  className: "ml-3"
                }
              )
            ] }) }) }),
            /* @__PURE__ */ jsx(AccordionContent, { children: /* @__PURE__ */ jsx(AccordionContentText, { children: panel }) })
          ] }),
          i !== accordionItems.length - 1 && /* @__PURE__ */ jsx(Divider, {})
        ] }, i))
      }
    )
  ] });
};

export { CustomAccordion as default };
//# sourceMappingURL=accordion.js.map
