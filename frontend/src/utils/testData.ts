const graphData: any = [
  {
    name: "Kenji",
    group: "Category Label",
    parent: "Origin",
    usageFrequency: 10,
  },
  {
    name: "Languages",
    group: "Category Label",
    parent: "Kenji",
    usageFrequency: 10,
  },
  {
    name: "Game Dev",
    group: "Category Label",
    parent: "Languages",
    usageFrequency: 10,
  },
  {
    name: "Database",
    group: "Subcategory Label",
    parent: "Game Dev",
    usageFrequency: 10,
  },
  {
    name: "Database2",
    group: "Subcategory Label",
    parent: "Game Dev",
    usageFrequency: 10,
  },
  {
    name: "Database3",
    group: "Subcategory Label",
    parent: "Database2",
    usageFrequency: 10,
  },
  {
    name: "Database4",
    group: "Subcategory Label",
    parent: "Database2",
    usageFrequency: 10,
  },
];

export default graphData