import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const Graph = ({ data }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const width = 1600;
    const height = 800;

    const svg = d3
      .select(containerRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const links = data.map((d) => ({ source: d["1"], target: d["2"] }));

    const nodes = Array.from(
      new Set(links.flatMap((d) => [d.source, d.target])),
      (id) => ({ id })
    );

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(80)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 8)
      .attr("fill", "#000");

    node.append("title").text((d) => d.id);

    const label = svg
      .append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d) => d.id)
      .attr("font-size", 12)
      .attr("dx", 12)
      .attr("dy", 4);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      label.attr("x", (d) => d.x).attr("y", (d) => d.y);
    });

    return () => svg.remove();
  }, [data]);

  return <div ref={containerRef}></div>;
};

export default Graph;
