import type { GroupFieldConfigs, IFormElement } from "@lmb/kitsconcerto-types";
import type { FieldValues, UseFormReturn } from "react-hook-form";
export declare function dynamicList<T extends FieldValues>(element: IFormElement<T>, watchedValues: any[], allFormValues: T, groupField: GroupFieldConfigs<T>["groupField"], ctx: UseFormReturn<T, any, T>): any[];
//# sourceMappingURL=dynamicList.d.ts.map