"use client";
import React, { useState } from "react";
import CloudSpinner from "./CloudSpinner"; // Ensure this import is correct

// Define the Spinner type
interface Spinner {
  name: string;
  value: number;
  edited: boolean;
  children: Spinner[];
}

const MAX_CHILD_SPINNERS = 4;

const CloudSpinnerGrid: React.FC = () => {
  const [spinners, setSpinners] = useState<Spinner[]>([
    { name: "Sudarshan-ji", value: 0, edited: false, children: [] },
    { name: "Shripal-ji", value: 0, edited: false, children: [] },
    { name: "Ishwar-ji", value: 0, edited: false, children: [] },
    { name: "Vigyanchand-ji", value: 0, edited: false, children: [] },
    { name: "Parmeshwar-ji", value: 0, edited: false, children: [] },
    { name: "Pratap-ji", value: 0, edited: false, children: [] },
    { name: "Jagdish-ji", value: 0, edited: false, children: [] },
    { name: "Aaji", value: 0, edited: false, children: [] },
  ]);

  const updateParentValue = (parentIndex: number) => {
    setSpinners((prev) =>
      prev.map((spinner, i) =>
        i === parentIndex
          ? {
              ...spinner,
              value: spinner.children.reduce((sum, child) => sum + child.value, 0),
            }
          : spinner
      )
    );
  };

  const handleValueChange = (index: number, newValue: number) => {
    setSpinners((prev) =>
      prev.map((spinner, i) =>
        i === index ? { ...spinner, value: newValue, edited: true } : spinner
      )
    );
  };

  const handleChildValueChange = (parentIndex: number, childIndex: number, newValue: number) => {
    setSpinners((prev) =>
      prev.map((spinner, i) =>
        i === parentIndex
          ? {
              ...spinner,
              children: spinner.children.map((child, ci) =>
                ci === childIndex ? { ...child, value: newValue, edited: true } : child
              ),
            }
          : spinner
      )
    );
    updateParentValue(parentIndex);
  };

  const handleAddSpinner = (parentIndex: number) => {
    setSpinners((prev) =>
      prev.map((spinner, i) =>
        i === parentIndex && spinner.children.length < MAX_CHILD_SPINNERS
          ? {
              ...spinner,
              children: [
                ...spinner.children,
                { name: `Child ${spinner.children.length + 1}`, value: 0, edited: false, children: [] },
              ],
            }
          : spinner
      )
    );
  };

  const handleRemoveSpinner = (parentIndex: number) => {
    setSpinners((prev) =>
      prev.map((spinner, i) =>
        i === parentIndex
          ? { ...spinner, children: spinner.children.slice(0, -1) }
          : spinner
      )
    );
    updateParentValue(parentIndex);
  };

  const handleNameChange = (parentIndex: number, childIndex: number, newName: string) => {
    setSpinners((prev) =>
      prev.map((spinner, i) =>
        i === parentIndex
          ? {
              ...spinner,
              children: spinner.children.map((child, ci) =>
                ci === childIndex ? { ...child, name: newName } : child
              ),
            }
          : spinner
      )
    );
  };

  const handleReset = () => {
    setSpinners((prev) =>
      prev.map((spinner) => ({ ...spinner, value: 0, edited: false, children: [] }))
    );
  };

  const total = spinners.reduce((sum, spinner) => sum + spinner.value, 0);

  return (
    <div className="container-fluid position-relative">
      <div className="position-absolute top-0 end-0 p-3 d-flex align-items-center gap-3" style={{ zIndex: 1000 }}>
        <button className="btn btn-primary" onClick={handleReset}>Reset</button>
        <span className="text-lg font-bold">Total: {total}</span>
      </div>
      <div
        className="d-grid gap-3"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
          justifyItems: "center",
          marginTop: "40px",
        }}
      >
        {spinners.map((spinner, index) => (
          <div key={index} className="position-relative spinner-container d-flex flex-column align-items-center">
            <div className="d-flex justify-content-center mb-2">
              <button
                className="btn btn-success rounded-circle me-1"
                style={{ width: "30px", height: "30px" }}
                onClick={() => handleAddSpinner(index)}
                disabled={spinner.children.length >= MAX_CHILD_SPINNERS}
              >
                +
              </button>
              <button
                className="btn btn-danger rounded-circle"
                style={{ width: "30px", height: "30px" }}
                onClick={() => handleRemoveSpinner(index)}
              >
                -
              </button>
            </div>
            <CloudSpinner
              name={spinner.name}
              value={spinner.value}
              onChange={(newValue) => handleValueChange(index, newValue)}
              edited={spinner.edited}
              total={total}
            />
            {spinner.children.map((child, childIndex) => (
              <div key={childIndex} className="mt-2">
                <input
                  type="text"
                  value={child.name}
                  onChange={(e) => handleNameChange(index, childIndex, e.target.value)}
                  className="form-control mb-1"
                />
                <CloudSpinner
                  name={child.name}
                  value={child.value}
                  onChange={(newValue) => handleChildValueChange(index, childIndex, newValue)}
                  edited={child.edited}
                  total={total}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CloudSpinnerGrid;
