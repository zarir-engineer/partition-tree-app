"use client";
import { useState } from "react";
import CloudSpinner from "./CloudSpinner";

const names = [
  "Sudarshan-ji", "Shripal-ji", "Ishwar-ji", "Vigyanchand-ji",
  "Parmeshwar-ji", "Pratap-ji", "Jagdish-ji", "Aaji"
];

const CloudSpinnerGrid = () => {
  const [values, setValues] = useState<number[]>(Array(names.length).fill(0)); // ✅ Define values state
  const [editedIndexes, setEditedIndexes] = useState<boolean[]>(Array(names.length).fill(false));
  const [warning, setWarning] = useState(false);

  const handleValueChange = (index: number, newValue: number) => {
    const updatedValues = [...values];
    updatedValues[index] = newValue;

    const total = updatedValues.reduce((sum, val) => sum + val, 0);

    if (total > 1) {
      setWarning(true);
      setTimeout(() => setWarning(false), 2000); // Message disappears after 2 sec
      return; // Prevent updating state
    }

    const updatedEditedIndexes = [...editedIndexes];
    updatedEditedIndexes[index] = true;

    setValues(updatedValues);
    setEditedIndexes(updatedEditedIndexes);
  };

  const handleReset = () => {
    setValues(Array(names.length).fill(0));
    setEditedIndexes(Array(names.length).fill(false));
    setWarning(false);
  };

  const total = values.reduce((sum, value) => sum + value, 0).toFixed(3);

  return (
    <>
      {warning && (
        <div className="alert alert-danger position-absolute top-0 start-50 translate-middle-x">
          Total cannot exceed 1!
        </div>
      )}

      <div className="p-4">
        <div className="d-flex justify-content-end mb-2">
          <button
            className="btn btn-primary"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        <div className="d-flex justify-content-end mb-4">
          <span className="text-lg font-bold">Total: {total}</span>
        </div>
        <div className="container-fluid">
            <div className="d-grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", justifyItems: "center" }}>
              {names.map((name, index) => (
                <div key={index} className="spinner-container d-flex flex-column align-items-center">
                  <CloudSpinner
                    name={name}
                    value={values[index]}
                    onChange={(newValue) => handleValueChange(index, newValue)}
                    edited={editedIndexes[index]}
                    total={parseFloat(total)}
                  />
                </div>
              ))}
            </div>
        </div>
      </div>
    </>
  );
};

export default CloudSpinnerGrid;
