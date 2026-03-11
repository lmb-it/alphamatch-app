import { jsx } from 'react/jsx-runtime';
import { ImageBackground as ImageBackground$1 } from 'react-native';
import React from 'react';
import { tva } from '@gluestack-ui/utils/nativewind-utils';

const imageBackgroundStyle = tva({});
const ImageBackground = React.forwardRef(function ImageBackground2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    ImageBackground$1,
    {
      className: imageBackgroundStyle({
        class: className
      }),
      ...props,
      ref
    }
  );
});
ImageBackground.displayName = "ImageBackground";

export { ImageBackground };
//# sourceMappingURL=index.js.map
