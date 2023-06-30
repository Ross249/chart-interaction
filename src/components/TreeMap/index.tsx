import { Data, GraphProps } from "@/types/data";
import * as d3 from "d3";
import React, { useEffect, useMemo, useRef } from "react";
import styles from "@/styles/treemap.module.css";

const colors = ["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#a53253"];

type Tree = {
  name: string;
  valueY: number;
  children: Data[];
};

const Index = ({ width, height, data }: GraphProps) => {
  const hierarchy = useMemo(() => {
    data.map((d) => (d.valueY = 0));
    let formatData = {
      name: "title",
      valueY: 0,
      children: data,
    };
    return d3.hierarchy(formatData).sum((d) => d.valueY);
  }, [data]);
  const level1 = hierarchy?.children?.map((children) => children.data.name);
  let colorScale = d3
    .scaleOrdinal<string>()
    .domain(level1 || [])
    .range(colors);

  const root = useMemo(() => {
    const generator = d3.treemap<Tree>().size([width, height]).padding(6);
    return generator(hierarchy);
  }, [hierarchy, width, height]);

  const renderTree = root.leaves().map((leaf, i) => {
    const parentName = leaf.parent?.data.name;
    return (
      <g key={leaf.id} className={styles.rectangle}>
        <rect
          x={leaf.x0}
          y={leaf.y0}
          width={leaf.x1 - leaf.x0}
          height={leaf.y1 - leaf.y0}
          stroke="transparent"
          fill={colorScale(parentName as string)}
          className={"opacity-80 hover:opacity-100"}
        />
        <text
          x={leaf.x0 + 3}
          y={leaf.y0 + 3}
          fontSize={12}
          textAnchor="start"
          alignmentBaseline="hanging"
          fill="white"
          className="font-bold"
        >
          {leaf.data.name}
        </text>
        <text
          x={leaf.x0 + 3}
          y={leaf.y0 + 18}
          fontSize={12}
          textAnchor="start"
          alignmentBaseline="hanging"
          fill="white"
          className="font-light"
        >
          {leaf.data.valueY}
        </text>
      </g>
    );
  });

  return (
    <div className="flex flex-col bg-slate-100 justify-center items-center ">
      <p>title</p>
      <svg width={width} height={height} className={styles.container}>
        {renderTree}
      </svg>
    </div>
  );
};

export default Index;
