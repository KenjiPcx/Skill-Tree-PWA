import React from "react";

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
    case usedFrequency < 3 * mult:
      return {
        color: "#ce93d8",
        level: "NOOB",
        rating: 0,
        msg: `is embarassing.
                You are a `,
        starting: 0,
        nextLvlReq: 3,
      };
    case usedFrequency < 5 * mult:
      return {
        color: "#90caf9",
        level: "NOOB",
        rating: 1,
        msg: `has reached a bare minimum level.
                You are still a `,
        starting: 3,
        nextLvlReq: 5,
      };
    case usedFrequency < 10 * mult:
      return {
        color: "#29b6f6",
        level: "DECENT",
        rating: 2,
        msg: `is finally decent.
                You seem to be `,
        starting: 5,
        nextLvlReq: 10,
      };
    case usedFrequency < 15 * mult:
      return {
        color: "#66bb6a",
        level: "ELITE",
        rating: 3,
        msg: `is high.
                You are now an `,
        starting: 10,
        nextLvlReq: 15,
      };
    case usedFrequency < 25 * mult:
      return {
        color: "#f44336",
        level: "EXPERT",
        rating: 4,
        msg: `is spectacular.
                You are now an `,
        starting: 15,
        nextLvlReq: 25,
      };
    case usedFrequency >= 25 * mult:
      return {
        color: "#ffa726",
        level: "GOD",
        rating: 5,
        msg: `has transcended the system.
                You are now a `,
        starting: 25,
        nextLvlReq: 25,
      };
    default:
      return {
        color: "#ce93d8",
        level: "UNKNOWN",
        rating: 0,
        msg: `is ??????????.
                You ?????? `,
        starting: 0,
        nextLvlReq: 1,
      };
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
