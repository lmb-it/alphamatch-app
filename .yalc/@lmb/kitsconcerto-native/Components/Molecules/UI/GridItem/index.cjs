'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var useSeparator = require('../../../../apps/mobile/src/Factory/useSeparator.cjs');
require('react/jsx-runtime');
require('react-native');
require('react-native-reanimated');
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
var useResponsiveBuilder = require('../../../../apps/mobile/src/Factory/useResponsiveBuilder.cjs');
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
require('../../../../packages/types/src/Css/map/index.cjs');
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

const pickFirstResponsive = (v) => {
  if (v == null) return void 0;
  if (Array.isArray(v)) return v[0];
  if (typeof v === "object") {
    const order = ["base", "sm", "md", "lg", "xl", "xxl", "xxxl"];
    for (const k of order) if (k in v) return v[k];
    const first = Object.values(v)[0];
    return first;
  }
  return v;
};
const GridItem = React.forwardRef((props, ref) => {
  const { cssProps, nativeProps } = useSeparator.default(props);
  const { children, className, _extra, ...rest } = nativeProps;
  const colSpan = rest.colSpan ?? pickFirstResponsive(cssProps.colSpan) ?? pickFirstResponsive(cssProps.gridColumn);
  const colSpanClass = typeof colSpan === "number" ? `col-span-${colSpan}` : typeof colSpan === "string" && colSpan.includes("col-span-") ? colSpan : "";
  return useResponsiveBuilder.default(
    {
      as: "GridItem",
      cssProps,
      additionalClasses: className,
      nativeProps: {
        ...rest,
        _extra: {
          ...typeof _extra === "object" ? _extra : {},
          className: colSpanClass
        }
      },
      children
    },
    ref
  );
});

exports.default = GridItem;
exports.pickFirstResponsive = pickFirstResponsive;
//# sourceMappingURL=index.cjs.map
