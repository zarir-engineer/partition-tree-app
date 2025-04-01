"use client";
import { useState } from "react";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles/FractionNodeApp.module.css';

type Node = {
  value: number;
  children: Node[];
};

const TreeComponent = () => {
  const [data, setData] = useState<Node>({
    value: 66.67,
    children: Array(8).fill({ value: 1 / 8, children: [] }),
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
    const newChild = { value: 0, children: [] };
    setData({
      ...data,
      children: [...data.children, newChild],
    });
  };

  // Function to remove a child node
  const removeChildNode = (index: number) => {
    const newChildren = data.children.filter((_, i) => i !== index);
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
          {data.value.toFixed(2)} {/* Display the value inside the root node */}
        </div>
      </div>

      <div className="d-flex justify-content-center flex-wrap">
        {/* Child nodes */}
        {data.children.map((child, index) => (
          <div key={index} className="d-flex justify-content-center my-3">
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
              {child.value.toFixed(2)} {/* Display the value inside each child node */}

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
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TreeComponent;
