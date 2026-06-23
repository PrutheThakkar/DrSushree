import React from "react";
import { graphql } from "gatsby";
import {
  GatsbyImage,
  getImage,
  withArtDirection,
} from "gatsby-plugin-image";
import Layout from "../components/layout";
import AppointmentForm from "../components/AppointmentForm";

const ContactPage = ({ data }) => {
  const contactPage = data?.allWpPage?.edges?.[0]?.node?.contact;

  const contactPageTitle =
    contactPage?.pageTitle || contactPage?.contactPageTitle || "Contact";

  const contactPageSubtitle =
    contactPage?.contactPageSubtitle ||
    "We're here to help — book appointments or send questions";

  const email = contactPage?.email || "drsushreeappoinments@gmail.com";
  const phone = contactPage?.phone || "+91 8249321325";

  const clinicAddress =
    contactPage?.clinicAddress || "Wockhardt Hospitals, Mira Road";

  const contactBannerDesk = getImage(
    contactPage?.contactBannerDesk?.node?.gatsbyImage
  );

  const contactBannerMob = getImage(
    contactPage?.contactBannerMob?.node?.gatsbyImage
  );

  const contactBannerAlt =
    contactPage?.contactBannerDesk?.node?.altText ||
    contactPage?.contactBannerMob?.node?.altText ||
    "Contact banner";

  const contactBannerImage =
    contactBannerDesk && contactBannerMob
      ? withArtDirection(contactBannerDesk, [
          {
            media: "(max-width: 767px)",
            image: contactBannerMob,
          },
        ])
      : contactBannerDesk || contactBannerMob;

  return (
    <Layout>
      <section className="inner-banner-section">
        <div className="container">
          <div className="div-wrapper">
            {contactPageTitle && (
              <h1 dangerouslySetInnerHTML={{ __html: contactPageTitle }} />
            )}
          </div>

          <div className="img-wrap">
            {contactBannerImage && (
              <GatsbyImage
                image={contactBannerImage}
                alt={contactBannerAlt}
                className="hero-img"
                loading="eager"
                decoding="async"
                fetchPriority="high"
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
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KSfyAk1PsOc7MX9gPf6DZPcD&daddr=Wockhardt+Hospitals,+Institute+of+Medical+Science+and+Research,+Evershine+Rd,+near+Mira+Road+Railway+Station,+Naya+Nagar,+Mira+Road+East,+Mira+Bhayandar,+Maharashtra+401107"
                >
                  {clinicAddress}
                </a>
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
            pageTitle
            contactPageTitle
            contactPageSubtitle
            email
            fieldGroupName
            phone
            clinicAddress

            contactBannerDesk {
              node {
                altText
                gatsbyImage(
                  layout: FULL_WIDTH
                  quality: 100
                  width: 1600
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }

            contactBannerMob {
              node {
                altText
                gatsbyImage(
                  layout: FULL_WIDTH
                  quality: 100
                  width: 767
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

export default ContactPage;