"use client";

import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "bootstrap/dist/css/bootstrap.min.css";

const PartitionTree = () => {
  const [data, setData] = useState({
    value: 12,
    children: [{ value: 4 }, { value: 4 }, { value: 4 }],
  });

  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    renderTree();
  }, [data]);

  const updateValue = (node: any, newValue: number) => {
    node.value = Math.round(newValue);
    setData({ ...data });
  };

  const updateRootValue = (newValue: number) => {
    setData({ ...data, value: Math.round(newValue) });
  };

  const addChild = () => {
    if (data.children.length < 8) {
      setData({
        ...data,
        children: [...data.children, { value: 2 }],
      });
    }
  };

  const removeChild = () => {
    if (data.children.length > 1) {
      setData({
        ...data,
        children: data.children.slice(0, -1),
      });
    }
  };

  const addSubNode = (node: any) => {
    if (!node.children) node.children = [];
    if (node.children.length < 4) {
      const newNode = { value: 1 };
      setData((prevData) => ({
        ...prevData,
        children: updateNode(prevData.children, node, [...node.children, newNode]),
      }));
    }
  };

  const removeSubNode = (node: any) => {
    if (node.children && node.children.length > 0) {
      setData((prevData) => ({
        ...prevData,
        children: updateNode(prevData.children, node, node.children.slice(0, -1)),
      }));
    }
  };

  const updateNode = (children: any[], target: any, newChildren: any[]): any[] => {
    return children.map((child) => {
      if (child === target) return { ...child, children: newChildren };
      if (child.children) return { ...child, children: updateNode(child.children, target, newChildren) };
      return child; // Ensure every child is returned
    });
  };

  const renderTree = () => {
    if (!svgRef.current) return;
    const width = 600, height = 400;
    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    const hierarchy = d3.hierarchy(data, (d: any) => d.children);
    const treeLayout = d3.tree<any>().size([width - 100, height - 100]);
    treeLayout(hierarchy);

    svg.selectAll(".link")
      .data(hierarchy.links())
      .enter()
      .append("line")
      .attr("x1", (d) => (d.source?.x ?? 0) + 50)
      .attr("y1", (d) => (d.source?.y ?? 0) + 50)
      .attr("x2", (d) => (d.target?.x ?? 0) + 50)
      .attr("y2", (d) => (d.target?.y ?? 0) + 50)
      .attr("stroke", "#999");

    const nodes = svg.selectAll(".node")
      .data(hierarchy.descendants())
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${(d.x ?? 0) + 50}, ${(d.y ?? 0) + 50})`);

    nodes.append("circle")
      .attr("r", 20)
      .attr("fill", "steelblue");

    nodes.append("text")
      .attr("dy", 4)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text((d) => Math.round(d.data.value));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold" style={{ fontFamily: "Georgia, serif" }}>
        Interactive Partition Tree
      </h2>

      <div className="d-flex justify-content-start align-items-center mt-3">
        <strong className="me-2">Root Value:</strong>
        <input
          type="number"
          className="form-control w-25"
          value={Math.round(data.value)}
          onChange={(e) => updateRootValue(parseFloat(e.target.value))}
        />
      </div>

      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-primary mx-2" onClick={addChild} disabled={data.children.length >= 8}>
          ➕ Add Child
        </button>
        <button className="btn btn-danger mx-2" onClick={removeChild} disabled={data.children.length <= 1}>
          ➖ Remove Child
        </button>
      </div>

      <TreeNode node={data} updateValue={updateValue} addSubNode={addSubNode} removeSubNode={removeSubNode} />
      <svg ref={svgRef} className="mt-4"></svg>
    </div>
  );
};

const TreeNode = ({ node, updateValue, addSubNode, removeSubNode }: any) => {
  return (
    <div style={{ marginLeft: "20px", borderLeft: "1px solid #ccc", paddingLeft: "10px" }}>
      <input
        type="number"
        className="form-control d-inline w-25"
        value={Math.round(node.value)}
        onChange={(e) => updateValue(node, parseFloat(e.target.value))}
        step="1"
      />
      {node !== node.children && (
        <div className="mt-2">
          <button className="btn btn-success mx-1" onClick={() => addSubNode(node)} disabled={node.children && node.children.length >= 4}>
            ➕ Add Sub-Node
          </button>
          <button className="btn btn-warning mx-1" onClick={() => removeSubNode(node)} disabled={!node.children || node.children.length === 0}>
            ➖ Remove Sub-Node
          </button>
          {node.children?.map((child: any, index: number) => (
            <TreeNode key={index} node={child} updateValue={updateValue} addSubNode={addSubNode} removeSubNode={removeSubNode} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Page() {
  return <PartitionTree />;
}
