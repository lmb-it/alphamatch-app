'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
require('../../../UI/Flex/index.cjs');
var index_native = require('../../../UI/Text/index.cjs');
var locale = require('../../../../../Hooks/locale.cjs');
require('../../../../../Contexts/DialogContext.cjs');
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
var index = require('../../../../../apps/mobile/src/ui/form-control/index.cjs');
require('../../../../../apps/mobile/src/ui/gluestack-ui-provider/config.cjs');
require('@gluestack-ui/core/overlay/creator');
require('@gluestack-ui/core/toast/creator');
require('nativewind');
require('../../../../../apps/mobile/src/ui/grid/index.cjs');
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

const Label = ({ label, className, isFormControl = false, elementId }) => {
  const { isRTL } = locale.useLanguage();
  const renderLabel = React.useMemo(() => {
    if (!label) return "";
    if (React.isValidElement(label) || typeof label === "string") {
      return label;
    }
    if ("element" in label && label.element) {
      return label.element;
    }
    if ("text" in label && label.text) {
      return label.text;
    }
    return "";
  }, [label]);
  const labelClasses = React.useMemo(() => {
    const classes = ["label-position", "w-full"];
    if (className) {
      classes.push(className);
    }
    if (typeof label === "string") {
      if (isRTL) {
        classes.push("text-right");
      }
    } else if (label && "placement" in label) {
      if (label.placement === "RL") classes.push("RL");
      if (label.placement === "B") classes.push("B");
      if (label.placement === "T") classes.push("T");
    }
    return classes.join(" ");
  }, [isRTL, label]);
  if (!label) return null;
  if (!isFormControl) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      index_native.default,
      {
        className: labelClasses,
        children: renderLabel
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(index.FormControlLabel, { className: labelClasses, style: { padding: 0 }, children: /* @__PURE__ */ jsxRuntime.jsx(index.FormControlLabelText, { style: { padding: 0 }, children: renderLabel }) });
};

exports.default = Label;
//# sourceMappingURL=label.cjs.map
