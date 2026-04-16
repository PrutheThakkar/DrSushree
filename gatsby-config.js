require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: "Dr sushree",
    description: "Gatsby + WordPress (WPGraphQL) site",
    author: "@Dr sushree",
    siteUrl:
      process.env.GATSBY_WEBSITE_URL ||
      "https://drsushree.studiosentientdemo.com",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url:
          process.env.GATSBY_WPGRAPHQL_URL ||
          "https://drsushree.studiosentientdemo.com/graphql",
        develop: {
          hardCacheMediaFiles: true,
          hardCacheData: false,
          nodeUpdateInterval: 300000,
        },
        production: {
          hardCacheMediaFiles: false,
        },
      },
    },
  ],
};