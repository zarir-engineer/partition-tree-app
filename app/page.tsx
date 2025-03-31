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
    node.value = newValue;
    setData({ ...data });
  };

  const updateRootValue = (newValue: number) => {
    setData({ ...data, value: newValue });
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

  const updateNode = (children: any[], target: any, newChildren: any[]) => {
    return children.map((child) => {
      if (child === target) return { ...child, children: newChildren };
      if (child.children) return { ...child, children: updateNode(child.children, target, newChildren) };
      return child;
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
      .attr("
