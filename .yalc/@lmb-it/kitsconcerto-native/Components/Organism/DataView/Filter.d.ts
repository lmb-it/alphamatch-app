import type { ColumnFilterElementTemplateOptions, ColumnFilterMatchModeOptions } from "primereact/column";
import type { IDVFilters } from "@lmb/kitsconcerto-types";
import type { IColumn } from "../";
export declare const PickFilterElement: ({ filter, isLoading, options, }: {
    filter?: IDVFilters;
    isLoading: boolean;
    options: ColumnFilterElementTemplateOptions;
}) => import("react/jsx-runtime").JSX.Element;
export declare const showFilterMenu: (filter: IDVFilters | undefined) => boolean;
export declare const matchModesOptions: (filter: IDVFilters | undefined) => ColumnFilterMatchModeOptions[] | undefined;
export declare const getPrimeDataType: (filter: IColumn<any>["filter"]) => "date" | "text" | "numeric";
//# sourceMappingURL=Filter.d.ts.map