import React, { useState } from "react";
import { graphql } from "gatsby";
import {
  GatsbyImage,
  getImage,
  withArtDirection,
} from "gatsby-plugin-image";
import Layout from "../components/layout";

const FaqPage = ({ data }) => {
  const pageNode = data?.allWpPage?.edges?.[0]?.node;
  const faqPage = pageNode?.faqPage;

  const pageTitle = faqPage?.pageTitle || "";
  const sectionTitle = faqPage?.sectionTitle || "";
  const sectionSubtitle = faqPage?.sectionSubtitle || "";

  const faqTitle = faqPage?.faqTitle || "";
  const faqList = faqPage?.faqList || [];

  const laparoscopicTitle = faqPage?.laparoscopicTitle || "";
  const laparoscopicList = faqPage?.laparoscopicList || [];

  const obstetricsTitle = faqPage?.obstetricsTitle || "";
  const obstetricsList = faqPage?.obstetricsList || [];

  const infertilityTitle = faqPage?.infertilityTitle || "";
  const infertilityList = faqPage?.infertilityList || [];

  const headerMobileImage = getImage(
    faqPage?.pageBannerImageMob?.node?.gatsbyImage
  );

  const headerDeskImage = getImage(
    faqPage?.pageBannerImageDesk?.node?.gatsbyImage
  );

  const headerAlt =
    faqPage?.pageBannerImageDesk?.node?.altText ||
    faqPage?.pageBannerImageMob?.node?.altText ||
    pageTitle ||
    "FAQ banner image";

  const headerBannerImage =
    headerDeskImage && headerMobileImage
      ? withArtDirection(headerDeskImage, [
          {
            media: "(max-width: 767px)",
            image: headerMobileImage,
          },
        ])
      : headerDeskImage || headerMobileImage;

  const [openItems, setOpenItems] = useState({
    general: 0,
    laparoscopic: 0,
    obstetrics: 0,
    infertility: 0,
  });

  const toggleFaq = (sectionKey, index) => {
    setOpenItems((prev) => ({
      ...prev,
      [sectionKey]: prev[sectionKey] === index ? null : index,
    }));
  };

  const faqSections = [
    {
      key: "general",
      className: "General",
      title: faqTitle,
      list: faqList.map((item) => ({
        question: item?.question,
        answer: item?.answers,
      })),
    },
    {
      key: "laparoscopic",
      className: "Laparoscopic",
      title: laparoscopicTitle,
      list: laparoscopicList.map((item) => ({
        question: item?.questions,
        answer: item?.answers,
      })),
    },
    {
      key: "obstetrics",
      className: "Obstetrics",
      title: obstetricsTitle,
      list: obstetricsList.map((item) => ({
        question: item?.questions,
        answer: item?.answers,
      })),
    },
    {
      key: "infertility",
      className: "Infertility",
      title: infertilityTitle,
      list: infertilityList.map((item) => ({
        question: item?.questions,
        answer: item?.answers,
      })),
    },
  ];

  return (
    <Layout>
      <section className="inner-banner-section">
        <div className="container">
          <div className="div-wrapper">
            {pageTitle && (
              <h1 dangerouslySetInnerHTML={{ __html: pageTitle }} />
            )}
          </div>

          <div className="img-wrap">
            {headerBannerImage && (
              <GatsbyImage
                image={headerBannerImage}
                alt={headerAlt}
                className="hero-img"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            )}
          </div>
        </div>
      </section>

      <section className="faq-section faq-page">
        <div className="container">
          {(sectionTitle || sectionSubtitle) && (
            <div className="title-wrap">
              <h2 className="title">
                {sectionTitle}
                <span className="sub-title">{sectionSubtitle}</span>
              </h2>
            </div>
          )}

          {faqSections.map(
            (section) =>
              section.list.length > 0 && (
                <div
                  className={`${section.className} sub-section`}
                  key={section.key}
                >
                  <div className="faq-heading">
                    <h2>{section.title}</h2>
                  </div>

                  <div className="faq-list">
                    {section.list.map((item, index) => {
                      const isActive = openItems[section.key] === index;

                      return (
                        <div
                          className={`faq-item ${isActive ? "active" : ""}`}
                          key={index}
                        >
                          <button
                            className="faq-question"
                            type="button"
                            onClick={() => toggleFaq(section.key, index)}
                            aria-expanded={isActive}
                          >
                            <h3>{item.question}</h3>
                            <p className="faq-icon"></p>
                          </button>

                          <div
                            className="faq-answer"
                            style={{ display: isActive ? "block" : "none" }}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.answer || "",
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
          )}
        </div>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query FaqPageQuery {
    allWpPage(filter: { databaseId: { eq: 172 } }) {
      edges {
        node {
          faqPage {
            pageTitle
            sectionTitle
            sectionSubtitle
            faqTitle
            faqList {
              question
              answers
            }
            laparoscopicTitle
            laparoscopicList {
              questions
              answers
            }
            obstetricsTitle
            obstetricsList {
              questions
              answers
            }
            infertilityTitle
            infertilityList {
              questions
              answers
            }
            pageBannerImageDesk {
              node {
                altText
                gatsbyImage(
                  layout: FULL_WIDTH
                  quality: 100
                  width: 1600
                  height: 542
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
            pageBannerImageMob {
              node {
                altText
                gatsbyImage(
                  layout: FULL_WIDTH
                  quality: 100
                  width: 767
                  height: 367
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
  }
`;

export default FaqPage;