// gatsby-node.js

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  // If you no longer want the /using-dsg page, remove the code below
  // createPage({
  //   path: "/using-dsg",
  //   component: require.resolve("./src/templates/using-dsg.js"),
  //   context: {},
  //   defer: true,
  // })
}