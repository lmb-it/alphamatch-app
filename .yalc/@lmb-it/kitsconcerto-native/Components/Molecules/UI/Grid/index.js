import { jsx } from 'react/jsx-runtime';
import React, { forwardRef } from 'react';
import useSeparator from '../../../../apps/mobile/src/Factory/useSeparator.js';
import ResponsiveElement from '../../../../apps/mobile/src/Factory/ResponsiveElement.js';
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
import { toNativeValue } from '../../../../apps/mobile/src/Factory/helpers/style.js';
import '../../../../apps/mobile/src/Factory/DimensionsContext.js';
import 'i18next';
import 'react-i18next';
import '../../../../apps/mobile/src/Core/AutoComplete/index.js';
import '../../../../apps/mobile/src/Core/Dropdown/index.js';
import '../../../../apps/mobile/src/Core/MultiSelect/index.js';
import '../../../../apps/mobile/src/Core/Trees/components/CoreTree.js';
import '../../../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.js';
import '../../../../apps/mobile/src/Core/Trees/components/CoreToolbar.js';
import '../../../../apps/mobile/src/Core/Paginator/index.js';
import 'lucide-react-native';
import '../../../../apps/mobile/src/Core/SelectButton/index.js';
import '../../../../apps/mobile/src/Core/DataTable/DataTable.js';
import '../../../../apps/mobile/src/Core/Tag/index.js';
import '../../../../apps/mobile/src/Core/Badge/index.js';
import '../../../../apps/mobile/src/Core/ProgressBar/index.js';
import '../../../../apps/mobile/src/Core/Checkbox/index.js';
import '../../../../apps/mobile/src/Core/RadioButton/index.js';

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
const Grid = forwardRef((props, ref) => {
  const { cssProps, nativeProps } = useSeparator(props);
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
    gap: gapValue != null ? toNativeValue(gapValue) : void 0,
    columnGap: columnGapValue != null ? toNativeValue(columnGapValue) : void 0,
    rowGap: rowGapValue != null ? toNativeValue(rowGapValue) : void 0,
    padding: paddingValue != null ? toNativeValue(paddingValue) : void 0,
    _extra: { ...typeof _extra === "object" ? _extra : {}, className: gridColsClass }
  });
  return /* @__PURE__ */ jsx(
    ResponsiveElement,
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
        gap: gapValue != null ? toNativeValue(gapValue) : void 0,
        columnGap: columnGapValue != null ? toNativeValue(columnGapValue) : void 0,
        rowGap: rowGapValue != null ? toNativeValue(rowGapValue) : void 0,
        padding: paddingValue != null ? toNativeValue(paddingValue) : void 0,
        _extra: { ...typeof _extra === "object" ? _extra : {}, className: gridColsClass }
      },
      children: processedChildren
    }
  );
});

export { Grid as default };
//# sourceMappingURL=index.js.map
