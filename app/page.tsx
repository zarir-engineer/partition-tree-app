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

  // Function to add a child node
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
        {/* Root node without "+" or "-" buttons */}
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
          {data.value}
        </div>
      </div>

      <div className="d-flex justify-content-center flex-wrap">
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
              {child.value.toFixed(2)}

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

export default TreeComponent;
