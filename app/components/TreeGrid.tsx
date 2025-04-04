// components/TreeGrid.tsx

import React from 'react';
import { TreeNode } from '@/types/TreeNode';
import { TreeColumn } from './TreeColumn';

interface TreeGridProps {
  treeData: Record<string, TreeNode>;
  onUpdateNode: (id: string, updates: Partial<TreeNode>) => void;
  onAddChild: (parentId: string) => void;
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 px-4 py-2 w-full overflow-x-auto">
      {topLevelKeys.map((key) => {
        const node = treeData[key];
        return (
          <div key={key}>
            {node && (
              <TreeColumn
                node={node}
                onUpdateNode={onUpdateNode}
                onAddChild={onAddChild}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
