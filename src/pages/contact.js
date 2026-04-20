import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../components/layout";

const ContactPage = () => {
  return (
    <Layout>
      <section className="inner-banner-section">
        <div className="container">
          <div className="div-wrapper">
            <h1>Contact</h1>
          </div>

          <div className="img-wrap">
            <StaticImage
              src="https://drsushree.studiosentientdemo.com/wp-content/uploads/2026/04/obstetrics-header-desk_converted.webp"
              alt="Personalised"
              className="hero-img"
              placeholder="blurred"
              layout="fullWidth"
            />
          </div>
        </div>
      </section>

      <section className="Contact-section contact-page">
        <div className="container">
          <div className="title-wrap">
            <h2 className="title">
              Reach Out
              <span className="sub-title">
                We&apos;re here to help — book appointments or send questions
              </span>
            </h2>
          </div>

          <div className="contact-grid">
            <div className="contact-form-wrap">
              <form className="contact-form" action="#" method="post" noValidate>
                <div className="form-row">
                  <label htmlFor="name">Full name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="form-row two-col">
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 9XXXXXXXXX"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    placeholder="Tell us briefly why you're reaching out"
                  ></textarea>
                </div>

                <div className="form-row">
                  <button className="btn submit-btn" type="submit">
                    Send message
                  </button>
                </div>
              </form>
            </div>

            <div className="contact-info">
              <div className="info-block">
                <h3>Clinic Address</h3>
                <p>Wockhardt Hospitals, Mira Road</p>
              </div>

              <div className="info-block">
                <h3>Email</h3>
                <p>
                  <a href="mailto:info@example.com">info@example.com</a>
                </p>
              </div>

              <div className="info-block">
                <h3>Phone</h3>
                <p>
                  <a href="tel:+919999999999">+91 99999 99999</a>
                </p>
              </div>

              <div className="map-wrap">
                <StaticImage
                  src="../images/contact-map.jpg"
                  alt="Map placeholder"
                  placeholder="blurred"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;