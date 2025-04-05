// components/TreeGrid.tsx

import React from 'react';
import { TreeNode } from '@/types/TreeNode';
import { TreeColumn } from './TreeColumn';

export interface TreeGridProps {
  treeData: TreeNode[];
  onUpdateNode: (id: string, updates: Partial<TreeNode>) => void;
  onAddChild: (parentId: string) => void;
  onUpdate: (updatedTree: TreeNode[]) => void; // ✅ Add this line
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
    'laxmibai',
  ];

  return (
    <div className="grid grid-cols-8 gap-4 px-4 py-2 w-full overflow-x-auto">
      {treeData.map((node) => (
        <div key={node.id}>
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
