'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var FieldWrapper_native = require('../layout/FieldWrapper.cjs');
var index$2 = require('../fields/Select/index.cjs');
var index$e = require('../fields/InputText/index.cjs');
var index$d = require('../fields/InputNumber/index.cjs');
var index$c = require('../fields/Password/index.cjs');
var index$7 = require('../fields/Radios/index.cjs');
var index$3 = require('../fields/Checkboxes/index.cjs');
var index$6 = require('../fields/Textarea/index.cjs');
var index$5 = require('../fields/FileUploader/index.cjs');
var index$4 = require('../fields/Switch/index.cjs');
var index$a = require('../fields/Phone/index.cjs');
var index = require('../fields/Container/index.cjs');
var index$9 = require('../fields/DateField/index.cjs');
var index$b = require('../fields/Location/index.cjs');
var index$8 = require('../fields/ColorPicker/index.cjs');
var index_native = require('../fields/Group/index.cjs');
var index$1 = require('../fields/Object/index.cjs');
require('react-hook-form');
require('axios');
require('../../../../../Contexts/DialogContext.cjs');
require('../../../../Molecules/Form/KitsSelect/SelectContext.cjs');
var index_native$1 = require('../../../../Molecules/UI/Grid/index.cjs');
require('../../../../Molecules/UI/Flex/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');
require('../../../../../apps/mobile/src/ui/accordion/index.cjs');
require('../../../../../apps/mobile/src/ui/actionsheet/index.cjs');
require('../../../../../apps/mobile/src/ui/alert/index.cjs');
require('../../../../../apps/mobile/src/ui/alert-dialog/index.cjs');
require('../../../../../apps/mobile/src/ui/avatar/index.cjs');
require('../../../../../apps/mobile/src/ui/badge/index.cjs');
require('../../../../../apps/mobile/src/ui/bottomsheet/index.cjs');
require('../../../../../apps/mobile/src/ui/box/index.cjs');
require('../../../../../apps/mobile/src/ui/button/index.cjs');
require('../../../../../apps/mobile/src/ui/card/index.cjs');
require('../../../../../apps/mobile/src/ui/center/index.cjs');
require('../../../../../apps/mobile/src/ui/checkbox/index.cjs');
require('../../../../../apps/mobile/src/ui/divider/index.cjs');
require('../../../../../apps/mobile/src/ui/drawer/index.cjs');
require('../../../../../apps/mobile/src/ui/fab/index.cjs');
require('react-native');
require('../../../../../apps/mobile/src/ui/form-control/index.cjs');
require('../../../../../apps/mobile/src/ui/gluestack-ui-provider/config.cjs');
require('@gluestack-ui/core/overlay/creator');
require('@gluestack-ui/core/toast/creator');
require('nativewind');
var index$f = require('../../../../../apps/mobile/src/ui/grid/index.cjs');
require('../../../../../apps/mobile/src/ui/heading/index.cjs');
require('../../../../../apps/mobile/src/ui/hstack/index.cjs');
require('../../../../../apps/mobile/src/ui/icon/index.cjs');
require('../../../../../apps/mobile/src/ui/image/index.cjs');
require('../../../../../apps/mobile/src/ui/image-background/index.cjs');
require('../../../../../apps/mobile/src/ui/input/index.cjs');
require('../../../../../apps/mobile/src/ui/link/index.cjs');
require('../../../../../apps/mobile/src/ui/menu/index.cjs');
require('../../../../../apps/mobile/src/ui/modal/index.cjs');
require('../../../../../apps/mobile/src/ui/popover/index.cjs');
require('../../../../../apps/mobile/src/ui/portal/index.cjs');
require('../../../../../apps/mobile/src/ui/pressable/index.cjs');
require('../../../../../apps/mobile/src/ui/progress/index.cjs');
require('../../../../../apps/mobile/src/ui/radio/index.cjs');
require('react-native-safe-area-context');
require('../../../../../apps/mobile/src/ui/select/index.cjs');
require('../../../../../apps/mobile/src/ui/skeleton/index.cjs');
require('../../../../../apps/mobile/src/ui/slider/index.cjs');
require('../../../../../apps/mobile/src/ui/spinner/index.cjs');
require('../../../../../apps/mobile/src/ui/switch/index.cjs');
require('../../../../../apps/mobile/src/ui/table/index.cjs');
require('../../../../../apps/mobile/src/ui/text/index.cjs');
require('../../../../../apps/mobile/src/ui/textarea/index.cjs');
require('../../../../../apps/mobile/src/ui/toast/index.cjs');
require('../../../../../apps/mobile/src/ui/tooltip/index.cjs');
require('../../../../../apps/mobile/src/ui/vstack/index.cjs');
require('react-native-reanimated');
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
require('../../../../../packages/types/src/Css/map/index.cjs');
require('../../../../../apps/mobile/src/Factory/DimensionsContext.cjs');
require('i18next');
require('react-i18next');
require('../../../../../apps/mobile/src/Core/AutoComplete/index.cjs');
require('../../../../../apps/mobile/src/Core/Dropdown/index.cjs');
require('../../../../../apps/mobile/src/Core/MultiSelect/index.cjs');
require('../../../../../apps/mobile/src/Core/Trees/components/CoreTree.cjs');
require('../../../../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.cjs');
require('../../../../../apps/mobile/src/Core/Trees/components/CoreToolbar.cjs');
require('../../../../../apps/mobile/src/Core/Paginator/index.cjs');
require('lucide-react-native');
require('../../../../../apps/mobile/src/Core/SelectButton/index.cjs');
require('../../../../../apps/mobile/src/Core/DataTable/DataTable.cjs');
require('../../../../../apps/mobile/src/Core/Tag/index.cjs');
require('../../../../../apps/mobile/src/Core/Badge/index.cjs');
require('../../../../../apps/mobile/src/Core/ProgressBar/index.cjs');
require('../../../../../apps/mobile/src/Core/Checkbox/index.cjs');
require('../../../../../apps/mobile/src/Core/RadioButton/index.cjs');

const FormRenderer = ({
  elements,
  control,
  getValues,
  groupField,
  grid = {},
  parentPath = "",
  focusedField,
  setFocusedField
}) => {
  const [gridItemProps, setGridItemProps] = React.useState({});
  const getElement = React.useCallback((elementType) => {
    switch (elementType) {
      case "Email":
      case "Text":
        return index$e.InputText;
      case "Number":
        return index$d.InputNumber;
      case "Password":
        return index$c.Password;
      case "Location":
        return index$b.Location;
      case "Phone":
        return index$a.Phone;
      case "Date":
        return index$9.DateField;
      case "ColorPicker":
        return index$8.ColorPicker;
      case "Radios":
        return index$7.Radios;
      case "Textarea":
        return index$6.Textarea;
      case "Image":
      case "File":
        return index$5.FileUploader;
      case "Switch":
        return index$4.Switch;
      case "Checkbox":
        return index$3.Checkboxes;
      case "Select":
        return index$2.Select;
      case "TreeSelect":
        return index$2.Select;
      case "Tags":
        return index$2.Select;
      case "ListBox":
        return index$2.Select;
      case "Multiselect":
        return index$2.Select;
      case "Group":
        return index_native.Group;
      case "Object":
        return index$1.ObjectElement;
      case "Container":
        return index.Container;
    }
  }, []);
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native$1.default,
    {
      columns: 12,
      rowGap: 10,
      colSpan: 12,
      columnGap: 10,
      w: "full",
      m: 0,
      position: "relative",
      ...grid,
      children: elements.map((element) => {
        const FieldComponent = getElement(element.type);
        const elementId = `${parentPath}${element.id}`;
        const resolvedElement = elementId !== element.id ? { ...element, id: elementId } : element;
        if (!FieldComponent) {
          console.warn(`No component found for element type: "${resolvedElement.type}"`);
          return null;
        }
        const className = "col-span-" + (gridItemProps[elementId] ?? "12");
        return /* @__PURE__ */ jsxRuntime.jsx(index$f.GridItem, { _extra: {
          className
        }, children: /* @__PURE__ */ jsxRuntime.jsx(
          FieldWrapper_native.FieldWrapper,
          {
            element: resolvedElement,
            control,
            grid,
            groupField,
            getValues,
            focusedField,
            setFocusedField,
            onGridChange: (value) => {
              if (value != gridItemProps[elementId]) {
                setGridItemProps((prevState) => ({
                  ...prevState,
                  [elementId]: value
                }));
              }
            },
            children: (props) => /* @__PURE__ */ jsxRuntime.jsx(
              FieldComponent,
              {
                groupField,
                element: resolvedElement,
                control,
                getValues,
                focusedField,
                setFocusedField,
                fieldLogic: props
              }
            )
          },
          elementId
        ) }, elementId);
      })
    }
  );
};

exports.FormRenderer = FormRenderer;
//# sourceMappingURL=index.cjs.map
