// utils/distributeValues.ts
import { TreeNode } from "@/types/TreeNode"; // or wherever your type is

export function distributeValuesRecursively(node: TreeNode): void {
  if (!node.children || node.children.length === 0) return;

  const share = node.value / node.children.length;
  node.children.forEach((child) => {
    child.value = parseFloat(share.toPrecision(3)); // 3 significant figures
    distributeValuesRecursively(child);
  });
}
