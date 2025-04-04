// components/LegendBar.tsx

import React from 'react';

interface LegendBarProps {
  onReset: () => void;
  onExportPDF: () => void;
}

export const LegendBar: React.FC<LegendBarProps> = ({ onReset, onExportPDF }) => {
  return (
    <div className="sticky top-0 bg-white z-50 shadow-md px-4 py-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-b border-gray-300">
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <h1 className="text-xl font-semibold">🌀 Cloud Spinner Tree Allocation</h1>
        <span className="text-sm text-gray-600">
          Legend: 1/8 = 0.125 | Total = 1 | Rounded to 3 significant digits
        </span>
      </div>

      <div className="flex gap-2">
        <button
          className="bg-red-100 text-red-600 border border-red-300 hover:bg-red-200 px-3 py-1 rounded-xl text-sm"
          onClick={onReset}
        >
          🔄 Reset
        </button>
        <button
          className="bg-green-100 text-green-700 border border-green-300 hover:bg-green-200 px-3 py-1 rounded-xl text-sm"
          onClick={onExportPDF}
        >
          📄 Save to PDF
        </button>
      </div>
    </div>
  );
};
