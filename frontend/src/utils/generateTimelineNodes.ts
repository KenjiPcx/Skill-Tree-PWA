import { Skill } from "./graphDataTransformer";

const generateTimelineNodes = (skillsMap: Map<string, Skill>) => {
  const skillsArr = Array.from(skillsMap.values());
  const skills = skillsArr.filter((skill) => skill.group === "Image");

  const nodes: Skill[] = [
    {
      name: "2019",
      group: "Category Label",
      parent: "Origin",
    },
    {
      name: "2020",
      group: "Category Label",
      parent: "Origin",
    },
    {
      name: "2021",
      group: "Category Label",
      parent: "Origin",
    },
    {
      name: "2022",
      group: "Category Label",
      parent: "Origin",
    },
    ...skills,
  ];

  return nodes;
};

export default generateTimelineNodes;
