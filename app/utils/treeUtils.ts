// app/utils/treeUtils.ts

import { TreeNode } from "@/types/TreeNode";

export function cloneDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function roundToThreeSignificantDigits(value: number): string {
  if (value === 0) return "0";
  const rounded = Number(value.toPrecision(3));
  return parseFloat(rounded.toString()).toString();
}

export function recalculateValues(node: TreeNode): TreeNode {
  if (!node.children || node.children.length === 0) return node;

  const equalShare = node.value / node.children.length;
  node.children = node.children.map((child) => ({
    ...recalculateValues({ ...child, value: equalShare }),
  }));

  return node;
}
