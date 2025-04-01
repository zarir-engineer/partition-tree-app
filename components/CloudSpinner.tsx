"use client";
import { useState } from "react";

interface CloudSpinnerProps {
  name: string;
  value: number;
  onChange: (newValue: number) => void;
}

const CloudSpinner: React.FC<CloudSpinnerProps> = ({ name, value, onChange }) => {
  return (
    <div className="d-flex flex-column align-items-center p-2">
      <h3 className="fs-6 fw-semibold">{name}</h3>
      <input
        type="number"
        step="0.001"
        min="0"
        max="1"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="form-control w-auto text-center"
      />
    </div>
  );
};

export default CloudSpinner;
