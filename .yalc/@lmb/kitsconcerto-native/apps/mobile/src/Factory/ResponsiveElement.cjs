'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
var Animated = require('react-native-reanimated');
require('../ui/accordion/index.cjs');
require('../ui/actionsheet/index.cjs');
require('../ui/alert/index.cjs');
require('../ui/alert-dialog/index.cjs');
require('../ui/avatar/index.cjs');
require('../ui/badge/index.cjs');
require('../ui/bottomsheet/index.cjs');
var index$9 = require('../ui/box/index.cjs');
var index$b = require('../ui/button/index.cjs');
var index$6 = require('../ui/card/index.cjs');
var index$3 = require('../ui/center/index.cjs');
require('../ui/checkbox/index.cjs');
require('../ui/divider/index.cjs');
require('../ui/drawer/index.cjs');
require('../ui/fab/index.cjs');
require('../ui/form-control/index.cjs');
require('../ui/gluestack-ui-provider/config.cjs');
require('@gluestack-ui/core/overlay/creator');
require('@gluestack-ui/core/toast/creator');
require('nativewind');
var index$7 = require('../ui/grid/index.cjs');
var index$4 = require('../ui/heading/index.cjs');
var index$1 = require('../ui/hstack/index.cjs');
require('../ui/icon/index.cjs');
var index$8 = require('../ui/image/index.cjs');
require('../ui/image-background/index.cjs');
require('../ui/input/index.cjs');
require('../ui/link/index.cjs');
require('../ui/menu/index.cjs');
require('../ui/modal/index.cjs');
require('../ui/popover/index.cjs');
require('../ui/portal/index.cjs');
var index$a = require('../ui/pressable/index.cjs');
require('../ui/progress/index.cjs');
require('../ui/radio/index.cjs');
require('react-native-safe-area-context');
require('../ui/select/index.cjs');
var index$2 = require('../ui/skeleton/index.cjs');
require('../ui/slider/index.cjs');
require('../ui/spinner/index.cjs');
require('../ui/switch/index.cjs');
require('../ui/table/index.cjs');
var index$5 = require('../ui/text/index.cjs');
require('../ui/textarea/index.cjs');
require('../ui/toast/index.cjs');
require('../ui/tooltip/index.cjs');
var index = require('../ui/vstack/index.cjs');
var style = require('./helpers/style.cjs');
var DimensionsContext = require('./DimensionsContext.cjs');
var animationPresets = require('./animationPresets.cjs');
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
require('../../../../packages/types/src/Css/map/index.cjs');
require('i18next');
require('react-i18next');
require('../Core/AutoComplete/index.cjs');
require('../Core/Dropdown/index.cjs');
require('../Core/MultiSelect/index.cjs');
require('../Core/Trees/components/CoreTree.cjs');
require('../Core/Trees/components/CoreTreeSelect.cjs');
require('../Core/Trees/components/CoreToolbar.cjs');
require('../Core/Paginator/index.cjs');
require('lucide-react-native');
require('../Core/SelectButton/index.cjs');
require('../Core/DataTable/DataTable.cjs');
require('../Core/Tag/index.cjs');
require('../Core/Badge/index.cjs');
require('../Core/ProgressBar/index.cjs');
require('../Core/Checkbox/index.cjs');
require('../Core/RadioButton/index.cjs');

const COMPONENT_MAP = {
  Button: index$b.Button,
  ButtonGroup: index$b.ButtonGroup,
  Svg: reactNative.View,
  List: reactNative.View,
  ListItem: reactNative.View,
  a: index$a.Pressable,
  Pressable: index$a.Pressable,
  Box: index$9.Box,
  Image: index$8.Image,
  Grid: index$7.Grid,
  GridItem: index$7.GridItem,
  Card: index$6.Card,
  Text: index$5.Text,
  Heading: index$4.Heading,
  Center: index$3.Center,
  Skeleton: index$2.Skeleton,
  HStack: index$1.HStack,
  VStack: index.VStack,
  ScrollView: reactNative.ScrollView
};
const ResponsiveElement = ({
  additionalStyles = {},
  additionalClasses,
  // ignored in native
  nativeProps,
  cssProps,
  children,
  as,
  scrollable,
  entering,
  exiting,
  ref
  // directly available in React 19+
}) => {
  const styleCtx = DimensionsContext.useStyleContext();
  const combinedStyles = React.useMemo(() => {
    return [style.style({ ...additionalStyles, ...cssProps, ...nativeProps?.style }, styleCtx)];
  }, [cssProps, additionalStyles, nativeProps?.style, styleCtx]);
  const Component = as ? COMPONENT_MAP[as] || reactNative.View : reactNative.View;
  const isText = (typeof children === "string" || typeof children === "number") && (as !== "Heading" && as !== "Text");
  const hasAnimation = !!(entering || exiting);
  const animationDuration = cssProps?.animationDuration;
  const animationDelay = cssProps?.animationDelay;
  const enteringAnim = React.useMemo(() => {
    if (!entering) return void 0;
    let anim = animationPresets.enteringPresets[entering];
    if (animationDuration != null) anim = anim.duration(animationDuration);
    if (animationDelay != null) anim = anim.delay(animationDelay);
    return anim;
  }, [entering, animationDuration, animationDelay]);
  const exitingAnim = React.useMemo(() => {
    if (!exiting) return void 0;
    let anim = animationPresets.exitingPresets[exiting];
    if (animationDuration != null) anim = anim.duration(animationDuration);
    if (animationDelay != null) anim = anim.delay(animationDelay);
    return anim;
  }, [exiting, animationDuration, animationDelay]);
  const content = /* @__PURE__ */ jsxRuntime.jsx(Component, { ref, ...nativeProps, style: combinedStyles, className: additionalClasses, children: isText ? /* @__PURE__ */ jsxRuntime.jsx(index$5.Text, { children }) : children });
  if (scrollable) {
    return /* @__PURE__ */ jsxRuntime.jsx(reactNative.ScrollView, { horizontal: as === "HStack", children: content });
  }
  if (hasAnimation) {
    return /* @__PURE__ */ jsxRuntime.jsx(Animated.View, { entering: enteringAnim, exiting: exitingAnim, children: content });
  }
  return content;
};

exports.default = ResponsiveElement;
//# sourceMappingURL=ResponsiveElement.cjs.map
