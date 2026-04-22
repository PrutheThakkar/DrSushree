const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Fetch blog post slugs and IDs
  const result = await graphql(`
    query {
      allWpPost {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error("Error fetching blog posts", result.errors);
    return;
  }

  // Create a page for each blog post
  result.data.allWpPost.edges.forEach(({ node }) => {
    createPage({
      path: `/blog/${node.slug}`, 
      component: path.resolve("./src/templates/blog-post.js"), 
      context: {
        id: node.id, 
      },
    });
  });
};