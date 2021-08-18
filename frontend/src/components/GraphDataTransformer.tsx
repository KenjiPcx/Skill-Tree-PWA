import React from "react";
import { Skill } from "./GraphData";
import KenjiImg from "../assets/kenji.png";

const generateNode = (data: Skill) => {
  const node = {
    id: data.id,
    group: data.group,
    label: data.name,
    title: `Used in ${data.usageFrequency} projects.`,
  };
  if (data.imageURL) {
    return { ...node, image: data.imageURL };
  }
  return node;
};

const generateEdge = (data: Skill) => {
  return {
    from: data.parentId,
    to: data.id,
  };
};

const GraphDataTransformer = (graphData: any[]) => {
  const originNode = {
    id: 0,
    label: "Kenji",
    title: "You",
    group: "Image",
    size: 35,
    image: KenjiImg,
  };
  const nodes = graphData.map((data) => generateNode(data));
  return {
    nodes: [originNode, ...nodes],
    edges: graphData.map((data) => generateEdge(data)),
  };
};

export default GraphDataTransformer;
