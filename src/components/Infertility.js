import React, { useEffect, useRef } from "react";
import { StaticImage } from "gatsby-plugin-image";
import Swiper from "swiper";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";


const Infertility = () => {
  const tabsRef = useRef([]);
  const swiperRef = useRef(null);
  const herItemsRef = useRef([]);
  const herImagesRef = useRef([]);

  useEffect(() => {
    // Initialize Swiper
    const swipertab = new Swiper('.infertility-swiper', {
      loop: false,
      speed: 850,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      modules: [Autoplay, EffectFade, Pagination],
      on: {
        slideChange() {
          updateUI(this.realIndex);
        }
      }
    });

    swiperRef.current = swipertab;

    // Handle tab clicks
    tabsRef.current.forEach((tab) => {
      tab.addEventListener('click', () => {
        swipertab.slideTo(Number(tab.dataset.index));
      });
    });

    // Her approach section logic
    let herCurrent = 0;

    const herSwitchTo = (index) => {
      if (index === herCurrent) return;

      // Outgoing
      herImagesRef.current[herCurrent].classList.remove('her-images__img-wrap--active');
      herImagesRef.current[herCurrent].classList.add('her-images__img-wrap--leaving');
      herItemsRef.current[herCurrent].classList.remove('her-list__item--active');

      const prev = herImagesRef.current[herCurrent];
      prev.addEventListener('transitionend', () => {
        prev.classList.remove('her-images__img-wrap--leaving');
      }, { once: true });

      herCurrent = index;

      // Incoming
      herImagesRef.current[herCurrent].classList.add('her-images__img-wrap--active');
      herItemsRef.current[herCurrent].classList.add('her-list__item--active');
    };

    // Handle her items mouseenter event
    herItemsRef.current.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        herSwitchTo(Number(item.dataset.index));
      });
    });

    return () => {
      if (swipertab) swipertab.destroy(); // Clean up Swiper instance
    };
  }, []);

  const updateUI = (index) => {
    tabsRef.current.forEach((tab) => tab.classList.remove("active"));
    tabsRef.current[index].classList.add("active");
  };

  return (
    <section className="infertility-section">
      <div className="container">
        <h2 className="infertility-section__title">
          Infertility - Medical Management of Primary & Secondary Infertility
        </h2>

        {/* Tabs for the slides */}
        <ul className="infertility-tabs">
          <li
            ref={(el) => (tabsRef.current[0] = el)}
            className="infertility-tabs__item active"
            data-index="0"
          >
            <h3>Hormonal Assessment</h3>
          </li>
          <li
            ref={(el) => (tabsRef.current[1] = el)}
            className="infertility-tabs__item"
            data-index="1"
          >
            <h3>Ovulation Tracking</h3>
          </li>
          <li
            ref={(el) => (tabsRef.current[2] = el)}
            className="infertility-tabs__item"
            data-index="2"
          >
            <h3>Metabolic & Lifestyle Correction</h3>
          </li>
          <li
            ref={(el) => (tabsRef.current[3] = el)}
            className="infertility-tabs__item"
            data-index="3"
          >
            <h3>Ovulation Induction Where Indicated</h3>
          </li>
        </ul>

        {/* Swiper for images */}
        <div className="swiper infertility-swiper">
          <div className="swiper-wrapper">
            {/* Slide 1 */}
            <div className="swiper-slide">
              <StaticImage
                src="../images/Hormonal-assessment.jpg"
                alt="Hormonal Assessment"
                placeholder="blurred"
                width={600}
                height={400}
              />
            </div>
            {/* Slide 2 */}
            <div className="swiper-slide">
              <StaticImage
                src="../images/Ovulation-tracking.jpg"
                alt="Ovulation Tracking"
                placeholder="blurred"
                width={600}
                height={400}
              />
            </div>
            {/* Slide 3 */}
            <div className="swiper-slide">
              <StaticImage
                src="../images/Metabolic-lifestyle.jpg"
                alt="Metabolic and Lifestyle Correction"
                placeholder="blurred"
                width={600}
                height={400}
              />
            </div>
            {/* Slide 4 */}
            <div className="swiper-slide">
              <StaticImage
                src="../images/Ovulation-induction.jpg"
                alt="Ovulation Induction"
                placeholder="blurred"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>

        <h3 className="infertility-section__desc visible">
          The focus is on identifying root causes early and guiding couples through appropriate,
          evidence-based treatment pathways with sensitivity and transparency.
        </h3>
      </div>
    </section>
  );
};

export default Infertility;