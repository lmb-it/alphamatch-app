import type { RouteObject } from 'react-router-dom';
import type { IMenuItem, Permissions } from "@lmb/kitsconcerto-types";
export declare const checkPermissions: (sections: IMenuItem[], check: ((permissions: Permissions) => boolean) | undefined) => IMenuItem[];
export declare const mapSectionsToRoutes: (sections: IMenuItem[]) => RouteObject[];
export declare const remapSectionsWithPathsAndPermissions: (sections: IMenuItem[], checkPermissions: ((permissions: Permissions) => boolean) | undefined, parentPath?: string) => IMenuItem[];
//# sourceMappingURL=helper.d.ts.map