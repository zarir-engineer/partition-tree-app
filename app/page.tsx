"use client";
import React, { useState } from 'react';  // Import necessary libraries: React and useState hook
import { Button, Container, Row, Col } from 'react-bootstrap';  // Import Bootstrap components for styling
import styles from './styles/FractionNodeApp.module.css';  // Import the CSS module
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS



// This is the main component of the app
const FractionNodeApp = () => {

  // "nodes" is an array that stores the values of 8 child nodes.
  // Initially, each child node has a value of 1/8 (0.125).
  const [nodes, setNodes] = useState(Array(8).fill(1/8));

  // "topNode" is the main or "top" node. Initially, it holds a value of 66.67.
  const [topNode, setTopNode] = useState(66.67);

  // This function allows the user to modify the value of a node.
  // It takes in the node index (which node to change) and the new value.
  const handleValueChange = (index: number, value: number) => {
    // Make a copy of the current nodes array (since React requires you to not modify state directly)
    const updatedNodes = [...nodes];

    // Change the value of the node at the specified index
    updatedNodes[index] = value;

    // Now we need to update the other nodes so that all values add up to 1 (or 100%).
    // First, calculate the remaining value that is missing to reach 1 (100%).
    const remainingValue = 1 - updatedNodes.reduce((acc, node) => acc + node, 0);

    // Update all other nodes with an equal share of the remaining value.
    updatedNodes.forEach((_, i) => {
      if (i !== index) {
        updatedNodes[i] = remainingValue / (nodes.length - 1);
      }
    });

    // Finally, update the state with the new values of all the nodes
    setNodes(updatedNodes);
  };

  // This function adds a new node with an initial value of 1/8 (0.125).
  const addNode = (index: number) => {
    // Copy the current nodes array
    const updatedNodes = [...nodes];

    // Insert a new node right after the specified index
    updatedNodes.splice(index + 1, 0, 1 / 8);

    // Update the state with the new array of nodes
    setNodes(updatedNodes);
  };

  // This function removes a node from the array at the specified index.
  const removeNode = (index: number) => {
    if (nodes.length > 1) {
      // Copy the current nodes array
      const updatedNodes = [...nodes];

      // Remove the node at the specified index
      updatedNodes.splice(index, 1);

      // Update the state with the new array of nodes
      setNodes(updatedNodes);
    }
  };

  // This function adjusts the value of the top node (by adding or subtracting a fixed amount)
  const changeTopNodeValue = (delta: number) => {
    setTopNode(prev => Math.max(0, prev + delta));  // Prevent the top node value from going below 0
  };

  // The UI of the app: using Bootstrap components for layout and styling
  return (
    <Container className="mt-5">  {/* This creates a container to hold all the content */}

      {/* A section for the top node, displaying its value and allowing adjustments with + and - buttons */}
      <div className="text-center mb-4">
        <div className="node">
          <div className="d-flex justify-content-between align-items-center">
            {/* Add button for top node */}
            <Button className="add-btn" onClick={() => changeTopNodeValue(5)}>+</Button>
            {/* Display the top node value */}
            <span>{topNode.toFixed(2)}</span>
            {/* Remove button for top node */}
            <Button className="remove-btn" onClick={() => changeTopNodeValue(-5)}>-</Button>
          </div>
        </div>
      </div>

      {/* A section to display 8 child nodes below the top node */}
      <Row className="justify-content-center">
        {/* Loop through the nodes array and create a node for each entry */}
        {nodes.map((nodeValue, index) => (
          <Col key={index} xs={3} className="d-flex justify-content-center mb-4">
            <div className="node">
              <div className="d-flex justify-content-between align-items-center">
                {/* Add button for each node */}
                <Button className="add-btn" onClick={() => addNode(index)}>+</Button>
                {/* Display the value of each node, converted to percentage */}
                <span>{(nodeValue * 100).toFixed(2)}%</span>
                {/* Remove button for each node */}
                <Button className="remove-btn" onClick={() => removeNode(index)}>-</Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Optional, add lines or SVG here to visually connect the nodes */}
      {/* <svg> for connecting the nodes */}
    </Container>
  );
};

export default FractionNodeApp;
