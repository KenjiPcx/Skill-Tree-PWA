import React from "react";
import { Skill } from "./GraphData";
import KenjiImg from "../assets/kenji.png";

const generateNode = (data: Skill) => {
  const node = {
    id: data.name,
    group: data.group,
    label: data.name,
    title: `Used in ${data.usedFrequency} projects.`,
  };
  if (data.imageURL) {
    return { ...node, image: data.imageURL };
  }
  return node;
};

const generateEdge = (data: Skill, graphData: Skill[]) => {
  return {
    from: data.parent,
    to: data.name,
  };
};

// const getIdByName = (parent: String, graphData: Skill[]) => {
//   if (parent === "Origin") {
//     return "Origin";
//   }
//   const res = graphData.filter((data) => data.name === parent);
//   if (res.length !== 0) {
//     return res[0].id;
//   }
//   return "Orphanage";
// };

const graphDataTransformer = (graphData: any[]) => {
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
  const edges = graphData.map((data) => generateEdge(data, graphData));
  return {
    nodes: [originNode, ...nodes],
    edges: edges,
  };
};

export default graphDataTransformer;
