import { type FunctionComponent } from "react";
import { type IFilters } from "@lmb/kitsconcerto-types";
import { type ColumnFilterElementTemplateOptions } from "primereact/column";
export type FilterEl<T = any> = FunctionComponent<ColumnFilterElementTemplateOptions & T>;
export declare const PickFilterElement: FunctionComponent<{
    filter?: IFilters;
    isLoading: boolean;
    options: ColumnFilterElementTemplateOptions;
    debounceFilterWaitTime: number;
}>;
//# sourceMappingURL=Filter.d.ts.map