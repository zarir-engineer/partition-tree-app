"use client";
import { useState } from "react";

interface CloudSpinnerProps {
  name: string;
  value: number;
  onChange: (newValue: number) => void;
}

const CloudSpinner = ({ name, value, onChange, edited }) => {
  return (
    <div className={`spinner-container p-3 rounded ${edited ? 'bg-secondary' : ''}`}>
      <h5>{name}</h5>
      <input
        type="number"
        step="0.001"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value).toFixed(3))}
        className="form-control"
      />
    </div>
  );
};


// const CloudSpinner: React.FC<CloudSpinnerProps> = ({ name, value, onChange }) => {
//   return (
//     <div className="d-flex flex-column align-items-center p-2">
//       <h3 className="fs-6 fw-semibold">{name}</h3>
//       <input
//         type="number"
//         step="0.001"
//         min="0"
//         max="1"
//         value={value}
//         onChange={(e) => onChange(parseFloat(e.target.value,toFixed(3)))}
//         className="form-control w-auto text-center"
//       />
//     </div>
//   );
// };

export default CloudSpinner;
