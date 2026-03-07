import { type FC, type PropsWithChildren } from 'react';
import type { Permissions } from "@lmb/kitsconcerto-types";
type IPermissionsContextValues = {
    check: (permissions: string | string[] | Permissions | null) => boolean;
};
declare const PermissionsProvider: FC<PropsWithChildren<{
    roles?: string[] | null;
}>>;
export default PermissionsProvider;
export declare const usePermissions: () => IPermissionsContextValues;
//# sourceMappingURL=PermissionsContext.d.ts.map