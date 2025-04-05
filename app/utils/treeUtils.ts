import { TreeNode } from "@/types/TreeNode";


// Deep clone utility
export function cloneDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// Rounds to 3 significant digits
export function roundToThreeSignificantDigits(value: number): string {
  if (value === 0) return "0";
  const rounded = Number(value.toPrecision(3));
  return parseFloat(rounded.toString()).toString();
}

// Recursive value recalculation for a node
export function recalculateValues(node: TreeNode): TreeNode {
  if (!node.children || node.children.length === 0) return node;

  const equalShare = node.value / node.children.length;
  node.children = node.children.map((child) => {
    const updatedChild = { ...child, value: equalShare };
    return recalculateValues(updatedChild);
  });

  return node;
}

// Helper to recursively find and update a node
function updateNode(tree: TreeNode[], targetId: string, callback: (node: TreeNode) => TreeNode): TreeNode[] {
  return tree.map((node) => {
    if (node.id === targetId) {
      return callback(node);
    }

    if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: updateNode(node.children, targetId, callback),
      };
    }

    return node;
  });
}

// Add a new child to a parent node
export function addChild(parentId: string, tree: TreeNode[]): TreeNode[] {
  const newTree = cloneDeep(tree);

  return updateNode(newTree, parentId, (parent) => {
    if (parent.children.length >= 4) return parent;

    const newId = `${parent.id}_child${parent.children.length + 1}`;
    const newChild: TreeNode = {
      id: newId,
      name: "New",
      value: parent.value / (parent.children.length + 1),
      parentId: parent.id,
      children: [],
    };

    const updatedChildren = [...parent.children, newChild];
    const equalShare = parent.value / updatedChildren.length;

    const recalculatedChildren = updatedChildren.map((child) => ({
      ...child,
      value: equalShare,
    }));

    return {
      ...parent,
      children: recalculatedChildren.map(recalculateValues),
    };
  });
}

// Remove a node by ID from the tree
export function removeChild(targetId: string, tree: TreeNode[]): TreeNode[] {
  const newTree = cloneDeep(tree);

  function recurse(nodes: TreeNode[]): TreeNode[] {
    return nodes
      .filter((node) => node.id !== targetId)
      .map((node) => {
        if (node.children && node.children.length > 0) {
          const updatedChildren = recurse(node.children);
          const updatedNode = {
            ...node,
            children: updatedChildren,
          };
          return recalculateValues(updatedNode);
        }
        return node;
      });
  }

  return recurse(newTree);
}
