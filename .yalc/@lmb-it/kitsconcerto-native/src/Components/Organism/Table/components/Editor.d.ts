import { type FunctionComponent } from "react";
import { type IEditors } from "@lmb/kitsconcerto-types";
import { type ColumnEditorOptions } from "primereact/column";
export type EditorEl<T = any> = FunctionComponent<ColumnEditorOptions & T>;
export declare const PickEditorElement: FunctionComponent<{
    Editor?: IEditors;
    isLoading: boolean;
    options: ColumnEditorOptions;
}>;
//# sourceMappingURL=Editor.d.ts.map