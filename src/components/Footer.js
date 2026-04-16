// src/components/Footer.js

import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

const Footer = () => {
  return (
    <footer>
      <div className="footer-top">
        <div className="img-wrap">
          <StaticImage src="../images/footer-img.jpg" alt="footer-top-img" />
        </div>
        <div className="text-wrap">
          <h2>
            Every woman deserves care that listens,
            <br />
            Book your appointment with Dr. Sushree today
          </h2>
          <div className="btn-wrapper">
            <a className="btn" href="#">Book An Appointment</a>
          </div>
        </div>
      </div>
      <div className="footer-wrap">
        <div className="left">
          <div className="col-1">
            <div className="footer-logo">
              <StaticImage src="../images/site-logo.svg" alt="footer-logo" />
            </div>
            <div className="text-wrap">
              <p>
                Dr. Sushree Patra is a dedicated gynaecologist <br />
                committed to providing compassionate and <br />
                evidence-based care.
              </p>
              <div className="social-icons">
                <ul>
                  <li>
                    <a href="#">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99883 2.40039C2.40039 2.40039 2.40039 2.40039 2.40039 8.00195V16.002C2.40039 21.6004 2.40039 21.6004 8.00195 21.6004H16.002C21.6004 21.6004 21.6004 21.6004 21.6004 15.9988V7.99883C21.6004 2.40039 21.6004 2.40039 15.9988 2.40039H7.99883ZM17.6004 5.60039C18.042 5.60039 18.4004 5.95879 18.4004 6.40039C18.4004 6.84199 18.042 7.20039 17.6004 7.20039C17.1588 7.20039 16.8004 6.84199 16.8004 6.40039C16.8004 5.95879 17.1588 5.60039 17.6004 5.60039ZM12.0004 7.20039C14.6476 7.20039 16.8004 9.35319 16.8004 12.0004C16.8004 14.6476 14.6476 16.8004 12.0004 16.8004C9.35319 16.8004 7.20039 14.6476 7.20039 12.0004C7.20039 9.35319 9.35319 7.20039 12.0004 7.20039ZM12.0004 8.80039C11.1517 8.80039 10.3378 9.13753 9.73765 9.73765C9.13753 10.3378 8.80039 11.1517 8.80039 12.0004C8.80039 12.8491 9.13753 13.663 9.73765 14.2631C10.3378 14.8632 11.1517 15.2004 12.0004 15.2004C12.8491 15.2004 13.663 14.8632 14.2631 14.2631C14.8632 13.663 15.2004 12.8491 15.2004 12.0004C15.2004 11.1517 14.8632 10.3378 14.2631 9.73765C13.663 9.13753 12.8491 8.80039 12.0004 8.80039Z" fill="#5F8F7A" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.1992 3.2002H4.79922C3.91522 3.2002 3.19922 3.9162 3.19922 4.8002V19.2002C3.19922 20.0842 3.91522 20.8002 4.79922 20.8002H19.1992C20.0832 20.8002 20.7992 20.0842 20.7992 19.2002V4.8002C20.7992 3.9162 20.0832 3.2002 19.1992 3.2002ZM8.76242 17.6002H6.40242V10.0066H8.76242V17.6002ZM7.55842 8.921C6.79762 8.921 6.18242 8.3042 6.18242 7.545C6.18242 6.7858 6.79842 6.1698 7.55842 6.1698C8.31682 6.1698 8.93362 6.7866 8.93362 7.545C8.93362 8.3042 8.31682 8.921 7.55842 8.921ZM17.6024 17.6002H15.244V13.9074C15.244 13.0266 15.228 11.8938 14.0176 11.8938C12.7896 11.8938 12.6008 12.853 12.6008 13.8434V17.6002H10.2424V10.0066H12.5064V11.0442H12.5384C12.8536 10.4474 13.6232 9.8178 14.7712 9.8178C17.1608 9.8178 17.6024 11.3906 17.6024 13.4354V17.6002Z" fill="#5F8F7A" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="col col-2">
            <ul>
              <li><Link to="#">Home</Link></li>
              <li><Link to="#">About</Link></li>
              <li><Link to="#">Obstetrics</Link></li>
              <li><Link to="#">Gynaecology</Link></li>
              <li><Link to="#">Infertility</Link></li>
            </ul>
          </div>
          <div className="col col-3">
            <ul>
              <li><Link to="#">Explore</Link></li>
              <li><Link to="#">Blog</Link></li>
              <li><Link to="#">FAQ</Link></li>
            </ul>
          </div>
          <div className="col col-4">
            <ul>
              <li>
                <p>Reach Out</p>
              </li>
              <li>
                <a href="#">Wockhardt Hospitals, Mira Road</a>
              </li>
              <li>
                <a href="#">Email Us</a>
              </li>
              <li>
                <a href="#">Call Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer