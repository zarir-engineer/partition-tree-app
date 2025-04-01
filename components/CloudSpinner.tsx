"use client";
import { useState } from "react";

interface CloudSpinnerProps {
  name: string;
  value: number;
  onChange: (newValue: number) => void;
}

const CloudSpinner: React.FC<CloudSpinnerProps> = ({ name, value, onChange }) => {
  return (
    <div className="flex flex-col items-center p-2">
      <h3 className="text-sm font-semibold">{name}</h3>
      <input
        type="number"
        step="0.001"
        min="0"
        max="1"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-16 p-1 text-center border rounded"
      />
    </div>
  );
};

export default CloudSpinner;
