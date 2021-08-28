import React, { useMemo, useRef, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Graph from "react-graph-vis";
import { Theme } from "@material-ui/core/styles";

interface GraphCanvasProps {
  theme: Theme;
  graph: any;
  network: any;
  focusedNode: string;
  setNetwork: React.Dispatch<any>;
  setSelectedNode: React.Dispatch<any>;
  setShowSpeedDial: React.Dispatch<any>;
}

function GraphCanvas({
  theme,
  graph,
  network,
  focusedNode,
  setNetwork,
  setSelectedNode,
  setShowSpeedDial,
}: GraphCanvasProps) {
  const graphRef = useRef(null);

  const options = useMemo(() => {
    return {
      layout: {
        hierarchical: false,
      },
      edges: {
        color: theme.palette.text.primary,
      },
      groups: {
        "Category Label": {
          shape: "box",
          shapeProperties: {
            borderRadius: 15,
          },
          size: 6,
          color: {
            background: theme.palette.primary.main,
            border: "#3c3c3c",
            highlight: {
              background: "#7F39FB",
              border: "#3c3c3c",
            },
          },
          font: {
            color: "#FFFFFF",
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
            background: "#985EFF",
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
          brokenImage:
            "https://bitsofco.de/content/images/2018/12/broken-1.png",
          image: "https://bitsofco.de/content/images/2018/12/broken-1.png",
          color: {
            background: "#FFFFFF",
          },
          font: {
            color: theme.palette.text.primary,
          },
          borderWidth: 2,
        },
        "Stats Node": {
          shape: "circle",
          color: {
            background: "#30009C",
            border: "#3c3c3c",
            highlight: {
              background: "#5600E8",
              border: "#3c3c3c",
            },
          },
          font: {
            color: "#ffffff",
          },
          borderWidth: 0,
          borderWidthSelected: 2,
        },
        "Stats Label": {
          shape: "box",
          shapeProperties: {
            borderRadius: 15,
          },
          color: {
            background: "#30009C",
            border: "#3c3c3c",
            highlight: {
              background: "#5600E8",
              border: "#3c3c3c",
            },
          },
          font: {
            color: "#ffffff",
          },
          borderWidth: 0,
          borderWidthSelected: 2,
          margin: {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          },
        },
      },
    };
  }, [theme]);

  const events = {
    selectNode: function (event: any) {
      const { nodes, edges } = event;
      setSelectedNode(nodes[0]);
      setShowSpeedDial(true)
    },
    deselectNode: function (event: any) {
      const { nodes, edges } = event;
      setSelectedNode("");
      setShowSpeedDial(false);
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
  }, [graph, options]);

  useEffect(() => {
    if (network) {
      network.fit({
        nodes: [focusedNode],
        minZoomLevel: 0.5,
        maxZoomLevel: 1,
        animation: true,
      });
      setTimeout(() => {
        network.fit({
          nodes: [focusedNode],
          minZoomLevel: 1,
          animation: true,
        });
      }, 1500);
    }
  }, [network]);

  return (
    <div
      className="graphContainer"
      style={{ backgroundColor: theme.palette.action.hover }}
    >
      {displayGraph}
    </div>
  );
}

export default GraphCanvas;
