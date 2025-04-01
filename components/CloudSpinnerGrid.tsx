"use client";
import { useState } from "react";
import CloudSpinner from "./CloudSpinner";

const TOTAL_VALUE = 1000; // Example total value
const INITIAL_VALUES = Array(8).fill(TOTAL_VALUE / 8);

const CloudSpinnerGrid = () => {
  const names = [
    "Sudarshan-ji", "Shripal-ji", "Ishwar-ji", "Vigyanchand-ji",
    "Parmeshwar-ji", "Pratap-ji", "Jagdish-ji", "Aaji"
  ];

  const [values, setValues] = useState<number[]>(Array(names.length).fill(100));

  const handleValueChange = (index: number, newValue: number) => {
    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      {names.map((name, index) => (
        <CloudSpinner
          key={index}
          name={name}  // ✅ Ensure `name` is passed
          initialValue={values[index]}  // ✅ Explicitly pass `initialValue`
          onChange={(newValue) => handleValueChange(index, newValue)}
        />
      ))}
    </div>
  );
};

export default CloudSpinnerGrid;
