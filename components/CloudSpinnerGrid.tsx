"use client";
import React, { useState } from "react";
import CloudSpinner from "./CloudSpinner";

// Define the Spinner type
interface Spinner {
  name: string;
  value: number;
  edited: boolean;
  children: Spinner[];
  isTopLevel?: boolean; // ✅ Add this line
}

const MAX_CHILD_SPINNERS = 4;

const initialTreeData: Spinner[] = [
      { name: "Sudarshan-ji", value: 0.125, edited: false, isTopLevel: true,
          children: [
              { name: "Avinash", value: 0, edited: false, children: [] },
              { name: "Nanda", value: 0, edited: false, children: [] },
              { name: "Bharti", value: 0, edited: false, children: [] },
              { name: "Manju", value: 0, edited: false, children: [] },
              ] },
      { name: "Shripal-ji", value: 0.125, edited: false, isTopLevel: true,
          children: [
              { name: "Kiran", value: 0, edited: false, children: [] },
              { name: "Charu", value: 0, edited: false, children: [] },
              { name: "Ajay", value: 0, edited: false, children: [] },
              ] },
      { name: "Ishwar-ji", value: 0.125, edited: false, isTopLevel: true,
          children: [
              { name: "Dinesh", value: 0, edited: false, children: [] },
              { name: "Kishore", value: 0, edited: false, children: [] },
              { name: "Vijay", value: 0, edited: false, children: [] },
              ] },
      { name: "Vigyanchand-ji", value: 0.125, edited: false, isTopLevel: true,
          children: [
              { name: "Vikas", value: 0, edited: false, children: [] },
              { name: "Pragati", value: 0, edited: false, children: [] },
              { name: "Subhash", value: 0, edited: false, children: [] },
              { name: "Chandrashekhar", value: 0, edited: false, children: [] },
              ] },
      { name: "Parmeshwar-ji", value: 0.125, edited: false, isTopLevel: true,
          children: [
              { name: "Pradeep", value: 0, edited: false, children: [] },
              { name: "Sanjay", value: 0, edited: false, children: [] },
              { name: "Abhijeet", value: 0, edited: false, children: [] },
              { name: "Ravi", value: 0, edited: false, children: [] },
              { name: "Mamta", value: 0, edited: false, children: [] },
              { name: "Kiran", value: 0, edited: false, children: [] },
              { name: "child7", value: 0, edited: false, children: [] },
              { name: "child8", value: 0, edited: false, children: [] },
              { name: "child9", value: 0, edited: false, children: [] },] },
      { name: "Pratapchand-ji", value: 0.125, edited: false, isTopLevel: true,
          children: [
              { name: "Shailendra", value: 0, edited: false, children: [] },
              { name: "Smita", value: 0, edited: false, children: [] },
              { name: "Kavita", value: 0, edited: false, children: [] },
              { name: "Nishith", value: 0, edited: false, children: [] },
              ] },
      { name: "Jagdish-ji", value: 0.125, edited: false, isTopLevel: true,
          children: [
              { name: "Soumit", value: 0, edited: false, children: [] },
              { name: "Satyen", value: 0, edited: false, children: [] },
              ] },
      {
        name: "Aa-ji",
        value: 0.125,
        edited: false,
        isTopLevel: true,
        children: [
          { name: "Sudarshan-ji", value: 0, edited: false,
              children: [
                  { name: "Avinash", value: 0, edited: false, children: [] },
                  { name: "Nanda", value: 0, edited: false, children: [] },
                  { name: "Bharti", value: 0, edited: false, children: [] },
                  { name: "Manju", value: 0, edited: false, children: [] },
                  ] },
          { name: "Shripal-ji", value: 0, edited: false,
              children: [
                  { name: "Kiran", value: 0, edited: false, children: [] },
                  { name: "Charu", value: 0, edited: false, children: [] },
                  { name: "Ajay", value: 0, edited: false, children: [] },
                  ] },
          { name: "Ishwar-ji", value: 0, edited: false,
              children: [
                  { name: "Dinesh", value: 0, edited: false, children: [] },
                  { name: "Kishore", value: 0, edited: false, children: [] },
                  { name: "Vijay", value: 0, edited: false, children: [] },
                  ] },
          { name: "Vigyanchand-ji", value: 0, edited: false,
              children: [
                  { name: "Vikas", value: 0, edited: false, children: [] },
                  { name: "Pragati", value: 0, edited: false, children: [] },
                  { name: "Subhash", value: 0, edited: false, children: [] },
                  { name: "Chandrashekhar", value: 0, edited: false, children: [] },
                  ] },
          { name: "Parmeshwar-ji", value: 0, edited: false,
              children: [
                  { name: "Pradeep", value: 0, edited: false, children: [] },
                  { name: "Sanjay", value: 0, edited: false, children: [] },
                  { name: "Abhijeet", value: 0, edited: false, children: [] },
                  { name: "Ravi", value: 0, edited: false, children: [] },
                  { name: "Mamta", value: 0, edited: false, children: [] },
                  { name: "Kiran", value: 0, edited: false, children: [] },
                  { name: "child7", value: 0, edited: false, children: [] },
                  { name: "child8", value: 0, edited: false, children: [] },
                  { name: "child9", value: 0, edited: false, children: [] },] },
          { name: "Pratapchand-ji", value: 0, edited: false,
              children: [
                  { name: "Shailendra", value: 0, edited: false, children: [] },
                  { name: "Smita", value: 0, edited: false, children: [] },
                  { name: "Kavita", value: 0, edited: false, children: [] },
                  { name: "Nishith", value: 0, edited: false, children: [] },
                  ] },
          { name: "Jagdish-ji", value: 0, edited: false,
              children: [
                  { name: "Soumit", value: 0, edited: false, children: [] },
                  { name: "Satyen", value: 0, edited: false, children: [] },
                  ] },
          {
            name: "Laxmibai-ji",
            value: 0,
            edited: false,
            children: [
              { name: "Arun", value: 0, edited: false, children: [] },
              { name: "Gautam", value: 0, edited: false, children: [] },
              { name: "Munni", value: 0, edited: false, children: [] },
              { name: "Neelima", value: 0, edited: false, children: [] },
            ],
          },
        ],
      },
];

const CloudSpinnerGrid: React.FC = () => {
  const [spinners, setSpinners] = useState<Spinner[]>(initialTreeData);
  const [total, setTotal] = useState(0);

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
    setTotal(1); // Ensure total remains 1
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

  const handleAddChild = (parent: Spinner) => {
    const newChildName = `Child ${parent.children.length + 1}`;
    const numChildren = parent.children.length + 1; // New total count including the new child

    // New child starts with equal share of the parent's value
    const newChild: Spinner = {
      name: newChildName,
      value: parent.value / numChildren,
      edited: false,
      children: []
    };

    // Distribute the parent's value equally among all children
    const updatedChildren = [...parent.children, newChild].map(child => ({
      ...child,
      value: parent.value / numChildren
    }));

    // Update parent with new children
    const updateTree = (spinners: Spinner[]): Spinner[] =>
      spinners.map(spinner => {
        if (spinner === parent) {
          return { ...spinner, children: updatedChildren };
        }
        return { ...spinner, children: updateTree(spinner.children) };
      });

    setSpinners(updateTree(spinners)); // Trigger re-render
  };

  const handleNameChange = (spinner: Spinner, newName: string) => {
    spinner.name = newName;
    setSpinners([...spinners]);
  };

  const renderTree = (nodes: Spinner[]) => {
    return nodes.map((node, index) => (
      <div key={index} className="mt-2">
        <CloudSpinner
          name={node.name}
          value={node.value}
          isTopLevel={node.isTopLevel}
          onChange={(newValue) => handleValueChange(node, newValue)}
          onNameChange={(newName) => handleNameChange(node, newName)}
          edited={node.edited}
          total={total} // Ensure this is passed
        />
        <div className="ms-4">{renderTree(node.children)}</div>
      </div>
    ));
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-3">
          <span className="fw-bold">Total: {calculateTotal()}</span>
          <button className="btn btn-warning" onClick={handleReset}>Reset</button>
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-between gap-2 overflow-x-auto">
        {spinners.map((spinner, index) => (
          <div key={index} className="p-2" style={{ flex: "1 1 calc(12.5% - 10px)" }}>
            {renderTree([spinner])}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CloudSpinnerGrid;
