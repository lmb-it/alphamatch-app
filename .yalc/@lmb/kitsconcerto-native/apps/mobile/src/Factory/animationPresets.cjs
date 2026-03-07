'use strict';

var Animated = require('react-native-reanimated');

const enteringPresets = {
  fadeIn: Animated.FadeIn,
  fadeInUp: Animated.FadeInUp,
  fadeInDown: Animated.FadeInDown,
  fadeInLeft: Animated.FadeInLeft,
  fadeInRight: Animated.FadeInRight,
  slideInUp: Animated.SlideInUp,
  slideInDown: Animated.SlideInDown,
  slideInLeft: Animated.SlideInLeft,
  slideInRight: Animated.SlideInRight,
  zoomIn: Animated.ZoomIn,
  zoomInUp: Animated.ZoomIn,
  zoomInDown: Animated.ZoomIn,
  zoomInLeft: Animated.ZoomIn,
  zoomInRight: Animated.ZoomIn,
  scaleIn: Animated.ZoomIn,
  bounceIn: Animated.BounceIn,
  flip: Animated.FlipInXDown,
  flipUp: Animated.FlipInXUp,
  flipLeft: Animated.FlipInYLeft,
  flipRight: Animated.FlipInYRight
};
const exitingPresets = {
  fadeOut: Animated.FadeOut,
  fadeOutUp: Animated.FadeOutUp,
  fadeOutDown: Animated.FadeOutDown,
  fadeOutLeft: Animated.FadeOutLeft,
  fadeOutRight: Animated.FadeOutRight,
  slideOutUp: Animated.SlideOutUp,
  slideOutDown: Animated.SlideOutDown,
  slideOutLeft: Animated.SlideOutLeft,
  slideOutRight: Animated.SlideOutRight,
  zoomOut: Animated.ZoomOut,
  bounceOut: Animated.BounceOut
};

exports.enteringPresets = enteringPresets;
exports.exitingPresets = exitingPresets;
//# sourceMappingURL=animationPresets.cjs.map
