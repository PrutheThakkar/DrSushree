import React from "react"
import gestationalDiabetes from "../images/gestational-diabetes.svg"
import multiplePregnancies from "../images/multiple-pregrancies.svg"
import otherMaternal from "../images/other-maternal.svg"
import preEclampsia from "../images/pre-eclampsia.svg"
import previousPregnancy from "../images/previous-pregnancy.svg"
import thyroidDisorders from "../images/Rectangle 46.svg"

const conditions = [
  {
    image: preEclampsia,
    title: "Pre-Eclampsia & Hypertension In Pregnancy",
  },
  { image: gestationalDiabetes, title: "Gestational Diabetes" },
  { image: thyroidDisorders, title: "Thyroid Disorders" },
  { image: previousPregnancy, title: "Previous Pregnancy Losses" },
  { image: multiplePregnancies, title: "Multiple Pregnancies" },
  { image: otherMaternal, title: "Other Maternal Or Fetal Risk Factors" },
]

const Obstetrics = ({ data }) => {
  const obstetricsTitle = data?.obstetricsTitle || ""
  const obstetricsSubtitle = data?.obstetricsSubtitle || ""

  return (
    <section className="Obstetrics">
      <div className="container">
        <div className="title-wrap">
          <h2 className="title">
            {obstetricsTitle}
            <span className="subtitle">{obstetricsSubtitle}</span>
          </h2>
        </div>

        <ul className="obstetrics-list">
          {conditions.map(condition => (
            <li key={condition.title}>
              <div className="obstetrics-card">
                <img
                  src={condition.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
                <h3>{condition.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Obstetrics
