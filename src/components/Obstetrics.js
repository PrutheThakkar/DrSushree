import React, { useEffect } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Swiper from "swiper";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Obstetrics = ({ data }) => {
  const obstetricsTitle = data?.obstetricsTitle;
  const obstetricsSubtitle = data?.obstetricsSubtitle;
  const obstetricsSwiper = data?.obstetricsSwiper || [];

  useEffect(() => {
    // Initialize Swiper only once the component has mounted
    const swiper = new Swiper(".ObstetricsSwiper", {
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
      modules: [Pagination, EffectFade, Autoplay],
      loop: true,
    });

    return () => {
      if (swiper) swiper.destroy(); // Clean up swiper instance on unmount
    };
  }, []);

  return (
    <section className="Obstetrics">
      <div className="container">
        <div className="title-wrap">
          <h2 className="title">
            {obstetricsTitle}
            <span className="subtitle">{obstetricsSubtitle}</span>
          </h2>
        </div>

        <div className="swiper ObstetricsSwiper">
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
                        width={1720}
                        height={767}
                      />
                    )}
                  </div>
                 <span dangerouslySetInnerHTML={{ __html: slide?.slideTitle }} />
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

export default Obstetrics;