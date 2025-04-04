"use client";
import React, { useEffect, useState } from "react";
import CloudSpinner from "./CloudSpinner";
import { Spinner, initialTreeData } from "../data/initialTreeData";
import jsPDF from "jspdf";


const MAX_CHILD_SPINNERS = 4;



const CloudSpinnerGrid: React.FC = () => {
  const [spinners, setSpinners] = useState<Spinner[]>(initialTreeData);
  const [total, setTotal] = useState(1); // Move state here

  const handleSaveToPDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;

    doc.setFontSize(16);
    doc.text("Vile Parle, Mumbai", 10, 10);
    doc.text("Legend: [1/8 means 0.125]", 10, 20);
    doc.text(`Total: ${total}`, 10, 30);

    let y = 40;

  const addTextWithPagination = (text: string) => {
      if (y > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }
      doc.text(text, 10, y);
      y += 10;
    };

    spinners.forEach((spinner) => {
      addTextWithPagination(`${spinner.name}: ${spinner.value}`);

      spinner.children.forEach((child) => {
        addTextWithPagination(`  - ${child.name}: ${child.value}`);
      });
    });

    doc.save("ratio-deal.pdf");
  };

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

  const handleValueChange = (id: number, newValue: number) => {
    setSpinners((prevSpinners) => {
      let updatedSpinners = [...prevSpinners];
      let currentTotal = calculateTotal();

      const findAndUpdateSpinner = (spinners: Spinner[], parent: Spinner | null = null): Spinner[] => {
        return spinners.map((spinner) => {
          if (spinner.id === id) {
            const difference = newValue - spinner.value;
            const newTotal = currentTotal + difference;

            if (newTotal > 1) {
              const excess = newTotal - 1;
              let adjusted = false;

              // Find unedited siblings to decrease
              const siblings = parent ? parent.children : updatedSpinners;
              siblings.forEach((sibling) => {
                if (sibling.id !== id && !sibling.edited && sibling.value > 0) {
                  const reduction = Math.min(sibling.value, excess);
                  sibling.value -= reduction;
                  adjusted = true;
                }
              });

              if (!adjusted) {
                alert("Cannot increase further as no unedited values are available.");
                return spinner; // Don't update if no adjustment possible
              }
            }

            // Set new value and mark as edited
            return { ...spinner, value: newValue, edited: true };
          }

          // Recursively update children
          return { ...spinner, children: findAndUpdateSpinner(spinner.children, spinner) };
        });
      };

      updatedSpinners = findAndUpdateSpinner(updatedSpinners);

      // Recalculate parent values
      const updateParentValues = (spinners: Spinner[]) => {
        return spinners.map((spinner) => {
          if (spinner.children.length > 0) {
            spinner.value = spinner.children.reduce((sum, child) => sum + child.value, 0);
            spinner.children = updateParentValues(spinner.children);
          }
          return spinner;
        });
      };

      return updateParentValues(updatedSpinners);
    });
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

  const findSpinnerById = (spinners: Spinner[], id: number): Spinner | null => {
    for (const spinner of spinners) {
      if (spinner.id === id) return spinner; // Found the spinner
      const foundInChildren = findSpinnerById(spinner.children, id);
      if (foundInChildren) return foundInChildren; // Recursively check children
    }
    return null; // Not found
  };

  const handleNameChange = (nodeId: number, newName: string) => {
    const node = findSpinnerById(spinners, nodeId);
    if (!node) return; // Handle case where spinner is not found

    node.name = newName; // Update name

    setSpinners([...spinners]); // Trigger re-render
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
          onChange={(newValue) => handleValueChange(spinner.id, newValue)}
          onNameChange={(newName) => handleNameChange(spinner.id, newName)} // ✅ Add this line
          edited={spinner.edited}
          total={total}
          isTopLevel={!!(parentId === undefined)} // ✅ Top-level has no parent
        />
        {spinner.children.length > 0 && (
          <div>{renderSpinners(spinner.children, spinner.id)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="container-fluid">
      <div className="main-scroll-container">
        {/* ✅ Sticky Top-Level Content */}
        <div className="top-level-container">
          <div className="legend-container">
            <h3>Vile Parle, Mumbai</h3>
            <span className="legend">Legend: [1/8 means 0.125]</span>
          </div>

          <div className="d-flex justify-content-end align-items-center gap-3 mb-3 w-100 px-4">
            <span className="fw-bold">Total: {total}</span>
            <button className="btn btn-warning" onClick={handleReset}>
              Reset
            </button>
            <button className="btn btn-primary" onClick={handleSaveToPDF}>
              Save to PDF
            </button>
          </div>

          <div className="d-flex justify-content-between flex-wrap">
            {spinners
              .filter((sp) => sp.isTopLevel)
              .map((topLevel) => (
                <CloudSpinner
                  key={topLevel.id}
                  name={topLevel.name}
                  value={topLevel.value}
                  total={total}
                  onChange={(newValue) => handleValueChange(topLevel.id, newValue)}
                  onNameChange={(newName) => handleNameChange(topLevel.id, newName)}
                  edited={topLevel.edited}
                  isTopLevel={true}
                />
              ))}
          </div>
        </div>

        {/* ✅ Scrollable Children Section (Proper Grid) */}
        <div className="row scrollable-children px-2">
          {spinners
            .filter((sp) => sp.isTopLevel)
            .map((topLevel) => (
              <div key={topLevel.id} className="col-12 col-md-6 col-lg-3">
                {renderSpinners(topLevel.children)}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CloudSpinnerGrid;
