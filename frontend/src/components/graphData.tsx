import React from "react";

export type Skill = {
  id: string;
  name: string;
  parent: string;
  group: string;
  usedFrequency: number;
  imageURL?: string;
  level?: number;
};

const graphData: any[] = [
  {
    id: "Frontend Dev",
    name: "Frontend Dev",
    group: "Category Label",
    parent: "Kenji",
    usedFrequency: 10,
  },
  {
    id: "Backend Dev",
    name: "Backend Dev",
    group: "Category Label",
    parent: "Kenji",
    usedFrequency: 10,
  },
  {
    id: "Artificial \nIntelligence",
    name: "Artificial \nIntelligence",
    group: "Category Label",
    parent: "Kenji",
    usedFrequency: 10,
  },
  {
    id: "Languages",
    name: "Languages",
    group: "Category Label",
    parent: "Kenji",
    usedFrequency: 10,
  },
  {
    id: "Web Dev",
    name: "Web Dev",
    group: "Subcategory Label",
    parent: "Frontend Dev",
    usedFrequency: 10,
  },
];

// const graphData: Skill[] = [
//   {
//     id: 1,
//     name: "Frontend Dev",
//     group: "Category Label",
//     parent: 0,
//     usedFrequency: 10,
//   },
//   {
//     id: 2,
//     name: "Backend Dev",
//     group: "Category Label",
//     parent: 0,
//     usedFrequency: 10,
//   },
//   {
//     id: 3,
//     name: "Artificial \nIntelligence",
//     group: "Category Label",
//     parent: 0,
//     usedFrequency: 10,
//   },
//   {
//     id: 4,
//     name: "Languages",
//     group: "Category Label",
//     parent: 0,
//     usedFrequency: 10,
//   },
//   {
//     id: 5,
//     name: "Web Dev",
//     group: "Subcategory Label",
//     parent: 1,
//     usedFrequency: 10,
//   },
//   {
//     id: 6,
//     name: "Mobile Dev",
//     group: "Subcategory Label",
//     parent: 1,
//     usedFrequency: 10,
//   },
//   {
//     id: 7,
//     name: "Software Dev",
//     group: "Subcategory Label",
//     parent: 1,
//     usedFrequency: 10,
//   },
//   {
//     id: 8,
//     name: "Game Dev",
//     group: "Category Label",
//     parent: 0,
//     usedFrequency: 10,
//   },
//   {
//     id: 9,
//     name: "Database \nSystem",
//     group: "Subcategory Label",
//     parent: 2,
//     usedFrequency: 10,
//   },
//   {
//     id: 10,
//     name: "Server",
//     group: "Subcategory Label",
//     parent: 2,
//     usedFrequency: 10,
//   },
//   {
//     id: 11,
//     name: "Python",
//     group: "Image",
//     imageURL: "https://image.pngaaa.com/138/619138-middle.png",
//     parent: 4,
//     usedFrequency: 10,
//   },
//   {
//     id: 12,
//     name: "Javascript",
//     group: "Image",
//     imageURL:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png",
//     parent: 4,
//     usedFrequency: 10,
//   },
//   {
//     id: 13,
//     name: "Java",
//     group: "Image",
//     imageURL:
//       "data:image/png;base64,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",
//     parent: 4,
//     usedFrequency: 10,
//   },
//   {
//     id: 14,
//     name: "C++",
//     group: "Image",
//     imageURL:
//       "https://raw.githubusercontent.com/Benio101/cpp-logo/master/cpp_logo.png",
//     parent: 4,
//     usedFrequency: 10,
//   },
//   {
//     id: 15,
//     name: "MongoDB",
//     group: "Image",
//     imageURL:
//       "https://www.pxpng.com/public/uploads/preview/-11608989692djipisyd1t.png",
//     parent: 9,
//     usedFrequency: 10,
//   },
//   {
//     id: 16,
//     name: "Mysql",
//     group: "Image",
//     imageURL:
//       "https://www.freepnglogos.com/uploads/logo-mysql-png/logo-mysql-mysql-logo-png-images-are-download-crazypng-21.png",
//     parent: 9,
//     usedFrequency: 10,
//   },
//   {
//     id: 17,
//     name: "Design",
//     group: "Category Label",
//     parent: 0,
//     usedFrequency: 10,
//   },
//   {
//     id: 18,
//     name: "Figma",
//     group: "Image",
//     imageURL:
//       "https://w7.pngwing.com/pngs/718/7/png-transparent-user-interface-design-figma-computer-software-user-experience-design-web-design-user-interface-design-logo.png",
//     parent: 17,
//     usedFrequency: 10,
//   },
//   {
//     id: 19,
//     name: "Node",
//     group: "Image",
//     imageURL:
//       "https://www.pngfind.com/pngs/m/683-6833893_node-js-logo-png-transparent-png.png",
//     parent: 10,
//     usedFrequency: 10,
//   },
//   {
//     id: 20,
//     name: "Django",
//     group: "Image",
//     imageURL:
//       "https://w7.pngwing.com/pngs/10/113/png-transparent-django-web-development-web-framework-python-software-framework-django-text-trademark-logo.png",
//     parent: 10,
//     usedFrequency: 10,
//   },
//   {
//     id: 21,
//     name: "React",
//     group: "Image",
//     imageURL:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png",
//     parent: 5,
//     usedFrequency: 10,
//   },
// ];

export default graphData;
