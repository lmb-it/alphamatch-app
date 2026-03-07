import { jsxs, jsx } from 'react/jsx-runtime';
import 'react';
import 'axios';
import '../../../Contexts/DialogContext.js';
import '../Form/KitsSelect/SelectContext.js';
import Flex from '../UI/Flex/index.js';
import Heading from '../UI/Heading/index.js';
import '../../../apps/mobile/src/ui/accordion/index.js';
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
import '../../../apps/mobile/src/ui/divider/index.js';
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
import '../../../apps/mobile/src/ui/icon/index.js';
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
import useSeparator from '../../../apps/mobile/src/Factory/useSeparator.js';
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
import Box from '../UI/Box/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

const Container = ({
  title,
  rightElement,
  children,
  childrenContainerProps = {},
  ...props
}) => {
  const { cssProps, nativeProps } = useSeparator(props);
  return /* @__PURE__ */ jsxs(
    Box,
    {
      bgColor: "surface-0",
      borderRadius: 8,
      w: "full",
      overflow: "hidden",
      mb: 8,
      shadow: "md",
      ...cssProps,
      ...nativeProps,
      children: [
        (!!title || !!rightElement) && /* @__PURE__ */ jsxs(
          Flex,
          {
            backgroundColor: "surface-100",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            p: 10,
            flexDirection: "row",
            alignItems: "center",
            h: 58,
            justifyContent: "space-between",
            children: [
              !!title && /* @__PURE__ */ jsx(
                Heading,
                {
                  as: "h2",
                  fontSize: "lg",
                  fontWeight: "bold",
                  fontColor: "black-alpha-90",
                  letterSpacing: 0,
                  fontFamily: "Poppins,Helvetica,sans-serif",
                  m: 0,
                  p: 0,
                  children: title
                }
              ),
              rightElement
            ]
          }
        ),
        /* @__PURE__ */ jsx(Flex, { p: 10, flexDirection: "column", ...childrenContainerProps, children })
      ]
    }
  );
};

export { Container as default };
//# sourceMappingURL=container.js.map
