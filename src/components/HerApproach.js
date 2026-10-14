import React from "react"
import "../css/approach-to-care.css"

const HerApproach = ({ data }) => {
  const herApproachTitle = data?.herApproachTitle || ""
  const herApproachSubtitle = data?.herApproachSubtitle || ""
  const herApproachList = data?.herApproachList || []

  if (!herApproachList.length) return null

  return (
    <section className="Her-Approach approach-to-care">
      <div className="container">
        <div className="title-wrap">
          <h2 className="title">
            {herApproachTitle}
            <span className="subtitle">{herApproachSubtitle}</span>
          </h2>
        </div>

        <ul className="approach-to-care__list">
          {herApproachList.map((item, index) => (
            <li key={index}>
              <div className="approach-to-care__card">
                <span
                  className="approach-to-care__name"
                  dangerouslySetInnerHTML={{
                    __html: item?.herApproachTitle,
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default HerApproach
