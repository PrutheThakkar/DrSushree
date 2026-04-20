import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";

const AboutPage = ({ data }) => {
  const aboutPage = data?.allWpPage?.edges?.[0]?.node?.aboutPage;

  const pageTitle = aboutPage?.pageTitle;
  const aboutDrTitle = aboutPage?.aboutDrTitle;
  const aboutDrSubtitle = aboutPage?.aboutDrSubtitle;
  const aboutDrPara = aboutPage?.aboutDrPara;

  const clinicalPhilosophyTitle = aboutPage?.clinicalPhilosophyTitle;
  const clinicalPhilosophySubtitle = aboutPage?.clinicalPhilosophySubtitle;
  const clinicalPhilosophyList = aboutPage?.clinicalPhilosophyList || [];

  const comprehensiveTitle = aboutPage?.comprehensiveTitle;
  const comprehensiveSubtitle = aboutPage?.comprehensiveSubtitle;
  const comprehensiveList = aboutPage?.comprehensiveList || [];

  const beyondTheClinicTitle = aboutPage?.beyondTheClinicTitle;
  const beyondTheClinicSubtitle = aboutPage?.beyondTheClinicSubtitle;
  const beyondTheClinicPara = aboutPage?.beyondTheClinicPara;
  const beyondTheClinicImage = getImage(
    aboutPage?.beyondTheClinicImage?.node?.gatsbyImage
  );

  const aboutHeaderImageMob = getImage(
    aboutPage?.aboutHeaderImageMob?.node?.gatsbyImage
  );
  const aboutHeaderImageMobAlt =
    aboutPage?.aboutHeaderImageMob?.node?.altText || "About banner mobile";

  const aboutHeaderImageDesk = getImage(
    aboutPage?.aboutHeaderImageDesk?.node?.gatsbyImage
  );
  const aboutHeaderImageDeskAlt =
    aboutPage?.aboutHeaderImageDesk?.node?.altText || "About banner desktop";

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
            {aboutHeaderImageMob && (
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
            )}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="title-wrap">
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
          </div>

          {aboutDrPara && (
            <div
              className="text-wrap"
              dangerouslySetInnerHTML={{ __html: aboutDrPara }}
            />
          )}
        </div>
      </section>

      <section className="Infertility about">
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
            <ul className="infertility-wrapper">
              {clinicalPhilosophyList.map((item, index) => (
                <li key={index}>
                  <div className="wrap">
                    {item?.title && (
                      <h3 dangerouslySetInnerHTML={{ __html: item.title }} />
                    )}
                    {item?.subtitle && (
                      <p dangerouslySetInnerHTML={{ __html: item.subtitle }} />
                    )}
                  </div>
                </li>
              ))}
            </ul>
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
                  const itemImage = getImage(item?.image?.node?.gatsbyImage);
                  const itemImageAlt =
                    item?.image?.node?.altText ||
                    `Comprehensive image ${index + 1}`;

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
                          <p
                            className="pragraph-wrap"
                            dangerouslySetInnerHTML={{ __html: item.paragraph }}
                          />
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="Beyond-the-Clinic">
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
      </section>
    </Layout>
  );
};

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
                  quality: 10
                  width: 10
                  height: 10
                )
              }
            }

            aboutHeaderImageDesk {
              node {
                altText
                gatsbyImage(
                  layout: CONSTRAINED
                  quality: 10
                  width: 1920
                  height: 1020
                )
              }
            }
          }
        }
      }
    }
  }
`;

export default AboutPage;