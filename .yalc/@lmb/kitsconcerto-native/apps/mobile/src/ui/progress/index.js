import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { createProgress } from '@gluestack-ui/core/progress/creator';
import { View } from 'react-native';
import { withStyleContext, tva, useStyleContext } from '@gluestack-ui/utils/nativewind-utils';
import { cssInterop } from 'nativewind';

const SCOPE = "PROGRESS";
const UIProgress = createProgress({
  Root: withStyleContext(View, SCOPE),
  FilledTrack: View
});
cssInterop(UIProgress, { className: "style" });
cssInterop(UIProgress.FilledTrack, { className: "style" });
const progressStyle = tva({
  base: "bg-background-300 rounded-full w-full",
  variants: {
    orientation: {
      horizontal: "w-full",
      vertical: "h-full"
    },
    size: {
      "xs": "h-1",
      "sm": "h-2",
      "md": "h-3",
      "lg": "h-4",
      "xl": "h-5",
      "2xl": "h-6"
    }
  },
  compoundVariants: [
    {
      orientation: "vertical",
      size: "xs",
      class: "h-full w-1 justify-end"
    },
    {
      orientation: "vertical",
      size: "sm",
      class: "h-full w-2 justify-end"
    },
    {
      orientation: "vertical",
      size: "md",
      class: "h-full w-3 justify-end"
    },
    {
      orientation: "vertical",
      size: "lg",
      class: "h-full w-4 justify-end"
    },
    {
      orientation: "vertical",
      size: "xl",
      class: "h-full w-5 justify-end"
    },
    {
      orientation: "vertical",
      size: "2xl",
      class: "h-full w-6 justify-end"
    }
  ]
});
const progressFilledTrackStyle = tva({
  base: "bg-primary-500 rounded-full",
  parentVariants: {
    orientation: {
      horizontal: "w-full",
      vertical: "h-full"
    },
    size: {
      "xs": "h-1",
      "sm": "h-2",
      "md": "h-3",
      "lg": "h-4",
      "xl": "h-5",
      "2xl": "h-6"
    }
  },
  parentCompoundVariants: [
    {
      orientation: "vertical",
      size: "xs",
      class: "h-full w-1"
    },
    {
      orientation: "vertical",
      size: "sm",
      class: "h-full w-2"
    },
    {
      orientation: "vertical",
      size: "md",
      class: "h-full w-3"
    },
    {
      orientation: "vertical",
      size: "lg",
      class: "h-full w-4"
    },
    {
      orientation: "vertical",
      size: "xl",
      class: "h-full w-5"
    },
    {
      orientation: "vertical",
      size: "2xl",
      class: "h-full w-6"
    }
  ]
});
React.forwardRef(function Progress2({ className, size = "md", orientation = "horizontal", ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIProgress,
    {
      ref,
      ...props,
      className: progressStyle({ size, orientation, class: className }),
      context: { size, orientation },
      orientation
    }
  );
});
React.forwardRef(function ProgressFilledTrack2({ className, ...props }, ref) {
  const { size: parentSize, orientation: parentOrientation } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
    UIProgress.FilledTrack,
    {
      ref,
      className: progressFilledTrackStyle({
        parentVariants: {
          size: parentSize,
          orientation: parentOrientation
        },
        class: className
      }),
      ...props
    }
  );
});

export { UIProgress };
//# sourceMappingURL=index.js.map
