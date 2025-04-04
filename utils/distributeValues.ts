// utils/distributeValues.ts
export function distributeValuesRecursively(node) {
  if (!node.children || node.children.length === 0) return;

  const share = node.value / node.children.length;
  node.children = node.children.map((child) => ({
    ...child,
    value: share,
  }));

  node.children.forEach((child) => {
    distributeValuesRecursively(child);
  });
}
