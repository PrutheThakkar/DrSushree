import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const BlogPostTemplate = ({ data }) => {
  const post = data.wpPost;
  const image = getImage(post?.featuredImage?.node?.localFile); // Corrected image query for featured image
  const imageAlt = post?.featuredImage?.node?.altText || "Blog Post Image";

  // Get the header images for the banner section
  const headerDeskImage = getImage(post?.postnew?.postHeaderBannerDesk?.node?.gatsbyImage); // Corrected for banner desktop image
  const headerMobImage = getImage(post?.postnew?.postHeaderBannerMob?.node?.gatsbyImage); // Corrected for banner mobile image
  const pageTitle = data?.wpPage?.title;
  const blogPageTitle = data?.wpPage?.blogPage?.blogPageTitleNew;

  return (
    <Layout>
      {/* ─── Header Banner Section ─── */}
      <section className="inner-banner-section">
        <div className="div-wrapper">
          <h1>{post?.title}</h1>
        </div>

        <div
          className="img-wrap"
          style={{
            position: "relative",
            width: "100%",
            minHeight: "1020px",
            overflow: "hidden",
          }}
        >
          {/* Desktop Banner Image */}
          {headerDeskImage && (
            <div
              className="hero-img-wrapper hero-img-wrapper--desktop"
              style={{ position: "absolute", inset: 0 }}
            >
              <GatsbyImage
                image={headerDeskImage}
                alt={pageTitle || "Header desktop image"}
                className="hero-img hero-img--desktop"
                loading="eager"
                style={{ width: "100%", height: "100%" }}
                imgStyle={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          )}

          {/* Mobile Banner Image */}
          {headerMobImage && (
            <div
              className="hero-img-wrapper hero-img-wrapper--mobile"
              style={{ position: "absolute", inset: 0 }}
            >
              <GatsbyImage
                image={headerMobImage}
                alt={pageTitle || "Header mobile image"}
                className="hero-img hero-img--mobile"
                loading="eager"
                style={{ width: "100%", height: "100%" }}
                imgStyle={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          )}
        </div>
      </section>

      {/* ─── Blog Post Section ─── */}
      <section className="blog-post-section">
        <div className="container">
        

          {/* Render the blog content */}
          <div dangerouslySetInnerHTML={{ __html: post?.content }} />
        </div>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query BlogPostQuery($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      content
      slug
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 90, width: 1200, height: 800)
            }
          }
          title
        }
      }
      postnew {
        postHeaderBannerDesk {
          node {
            altText
            gatsbyImage(
              width: 1920
              height: 1020
              layout: CONSTRAINED
              placeholder: BLURRED
              quality: 100
            )
          }
        }
        postHeaderBannerMob {
          node {
            altText
            gatsbyImage(
              width: 800
              height: 600
              layout: CONSTRAINED
              placeholder: BLURRED
              quality: 100
            )
          }
        }
      }
    }
    wpPage(id: { eq: "628" }) {
      title
      blogPage {
        blogPageTitleNew
        blogTopSectionTitleNew
        blogTopSectionSubtitleNew
      }
    }
  }
`;

export default BlogPostTemplate;