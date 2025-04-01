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
    <div className="flex justify-between items-center p-4 space-x-4">
      {/* Main Content - 8 Columns */}
      <div className="grid grid-cols-8 gap-4 w-full">
        {names.map((name, index) => (
          <CloudSpinner
            key={index}
            name={name}
            value={values[index]}
            onChange={(newValue) => handleValueChange(index, newValue)}
          />
        ))}
      </div>

      {/* Total and Reset Button */}
      <div className="flex items-center space-x-4">
        <span className="font-bold text-xl">Total: {total}</span>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CloudSpinnerGrid;
