// utils/distributeValues.ts
import { TreeNode } from "@/types/TreeNode"; // or wherever your type is
import { roundToSigFigs } from "./math";

export function distributeValue(node: TreeNode) {
  if (node.children.length === 0) return;
  const childValue = node.value / node.children.length;
  node.children = node.children.map((child) => ({
    ...child,
    value: roundToSigFigs(childValue),
  }));
  node.children.forEach(distributeValue);
}