// components/TreeColumn.tsx

import React from 'react';
import { TreeNode } from '@/types/TreeNode';
import { CloudSpinner } from './CloudSpinner';

interface TreeColumnProps {
  node: TreeNode;
  onUpdateNode: (id: string, updates: Partial<TreeNode>) => void;
  onAddChild: (parentId: string) => void;
  level?: number;
}

export const TreeColumn: React.FC<TreeColumnProps> = ({
  node,
  onUpdateNode,
  onAddChild,
  level = 0,
}) => {
  const handleNameChange = (newName: string) => {
    onUpdateNode(node.id, { name: newName });
  };

  const handleAddChild = () => {
    onAddChild(node.id);
  };

  return (
    <div className="min-w-[200px] max-w-[250px] flex-shrink-0">
      <div className={`${level > 0 ? 'ml-4' : ''} mb-4`}>
        <CloudSpinner
          id={node.id}
          name={node.name}
          value={node.value}
          locked={node.locked}
          onNameChange={handleNameChange}
          onAddChild={handleAddChild}
        />

        <div className="pl-4 border-l border-dashed border-gray-300 mt-2 ml-6">
          {node.children?.map((child) => (
            <TreeColumn
              key={child.id}
              node={child}
              onUpdateNode={onUpdateNode}
              onAddChild={onAddChild}
              level={level + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
