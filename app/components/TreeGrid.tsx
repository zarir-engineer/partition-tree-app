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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4 p-4 w-full">
      {treeData.map((node) => (
        <div key={node.id} className="min-w-[180px] max-w-[250px]">
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
