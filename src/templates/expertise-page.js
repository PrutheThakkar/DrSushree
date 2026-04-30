import React, { useEffect } from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";

const slugify = (text = "") =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const ExpertisePageTemplate = ({ data }) => {
  const page = data?.allWpPage?.nodes?.[0];
  const commonPages = page?.commonPages;

  const headerDeskImage = getImage(
    commonPages?.pageHeaderImageDesk?.node?.gatsbyImage
  );
  const headerMobileImage = getImage(
    commonPages?.pageHeaderImageMobile?.node?.gatsbyImage
  );

  const expertiseSections = commonPages?.expertiseSection || [];

  useEffect(() => {
    const toggleBtn = document.querySelector(".expertise-toggle-btn");
    const list = document.querySelector(".expertise-list");
    const btnWrapper = document.querySelector(
      ".expertise-list-header .btn-wrapper"
    );

    const handleToggle = (e) => {
      e.preventDefault();
      if (btnWrapper) btnWrapper.classList.add("hidden");
      setTimeout(() => {
        if (list) list.classList.add("open");
      }, 80);
    };

    const anchorLinks = document.querySelectorAll(
      '.expertise-list a[href^="#"]'
    );

    const handleAnchorClick = (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute("href");
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    if (toggleBtn) {
      toggleBtn.addEventListener("click", handleToggle);
    }

    anchorLinks.forEach((link) => {
      link.addEventListener("click", handleAnchorClick);
    });

    return () => {
      if (toggleBtn) {
        toggleBtn.removeEventListener("click", handleToggle);
      }

      anchorLinks.forEach((link) => {
        link.removeEventListener("click", handleAnchorClick);
      });
    };
  }, []);

  return (
    <Layout>
      <div className={`expertise-list-header ${page?.databaseId === 169 ? "Infertilitypage" : ""}`}>
        <div className="container">
          <div className="btn-wrapper">
            <a className="btn expertise-toggle-btn" href="#">
              {page?.title || "Expertise"}
            </a>
          </div>

          <div className="expertise-list-wrap ">
            <button
              type="button"
              className="expertise-close-btn"
              aria-label="Close expertise list"
            >
            </button>

            <ul className="expertise-list">
              {expertiseSections.map((item, index) => {
                const sectionId = slugify(
                  item?.expertiseTitle || `section-${index + 1}`
                );

                return (
                  <li key={sectionId}>
                    <a className="btn" href={`#${sectionId}`}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: item?.expertiseTitle || "",
                        }}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <section className="inner-banner-section">
        <div className="container">
          <div className="div-wrapper">
            {page?.title && (
              <h1 dangerouslySetInnerHTML={{ __html: page.title }} />
            )}
          </div>

          <div className="img-wrap">
            {headerMobileImage && (
              <GatsbyImage
                image={headerMobileImage}
                alt={
                  commonPages?.pageHeaderImageMobile?.node?.altText ||
                  page?.title ||
                  "Header mobile image"
                }
                className="hero-img hero-img--mobile"
                loading="eager"
              />
            )}

            {headerDeskImage && (
              <GatsbyImage
                image={headerDeskImage}
                alt={
                  commonPages?.pageHeaderImageDesk?.node?.altText ||
                  page?.title ||
                  "Header desktop image"
                }
                className="hero-img hero-img--desktop"
                loading="eager"
              />
            )}
          </div>
        </div>
      </section>

      <section className="expertise-wrap">
        <div className="container">
          <ul className="exp-list">
            {expertiseSections.map((item, index) => {
              const sectionId = slugify(
                item?.expertiseTitle || `section-${index + 1}`
              );
              const sectionImage = getImage(
                item?.expertiseImage?.node?.gatsbyImage
              );

              return (
                <li id={sectionId} key={sectionId}>
                  <div className="title-wrap">
                    <h2 className="title">
                      {item?.expertiseTitle }
                     

                      {item?.expertiseSubtitle && (
                        <span
                          className="sub-title"
                          dangerouslySetInnerHTML={{
                            __html: item.expertiseSubtitle,
                          }}
                        />
                      )}
                    </h2>
                  </div>

                  {sectionImage && (
                    <div className="img-wrap">
                      <GatsbyImage
                        image={sectionImage}
                        alt={
                          item?.expertiseImage?.node?.altText ||
                          item?.expertiseTitle ||
                          "Section image"
                        }
                      />
                    </div>
                  )}

                  {item?.expertiseContent && (
                    <div
                      className="section-content"
                      dangerouslySetInnerHTML={{
                        __html: item.expertiseContent,
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default ExpertisePageTemplate;

export const query = graphql`
  query ExpertisePageTemplate($pageId: Int!) {
    allWpPage(filter: { databaseId: { eq: $pageId } }) {
      nodes {
        title
        databaseId
        commonPages {
          pageHeaderImageDesk {
            node {
              altText
              gatsbyImage(
                width: 1920
                height: 1200
                layout: CONSTRAINED
                placeholder: BLURRED
                quality: 100
              )
            }
          }
          pageHeaderImageMobile {
            node {
              altText
              gatsbyImage(
                width: 768
                height: 900
                layout: CONSTRAINED
                placeholder: BLURRED
                quality: 100
              )
            }
          }
          expertiseSection {
            expertiseTitle
            expertiseSubtitle
            expertiseContent
            expertiseImage {
              node {
                altText
                gatsbyImage(
                  width: 1200
                  height: 421
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
  }
`;