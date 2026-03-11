'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
var styles = require('./styles.cjs');
var nativewind = require('nativewind');
var hooks = require('@gluestack-ui/utils/hooks');

const { width: DEVICE_WIDTH } = reactNative.Dimensions.get("window");
const GridContext = React.createContext({});
function arrangeChildrenIntoRows({
  childrenArray,
  colSpanArr,
  numColumns
}) {
  let currentRow = 1;
  let currentRowTotalColSpan = 0;
  const rowItemsCount = {};
  for (let i = 0; i < childrenArray.length; i++) {
    const colSpan = colSpanArr[i];
    if (currentRowTotalColSpan + colSpan > numColumns) {
      currentRow++;
      currentRowTotalColSpan = colSpan;
    } else {
      currentRowTotalColSpan += colSpan;
    }
    rowItemsCount[currentRow] = rowItemsCount[currentRow] ? [...rowItemsCount[currentRow], i] : [i];
  }
  return rowItemsCount;
}
function generateResponsiveNumColumns({ gridClass }) {
  const gridClassNamePattern = /\b(?:\w+:)?grid-cols-?\d+\b/g;
  const numColumns = gridClass?.match(gridClassNamePattern);
  if (!numColumns) {
    return 12;
  }
  const regex = /^(?:(\w+):)?grid-cols-?(\d+)$/;
  const result = {};
  numColumns.forEach((classname) => {
    const match = classname.match(regex);
    if (match) {
      const prefix = match[1] || "default";
      const value = parseInt(match[2], 10);
      result[prefix] = value;
    }
  });
  return result;
}
function generateResponsiveColSpans({
  gridItemClassName
}) {
  const gridClassNamePattern = /\b(?:\w+:)?col-span-?\d+\b/g;
  const colSpan = gridItemClassName?.match(gridClassNamePattern);
  if (!colSpan) {
    return 1;
  }
  const regex = /^(?:(\w+):)?col-span-?(\d+)$/;
  const result = {};
  colSpan.forEach((classname) => {
    const match = classname.match(regex);
    if (match) {
      const prefix = match[1] || "default";
      const value = parseInt(match[2], 10);
      result[prefix] = value;
    }
  });
  return result;
}
const Grid = React.forwardRef(
  function Grid2({ className, _extra, children, ...props }, ref) {
    const [calculatedWidth, setCalculatedWidth] = React.useState(null);
    const gridClass = _extra?.className;
    const obj = generateResponsiveNumColumns({ gridClass });
    const responsiveNumColumns = hooks.useBreakpointValue(obj);
    const itemsPerRow = React.useMemo(() => {
      const colSpanArr = React.Children.map(children, (child) => {
        const gridItemClassName = child?.props?._extra?.className;
        const colSpan2 = hooks.getBreakPointValue(
          generateResponsiveColSpans({ gridItemClassName }),
          DEVICE_WIDTH
        );
        const colSpan = colSpan2 ? colSpan2 : 1;
        if (colSpan > responsiveNumColumns) {
          return responsiveNumColumns;
        }
        return colSpan;
      });
      const childrenArray = React.Children.toArray(children);
      const rowItemsCount = arrangeChildrenIntoRows({
        childrenArray,
        colSpanArr,
        numColumns: responsiveNumColumns
      });
      return rowItemsCount;
    }, [responsiveNumColumns, children]);
    const childrenWithProps = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { key: index, index });
      }
      return child;
    });
    const gridClassMerged = `${reactNative.Platform.select({
      web: gridClass ?? ""
    })}`;
    const contextValue = React.useMemo(() => {
      return {
        calculatedWidth,
        numColumns: responsiveNumColumns,
        itemsPerRow,
        flexDirection: props?.flexDirection || "row",
        gap: props?.gap || 0,
        columnGap: props?.columnGap || 0
      };
    }, [calculatedWidth, itemsPerRow, responsiveNumColumns, props]);
    const borderLeftWidth = props?.borderLeftWidth || props?.borderWidth || 0;
    const borderRightWidth = props?.borderRightWidth || props?.borderWidth || 0;
    const borderWidthToSubtract = borderLeftWidth + borderRightWidth;
    return /* @__PURE__ */ jsxRuntime.jsx(GridContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.View,
      {
        ref,
        className: styles.gridStyle({
          class: className + " " + gridClassMerged
        }),
        onLayout: (event) => {
          const paddingLeftToSubtract = props?.paddingStart || props?.paddingLeft || props?.padding || 0;
          const paddingRightToSubtract = props?.paddingEnd || props?.paddingRight || props?.padding || 0;
          const gridWidth = Math.floor(event.nativeEvent.layout.width) - paddingLeftToSubtract - paddingRightToSubtract - borderWidthToSubtract;
          setCalculatedWidth(gridWidth);
        },
        ...props,
        children: calculatedWidth && childrenWithProps
      }
    ) });
  }
);
nativewind.cssInterop(Grid, {
  className: {
    target: "style",
    nativeStyleToProp: {
      gap: "gap",
      rowGap: "rowGap",
      columnGap: "columnGap",
      flexDirection: "flexDirection",
      padding: "padding",
      paddingLeft: "paddingLeft",
      paddingRight: "paddingRight",
      paddingStart: "paddingStart",
      paddingEnd: "paddingEnd",
      borderWidth: "borderWidth",
      borderLeftWidth: "borderLeftWidth",
      borderRightWidth: "borderRightWidth"
    }
  }
});
const GridItem = React.forwardRef(
  function GridItem2({ className, _extra, ...props }, ref) {
    const {
      calculatedWidth,
      numColumns,
      itemsPerRow,
      flexDirection,
      gap,
      columnGap
    } = React.useContext(GridContext);
    const gridItemClass = _extra?.className;
    const responsiveColSpan = hooks.useBreakpointValue(
      generateResponsiveColSpans({ gridItemClassName: gridItemClass })
    ) ?? 1;
    const flexBasisValue = React.useMemo(() => {
      if (!calculatedWidth || !numColumns || responsiveColSpan <= 0) {
        return "auto";
      }
      if (flexDirection?.includes("column")) {
        return "auto";
      }
      const row = Object.keys(itemsPerRow).find((key) => {
        return itemsPerRow[key].includes(props?.index);
      });
      if (!row) {
        return "auto";
      }
      const rowColsCount = itemsPerRow[row]?.length || 1;
      const space = columnGap || gap || 0;
      const totalGapWidth = space * (rowColsCount - 1);
      const availableWidth = calculatedWidth - totalGapWidth;
      const itemWidth = availableWidth * responsiveColSpan / numColumns;
      return Math.max(0, Math.floor(itemWidth));
    }, [
      calculatedWidth,
      responsiveColSpan,
      numColumns,
      columnGap,
      gap,
      flexDirection,
      itemsPerRow,
      props?.index
    ]);
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.View,
      {
        ref,
        gridItemClass,
        className: styles.gridItemStyle({
          class: className
        }),
        ...props,
        style: [
          {
            width: typeof flexBasisValue === "number" ? flexBasisValue : void 0,
            flexBasis: typeof flexBasisValue === "string" ? flexBasisValue : void 0,
            flexShrink: 0,
            flexGrow: 0
          },
          props.style
        ]
      }
    );
  }
);
Grid.displayName = "Grid";
GridItem.displayName = "GridItem";

exports.Grid = Grid;
exports.GridItem = GridItem;
//# sourceMappingURL=index.cjs.map
