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

const graphDataTransformer = (graphData: Skill[]) => {
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
  const edges = graphData.map((data) => generateEdge(data));
  return {
    nodes: [originNode, ...nodes],
    edges: edges,
  };
};

export default graphDataTransformer;
