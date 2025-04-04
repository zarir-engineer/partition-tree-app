// app/tree/page.tsx

'use client';

import React, { useState } from 'react';
import { initialTreeData } from '@/data/initialTreeData';
import { cloneDeep } from 'lodash';
import { exportTreeToPDF } from '@/utils/PDFExport';
import TreeGrid from '@/components/TreeGrid';
import LegendBar from '@/components/LegendBar';
import { recalculateTree } from '@/utils/treeUtils';

export default function TreePage() {
  const [treeData, setTreeData] = useState(initialTreeData);

  const handleReset = () => {
    setTreeData(cloneDeep(initialTreeData));
  };

  const handlePDFExport = () => {
    exportTreeToPDF('tree-root');
  };

  const handleUpdate = (updatedTree: typeof treeData) => {
    const recalculatedTree = recalculateTree(updatedTree);
    setTreeData(recalculatedTree);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <LegendBar onReset={handleReset} onPDFExport={handlePDFExport} />
      <div
        id="tree-root"
        className="flex-1 overflow-auto p-4"
        style={{ marginTop: '80px' }}
      >
        <TreeGrid treeData={treeData} onUpdate={handleUpdate} />
      </div>
    </div>
  );
}
