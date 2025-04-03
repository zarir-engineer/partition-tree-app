"use client";
import React, { useEffect, useState } from "react";
import CloudSpinner from "./CloudSpinner";
import { Spinner, initialTreeData } from "../data/initialTreeData";


const MAX_CHILD_SPINNERS = 4;


const CloudSpinnerGrid: React.FC = () => {
  const [spinners, setSpinners] = useState<Spinner[]>(initialTreeData);
  const [total, setTotal] = useState(1); // Move state here


  const handleUpdateTotal = () => {
    const newTotal = total + 1; // Example logic to update total
    setTotal(newTotal); // Update total in parent component
  };

  const calculateTotal = () => {
    return spinners.reduce((sum, spinner) => sum + spinner.value, 0);
  };

  // Update total whenever spinners change
  useEffect(() => {
    setTotal(calculateTotal());
  }, [spinners]);

  const handleReset = () => {
    setSpinners(
      initialTreeData.map(spinner => {
        const numChildren = spinner.children.length;
        const childValue = numChildren > 0 ? 0.125 / numChildren : 0;

        return {
          ...spinner,
          value: 0.125, // Reset top-level to 0.125
          edited: false,
          children: spinner.children.map((child: Spinner) => {
            const numGrandChildren = child.children.length;
            const grandChildValue = numGrandChildren > 0 ? childValue / numGrandChildren : 0;

            return {
              ...child,
              value: childValue, // Distribute value among children
              edited: false,
              children: child.children.map((grandChild: Spinner) => ({
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
      const difference = newValue - node.value; // Change in value
      node.value = newValue;
      node.edited = true; // Mark as edited

      const parent = findParent(spinners, node);
      if (parent) {
          // Adjust siblings to maintain parent value
          let untouchedSiblings = parent.children.filter(sp => sp !== node && !sp.edited && sp.value > 0);
          let totalUntouched = untouchedSiblings.reduce((sum, sp) => sum + sp.value, 0);

          untouchedSiblings.forEach(sp => {
              let proportion = sp.value / totalUntouched;
              sp.value = Math.max(0, sp.value - proportion * difference);
          });

          // Propagate change up to parent
          parent.value = parent.children.reduce((sum, child) => sum + child.value, 0);
      } else {
          // This is a top-level spinner
          let untouchedTopLevel = spinners.filter(sp => sp !== node && !sp.edited && sp.value > 0);
          let totalUntouched = untouchedTopLevel.reduce((sum, sp) => sum + sp.value, 0);

          untouchedTopLevel.forEach(sp => {
              let proportion = sp.value / totalUntouched;
              sp.value = Math.max(0, sp.value - proportion * difference);
          });

          // Adjust children of the top-level spinner (unless edited)
          node.children.forEach(child => {
              if (!child.edited) {
                  let childProportion = child.value / (node.value || 1);
                  child.value = node.value * childProportion;
              }
          });
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
          isTopLevel={parentId === undefined} // ✅ Top-level has no parent
        />
        {spinner.children.length > 0 && (
          <div>{renderSpinners(spinner.children, spinner.id)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="container-fluid">
      {/* ✅ Location & Legend at the top */}
      <div className="legend-container">
        <h3>Vile Parle, Mumbai</h3>
        <span className="legend">Legend: [1/8 means 0.125]</span>
      </div>

      {/* ✅ Top Bar: Total + Reset Button */}
      <div className="d-flex justify-content-end align-items-center gap-3 mb-3 w-100 px-4">
        <span className="fw-bold">Total: {total}</span>
        <button className="btn btn-warning" onClick={handleReset}>Reset</button>
      </div>

      {/* ✅ Fixed Top-Level Spinners */}
      <div className="top-level-container d-flex justify-content-between">
        {renderSpinners(spinners.filter(sp => sp.isTopLevel))}
      </div>

      {/* ✅ Scrollable Child Widgets */}
      <div className="scrollable-container d-flex flex-wrap justify-content-between gap-2 overflow-x-auto">
        {spinners.map(spinner =>
          spinner.children.length > 0 && (
            <div key={spinner.id} className="p-2" style={{ flex: "1 1 calc(12.5% - 10px)" }}>
              {/* Render Spinner Tree */}
              {renderSpinners([spinner])}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CloudSpinnerGrid;
