"use client";
import { useState } from 'react';
import './globals.css'; // Import global styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import CloudSpinnerGrid from '../components/CloudSpinnerGrid'; // Import the CloudSpinnerGrid component

const Page = () => {
  const [total, setTotal] = useState(1); // State for total

  const handleReset = () => {
    console.log("Reset button clicked!");
    setTotal(1); // Reset total value
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <div className="legend-container">
        <span>Vile Parle, Mumbai</span>
        <span className="legend">Legend: [Your Legend Here]</span>
        <button className="reset-btn" onClick={handleReset}>Reset</button>
        <span className="total">Total: {total}</span> {/* Dynamic total */}
      </div>

      {/* Ensure CloudSpinnerGrid takes full width */}
      <div className="w-full px-5">
        <CloudSpinnerGrid setTotal={setTotal} />
      </div>
    </div>
  );
};

export default Page;
