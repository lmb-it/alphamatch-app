import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { H4 } from '@expo/html-elements';
import { createActionsheet } from '@gluestack-ui/core/actionsheet/creator';
import { Pressable, SectionList, FlatList, VirtualizedList, ScrollView, View, Text } from 'react-native';
import { UIIcon, PrimitiveIcon } from '@gluestack-ui/core/icon/creator';
import { tva } from '@gluestack-ui/utils/nativewind-utils';
import { cssInterop } from 'nativewind';
import { Motion, createMotionAnimatedComponent, AnimatePresence } from '@legendapp/motion';

const ItemWrapper = React.forwardRef(function ItemWrapper2({ ...props }, ref) {
  return /* @__PURE__ */ jsx(Pressable, { ...props, ref });
});
const MotionView = Motion.View;
const AnimatedPressable = createMotionAnimatedComponent(
  Pressable
);
const UIActionsheet = createActionsheet({
  Root: View,
  Content: MotionView,
  Item: ItemWrapper,
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
cssInterop(ItemWrapper, { className: "style" });
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
  base: "items-center rounded-tl-3xl rounded-tr-3xl p-5 pt-2 bg-background-0 web:pointer-events-auto web:select-none shadow-hard-5 border border-b-0 border-outline-100 pb-safe"
});
const actionsheetItemStyle = tva({
  base: "w-full flex-row items-center p-3 rounded-sm data-[disabled=true]:opacity-40 data-[disabled=true]:web:pointer-events-auto data-[disabled=true]:web:cursor-not-allowed hover:bg-background-50 active:bg-background-100 data-[focus=true]:bg-background-100 web:data-[focus-visible=true]:bg-background-100 web:data-[focus-visible=true]:outline-indicator-primary gap-2"
});
const actionsheetItemTextStyle = tva({
  base: "text-typography-700 font-normal font-body",
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
  base: "text-background-500 fill-none",
  variants: {
    size: {
      "2xs": "h-3 w-3",
      "xs": "h-3.5 w-3.5",
      "sm": "h-4 w-4",
      "md": "w-[18px] h-[18px]",
      "lg": "h-5 w-5",
      "xl": "h-6 w-6"
    }
  }
});
React.forwardRef(function Actionsheet2({ className, ...props }, ref) {
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
React.forwardRef(function ActionsheetContent2({ className, ...props }, ref) {
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
React.forwardRef(function ActionsheetItem2({ className, ...props }, ref) {
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
React.forwardRef(function ActionsheetItemText2({
  isTruncated,
  bold,
  underline,
  strikeThrough,
  size = "sm",
  className,
  ...props
}, ref) {
  return /* @__PURE__ */ jsx(
    UIActionsheet.ItemText,
    {
      className: actionsheetItemTextStyle({
        class: className,
        isTruncated: Boolean(isTruncated),
        bold: Boolean(bold),
        underline: Boolean(underline),
        strikeThrough: Boolean(strikeThrough),
        size
      }),
      ref,
      ...props
    }
  );
});
React.forwardRef(function ActionsheetDragIndicator2({ className, ...props }, ref) {
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
React.forwardRef(function ActionsheetDragIndicatorWrapper2({ className, ...props }, ref) {
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
React.forwardRef(function ActionsheetBackdrop2({ className, ...props }, ref) {
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
React.forwardRef(function ActionsheetScrollView2({ className, ...props }, ref) {
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
React.forwardRef(function ActionsheetVirtualizedList2({ className, ...props }, ref) {
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
React.forwardRef(function ActionsheetFlatList2({ className, ...props }, ref) {
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
React.forwardRef(function ActionsheetSectionList2({ className, ...props }, ref) {
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
React.forwardRef(function ActionsheetSectionHeaderText2({
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
        isTruncated: Boolean(isTruncated),
        bold: Boolean(bold),
        underline: Boolean(underline),
        strikeThrough: Boolean(strikeThrough),
        size,
        sub: Boolean(sub),
        italic: Boolean(italic),
        highlight: Boolean(highlight)
      }),
      ref,
      ...props
    }
  );
});
React.forwardRef(function ActionsheetIcon2({ className, size = "sm", ...props }, ref) {
  if (typeof size === "number") {
    return /* @__PURE__ */ jsx(
      UIActionsheet.Icon,
      {
        ref,
        ...props,
        className: actionsheetIconStyle({ class: className }),
        size
      }
    );
  } else if ((props.height !== void 0 || props.width !== void 0) && size === void 0) {
    return /* @__PURE__ */ jsx(
      UIActionsheet.Icon,
      {
        ref,
        ...props,
        className: actionsheetIconStyle({ class: className })
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

export { UIActionsheet };
//# sourceMappingURL=index.js.map
