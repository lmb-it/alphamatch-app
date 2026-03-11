'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');
var creator$1 = require('@gluestack-ui/core/icon/creator');
var creator = require('@gluestack-ui/core/select/creator');
var nativewind = require('nativewind');
var selectActionsheet = require('./select-actionsheet.cjs');
var reactNative = require('react-native');

const SelectTriggerWrapper = React.forwardRef(function SelectTriggerWrapper2({ ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(reactNative.Pressable, { ...props, ref });
});
const selectIconStyle = nativewindUtils.tva({
  base: "text-background-500 fill-none",
  parentVariants: {
    size: {
      "2xs": "h-3 w-3",
      "xs": "h-3.5 w-3.5",
      "sm": "h-4 w-4",
      "md": "h-[18px] w-[18px]",
      "lg": "h-5 w-5",
      "xl": "h-6 w-6"
    }
  }
});
const selectStyle = nativewindUtils.tva({
  base: ""
});
const selectTriggerStyle = nativewindUtils.tva({
  base: "border border-background-300 rounded flex-row items-center overflow-hidden data-[hover=true]:border-outline-400 data-[focus=true]:border-primary-700 data-[disabled=true]:opacity-40 data-[disabled=true]:data-[hover=true]:border-background-300",
  variants: {
    size: {
      xl: "h-12",
      lg: "h-11",
      md: "h-10",
      sm: "h-9"
    },
    variant: {
      underlined: "border-0 border-b rounded-none data-[hover=true]:border-primary-700 data-[focus=true]:border-primary-700 data-[focus=true]:web:shadow-[inset_0_-1px_0_0] data-[focus=true]:web:shadow-primary-700 data-[invalid=true]:border-error-700 data-[invalid=true]:web:shadow-error-700",
      outline: "data-[focus=true]:border-primary-700 data-[focus=true]:web:shadow-[inset_0_0_0_1px] data-[focus=true]:data-[hover=true]:web:shadow-primary-600 data-[invalid=true]:web:shadow-[inset_0_0_0_1px] data-[invalid=true]:border-error-700 data-[invalid=true]:web:shadow-error-700 data-[invalid=true]:data-[hover=true]:border-error-700",
      rounded: "rounded-full data-[focus=true]:border-primary-700 data-[focus=true]:web:shadow-[inset_0_0_0_1px] data-[focus=true]:web:shadow-primary-700 data-[invalid=true]:border-error-700 data-[invalid=true]:web:shadow-error-700"
    }
  }
});
const selectInputStyle = nativewindUtils.tva({
  base: "px-3 placeholder:text-typography-500 web:w-full h-full text-typography-900 pointer-events-none web:outline-none ios:leading-[0px] py-0",
  parentVariants: {
    size: {
      xl: "text-xl",
      lg: "text-lg",
      md: "text-base",
      sm: "text-sm"
    },
    variant: {
      underlined: "px-0",
      outline: "",
      rounded: "px-4"
    }
  }
});
const UISelect = creator.createSelect(
  {
    Root: reactNative.View,
    Trigger: nativewindUtils.withStyleContext(SelectTriggerWrapper),
    Input: reactNative.TextInput,
    Icon: creator$1.UIIcon
  },
  {
    Portal: selectActionsheet.Actionsheet,
    Backdrop: selectActionsheet.ActionsheetBackdrop,
    Content: selectActionsheet.ActionsheetContent,
    DragIndicator: selectActionsheet.ActionsheetDragIndicator,
    DragIndicatorWrapper: selectActionsheet.ActionsheetDragIndicatorWrapper,
    Item: selectActionsheet.ActionsheetItem,
    ItemText: selectActionsheet.ActionsheetItemText,
    ScrollView: selectActionsheet.ActionsheetScrollView,
    VirtualizedList: selectActionsheet.ActionsheetVirtualizedList,
    FlatList: selectActionsheet.ActionsheetFlatList,
    SectionList: selectActionsheet.ActionsheetSectionList,
    SectionHeaderText: selectActionsheet.ActionsheetSectionHeaderText
  }
);
nativewind.cssInterop(UISelect, { className: "style" });
nativewind.cssInterop(UISelect.Input, {
  className: { target: "style", nativeStyleToProp: { textAlign: true } }
});
nativewind.cssInterop(SelectTriggerWrapper, { className: "style" });
nativewind.cssInterop(creator$1.PrimitiveIcon, {
  className: {
    target: "style",
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      color: "classNameColor",
      stroke: true
    }
  }
});
const Select = React.forwardRef(function Select2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UISelect,
    {
      className: selectStyle({
        class: className
      }),
      ref,
      ...props
    }
  );
});
const SelectTrigger = React.forwardRef(function SelectTrigger2({ className, size = "md", variant = "outline", ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UISelect.Trigger,
    {
      className: selectTriggerStyle({
        class: className,
        size,
        variant
      }),
      ref,
      context: { size, variant },
      ...props
    }
  );
});
const SelectInput = React.forwardRef(function SelectInput2({ className, ...props }, ref) {
  const { size: parentSize, variant: parentVariant } = nativewindUtils.useStyleContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    UISelect.Input,
    {
      className: selectInputStyle({
        class: className,
        parentVariants: {
          size: parentSize,
          variant: parentVariant
        }
      }),
      ref,
      ...props
    }
  );
});
const SelectIcon = React.forwardRef(function SelectIcon2({ className, size, ...props }, ref) {
  const { size: parentSize } = nativewindUtils.useStyleContext();
  if (typeof size === "number") {
    return /* @__PURE__ */ jsxRuntime.jsx(
      UISelect.Icon,
      {
        ref,
        ...props,
        className: selectIconStyle({ class: className }),
        size
      }
    );
  } else if (
    //@ts-expect-error : web only
    (props?.height !== void 0 || props?.width !== void 0) && size === void 0
  ) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      UISelect.Icon,
      {
        ref,
        ...props,
        className: selectIconStyle({ class: className })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    UISelect.Icon,
    {
      className: selectIconStyle({
        class: className,
        size,
        parentVariants: {
          size: parentSize
        }
      }),
      ref,
      ...props
    }
  );
});
Select.displayName = "Select";
SelectTrigger.displayName = "SelectTrigger";
SelectInput.displayName = "SelectInput";
SelectIcon.displayName = "SelectIcon";
UISelect.Portal;
UISelect.Backdrop;
UISelect.Content;
UISelect.DragIndicator;
UISelect.DragIndicatorWrapper;
UISelect.Item;
UISelect.ScrollView;
UISelect.VirtualizedList;
UISelect.FlatList;
UISelect.SectionList;
UISelect.SectionHeaderText;

exports.Select = Select;
exports.SelectIcon = SelectIcon;
exports.SelectInput = SelectInput;
exports.SelectTrigger = SelectTrigger;
//# sourceMappingURL=index.cjs.map
