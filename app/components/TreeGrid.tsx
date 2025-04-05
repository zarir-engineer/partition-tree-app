// components/TreeGrid.tsx

import React from 'react';
import { TreeNode } from '@/types/TreeNode';
import { TreeColumn } from './TreeColumn';

export interface TreeGridProps {
  treeData: TreeNode[];
  onUpdateNode: (id: string, updates: Partial<TreeNode>) => void;
  onAddChild: (parentId: string) => void;
  onUpdate: (updatedTree: TreeNode[]) => void;
}

export const TreeGrid: React.FC<TreeGridProps> = ({
  treeData,
  onUpdateNode,
  onAddChild,
}) => {
  const topLevelKeys = [
    'sudarshan',
    'shripal',
    'ishwar',
    'vigyanchand',
    'parmeshwar',
    'pratapchand',
    'jagdish',
    'aaji',
  ];

  // ✅ Filter top-level nodes in correct order
  const topLevelNodes = topLevelKeys
    .map((id) => treeData.find((node) => node.id === id))
    .filter((node): node is TreeNode => !!node);

  return (
//     <div className="grid grid-cols-8 gap-4 w-full overflow-x-auto">
    <div className="grid grid-cols-8 gap-4 w-full overflow-x-auto border border-red-500">
      {topLevelNodes.map((node) => (
        <div
          key={node.id}
          className="min-w-[180px] max-w-[250px] border border-gray-200 p-2 rounded"
        >
          <TreeColumn
            node={node}
            onUpdateNode={onUpdateNode}
            onAddChild={onAddChild}
          />
        </div>
      ))}
    </div>
  );
};
