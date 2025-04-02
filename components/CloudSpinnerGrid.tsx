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

      <div className="d-flex flex-column justify-center align-items-center p-4">
        {/* Total and Reset Button positioned top-right */}
        <div className="d-flex justify-content-end w-100 mb-3">
          <span className="font-bold text-xl mr-4">Total: {total}</span>
          <button onClick={handleReset} className="btn btn-primary ms-3">
            Reset
          </button>
        </div>

        {/* Grid with 8 columns per row */}
        <div className="container-fluid">
          <div className="row g-2"> {/* Use small gutters for tighter spacing */}
            {names.map((name, index) => (
              <div key={index} className="col-3 col-md-2 col-lg-1 p-1"> {/* 8 per row */}
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
