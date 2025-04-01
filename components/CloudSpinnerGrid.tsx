"use client";
import { useState } from "react";
import CloudSpinner from "./CloudSpinner";

const names = [
  "Sudarshan-ji", "Shripal-ji", "Ishwar-ji", "Vigyanchand-ji",
  "Parmeshwar-ji", "Pratap-ji", "Jagdish-ji", "Aaji"
];

const CloudSpinnerGrid: React.FC = () => {
  const defaultValues = Array(8).fill(0.125);  // Each value starts as 1/8
  const [values, setValues] = useState<number[]>(defaultValues);

  const handleValueChange = (index: number, newValue: number) => {
    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);
  };

  const handleReset = () => {
    setValues(defaultValues);
  };

  const total = values.reduce((sum, value) => sum + value, 0).toFixed(3);

  return (
    <div className="flex justify-between items-center p-4">
      <div className="grid grid-cols-8 gap-4 w-full">
        {names.map((name, index) => (
          <CloudSpinner
            key={index}
            name={name}
            value={values[index]}
            onChange={(newValue) => handleValueChange(index, newValue)}
          />
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <span className="font-bold text-xl">Total: {total}</span>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CloudSpinnerGrid;
