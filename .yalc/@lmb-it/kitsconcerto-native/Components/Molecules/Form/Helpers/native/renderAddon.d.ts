import type { ReactNode, ReactElement } from "react";
type Addon = string | number | ReactElement | ((props: {
    size?: number;
    color?: string;
}) => ReactNode) | null | undefined;
export declare function renderInputAddon(addon: Addon): ReactNode;
export {};
//# sourceMappingURL=renderAddon.d.ts.map