import type { IListItem, ITreeItem } from "@lmb/kitsconcerto-types";
export interface ITreeNode {
    key?: string | number;
    label?: string;
    data?: any;
    icon?: string;
    children?: ITreeNode[];
    style?: any;
    className?: string;
    selectable?: boolean;
    leaf?: boolean;
}
/**
 * 0: Empty, 1: Groups, 2: Strings, 3: Numbers, 4: Objects, 5: Mixed
 */
export declare const arrayType: (arr: any) => number;
export declare const checkKeys: (list: any[], labelKey: string, valueKey: string | undefined) => void;
/**
 * Recursively maps arrays (implicit groups) into explicit Group objects.
 */
export declare const reMapping: (arr: any[], level: number, labelKey: string, valueKey: string, childrenKey?: string) => ITreeItem<any>[];
/**
 * Standard Normalizer: Ensures everything is an object { label, value }.
 */
export declare const mapping: (list: IListItem[], labelKey?: string, valueKey?: string, childrenKey?: string) => Record<string, any>[];
/**
 * Converts flat data (with parentId) into a hierarchical Tree structure.
 */
export declare const buildTree: (data: Map<string | number, IListItem>, labelKey?: string, valueKey?: string, parentKey?: any, parentKeyValue?: null | string | number) => ITreeNode[];
//# sourceMappingURL=helper.d.ts.map