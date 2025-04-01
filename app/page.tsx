"use client";

import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "bootstrap/dist/css/bootstrap.min.css";
import TreeNode from "./TreeNode"; // Import TreeNode component

const PartitionTree = () => {
  const [data, setData] = useState({
    value: 12,
    children: [
      { value: 4, children: [{ value: 2 }, { value: 2 }] },
      { value: 4, children: [{ value: 2 }, { value: 2 }] },
      { value: 4, children: [{ value: 2 }, { value: 2 }] }
    ], // Initial data structure with 3 children at level 1
  });

  const svgRef = useRef<SVGSVGElement | null>(null);

  const updateValue = (node: any, newValue: number) => {
    node.value = Math.round(newValue);
    setData({ ...data });
  };

  const addChild = () => {
    if (data.children.length < 3) {
      setData({
        ...data,
        children: [
          ...data.children,
          { value: 2, children: [] }, // Level 1 child node with no further children
        ],
      });
    }
  };

  const addSubNode = (node: any) => {
    if (!node.children) node.children = [];
    if (node.children.length < 2 && node.children.length === 0) {
      // Add only if it has fewer than 2 children and it's at the correct level
      node.children.push({ value: 1 });
      setData({ ...data });
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

  useEffect(() => {
    renderTree();
  }, [data]);

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
          onChange={(e) => updateValue(data, parseFloat(e.target.value))}
        />
      </div>

      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-primary mx-2" onClick={addChild} disabled={data.children.length >= 3}>
          ➕ Add Child
        </button>
        <button className="btn btn-danger mx-2" onClick={removeChild} disabled={data.children.length <= 1}>
          ➖ Remove Child
        </button>
      </div>

      <div className="d-flex mt-4">
        <div className="w-50">
          <TreeNode node={data} updateValue={updateValue} addSubNode={addSubNode} />
        </div>
        <div className="w-50">
          <svg ref={svgRef}></svg>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return <PartitionTree />;
}
