import React, { useEffect, useRef, useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Swiper from "swiper";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Gynaecology = ({ data }) => {
  const gynaecologyTitle = data?.gynaecologyTitle;
  const gynaecologySubtitle = data?.gynaecologySubtitle;
  const gynaecologyAccordion = data?.gynaecologyAccordion || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsRef = useRef([]);
  const imagesRef = useRef([]);

  // Switch image and text based on index
  const switchTo = (index) => {
    if (index === currentIndex) return;

    // Outgoing animation
    if (imagesRef.current[currentIndex]) {
      imagesRef.current[currentIndex].classList.remove("procedure-images__img-wrap--active");
      imagesRef.current[currentIndex].classList.add("procedure-images__img-wrap--leaving");
      itemsRef.current[currentIndex].classList.remove("procedure-list__item--active");
    }

    const prev = imagesRef.current[currentIndex];
    if (prev) {
      prev.addEventListener("transitionend", () => {
        prev.classList.remove("procedure-images__img-wrap--leaving");
      }, { once: true });
    }

    setCurrentIndex(index);

    // Incoming animation
    if (imagesRef.current[index]) {
      imagesRef.current[index].classList.add("procedure-images__img-wrap--active");
      itemsRef.current[index].classList.add("procedure-list__item--active");
    }
  };

  // Initialize Swiper for mobile slider
  useEffect(() => {
    const swiper = new Swiper(".gynaecology-mob-swiper", {
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      speed: 1500,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      modules: [Autoplay, Pagination, EffectFade],
    });

    return () => {
      if (swiper) swiper.destroy();
    };
  }, []);

  return (
    <section className="gynaecology-section">
      <div className="container">
        <div className="title-wrap">
          <h2 className="title">
            {gynaecologyTitle}
            <span className="subtitle">{gynaecologySubtitle}</span>
          </h2>
        </div>

        <div className="gynaecology-section__content">
          {/* Left: Procedure List */}
          <ul className="procedure-list">
            {gynaecologyAccordion.map((item, index) => (
              <li
                key={index}
                ref={(el) => itemsRef.current[index] = el}
                className={`procedure-list__item ${index === 0 ? "procedure-list__item--active" : ""}`}
                onMouseEnter={() => switchTo(index)}
              >
                <div className="procedure-list__inner">
                  <span className="procedure-list__marker"></span>
                  <div className="procedure-list__text">
                  

                    <h3
                          className="procedure-list__name"
                          dangerouslySetInnerHTML={{
                            __html: item?.title,
                          }}
                        />
                    
                    <p
                        className="procedure-list__desc"
                          dangerouslySetInnerHTML={{
                            __html: item?.paragraph,
                          }}
                        />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Right: Image Stack */}
          <div className="procedure-images">
            <div className="procedure-images__frame">
              {gynaecologyAccordion.map((item, index) => {
                const image = getImage(item?.image?.node?.gatsbyImage);
                const imageAlt = item?.image?.node?.altText;
                return (
                  <div
                    key={index}
                    ref={(el) => imagesRef.current[index] = el}
                    className={`procedure-images__img-wrap ${index === 0 ? "procedure-images__img-wrap--active" : ""}`}
                    data-index={index}
                  >
                    {image && (
                      <GatsbyImage
                        image={image}
                        alt={imageAlt || item?.title || "Gynaecology"}
                        width={600}
                        height={400}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Swiper */}
        <div className="swiper gynaecology-mob-swiper">
          <div className="swiper-wrapper">
            {gynaecologyAccordion.map((item, index) => {
              const image = getImage(item?.image?.node?.gatsbyImage);
              const imageAlt = item?.image?.node?.altText;
              return (
                <div className="swiper-slide" key={index}>
                  <div className="img-wrap">
                    {image && (
                      <GatsbyImage
                        image={image}
                        alt={imageAlt || item?.title || "Gynaecology"}
                      />
                    )}
                  </div>
                  <div className="text-wrap">
                    <div className="wrap">
                      <h3>{item?.title}</h3>
                      <p className="img-title">{item?.paragraph}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
};

export default Gynaecology;