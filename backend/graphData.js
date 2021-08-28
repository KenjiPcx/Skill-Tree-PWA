const graphData = [
  // // Categories
  // {
  //   name: "Frontend Dev",
  //   group: "Category Label",
  //   parent: "Origin",
  //   usedFrequency: 10,
  // },
  // {
  //   name: "Backend Dev",
  //   group: "Category Label",
  //   parent: "Origin",
  //   usedFrequency: 10,
  // },
  {
    name: "Firebase",
    group: "Image",
    parent: "Backend Dev",
    imageURL:
      "https://firebase.google.com/images/brand-guidelines/logo-logomark.png",
    usedFrequency: 10,
  },
  // {
  //   name: "Blockchain Dev",
  //   group: "Category Label",
  //   parent: "Origin",
  //   usedFrequency: 10,
  // },
  // {
  //   name: "Game Dev",
  //   group: "Category Label",
  //   parent: "Origin",
  //   usedFrequency: 10,
  // },
  // {
  //   name: "Artificial Intelligence",
  //   group: "Category Label",
  //   parent: "Origin",
  //   usedFrequency: 10,
  // },
  // {
  //   name: "Languages",
  //   group: "Category Label",
  //   parent: "Origin",
  //   usedFrequency: 10,
  // },
  // // Frontend Subcategories
  // {
  //   name: "Web Dev",
  //   group: "Subcategory Label",
  //   parent: "Frontend Dev",
  //   usedFrequency: 10,
  // },
  // {
  //   name: "Mobile Dev",
  //   group: "Subcategory Label",
  //   parent: "Frontend Dev",
  //   usedFrequency: 10,
  // },
  // {
  //   name: "UI Libraries",
  //   group: "Subcategory Label",
  //   parent: "Frontend Dev",
  //   usedFrequency: 10,
  // },
  // {
  //   name: "Flutter",
  //   group: "Image",
  //   parent: "Frontend Dev",
  //   imageURL: "https://logowik.com/content/uploads/images/flutter5786.jpg",
  //   usedFrequency: 10,
  // },
  // {
  //   name: "Material UI",
  //   group: "Image",
  //   parent: "UI Libraries",
  //   imageURL: "https://material-ui.com/static/logo.png",
  //   usedFrequency: 10,
  // },
  // {
  //   name: "React Bootstrap",
  //   group: "Image",
  //   parent: "UI Libraries",
  //   imageURL:
  //     "https://crowdcast-prod.imgix.net/-KHhIzuATU2K4OVPd2sP/event-cover-5388?w=800",
  //   usedFrequency: 10,
  // },
  // // Backend Subcategories
  // {
  //   name: "Database",
  //   group: "Subcategory Label",
  //   parent: "Backend Dev",
  //   usedFrequency: 10,
  // },
  // {
  //   name: "Server",
  //   group: "Subcategory Label",
  //   parent: "Backend Dev",
  //   usedFrequency: 10,
  // },
  // {
  //   name: "Deployment",
  //   group: "Subcategory Label",
  //   parent: "Backend Dev",
  //   usedFrequency: 10,
  // },
  // // Artificial Intelligence Subcategories
  // {
  //   name: "Machine Learning",
  //   group: "Subcategory Label",
  //   parent: "Artificial Intelligence",
  //   usedFrequency: 10,
  // },
  // {
  //   name: "Deep Learning",
  //   group: "Subcategory Label",
  //   parent: "Machine Learning",
  //   usedFrequency: 10,
  // },
  // // Languages
  // {
  //   name: "Python",
  //   group: "Image",
  //   parent: "Languages",
  //   imageURL: "https://image.pngaaa.com/138/619138-middle.png",
  //   usedFrequency: 10,
  // },
  // {
  //   name: "JavaScript",
  //   group: "Image",
  //   parent: "Languages",
  //   imageURL:
  //     "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png",
  //   usedFrequency: 10,
  // },
  // {
  //   name: "TypeScript",
  //   group: "Image",
  //   parent: "JavaScript",
  //   imageURL:
  //     "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
  //   usedFrequency: 10,
  // },
  // {
  //   name: "Java",
  //   group: "Image",
  //   parent: "Languages",
  //   imageURL:
  //     "https://1000logos.net/wp-content/uploads/2020/09/Java-Emblem.jpg",
  //   usedFrequency: 10,
  // },
  // {
  //   name: "C++",
  //   group: "Image",
  //   parent: "Languages",
  //   imageURL:
  //     "https://raw.githubusercontent.com/Benio101/cpp-logo/master/cpp_logo.png",
  //   usedFrequency: 10,
  // },
  // {
  //   name: "Dart",
  //   group: "Image",
  //   parent: "Languages",
  //   imageURL:
  //     "https://www.kindpng.com/picc/m/176-1766682_dart-programming-language-hd-png-download.png",
  //   usedFrequency: 10,
  // },
  // {
  //   name: "Kotlin",
  //   group: "Image",
  //   parent: "Java",
  //   imageURL:
  //     "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Kotlin_Icon.png/1024px-Kotlin_Icon.png",
  //   usedFrequency: 10,
  // },
  // {
  //   name: "React",
  //   group: "Image",
  //   parent: "Web Dev",
  //   imageURL: "https://iconape.com/wp-content/files/zk/93042/svg/react.svg",
  //   usedFrequency: 10,
  // },
  // {
  //   learning: true,
  //   name: "Next.js",
  //   group: "Image",
  //   parent: "Web Dev",
  //   imageURL:
  //     "https://seeklogo.com/images/N/next-js-logo-8FCFF51DD2-seeklogo.com.png",
  //   usedFrequency: 10,
  // },
];

export default graphData;

// export const pushChildrenNodes = (search, returnArr, nodes = []) => {
//   // console.log("called", search);
//   let nodesData = nodes;
//   const res = nodesData.filter((data) => data.parent === search);
//   if (res.length === 0) {
//     return;
//   } else {
//     nodesData = nodesData.filter((node) => !res.includes(node));
//     res.forEach((data) => {
//       returnArr.push(data);
//       pushChildrenNodes(data.name, returnArr, nodesData);
//     });
//   }
// };

// const getMostUsed = (skillsData, category) => {
//   const children = [];
//   pushChildrenNodes(category, children, skillsData);

//   let mostUsed = [];
//   let maxVal = 0;

//   // Get Max Val
//   children.forEach((child) => {
//     if (child.group === "Image" && child.usedFrequency > maxVal) {
//       maxVal = child.usedFrequency;
//     }
//   });

//   children.forEach((child) => {
//     if (child.group === "Image" && child.usedFrequency === maxVal) {
//       mostUsed.push(child.name);
//     }
//   });

//   return mostUsed;
// };

// // const nodes = [];
// // pushChildrenNodes("Frontend Dev", nodes, graphData);
// // console.log(nodes);
// // console.log(getMostUsed(graphData, "Frontend Dev"))
// const fields = [
//   "Frontend Dev",
//   "Backend Dev",
//   "Blockchain Dev",
//   "Game Dev",
//   "Artificial Intelligence",
//   "Languages",
// ];

// // const map = new Map();
// // fields.forEach((field) => map.set(field, getMostUsed(graphData, field)))
// // console.log(map)
