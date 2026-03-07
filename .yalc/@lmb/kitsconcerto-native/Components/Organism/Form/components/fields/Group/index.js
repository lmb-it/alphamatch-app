import { jsxs, jsx } from 'react/jsx-runtime';
import { useMemo, useEffect, useImperativeHandle, useCallback } from 'react';
import { useFieldArray } from 'react-hook-form';
import 'axios';
import '../../../../../../Contexts/DialogContext.js';
import '../../../../../Molecules/Form/KitsSelect/SelectContext.js';
import Label from '../../../../../Molecules/Form/Helpers/Label/label.js';
import Flex from '../../../../../Molecules/UI/Flex/index.js';
import Text from '../../../../../Molecules/UI/Text/index.js';
import Box from '../../../../../Molecules/UI/Box/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';
import '../../../../../../apps/mobile/src/ui/accordion/index.js';
import '../../../../../../apps/mobile/src/ui/actionsheet/index.js';
import '../../../../../../apps/mobile/src/ui/alert/index.js';
import '../../../../../../apps/mobile/src/ui/alert-dialog/index.js';
import '../../../../../../apps/mobile/src/ui/avatar/index.js';
import '../../../../../../apps/mobile/src/ui/badge/index.js';
import '../../../../../../apps/mobile/src/ui/bottomsheet/index.js';
import '../../../../../../apps/mobile/src/ui/box/index.js';
import '../../../../../../apps/mobile/src/ui/button/index.js';
import '../../../../../../apps/mobile/src/ui/card/index.js';
import '../../../../../../apps/mobile/src/ui/center/index.js';
import '../../../../../../apps/mobile/src/ui/checkbox/index.js';
import { Divider } from '../../../../../../apps/mobile/src/ui/divider/index.js';
import '../../../../../../apps/mobile/src/ui/drawer/index.js';
import '../../../../../../apps/mobile/src/ui/fab/index.js';
import 'react-native';
import '../../../../../../apps/mobile/src/ui/form-control/index.js';
import '../../../../../../apps/mobile/src/ui/gluestack-ui-provider/config.js';
import '@gluestack-ui/core/overlay/creator';
import '@gluestack-ui/core/toast/creator';
import 'nativewind';
import '../../../../../../apps/mobile/src/ui/grid/index.js';
import '../../../../../../apps/mobile/src/ui/heading/index.js';
import '../../../../../../apps/mobile/src/ui/hstack/index.js';
import '../../../../../../apps/mobile/src/ui/icon/index.js';
import '../../../../../../apps/mobile/src/ui/image/index.js';
import '../../../../../../apps/mobile/src/ui/image-background/index.js';
import '../../../../../../apps/mobile/src/ui/input/index.js';
import '../../../../../../apps/mobile/src/ui/link/index.js';
import '../../../../../../apps/mobile/src/ui/menu/index.js';
import '../../../../../../apps/mobile/src/ui/modal/index.js';
import '../../../../../../apps/mobile/src/ui/popover/index.js';
import '../../../../../../apps/mobile/src/ui/portal/index.js';
import '../../../../../../apps/mobile/src/ui/pressable/index.js';
import '../../../../../../apps/mobile/src/ui/progress/index.js';
import '../../../../../../apps/mobile/src/ui/radio/index.js';
import 'react-native-safe-area-context';
import '../../../../../../apps/mobile/src/ui/select/index.js';
import '../../../../../../apps/mobile/src/ui/skeleton/index.js';
import '../../../../../../apps/mobile/src/ui/slider/index.js';
import '../../../../../../apps/mobile/src/ui/spinner/index.js';
import '../../../../../../apps/mobile/src/ui/switch/index.js';
import '../../../../../../apps/mobile/src/ui/table/index.js';
import '../../../../../../apps/mobile/src/ui/text/index.js';
import '../../../../../../apps/mobile/src/ui/textarea/index.js';
import '../../../../../../apps/mobile/src/ui/toast/index.js';
import '../../../../../../apps/mobile/src/ui/tooltip/index.js';
import '../../../../../../apps/mobile/src/ui/vstack/index.js';
import 'react-native-reanimated';
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
import '../../../../../../packages/types/src/Css/map/index.js';
import 'i18next';
import 'react-i18next';
import '../../../../../../apps/mobile/src/Core/AutoComplete/index.js';
import '../../../../../../apps/mobile/src/Core/Dropdown/index.js';
import '../../../../../../apps/mobile/src/Core/MultiSelect/index.js';
import '../../../../../../apps/mobile/src/Core/Trees/components/CoreTree.js';
import '../../../../../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.js';
import '../../../../../../apps/mobile/src/Core/Trees/components/CoreToolbar.js';
import '../../../../../../apps/mobile/src/Core/Paginator/index.js';
import 'lucide-react-native';
import '../../../../../../apps/mobile/src/Core/SelectButton/index.js';
import '../../../../../../apps/mobile/src/Core/DataTable/DataTable.js';
import '../../../../../../apps/mobile/src/Core/Tag/index.js';
import '../../../../../../apps/mobile/src/Core/Badge/index.js';
import '../../../../../../apps/mobile/src/Core/ProgressBar/index.js';
import '../../../../../../apps/mobile/src/Core/Checkbox/index.js';
import '../../../../../../apps/mobile/src/Core/RadioButton/index.js';
import { FormRenderer } from '../../FormRenderer/index.js';

const Group = ({
  element,
  control,
  getValues,
  groupField,
  focusedField,
  setFocusedField,
  fieldLogic
}) => {
  const { isShown, label, elements } = fieldLogic;
  const groupElement = element;
  const { groupsSettings, helperText } = groupElement;
  const fieldArray = useFieldArray({
    control,
    name: element.id
  });
  const { fields, append, remove } = fieldArray;
  const settings = useMemo(() => ({
    grid: groupsSettings?.grid,
    repeatable: {
      minRepeats: groupsSettings?.repeatable?.minRepeats || 0,
      maxRepeats: groupsSettings?.repeatable?.maxRepeats || Infinity,
      plusButton: groupsSettings?.repeatable?.plusButton,
      minusButton: groupsSettings?.repeatable?.minusButton
    },
    removeButtonRow: groupsSettings?.removeButtonRow
  }), [groupsSettings]);
  const createDefaultItem = () => {
    const item = {};
    elements?.forEach((el) => {
      if ("displayOnly" in el && el.displayOnly) return;
      if ("initialUri" in el) {
        item[el.id] = el.initialUri;
      } else if ("initialValue" in el && el.initialValue !== void 0) {
        item[el.id] = el.initialValue;
      }
    });
    return item;
  };
  const handleAppend = (count = 1) => {
    const max = settings.repeatable.maxRepeats;
    if (max && fields.length >= max) {
      return;
    }
    const itemsToAdd = Array(count).fill(0).map(() => createDefaultItem());
    append(itemsToAdd, { shouldFocus: true });
  };
  const handleRemove = (index) => {
    if (fields.length > (settings.repeatable.minRepeats || 0)) {
      remove(index);
    }
  };
  useEffect(() => {
    const generateGroupElements = () => {
      const min = settings.repeatable.minRepeats || 0;
      if (fields.length < min) {
        const itemsToAppend = min - fields.length;
        console.log({ itemsToAppend, current: fields.length });
        handleAppend(itemsToAppend);
      }
    };
    const timer = setTimeout(generateGroupElements, 100);
    return () => clearTimeout(timer);
  }, [element.id, settings.repeatable.minRepeats]);
  useImperativeHandle(groupsSettings?.ref, () => fieldArray, [fieldArray]);
  const reBuildElements = useCallback((field, index) => {
    return elements?.map((childElement) => {
      const toArray = Object.entries(field);
      const findField = toArray.find(([name]) => name == childElement.id);
      return {
        ...childElement,
        initialValue: findField ? findField[1] : void 0
      };
    });
  }, [element, elements]);
  if (!isShown) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Flex, { id: element.id, w: "full", flexDirection: "column", gap: 10, mb: 6, children: [
    label && /* @__PURE__ */ jsxs(Box, { mt: 15, mb: 15, w: "100%", children: [
      /* @__PURE__ */ jsx(Label, { as: "h2", label, elementId: element.id }),
      /* @__PURE__ */ jsx(Divider, { style: { width: "100%" }, className: "my-2" })
    ] }),
    fields.map((field, index) => /* @__PURE__ */ jsxs(
      Flex,
      {
        w: "full",
        position: "relative",
        flexDirection: "column",
        rowGap: 10,
        columnGap: 10,
        children: [
          /* @__PURE__ */ jsx(
            FormRenderer,
            {
              elements: reBuildElements(field, index),
              control,
              groupField: { index, name: element.id, values: getValues()[element.id][index] },
              getValues,
              parentPath: `${element.id}.${index}.`,
              focusedField,
              setFocusedField,
              grid: groupsSettings?.grid
            }
          ),
          settings.removeButtonRow && /* @__PURE__ */ jsx(Box, { style: { zIndex: 1 }, children: settings.removeButtonRow(fields.length, () => handleRemove(index), index) }),
          settings.repeatable.minusButton && fields.length > settings.repeatable.minRepeats && /* @__PURE__ */ jsx(Box, { style: { zIndex: 1 }, children: settings.repeatable.minusButton(fields.length, () => handleRemove(index)) })
        ]
      },
      field.id
    )),
    settings.repeatable.plusButton && /* @__PURE__ */ jsx(Flex, { justifyContent: "flex-start", w: "full", mt: 8, children: settings.repeatable.plusButton(fields.length, handleAppend) }),
    helperText && typeof helperText != "function" && /* @__PURE__ */ jsx(Text, { fontSize: 10, as: "small", children: helperText })
  ] });
};

export { Group, Group as default };
//# sourceMappingURL=index.js.map
