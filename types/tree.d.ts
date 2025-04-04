// types/tree.d.ts

export interface SpinnerNode {
  id: string; // unique ID in format 'parent_child' or top-level name
  name: string; // editable display name
  value: number; // numerical value, recalculated dynamically
  parentId?: string; // undefined for top-level nodes
  children: SpinnerNode[]; // child nodes (max 4)
  locked?: boolean; // if true, top-level node can't add children directly
}
