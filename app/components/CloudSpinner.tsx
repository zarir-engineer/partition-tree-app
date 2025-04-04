"use client";
import { useState } from "react";

interface CloudSpinnerProps {
  name: string;
  value: number;
  total: number; // Add total as a prop
  onChange: (newValue: number) => void;
  onNameChange: (newName: string) => void;
  edited: boolean;
  isTopLevel?: boolean;  // New prop to check if it's a top-level spinner
}

const CloudSpinner: React.FC<CloudSpinnerProps> = ({
  name,
  value,
  onChange,
  onNameChange,
  edited,
  total,
  isTopLevel,  // Accept the new prop
}) => {
  return (
    <div
      className="spinner-container p-2 rounded text-center"
      style={{
        width: "120px",
        backgroundColor: edited ? "#e5e5e5" : "transparent" // Light gray when edited
      }}
    >
      {/* Conditionally Show Plus/Minus Buttons */}
      {!isTopLevel && (
        <div className="d-flex justify-content-center gap-2 mb-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => onChange(value + 1)}
          >
            +
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onChange(value - 1)}
            disabled={value <= 0} // Prevents negative values
          >
            -
          </button>
        </div>
      )}

      {/* Editable Name */}
      <h5
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onNameChange(e.target.innerText.trim())} // Trim to prevent accidental spaces
        className="editable-name text-center"
      >
        {name}
      </h5>

      {/* Number Input */}
      {!isTopLevel && (
        <input
          type="number"
          step="0.001"
          value={value}
          onChange={(e) => {
            const newValue = parseFloat(e.target.value);
            if (!isNaN(newValue) && (newValue < value || total + newValue - value <= 1)) {
              onChange(newValue);
            }
          }}
          className="form-control"
        />
      )}
    </div>
  );
};

export default CloudSpinner