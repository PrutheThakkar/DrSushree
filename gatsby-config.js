require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: "Dr. Sushree Patra",
    description: "Dr. Sushree Patra - Obstetrician and Gynaecologist",
    author: "@DrSushreePatra",

    siteUrl:
      process.env.GATSBY_WEBSITE_URL ||
      "https://drsushreepatra.com",
  },

  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sass",

    // Generate sitemap
    "gatsby-plugin-sitemap",

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