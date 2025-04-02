"use client";
import { useState } from "react";

interface CloudSpinnerProps {
  name: string;
  value: number;
  onChange: (newValue: number) => void;
  edited: boolean;
}

const CloudSpinner: React.FC<CloudSpinnerProps> = ({ name, value, onChange, edited }) => {
  return (
    <div className={`spinner-container p-3 rounded ${edited ? 'bg-secondary' : ''}`}>
      <h5>{name}</h5>
      <input
        type="number"
        step="0.001"
        value={value}
        onChange={(e) => {
          const newValue = parseFloat(e.target.value);
          if (newValue + total - value <= 1) { // Ensures total doesn't exceed 1
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
