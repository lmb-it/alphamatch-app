import { type ColorValue, type ViewStyle } from 'react-native';
import type { StyleProp } from 'react-native';
import type { ILoaderProps } from "@lmb/kitsconcerto-types";
type NativeLoaderProps = ILoaderProps<ColorValue, StyleProp<ViewStyle>, Record<string, unknown>>;
declare const Loader: ({ color, size, animating, style }: NativeLoaderProps) => import("react/jsx-runtime").JSX.Element;
export default Loader;
//# sourceMappingURL=index.native.d.ts.map