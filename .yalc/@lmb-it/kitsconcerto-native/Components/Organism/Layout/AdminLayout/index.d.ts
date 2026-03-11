import { type Ref } from 'react';
import './styles.scss';
import type { IHeaderRef } from "../Header";
import { type IMenuItem } from "@lmb/kitsconcerto-types";
interface ILTRProps {
    routes: IMenuItem[];
    headerRef: Ref<IHeaderRef | null>;
}
declare const AdminLayout: ({ routes, headerRef }: ILTRProps) => import("react/jsx-runtime").JSX.Element;
export default AdminLayout;
//# sourceMappingURL=index.d.ts.map