import React, { useEffect, useRef } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Swiper from "swiper";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Obstetrics = ({ data }) => {
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstance = useRef(null);

  const obstetricsTitle = data?.obstetricsTitle || "";
  const obstetricsSubtitle = data?.obstetricsSubtitle || "";
  const obstetricsSwiper = data?.obstetricsSwiper || [];

  useEffect(() => {
    if (!sliderRef.current || !paginationRef.current || !obstetricsSwiper.length) {
      return;
    }

    if (swiperInstance.current) {
      swiperInstance.current.destroy(true, true);
      swiperInstance.current = null;
    }

    swiperInstance.current = new Swiper(sliderRef.current, {
      modules: [Pagination, EffectFade, Autoplay],
      slidesPerView: 1,
      loop: obstetricsSwiper.length > 1,
      speed: 1500,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      // autoplay: {
      //   delay: 3500,
      //   disableOnInteraction: false,
      // },
      pagination: {
        el: paginationRef.current,
        clickable: true,
      },
      observer: true,
      observeParents: true,
    });

    return () => {
      if (swiperInstance.current) {
        swiperInstance.current.destroy(true, true);
        swiperInstance.current = null;
      }
    };
  }, [obstetricsSwiper]);

  if (!obstetricsSwiper.length) return null;

  return (
    <section className="Obstetrics">
      <div className="container">
        <div className="title-wrap">
          <h2 className="title">
            {obstetricsTitle}
            <span className="subtitle">{obstetricsSubtitle}</span>
          </h2>
        </div>

        <div className="swiper ObstetricsSwiper" ref={sliderRef}>
          <div className="swiper-wrapper">
            {obstetricsSwiper.map((slide, index) => {
              const slideImage = getImage(slide?.slideImage?.node?.gatsbyImage);
              const slideAlt = slide?.slideImage?.node?.altText;

              return (
                <div className="swiper-slide" key={index}>
                  <div className="img-wrap">
                    {slideImage && (
                      <GatsbyImage
                        image={slideImage}
                        alt={slideAlt || slide?.slideTitle || "Obstetrics"}
                        className="obstetrics-slide-image"
                      />
                    )}
                  </div>

                  {slide?.slideTitle && (
                    <span
                      className="slide-title"
                      dangerouslySetInnerHTML={{ __html: slide.slideTitle }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="swiper-pagination" ref={paginationRef}></div>
      </div>
    </section>
  );
};

export default Obstetrics;