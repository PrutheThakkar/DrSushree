const path = require("path");

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

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
};