"use client";
import { useState } from "react";  // Import necessary libraries: React and useState hook
import { Container } from "react-bootstrap";  // Import Bootstrap components for styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import styles from './styles/FractionNodeApp.module.css';  // Import your custom styles

const FractionNodeApp = () => {
  const [data, setData] = useState<any>({
    value: 66.67, // Root node value
    children: Array(8).fill({ value: 1 / 8, children: [] }), // 8 child nodes with initial value 1/8
  });

  // Function to adjust node values
  const adjustNodeValue = (index: number, value: number) => {
    const newChildren = [...data.children];
    newChildren[index].value = value;
    const total = newChildren.reduce((sum, child) => sum + child.value, 0);
    // Normalize the other children to make the sum equal to 1
    if (total !== 1) {
      newChildren.forEach((child, idx) => {
        if (idx !== index) {
          child.value = (1 - value) / (newChildren.length - 1);
        }
      });
    }
    setData({
      ...data,
      children: newChildren,
    });
  };

  // Function to add a new child node
  const addChildNode = () => {
    const newNode = { value: 1 / 8, children: [] }; // Example of a new child node
    setData({
      ...data,
      children: [...data.children, newNode],
    });
  };

  // Function to remove a child node
  const removeChildNode = (index: number) => {
    const newChildren = data.children.filter((_: any, i: number) => i !== index);  // Explicitly type the first parameter as any
    setData({
      ...data,
      children: newChildren,
    });
  };

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-center mb-4">
        {/* Root node without "+" or "-" buttons */}
        <div
          className={styles.node} // Custom styles for the root node
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: 'steelblue',
            color: 'white',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '20px', // Space between root and child nodes
            position: 'relative',
          }}
        >
          {data.value}
        </div>
      </div>

      <div className="d-flex justify-content-center flex-wrap">
        {/* Child nodes with "+" and "-" buttons */}
        {data.children.map((child, index) => (
          <div key={index} className="d-flex justify-content-center my-3">
            <div
              className={styles.node} // Custom styles for child nodes
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: 'steelblue',
                color: 'white',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '5px', // Space between nodes
                position: 'relative',
              }}
            >
              {child.value.toFixed(2)}

              {/* "+" Button to add a node */}
              <button
                style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '-20px',
                  fontSize: '18px',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                }}
                onClick={addChildNode}
              >
                +
              </button>

              {/* "-" Button to remove a node */}
              {data.children.length > 1 && (
                <button
                  style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                  }}
                  onClick={() => removeChildNode(index)}
                >
                  -
                </button>
              )}
            </div>
            <input
              type="number"
              value={child.value}
              onChange={(e) => adjustNodeValue(index, parseFloat(e.target.value))}
              step="0.01"
              style={{ marginTop: '10px', width: '100%' }}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default FractionNodeApp;
