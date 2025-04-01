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

    // Update only unedited values to keep the total 1
    const total = newValues.reduce((sum, value) => sum + value, 0);
    const remainingValue = 1 - newValue;

    let remainingSum = 0;
    let remainingCount = 0;

    // Adjust the unedited values
    newValues.forEach((value, idx) => {
      if (!edited[idx]) {
        remainingSum += value;
        remainingCount++;
      }
    });

    // Evenly distribute remaining value to unedited spinners
    if (remainingCount > 0) {
      const perRemaining = remainingValue / remainingCount;
      newValues.forEach((value, idx) => {
        if (!edited[idx]) {
          newValues[idx] = perRemaining;
        }
      });
    }

    setValues(newValues);
  };

  const handleValueChange = (index: number, newValue: number) => {
    const newEdited = [...edited];
    newEdited[index] = true;  // Mark this spinner as edited
    setEdited(newEdited);
    updateValues(index, newValue);
  };

  const handleReset = () => {
    setValues(defaultValues);
    setEdited(Array(8).fill(false));  // Reset all edit states
  };

  const total = values.reduce((sum, value) => sum + value, 0).toFixed(3);

  return (
    <div className="container py-4">
      {/* Main Content - 8 Columns */}
      <div className="row row-cols-8 g-4">
        {names.map((name, index) => (
          <div key={index} className="col">
            <CloudSpinner
              name={name}
              value={values[index]}
              onChange={(newValue) => handleValueChange(index, newValue)}
            />
          </div>
        ))}
      </div>

      {/* Total and Reset Button */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <span className="fs-4 fw-bold">Total: {total}</span>
        <button
          onClick={handleReset}
          className="btn btn-primary"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CloudSpinnerGrid;
