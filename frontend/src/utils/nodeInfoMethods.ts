import { NodeInfo } from "../Types";

export const calcUserStats = (skillsData: Map<string, any>) => {
  const skills = Array.from(skillsData.values());
  const filteredSkills = skills.filter(
    (skill) => skill.group === "Image" && !skill.learning
  );
  let sum = 0;
  filteredSkills.forEach((skill) => (sum += skill.usedFrequency));

  return {
    totalUsedFreq: sum,
    avgUsedFreq: sum / filteredSkills.length,
  };
};

export const generateNodeInfo = (usedFrequency: number, mult: number) => {
  switch (true) {
    case usedFrequency === 0:
      return {
        color: "#e3f2fd",
        colorType: "info",
        level: "PREPARING",
        rating: 0,
        msg: `is non existant. Go start learning!
                You are `,
        msg2: " to learn this.",
        starting: 0,
        nextLvlReq: 3,
      } as NodeInfo;
    case usedFrequency < 3 * mult:
      return {
        color: "#ce93d8",
        colorType: "primary",
        level: "NOOB",
        rating: 0,
        msg: `is embarassing.
                You are a `,
        msg2: " at this.",
        starting: 0,
        nextLvlReq: 3,
      } as NodeInfo;
    case usedFrequency < 5 * mult:
      return {
        color: "#90caf9",
        colorType: "info",
        level: "NOOB",
        rating: 1,
        msg: `has reached a bare minimum level.
                You are still a `,
        msg2: " at this.",
        starting: 3,
        nextLvlReq: 5,
      } as NodeInfo;
    case usedFrequency < 10 * mult:
      return {
        color: "#29b6f6",
        colorType: "info",
        level: "DECENT",
        rating: 2,
        msg: `is finally decent.
                You seem to be `,
        msg2: " at this.",
        starting: 5,
        nextLvlReq: 10,
      } as NodeInfo;
    case usedFrequency < 15 * mult:
      return {
        color: "#66bb6a",
        colorType: "success",
        level: "ELITE",
        rating: 3,
        msg: `is high.
                You are now an `,
        msg2: " at this.",
        starting: 10,
        nextLvlReq: 15,
      } as NodeInfo;
    case usedFrequency < 25 * mult:
      return {
        color: "#f44336",
        colorType: "error",
        level: "EXPERT",
        rating: 4,
        msg: `is spectacular.
                You are now an `,
        msg2: " at this.",
        starting: 15,
        nextLvlReq: 25,
      } as NodeInfo;
    case usedFrequency >= 25 * mult:
      return {
        color: "#ffa726",
        colorType: "warning",
        level: "GOD",
        rating: 5,
        msg: `has transcended the system.
                You are now a `,
        msg2: " at this.",
        starting: 25,
        nextLvlReq: 25,
      } as NodeInfo;
    default:
      return {
        color: "#ce93d8",
        colorType: "primary",
        level: "UNKNOWN",
        rating: 0,
        msg: `is ??????????.
                You ?????? `,
        starting: 0,
        nextLvlReq: 1,
      } as NodeInfo;
  }
};

export const getMult = (group: string) => {
  if (group === "Category Label") {
    return 4;
  }
  if (group === "Subcategory Label") {
    return 2;
  }
  return 1;
};
