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

const generateEdge = (data: Skill, graphData: Skill[]) => {
  return {
    from: getIdByName(data.parent, graphData),
    // from : data.parent,
    to: data.id,
  };
};

const getIdByName = (parent: String, graphData: Skill[]) => {
  if (parent === "Kenji") {
    return "Kenji";
  }
  const res = graphData.filter((data) => data.name === parent);
  if (res.length !== 0) {
    return res[0].id;
  }
  return "Orphanage";
};

const GraphDataTransformer = (graphData: any[]) => {
  const originNode = {
    id: "Kenji",
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

export default GraphDataTransformer;
