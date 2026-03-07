import React, { type ReactElement } from "react";
import { type To } from "react-router-dom";
export interface Permissions<T = string> {
    permissionsRequired?: T | T[];
    permissionsOptional?: T[];
    loginNotRequired?: boolean;
}
export interface IPageISection<T = string> extends Permissions<T> {
    id?: string;
    icon?: ReactElement;
    title: string;
    path?: To;
    element?: React.ReactNode | null;
}
export interface IMenuItem<T = string> extends IPageISection<T> {
    hide?: boolean;
    content?: ReactElement;
    links?: IMenuItem<T>[];
}
//# sourceMappingURL=types.d.ts.map