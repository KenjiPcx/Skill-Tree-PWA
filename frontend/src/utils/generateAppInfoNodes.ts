import graphDataTransformer from "./graphDataTransformer";
import { InfoNode } from "../Types";

const generateAppInfoNodes = () => {
  const appInfoNodes: InfoNode[] = [
    {
      name: "App Info",
      group: "Category Label",
    },
    {
      name: "Made With",
      group: "Subcategory Label",
      parent: "App Info",
    },
    {
      name: "React",
      group: "Image",
      parent: "Made With",
      imageURL: "https://iconape.com/wp-content/files/zk/93042/svg/react.svg",
    },
    {
      name: "Vis.js",
      group: "Image",
      parent: "Made With",
      imageURL:
        "https://www.outsystems.com/Forge_CW/_image.aspx/Q8LvY--6WakOw9afDCuuGcYhsqEUtrNUbKKFBfZwHI4=/visjsnetwork",
    },
    {
      name: "Firebase",
      group: "Image",
      parent: "Made With",
      imageURL: "https://img.icons8.com/color/452/firebase.png",
    },
    {
      name: "Made By",
      group: "Subcategory Label",
      parent: "App Info",
    },
    {
      name: "Version",
      group: "Subcategory Label",
      parent: "App Info",
    },
    {
      name: "v1",
      group: "Stats Node",
      parent: "Version",
    },
    {
      name: "Last Updated",
      group: "Subcategory Label",
      parent: "App Info",
    },
    {
      name: "24/8/2021",
      group: "Stats Label",
      parent: "Last Updated",
    },
    {
      name: "Made On",
      group: "Subcategory Label",
      parent: "App Info",
    },
    {
      name: "23/8/2021",
      group: "Stats Label",
      parent: "Made On",
    },
  ];

  const graph = graphDataTransformer(appInfoNodes, "normal");
  const originEdge = {
    from: "Made By",
    to: "Origin",
    width: 1.5,
    arrowStrikethrough: false,
  };
  graph.edges.push(originEdge);

  return graph;
};

export default generateAppInfoNodes;
