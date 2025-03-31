"use client";

import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

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
    const total = data.value;
    const diff = newValue - node.value;
    const remainingNodes = data.children.filter((child) => child !== node);
    const remainingTotal = remainingNodes.reduce((sum, n) => sum + n.value, 0);

    if (remainingTotal - diff > 0) {
      node.value = newValue;
      const scaleFactor = (total - newValue) / remainingTotal;
      remainingNodes.forEach((n) => (n.value *= scaleFactor));
      setData({ ...data });
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
      .text((d) => d.data.value.toFixed(2));
  };

  return (
    <div>
      <h2>Interactive Partition Tree</h2>
      <TreeNode node={data} updateValue={updateValue} />
      <svg ref={svgRef}></svg>
    </div>
  );
};

const TreeNode = ({ node, updateValue }: any) => {
  return (
    <div style={{ marginLeft: "20px" }}>
      <input
        type="number"
        value={node.value.toFixed(2)}
        onChange={(e) => updateValue(node, parseFloat(e.target.value))}
        step="0.1"
      />
      {node.children && (
        <div>
          {node.children.map((child: any, index: number) => (
            <TreeNode key={index} node={child} updateValue={updateValue} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Page() {
  return <PartitionTree />;
}
