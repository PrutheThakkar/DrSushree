import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import AppointmentForm from "../components/AppointmentForm";

const ContactPage = ({ data }) => {
  const contactPage = data?.allWpPage?.edges?.[0]?.node?.contact;

  const contactPageTitle = contactPage?.contactPageTitle || "Contact";
  const contactPageSubtitle =
    contactPage?.contactPageSubtitle ||
    "We're here to help — book appointments or send questions";
  const email = contactPage?.email || "info@example.com";
  const phone = contactPage?.phone || "+91 99999 99999";
  const clinicAddress =
    contactPage?.clinicAddress || "Wockhardt Hospitals, Mira Road";

  const contactBannerDesk = getImage(
    contactPage?.contactBannerDesk?.node?.gatsbyImage
  );
  const contactBannerDeskAlt =
    contactPage?.contactBannerDesk?.node?.altText || "Contact banner desktop";

  const contactBannerMob = getImage(
    contactPage?.contactBannerMob?.node?.gatsbyImage
  );
  const contactBannerMobAlt =
    contactPage?.contactBannerMob?.node?.altText || "Contact banner mobile";

  return (
    <Layout>
      <section className="inner-banner-section">
        <div className="container">
          <div className="div-wrapper">
            <h1>{contactPageTitle}</h1>
          </div>

          <div className="img-wrap">
            {contactBannerMob && (
              <GatsbyImage
                image={contactBannerMob}
                alt={contactBannerMobAlt}
                className="hero-img hero-img--mobile"
                loading="eager"
              />
            )}

            {contactBannerDesk && (
              <GatsbyImage
                image={contactBannerDesk}
                alt={contactBannerDeskAlt}
                className="hero-img hero-img--desktop"
                loading="eager"
              />
            )}
          </div>
        </div>
      </section>

      <section className="Contact-section contact-page">
        <div className="container">
          <div className="title-wrap">
            <h2 className="title">
              Reach Out
              <span className="sub-title">{contactPageSubtitle}</span>
            </h2>
          </div>

          <div className="contact-grid">
            <div className="contact-form-wrap">
              <AppointmentForm />
            </div>

            <div className="contact-info">
              <div className="info-block">
                <h3>Clinic Address</h3>
                <p>{clinicAddress}</p>
              </div>

              <div className="info-block">
                <h3>Email</h3>
                <p>
                  <a href={`mailto:${email}`}>{email}</a>
                </p>
              </div>

              <div className="info-block">
                <h3>Phone</h3>
                <p>
                  <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
                </p>
              </div>

              <div className="map-wrap">
                <GatsbyImage
                  image={contactBannerDesk || contactBannerMob}
                  alt="Clinic visual"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query ContactPageQuery {
    allWpPage(filter: { databaseId: { eq: 463 } }) {
      edges {
        node {
          contact {
            contactPageTitle
            contactPageSubtitle
            email
            fieldGroupName
            phone
            clinicAddress

            contactBannerDesk {
              node {
                altText
                gatsbyImage(layout: FULL_WIDTH, quality: 90, width: 1920)
                mediaItemUrl
                slug
              }
            }

            contactBannerMob {
              node {
                altText
                gatsbyImage(layout: FULL_WIDTH, quality: 90, width: 767)
                mediaItemUrl
                slug
              }
            }
          }
        }
      }
    }
  }
`;

export default ContactPage;