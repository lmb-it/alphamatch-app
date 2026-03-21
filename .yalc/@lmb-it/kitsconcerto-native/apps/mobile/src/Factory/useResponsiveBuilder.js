import { jsx } from 'react/jsx-runtime';
import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import '../ui/accordion/index.js';
import '../ui/actionsheet/index.js';
import '../ui/alert/index.js';
import '../ui/alert-dialog/index.js';
import '../ui/avatar/index.js';
import '../ui/badge/index.js';
import '../ui/bottomsheet/index.js';
import { Box } from '../ui/box/index.js';
import { Button } from '../ui/button/index.js';
import { Card } from '../ui/card/index.js';
import { Center } from '../ui/center/index.js';
import '../ui/checkbox/index.js';
import '../ui/divider/index.js';
import '../ui/drawer/index.js';
import '../ui/fab/index.js';
import '../ui/form-control/index.js';
import '../ui/gluestack-ui-provider/config.js';
import '@gluestack-ui/core/overlay/creator';
import '@gluestack-ui/core/toast/creator';
import 'nativewind';
import { GridItem, Grid } from '../ui/grid/index.js';
import { Heading } from '../ui/heading/index.js';
import { HStack } from '../ui/hstack/index.js';
import '../ui/icon/index.js';
import { Image } from '../ui/image/index.js';
import '../ui/image-background/index.js';
import '../ui/input/index.js';
import '../ui/link/index.js';
import '../ui/menu/index.js';
import '../ui/modal/index.js';
import '../ui/popover/index.js';
import '../ui/portal/index.js';
import { Pressable } from '../ui/pressable/index.js';
import '../ui/progress/index.js';
import '../ui/radio/index.js';
import 'react-native-safe-area-context';
import '../ui/select/index.js';
import { Skeleton } from '../ui/skeleton/index.js';
import '../ui/slider/index.js';
import '../ui/spinner/index.js';
import '../ui/switch/index.js';
import '../ui/table/index.js';
import { Text } from '../ui/text/index.js';
import '../ui/textarea/index.js';
import '../ui/toast/index.js';
import '../ui/tooltip/index.js';
import { VStack } from '../ui/vstack/index.js';
import 'react-native-reanimated';
import { style } from './helpers/style.js';
import './DimensionsContext.js';
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
import 'i18next';
import 'react-i18next';
import '../Core/AutoComplete/index.js';
import '../Core/Dropdown/index.js';
import '../Core/MultiSelect/index.js';
import '../Core/Trees/components/CoreTree.js';
import '../Core/Trees/components/CoreTreeSelect.js';
import '../Core/Trees/components/CoreToolbar.js';
import '../Core/Paginator/index.js';
import 'lucide-react-native';
import '../Core/SelectButton/index.js';
import '../Core/DataTable/DataTable.js';
import '../Core/Tag/index.js';
import '../Core/Badge/index.js';
import '../Core/ProgressBar/index.js';
import '../Core/Checkbox/index.js';
import '../Core/RadioButton/index.js';

const COMPONENT_MAP = {
  Button,
  Svg: View,
  List: View,
  ListItem: View,
  a: Pressable,
  Pressable,
  Box,
  Image,
  Grid,
  GridItem,
  Card,
  Text,
  Heading,
  Center,
  Skeleton,
  HStack,
  VStack,
  ScrollView
};
function useResponsiveBuilder(props, ref) {
  const {
    additionalStyles = {},
    additionalClasses,
    nativeProps,
    cssProps,
    children,
    as,
    scrollable
  } = props;
  const combinedStyles = useMemo(() => {
    return [
      style({
        ...additionalStyles,
        ...cssProps,
        ...nativeProps?.style
      })
    ];
  }, [cssProps, additionalStyles, nativeProps?.style]);
  const Component = COMPONENT_MAP[as] || View ;
  const isText = (typeof children === "string" || typeof children === "number") && as !== "Heading" && as !== "Text";
  const content = /* @__PURE__ */ jsx(
    Component,
    {
      ref,
      ...nativeProps,
      style: combinedStyles,
      className: additionalClasses,
      children: isText ? /* @__PURE__ */ jsx(Text, { children }) : children
    }
  );
  if (scrollable) {
    return /* @__PURE__ */ jsx(ScrollView, { horizontal: as === "HStack", children: content });
  }
  return content;
}

export { useResponsiveBuilder as default };
//# sourceMappingURL=useResponsiveBuilder.js.map
