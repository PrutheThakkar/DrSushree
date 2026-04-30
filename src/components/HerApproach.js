import React, { useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const HerApproach = ({ data }) => {
  const herApproachTitle = data?.herApproachTitle || "";
  const herApproachSubtitle = data?.herApproachSubtitle || "";
  const herApproachList = data?.herApproachList || [];
  const [activeIndex, setActiveIndex] = useState(0);

  if (!herApproachList.length) return null;

  return (
    <section className="Her-Approach">
      <div className="container">
        <div className="title-wrap">
          <h2 className="title">
            {herApproachTitle}
            <span className="subtitle">{herApproachSubtitle}</span>
          </h2>
        </div>

        <div className="her-approach__content">
          <ul className="her-list">
            {herApproachList.map((item, index) => (
              <li
                key={index}
                className={`her-list__item ${
                  activeIndex === index ? "her-list__item--active" : ""
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                <div className="her-list__inner">
                  <span className="her-list__marker"></span>
                  <div className="her-list__text">
                   <h3
                          className="her-list__name"
                          dangerouslySetInnerHTML={{
                            __html: item?.herApproachTitle,
                          }}
                        />
                    
                    <p
                        
                          dangerouslySetInnerHTML={{
                            __html: item?.herApproachSubtitle,
                          }}
                        />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="her-images">
            <div className="her-images__frame">
              {herApproachList.map((item, index) => {
                const image = getImage(item?.herApproachImage?.node?.gatsbyImage);
                const imageAlt =
                  item?.herApproachImage?.node?.altText ||
                  item?.herApproachTitle ||
                  "Her Approach";

                return (
                  <div
                    key={index}
                    className={`her-images__img-wrap ${
                      activeIndex === index
                        ? "her-images__img-wrap--active"
                        : ""
                    }`}
                  >
                    {image && (
                      <GatsbyImage
                        image={image}
                        alt={imageAlt}
                        className="her-images__img"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HerApproach;