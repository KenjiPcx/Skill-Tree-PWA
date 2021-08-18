import React, { useMemo } from "react";
import Graph, { graphEvents } from "react-graph-vis";
import graphData from "./GraphData";
import GraphDataTransformer from "./GraphDataTransformer";

function GraphCanvas() {
  const graph = GraphDataTransformer(graphData);

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#000000",
    },
    groups: {
      "Category Label": {
        shape: "box",
        shapeProperties: {
          borderRadius: 15,
        },
        size: 6,
        color: {
          background: "#7C2FEB",
          border: "#3c3c3c",
          highlight: {
            background: "#7F39FB",
            border: "#3c3c3c",
          },
        },
        font: {
          color: "#ffffff",
        },
        borderWidth: 0,
        borderWidthSelected: 2,
        margin: {
          top: 5,
          bottom: 5,
          left: 10,
          right: 10,
        },
      },
      "Subcategory Label": {
        shape: "box",
        shapeProperties: {
          borderRadius: 15,
        },
        size: 6,
        color: {
          background: "#BB86FC",
          border: "#3c3c3c",
          highlight: {
            background: "#BB86FC",
            border: "#3c3c3c",
          },
        },
        font: {
          color: "#ffffff",
        },
        borderWidth: 0,
        borderWidthSelected: 2,
        margin: {
          top: 5,
          bottom: 5,
          left: 10,
          right: 10,
        },
      },
      Image: {
        shape: "circularImage",
        brokenImage: "https://bitsofco.de/content/images/2018/12/broken-1.png",
        image: "https://bitsofco.de/content/images/2018/12/broken-1.png",
        color: {
          background: "#FFFFFF",
        },
        borderWidth: 2,
      },
    },
  };

  const events: graphEvents = {
    select: function (event: any) {
      var { nodes, edges } = event;
      console.log(event);
    },
  };

  const displayGraph = useMemo(() => {
    return (
      <Graph
        key={Math.random()}
        graph={graph}
        options={options}
        events={events}
      />
    );
  }, [graph]);

  return <div className="test">{displayGraph}</div>;
}

export default GraphCanvas;
