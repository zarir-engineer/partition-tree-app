"use client";
import { useState } from "react";
import CloudSpinner from "./CloudSpinner";

const TOTAL_VALUE = 1000; // Example total value
const INITIAL_VALUES = Array(8).fill(TOTAL_VALUE / 8);

const CloudSpinnerGrid = () => {
  const [values, setValues] = useState<number[]>(INITIAL_VALUES);

  const handleValueChange = (index: number, newValue: number) => {
    const newValues = [...values];
    newValues[index] = newValue;

    // Ensure total sum stays the same
    const sum = newValues.reduce((acc, val) => acc + val, 0);
    if (sum !== TOTAL_VALUE) {
      const diff = TOTAL_VALUE - sum;
      newValues[(index + 1) % 8] += diff; // Adjust next spinner
    }

    setValues(newValues);
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4 border border-gray-300">
      {values.map((value, index) => (
        <CloudSpinner
          key={index}
          initialValue={value}
          onChange={(newValue) => handleValueChange(index, newValue)}
        />
      ))}
    </div>
  );
};

export default CloudSpinnerGrid;
