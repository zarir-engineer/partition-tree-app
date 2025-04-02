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
          onChange(Number.isNaN(newValue) ? 0 : parseFloat(newValue.toFixed(3)));
        }}
        className="form-control"
      />
    </div>
  );
};

export default CloudSpinner;
