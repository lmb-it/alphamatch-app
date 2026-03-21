import { jsx } from 'react/jsx-runtime';
import { Pressable, Linking } from 'react-native';
import Text from '../Text/index.js';

const Link = ({
  children,
  href,
  onPress,
  isExternal,
  to,
  ...props
}) => {
  const handlePress = (event) => {
    if (onPress) {
      onPress(event);
    } else if (href) {
      Linking.openURL(href);
    } else if (to) {
      Linking.openURL(to);
    }
  };
  return /* @__PURE__ */ jsx(Pressable, { onPress: handlePress, accessibilityRole: "link", children: typeof children === "string" ? /* @__PURE__ */ jsx(Text, { color: "primary", underline: true, children }) : children });
};

export { Link as default };
//# sourceMappingURL=index.js.map
