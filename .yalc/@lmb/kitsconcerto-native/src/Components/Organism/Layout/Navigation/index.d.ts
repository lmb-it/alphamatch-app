import './styles.scss';
import { type IMenuItem } from '@lmb/kitsconcerto-types';
export interface ISidebarMenuProps {
    placement: 'rtl' | 'ltr';
    routes: IMenuItem[];
    visible: boolean;
    setVisible: (visible: boolean) => void;
}
declare const SidebarMenu: ({ visible, setVisible, placement, routes }: ISidebarMenuProps) => import("react/jsx-runtime").JSX.Element;
export default SidebarMenu;
//# sourceMappingURL=index.d.ts.map