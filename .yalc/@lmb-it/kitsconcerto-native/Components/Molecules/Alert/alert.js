import { jsx, Fragment } from 'react/jsx-runtime';
import 'react';
import 'axios';
import '../../../Contexts/DialogContext.js';
import '../../../Hooks/useKeyboardNavigation.js';
import '../Form/KitsSelect/SelectContext.js';
import Flex from '../UI/Flex/index.js';
import Text from '../UI/Text/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';
import { Icon } from '../../Atoms/Icon/index.js';
import { Info, AlertTriangle, CheckCircle2, CircleX } from 'lucide-react-native';
import { useKitsTheme } from '../../../Contexts/Theme/KitsThemeProvider.js';

const icons = {
  error: CircleX,
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info
};
const Alert = ({
  status = "info",
  variant = "subtle",
  children,
  className,
  ...props
}) => {
  const { resolveToken } = useKitsTheme();
  const primary = resolveToken("primary");
  const statusColors = {
    error: resolveToken("red.500"),
    success: resolveToken("green.500"),
    warning: resolveToken("yellow.500"),
    info: resolveToken("blue.500"),
    brand: primary
  };
  const color = statusColors[status];
  let bg = "transparent";
  let border = void 0;
  if (variant === "subtle") bg = `${color}22`;
  if (variant === "solid") bg = color;
  if (variant === "left-accent") border = { borderLeftWidth: 4, borderLeftColor: color };
  if (variant === "top-accent") border = { borderTopWidth: 4, borderTopColor: color };
  return /* @__PURE__ */ jsx(
    Flex,
    {
      className,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      style: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: bg,
        alignSelf: "flex-start",
        ...border ?? {}
      },
      ...props,
      children
    }
  );
};
const AlertIcon = ({ status = "info" }) => {
  const { resolveToken, theme } = useKitsTheme();
  const primary = resolveToken("primary");
  if (status === "brand" && theme.config.logo) return /* @__PURE__ */ jsx(Fragment, { children: theme.config.logo });
  const statusColors = {
    error: resolveToken("red.500"),
    success: resolveToken("green.500"),
    warning: resolveToken("yellow.500"),
    info: resolveToken("blue.500"),
    brand: primary
  };
  const IconComponent = icons[status];
  const color = statusColors[status];
  return /* @__PURE__ */ jsx(Icon, { name: IconComponent, color, size: "lg" });
};
const AlertTitle = ({ children }) => /* @__PURE__ */ jsx(Text, { fontWeight: "bold", children });
const AlertDescription = ({ children }) => /* @__PURE__ */ jsx(Text, { size: "sm", children });

export { AlertDescription, AlertIcon, AlertTitle, Alert as default };
//# sourceMappingURL=alert.js.map
