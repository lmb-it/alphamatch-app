import type { ITreeItem, TreeSelectionEvent, TreeNode } from "@lmb/kitsconcerto-types";
export declare const buildTree: (data: Map<string | number, ITreeItem>, allowIndependentItems: boolean, parentKey?: null | string | number) => TreeNode[];
/**
 * Mark a node's ancestors as partially or fully checked.
 * Moved from Selectable.tsx
 */
export declare function markAncestors(nodeId: number | string, nodes: Map<number | string, any>, selections: TreeSelectionEvent["value"]): void;
//# sourceMappingURL=utils.d.ts.map