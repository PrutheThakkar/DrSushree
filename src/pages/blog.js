import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";

const BlogPage = ({ data }) => {
  const posts = data?.allWpPost?.edges || [];
  const pageTitle = data?.wpPage?.title;
  const blogPage = data?.wpPage?.blogPage;
  const headerDeskImage = getImage(blogPage?.blogBennerImgDeskNew?.node);
  const blogPageTitle = blogPage?.blogPageTitleNew;
  const blogTopTitle = blogPage?.blogTopSectionTitleNew;
  const blogTopSubtitle = blogPage?.blogTopSectionSubtitleNew;

  return (
    <Layout>
      {/* ─── Header Banner Section ─── */}
      <section className="inner-banner-section">
        <div className="div-wrapper">
            {pageTitle && (
              <h1 dangerouslySetInnerHTML={{ __html: blogPageTitle }} />
            )}
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
        </div>
      </section>

      {/* ─── Blog Section ─── */}
      <section className="blog-section">
        <div className="container">
          <div className="title-wrap">
              <h2 className="title">
                {blogTopTitle}
                <span className="sub-title">{blogTopSubtitle}</span>
              </h2>
            </div>

          {/* Loop through the posts */}
          <div className="blog-list">
            {posts.map(({ node }, index) => {
              const headerDeskImage = getImage(node?.postnew?.postHeaderBannerDesk?.node?.gatsbyImage); // Corrected image query for desktop banner
              const headerMobImage = getImage(node?.postnew?.postHeaderBannerMob?.node?.gatsbyImage); // Corrected image query for mobile banner
              const imageAlt = node?.postnew?.postHeaderBannerDesk?.node?.altText || "Blog Banner Image"; // Get the alt text

              return (
                <Link to={`/blog/${node?.slug}`} className="blog-item-link" key={index}>
                  <div className="blog-item">
                    <div className="blog-img-wrap">
                      {/* Only render the image if it exists */}
                      {headerDeskImage && (
                        <GatsbyImage
                          image={headerDeskImage}
                          alt={imageAlt}
                          className="blog-img"
                          loading="eager"
                          style={{ width: "100%" }}
                          imgStyle={{ objectFit: "cover", objectPosition: "center" }}
                        />
                      )}
                      {/* For mobile image */}
                      {headerMobImage && (
                        <GatsbyImage
                          image={headerMobImage}
                          alt={imageAlt}
                          className="blog-img"
                          loading="eager"
                          style={{ width: "100%" }}
                          imgStyle={{ objectFit: "cover", objectPosition: "center" }}
                        />
                      )}
                    </div>

                    <div className="blog-body">
                      <h3 className="blog-title">{node?.title}</h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

// GraphQL query to fetch the WordPress posts and banner images
export const query = graphql`
 query BlogPageQuery {
  allWpPost {
    edges {
      node {
        title
        uri
        slug
        content
        featuredImage {
          node {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 90, width: 600, height: 400)
              }
            }
            slug
            title
            uri
          }
        }
        postnew {
          postHeaderBannerDesk {
            node {
              altText
              mediaItemUrl
              gatsbyImage(
                width: 1920
                height: 1020
                layout: CONSTRAINED
                placeholder: BLURRED
                quality: 100
              )
            }
          }
          postHeaderBannerMob{
            node {
              altText
              mediaItemUrl
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
    }
  }
  wpPage {
    title
    blogPage {
      blogPageTitleNew
      blogTopSectionTitleNew
      blogTopSectionSubtitleNew
      blogBennerImgDeskNew {
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
    }
  }
}
`;

export default BlogPage;