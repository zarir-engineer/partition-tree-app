"use client";
import { useState } from "react";
import CloudSpinner from "./CloudSpinner";

const names = [
  "Sudarshan-ji", "Shripal-ji", "Ishwar-ji", "Vigyanchand-ji",
  "Parmeshwar-ji", "Pratap-ji", "Jagdish-ji", "Aaji"
];

const CloudSpinnerGrid: React.FC = () => {
  const defaultValues = Array(8).fill(0.125);  // Default to 1/8 per spinner
  const [values, setValues] = useState<number[]>(defaultValues);
  const [edited, setEdited] = useState<boolean[]>(Array(8).fill(false));

  // Calculate the total and update other values accordingly
  const updateValues = (index: number, newValue: number) => {
    const newValues = [...values];
    newValues[index] = newValue;

    const total = newValues.reduce((sum, value) => sum + value, 0);
    const remainingValue = 1 - total;

    let remainingSum = 0;
    let remainingCount = 0;

    newValues.forEach((value, idx) => {
      if (!edited[idx]) {
        remainingSum += value;
        remainingCount++;
      }
    });

    if (remainingCount > 0) {
      const perRemaining = remainingValue / remainingCount;
      newValues.forEach((value, idx) => {
        if (!edited[idx]) {
          newValues[idx] = perRemaining;
        }
      });
    }

    const finalTotal = newValues.reduce((sum, value) => sum + value, 0);
    if (finalTotal !== 1) {
      newValues[newValues.length - 1] += 1 - finalTotal;
    }

    setValues(newValues);
  };

  const handleValueChange = (index: number, newValue: number) => {
    const newEdited = [...edited];
    newEdited[index] = true;
    setEdited(newEdited);
    updateValues(index, newValue);
  };

  const handleReset = () => {
    setValues(defaultValues);
    setEdited(Array(8).fill(false));  // Reset all edit states
  };

  const total = values.reduce((sum, value) => sum + value, 0).toFixed(3);

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex justify-content-between w-100 mb-3">
        <span className="font-weight-bold">Total: {total}</span>
        <button onClick={handleReset} className="btn btn-primary">Reset</button>
      </div>

      <div className="row w-100">
        {names.map((name, index) => (
          <div className="col-1" key={index}>
            <CloudSpinner
              name={name}
              value={values[index]}
              onChange={(newValue) => handleValueChange(index, newValue)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CloudSpinnerGrid;
