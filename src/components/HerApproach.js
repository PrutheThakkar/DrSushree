import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const HerApproach = ({ data }) => {
  const herApproachTitle = data?.herApproachTitle || ""
  const herApproachSubtitle = data?.herApproachSubtitle || ""
  const herApproachList = data?.herApproachList || []

  if (!herApproachList.length) return null

  return (
    <section className="Her-Approach">
      <div className="container">
        <div className="title-wrap">
          <h2 className="title">
            {herApproachTitle}
            <span className="subtitle">{herApproachSubtitle}</span>
          </h2>
        </div>

        <div className="her-approach__stage">
          <div className="her-images__frame">
            <StaticImage
              src="../images/approach-to-care.webp"
              alt="Dr. Sushree Patra discussing care with a patient"
              className="her-images__img"
              loading="lazy"
              placeholder="blurred"
              quality={90}
            />
          </div>

          <ul className="her-list">
            {herApproachList.map((item, index) => (
              <li key={index}>
                <button type="button" className="her-list__item">
                  <span
                    className="her-list__name"
                    dangerouslySetInnerHTML={{
                      __html: item?.herApproachTitle,
                    }}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default HerApproach
