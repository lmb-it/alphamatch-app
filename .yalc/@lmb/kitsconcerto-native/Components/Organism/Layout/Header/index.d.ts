import React, { type ReactNode } from 'react';
import type { RouteObject } from "react-router-dom";
interface IHeader {
    setHide: (hide: boolean) => void;
    hide: boolean;
    ref?: React.Ref<IHeaderRef>;
    routes: RouteObject[];
}
export interface IHeaderRef {
    appendToHeader: (element: ReactNode) => void;
}
declare const Header: ({ setHide, hide, ref, routes }: IHeader) => import("react/jsx-runtime").JSX.Element;
export default Header;
//# sourceMappingURL=index.d.ts.map