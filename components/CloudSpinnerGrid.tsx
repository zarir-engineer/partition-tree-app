"use client";
import React, { useState } from "react";
import CloudSpinner from "./CloudSpinner";

interface Spinner {
  name: string;
  value: number;
  edited: boolean;
  children: Spinner[];
}

const MAX_CHILD_SPINNERS = 4;

const initialTreeData: Spinner[] = [
      { name: "Sudarshan-ji", value: 0, edited: false, children: [
              { name: "Avinash", value: 0, edited: false, children: [] },
              { name: "Nanda", value: 0, edited: false, children: [] },
              { name: "Bharti", value: 0, edited: false, children: [] },
              { name: "Manju", value: 0, edited: false, children: [] },
              ] },
      { name: "Shripal-ji", value: 0, edited: false, children: [
              { name: "Kiran", value: 0, edited: false, children: [] },
              { name: "Charu", value: 0, edited: false, children: [] },
              { name: "Ajay", value: 0, edited: false, children: [] },
              ] },
      { name: "Ishwar-ji", value: 0, edited: false, children: [
              { name: "Dinesh", value: 0, edited: false, children: [] },
              { name: "Kishore", value: 0, edited: false, children: [] },
              { name: "Vijay", value: 0, edited: false, children: [] },
              ] },
      { name: "Vigyanchand-ji", value: 0, edited: false, children: [
              { name: "Vikas", value: 0, edited: false, children: [] },
              { name: "Pragati", value: 0, edited: false, children: [] },
              { name: "Subhash", value: 0, edited: false, children: [] },
              { name: "Chandrashekhar", value: 0, edited: false, children: [] },
              ] },
      { name: "Parmeshwar-ji", value: 0, edited: false, children: [
              { name: "Pradeep", value: 0, edited: false, children: [] },
              { name: "Sanjay", value: 0, edited: false, children: [] },
              { name: "Abhijeet", value: 0, edited: false, children: [] },
              { name: "Ravi", value: 0, edited: false, children: [] },
              { name: "Mamta", value: 0, edited: false, children: [] },
              { name: "Kiran", value: 0, edited: false, children: [] },
              { name: "child7", value: 0, edited: false, children: [] },
              { name: "child8", value: 0, edited: false, children: [] },
              { name: "child9", value: 0, edited: false, children: [] },] },
      { name: "Pratapchand-ji", value: 0, edited: false, children: [
              { name: "Shailendra", value: 0, edited: false, children: [] },
              { name: "Smita", value: 0, edited: false, children: [] },
              { name: "Kavita", value: 0, edited: false, children: [] },
              { name: "Nishith", value: 0, edited: false, children: [] },
              ] },
      { name: "Jagdish-ji", value: 0, edited: false, children: [
              { name: "Soumit", value: 0, edited: false, children: [] },
              { name: "Satyen", value: 0, edited: false, children: [] },
              ] },
      {
        name: "Aa-ji",
        value: 0,
        edited: false,
        children: [
          { name: "Sudarshan-ji", value: 0, edited: false, children: [
                  { name: "Avinash", value: 0, edited: false, children: [] },
                  { name: "Nanda", value: 0, edited: false, children: [] },
                  { name: "Bharti", value: 0, edited: false, children: [] },
                  { name: "Manju", value: 0, edited: false, children: [] },
                  ] },
          { name: "Shripal-ji", value: 0, edited: false, children: [
                  { name: "Kiran", value: 0, edited: false, children: [] },
                  { name: "Charu", value: 0, edited: false, children: [] },
                  { name: "Ajay", value: 0, edited: false, children: [] },
                  ] },
          { name: "Ishwar-ji", value: 0, edited: false, children: [
                  { name: "Dinesh", value: 0, edited: false, children: [] },
                  { name: "Kishore", value: 0, edited: false, children: [] },
                  { name: "Vijay", value: 0, edited: false, children: [] },
                  ] },
          { name: "Vigyanchand-ji", value: 0, edited: false, children: [
                  { name: "Vikas", value: 0, edited: false, children: [] },
                  { name: "Pragati", value: 0, edited: false, children: [] },
                  { name: "Subhash", value: 0, edited: false, children: [] },
                  { name: "Chandrashekhar", value: 0, edited: false, children: [] },
                  ] },
          { name: "Parmeshwar-ji", value: 0, edited: false, children: [
                  { name: "Pradeep", value: 0, edited: false, children: [] },
                  { name: "Sanjay", value: 0, edited: false, children: [] },
                  { name: "Abhijeet", value: 0, edited: false, children: [] },
                  { name: "Ravi", value: 0, edited: false, children: [] },
                  { name: "Mamta", value: 0, edited: false, children: [] },
                  { name: "Kiran", value: 0, edited: false, children: [] },
                  { name: "child7", value: 0, edited: false, children: [] },
                  { name: "child8", value: 0, edited: false, children: [] },
                  { name: "child9", value: 0, edited: false, children: [] },] },
          { name: "Pratapchand-ji", value: 0, edited: false, children: [
                  { name: "Shailendra", value: 0, edited: false, children: [] },
                  { name: "Smita", value: 0, edited: false, children: [] },
                  { name: "Kavita", value: 0, edited: false, children: [] },
                  { name: "Nishith", value: 0, edited: false, children: [] },
                  ] },
          { name: "Jagdish-ji", value: 0, edited: false, children: [
                  { name: "Soumit", value: 0, edited: false, children: [] },
                  { name: "Satyen", value: 0, edited: false, children: [] },
                  ] },
          { name: "Laxmibai-ji", value: 0, edited: false, children: [
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

  const updateParentValue = (parent: Spinner) => {
    const updatedParent = { ...parent, value: parent.children.reduce((sum, child) => sum + child.value, 0) };
    return updatedParent;
  };

  const updateTree = (tree: Spinner[], target: Spinner, updateFn: (spinner: Spinner) => Spinner): Spinner[] => {
    return tree.map((node) => {
      if (node === target) {
        return updateFn(node);
      }
      return { ...node, children: updateTree(node.children, target, updateFn) };
    });
  };

  const handleValueChange = (spinner: Spinner, newValue: number) => {
    setSpinners((prev) =>
      updateTree(prev, spinner, (node) => ({
        ...node,
        value: newValue,
        edited: true,
      }))
    );
  };

  const handleAddChild = (parent: Spinner) => {
    if (parent.children.length < MAX_CHILD_SPINNERS) {
      setSpinners((prev) =>
        updateTree(prev, parent, (node) => ({
          ...node,
          children: [...node.children, { name: `Child ${node.children.length + 1}`, value: 0, edited: false, children: [] }],
        }))
      );
    }
  };

  const handleRemoveChild = (parent: Spinner) => {
    if (parent.children.length > 0) {
      setSpinners((prev) =>
        updateTree(prev, parent, (node) => ({
          ...node,
          children: node.children.slice(0, -1),
        }))
      );
    }
  };

  const handleNameChange = (spinner: Spinner, newName: string) => {
    setSpinners((prev) =>
      updateTree(prev, spinner, (node) => ({
        ...node,
        name: newName,
      }))
    );
  };

  const renderTree = (nodes: Spinner[]) => {
    return nodes.map((node, index) => (
      <div key={index} className="mt-2">
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-success rounded-circle"
            style={{ width: "30px", height: "30px" }}
            onClick={() => handleAddChild(node)}
            disabled={node.children.length >= MAX_CHILD_SPINNERS}
          >
            +
          </button>
          <button
            className="btn btn-danger rounded-circle"
            style={{ width: "30px", height: "30px" }}
            onClick={() => handleRemoveChild(node)}
          >
            -
          </button>
          <input
            type="text"
            value={node.name}
            onChange={(e) => handleNameChange(node, e.target.value)}
            className="form-control"
          />
        </div>
        <CloudSpinner
          name={node.name}
          value={node.value}
          onChange={(newValue) => handleValueChange(node, newValue)}
          edited={node.edited}
          total={node.value}
        />
        <div className="ms-4">{renderTree(node.children)}</div>
      </div>
    ));
  };

  return <div className="container-fluid">{renderTree(spinners)}</div>;
};

export default CloudSpinnerGrid;
