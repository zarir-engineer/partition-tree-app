"use client";
import { useState } from "react";
import CloudSpinner from "./CloudSpinner";

// Define the list of names outside the component to avoid repetition
const names = [
  "Sudarshan-ji", "Shripal-ji", "Ishwar-ji", "Vigyanchand-ji",
  "Parmeshwar-ji", "Pratap-ji", "Jagdish-ji", "Aaji"
];

const TOTAL_VALUE = 1000; // Example total value
const INITIAL_VALUES = Array(names.length).fill(TOTAL_VALUE / names.length);

const CloudSpinnerGrid = () => {
  const [values, setValues] = useState<number[]>(INITIAL_VALUES);

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
          name={name} // Ensure `name` is passed
          initialValue={values[index]} // Ensure `initialValue` is passed
          onChange={(newValue) => handleValueChange(index, newValue)}
        />
      ))}
    </div>
  );
};

export default CloudSpinnerGrid;
