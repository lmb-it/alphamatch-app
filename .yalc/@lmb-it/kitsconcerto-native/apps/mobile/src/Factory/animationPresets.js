import { FlipInYRight, FlipInYLeft, FlipInXUp, FlipInXDown, BounceIn, ZoomIn, SlideInRight, SlideInLeft, SlideInDown, SlideInUp, FadeInRight, FadeInLeft, FadeInDown, FadeInUp, FadeIn, BounceOut, ZoomOut, SlideOutRight, SlideOutLeft, SlideOutDown, SlideOutUp, FadeOutRight, FadeOutLeft, FadeOutDown, FadeOutUp, FadeOut } from 'react-native-reanimated';

const enteringPresets = {
  fadeIn: FadeIn,
  fadeInUp: FadeInUp,
  fadeInDown: FadeInDown,
  fadeInLeft: FadeInLeft,
  fadeInRight: FadeInRight,
  slideInUp: SlideInUp,
  slideInDown: SlideInDown,
  slideInLeft: SlideInLeft,
  slideInRight: SlideInRight,
  zoomIn: ZoomIn,
  zoomInUp: ZoomIn,
  zoomInDown: ZoomIn,
  zoomInLeft: ZoomIn,
  zoomInRight: ZoomIn,
  scaleIn: ZoomIn,
  bounceIn: BounceIn,
  flip: FlipInXDown,
  flipUp: FlipInXUp,
  flipLeft: FlipInYLeft,
  flipRight: FlipInYRight
};
const exitingPresets = {
  fadeOut: FadeOut,
  fadeOutUp: FadeOutUp,
  fadeOutDown: FadeOutDown,
  fadeOutLeft: FadeOutLeft,
  fadeOutRight: FadeOutRight,
  slideOutUp: SlideOutUp,
  slideOutDown: SlideOutDown,
  slideOutLeft: SlideOutLeft,
  slideOutRight: SlideOutRight,
  zoomOut: ZoomOut,
  bounceOut: BounceOut
};

export { enteringPresets, exitingPresets };
//# sourceMappingURL=animationPresets.js.map
