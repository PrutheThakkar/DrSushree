import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";

const BlogPage = ({ data }) => {
  const posts = data?.allWpPost?.edges || [];
  const pageTitle = data?.wpPage?.title;
  const blogPage = data?.wpPage?.blogPage;

  const blogBannerImage = getImage(
    blogPage?.blogBennerImgDeskNew?.node?.gatsbyImage
  );

  const blogBannerImageAlt =
    blogPage?.blogBennerImgDeskNew?.node?.altText ||
    pageTitle ||
    "Blog banner image";

  const blogPageTitle = blogPage?.blogPageTitleNew;
  const blogTopTitle = blogPage?.blogTopSectionTitleNew;
  const blogTopSubtitle = blogPage?.blogTopSectionSubtitleNew;

  return (
    <Layout>
      {/* ─── Header Banner Section ─── */}
      <section className="inner-banner-section">
        <div className="container">
          <div className="div-wrapper">
            {blogPageTitle && (
              <h1 dangerouslySetInnerHTML={{ __html: blogPageTitle }} />
            )}
          </div>

          <div className="img-wrap">
            {blogBannerImage && (
              <GatsbyImage
                image={blogBannerImage}
                alt={blogBannerImageAlt}
                className="hero-img hero-img--desktop"
                loading="eager"
              />
            )}
          </div>
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

          <div className="blog-list">
            {posts.map(({ node }, index) => {
              const blogDeskImage = getImage(
                node?.postnew?.postHeaderBannerDesk?.node?.gatsbyImage
              );

              const blogMobImage = getImage(
                node?.postnew?.postHeaderBannerMob?.node?.gatsbyImage
              );

              const imageAlt =
                node?.postnew?.postHeaderBannerDesk?.node?.altText ||
                node?.title ||
                "Blog Banner Image";

              return (
                <Link
                  to={`/blog/${node?.slug}`}
                  className="blog-item-link"
                  key={index}
                >
                  <div className="blog-item">
                    <div className="blog-img-wrap">
                      {blogDeskImage && (
                        <GatsbyImage
                          image={blogDeskImage}
                          alt={imageAlt}
                          className="blog-img blog-img--desktop"
                          loading="lazy"
                          style={{ width: "100%" }}
                          imgStyle={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                        />
                      )}

                      {blogMobImage && (
                        <GatsbyImage
                          image={blogMobImage}
                          alt={imageAlt}
                          className="blog-img blog-img--mobile"
                          loading="lazy"
                          style={{ width: "100%" }}
                          imgStyle={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
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
            postHeaderBannerMob {
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
              height: 650
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