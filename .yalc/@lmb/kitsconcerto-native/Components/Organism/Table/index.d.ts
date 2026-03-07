import type { IDataTableContextValues, IDataTableProps } from "@lmb/kitsconcerto-types";
export declare const TableContext: import("react").Context<IDataTableContextValues<any>>;
export declare function useTable<T extends Record<string, any> = any>(): IDataTableContextValues<T>;
export declare const sizeMapping: {
    readonly small: "5px";
    readonly normal: "10px";
    readonly large: "15px";
};
export declare const fontSizeMapping: {
    readonly small: "13px";
    readonly normal: "16px";
    readonly large: "20px";
};
declare const Datatable: <T extends Record<string, any> = any>(_props: IDataTableProps<T>) => any;
export default Datatable;
//# sourceMappingURL=index.native.d.ts.map