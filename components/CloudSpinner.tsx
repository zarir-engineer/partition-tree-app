"use client";
import { useState } from "react";

interface CloudSpinnerProps {
  min?: number;
  max?: number;
  step?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
}

const CloudSpinner: React.FC<CloudSpinnerProps> = ({
  min = 0,
  max = 100,
  step = 1,
  initialValue = 50,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (delta: number) => {
    const newValue = Math.min(max, Math.max(min, value + delta));
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Cloud Shape */}
      <div className="relative bg-blue-300 w-24 h-16 rounded-full flex items-center justify-center shadow-lg">
        <div className="absolute bg-blue-300 w-16 h-16 rounded-full -top-4 left-2"></div>
        <div className="absolute bg-blue-300 w-12 h-12 rounded-full -top-6 right-3"></div>
        <span className="text-white font-bold text-xl">{value}</span>
      </div>
      {/* Controls */}
      <div className="flex mt-2 space-x-2">
        <button
          className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow"
          onClick={() => handleChange(-step)}
        >
          -
        </button>
        <button
          className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow"
          onClick={() => handleChange(step)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CloudSpinner;
