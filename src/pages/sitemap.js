import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13M13 7l5 5-5 5" />
  </svg>
)

const SitemapLink = ({ to, children }) => (
  <li>
    <Link to={to}>
      <span>{children}</span>
      <ArrowIcon />
    </Link>
  </li>
)

const SitemapPage = ({ data }) => {
  const posts = data?.allWpPost?.nodes || []

  return (
    <Layout>
      <section className="sitemap-hero">
        <div className="container">
          <p className="sitemap-eyebrow">Explore the website</p>
          <h1>Sitemap</h1>
          <p>
            Find information about Dr. Sushree Patra, specialist services,
            patient resources and ways to get in touch.
          </p>
        </div>
      </section>

      <section className="sitemap-page">
        <div className="container">
          <div className="sitemap-intro">
            <h2>Everything, in one place</h2>
            <p>
              Use the sections below to quickly navigate to the information you
              need.
            </p>
          </div>

          <div className="sitemap-grid">
            <article className="sitemap-card">
              <p className="sitemap-card-number">01</p>
              <h2>Main pages</h2>
              <ul>
                <SitemapLink to="/">Home</SitemapLink>
                <SitemapLink to="/about/">About Dr. Sushree Patra</SitemapLink>
                <SitemapLink to="/contact/">
                  Contact &amp; Appointments
                </SitemapLink>
              </ul>
            </article>

            <article className="sitemap-card sitemap-card-featured">
              <p className="sitemap-card-number">02</p>
              <h2>Areas of expertise</h2>
              <ul>
                <SitemapLink to="/obstetrics/">Obstetrics</SitemapLink>
                <SitemapLink to="/gynaecology/">Gynaecology</SitemapLink>
                <SitemapLink to="/infertility/">Infertility</SitemapLink>
              </ul>
            </article>

            <article className="sitemap-card">
              <p className="sitemap-card-number">03</p>
              <h2>Patient resources</h2>
              <ul>
                <SitemapLink to="/blog/">Women's Health Blog</SitemapLink>
                <SitemapLink to="/faq/">Frequently Asked Questions</SitemapLink>
                <SitemapLink to="/sitemap/">Sitemap</SitemapLink>
              </ul>
            </article>
          </div>

          {posts.length > 0 && (
            <div className="sitemap-blog-panel">
              <div className="sitemap-blog-heading">
                <p className="sitemap-eyebrow">Latest resources</p>
                <h2>Blog articles</h2>
              </div>
              <ul>
                {posts.map(post => (
                  <SitemapLink key={post.slug} to={`/blog/${post.slug}/`}>
                    {post.title}
                  </SitemapLink>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query SitemapPageQuery {
    allWpPost(sort: { date: DESC }) {
      nodes {
        title
        slug
      }
    }
  }
`

export default SitemapPage

export const Head = ({ location }) => (
  <Seo
    title="Sitemap | Dr. Sushree Patra"
    pathname={location.pathname}
    description="Explore all pages on Dr. Sushree Patra's website, including obstetrics, gynaecology, infertility, patient FAQs, blog articles and contact information."
    keywords={[
      "Dr. Sushree Patra sitemap",
      "gynaecologist Mira Road",
      "obstetrician Mira Road",
      "women's health resources",
    ]}
    schema={{
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Sitemap | Dr. Sushree Patra",
      url: "https://www.drsushreepatra.com/sitemap/",
    }}
  />
)
