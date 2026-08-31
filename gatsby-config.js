require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: "Dr. Sushree Patra",
    description:
      "Consult Dr. Sushree Patra for compassionate, evidence-based obstetrics, gynaecology, infertility and minimally invasive surgery care.",
    author: "@DrSushreePatra",

    // Keep every canonical and sitemap URL on the production www host.
    siteUrl: "https://www.drsushreepatra.com",
    language: "en-IN",
  },

  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sass",

    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: ["/404/", "/404.html", "/dev-404-page/"],
      },
    },

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
}
