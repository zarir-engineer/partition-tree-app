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
    setSpinners(initialTreeData.map(spinner => ({ ...spinner, value: 0, edited: false })));
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
  const diff = newValue - node.value; // Find the difference
  node.value = newValue;

  // Update all ancestors
  let parent = findParent(spinners, node);
  while (parent) {
    parent.value += diff;
    parent = findParent(spinners, parent);
  }
  setTotal(prevTotal => prevTotal + diff); // Update total
  setSpinners([...spinners]); // Trigger re-render
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
