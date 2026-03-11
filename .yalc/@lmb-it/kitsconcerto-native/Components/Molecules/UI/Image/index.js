import { jsx } from 'react/jsx-runtime';
import useSeparator from '../../../../apps/mobile/src/Factory/useSeparator.js';
import ResponsiveElement from '../../../../apps/mobile/src/Factory/ResponsiveElement.js';

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
  const { cssProps, nativeProps } = useSeparator(props);
  return /* @__PURE__ */ jsx(
    ResponsiveElement,
    {
      nativeProps: { ...nativeProps, ...stylingProps, source },
      ref,
      cssProps,
      as: "Image"
    }
  );
};

export { Image as default };
//# sourceMappingURL=index.js.map
