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

const CloudSpinnerGrid: React.FC = () => {
  // Initial spinners setup
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

  // Function to update spinner values
  const handleValueChange = (index: number, newValue: number) => {
    setSpinners((prev) =>
      prev.map((spinner, i) =>
        i === index ? { ...spinner, value: newValue, edited: true } : spinner
      )
    );
  };

  // Function to update child spinner values
  const handleChildValueChange = (
    parentIndex: number,
    childIndex: number,
    newValue: number
  ) => {
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
  };

  // Add a new child spinner below the parent
  const handleAddSpinner = (parentIndex: number) => {
    setSpinners((prev) =>
      prev.map((spinner, i) =>
        i === parentIndex
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

  // Remove the last child spinner of a parent
  const handleRemoveSpinner = (parentIndex: number) => {
    setSpinners((prev) =>
      prev.map((spinner, i) =>
        i === parentIndex
          ? { ...spinner, children: spinner.children.slice(0, -1) }
          : spinner
      )
    );
  };

  // Calculate the total value of all spinners
  const total = spinners.reduce((sum, spinner) => sum + spinner.value, 0);

  return (
    <div className="container-fluid">
      <div
        className="d-grid gap-3"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
          justifyItems: "center",
        }}
      >
        {spinners.map((spinner, index) => (
          <div
            key={index}
            className="position-relative spinner-container d-flex flex-column align-items-center"
          >
            {/* 🔺 Plus & Minus Buttons ABOVE the spinner */}
            <div className="d-flex justify-content-center mb-2">
              <button
                className="btn btn-success rounded-circle me-1"
                style={{ width: "30px", height: "30px" }}
                onClick={() => handleAddSpinner(index)}
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

            {/* 🎡 Parent Spinner */}
            <CloudSpinner
              name={spinner.name}
              value={spinner.value}
              onChange={(newValue) => handleValueChange(index, newValue)}
              edited={spinner.edited}
              total={total}
            />

            {/* 🔽 Child Spinners Appear Below Parent */}
            {spinner.children.map((child, childIndex) => (
              <div key={childIndex} className="mt-2">
                <CloudSpinner
                  name={child.name}
                  value={child.value}
                  onChange={(newValue) =>
                    handleChildValueChange(index, childIndex, newValue)
                  }
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
