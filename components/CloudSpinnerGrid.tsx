"use client";
import React, { useState } from "react";
import CloudSpinner from "./CloudSpinner";

// Define the Spinner type
interface Spinner {
  id: number;
  name: string;
  value: number;
  edited: boolean;
  children: Spinner[];
  isTopLevel?: boolean; // ✅ Add this line
}

interface CloudSpinnerGridProps {
  setTotal: (total: number) => void;
}

const MAX_CHILD_SPINNERS = 4;

const initialTreeData: Spinner[] = [
      { id: 1, name: "Sudarshan-ji", value: 0.125, edited: false, isTopLevel: true,
          children: [
              { id: 101, name: "Avinash", value: 0, edited: false, children: [] },
              { id: 102, name: "Nanda", value: 0, edited: false, children: [] },
              { id: 103, name: "Bharti", value: 0, edited: false, children: [] },
              { id: 104, name: "Manju", value: 0, edited: false, children: [] },
              ] },
      { id: 2, name: "Shripal-ji", value: 0.125, edited: false, isTopLevel: true,
          children: [
              { id: 201, name: "Kiran", value: 0, edited: false, children: [] },
              { id: 202, name: "Charu", value: 0, edited: false, children: [] },
              { id: 203, name: "Ajay", value: 0, edited: false, children: [] },
              ] },
      { id: 3, name: "Ishwar-ji", value: 0.125, edited: false, isTopLevel: true,
          children: [
              { id: 301, name: "Dinesh", value: 0, edited: false, children: [] },
              { id: 302, name: "Kishore", value: 0, edited: false, children: [] },
              { id: 303, name: "Vijay", value: 0, edited: false, children: [] },
              ] },
      { id: 4, name: "Vigyanchand-ji", value: 0.125, edited: false, isTopLevel: true,
          children: [
              { id: 401, name: "Vikas", value: 0, edited: false, children: [] },
              { id: 402, name: "Pragati", value: 0, edited: false, children: [] },
              { id: 403, name: "Subhash", value: 0, edited: false, children: [] },
              { id: 404, name: "Chandrashekhar", value: 0, edited: false, children: [] },
              ] },
      { id: 5, name: "Parmeshwar-ji", value: 0.125, edited: false, isTopLevel: true,
          children: [
              { id: 501, name: "Pradeep", value: 0, edited: false, children: [] },
              { id: 502, name: "Sanjay", value: 0, edited: false, children: [] },
              { id: 503, name: "Abhijeet", value: 0, edited: false, children: [] },
              { id: 504, name: "Ravi", value: 0, edited: false, children: [] },
              { id: 505, name: "Mamta", value: 0, edited: false, children: [] },
              { id: 506, name: "Kiran", value: 0, edited: false, children: [] },
              { id: 507, name: "child7", value: 0, edited: false, children: [] },
              { id: 508, name: "child8", value: 0, edited: false, children: [] },
              { id: 509, name: "child9", value: 0, edited: false, children: [] },
              ] },
      { id: 6, name: "Pratapchand-ji", value: 0.125, edited: false, isTopLevel: true,
          children: [
              { id: 601, name: "Shailendra", value: 0, edited: false, children: [] },
              { id: 602, name: "Smita", value: 0, edited: false, children: [] },
              { id: 603, name: "Kavita", value: 0, edited: false, children: [] },
              { id: 604, name: "Nishith", value: 0, edited: false, children: [] },
              ] },
      { id: 7, name: "Jagdish-ji", value: 0.125, edited: false, isTopLevel: true,
          children: [
              { id: 701, name: "Soumit", value: 0, edited: false, children: [] },
              { id: 702, name: "Satyen", value: 0, edited: false, children: [] },
              ] },
      {
        id: 8, name: "Aa-ji", value: 0.125, edited: false, isTopLevel: true,
        children: [
          { id: 801, name: "Sudarshan-ji", value: 0, edited: false, isTopLevel: true,
              children: [
                  { id: 8011, name: "Avinash", value: 0, edited: false, children: [] },
                  { id: 8012, name: "Nanda", value: 0, edited: false, children: [] },
                  { id: 8013, name: "Bharti", value: 0, edited: false, children: [] },
                  { id: 8014, name: "Manju", value: 0, edited: false, children: [] },
                  ] },
          { id: 802, name: "Shripal-ji", value: 0, edited: false, isTopLevel: true,
              children: [
                  { id: 8021, name: "Kiran", value: 0, edited: false, children: [] },
                  { id: 8022, name: "Charu", value: 0, edited: false, children: [] },
                  { id: 8023, name: "Ajay", value: 0, edited: false, children: [] },
                  ] },
          { id: 803, name: "Ishwar-ji", value: 0, edited: false, isTopLevel: true,
              children: [
                  { id: 8031, name: "Dinesh", value: 0, edited: false, children: [] },
                  { id: 8032, name: "Kishore", value: 0, edited: false, children: [] },
                  { id: 8033, name: "Vijay", value: 0, edited: false, children: [] },
                  ] },
          { id: 804, name: "Vigyanchand-ji", value: 0, edited: false, isTopLevel: true,
              children: [
                  { id: 8041, name: "Vikas", value: 0, edited: false, children: [] },
                  { id: 8042, name: "Pragati", value: 0, edited: false, children: [] },
                  { id: 8043, name: "Subhash", value: 0, edited: false, children: [] },
                  { id: 8044, name: "Chandrashekhar", value: 0, edited: false, children: [] },
                  ] },
          { id: 805, name: "Parmeshwar-ji", value: 0, edited: false, isTopLevel: true,
              children: [
                  { id: 8051, name: "Pradeep", value: 0, edited: false, children: [] },
                  { id: 8052, name: "Sanjay", value: 0, edited: false, children: [] },
                  { id: 8053, name: "Abhijeet", value: 0, edited: false, children: [] },
                  { id: 8054, name: "Ravi", value: 0, edited: false, children: [] },
                  { id: 8055, name: "Mamta", value: 0, edited: false, children: [] },
                  { id: 8056, name: "Kiran", value: 0, edited: false, children: [] },
                  { id: 8057, name: "child7", value: 0, edited: false, children: [] },
                  { id: 8058, name: "child8", value: 0, edited: false, children: [] },
                  { id: 8059, name: "child9", value: 0, edited: false, children: [] },
                  ] },
          { id: 806, name: "Pratapchand-ji", value: 0, edited: false, isTopLevel: true,
              children: [
                  { id: 8061, name: "Shailendra", value: 0, edited: false, children: [] },
                  { id: 8062, name: "Smita", value: 0, edited: false, children: [] },
                  { id: 8063, name: "Kavita", value: 0, edited: false, children: [] },
                  { id: 8064, name: "Nishith", value: 0, edited: false, children: [] },
                  ] },
          { id: 807, name: "Jagdish-ji", value: 0, edited: false, isTopLevel: true,
              children: [
                  { id: 8071, name: "Soumit", value: 0, edited: false, children: [] },
                  { id: 8072, name: "Satyen", value: 0, edited: false, children: [] },
                  ] },
          { id: 808, name: "Laxmibai-ji", value: 0, edited: false, isTopLevel: true,
            children: [
              { id: 8081, name: "Arun", value: 0, edited: false, children: [] },
              { id: 8082, name: "Gautam", value: 0, edited: false, children: [] },
              { id: 8083, name: "Munni", value: 0, edited: false, children: [] },
              { id: 8084, name: "Neelima", value: 0, edited: false, children: [] },
            ],
          },
        ],
      },
];

const CloudSpinnerGrid: React.FC<CloudSpinnerGridProps> = ({ setTotal }) => {
  const [spinners, setSpinners] = useState<Spinner[]>(initialTreeData);
  const [total, updateTotal] = useState(1);

  const handleUpdateTotal = () => {
    const newTotal = total + 1; // Example logic to update total
    updateTotal(newTotal);
    setTotal(newTotal); // Update total in parent component
  };

  const calculateTotal = () => {
    return spinners.reduce((sum, spinner) => sum + spinner.value, 0);
  };

  const handleReset = () => {
    setSpinners(
      initialTreeData.map(spinner => {
        const numChildren = spinner.children.length;
        const childValue = numChildren > 0 ? 0.125 / numChildren : 0;

        return {
          ...spinner,
          value: 0.125, // Reset top-level to 0.125
          edited: false,
          children: spinner.children.map(child => {
            const numGrandChildren = child.children.length;
            const grandChildValue = numGrandChildren > 0 ? childValue / numGrandChildren : 0;

            return {
              ...child,
              value: childValue, // Distribute value among children
              edited: false,
              children: child.children.map(grandChild => ({
                ...grandChild,
                value: grandChildValue, // Distribute value among grandchildren
                edited: false
              }))
            };
          })
        };
      })
    );

    // ✅ Update total state
    setTotal(1);

    // ✅ Also update total in UI dynamically
    const totalElement = document.getElementById("totalValue");
    if (totalElement) {
      totalElement.textContent = "1"; // Ensure the total displays correctly
    }
  };

  const findParent = (nodes: Spinner[], child: Spinner): Spinner | null => {
    for (const node of nodes) {
      if (node.children.includes(child)) return node;
      const found = findParent(node.children, child);
      if (found) return found;
    }
    return null;
  };

  const handleValueChange = (node: Spinner, newValue: number) => {
    const currentTotal = calculateTotal();
    const difference = newValue - node.value; // How much the value is changing

    // If new total exceeds 1, adjust other values or throw warning
    if (currentTotal + difference > 1) {
      alert("Total cannot exceed 1. Adjusting other values...");
      const excess = (currentTotal + difference) - 1;

      // Try to distribute excess among other spinners
      let remainingSpinners = spinners.filter(sp => sp !== node && sp.value > 0);

      if (remainingSpinners.length > 0) {
        let distributeAmount = excess / remainingSpinners.length;

        remainingSpinners.forEach(sp => {
          sp.value = Math.max(0, sp.value - distributeAmount); // Reduce each spinner’s value
        });
      } else {
        alert("No values available to adjust. Cannot increase further.");
        return;
      }
    }

    // Update the child's value
    node.value = newValue;

    // Update parent values recursively
    let parent = findParent(spinners, node);
    while (parent) {
      parent.value = parent.children.reduce((sum, child) => sum + child.value, 0);
      parent = findParent(spinners, parent);
    }

    setSpinners([...spinners]); // Trigger re-render
  };

  const handleAddChild = (parentId: number) => {
    setSpinners((prevSpinners) => {
      // Helper function to update the tree recursively
      const updateTree = (spinners: Spinner[]): Spinner[] => {
        return spinners.map((spinner) => {
          if (spinner.id === parentId) {
            if (spinner.children.length >= 4) {
              alert("Maximum of 4 children allowed.");
              return spinner;
            }

            const numChildren = spinner.children.length + 1;
            const newChild: Spinner = {
              id: Date.now(), // Assign a unique ID
              name: `Child ${numChildren}`,
              value: spinner.value / numChildren,
              edited: false,
              children: [],
            };

            // Distribute the parent's value equally among all children
            const updatedChildren = [...spinner.children, newChild].map((child) => ({
              ...child,
              value: spinner.value / numChildren,
            }));

            return { ...spinner, children: updatedChildren };
          }

          return { ...spinner, children: updateTree(spinner.children) }; // Recurse into children
        });
      };

      return updateTree(prevSpinners);
    });
  };

  const handleNameChange = (spinner: Spinner, newName: string) => {
    spinner.name = newName;
    setSpinners([...spinners]);
  };

  const handleIncrement = (spinnerId: number) => {
    setSpinners((prevSpinners) =>
      prevSpinners.map((spinner) =>
        spinner.id === spinnerId
          ? { ...spinner, value: spinner.value + 1 }
          : spinner
      )
    );
  };

  const handleDecrement = (spinnerId: number) => {
    setSpinners((prevSpinners) =>
      prevSpinners.map((spinner) =>
        spinner.id === spinnerId
          ? { ...spinner, value: Math.max(0, spinner.value - 1) } // Prevent negative values
          : spinner
      )
    );
  };

  const renderSpinners = (spinners: Spinner[], parentId?: number) => {
    return spinners.map((spinner) => (
      <div key={spinner.id} style={{ marginLeft: parentId ? "20px" : "0px" }}>
        <CloudSpinner
          name={spinner.name}
          value={spinner.value}
          onChange={(newValue) => handleValueChange(spinner, newValue)}
          onNameChange={(newName) => handleNameChange(spinner, newName)} // ✅ Add this line
          edited={spinner.edited}
          total={total}
          isTopLevel={spinner.isTopLevel}
        />
        {spinner.children.length > 0 && (
          <div>{renderSpinners(spinner.children, spinner.id)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="container-fluid">
      {/* Top Bar: Total + Reset Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-3">
          <span className="fw-bold">Total: {calculateTotal()}</span>
          <button className="btn btn-warning" onClick={handleReset}>Reset</button>
        </div>
      </div>

      {/* Spinners Grid */}
      <div className="d-flex flex-wrap justify-content-between gap-2 overflow-x-auto">
        {spinners.map((spinner) => (
          <div key={spinner.id} className="p-2" style={{ flex: "1 1 calc(12.5% - 10px)" }}>
            {/* Increment & Decrement Buttons */}
            <button
              onClick={() => handleIncrement(spinner.id)}
              disabled={spinner.edited === false} // Disable increment after reset
            >
              ➕
            </button>

            <button
              onClick={() => handleDecrement(spinner.id)}
              disabled={spinner.value <= 0} // Only disable decrement when value is 0
            >
              ➖
            </button>

            {/* Render Spinner Tree */}
            {renderSpinners([spinner])}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CloudSpinnerGrid;
