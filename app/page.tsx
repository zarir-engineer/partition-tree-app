"use client";
import { useState } from "react";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles/FractionNodeApp.module.css';

type Node = {
  value: number; // Store the decimal value
  fraction: string; // Store the fraction as a string (e.g., '1/8')
  children: Node[];
};

const TreeComponent = () => {
  const [data, setData] = useState<Node>({
    value: 1,  // Root node value is set to 1
    fraction: "1",  // Root node fraction is '1'
    children: Array(8).fill({
      value: 0.125,  // Initialize each child node with a fraction value of 1/8
      fraction: "1/8",
      children: []
    }),
  });

  // Function to adjust node values
  const adjustNodeValue = (index: number, value: number) => {
    const newChildren = [...data.children];
    newChildren[index].value = value;
    newChildren[index].fraction = `1/${(1 / value).toFixed(2)}`; // Update fraction accordingly

    // Normalize the other children to make the sum equal to 1
    const total = newChildren.reduce((sum, child) => sum + child.value, 0);
    if (total !== 1) {
      newChildren.forEach((child, idx) => {
        if (idx !== index) {
          child.value = (1 - value) / (newChildren.length - 1);
          child.fraction = `1/${(1 / child.value).toFixed(2)}`; // Update fraction for other nodes
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

    // Add a new child node below the current one
    const newValue = (parentValue + 0.01).toFixed(2); // Slight increase in value
    const newChild: Node = {
      value: parseFloat(newValue),
      fraction: `1/${(1 / parseFloat(newValue)).toFixed(2)}`, // Update fraction accordingly
      children: [],
    };

    // Push the new child to the current node's children array
    newChildren[index].children.push(newChild);

    // Update the value of the parent node to reflect the addition
    newChildren[index].value = parseFloat(newValue);

    setData({
      ...data,
      children: newChildren,
    });
  };

  // Function to remove a child node
  const removeChildNode = (parentIndex: number, childIndex: number) => {
    const newChildren = [...data.children];
    newChildren[parentIndex].children.splice(childIndex, 1); // Remove the specific child node
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
          {data.fraction} {/* Display the fraction of the root node */}
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
              {child.fraction} {/* Display the fraction of the parent node */}

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
              {child.children.length > 0 && (
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
                  {subChild.fraction} {/* Display fraction of the child node */}
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
