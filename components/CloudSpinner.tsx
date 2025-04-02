"use client";
import { useState } from "react";

interface CloudSpinnerProps {
  name: string;
  value: number;
  total: number; // Add total as a prop
  onChange: (newValue: number) => void;
  edited: boolean;
}

const CloudSpinner: React.FC<CloudSpinnerProps> = ({ name, value, onChange, edited, total }) => {
  return (
    <div className={`spinner-container p-3 rounded ${edited ? 'bg-secondary' : ''}`}>
      <h5>{name}</h5>
      <input
        type="number"
        step="0.001"
        value={value}
        onChange={(e) => {
          const newValue = parseFloat(e.target.value);
          if (!isNaN(newValue) && newValue + total - value <= 1) {
            onChange(newValue);
          }
        }}
        className="form-control"
        disabled={total >= 1}
      />
    </div>
  );
};

export default CloudSpinner;
