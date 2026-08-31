import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage, withArtDirection } from "gatsby-plugin-image"
import Layout from "../components/layout"
import AppointmentForm from "../components/AppointmentForm"
import Seo from "../components/seo"
import contactLeftImage from "../images/contact-left-img.webp"

const ContactPage = ({ data }) => {
  const contactPage = data?.allWpPage?.edges?.[0]?.node?.contact

  const contactPageTitle =
    contactPage?.pageTitle || contactPage?.contactPageTitle || "Contact"

  const contactPageSubtitle =
    contactPage?.contactPageSubtitle ||
    "We're here to help — book appointments or send questions"

  const contactBannerDesk = getImage(
    contactPage?.contactBannerDesk?.node?.gatsbyImage
  )

  const contactBannerMob = getImage(
    contactPage?.contactBannerMob?.node?.gatsbyImage
  )

  const contactBannerAlt =
    contactPage?.contactBannerDesk?.node?.altText ||
    contactPage?.contactBannerMob?.node?.altText ||
    "Contact banner"

  const contactBannerImage =
    contactBannerDesk && contactBannerMob
      ? withArtDirection(contactBannerDesk, [
          {
            media: "(max-width: 767px)",
            image: contactBannerMob,
          },
        ])
      : contactBannerDesk || contactBannerMob

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
              Contact
              <span className="sub-title">{contactPageSubtitle}</span>
            </h2>
          </div>

          <div className="contact-grid">
            <div className="contact-image-wrap">
              <img
                src={contactLeftImage}
                alt="Women's health and fertility care"
              />
            </div>

            <div className="contact-form-wrap">
              <AppointmentForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

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
`

export default ContactPage

export const Head = ({ location }) => (
  <Seo
    title="Contact Dr. Sushree Patra | Gynaecologist in Mira Road"
    pathname={location.pathname}
    description="Contact Dr. Sushree Patra at Wockhardt Hospitals, Mira Road for pregnancy, infertility, gynaecology and women's health consultations."
    keywords={[
      "Dr. Sushree Patra contact",
      "Dr. Sushree Patra appointment",
      "gynaecologist Mira Road contact",
      "obstetrician Mira Road appointment",
      "pregnancy doctor Mira Road",
    ]}
    schema={{
      "@context": "https://schema.org",
      "@type": ["Physician", "MedicalBusiness"],
      name: "Dr. Sushree Patra",
      url: "https://www.drsushreepatra.com/contact/",
      telephone: "+91 8249321325",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Wockhardt Hospitals, Evershine Road",
        addressLocality: "Mira Road East",
        addressRegion: "Maharashtra",
        postalCode: "401107",
        addressCountry: "IN",
      },
    }}
  />
)
