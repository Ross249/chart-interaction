"use client";
import React, { useState } from "react";
import * as d3 from "d3";
import { Data, GraphProps } from "@/types/data";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { MAX_X, MAX_Y, MIN_X, MIN_Y } from "@/lib/consts";
import { InteractionData, Tooltip } from "./Tooltip";
import styles from "../../styles/scatterplot.module.css";

const MARGIN = { top: 30, right: 50, bottom: 50, left: 50 };

const Scatterplot = ({ width, height, data }: GraphProps) => {
  // Layout. The div size is set by the given props.
  // The bounds (=area inside the axis) is calculated by substracting the margins
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const [hovered, setHovered] = useState<InteractionData | null>(null);

  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  // Scales 1, 13, 10, 10000
  const yScale = d3
    .scaleLinear()
    .domain([MIN_Y, MAX_Y])
    .range([boundsHeight, 0]);
  const xScale = d3
    .scaleLinear()
    .domain([MIN_X, MAX_X])
    .range([0, boundsWidth]);

  const frame = data.flatMap((ca, i) => ca.children) as Data[];
  console.log(frame);

  const allGroups = data.map((d) => String(d.id));
  console.log(allGroups);

  const colorScale = d3
    .scaleOrdinal<string>()
    .domain(allGroups)
    .range(["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#a53253"]);

  // Build the shapes
  const allShapes = frame.map((ca, i) => {
    console.log(hoveredGroup);

    const className =
      hoveredGroup && String(ca?.belong_group_id) !== hoveredGroup
        ? styles.scatterplotCircle + " " + styles.dimmed
        : styles.scatterplotCircle;
    return (
      <circle
        key={ca?.id}
        r={8}
        cx={xScale(!!ca.valueX ? ca.valueX : 0)}
        cy={yScale(!!ca.valueY ? ca.valueY : 0)}
        className={className}
        stroke={colorScale(String(ca?.belong_group_id))}
        fill={colorScale(String(ca?.belong_group_id))}
        fillOpacity={0.7}
        onMouseEnter={(e) =>
          setHovered({
            xPos: e.pageX,
            yPos: e.pageY,
            name: ca?.name,
          })
        }
        onMouseOver={() => setHoveredGroup(String(ca?.belong_group_id))}
        onMouseLeave={() => {
          setHovered(null);
          setHoveredGroup(null);
        }}
      />
    );
  });
  return (
    <div className="flex flex-col bg-slate-100 justify-center items-center relative">
      <p>title</p>
      <svg width={width} height={height}>
        {/* first group is for the violin and box shapes */}
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {/* Y axis */}
          <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} />

          {/* X axis, use an additional translation to appear at the bottom */}
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={40}
              height={boundsHeight}
            />
          </g>

          {/* Circles */}
          {allShapes}
        </g>
      </svg>
      {/* Tooltip */}
      <Tooltip interactionData={hovered} />
    </div>
  );
};

export default Scatterplot;
