const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // --- Existing Page Creation Logic ---
  const template = path.resolve("./src/templates/expertise-page.js");

  const pages = [
    { pageId: 154, path: "/obstetrics/" },
    { pageId: 169, path: "/infertility/" },
    { pageId: 166, path: "/gynaecology/" },
  ];

  pages.forEach((page) => {
    createPage({
      path: page.path,
      component: template,
      context: {
        pageId: page.pageId,
      },
    });
  });

  // --- New Blog Page Creation Logic ---
  const blogTemplate = path.resolve("./src/templates/blog-post.js");

  // Query to get all blog posts slugs and IDs
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

  // Handle errors from the GraphQL query
  if (result.errors) {
    throw new Error("There was an error fetching blog posts");
  }

  // Create a page for each blog post
  result.data.allWpPost.edges.forEach(({ node }) => {
    createPage({
      path: `/blog/${node.slug}`, // The URL for the blog post
      component: blogTemplate, // The template for the blog post
      context: {
        id: node.id, // Pass the blog post ID to the template
      },
    });
  });
};