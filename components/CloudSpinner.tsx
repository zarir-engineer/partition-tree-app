"use client";

import { useState } from "react";

interface CloudSpinnerProps {
  name: string;  // ✅ Add this line
  min?: number;
  max?: number;
  step?: number;
  initialValue: number; // Make sure this is defined
  onChange?: (value: number) => void;
}

const CloudSpinner: React.FC<CloudSpinnerProps> = ({
  name,
  min = 0,
  max = 100,
  step = 1,
  initialValue,  // ✅ Ensure it's being used
  onChange,
}) => {
  const [value, setValue] = useState<number>(initialValue);  // ✅ Explicit type

  const handleChange = (delta: number) => {
    const newValue = Math.min(max, Math.max(min, value + delta));
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="mb-2 text-lg font-bold">{name}</h2>
      <div className="relative flex items-center">
        {/* Minus Button (Left Ear) */}
        <button
          className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow absolute -left-12"
          onClick={() => handleChange(-step)}
        >
          -
        </button>
        {/* Cloud Shape */}
        <div className="relative bg-blue-300 w-24 h-16 rounded-full flex items-center justify-center shadow-lg">
          <div className="absolute bg-blue-300 w-16 h-16 rounded-full -top-4 left-2"></div>
          <div className="absolute bg-blue-300 w-12 h-12 rounded-full -top-6 right-3"></div>
          <span className="text-white font-bold text-xl">{value}</span>
        </div>
        {/* Plus Button (Right Ear) */}
        <button
          className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow absolute -right-12"
          onClick={() => handleChange(step)}
        >
          +
        </button>
      </div>
    </div>
  );
};

const names = [
  "Sudarshan-ji", "Shripal-ji", "Ishwar-ji", "Vigyanchand-ji",
  "Parmeshwar-ji", "Pratap-ji", "Jagdish-ji", "Aaji"
];

const CloudSpinnerGrid = () => {
  return (
    <div className="grid grid-cols-8 gap-4 p-4">
      {names.map((name, index) => (
        <div key={index} className="flex flex-col items-center">
          <h2 className="text-lg font-bold">{name}</h2>
          <CloudSpinner name={name} initialValue={100} />
        </div>
      ))}
    </div>
  );
};

export default CloudSpinnerGrid;
