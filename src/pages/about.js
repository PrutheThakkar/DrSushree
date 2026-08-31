import React from "react"
import { graphql } from "gatsby"
import {
  GatsbyImage,
  StaticImage,
  getImage,
  withArtDirection,
} from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

const AboutPage = ({ data }) => {
  const aboutPage = data?.allWpPage?.edges?.[0]?.node?.aboutPage

  const pageTitle = aboutPage?.pageTitle
  const aboutDrTitle = aboutPage?.aboutDrTitle
  const aboutDrSubtitle = aboutPage?.aboutDrSubtitle
  const aboutDrPara = aboutPage?.aboutDrPara

  const clinicalPhilosophyTitle = aboutPage?.clinicalPhilosophyTitle
  const clinicalPhilosophySubtitle = aboutPage?.clinicalPhilosophySubtitle
  const clinicalPhilosophyList = aboutPage?.clinicalPhilosophyList || []

  const comprehensiveTitle = aboutPage?.comprehensiveTitle
  const comprehensiveSubtitle = aboutPage?.comprehensiveSubtitle
  const comprehensiveList = aboutPage?.comprehensiveList || []

  const beyondTheClinicTitle = aboutPage?.beyondTheClinicTitle
  const beyondTheClinicSubtitle = aboutPage?.beyondTheClinicSubtitle
  const beyondTheClinicPara = aboutPage?.beyondTheClinicPara
  const beyondTheClinicImage = getImage(
    aboutPage?.beyondTheClinicImage?.node?.gatsbyImage
  )

  const aboutHeaderImageMob = getImage(
    aboutPage?.aboutHeaderImageMob?.node?.gatsbyImage
  )
  const aboutHeaderImageMobAlt =
    aboutPage?.aboutHeaderImageMob?.node?.altText || "About banner mobile"

  const aboutHeaderImageDesk = getImage(
    aboutPage?.aboutHeaderImageDesk?.node?.gatsbyImage
  )
  const aboutHeaderImageDeskAlt =
    aboutPage?.aboutHeaderImageDesk?.node?.altText || "About banner desktop"

  const aboutBannerImage =
    aboutHeaderImageDesk && aboutHeaderImageMob
      ? withArtDirection(aboutHeaderImageDesk, [
          {
            media: "(max-width: 767px)",
            image: aboutHeaderImageMob,
          },
        ])
      : aboutHeaderImageDesk || aboutHeaderImageMob

  const aboutBannerAlt =
    aboutHeaderImageDeskAlt || aboutHeaderImageMobAlt || "About banner"
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
            {/* {aboutHeaderImageMob && (
              <GatsbyImage
                image={aboutHeaderImageMob}
                alt={aboutHeaderImageMobAlt}
                className="hero-img hero-img--mobile"
                loading="eager"
              />
            )}

            {aboutHeaderImageDesk && (
              <GatsbyImage
                image={aboutHeaderImageDesk}
                alt={aboutHeaderImageDeskAlt}
                className="hero-img hero-img--desktop"
                loading="eager"
              />
            )} */}

            <div className="img-wrap">
              {aboutBannerImage && (
                <GatsbyImage
                  image={aboutBannerImage}
                  alt={aboutBannerAlt}
                  className="hero-img"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          {/* <div className="title-wrap">
            {aboutDrTitle && (
              <h2 className="title">
                {aboutDrTitle}
                {aboutDrSubtitle && (
                  <span
                    className="sub-title"
                    dangerouslySetInnerHTML={{ __html: aboutDrSubtitle }}
                  />
                )}
              </h2>
            )}
          </div> */}

          {aboutDrPara && (
            <div
              className="text-wrap"
              dangerouslySetInnerHTML={{ __html: aboutDrPara }}
            />
          )}
        </div>
      </section>

      <section className="clinical-philosophy">
        <div className="container">
          <div className="title-wrap">
            {clinicalPhilosophyTitle && (
              <h2 className="title">
                {clinicalPhilosophyTitle}
                {clinicalPhilosophySubtitle && (
                  <span
                    className="sub-title"
                    dangerouslySetInnerHTML={{
                      __html: clinicalPhilosophySubtitle,
                    }}
                  />
                )}
              </h2>
            )}
          </div>

          {clinicalPhilosophyList.length > 0 && (
            <div className="clinical-philosophy__layout">
              <ul className="clinical-philosophy__column">
                {clinicalPhilosophyList.slice(0, 2).map((item, index) => (
                  <li className="clinical-philosophy__card" key={index}>
                    {item?.title && (
                      <h3 dangerouslySetInnerHTML={{ __html: item.title }} />
                    )}
                    {item?.subtitle && (
                      <p dangerouslySetInnerHTML={{ __html: item.subtitle }} />
                    )}
                  </li>
                ))}
              </ul>

              <div className="clinical-philosophy__image">
                <StaticImage
                  src="../images/clinical-philosophy-sec.webp"
                  alt="Dr. Sushree Patra speaking with a patient"
                  placeholder="blurred"
                  loading="lazy"
                  quality={90}
                />
              </div>

              <ul className="clinical-philosophy__column">
                {clinicalPhilosophyList.slice(2, 4).map((item, index) => (
                  <li className="clinical-philosophy__card" key={index + 2}>
                    {item?.title && (
                      <h3 dangerouslySetInnerHTML={{ __html: item.title }} />
                    )}
                    {item?.subtitle && (
                      <p dangerouslySetInnerHTML={{ __html: item.subtitle }} />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="Comprehensive">
        <div className="container">
          <div className="title-wrap">
            {comprehensiveTitle && (
              <h2 className="title">
                {comprehensiveTitle}
                {comprehensiveSubtitle && (
                  <span
                    className="sub-title"
                    dangerouslySetInnerHTML={{ __html: comprehensiveSubtitle }}
                  />
                )}
              </h2>
            )}
          </div>

          {comprehensiveList.length > 0 && (
            <div className="section-wrap">
              <ul>
                {comprehensiveList.map((item, index) => {
                  const itemImage = getImage(item?.image?.node?.gatsbyImage)
                  const itemImageAlt =
                    item?.image?.node?.altText ||
                    `Comprehensive image ${index + 1}`

                  return (
                    <li key={index}>
                      <div className="left">
                        <div className="img">
                          {itemImage && (
                            <GatsbyImage image={itemImage} alt={itemImageAlt} />
                          )}
                        </div>
                      </div>

                      <div className="right">
                        {item?.paragraph && (
                          // <p
                          //   className="pragraph-wrap"
                          //   dangerouslySetInnerHTML={{ __html: item.paragraph }}
                          // />
                          <>
                            <p className="pragraph-wrap">
                              Beyond pregnancy and surgery, Dr. Patra manages a
                              wide spectrum of gynaecological conditions
                              including menstrual disorders, PCOS, fibroids,
                              endometriosis, infertility (primary and
                              secondary), and routine preventive care. 
                            </p>
                            <p className="pragraph-wrap">
                              She recognises that many women delay seeking help
                              for symptoms that deserve attention and aims to
                              create a space where concerns are addressed
                              without hesitation or judgment.
                            </p>
                          </>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* <section className="Beyond-the-Clinic">
        <div className="container">
          <div className="title-wrap">
            {beyondTheClinicTitle && (
              <h2 className="title">
                {beyondTheClinicTitle}

                {beyondTheClinicSubtitle && (
                  <span
                    className="sub-title"
                    dangerouslySetInnerHTML={{
                      __html: beyondTheClinicSubtitle,
                    }}
                  />
                )}
              </h2>
            )}
          </div>

          <div className="img-wrap">
            {beyondTheClinicImage && (
              <GatsbyImage
                image={beyondTheClinicImage}
                alt={beyondTheClinicTitle || "Beyond the Clinic"}
              />
            )}
          </div>

          {beyondTheClinicPara && (
            <div
              className="text-wrap"
              dangerouslySetInnerHTML={{ __html: beyondTheClinicPara }}
            />
          )}
        </div>
      </section> */}
    </Layout>
  )
}

export const query = graphql`
  query MyQuery {
    allWpPage(filter: { databaseId: { eq: 123 } }) {
      edges {
        node {
          aboutPage {
            pageTitle
            aboutDrPara
            aboutDrSubtitle
            aboutDrTitle

            clinicalPhilosophyTitle
            clinicalPhilosophySubtitle
            clinicalPhilosophyList {
              title
              subtitle
            }

            comprehensiveTitle
            comprehensiveSubtitle
            comprehensiveList {
              paragraph
              image {
                node {
                  altText
                  gatsbyImage(
                    layout: CONSTRAINED
                    quality: 90
                    width: 835
                    height: 400
                  )
                }
              }
            }

            beyondTheClinicTitle
            beyondTheClinicSubtitle
            beyondTheClinicPara
            beyondTheClinicImage {
              node {
                gatsbyImage(
                  height: 860
                  width: 1720
                  quality: 90
                  placeholder: BLURRED
                  layout: CONSTRAINED
                )
              }
            }

            aboutHeaderImageMob {
              node {
                altText
                gatsbyImage(
                  layout: CONSTRAINED
                  quality: 100
                  width: 767
                  height: 367
                )
              }
            }

            aboutHeaderImageDesk {
              node {
                altText
                gatsbyImage(
                  layout: CONSTRAINED
                  quality: 100
                  width: 1920
                  height: 650
                )
              }
            }
          }
        }
      }
    }
  }
`

export default AboutPage

export const Head = ({ location }) => (
  <Seo
    title="Dr. Sushree Patra | Obstetrician & Gynaecologist in Mira Road"
    pathname={location.pathname}
    description="Learn about Dr. Sushree Patra, a consultant obstetrician and gynaecologist specialising in pregnancy care, infertility and minimally invasive gynaecological surgery."
    keywords={[
      "Dr. Sushree Patra",
      "obstetrician gynaecologist Mira Road",
      "gynaecologist Mira Road",
      "infertility specialist Mira Road",
      "laparoscopic gynaecologist Mira Road",
      "women's health specialist",
    ]}
    schema={{
      "@context": "https://schema.org",
      "@type": "Physician",
      name: "Dr. Sushree Patra",
      url: "https://www.drsushreepatra.com/about/",
      medicalSpecialty: ["Obstetrics", "Gynecology"],
    }}
  />
)
