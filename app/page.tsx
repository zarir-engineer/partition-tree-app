import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const TreeComponent = () => {
  // State to manage the root data for the tree
  const [data, setData] = useState<any>({
    value: 66.67, // Root node value
    children: Array(8).fill({ value: 1 / 8, children: [] }), // 8 child nodes with initial value 1/8
  });

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Function to render the tree
  const renderTree = () => {
    if (!svgRef.current) return;
    const width = 600, height = 400;
    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    const hierarchy = d3.hierarchy(data, (d: any) => d.children);
    const treeLayout = d3.tree<any>().size([width - 100, height - 100]);
    treeLayout(hierarchy);

    // Draw links between nodes
    svg.selectAll(".link")
      .data(hierarchy.links())
      .enter()
      .append("line")
      .attr("x1", (d) => (d.source?.x ?? 0) + 50)
      .attr("y1", (d) => (d.source?.y ?? 0) + 50)
      .attr("x2", (d) => (d.target?.x ?? 0) + 50)
      .attr("y2", (d) => (d.target?.y ?? 0) + 50)
      .attr("stroke", "#999");

    // Draw nodes as circles
    const nodes = svg.selectAll(".node")
      .data(hierarchy.descendants())
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${(d.x ?? 0) + 50}, ${(d.y ?? 0) + 50})`);

    // Add circles for nodes (spheres)
    nodes.append("circle")
      .attr("r", 20)
      .attr("fill", "steelblue");

    // Add the value text inside the circles
    nodes.append("text")
      .attr("dy", 4)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text((d) => Math.round(d.data.value));

    // Add "+" and "-" buttons for adding and removing subnodes
    nodes.each(function (d) {
      const nodeGroup = d3.select(this);

      // "+" Button to add a node (Positioned top-left)
      nodeGroup.append("text")
        .attr("x", -30) // Positioning "+" button to the left of the node (top-left)
        .attr("dy", -25) // Above the node (top)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("cursor", "pointer")
        .text("+")
        .on("click", () => addSubNode(d)); // Assuming addSubNode function is defined elsewhere

      // "-" Button to remove a node (Positioned top-right, only for non-root nodes)
      if (d.depth > 0) {
        nodeGroup.append("text")
          .attr("x", 30) // Positioning "-" button to the right of the node (top-right)
          .attr("dy", -25) // Above the node (top)
          .attr("text-anchor", "middle")
          .attr("font-size", "16px")
          .attr("cursor", "pointer")
          .text("-")
          .on("click", () => removeNode(d)); // Assuming removeNode function is defined elsewhere
      }
    });

    // Additional styling for nodes, e.g., adding a border to make them look like spheres
    nodes.select("circle")
      .style("stroke", "#000")
      .style("stroke-width", 2);
  };

  // Add a new sub-node to the tree
  const addSubNode = (node: any) => {
    const newNode = { value: 0, children: [] }; // Example of a new node
    node.children.push(newNode);
    setData({ ...data }); // Trigger a re-render of the tree by updating the state
  };

  // Remove a node from the tree
  const removeNode = (node: any) => {
    if (node.parent) {
      const parentNode = node.parent;
      parentNode.children = parentNode.children.filter((child: any) => child !== node);
      setData({ ...data }); // Trigger a re-render of the tree by updating the state
    }
  };

  // Call renderTree after the data or component has been mounted
  useEffect(() => {
    renderTree();
  }, [data]); // Run renderTree whenever the data changes

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default TreeComponent;
