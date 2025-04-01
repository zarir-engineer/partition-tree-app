"use client";
"use client";
import { useState } from "react";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles/FractionNodeApp.module.css';

const FractionNodeApp = () => {
  const [data, setData] = useState<any>({
    value: 66.67, // Root node value as 66.67
    children: Array(8).fill({ value: 8.33, children: [] }), // 8 child nodes with initial value 8.33 (66.67 / 8)
  });

  // Function to adjust node values
  const adjustNodeValue = (index: number, value: number, parentIndex: number) => {
    const newChildren = [...data.children];
    newChildren[parentIndex].children[index].value = value;

    // Normalize the other children values to make sure the sum stays the same
    const total = newChildren[parentIndex].children.reduce((sum: number, child: any) => sum + child.value, 0);

    if (total !== newChildren[parentIndex].value) {
      newChildren[parentIndex].children.forEach((child: any, idx: number) => {
        if (idx !== index) {
          child.value = (newChildren[parentIndex].value - value) / (newChildren[parentIndex].children.length - 1);
        }
      });
    }
    setData({ ...data, children: newChildren });
  };

  // Function to add a new child node to a parent node
  const addChildNode = (index: number) => {
    const newNode = { value: 8.33, children: [] };
    const newChildren = [...data.children];
    newChildren[index].children.push(newNode); // Add child node
    setData({
      ...data,
      children: newChildren,
    });
  };

  // Function to remove a child node
  const removeChildNode = (index: number, parentIndex: number) => {
    const newChildren = [...data.children];
    newChildren[parentIndex].children.splice(index, 1);
    setData({
      ...data,
      children: newChildren,
    });
  };

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-center mb-4">
        {/* Root node */}
        <div
          className={styles.node}
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
            marginRight: '20px',
            position: 'relative',
          }}
        >
          {data.value.toFixed(2)}
        </div>
      </div>

      <div className="d-flex justify-content-center flex-wrap" style={{ position: 'relative' }}>
        {/* Child nodes */}
        {data.children.map((child: any, parentIndex: number) => (
          <div key={parentIndex} className="d-flex justify-content-center my-3" style={{ position: 'relative' }}>
            {/* Line to connect parent and child node */}
            <div
              style={{
                position: 'absolute',
                top: '50px', // Adjust depending on the size of the parent node
                left: '50%',
                width: '2px',
                height: '50px',
                backgroundColor: 'gray',
                transform: 'translateX(-50%)',
              }}
            />

            <div
              className={styles.node}
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
                margin: '5px',
                position: 'relative',
              }}
            >
              {child.value.toFixed(2)}

                {/* "+" Button */}
                <button
                  className="plus"
                  onClick={() => addChildNode(parentIndex)} // Add child to the current node
                >
                  +
                </button>

                {/* "-" Button */}
                {child.children.length > 0 && (
                  <button
                    className="minus"
                    onClick={() => removeChildNode(0, parentIndex)} // Remove first child node
                  >
                    -
                  </button>
                )}
            </div>
            <input
              type="number"
              className={styles.inputNoSpinner} // Apply the class here
              value={child.value}
              onChange={(e) => adjustNodeValue(0, parseFloat(e.target.value), parentIndex)} // Adjust value of the current child
              step="0.01"
              style={{ marginTop: '10px', width: '100%' }}
            />

            {/* Sub-child nodes */}
            {child.children.length > 0 && (
              <div className="d-flex justify-content-center flex-wrap" style={{ position: 'relative' }}>
                {child.children.map((subChild: any, index: number) => (
                  <div key={index} className="d-flex justify-content-center my-3" style={{ position: 'relative' }}>
                    {/* Line to connect sub-child and child node */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '50px',
                        left: '50%',
                        width: '2px',
                        height: '50px',
                        backgroundColor: 'gray',
                        transform: 'translateX(-50%)',
                      }}
                    />

                    <div
                      className={styles.node}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: 'lightcoral',
                        color: 'white',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '5px',
                        position: 'relative',
                      }}
                    >
                      {subChild.value.toFixed(2)}

                      {/* "+" Button */}
                      <button
                        style={{
                          position: 'absolute',
                          top: '-15px',
                          left: '-15px',
                          fontSize: '16px',
                          cursor: 'pointer',
                          background: 'transparent',
                          border: 'none',
                          color: 'white',
                        }}
                        onClick={() => addChildNode(index)} // Add a sub-child
                      >
                        +
                      </button>

                      {/* "-" Button */}
                      {subChild.children.length > 0 && (
                        <button
                          style={{
                            position: 'absolute',
                            top: '-15px',
                            right: '-15px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                          }}
                          onClick={() => removeChildNode(0, index)} // Remove sub-child node
                        >
                          -
                        </button>
                      )}
                    </div>
                    <input
                      type="number"
                      className={styles.inputNoSpinner} // Apply the class here
                      value={subChild.value}
                      onChange={(e) => adjustNodeValue(index, parseFloat(e.target.value), parentIndex)} // Adjust value of sub-child node
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

export default FractionNodeApp;
