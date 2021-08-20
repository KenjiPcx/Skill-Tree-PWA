import React, { useMemo, useRef, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Graph from "react-graph-vis";

interface GraphCanvasProps {
  graph: any;
  network: any;
  setNetwork: React.Dispatch<any>;
  setSelectedNode: React.Dispatch<any>;
}

function GraphCanvas({
  graph,
  network,
  setNetwork,
  setSelectedNode,
}: GraphCanvasProps) {
  const graphRef = useRef(null);

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

  const events: any = {
    select: function (event: any) {
      var { nodes, edges } = event;
      setSelectedNode(nodes[0]);
    },
  };

  const displayGraph = useMemo(() => {
    if (graph) {
      return (
        <Graph
          ref={graphRef}
          key={Math.random()}
          graph={graph}
          options={options}
          events={events}
          getNetwork={(network) => setNetwork(network)}
        />
      );
    }
    return <CircularProgress />;
  }, [graph]);

  useEffect(() => {
    if (network) {
      network.fit({
        nodes: ["Origin"],
        minZoomLevel: 0.5,
        maxZoomLevel: 1,
        animation: true,
      });
      // if (nodeCtr === 0) {
      //   setNodeCtr(graphData.length);
      // } else {
      setTimeout(() => {
        network.fit({
          nodes: ["Origin"],
          minZoomLevel: 1,
          animation: true,
        });
      }, 1500);
      // }
    }
  }, [network]);

  return <div className="graphContainer">{displayGraph}</div>;
}

export default GraphCanvas;
