import React, { useMemo } from "react";
import Graph, { graphEvents } from "react-graph-vis";

function GraphCanvas() {
  const graph = {
    nodes: [
      { id: 1, label: "Node 1", title: "node 1 tootip text" },
      { id: 2, label: "Node 2", title: "node 2 tootip text" },
      { id: 3, label: "Node 3", title: "node 3 tootip text" },
      { id: 4, label: "Node 4", title: "node 4 tootip text" },
      { id: 5, label: "Node 5", title: "node 5 tootip text" },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ],
  };

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#000000",
    },
  };

  const events: graphEvents = {
    select: function (event: any) {
      var { nodes, edges } = event;
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

  return (
    <div className="test">
      <Graph
        key={Math.random()}
        graph={graph}
        options={options}
        events={events}
      />
    </div>
  );
}

export default GraphCanvas;
