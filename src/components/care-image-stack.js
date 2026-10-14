import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "../css/care-image-stack.css"

import preconception from "../images/preconception_counselling_new-img.webp"
import antenatal from "../images/antenatal_high_risk_pregnancy_care-new-img.webp"
import labour from "../images/safe_labour_delivery_management-new-img.webp"
import fertility from "../images/fertility_evaluation_medical_management-new-img.webp"
import menstrual from "../images/menstrual_hormonal_disorder_treatment-new-img.webp"
import surgery from "../images/minimally_invasive_gynaecology_surgery-new-img.webp"
import preventive from "../images/preventive_women_s_health_check_ups-new-img.webp"

const items = [
  { image: preconception, title: "Preconception counselling" },
  { image: antenatal, title: "Antenatal & high-risk pregnancy care" },
  { image: labour, title: "Safe labour & delivery management" },
  { image: fertility, title: "Fertility evaluation & medical management" },
  { image: menstrual, title: "Menstrual & hormonal disorder treatment" },
  { image: surgery, title: "Minimally invasive gynaecology surgery" },
  { image: preventive, title: "Preventive women's health check-ups" },
]

const CareImageStack = ({ data }) => {
  const sectionRef = useRef(null)
  useEffect(() => {
    if (!sectionRef.current || !items.length) return
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    const media = gsap.matchMedia()

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray(".care-image-stack__card", section)
      if (cards.length < 2) return
      section.classList.add("care-image-stack--animated")
      const stage = section.querySelector(".care-image-stack__stage")
      const rotation = index => [0, -5, 4, -3, 5, -4, 2][index % 7]
      const depth = Math.min(cards.length - 1, 3)
      gsap.set(cards, { yPercent: 160, autoAlpha: 0 })
      gsap.set(cards[0], { yPercent: 0, autoAlpha: 1 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: stage,
          pinSpacing: true,
          // This section precedes other pinned sections, even when their
          // layout effects register first. Measure its added space first.
          refreshPriority: 1,
          start: "top top",
          end: () => `+=${(cards.length - 1) * window.innerHeight * 0.85}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })

      cards.slice(1).forEach((card, offset) => {
        const index = offset + 1
        timeline.set(card, { autoAlpha: 1 }, offset)
        timeline.to(
          card,
          {
            yPercent: 0,
            rotation: rotation(index),
            duration: 1,
            ease: "power1.inOut",
          },
          offset
        )
        // Keep the top edges of earlier images visible behind the new card.
        cards.slice(0, index).forEach((previous, previousIndex) => {
          timeline.to(
            previous,
            {
              y: -Math.min(index - previousIndex, depth) * 18,
              scale: 1 - Math.min(index - previousIndex, depth) * 0.025,
              rotation: rotation(previousIndex),
              duration: 1,
              ease: "power1.inOut",
            },
            offset
          )
        })
      })
      return () => section.classList.remove("care-image-stack--animated")
    })

    const refresh = () => {
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
    }
    const frame = requestAnimationFrame(refresh)
    section.addEventListener("load", refresh, true)
    return () => {
      cancelAnimationFrame(frame)
      section.removeEventListener("load", refresh, true)
      media.revert()
    }
  }, [])

  if (!items.length) return null

  return (
    <section className="care-image-stack" id="care-stages" ref={sectionRef}>
      <div className="care-image-stack__stage">
        <div className="title-wrap care-image-stack__heading">
          <h2 className="title">
            {data?.careAcrossTitle ||
              "Care Across Every Stage of a Woman's Life"}
            {data?.careAcrossPara && (
              <span className="subtitle">{data.careAcrossPara}</span>
            )}
          </h2>
        </div>
        <div className="care-image-stack__deck">
          {items.map((item, index) => {
            const title = item.title
            return (
              <article
                className="care-image-stack__card"
                key={title}
                style={{ zIndex: index + 1 }}
              >
                <img
                  className="care-image-stack__image"
                  src={item.image}
                  alt={title}
                  width={1066}
                  height={558}
                  loading="lazy"
                />
                <h3 className="care-image-stack__caption">{title}</h3>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CareImageStack
