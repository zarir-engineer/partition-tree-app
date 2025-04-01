"use client"; // Enables React Client Components (required for interactive components in Next.js)

import { useState } from "react"; // Import React's useState hook to manage component state
import { Container } from "react-bootstrap"; // Import Bootstrap Container for layout
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import styles from "./styles/FractionNodeApp.module.css"; // Import custom CSS module for styling

const FractionNodeApp = () => {
  // Define the state that holds the hierarchical tree structure
  const [data, setData] = useState<any>({
    value: 66.67, // Root node's value set to 66.67
    children: Array(8).fill({ value: 8.33, children: [] }), // 8 child nodes, each initialized with 8.33 (66.67 / 8)
  });

  /**
   * Adjusts a node's value while ensuring the sum of its siblings remains unchanged.
   * @param {number} index - Index of the child node being modified.
   * @param {number} value - New value assigned to the child node.
   * @param {number} parentIndex - Index of the parent node.
   */
  const adjustNodeValue = (index: number, value: number, parentIndex: number) => {
    const newChildren = [...data.children]; // Clone children array to maintain immutability
    newChildren[parentIndex].children[index].value = value; // Update the specific child's value

    // Compute the total value after modification
    const total = newChildren[parentIndex].children.reduce((sum: number, child: any) => sum + child.value, 0);

    // Normalize sibling values to maintain the sum constraint
    if (total !== newChildren[parentIndex].value) {
      newChildren[parentIndex].children.forEach((child: any, idx: number) => {
        if (idx !== index) {
          child.value = (newChildren[parentIndex].value - value) / (newChildren[parentIndex].children.length - 1);
        }
      });
    }
    setData({ ...data, children: newChildren }); // Update state with modified children
  };

  /**
   * Adds a new child node to a specific parent node.
   * @param {number} index - Index of the parent node.
   */
  const addChildNode = (index: number) => {
    const newNode = { value: 8.33, children: [] }; // New child node with default value
    const newChildren = [...data.children]; // Clone the children array
    newChildren[index].children.push(newNode); // Add the new child to the parent node
    setData({ ...data, children: newChildren }); // Update state
  };

  /**
   * Removes a child node from a specific parent.
   * @param {number} index - Index of the child to be removed.
   * @param {number} parentIndex - Index of the parent node.
   */
  const removeChildNode = (index: number, parentIndex: number) => {
    const newChildren = [...data.children]; // Clone the children array
    newChildren[parentIndex].children.splice(index, 1); // Remove the child at the given index
    setData({ ...data, children: newChildren }); // Update state
  };

  return (
    <Container className="my-4">
      {/* Root node */}
      <div className="d-flex justify-content-center mb-4">
        <div
          className={styles.node}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "steelblue",
            color: "white",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "20px",
            position: "relative",
          }}
        >
          {data.value.toFixed(2)}
        </div>
      </div>

      {/* Child nodes */}
      <div className="d-flex justify-content-center flex-wrap" style={{ position: "relative" }}>
        {data.children.map((child: any, parentIndex: number) => (
          <div key={parentIndex} className="d-flex justify-content-center my-3" style={{ position: "relative" }}>
            {/* Connecting line between parent and child */}
            <div
              style={{
                position: "absolute",
                top: "50px",
                left: "50%",
                width: "2px",
                height: "50px",
                backgroundColor: "gray",
                transform: "translateX(-50%)",
              }}
            />

            {/* Child node representation */}
            <div
              className={styles.node}
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                backgroundColor: "steelblue",
                color: "white",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "5px",
                position: "relative",
              }}
            >
              {child.value.toFixed(2)}

              {/* Add child button */}
              <button className="plus" onClick={() => addChildNode(parentIndex)}>
                +
              </button>

              {/* Remove child button (only if children exist) */}
              {child.children.length > 0 && (
                <button className="minus" onClick={() => removeChildNode(0, parentIndex)}>
                  -
                </button>
              )}
            </div>

            {/* Number input field for value adjustment */}
            <input
              type="number"
              className={styles.inputNoSpinner}
              value={child.value}
              onChange={(e) => adjustNodeValue(0, parseFloat(e.target.value), parentIndex)}
              step="0.01"
              style={{ marginTop: "10px", width: "100%" }}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default FractionNodeApp;
