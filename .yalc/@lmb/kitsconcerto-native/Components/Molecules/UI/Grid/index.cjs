'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
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
var ResponsiveElement = require('../../../../apps/mobile/src/Factory/ResponsiveElement.cjs');
var style = require('../../../../apps/mobile/src/Factory/helpers/style.cjs');
var useSeparator = require('../../../../apps/mobile/src/Factory/useSeparator.cjs');
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
    const order = ["base", "xs", "sm", "md", "lg", "xl", "xxl", "xxxl"];
    for (const k of order) if (k in v) return v[k];
    const first = Object.values(v)[0];
    return first;
  }
  return v;
};
const extractGridCols = (tpl) => {
  if (typeof tpl === "number") return `grid-cols-${tpl}`;
  if (typeof tpl === "string") {
    const match = tpl.match(/repeat\((\d+)\s*,/i);
    if (match) return `grid-cols-${match[1]}`;
    if (tpl.includes("grid-cols-")) return tpl;
  }
  return void 0;
};
const Grid = React.forwardRef((props, ref) => {
  const { cssProps, nativeProps } = useSeparator.default(props);
  const { children, className, _extra, ...rest } = nativeProps;
  const columns = rest.columns ?? pickFirstResponsive(cssProps.columns) ?? pickFirstResponsive(cssProps.gridTemplateColumns);
  const gridColsClass = extractGridCols(columns) ?? "";
  const gapValue = pickFirstResponsive(cssProps.gap);
  const columnGapValue = pickFirstResponsive(cssProps.columnGap);
  const rowGapValue = pickFirstResponsive(cssProps.rowGap);
  const paddingValue = pickFirstResponsive(cssProps.p ?? cssProps.padding);
  const { gap: _g, columnGap: _cg, rowGap: _rg, p: _p, padding: _pad, columns: _c, gridTemplateColumns: _gt, ...restCssProps } = cssProps;
  const processedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const childProps = child.props;
    const colSpan = childProps?.colSpan;
    let colSpanClass = "";
    if (typeof colSpan === "number") colSpanClass = `col-span-${colSpan}`;
    else if (typeof colSpan === "string") colSpanClass = colSpan.includes("col-span-") ? colSpan : `col-span-${colSpan}`;
    if (!colSpanClass) return child;
    return React.cloneElement(child, {
      _extra: {
        ...typeof childProps._extra === "object" ? childProps._extra : {},
        className: colSpanClass
      }
    });
  });
  console.log({
    ...rest,
    gap: gapValue != null ? style.toNativeValue(gapValue) : void 0,
    columnGap: columnGapValue != null ? style.toNativeValue(columnGapValue) : void 0,
    rowGap: rowGapValue != null ? style.toNativeValue(rowGapValue) : void 0,
    padding: paddingValue != null ? style.toNativeValue(paddingValue) : void 0,
    _extra: { ...typeof _extra === "object" ? _extra : {}, className: gridColsClass }
  });
  return /* @__PURE__ */ jsxRuntime.jsx(
    ResponsiveElement.default,
    {
      ref,
      as: "Grid",
      cssProps: {
        width: "100%",
        ...restCssProps
      },
      nativeProps: {
        ...rest,
        // @ts-ignore
        gap: gapValue != null ? style.toNativeValue(gapValue) : void 0,
        columnGap: columnGapValue != null ? style.toNativeValue(columnGapValue) : void 0,
        rowGap: rowGapValue != null ? style.toNativeValue(rowGapValue) : void 0,
        padding: paddingValue != null ? style.toNativeValue(paddingValue) : void 0,
        _extra: { ...typeof _extra === "object" ? _extra : {}, className: gridColsClass }
      },
      children: processedChildren
    }
  );
});

exports.default = Grid;
//# sourceMappingURL=index.cjs.map
