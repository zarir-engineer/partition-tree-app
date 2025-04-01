"use client";
import { useState } from "react";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles/FractionNodeApp.module.css';

const FractionNodeApp = () => {
  const [data, setData] = useState<any>({
    value: 66.67, // Root node value
    children: Array(8).fill(null).map(() => ({ value: 8.33, children: [] })), // 8 child nodes
  });

  // Adjust node value while keeping the sum intact
  const adjustNodeValue = (index: number, value: number, parentIndex: number) => {
    const newData = JSON.parse(JSON.stringify(data)); // Deep copy
    const parent = newData.children[parentIndex];

    parent.children[index].value = value;
    const total = parent.children.reduce((sum: number, child: any) => sum + child.value, 0);

    if (total !== parent.value) {
      parent.children.forEach((child: any, idx: number) => {
        if (idx !== index) {
          child.value = (parent.value - value) / (parent.children.length - 1);
        }
      });
    }

    setData(newData);
  };

  // Add child node at any level
  const addChildNode = (parentIndex: number) => {
    setData((prevData: any) => {
      const newData = JSON.parse(JSON.stringify(prevData)); // Deep copy
      newData.children[parentIndex].children.push({ value: 8.33, children: [] });
      return newData;
    });
  };

  // Remove child node correctly
  const removeChildNode = (index: number, parentIndex: number) => {
    setData((prevData: any) => {
      const newData = JSON.parse(JSON.stringify(prevData)); // Deep copy
      newData.children[parentIndex].children.splice(index, 1);
      return newData;
    });
  };

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-center mb-4">
        {/* Root node */}
        <div className={styles.node} style={nodeStyle(100)}>
          {data.value.toFixed(2)}
        </div>
      </div>

      <div className="d-flex justify-content-center flex-wrap" style={{ position: 'relative' }}>
        {/* Child nodes */}
        {data.children.map((child: any, parentIndex: number) => (
          <div key={parentIndex} className="d-flex justify-content-center my-3" style={{ position: 'relative' }}>
            <div className={styles.node} style={nodeStyle(70)}>
              {child.value.toFixed(2)}
              <button className="plus" onClick={() => addChildNode(parentIndex)}>+</button>
              {child.children.length > 0 && (
                <button className="minus" onClick={() => removeChildNode(0, parentIndex)}>-</button>
              )}
            </div>

            <input
              type="number"
              className={styles.inputNoSpinner}
              value={child.value}
              onChange={(e) => adjustNodeValue(parentIndex, parseFloat(e.target.value), parentIndex)}
              step="0.01"
              style={{ marginTop: '10px', width: '100%' }}
            />

            {/* Sub-child nodes */}
            {child.children.length > 0 && (
              <div className="d-flex justify-content-center flex-wrap">
                {child.children.map((subChild: any, index: number) => (
                  <div key={index} className="d-flex justify-content-center my-3" style={{ position: 'relative' }}>
                    <div className={styles.node} style={nodeStyle(60, "lightcoral")}>
                      {subChild.value.toFixed(2)}
                      <button className="plus" onClick={() => addChildNode(index)}>+</button>
                      <button className="minus" onClick={() => removeChildNode(index, parentIndex)}>-</button>
                    </div>

                    <input
                      type="number"
                      className={styles.inputNoSpinner}
                      value={subChild.value}
                      onChange={(e) => adjustNodeValue(index, parseFloat(e.target.value), parentIndex)}
                      step="0.01"
                      style={{ marginTop: '10px', width: '100%' }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
};

// Helper function to style nodes dynamically
const nodeStyle = (size: number, color: string = "steelblue") => ({
  width: `${size}px`,
  height: `${size}px`,
  borderRadius: '50%',
  backgroundColor: color,
  color: 'white',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '5px',
  position: 'relative',
});

export default FractionNodeApp;
