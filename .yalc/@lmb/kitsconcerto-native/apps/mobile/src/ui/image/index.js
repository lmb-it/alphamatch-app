import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { createImage } from '@gluestack-ui/core/image/creator';
import { Platform, Image as Image$1 } from 'react-native';
import { tva } from '@gluestack-ui/utils/nativewind-utils';

const imageStyle = tva({
  base: "max-w-full",
  variants: {
    size: {
      "2xs": "h-6 w-6",
      "xs": "h-10 w-10",
      "sm": "h-16 w-16",
      "md": "h-20 w-20",
      "lg": "h-24 w-24",
      "xl": "h-32 w-32",
      "2xl": "h-64 w-64",
      "full": "h-full w-full",
      "none": ""
    }
  }
});
const UIImage = createImage({ Root: Image$1 });
const Image = React.forwardRef(function Image2({ size = "md", className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIImage,
    {
      className: imageStyle({ size, class: className }),
      ref,
      style: Platform.OS === "web" ? { height: "revert-layer", width: "revert-layer" } : void 0,
      ...props
    }
  );
});
Image.displayName = "Image";

export { Image };
//# sourceMappingURL=index.js.map
