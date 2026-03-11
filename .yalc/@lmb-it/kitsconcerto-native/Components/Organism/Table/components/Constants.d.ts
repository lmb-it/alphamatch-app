import type { IColumn, IFilters } from "@lmb/kitsconcerto-types";
import { type ColumnFilterMatchModeOptions } from "primereact/column";
export declare const showFilterMenu: (filter: IFilters | undefined) => boolean;
export declare const matchModesOptions: (filter: IFilters | undefined) => ColumnFilterMatchModeOptions[] | undefined;
export declare const getPrimeDataType: (filter: IColumn<any>["filter"]) => "date" | "text" | "numeric";
//# sourceMappingURL=Constants.d.ts.map