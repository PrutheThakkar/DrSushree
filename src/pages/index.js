import React, { useEffect, useLayoutEffect } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link, graphql } from "gatsby";
import Swiper from "swiper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Layout from "../components/layout";
import Obstetrics from "../components/Obstetrics";
import Gynaecology from "../components/Gynaecology";
import HerApproach from "../components/HerApproach";
import CareStages from "../components/care-stages";
import { initHomeAnimations, destroyHomeAnimations } from "../js/homeanim";


const IndexPage = ({ data }) => {
  const homePage = data?.allWpPage?.edges?.[0]?.node?.homePage;

  const homePageTitle = homePage?.homePageTitle;
  const mobImage = getImage(homePage?.homePageMobImage?.node?.gatsbyImage);
  const mobImageAlt = homePage?.homePageMobImage?.node?.altText;
  const deskImage = getImage(homePage?.homePageDeskImage?.node?.gatsbyImage);
  const deskImageAlt = homePage?.homePageDeskImage?.node?.altText;

  const womensHealthcareTitle = homePage?.womensHealthcareTitle;
  const womensHealthcareParagraph = homePage?.womensHealthcareParagraph;
  const womensHealthcareImage = getImage(
    homePage?.womensHealthcareImage?.node?.gatsbyImage
  );
  const womensHealthcareImageAlt =
    homePage?.womensHealthcareImage?.node?.altText;
  const womensHealthcareBottomPara = homePage?.womensHealthcareBottomPara;

  const obstetricsData = {
    obstetricsTitle: homePage?.obstetricsTitle,
    obstetricsSubtitle: homePage?.obstetricsSubtitle,
    obstetricsSwiper: homePage?.obstetricsSwiper,
  };

  const gynaecologyData = {
    gynaecologyTitle: homePage?.gynaecologyTitle,
    gynaecologySubtitle: homePage?.gynaecologySubtitle,
    gynaecologyAccordion: homePage?.gynaecologyAccordion,
  };

  const herApproachData = {
    herApproachTitle: homePage?.herApproachTitle,
    herApproachSubtitle: homePage?.herApproachSubtitle,
    herApproachList: homePage?.herApproachList || [],
  };

  const careStagesData = {
  careAcrossTitle: homePage?.careAcrossTitle,
  careAcrossPara: homePage?.careAcrossPara,
  careAcrossHorizontalSlider: homePage?.careAcrossHorizontalSlider || [],
};

  const benefitsTitle = homePage?.benefitsOfLaparoscopicTitle;
  const benefitsItems = homePage?.benefitsOfLaparoscopicSubtitle || [];

  const infertilityTitle = homePage?.infertilityTitle;
  const infertilitySubtitle = homePage?.infertilitySubtitle;
  const infertilityPara = homePage?.infertilityPara;
  const infertilityListnew = homePage?.infertilityListnew || [];

  useEffect(() => {
    let comprehensiveSwiper = null;

    if (
      typeof window !== "undefined" &&
      document.querySelector(".ComprehensiveSwiper")
    ) {
      comprehensiveSwiper = new Swiper(".ComprehensiveSwiper", {
        slidesPerView: 2,
        spaceBetween: 20,
        speed: 1500,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }

    return () => {
      if (comprehensiveSwiper) comprehensiveSwiper.destroy(true, true);
    };
  }, []);

  useLayoutEffect(() => {
  if (typeof window === "undefined") return;

  initHomeAnimations();

  return () => {
    destroyHomeAnimations();
  };
}, []);

  return (
    <Layout>
      <section className="banner-section">
        <div className="container">
          <div className="div-wrapper">
            <h1 dangerouslySetInnerHTML={{ __html: homePageTitle }} />
            <div className="btn-wrapper">
              <Link className="btn" to="/contact">
                Book An Appointment
              </Link>
            </div>
          </div>

          <div className="img-wrap">
            {mobImage && (
              <GatsbyImage
                image={mobImage}
                alt={mobImageAlt || "Personalised"}
                className="hero-img hero-img--mobile"
                loading="eager"
              />
            )}

            {deskImage && (
              <GatsbyImage
                image={deskImage}
                alt={deskImageAlt || "Personalised"}
                className="hero-img hero-img--tablet"
                loading="eager"
              />
            )}

            {deskImage && (
              <GatsbyImage
                image={deskImage}
                alt={deskImageAlt || "Personalised"}
                className="hero-img hero-img--desktop"
                loading="eager"
              />
            )}
          </div>
        </div>
      </section>

      <section className="Womens-Healthcare">
      
        <div className="title-wrap">
            <h2 className="title">
              {womensHealthcareTitle}
              <span className="sub-title">{womensHealthcareParagraph}</span>
            </h2>
          </div>

        <div className="img-wrap">
          {womensHealthcareImage && (
            <GatsbyImage
              image={womensHealthcareImage}
              alt={womensHealthcareImageAlt || "Women's Healthcare"}
            />
          )}
        </div>

        {womensHealthcareParagraph && (
          <p dangerouslySetInnerHTML={{ __html: womensHealthcareParagraph }} />
        )}

        {womensHealthcareBottomPara && (
          <p dangerouslySetInnerHTML={{ __html: womensHealthcareBottomPara }} />
        )}
      </section>

      <CareStages data={careStagesData} />

      <Obstetrics data={obstetricsData} />
 
      <Gynaecology data={gynaecologyData} />

      <section className="Benefits-laparoscopic">
        <div className="container">
          <h2>{benefitsTitle}</h2>

          <ul className="benef-wrapp">
            {benefitsItems.map((item, index) => {
              const image = getImage(item?.benefitsImage?.node?.gatsbyImage);
              const imageAlt = item?.benefitsImage?.node?.altText;

              return (
                <li key={index}>
                  <div className="img-wrap">
                    {image && (
                      <GatsbyImage
                        image={image}
                        alt={imageAlt || item?.benefitsTitle || "Benefit"}
                      />
                    )}
                  </div>

                  <div className="text-wrap">
                    <h3>{item?.benefitsTitle}</h3>
                    <p>{item?.benefitsSubtitle}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="Infertility">
        <div className="container">
          <div className="title-wrap">
            <h2 className="title">
              {infertilityTitle}
              <span className="sub-title">{infertilitySubtitle}</span>
            </h2>
          </div>

          <ul className="infertility-wrapper">
            {infertilityListnew.map((item, index) => (
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

          {infertilityPara && (
            <p
              className="content"
              dangerouslySetInnerHTML={{ __html: infertilityPara }}
            />
          )}
        </div>
      </section>

      <HerApproach data={herApproachData} />
    </Layout>
  );
};

export const query = graphql`
  query MyQuery {
    allWpPage(filter: { databaseId: { eq: 118 } }) {
      edges {
        node {
          homePage {
            homePageTitle

            homePageMobImage {
              node {
                altText
                gatsbyImage(layout: FULL_WIDTH, quality: 90, width: 767)
                mediaItemUrl
                slug
              }
            }

            homePageDeskImage {
              node {
                altText
                gatsbyImage(layout: FULL_WIDTH, quality: 90, width: 1920)
                mediaItemUrl
                slug
              }
            }

            womensHealthcareTitle

            womensHealthcareParagraph
            womensHealthcareImage {
              node {
                altText
                gatsbyImage(
                  layout: FULL_WIDTH
                  quality: 90
                  width: 1920
                  height: 839
                )
                mediaItemUrl
                slug
              }
            }

            womensHealthcareBottomPara

            obstetricsTitle
            obstetricsSubtitle
            obstetricsSwiper {
              slideImage {
                node {
                  altText
                  gatsbyImage(
                    layout: FULL_WIDTH
                    quality: 90
                    width: 1720
                    height: 767
                  )
                  mediaItemUrl
                  slug
                }
              }
              slideTitle
            }

            gynaecologyTitle
            gynaecologySubtitle
            gynaecologyAccordion {
              title
              paragraph
              image {
                node {
                  altText
                  gatsbyImage(
                    layout: FULL_WIDTH
                    quality: 90
                    width: 825
                    height: 533
                  )
                  mediaItemUrl
                  slug
                }
              }
            }

            benefitsOfLaparoscopicTitle
            benefitsOfLaparoscopicSubtitle {
              benefitsTitle
              benefitsSubtitle
              fieldGroupName
              benefitsImage {
                node {
                  altText
                  gatsbyImage(
                    layout: FULL_WIDTH
                    quality: 90
                    width: 395
                    height: 395
                  )
                  mediaItemUrl
                  slug
                }
              }
            }

            infertilityTitle
            infertilitySubtitle
            infertilityPara
            infertilityListnew {
              fieldGroupName
              title
              subtitle
            }

            herApproachTitle
            herApproachSubtitle
            herApproachList {
              herApproachTitle
              herApproachSubtitle
              herApproachImage {
                node {
                  altText
                  gatsbyImage(
                    layout: CONSTRAINED
                    quality: 90
                    width: 825
                    height: 533
                  )
                  mediaItemUrl
                  slug
                }
              }
            }

            careAcrossTitle
            careAcrossPara
            careAcrossHorizontalSlider {
              sectionImage {
                node {
                  altText
                  gatsbyImage(
                    layout: CONSTRAINED
                    quality: 90
                    width: 500
                    height: 600
                  )
                  mediaItemUrl
                  slug
                }
              }
              sectionTitle
              sectionSubTitle
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;