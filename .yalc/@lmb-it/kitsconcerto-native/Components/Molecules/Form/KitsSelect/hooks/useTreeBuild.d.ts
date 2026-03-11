import type { ITreeItem, TreeNode } from "@lmb/kitsconcerto-types";
export interface TreeBuildProps {
    isStructured?: boolean;
    ref?: any;
}
/**
 * Shared hook for TreeSelect web & native.
 *
 * Manages: nodes state, value state, tree building from flat/structured data,
 * expandNode helper, and selectedValue sync.
 */
export declare const useTreeBuild: <T = any>(props: TreeBuildProps) => {
    nodes: TreeNode<ITreeItem<T>>[];
    value: any;
    setValue: import("react").Dispatch<any>;
    expandNode: (node: TreeNode, _expandedKeys: {
        [x: string]: boolean;
    }) => void;
    handleChange: (e: any) => void;
    list: ITreeItem<any>[];
    onChange: (e: any, item?: any) => void;
    selectedValue: any;
};
//# sourceMappingURL=useTreeBuild.d.ts.map