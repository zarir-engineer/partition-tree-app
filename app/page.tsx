// page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "bootstrap/dist/css/bootstrap.min.css";
import TreeNode from "./TreeNode"; // Import TreeNode component

const PartitionTree = () => {
  const [data, setData] = useState({
    value: 12,
    children: [{ value: 4 }, { value: 4 }, { value: 4 }],
  });

  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    renderTree();
  }, [data]);

  // Your existing methods for tree rendering and state updates

  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold" style={{ fontFamily: "Georgia, serif" }}>
        Interactive Partition Tree
      </h2>

      {/* Your root value input and buttons for adding/removing nodes */}
      <svg ref={svgRef} className="mt-4"></svg>
    </div>
  );
};

export default function Page() {
  return <PartitionTree />;
}
