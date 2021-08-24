import React from "react";
import KenjiImg from "../assets/kenji.png";

export type Skill = {
  learning?: boolean;
  id?: string;
  name: string;
  parent?: string;
  group: string;
  usedFrequency?: number;
  imageURL?: string;
  yearStarted?: string;
};

const generateNode = (data: Skill) => {
  const node = {
    id: data.id ? data.id : data.name,
    group: data.group,
    label: data.name,
  };
  if (data.imageURL) {
    if (data.learning) {
      return { ...node, image: data.imageURL, opacity: 0.1 };
    } else {
      return { ...node, image: data.imageURL };
    }
  }
  return node;
};

const generateEdge = (data: Skill) => {
  const edge = {
    from: data.parent,
    to: data.id ? data.id : data.name,
    width: 1.5,
    arrowStrikethrough: false,
  };
  if (data.learning) {
    return {
      ...edge,
      dashes: true,
    };
  }
  return edge;
};

const generateYearEdge = (data: Skill) => {
  if (data.yearStarted) {
    return {
      from: data.yearStarted,
      to: data.name,
      width: 1.5,
      arrowStrikethrough: false,
    };
  }
  return {
    from: data.parent,
    to: data.id ? data.id : data.name,
    width: 1.5,
    arrowStrikethrough: false,
  };
};

const graphDataTransformer = (
  graphData: Skill[],
  mode: "timeline" | "normal"
) => {
  const originNode = {
    id: "Origin",
    label: "Kenji",
    title: "You",
    shape: "circularImage",
    group: "Image",
    size: 35,
    image: KenjiImg,
  };
  const nodes = graphData.map((data) => generateNode(data));
  let edges;
  if (mode === "timeline") {
    edges = graphData.map((data) => generateYearEdge(data));
  } else {
    edges = graphData.map((data) => generateEdge(data));
  }
  return {
    nodes: [originNode, ...nodes],
    edges: edges,
  };
};

export default graphDataTransformer;
