"use client";
import { useState } from "react";

const SphericalSpinnerGroup = ({ totalValue, options, onValuesChange }) => { const numWidgets = 8; const initialValue = (totalValue / numWidgets).toFixed(3); const [values, setValues] = useState(Array(numWidgets).fill(initialValue));

const adjustValue = (index, delta) => { let newValues = [...values]; let newValue = (parseFloat(newValues[index]) + delta).toFixed(3); if (newValue < 0) return; let diff = newValue - values[index]; let remainingIndexes = [...Array(numWidgets).keys()].filter(i => i !== index); let distributed = 0;

for (let i of remainingIndexes) {
  let portion = diff / remainingIndexes.length;
  let adjustedValue = parseFloat(newValues[i]) - portion;
  if (adjustedValue < 0) adjustedValue = 0;
  newValues[i] = adjustedValue.toFixed(3);
  distributed += portion;
}

newValues[index] = newValue;
let sumAdjustment = totalValue - newValues.reduce((sum, val) => sum + parseFloat(val), 0);
newValues[remainingIndexes[0]] = (parseFloat(newValues[remainingIndexes[0]]) + sumAdjustment).toFixed(3);

setValues(newValues);
onValuesChange(newValues);

};

return ( <div className="grid grid-cols-4 gap-4 p-4"> {values.map((value, index) => ( <div key={index} className="relative inline-block text-center"> <div className="flex items-center justify-center space-x-2"> <button className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow" onClick={() => adjustValue(index, -0.001)} > - </button> <div
className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-lg border-2 border-white"
> {value} </div> <button className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow" onClick={() => adjustValue(index, 0.001)} > + </button> </div> </div> ))} </div> ); };

export default SphericalSpinnerGroup;

