'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var useSeparator = require('../../../../apps/mobile/src/Factory/useSeparator.cjs');
var ResponsiveElement = require('../../../../apps/mobile/src/Factory/ResponsiveElement.cjs');

const mapImageStylingProps = (props) => {
  let resizeMode;
  if (props.objectFit) {
    resizeMode = props.objectFit;
  } else {
    resizeMode = void 0;
  }
  return { resizeMode };
};
const Image = ({ style, ref, src, ...props }) => {
  const source = src ? { uri: src } : props.source;
  const stylingProps = mapImageStylingProps(props);
  const { cssProps, nativeProps } = useSeparator.default(props);
  return /* @__PURE__ */ jsxRuntime.jsx(
    ResponsiveElement.default,
    {
      nativeProps: { ...nativeProps, ...stylingProps, source },
      ref,
      cssProps,
      as: "Image"
    }
  );
};

exports.default = Image;
//# sourceMappingURL=index.cjs.map
