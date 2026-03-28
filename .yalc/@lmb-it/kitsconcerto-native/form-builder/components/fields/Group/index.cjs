'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactHookForm = require('react-hook-form');
require('../../../../apps/mobile/src/ui/accordion/index.cjs');
require('../../../../apps/mobile/src/ui/actionsheet/index.cjs');
require('../../../../apps/mobile/src/ui/alert/index.cjs');
require('../../../../apps/mobile/src/ui/alert-dialog/index.cjs');
require('../../../../apps/mobile/src/ui/avatar/index.cjs');
require('../../../../apps/mobile/src/ui/badge/index.cjs');
require('../../../../apps/mobile/src/ui/bottomsheet/index.cjs');
require('../../../../apps/mobile/src/ui/box/index.cjs');
require('../../../../apps/mobile/src/ui/button/index.cjs');
require('../../../../apps/mobile/src/ui/card/index.cjs');
require('../../../../apps/mobile/src/ui/center/index.cjs');
require('../../../../apps/mobile/src/ui/checkbox/index.cjs');
var index$2 = require('../../../../apps/mobile/src/ui/divider/index.cjs');
require('../../../../apps/mobile/src/ui/drawer/index.cjs');
require('../../../../apps/mobile/src/ui/fab/index.cjs');
require('react-native');
require('../../../../apps/mobile/src/ui/form-control/index.cjs');
require('../../../../apps/mobile/src/ui/gluestack-ui-provider/config.cjs');
require('@gluestack-ui/core/overlay/creator');
require('@gluestack-ui/core/toast/creator');
require('nativewind');
require('../../../../apps/mobile/src/ui/grid/index.cjs');
require('../../../../apps/mobile/src/ui/heading/index.cjs');
require('../../../../apps/mobile/src/ui/hstack/index.cjs');
require('../../../../apps/mobile/src/ui/icon/index.cjs');
require('../../../../apps/mobile/src/ui/image/index.cjs');
require('../../../../apps/mobile/src/ui/image-background/index.cjs');
require('../../../../apps/mobile/src/ui/input/index.cjs');
require('../../../../apps/mobile/src/ui/link/index.cjs');
require('../../../../apps/mobile/src/ui/menu/index.cjs');
require('../../../../apps/mobile/src/ui/modal/index.cjs');
require('../../../../apps/mobile/src/ui/popover/index.cjs');
require('../../../../apps/mobile/src/ui/portal/index.cjs');
require('../../../../apps/mobile/src/ui/pressable/index.cjs');
require('../../../../apps/mobile/src/ui/progress/index.cjs');
require('../../../../apps/mobile/src/ui/radio/index.cjs');
require('react-native-safe-area-context');
require('../../../../apps/mobile/src/ui/select/index.cjs');
require('../../../../apps/mobile/src/ui/skeleton/index.cjs');
require('../../../../apps/mobile/src/ui/slider/index.cjs');
require('../../../../apps/mobile/src/ui/spinner/index.cjs');
require('../../../../apps/mobile/src/ui/switch/index.cjs');
require('../../../../apps/mobile/src/ui/table/index.cjs');
require('../../../../apps/mobile/src/ui/text/index.cjs');
require('../../../../apps/mobile/src/ui/textarea/index.cjs');
require('../../../../apps/mobile/src/ui/toast/index.cjs');
require('../../../../apps/mobile/src/ui/tooltip/index.cjs');
require('../../../../apps/mobile/src/ui/vstack/index.cjs');
require('react-native-reanimated');
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
require('../../../../apps/mobile/src/Factory/DimensionsContext.cjs');
require('i18next');
require('react-i18next');
require('../../../../apps/mobile/src/Core/AutoComplete/index.cjs');
require('../../../../apps/mobile/src/Core/Dropdown/index.cjs');
require('../../../../apps/mobile/src/Core/MultiSelect/index.cjs');
require('../../../../apps/mobile/src/Core/Trees/components/CoreTree.cjs');
require('../../../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.cjs');
require('../../../../apps/mobile/src/Core/Trees/components/CoreToolbar.cjs');
require('../../../../apps/mobile/src/Core/Paginator/index.cjs');
require('lucide-react-native');
require('../../../../apps/mobile/src/Core/SelectButton/index.cjs');
require('../../../../apps/mobile/src/Core/DataTable/DataTable.cjs');
require('../../../../apps/mobile/src/Core/Tag/index.cjs');
require('../../../../apps/mobile/src/Core/Badge/index.cjs');
require('../../../../apps/mobile/src/Core/ProgressBar/index.cjs');
require('../../../../apps/mobile/src/Core/Checkbox/index.cjs');
require('../../../../apps/mobile/src/Core/RadioButton/index.cjs');
var index_native = require('../../FormRenderer/index.cjs');
var index = require('../../../../layout/Flex/index.cjs');
var index$1 = require('../../../../primitives/Box/index.cjs');
var label_native = require('../../../../form/helpers/Label/label.cjs');
var index_native$1 = require('../../../../primitives/Text/index.cjs');

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
  const [_focusedField, _setFocusedField] = React.useState("");
  const groupElement = element;
  const { groupsSettings, helperText } = groupElement;
  const fieldArray = reactHookForm.useFieldArray({
    control,
    name: element.id
  });
  const { fields, append, remove } = fieldArray;
  const settings = React.useMemo(() => ({
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
  React.useEffect(() => {
    const generateGroupElements = () => {
      const min = settings.repeatable.minRepeats || 0;
      if (fields.length < min) {
        const itemsToAppend = min - fields.length;
        handleAppend(itemsToAppend);
      }
    };
    const timer = setTimeout(generateGroupElements, 100);
    return () => clearTimeout(timer);
  }, [element.id, settings.repeatable.minRepeats]);
  React.useImperativeHandle(groupsSettings?.ref, () => fieldArray, [fieldArray]);
  const reBuildElements = React.useCallback((field, index) => {
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
  return /* @__PURE__ */ jsxRuntime.jsxs(index.default, { id: element.id.toString(), w: "full", flexDirection: "column", gap: 10, mb: 6, children: [
    label && /* @__PURE__ */ jsxRuntime.jsxs(index$1.default, { mt: 15, mb: 15, w: "100%", children: [
      /* @__PURE__ */ jsxRuntime.jsx(label_native.default, { as: "h2", label, elementId: element.id.toString() }),
      /* @__PURE__ */ jsxRuntime.jsx(index$2.Divider, { style: { width: "100%" }, className: "my-2" })
    ] }),
    fields.map((field, index$2) => /* @__PURE__ */ jsxRuntime.jsxs(
      index.default,
      {
        w: "full",
        position: "relative",
        flexDirection: "column",
        rowGap: 10,
        columnGap: 10,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            index_native.FormRenderer,
            {
              elements: reBuildElements(field, index$2),
              control,
              groupField: {
                index: index$2,
                name: element.id.toString(),
                values: getValues()[element.id][index$2],
                append: handleAppend,
                remove: () => handleRemove(index$2)
              },
              getValues,
              parentPath: `${element.id.toString()}.${index$2}.`,
              focusedField: _focusedField,
              setFocusedField: _setFocusedField,
              grid: groupsSettings?.grid
            }
          ),
          settings.removeButtonRow && /* @__PURE__ */ jsxRuntime.jsx(index$1.default, { style: { zIndex: 1 }, children: settings.removeButtonRow(fields.length, () => handleRemove(index$2), index$2) }),
          settings.repeatable.minusButton && fields.length > settings.repeatable.minRepeats && /* @__PURE__ */ jsxRuntime.jsx(index$1.default, { style: { zIndex: 1 }, children: settings.repeatable.minusButton(fields.length, () => handleRemove(index$2)) })
        ]
      },
      field.id
    )),
    settings.repeatable.plusButton && /* @__PURE__ */ jsxRuntime.jsx(index.default, { justifyContent: "flex-start", w: "full", mt: 8, children: settings.repeatable.plusButton(fields.length, handleAppend) }),
    helperText && typeof helperText != "function" && /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, { fontSize: 10, as: "small", children: helperText })
  ] });
};

exports.Group = Group;
exports.default = Group;
//# sourceMappingURL=index.cjs.map
