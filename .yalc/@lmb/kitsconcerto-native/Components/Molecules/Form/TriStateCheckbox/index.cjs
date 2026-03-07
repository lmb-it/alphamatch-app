'use strict';

var jsxRuntime = require('react/jsx-runtime');
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
require('../../../../apps/mobile/src/ui/divider/index.cjs');
require('../../../../apps/mobile/src/ui/drawer/index.cjs');
require('../../../../apps/mobile/src/ui/fab/index.cjs');
require('react-native');
require('../../../../apps/mobile/src/ui/form-control/index.cjs');
require('react');
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
require('../../../../packages/types/src/Css/map/index.cjs');
require('i18next');
require('react-i18next');
require('../../../../apps/mobile/src/Core/AutoComplete/index.cjs');
require('../../../../apps/mobile/src/Core/Dropdown/index.cjs');
require('../../../../apps/mobile/src/Core/MultiSelect/index.cjs');
require('../../../../apps/mobile/src/Core/Trees/components/CoreTree.cjs');
require('../../../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.cjs');
require('../../../../apps/mobile/src/Core/Trees/components/CoreToolbar.cjs');
require('../../../../apps/mobile/src/Core/Paginator/index.cjs');
var index = require('../../../../apps/mobile/src/Core/TriStateCheckbox/index.cjs');
require('../../../../apps/mobile/src/Core/SelectButton/index.cjs');
require('lucide-react-native');
require('../../../../apps/mobile/src/Core/DataTable/DataTable.cjs');
require('../../../../apps/mobile/src/Core/Tag/index.cjs');
require('../../../../apps/mobile/src/Core/Badge/index.cjs');
require('../../../../apps/mobile/src/Core/ProgressBar/index.cjs');
require('../../../../apps/mobile/src/Core/Checkbox/index.cjs');
require('../../../../apps/mobile/src/Core/RadioButton/index.cjs');
var useSelectionController = require('../../../../Hooks/useSelectionController.cjs');
require('../../../../Contexts/DialogContext.cjs');

const TriStateCheckbox = (props) => {
  const { value, onChange } = useSelectionController.default({
    mode: "tristate",
    defaultValue: false
    // Start at false
  });
  return /* @__PURE__ */ jsxRuntime.jsx(index.TriStateCheckbox, { value, onChange: () => onChange(), ...props });
};

exports.TriStateCheckbox = TriStateCheckbox;
//# sourceMappingURL=index.cjs.map
