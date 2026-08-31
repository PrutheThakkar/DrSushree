import React, { useEffect } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

const slugify = (text = "") =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")

const ExpertisePageTemplate = ({ data }) => {
  const page = data?.allWpPage?.nodes?.[0]
  const commonPages = page?.commonPages

  const headerDeskImage = getImage(
    commonPages?.pageHeaderImageDesk?.node?.gatsbyImage
  )

  const headerMobileImage = getImage(
    commonPages?.pageHeaderImageMobile?.node?.gatsbyImage
  )

  const expertiseSections = commonPages?.expertiseSection || []

  useEffect(() => {
    const toggleBtn = document.querySelector(".expertise-toggle-btn")
    const closeBtn = document.querySelector(".expertise-close-btn")
    const list = document.querySelector(".expertise-list")
    const btnWrapper = document.querySelector(
      ".expertise-list-header .btn-wrapper"
    )

    const closeList = () => {
      if (list) list.classList.remove("open")

      setTimeout(() => {
        if (btnWrapper) btnWrapper.classList.remove("hidden")
      }, 250)
    }

    const handleToggle = e => {
      e.preventDefault()

      if (btnWrapper) btnWrapper.classList.add("hidden")

      setTimeout(() => {
        if (list) list.classList.add("open")
      }, 80)
    }

    const anchorLinks = document.querySelectorAll(
      '.expertise-list a[href^="#"]'
    )

    const handleAnchorClick = e => {
      e.preventDefault()

      const href = e.currentTarget.getAttribute("href")
      const target = document.querySelector(href)

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" })
      }

      closeList()
    }

    if (toggleBtn) toggleBtn.addEventListener("click", handleToggle)
    if (closeBtn) closeBtn.addEventListener("click", closeList)

    anchorLinks.forEach(link => {
      link.addEventListener("click", handleAnchorClick)
    })

    return () => {
      if (toggleBtn) toggleBtn.removeEventListener("click", handleToggle)
      if (closeBtn) closeBtn.removeEventListener("click", closeList)

      anchorLinks.forEach(link => {
        link.removeEventListener("click", handleAnchorClick)
      })
    }
  }, [])

  return (
    <Layout>
      <section className="inner-banner-section expertise-hero">
        <div className="container">
          <div className="div-wrapper">
            {page?.title && (
              <h1 dangerouslySetInnerHTML={{ __html: commonPages.pageTitle }} />
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
                loading="lazy"
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
                loading="lazy"
              />
            )}
          </div>

          <div
            className={`expertise-list-header ${
              page?.databaseId === 169 ? "Infertilitypage" : ""
            }`}
          >
            <div className="btn-wrapper">
              <a className="btn expertise-toggle-btn" href="#">
                {page?.title || "Expertise"}
              </a>
            </div>

            <div className="expertise-list-wrap">
              <button
                type="button"
                className="expertise-close-btn"
                aria-label="Close expertise list"
              ></button>

              <ul className="expertise-list">
                {expertiseSections.map((item, index) => {
                  const sectionId = slugify(
                    item?.expertiseTitle || `section-${index + 1}`
                  )

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
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="expertise-wrap">
        <div className="container">
          <ul className="exp-list">
            {expertiseSections.map((item, index) => {
              const sectionId = slugify(
                item?.expertiseTitle || `section-${index + 1}`
              )

              const sectionImage = getImage(
                item?.expertiseImage?.node?.gatsbyImage
              )

              return (
                <li className="expertise-row" id={sectionId} key={sectionId}>
                  {sectionImage && (
                    <div className="expertise-row__media">
                      <GatsbyImage
                        image={sectionImage}
                        alt={
                          item?.expertiseImage?.node?.altText ||
                          item?.expertiseTitle ||
                          "Section image"
                        }
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="expertise-row__content">
                    {item?.expertiseTitle && (
                      <h2 className="title">
                        {item.expertiseTitle}

                        {item?.expertiseSubtitle && (
                          <span
                            className="sub-title"
                            dangerouslySetInnerHTML={{
                              __html: item.expertiseSubtitle,
                            }}
                          />
                        )}
                      </h2>
                    )}

                    {item?.expertiseContent && (
                      <div
                        className="section-content"
                        dangerouslySetInnerHTML={{
                          __html: item.expertiseContent,
                        }}
                      />
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export default ExpertisePageTemplate

export const Head = ({ data, location }) => {
  const seoByPath = {
    "/obstetrics/": {
      title: "Obstetrician in Mira Road | Pregnancy & High-Risk Pregnancy Care",
      description:
        "Get personalised pregnancy care in Mira Road from Dr. Sushree Patra, including antenatal care, high-risk pregnancy management, labour and postpartum care.",
      keywords: [
        "obstetrician in Mira Road",
        "pregnancy doctor Mira Road",
        "high-risk pregnancy specialist Mira Road",
        "antenatal care Mira Road",
        "pregnancy care Mira Road",
        "obstetrician Mira Road",
      ],
    },
    "/gynaecology/": {
      title: "Gynaecologist in Mira Road | Women's Health & Gynaecology Care",
      description:
        "Dr. Sushree Patra provides comprehensive gynaecological care in Mira Road for menstrual disorders, PCOS, fibroids, endometriosis and women's health concerns.",
      keywords: [
        "gynaecologist in Mira Road",
        "gynecologist Mira Road",
        "women's health doctor Mira Road",
        "PCOS doctor Mira Road",
        "menstrual disorder treatment Mira Road",
        "gynaecology specialist Mira Road",
      ],
    },
    "/infertility/": {
      title: "Infertility Specialist in Mira Road | Fertility Care | Dr. Patra",
      description:
        "Dr. Sushree Patra provides evidence-based infertility evaluation and medical management in Mira Road, including hormonal assessment and ovulation management.",
      keywords: [
        "infertility specialist Mira Road",
        "fertility specialist Mira Road",
        "infertility doctor Mira Road",
        "fertility treatment Mira Road",
        "infertility treatment Mumbai",
        "PCOS infertility treatment Mira Road",
      ],
    },
  }
  const fallbackTitle = data?.allWpPage?.nodes?.[0]?.title || "Expertise"
  const pageSeo = seoByPath[location.pathname] || {
    title: fallbackTitle,
    description: `Learn about Dr. Sushree Patra's ${fallbackTitle.toLowerCase()} services, treatment options and patient-centred approach.`,
    keywords: [],
  }
  return (
    <Seo
      title={pageSeo.title}
      pathname={location.pathname}
      description={pageSeo.description}
      keywords={pageSeo.keywords}
      schema={{
        "@context": "https://schema.org",
        "@type": ["Physician", "MedicalWebPage"],
        name: pageSeo.title,
        url: `https://www.drsushreepatra.com${location.pathname}`,
        medicalSpecialty: ["Obstetrics", "Gynecology"],
      }}
    />
  )
}

export const query = graphql`
  query ExpertisePageTemplate($pageId: Int!) {
    allWpPage(filter: { databaseId: { eq: $pageId } }) {
      nodes {
        title
        databaseId
        commonPages {
          pageTitle
          pageHeaderImageDesk {
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
          pageHeaderImageMobile {
            node {
              altText
              gatsbyImage(
                width: 767
                height: 367
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
                  width: 770
                  height: 630
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
`
