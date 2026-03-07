import React from "react";
import type { IKitsInputTextarea } from "@lmb/kitsconcerto-types";
type NativeTextareaRef = {
    focus(): void;
    blur(): void;
    clear(): void;
};
declare const KitsInputTextarea: React.ForwardRefExoticComponent<Omit<IKitsInputTextarea, "ref"> & React.RefAttributes<NativeTextareaRef>>;
export default KitsInputTextarea;
//# sourceMappingURL=index.native.d.ts.map