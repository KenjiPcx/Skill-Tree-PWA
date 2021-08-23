import React from "react";
import KenjiImg from "../assets/kenji.png";

export type Skill = {
  id?: string;
  name: string;
  parent: string;
  group: string;
  usedFrequency?: number;
  imageURL?: string;
};

const generateNode = (data: Skill) => {
  const node = {
    id: data.id ? data.id : data.name,
    group: data.group,
    label: data.name,
    title: `Used in ${data.usedFrequency} projects.`,
  };
  if (data.imageURL) {
    return { ...node, image: data.imageURL };
  }
  return node;
};

const generateEdge = (data: Skill) => {
  return {
    from: data.parent,
    to: data.id ? data.id : data.name,
  };
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
