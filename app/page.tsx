"use client";
import { useState } from "react";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles/FractionNodeApp.module.css';

type Node = {
  value: number;
  fraction: string;
  children: Node[];
};

const TreeComponent = () => {
  const [data, setData] = useState<Node>({
    value: 1,
    fraction: "1",
    children: Array(8).fill({
      value: 0.125,
      fraction: "1/8",
      children: []
    }),
  });

  // Function to adjust node values
  const adjustNodeValue = (index: number, value: number) => {
    const newChildren = [...data.children];
    newChildren[index].value = value;
    newChildren[index].fraction = `1/${(1 / value).toFixed(2)}`;

    const total = newChildren.reduce((sum, child) => sum + child.value, 0);
    if (total !== 1) {
      newChildren.forEach((child, idx) => {
        if (idx !== index) {
          child.value = (1 - value) / (newChildren.length - 1);
          child.fraction = `1/${(1 / child.value).toFixed(2)}`;
        }
      });
    }

    setData({
      ...data,
      children: newChildren,
    });
  };

  const addChildNode = (index: number) => {
    const newChildren = [...data.children];
    const parentValue = newChildren[index].value;
    const newValue = (parentValue + 0.01).toFixed(2);
    const newChild: Node = {
      value: parseFloat(newValue),
      fraction: `1/${(1 / parseFloat(newValue)).toFixed(2)}`,
      children: [],
    };

    newChildren[index].children.push(newChild);
    newChildren[index].value = parseFloat(newValue);

    setData({
      ...data,
      children: newChildren,
    });
  };

  const removeChildNode = (parentIndex: number, childIndex: number) => {
    const newChildren = [...data.children];
    newChildren[parentIndex].children.splice(childIndex, 1);
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
          {data.fraction}
        </div>
      </div>

      <div className="d-flex justify-content-center flex-wrap" style={{ gap: '30px' }}>
        {/* Render child nodes dynamically */}
        {data.children.map((child, parentIndex) => (
          <div key={parentIndex} className="d-flex justify-content-center my-3" style={{ position: 'relative' }}>
            {/* Parent node */}
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
              {child.fraction}

              {/* "+" Button to add a node */}
              <button
                style={{
                  position: 'absolute',
                  top: '-25px',  // Space between node and button
                  left: '-25px', // Space from left edge of node
                  fontSize: '18px',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  padding: '8px',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => addChildNode(parentIndex)}
              >
                +
              </button>

              {/* "-" Button to remove a node */}
              {child.children.length > 0 && (
                <button
                  style={{
                    position: 'absolute',
                    top: '-25px',  // Space between node and button
                    right: '-25px', // Space from right edge of node
                    fontSize: '18px',
                    cursor: 'pointer',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    padding: '8px',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={() => removeChildNode(parentIndex, 0)}
                >
                  -
                </button>
              )}
            </div>

            {/* Render child nodes (if any) */}
            {child.children.map((subChild, childIndex) => (
              <div key={childIndex} className="d-flex justify-content-center my-3" style={{ marginTop: '40px' }}>
                <div
                  className={styles.node}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'orange',
                    color: 'white',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '5px',
                    position: 'relative',
                  }}
                >
                  {subChild.fraction}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TreeComponent;
