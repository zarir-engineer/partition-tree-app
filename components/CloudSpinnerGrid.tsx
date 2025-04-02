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
    {warning && (
      <div className="alert alert-danger position-absolute top-0 start-50 translate-middle-x">
        Total cannot exceed 1!
      </div>
    )}

    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded-lg"
          onClick={resetValues}
        >
          Reset
        </button>
        <span className="text-lg font-bold">Total: {total.toFixed(3)}</span>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {values.map((value, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-blue-200 rounded-xl w-28 h-36"
          >
            <button
              className="text-lg font-bold mb-2"
              onClick={() => increaseValue(index)}
            >
              +
            </button>
            <div className="text-lg font-semibold">{value}</div>
            <button
              className="text-lg font-bold mt-2"
              onClick={() => decreaseValue(index)}
            >
              -
            </button>
          </div>
        ))}
      </div>
    </div>
  );

//   return (
//     <>
//       {warning && (
//         <div className="alert alert-danger position-absolute top-0 start-50 translate-middle-x">
//           Total cannot exceed 1!
//         </div>
//       )}
//
//       <div className="p-4">
//         {/* Total and Reset Button positioned top-right */}
//         <div className="flex justify-between items-center mb-4">
//           <button onClick={handleReset} className="btn btn-primary ms-3">
//             Reset
//           </button>
//           <span className="font-bold text-xl mr-4">Total: {total}</span>
//         </div>
//
//         {/* Grid with 8 columns per row */}
//         <div className="container-fluid">
//           <div className="row g-2"> {/* Use small gutters for tighter spacing */}
//             {names.map((name, index) => (
//               <div key={index} className="col-3 col-md-2 col-lg-1 p-1"> {/* 8 per row */}
//                 <CloudSpinner
//                   name={name}
//                   value={values[index]}
//                   onChange={(newValue) => handleValueChange(index, newValue)}
//                   edited={editedIndexes[index]}
//                   total={parseFloat(total)}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
};

export default CloudSpinnerGrid;
