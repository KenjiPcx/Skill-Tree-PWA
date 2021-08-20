import React, { useMemo, useState, useRef, useEffect } from "react";
import db from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import CircularProgress from "@material-ui/core/CircularProgress";
import Graph from "react-graph-vis";
import graphData from "./GraphData";
import GraphDataTransformer from "./GraphDataTransformer";

function GraphCanvas() {
  const isMounted = useRef<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const graphRef = useRef(null);
  const [network, setNetwork] = useState<any | null>(null);
  const [graph, setGraph] = useState<any | null>(null);
  const [nodeCtr, setNodeCtr] = useState(0);

  useEffect(() => {
    console.log("rendered")
    isMounted.current = true;
    const unsub = onSnapshot(collection(db, "nodes"), (querySnapshot) => {
      const skills: any[] = [];
      querySnapshot.forEach((doc) => {
        skills.push({ id: doc.id, ...doc.data() });
      });
      if (isMounted) setGraph(GraphDataTransformer(skills));
      console.log("redrew");
    });
    if (isMounted) setLoading(false);

    return () => {
      unsub();
      isMounted.current = false;
    };
  }, []);

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
      console.log(graph)
    },
  };

  // useEffect(() => {
  //   console.log(graph);
  //   network?.redraw();
  // }, [graph]);

  const displayGraph = useMemo(() => {
    if (!loading) {
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
        nodes: ["Kenji"],
        minZoomLevel: 0.5,
        maxZoomLevel: 1,
        animation: true,
      });
      if (nodeCtr === 0) {
        setNodeCtr(graphData.length);
      } else {
        setTimeout(() => {
          network.fit({
            nodes: ["Kenji"],
            minZoomLevel: 1,
            animation: true,
          });
        }, 1500);
      }
    }
  }, [network]);

  return <div className="graphContainer">{displayGraph}</div>;
}

export default GraphCanvas;
