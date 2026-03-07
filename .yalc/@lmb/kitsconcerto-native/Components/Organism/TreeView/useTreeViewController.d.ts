import type { TreeNode } from "@lmb/kitsconcerto-types";
import type { TreeProps, ITreeViewProps, ITreeItem } from "@lmb/kitsconcerto-types";
export declare const useTreeViewController: <T = any>(props: ITreeViewProps<T>) => {
    treeValue: TreeNode<ITreeItem<T>>[];
    selectedNode: TreeNode<ITreeItem<T>>;
    filterValue: string;
    build: () => void;
    setFilterValue: import("react").Dispatch<import("react").SetStateAction<string>>;
    expandAll: () => void;
    collapseAll: () => void;
    operations: {
        onAddNode: (parentItemValue?: ITreeItem["value"] | null) => void;
        onAddNodeItem: (parentItemValue: ITreeItem["value"]) => void;
        onDeleteNode: (itemValue: ITreeItem["value"]) => void;
        onEditNode: (itemValue: ITreeItem["value"]) => void;
    };
    treeProps: TreeProps<T>;
};
//# sourceMappingURL=useTreeViewController.d.ts.map