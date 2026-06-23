import React from "react";
import { graphql, Link } from "gatsby";
import {
  GatsbyImage,
  getImage,
  withArtDirection,
} from "gatsby-plugin-image";
import Layout from "../components/layout";

const getResponsiveImage = (desktopImage, mobileImage) => {
  if (desktopImage && mobileImage) {
    return withArtDirection(desktopImage, [
      {
        media: "(max-width: 767px)",
        image: mobileImage,
      },
    ]);
  }

  return desktopImage || mobileImage;
};

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
                className="hero-img"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            )}
          </div>
        </div>
      </section>

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

              const blogImage = getResponsiveImage(blogDeskImage, blogMobImage);

              const imageAlt =
                node?.postnew?.postHeaderBannerDesk?.node?.altText ||
                node?.postnew?.postHeaderBannerMob?.node?.altText ||
                node?.title ||
                "Blog image";

              return (
                <Link
                  to={`/blog/${node?.slug}`}
                  className="blog-item-link"
                  key={node?.slug || index}
                >
                  <div className="blog-item">
                    <div className="blog-img-wrap">
                      {blogImage && (
                        <GatsbyImage
                          image={blogImage}
                          alt={imageAlt}
                          className="blog-img"
                          loading="lazy"
                          decoding="async"
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
          slug
          postnew {
            postHeaderBannerDesk {
              node {
                altText
                gatsbyImage(
                  width: 720
                  height: 383
                  layout: CONSTRAINED
                  placeholder: BLURRED
                  quality: 100
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
            postHeaderBannerMob {
              node {
                altText
                gatsbyImage(
                  width: 640
                  height: 480
                  layout: CONSTRAINED
                  placeholder: BLURRED
                  quality:100
                  formats: [AUTO, WEBP, AVIF]
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
              width: 1600
              height: 542
              layout: FULL_WIDTH
              placeholder: BLURRED
              quality: 75
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
`;

export default BlogPage;