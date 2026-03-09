import { jsx } from 'react/jsx-runtime';
import '../../../../apps/mobile/src/ui/accordion/index.js';
import '../../../../apps/mobile/src/ui/actionsheet/index.js';
import '../../../../apps/mobile/src/ui/alert/index.js';
import '../../../../apps/mobile/src/ui/alert-dialog/index.js';
import '../../../../apps/mobile/src/ui/avatar/index.js';
import '../../../../apps/mobile/src/ui/badge/index.js';
import '../../../../apps/mobile/src/ui/bottomsheet/index.js';
import '../../../../apps/mobile/src/ui/box/index.js';
import '../../../../apps/mobile/src/ui/button/index.js';
import '../../../../apps/mobile/src/ui/card/index.js';
import '../../../../apps/mobile/src/ui/center/index.js';
import '../../../../apps/mobile/src/ui/checkbox/index.js';
import '../../../../apps/mobile/src/ui/divider/index.js';
import '../../../../apps/mobile/src/ui/drawer/index.js';
import '../../../../apps/mobile/src/ui/fab/index.js';
import 'react-native';
import '../../../../apps/mobile/src/ui/form-control/index.js';
import 'react';
import '../../../../apps/mobile/src/ui/gluestack-ui-provider/config.js';
import '@gluestack-ui/core/overlay/creator';
import '@gluestack-ui/core/toast/creator';
import 'nativewind';
import '../../../../apps/mobile/src/ui/grid/index.js';
import '../../../../apps/mobile/src/ui/heading/index.js';
import '../../../../apps/mobile/src/ui/hstack/index.js';
import '../../../../apps/mobile/src/ui/icon/index.js';
import '../../../../apps/mobile/src/ui/image/index.js';
import '../../../../apps/mobile/src/ui/image-background/index.js';
import '../../../../apps/mobile/src/ui/input/index.js';
import '../../../../apps/mobile/src/ui/link/index.js';
import '../../../../apps/mobile/src/ui/menu/index.js';
import '../../../../apps/mobile/src/ui/modal/index.js';
import '../../../../apps/mobile/src/ui/popover/index.js';
import '../../../../apps/mobile/src/ui/portal/index.js';
import '../../../../apps/mobile/src/ui/pressable/index.js';
import '../../../../apps/mobile/src/ui/progress/index.js';
import '../../../../apps/mobile/src/ui/radio/index.js';
import 'react-native-safe-area-context';
import '../../../../apps/mobile/src/ui/select/index.js';
import '../../../../apps/mobile/src/ui/skeleton/index.js';
import '../../../../apps/mobile/src/ui/slider/index.js';
import '../../../../apps/mobile/src/ui/spinner/index.js';
import '../../../../apps/mobile/src/ui/switch/index.js';
import '../../../../apps/mobile/src/ui/table/index.js';
import '../../../../apps/mobile/src/ui/text/index.js';
import '../../../../apps/mobile/src/ui/textarea/index.js';
import '../../../../apps/mobile/src/ui/toast/index.js';
import '../../../../apps/mobile/src/ui/tooltip/index.js';
import '../../../../apps/mobile/src/ui/vstack/index.js';
import 'react-native-reanimated';
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
import '../../../../packages/types/src/Css/map/index.js';
import '../../../../apps/mobile/src/Factory/DimensionsContext.js';
import 'i18next';
import 'react-i18next';
import '../../../../apps/mobile/src/Core/AutoComplete/index.js';
import '../../../../apps/mobile/src/Core/Dropdown/index.js';
import '../../../../apps/mobile/src/Core/MultiSelect/index.js';
import '../../../../apps/mobile/src/Core/Trees/components/CoreTree.js';
import '../../../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.js';
import '../../../../apps/mobile/src/Core/Trees/components/CoreToolbar.js';
import { Paginator } from '../../../../apps/mobile/src/Core/Paginator/index.js';
import 'lucide-react-native';
import '../../../../apps/mobile/src/Core/SelectButton/index.js';
import '../../../../apps/mobile/src/Core/DataTable/DataTable.js';
import '../../../../apps/mobile/src/Core/Tag/index.js';
import '../../../../apps/mobile/src/Core/Badge/index.js';
import '../../../../apps/mobile/src/Core/ProgressBar/index.js';
import '../../../../apps/mobile/src/Core/Checkbox/index.js';
import '../../../../apps/mobile/src/Core/RadioButton/index.js';
import { useDataView } from '../index.js';
import 'axios';
import '../../../../Contexts/DialogContext.js';
import '../../../Molecules/Form/KitsSelect/SelectContext.js';
import '../../../Molecules/UI/Flex/index.js';
import Box from '../../../Molecules/UI/Box/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

function Pagination() {
  const { paginationParams } = useDataView();
  return /* @__PURE__ */ jsx(Box, { className: "card", children: /* @__PURE__ */ jsx(
    Paginator,
    {
      first: paginationParams?.start,
      rows: paginationParams?.pageSize,
      totalRecords: paginationParams?.totalRecords,
      rowsPerPageOptions: [15, 25, 30, 50, 100],
      onPageChange: (e) => paginationParams?.onChangePage(e)
    }
  ) });
}

export { Pagination as default };
//# sourceMappingURL=index.js.map
