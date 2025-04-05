// app/tree/page.tsx
'use client';

import React, { useState } from 'react';
import { initialTreeData } from '@/data/initialTreeData';
import { cloneDeep } from 'lodash';
import { exportTreeToPDF } from '@/utils/PDFExport';
import { TreeGrid } from '@/components/TreeGrid';
import { LegendBar } from '@/components/LegendBar';
import { recalculateValues } from '@/utils/treeUtils';
import { TreeNode } from '@/types/TreeNode'

export default function TreePage() {
  const [treeData, setTreeData] = useState<any>(initialTreeData); // Not recommended long-term, but quick fix

  const handleReset = () => {
    setTreeData(cloneDeep(initialTreeData));
  };

  const handlePDFExport = () => {
    exportTreeToPDF('tree-root');
  };

  const handleUpdate = (updatedTree: TreeNode[]) => {
    const recalculatedTree = updatedTree.map((node) => recalculateValues(node));
    setTreeData(recalculatedTree);
  };

  const handleUpdateNode = (id: string, updates: Partial<TreeNode>) => {
    setTreeData((prevTree: TreeNode[]) =>
      prevTree.map((node) =>
        node.id === id ? { ...node, ...updates } : node
      )
    );
  };

// import { updateNode } from '@/utils/treeUtils';
//
// const handleUpdateNode = (id: string, updates: Partial<TreeNode>) => {
//   setTreeData((prevTree: TreeNode[]) =>
//     updateNode(prevTree, id, (node) => ({ ...node, ...updates }))
//   );
// };


//   const handleAddChild = (parentId: string) => {
//     setTreeData((prevTree) =>
//       prevTree.map((node) => {
//         if (node.id === parentId) {
//           const newChild: TreeNode = {
//             id: `${parentId}_child_${node.children.length}`,
//             name: "New Child",
//             value: node.value / (node.children.length + 1),
//             children: [],
//           };
//           return {
//             ...node,
//             children: [...node.children, newChild],
//           };
//         }
//         return node;
//       })
//     );
//   };

  const handleAddChild = (parentId: string) => {
    setTreeData((prevTree: TreeNode[]) =>
      prevTree.map((node) => {
        if (node.id === parentId) {
          const newChild: TreeNode = {
            id: `${parentId}_${Date.now()}`,
            name: 'New Child',
            value: node.value / (node.children.length + 1),
            children: [],
            parentId,
          };

          const updatedChildren = [...node.children, newChild];
          const newValue = node.value / (updatedChildren.length);

          return {
            ...node,
            children: updatedChildren.map((child) =>
              child.id === newChild.id ? newChild : { ...child, value: newValue }
            ),
          };
        }
        return node;
      })
    );
  };


  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <LegendBar onReset={handleReset} onPDFExport={handlePDFExport} />
      <div
        id="tree-root"
        className="flex-1 overflow-auto p-4"
        style={{ marginTop: '80px' }}
      >
        <TreeGrid
          treeData={treeData}
          onUpdate={handleUpdate}
          onUpdateNode={handleUpdateNode}
          onAddChild={handleAddChild}
        />
      </div>
    </div>
  );
}
