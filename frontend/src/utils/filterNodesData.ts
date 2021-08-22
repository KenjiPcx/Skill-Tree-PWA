import graphData from "./testData";

const pushChildrenNodes = (nodes: any[], search: string, returnArr: any[]) => {
  let nodesData = nodes;
  const res = nodesData.filter(
    (data) => data.parent.toLowerCase() === search.toLowerCase()
  );
  if (res.length === 0) {
    return;
  } else {
    res.forEach((data) => {
      returnArr.push(data);
      nodesData = nodesData.filter((node) => !res.includes(node));
      pushChildrenNodes(nodesData, data.name, returnArr);
    });
  }
};

const filterNodesData = (nodes: any[], search: string) => {
  const returnArr = [];
  const rootNode = nodes.filter(
    (node) => node.name.toLowerCase() === search.toLowerCase()
  );
  returnArr.push(rootNode[0]);
  pushChildrenNodes(nodes, search, returnArr);

  return returnArr;
};

console.log("final", filterNodesData(graphData, "Game Dev"));

export default filterNodesData;
