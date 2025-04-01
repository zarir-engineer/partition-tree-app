"use client";
import { useState } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles/FractionNodeApp.module.css";

const FractionNodeApp = () => {
  // Define the tree structure with a root node
  const [data, setData] = useState({
    value: 66.67, // Root node value
    children: Array(8).fill({ value: 8.33, children: [] }), // 8 child nodes, each 8.33
  });

  // Adjust the value of a child node while maintaining the sum
  const adjustNodeValue = (index, value, parentIndex) => {
    const newChildren = [...data.children];
    newChildren[parentIndex].children[index].value = value;

    // Normalize the other children so the total sum remains unchanged
    const total = newChildren[parentIndex].children.reduce(
      (sum, child) => sum + child.value,
      0
    );

    if (total !== newChildren[parentIndex].value) {
      newChildren[parentIndex].children.forEach((child, idx) => {
        if (idx !== index) {
          child.value =
            (newChildren[parentIndex].value - value) /
            (newChildren[parentIndex].children.length - 1);
        }
      });
    }
    setData({ ...data, children: newChildren });
  };

  // Function to add a child node
  const addChildNode = (index) => {
    const newChildren = [...data.children];
    newChildren[index].children.push({ value: 8.33, children: [] });
    setData({ ...data, children: newChildren });
  };

  // Function to remove a child node
  const removeChildNode = (index, parentIndex) => {
    const newChildren = [...data.children];
    newChildren[parentIndex].children.splice(index, 1);
    setData({ ...data, children: newChildren });
  };

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-center mb-4">
        {/* Root node */}
        <div className={styles.node}>{data.value.toFixed(2)}</div>
      </div>

      {/* Render child nodes */}
      <div className="d-flex justify-content-center flex-wrap">
        {data.children.map((child, parentIndex) => (
          <div key={parentIndex} className="d-flex flex-column align-items-center">
            <div className={styles.node}>{child.value.toFixed(2)}</div>
            <input
              type="number"
              className={styles.inputNoSpinner}
              value={child.value}
              onChange={(e) =>
                adjustNodeValue(0, parseFloat(e.target.value), parentIndex)
              }
              step="0.01"
            />
            <button onClick={() => addChildNode(parentIndex)}>+</button>
            {child.children.length > 0 && (
              <button onClick={() => removeChildNode(0, parentIndex)}>-</button>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default FractionNodeApp;
