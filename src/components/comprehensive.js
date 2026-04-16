import React, { useEffect } from "react";
import { StaticImage } from "gatsby-plugin-image";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const ComprehensiveHealthCare = () => {
  useEffect(() => {
    // Initialize Swiper
    const swiper = new Swiper(".ComprehensiveSwiper", {
      slidesPerView: 2,
      spaceBetween: 20, // optional, for spacing
      speed: 1500, // smooth transition
      modules: [Navigation],
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    // Cleanup swiper on component unmount
    return () => {
      if (swiper) swiper.destroy();
    };
  }, []);

  return (
    <section className="Comprehensive">
      <div className="container">
        <h2>Comprehensive Women’s Health Care</h2>

        {/* Swiper */}
        <div className="swiper ComprehensiveSwiper">
          <div className="swiper-wrapper">
            {/* Slide 1 */}
            <div className="swiper-slide">
              <div className="img-wrap">
                <StaticImage
                  src="../images/Irregular-or-heavy.jpg"
                  alt="Irregular or heavy menstrual cycles"
                  placeholder="blurred"
                  width={835}
                  height={533}
                />
              </div>
              <div className="text-wrap">
                <h3>Irregular or heavy menstrual cycles</h3>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="swiper-slide">
              <div className="img-wrap">
                <StaticImage
                  src="../images/Painful-periods.jpg"
                  alt="Painful periods"
                  placeholder="blurred"
                  width={835}
                  height={533}
                />
              </div>
              <div className="text-wrap">
                <h3>Painful periods</h3>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="swiper-slide">
              <div className="img-wrap">
                <StaticImage
                  src="../images/PCOS.jpg"
                  alt="PCOS"
                  placeholder="blurred"
                 width={835}
                  height={533}
                />
              </div>
              <div className="text-wrap">
                <h3>PCOS</h3>
              </div>
            </div>

            {/* Slide 4 */}
            <div className="swiper-slide">
              <div className="img-wrap">
                <StaticImage
                  src="../images/Fibroids-endometriosis.jpg"
                  alt="Fibroids and endometriosis"
                  placeholder="blurred"
                  width={835}
                  height={533}
                />
              </div>
              <div className="text-wrap">
                <h3>Fibroids & Endometriosis</h3>
              </div>
            </div>

            {/* Slide 5 */}
            <div className="swiper-slide">
              <div className="img-wrap">
                <StaticImage
                  src="../images/Vaginal-infections.jpg"
                  alt="Vaginal infections"
                  placeholder="blurred"
                   width={835}
                  height={533}
                />
              </div>
              <div className="text-wrap">
                <h3>Vaginal infections</h3>
              </div>
            </div>

            {/* Slide 6 */}
            <div className="swiper-slide">
              <div className="img-wrap">
                <StaticImage
                  src="../images/Pelvic-pain.jpg"
                  alt="Pelvic pain"
                  placeholder="blurred"
                  width={835}
                  height={533}
                />
              </div>
              <div className="text-wrap">
                <h3>Pelvic pain</h3>
              </div>
            </div>

            {/* Slide 7 */}
            <div className="swiper-slide">
              <div className="img-wrap">
                <StaticImage
                  src="../images/Routine-preventive.jpg"
                  alt="Routine preventive care"
                  placeholder="blurred"
                  width={835}
                  height={533}
                />
              </div>
              <div className="text-wrap">
                <h3>Routine preventive care</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="navigation">
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      </div>
    </section>
  );
};

export default ComprehensiveHealthCare;