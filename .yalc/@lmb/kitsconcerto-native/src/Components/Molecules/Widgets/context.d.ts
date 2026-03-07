import { type Context } from 'react';
import { type IWidgetChartContextProps } from '@lmb/kitsconcerto-types';
export declare const WidgetsContext: Context<Omit<IWidgetChartContextProps, 'type'>>;
declare const Widgets: ({ data, id, label, enableMultipleDatasets, enableExportButton, type, containerProps, aspectRatio, info, horizontal, isLoading, height, centerDisplay }: Omit<IWidgetChartContextProps, "colors" | "isDarkMode">) => import("react/jsx-runtime").JSX.Element;
export default Widgets;
//# sourceMappingURL=context.d.ts.map