import React, { useState } from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
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

  // ✅ FIXED: using correct field names from your GraphQL schema
  const headerMobileImage = getImage(
    faqPage?.pageBannerImageMob?.node?.gatsbyImage
  );
  const headerDeskImage = getImage(
    faqPage?.pageBannerImageDesk?.node?.gatsbyImage
  );

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
      {/* ─── Banner Section ─── */}
      <section className="inner-banner-section">
      
          <div className="div-wrapper">
            {pageTitle && (
              <h1 dangerouslySetInnerHTML={{ __html: pageTitle }} />
            )}
          </div>

          {/*
            ✅ FIXED: img-wrap has a real minHeight so the FULL_WIDTH
            GatsbyImage has a sized parent. Your commons.css sets
            height:100% on .img-wrap which collapses when the parent
            has no explicit height — the inline minHeight fixes that.
          */}
          <div
            className="img-wrap"
            style={{
              position: "relative",
              width: "100%",
              minHeight: "1020px",
              overflow: "hidden",
            }}
          >
            {/* Mobile image — shown below 768px via CSS */}
            {headerMobileImage && (
              <div
                className="hero-img-wrapper hero-img-wrapper--mobile"
                style={{ position: "absolute", inset: 0 }}
              >
                <GatsbyImage
                  image={headerMobileImage}
                  alt={
                    faqPage?.pageBannerImageMob?.node?.altText ||
                    pageTitle ||
                    "Header mobile image"
                  }
                  className="hero-img hero-img--mobile"
                  loading="eager"
                  style={{ width: "100%", height: "100%" }}
                  imgStyle={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
            )}

            {/* Desktop image — shown above 768px via CSS */}
            {headerDeskImage && (
              <div
                className="hero-img-wrapper hero-img-wrapper--desktop"
                style={{ position: "absolute", inset: 0 }}
              >
                <GatsbyImage
                  image={headerDeskImage}
                  alt={
                    faqPage?.pageBannerImageDesk?.node?.altText ||
                    pageTitle ||
                    "Header desktop image"
                  }
                  className="hero-img hero-img--desktop"
                  loading="eager"
                  style={{ width: "100%", height: "100%" }}
                  imgStyle={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
            )}
          </div>
      
      </section>

      {/* ─── FAQ Section ─── */}
      <section className="faq-section">
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

// ✅ FIXED: correct field names (pageBannerImageDesk / pageBannerImageMob)
//    both nested inside faqPage, not commonPages.
//    Also using real dimensions instead of 10x10.
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
                  quality: 90
                  width: 1920
                  height: 1080
                )
              }
            }
            pageBannerImageMob {
              node {
                altText
                gatsbyImage(
                  layout: FULL_WIDTH
                  quality: 90
                  width: 767
                  height: 767
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