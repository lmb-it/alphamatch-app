const sizingProperties = {
  w: "width",
  width: "width",
  h: "height",
  height: "height",
  minW: "minWidth",
  minWidth: "minWidth",
  maxW: "maxWidth",
  maxWidth: "maxWidth",
  minH: "minHeight",
  minHeight: "minHeight",
  maxH: "maxHeight",
  maxHeight: "maxHeight"
};
const listingProperties = {
  listStyleType: null,
  listStyle: null
};
const borderProperties = {
  // Border
  borderWidth: "borderWidth",
  borderColor: "borderColor",
  borderStyle: "borderStyle",
  borderRadius: "borderRadius",
  borderTopLeftRadius: "borderTopLeftRadius",
  borderTopRightRadius: "borderTopRightRadius",
  borderBottomLeftRadius: "borderBottomLeftRadius",
  borderBottomRightRadius: "borderBottomRightRadius",
  borderTopWidth: "borderTopWidth",
  borderBottomWidth: "borderBottomWidth",
  borderLeftWidth: "borderLeftWidth",
  borderRightWidth: "borderRightWidth",
  borderTopColor: "borderTopColor",
  borderBottomColor: "borderBottomColor",
  borderLeftColor: "borderLeftColor",
  borderRightColor: "borderRightColor"
};
const pxProperties = {
  // Padding & Margin
  p: "padding",
  pt: "paddingTop",
  pr: "paddingRight",
  pb: "paddingBottom",
  pl: "paddingLeft",
  px: "paddingHorizontal",
  // custom logic required
  py: "paddingVertical",
  // custom logic required
  m: "margin",
  mt: "marginTop",
  mr: "marginRight",
  mb: "marginBottom",
  ml: "marginLeft",
  padding: "padding",
  paddingTop: "paddingTop",
  paddingRight: "paddingRight",
  paddingBottom: "paddingBottom",
  paddingLeft: "paddingLeft",
  paddingVertical: "paddingVertical",
  paddingHorizontal: "paddingHorizontal",
  margin: "margin",
  marginTop: "marginTop",
  marginRight: "marginRight",
  marginBottom: "marginBottom",
  marginLeft: "marginLeft",
  marginInline: "marginInline",
  mx: null,
  // custom logic required
  my: null,
  // custom logic required
  ...sizingProperties,
  ...borderProperties,
  ...listingProperties,
  // Position
  top: "top",
  right: "right",
  bottom: "bottom",
  left: "left",
  position: "position",
  zIndex: "zIndex",
  // Flexbox
  display: "display",
  // RN only accepts "flex" or "none"
  flexBasis: "flexBasis",
  flex: "flex",
  flexGrow: "flexGrow",
  flexShrink: "flexShrink",
  flexDirection: "flexDirection",
  direction: "flexDirection",
  flexWrap: "flexWrap",
  alignItems: "alignItems",
  alignSelf: "alignSelf",
  alignContent: "alignContent",
  justifyContent: "justifyContent",
  colSpan: null,
  rowGap: null,
  columnGap: null,
  gap: "gap",
  // handled manually if needed via margin tricks
  // Text
  fontSize: "fontSize",
  fontWeight: "fontWeight",
  fontFamily: "fontFamily",
  fontStyle: "fontStyle",
  fontColor: "color",
  color: "color",
  lineHeight: "lineHeight",
  letterSpacing: "letterSpacing",
  textAlign: "textAlign",
  textTransform: "textTransform",
  textDecoration: "textDecorationLine",
  whiteSpace: null,
  textOverflow: null,
  // RN handles this with `numberOfLines`, `ellipsizeMode`
  // Background
  bgColor: "backgroundColor",
  backgroundColor: "backgroundColor",
  // Shadow
  shadow: "shadowColor",
  // needs custom mapping for Android/iOS
  boxShadow: null,
  // not supported directly in RN
  shadowColor: "shadowColor",
  shadowOffset: "shadowOffset",
  shadowRadius: "shadowRadius",
  shadowOpacity: "shadowOpacity",
  elevation: "elevation",
  // Opacity / Effects
  opacity: "opacity",
  objectFit: "resizeMode",
  // for Image only
  overflow: "overflow",
  // "visible" | "hidden" (RN doesn't support scroll here)
  // Transforms
  rotate: null,
  // custom logic via `transform`
  translateX: null,
  translateY: null,
  translate: null,
  transformOrigin: null,
  // Transition / Animation (not supported natively in RN)
  transition: null,
  transitionDuration: null,
  transitionFunction: null,
  transitionDelay: null,
  animation: null,
  animationDuration: null,
  animationDelay: null,
  animationFunction: null,
  animationFill: null,
  animationIteration: null,
  // Interactivity
  pointerEvents: "pointerEvents",
  userSelect: null,
  // RN does not support `userSelect`
  cursor: null,
  appearance: null,
  outline: null
};
const propertiesWithoutCssEquivalent = {
  px: null,
  py: null,
  mx: null,
  my: null,
  appearance: null,
  rotate: null,
  columns: null,
  rows: null,
  borderRadiusTop: null,
  borderRadiusBottom: null,
  borderRadiusRight: null,
  borderRadiusLeft: null,
  _hover: null,
  // Border shorthands — no direct RN equivalent, parsed in style.ts
  border: null,
  borderTop: null,
  borderBottom: null,
  borderLeft: null,
  borderRight: null,
  borderX: null,
  borderY: null,
  translateX: null,
  translateY: null,
  animationIteration: null,
  colOffset: null
  // CSS does not have an equivalent for this
};
const nonPxProperties = {};
const allProperties = {
  ...pxProperties,
  ...nonPxProperties,
  ...propertiesWithoutCssEquivalent
};

export { borderProperties, allProperties as default, listingProperties, nonPxProperties, propertiesWithoutCssEquivalent, pxProperties, sizingProperties };
//# sourceMappingURL=index.js.map
