import { jsx } from 'react/jsx-runtime';
import { H4 } from '@expo/html-elements';
import { createActionsheet } from '@gluestack-ui/core/actionsheet/creator';
import { Pressable, SectionList, FlatList, VirtualizedList, ScrollView, View, Text } from 'react-native';
import { UIIcon, PrimitiveIcon } from '@gluestack-ui/core/icon/creator';
import { withStyleContext, tva } from '@gluestack-ui/utils/nativewind-utils';
import { cssInterop } from 'nativewind';
import { createMotionAnimatedComponent, Motion, AnimatePresence } from '@legendapp/motion';
import React from 'react';

const AnimatedPressable = createMotionAnimatedComponent(
  Pressable
);
const MotionView = Motion.View;
const UIActionsheet = createActionsheet({
  Root: View,
  Content: withStyleContext(MotionView),
  Item: withStyleContext(Pressable),
  ItemText: Text,
  DragIndicator: View,
  IndicatorWrapper: View,
  Backdrop: AnimatedPressable,
  ScrollView,
  VirtualizedList,
  FlatList,
  SectionList,
  SectionHeaderText: H4,
  Icon: UIIcon,
  AnimatePresence
});
cssInterop(UIActionsheet, { className: "style" });
cssInterop(UIActionsheet.Content, { className: "style" });
cssInterop(UIActionsheet.Item, { className: "style" });
cssInterop(UIActionsheet.ItemText, { className: "style" });
cssInterop(UIActionsheet.DragIndicator, { className: "style" });
cssInterop(UIActionsheet.DragIndicatorWrapper, { className: "style" });
cssInterop(UIActionsheet.Backdrop, { className: "style" });
cssInterop(UIActionsheet.ScrollView, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
  indicatorClassName: "indicatorStyle"
});
cssInterop(UIActionsheet.VirtualizedList, {
  className: "style",
  ListFooterComponentClassName: "ListFooterComponentStyle",
  ListHeaderComponentClassName: "ListHeaderComponentStyle",
  contentContainerClassName: "contentContainerStyle",
  indicatorClassName: "indicatorStyle"
});
cssInterop(UIActionsheet.FlatList, {
  className: "style",
  ListFooterComponentClassName: "ListFooterComponentStyle",
  ListHeaderComponentClassName: "ListHeaderComponentStyle",
  columnWrapperClassName: "columnWrapperStyle",
  contentContainerClassName: "contentContainerStyle",
  indicatorClassName: "indicatorStyle"
});
cssInterop(UIActionsheet.SectionList, { className: "style" });
cssInterop(UIActionsheet.SectionHeaderText, { className: "style" });
cssInterop(PrimitiveIcon, {
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
const actionsheetStyle = tva({ base: "w-full h-full web:pointer-events-none" });
const actionsheetContentStyle = tva({
  base: "items-center rounded-tl-3xl rounded-tr-3xl p-2 bg-background-0 web:pointer-events-auto web:select-none shadow-lg pb-safe"
});
const actionsheetItemStyle = tva({
  base: "w-full flex-row items-center p-3 rounded-sm data-[disabled=true]:opacity-40 data-[disabled=true]:web:pointer-events-auto data-[disabled=true]:web:cursor-not-allowed hover:bg-background-50 active:bg-background-100 data-[focus=true]:bg-background-100 web:data-[focus-visible=true]:bg-background-100 data-[checked=true]:bg-background-100"
});
const actionsheetItemTextStyle = tva({
  base: "text-typography-700 font-normal font-body tracking-md text-left mx-2",
  variants: {
    isTruncated: {
      true: ""
    },
    bold: {
      true: "font-bold"
    },
    underline: {
      true: "underline"
    },
    strikeThrough: {
      true: "line-through"
    },
    size: {
      "2xs": "text-2xs",
      "xs": "text-xs",
      "sm": "text-sm",
      "md": "text-base",
      "lg": "text-lg",
      "xl": "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
const actionsheetDragIndicatorStyle = tva({
  base: "w-16 h-1 bg-background-400 rounded-full"
});
const actionsheetDragIndicatorWrapperStyle = tva({
  base: "w-full py-1 items-center"
});
const actionsheetBackdropStyle = tva({
  base: "absolute left-0 top-0 right-0 bottom-0 bg-background-dark web:cursor-default web:pointer-events-auto"
});
const actionsheetScrollViewStyle = tva({
  base: "w-full h-auto"
});
const actionsheetVirtualizedListStyle = tva({
  base: "w-full h-auto"
});
const actionsheetFlatListStyle = tva({
  base: "w-full h-auto"
});
const actionsheetSectionListStyle = tva({
  base: "w-full h-auto"
});
const actionsheetSectionHeaderTextStyle = tva({
  base: "leading-5 font-bold font-heading my-0 text-typography-500 p-3 uppercase",
  variants: {
    isTruncated: {
      true: ""
    },
    bold: {
      true: "font-bold"
    },
    underline: {
      true: "underline"
    },
    strikeThrough: {
      true: "line-through"
    },
    size: {
      "5xl": "text-5xl",
      "4xl": "text-4xl",
      "3xl": "text-3xl",
      "2xl": "text-2xl",
      "xl": "text-xl",
      "lg": "text-lg",
      "md": "text-base",
      "sm": "text-sm",
      "xs": "text-xs"
    },
    sub: {
      true: "text-xs"
    },
    italic: {
      true: "italic"
    },
    highlight: {
      true: "bg-yellow500"
    }
  },
  defaultVariants: {
    size: "xs"
  }
});
const actionsheetIconStyle = tva({
  base: "text-typography-900",
  variants: {
    size: {
      "2xs": "h-3 w-3",
      "xs": "h-3.5 w-3.5",
      "sm": "h-4 w-4",
      "md": "w-4 h-4",
      "lg": "h-5 w-5",
      "xl": "h-6 w-6"
    }
  }
});
const Actionsheet = React.forwardRef(function Actionsheet2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIActionsheet,
    {
      className: actionsheetStyle({
        class: className
      }),
      ref,
      ...props
    }
  );
});
const ActionsheetContent = React.forwardRef(function ActionsheetContent2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIActionsheet.Content,
    {
      className: actionsheetContentStyle({
        class: className
      }),
      ref,
      ...props
    }
  );
});
const ActionsheetItem = React.forwardRef(function ActionsheetItem2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIActionsheet.Item,
    {
      className: actionsheetItemStyle({
        class: className
      }),
      ref,
      ...props
    }
  );
});
const ActionsheetItemText = React.forwardRef(function ActionsheetItemText2({ className, isTruncated, bold, underline, strikeThrough, size, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIActionsheet.ItemText,
    {
      className: actionsheetItemTextStyle({
        class: className,
        isTruncated,
        bold,
        underline,
        strikeThrough,
        size
      }),
      ref,
      ...props
    }
  );
});
const ActionsheetDragIndicator = React.forwardRef(function ActionsheetDragIndicator2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIActionsheet.DragIndicator,
    {
      className: actionsheetDragIndicatorStyle({
        class: className
      }),
      ref,
      ...props
    }
  );
});
const ActionsheetDragIndicatorWrapper = React.forwardRef(function ActionsheetDragIndicatorWrapper2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIActionsheet.DragIndicatorWrapper,
    {
      className: actionsheetDragIndicatorWrapperStyle({
        class: className
      }),
      ref,
      ...props
    }
  );
});
const ActionsheetBackdrop = React.forwardRef(function ActionsheetBackdrop2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIActionsheet.Backdrop,
    {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 0.5
      },
      exit: {
        opacity: 0
      },
      ...props,
      className: actionsheetBackdropStyle({
        class: className
      }),
      ref
    }
  );
});
const ActionsheetScrollView = React.forwardRef(function ActionsheetScrollView2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIActionsheet.ScrollView,
    {
      className: actionsheetScrollViewStyle({
        class: className
      }),
      ref,
      ...props
    }
  );
});
const ActionsheetVirtualizedList = React.forwardRef(function ActionsheetVirtualizedList2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIActionsheet.VirtualizedList,
    {
      className: actionsheetVirtualizedListStyle({
        class: className
      }),
      ref,
      ...props
    }
  );
});
const ActionsheetFlatList = React.forwardRef(function ActionsheetFlatList2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIActionsheet.FlatList,
    {
      className: actionsheetFlatListStyle({
        class: className
      }),
      ref,
      ...props
    }
  );
});
const ActionsheetSectionList = React.forwardRef(function ActionsheetSectionList2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIActionsheet.SectionList,
    {
      className: actionsheetSectionListStyle({
        class: className
      }),
      ref,
      ...props
    }
  );
});
const ActionsheetSectionHeaderText = React.forwardRef(function ActionsheetSectionHeaderText2({
  className,
  isTruncated,
  bold,
  underline,
  strikeThrough,
  size,
  sub,
  italic,
  highlight,
  ...props
}, ref) {
  return /* @__PURE__ */ jsx(
    UIActionsheet.SectionHeaderText,
    {
      className: actionsheetSectionHeaderTextStyle({
        class: className,
        isTruncated,
        bold,
        underline,
        strikeThrough,
        size,
        sub,
        italic,
        highlight
      }),
      ref,
      ...props
    }
  );
});
React.forwardRef(function ActionsheetIcon2({ className, as: AsComp, size = "sm", ...props }, ref) {
  if (AsComp) {
    return /* @__PURE__ */ jsx(
      AsComp,
      {
        className: actionsheetIconStyle({
          class: className,
          size
        }),
        ref,
        ...props
      }
    );
  }
  return /* @__PURE__ */ jsx(
    UIActionsheet.Icon,
    {
      className: actionsheetIconStyle({
        class: className,
        size
      }),
      ref,
      ...props
    }
  );
});

export { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetFlatList, ActionsheetItem, ActionsheetItemText, ActionsheetScrollView, ActionsheetSectionHeaderText, ActionsheetSectionList, ActionsheetVirtualizedList, UIActionsheet };
//# sourceMappingURL=select-actionsheet.js.map
