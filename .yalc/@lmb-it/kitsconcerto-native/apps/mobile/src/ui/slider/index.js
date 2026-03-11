import { jsx } from 'react/jsx-runtime';
import { createSlider } from '@gluestack-ui/core/slider/creator';
import { View, Pressable } from 'react-native';
import React from 'react';
import { withStyleContext, tva, useStyleContext } from '@gluestack-ui/utils/nativewind-utils';
import { cssInterop } from 'nativewind';

const SCOPE = "SLIDER";
const Root = withStyleContext(View, SCOPE);
const UISlider = createSlider({
  Root,
  Thumb: View,
  Track: Pressable,
  FilledTrack: View,
  ThumbInteraction: View
});
cssInterop(UISlider.Track, { className: "style" });
const sliderStyle = tva({
  base: "justify-center items-center data-[disabled=true]:opacity-40 data-[disabled=true]:web:pointer-events-none",
  variants: {
    orientation: {
      horizontal: "w-full",
      vertical: "h-full"
    },
    size: {
      sm: "",
      md: "",
      lg: ""
    },
    isReversed: {
      true: "",
      false: ""
    }
  }
});
const sliderThumbStyle = tva({
  base: "bg-primary-500 absolute rounded-full data-[focus=true]:bg-primary-600 data-[active=true]:bg-primary-600 data-[hover=true]:bg-primary-600 data-[disabled=true]:bg-primary-500 web:cursor-pointer web:data-[active=true]:outline web:data-[active=true]:outline-4 web:data-[active=true]:outline-primary-400 shadow-hard-1",
  parentVariants: {
    size: {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6"
    }
  }
});
const sliderTrackStyle = tva({
  base: "bg-background-300 rounded-lg overflow-hidden",
  parentVariants: {
    orientation: {
      horizontal: "w-full",
      vertical: "h-full"
    },
    isReversed: {
      true: "",
      false: ""
    },
    size: {
      sm: "",
      md: "",
      lg: ""
    }
  },
  parentCompoundVariants: [
    {
      orientation: "horizontal",
      size: "sm",
      class: "h-1 flex-row"
    },
    {
      orientation: "horizontal",
      size: "sm",
      isReversed: true,
      class: "h-1 flex-row-reverse"
    },
    {
      orientation: "horizontal",
      size: "md",
      class: "h-1 flex-row"
    },
    {
      orientation: "horizontal",
      size: "md",
      isReversed: true,
      class: "h-[5px] flex-row-reverse"
    },
    {
      orientation: "horizontal",
      size: "lg",
      class: "h-1.5 flex-row"
    },
    {
      orientation: "horizontal",
      size: "lg",
      isReversed: true,
      class: "h-1.5 flex-row-reverse"
    },
    {
      orientation: "vertical",
      size: "sm",
      class: "w-1 flex-col-reverse"
    },
    {
      orientation: "vertical",
      size: "sm",
      isReversed: true,
      class: "w-1 flex-col"
    },
    {
      orientation: "vertical",
      size: "md",
      class: "w-[5px] flex-col-reverse"
    },
    {
      orientation: "vertical",
      size: "md",
      isReversed: true,
      class: "w-[5px] flex-col"
    },
    {
      orientation: "vertical",
      size: "lg",
      class: "w-1.5 flex-col-reverse"
    },
    {
      orientation: "vertical",
      size: "lg",
      isReversed: true,
      class: "w-1.5 flex-col"
    }
  ]
});
const sliderFilledTrackStyle = tva({
  base: "bg-primary-500 data-[focus=true]:bg-primary-600 data-[active=true]:bg-primary-600 data-[hover=true]:bg-primary-600",
  parentVariants: {
    orientation: {
      horizontal: "h-full",
      vertical: "w-full"
    }
  }
});
React.forwardRef(function Slider2({
  //@ts-ignore
  className,
  //@ts-ignore
  size = "md",
  orientation = "horizontal",
  isReversed = false,
  ...props
}, ref) {
  return /* @__PURE__ */ jsx(
    UISlider,
    {
      ref,
      isReversed,
      orientation,
      ...props,
      className: sliderStyle({
        orientation,
        isReversed,
        class: className
      }),
      context: { size, orientation, isReversed }
    }
  );
});
React.forwardRef(function SliderThumb2({ className, size, ...props }, ref) {
  const { size: parentSize } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
    UISlider.Thumb,
    {
      ref,
      ...props,
      className: sliderThumbStyle({
        parentVariants: {
          size: parentSize
        },
        size,
        class: className
      })
    }
  );
});
React.forwardRef(function SliderTrack2({ className, ...props }, ref) {
  const {
    orientation: parentOrientation,
    size: parentSize,
    isReversed
  } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
    UISlider.Track,
    {
      ref,
      ...props,
      className: sliderTrackStyle({
        parentVariants: {
          orientation: parentOrientation,
          size: parentSize,
          isReversed
        },
        class: className
      })
    }
  );
});
React.forwardRef(function SliderFilledTrack2({ className, ...props }, ref) {
  const { orientation: parentOrientation } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
    UISlider.FilledTrack,
    {
      ref,
      ...props,
      className: sliderFilledTrackStyle({
        parentVariants: {
          orientation: parentOrientation
        },
        class: className
      })
    }
  );
});

export { UISlider };
//# sourceMappingURL=index.js.map
