import React from "react";
import { type IColumn, type IPaginationRequest } from "../../../";
interface IColumnProps {
    field: IColumn<any>;
    index: number;
    serverSideRequest: IPaginationRequest;
    tableSize: "small" | "normal" | "large";
    keyColumn: string;
    isLoading: boolean;
    debounceFilterWaitTime: number;
}
declare const columnFunction: (props: IColumnProps) => React.JSX.Element;
export default columnFunction;
//# sourceMappingURL=Column.d.ts.map