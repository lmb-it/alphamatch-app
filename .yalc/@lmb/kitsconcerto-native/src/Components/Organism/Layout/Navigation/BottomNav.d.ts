import type { IMenuItem } from "../types";
export interface BottomNavProps {
    placement?: 'rtl' | 'ltr';
    collapsed?: boolean;
    bottomNav: IMenuItem[];
}
declare const BottomNav: ({ bottomNav, placement, collapsed }: BottomNavProps) => import("react/jsx-runtime").JSX.Element;
export default BottomNav;
//# sourceMappingURL=BottomNav.d.ts.map