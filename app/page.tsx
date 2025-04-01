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
    value: 66.67,  // Root node value
    children: [],  // Initially no children
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

  // Function to add a new child node below the current node and divide value equally
  const addChildNode = (index: number) => {
    const newChildren = [...data.children];
    const parentValue = newChildren[index].value;
    newChildren[index].children.push({ value: parentValue / 2, children: [] });
    newChildren[index].children.push({ value: parentValue / 2, children: [] });

    // Adjust the parent's value since it's now divided among the new children
    newChildren[index].value = parentValue / 2;
    setData({
      ...data,
      children: newChildren,
    });
  };

  // Function to remove a child node
  const removeChildNode = (parentIndex: number, childIndex: number) => {
    const newChildren = [...data.children];
    newChildren[parentIndex].children.splice(childIndex, 1);  // Remove the specific child node
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
          {data.value.toFixed(2)} {/* Root node value */}
        </div>
      </div>

      <div className="d-flex justify-content-center flex-wrap">
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
              {child.value.toFixed(2)} {/* Display the value of the parent node */}

              {/* "+" Button to add a node */}
              <button
                style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '-15px',
                  fontSize: '18px',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                }}
                onClick={() => addChildNode(parentIndex)} // Add child node below the parent
              >
                +
              </button>

              {/* "-" Button to remove a node */}
              {data.children.length > 1 && (
                <button
                  style={{
                    position: 'absolute',
                    top: '-15px',
                    right: '-15px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                  }}
                  onClick={() => removeChildNode(parentIndex, 0)} // Remove the first child node
                >
                  -
                </button>
              )}
            </div>

            {/* Render child nodes (if any) */}
            {child.children.map((subChild, childIndex) => (
              <div key={childIndex} className="d-flex justify-content-center my-3" style={{ marginTop: '30px' }}>
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
                  {subChild.value.toFixed(2)} {/* Display value of the child node */}
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
