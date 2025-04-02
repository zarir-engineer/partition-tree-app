"use client";
import { useState } from "react";
import CloudSpinner from "./CloudSpinner";

const names = [
  "Sudarshan-ji", "Shripal-ji", "Ishwar-ji", "Vigyanchand-ji",
  "Parmeshwar-ji", "Pratap-ji", "Jagdish-ji", "Aaji"
];

const CloudSpinnerGrid = () => {
  const [values, setValues] = useState(new Array(names.length).fill(0));
  const [editedSpinners, setEditedSpinners] = useState(new Array(names.length).fill(false));

  const handleValueChange = (index, newValue) => {
    setValues((prev) => {
      const updatedValues = [...prev];
      updatedValues[index] = parseFloat(newValue).toFixed(3); // Limit to 3 decimal places
      return updatedValues;
    });

    setEditedSpinners((prev) => {
      const updated = [...prev];
      updated[index] = true; // Mark as edited (grey color)
      return updated;
    });
  };

  const handleReset = () => {
    setValues(new Array(names.length).fill(0)); // Reset values
    setEditedSpinners(new Array(names.length).fill(false)); // Reset color
  };

  const total = values.reduce((sum, value) => sum + parseFloat(value), 0).toFixed(3);

  return (
    <div className="d-flex flex-column justify-center align-items-center p-4">
      {/* Total and Reset Button positioned top-right */}
      <div className="d-flex justify-content-end w-100 mb-3">
        <span className="font-bold text-xl mr-4">Total: {total}</span>
        <button onClick={handleReset} className="btn btn-primary ms-3">
          Reset
        </button>
      </div>

      {/* Grid with 8 columns per row */}
      <div className="container-fluid px-5">
        <div className="row g-4"> {/* Ensure spacing between columns */}
          {names.map((name, index) => (
            <div key={index} className="col-6 col-md-3 col-lg-3 col-xl-2">
              <CloudSpinner
                name={name}
                value={values[index]}
                onChange={(newValue) => handleValueChange(index, newValue)}
                edited={editedSpinners[index]} // Pass edited prop
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CloudSpinnerGrid;
