import graphDataTransformer from "./graphDataTransformer";
import filterNodesData, { pushChildrenNodes } from "./filterNodesData";
import { Skill, RelaxedSkill, FieldData } from "../Types";

const generateFieldsStats = (fields: string[], skillsData: Skill[]) => {
  const resNodes: RelaxedSkill[] = [];

  fields.forEach((field) => {
    const skillChildren: RelaxedSkill[] = [];
    pushChildrenNodes(skillsData, field, skillChildren);

    if (skillChildren.length !== 0) {
      const labelNode: RelaxedSkill = {
        id: `${field} Field`,
        name: field,
        group: "Subcategory Label",
        parent: "No Of Skills",
        usedFrequency: skillChildren.length,
      };
      resNodes.push(labelNode);

      const valueNode: RelaxedSkill = {
        id: `${field} No Of Skills`,
        name: ` ${skillChildren.length}`,
        group: "Stats Node",
        parent: `${field} Field`,
        usedFrequency: skillChildren.length,
      };
      resNodes.push(valueNode);
    }
  });

  return resNodes;
};

const generateBestField = (
  fields: string[],
  fieldsData: Map<string, FieldData>
) => {
  const fieldScores = Array.from(fieldsData.values()).map(
    (field) => field.usedFrequency
  );
  let maxKeys: string[] = [];
  let maxVal = Math.max(...Array.from(fieldScores));

  fields.forEach((field) => {
    const val = fieldsData.get(field)?.usedFrequency;
    if (val && val === maxVal) {
      maxKeys.push(field);
    }
  });

  return maxKeys.map((key) => {
    const val = fieldsData.get(key)?.usedFrequency;
    return {
      id: `${key} ${val}`,
      name: key,
      group: "Stats Label",
      parent: "Most Knowledgable Field",
      usedFrequency: val,
    };
  });
};

const getMostUsed = (skillsData: Skill[], category: string) => {
  const children: any[] = [];
  pushChildrenNodes(skillsData, category, children);
  let mostUsed: any[] = [];
  let maxVal = 0;

  // Get Max Val
  children.forEach((child) => {
    if (child.usedFrequency > maxVal) {
      maxVal = child.usedFrequency;
    }
  });

  children.forEach((child) => {
    if (child.usedFrequency === maxVal) {
      mostUsed.push(child.name);
    }
  });

  return mostUsed;
};

const getFavouriteLanguages = (
  fieldsData: Map<string, FieldData>,
  skills: Map<string, Skill>
) => {
  const skillsData = Array.from(skills.values());
  const favLanguages: any[] = getMostUsed(skillsData, "Languages");

  return favLanguages.map((lang) => {
    const skill = skills.get(lang);
    if (skill) {
      return {
        ...skill,
        parent: "Most Used Languages",
      };
    }
    return {
      name: lang,
      group: "Stats Node",
      parent: "Most Used Languages",
      usedFrequency: 0,
    };
  });
};

const generateFavStack = (
  fieldsData: Map<string, FieldData>,
  skills: Map<string, any>
) => {
  const fields = ["Frontend Dev", "Backend Dev"];
  const resNodes: RelaxedSkill[] = [];

  fields.forEach((field) => {
    const fieldData = fieldsData.get(field);
    resNodes.push({
      name: field,
      parent: "Favourite Stack",
      group: "Category Label",
      usedFrequency: fieldData?.usedFrequency,
    });
    fieldData?.favourites.forEach((skill) => {
      const skillData = skills.get(skill);
      if (skillData.imageURL) {
        resNodes.push({
          name: skill,
          parent: field,
          group: "Image",
          imageURL: skillData.imageURL,
          usedFrequency: skillData.usedFrequency,
        });
      }
    });
  });

  return resNodes;
};

const generateStatsNodes = (skills: Map<string, Skill>) => {
  const skillsData = Array.from(skills.values());
  const fieldsData = new Map();
  const fields = [
    "Frontend Dev",
    "Backend Dev",
    "Blockchain Dev",
    "Game Dev",
    "Artificial Intelligence",
  ];

  fields.forEach((field) => {
    const fieldChildren = filterNodesData(skillsData, field);
    let usedFrequency = 0;
    const favourites = getMostUsed(skillsData, field);
    fieldChildren.forEach((item) => (usedFrequency += item.usedFrequency));
    fieldsData.set(field, {
      usedFrequency,
      favourites,
    });
  });

  const nodes: RelaxedSkill[] = [
    // No Of Skills
    {
      name: "No Of Skills",
      parent: "Origin",
      group: "Category Label",
      usedFrequency: 1,
    },
    ...generateFieldsStats(fields, skillsData),

    // Most Knowledgable Field
    {
      name: "Most Knowledgable Field",
      parent: "Origin",
      group: "Category Label",
      usedFrequency: 1,
    },
    ...generateBestField(fields, fieldsData),

    // Most Used Language
    {
      name: "Most Used Languages",
      parent: "Origin",
      group: "Category Label",
      usedFrequency: 10,
    },
    ...getFavouriteLanguages(fieldsData, skills),

    // Favourite Stack
    {
      name: "Favourite Stack",
      parent: "Origin",
      group: "Category Label",
      usedFrequency: 1,
    },
    ...generateFavStack(fieldsData, skills),
  ];

  return graphDataTransformer(nodes, "normal");
};

export default generateStatsNodes;
