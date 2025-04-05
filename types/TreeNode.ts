// types/tree.d.ts

export interface TreeNode {
  id: string; // unique ID in format 'parent_child' or top-level name
  name: string; // editable display name
  value: number; // numerical value, recalculated dynamically
  children: TreeNode[]; // child nodes (max 4)
  isTopLevel?: boolean;
  locked?: boolean; // if true, top-level node can't add children directly
  parentId: string | null;
}
