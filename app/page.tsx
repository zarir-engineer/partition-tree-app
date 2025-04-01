"use client";

import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Helper function to normalize fractions
const normalizeFractions = (nodes: number[]) => {
  const total = nodes.reduce((acc, value) => acc + value, 0);
  const remainingValue = 66.67 - total;

  const adjustedNodes = nodes.map((value) => {
    // Adjust based on the remaining value
    const adjustment = remainingValue / (nodes.length - 1);
    return value + adjustment;
  });

  return adjustedNodes;
};

// Define TreeNode before using it in the Page component
const TreeNode = ({
  index,
  value,
  updateValue,
  addSubNode,
  removeSubNode,
}: any) => {
  return (
    <div style={{ marginLeft: "20px", borderLeft: "1px solid #ccc", paddingLeft: "10px", display: 'flex', alignItems: 'center' }}>
      <input
        type="number"
        className="form-control d-inline w-25"
        value={value.toFixed(2)}
        onChange={(e) => updateValue(index, parseFloat(e.target.value))}
        step="0.01"
        style={{ marginRight: '10px' }}
      />
      <button className="btn btn-success btn-sm" onClick={() => addSubNode(index)}>
        ➕ Add
      </button>
      <button className="btn btn-danger btn-sm ms-2" onClick={() => removeSubNode(index)} disabled={index === 0}>
        ➖ Remove
      </button>
    </div>
  );
};

const FractionTree = () => {
  const [data, setData] = useState({
    value: 66.67,
    children: Array(8).fill(8.33), // 8 nodes initialized with 1/8 of the top value
  });

  const updateValue = (index: number, newValue: number) => {
    const updatedNodes = [...data.children];
    updatedNodes[index] = newValue;

    // Normalize the node values to keep the total equal to 66.67
    const normalizedValues = normalizeFractions(updatedNodes);

    setData({
      ...data,
      children: normalizedValues,
    });
  };

  const addSubNode = (index: number) => {
    if (data.children.length < 10) { // Restrict to no more than 10 child nodes
      const updatedNodes = [...data.children];
      updatedNodes.splice(index + 1, 0, 8.33); // Insert new node after the current node
      const normalizedValues = normalizeFractions(updatedNodes);
      setData({
        ...data,
        children: normalizedValues,
      });
    }
  };

  const removeSubNode = (index: number) => {
    if (data.children.length > 1 && index > 0) { // Prevent removing the first node (top node)
      const updatedNodes = [...data.children];
      updatedNodes.splice(index, 1); // Remove the selected node
      const normalizedValues = normalizeFractions(updatedNodes);
      setData({
        ...data,
        children: normalizedValues,
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold" style={{ fontFamily: "Georgia, serif" }}>
        Fractional Tree with Node Adjustment
      </h2>

      <div className="d-flex justify-content-start align-items-center mt-3">
        <strong className="me-2">Top Value:</strong>
        <input
          type="number"
          className="form-control w-25"
          value={data.value.toFixed(2)}
          disabled
        />
      </div>

      <div className="d-flex justify-content-center mt-3">
        <div className="w-50" style={{ borderRight: "1px solid #ccc", paddingRight: "20px" }}>
          <div>
            <strong>Top Node: </strong>
            <input
              type="number"
              className="form-control w-25"
              value={data.value.toFixed(2)}
              disabled
            />
          </div>

          {data.children.map((value, index) => (
            <TreeNode
              key={index}
              index={index}
              value={value}
              updateValue={updateValue}
              addSubNode={addSubNode}
              removeSubNode={removeSubNode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return <FractionTree />;
}
