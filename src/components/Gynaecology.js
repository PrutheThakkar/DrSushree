import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import clamImage from "../images/seafoam_glass_clam_with_luminous_pearls_2.webp"
import "../css/gynaecology-feature.css"

const fallbackProcedures = [
  {
    title: "Laparoscopic Hysterectomy",
    paragraph:
      "Removal of the uterus using minimally invasive laparoscopic techniques.<br />Ensures smaller incisions, less pain, and faster recovery.",
  },
  {
    title: "Myomectomy (Fibroid Removal)",
    paragraph:
      "Surgical removal of uterine fibroids while preserving the uterus.<br />Helps relieve symptoms while maintaining fertility.",
  },
  {
    title: "Endometriosis Surgery",
    paragraph:
      "Targeted removal of endometriosis tissue to reduce pain and improve function. Performed with precision to preserve surrounding healthy structures.",
  },
  {
    title: "Ovarian Cyst Surgery",
    paragraph:
      "Removal of ovarian cysts using minimally invasive techniques.<br />Ensures relief from symptoms while preserving ovarian health and function.",
  },
]

const Gynaecology = ({ data }) => {
  const sectionRef = useRef(null)
  const procedures = data?.gynaecologyAccordion?.length
    ? data.gynaecologyAccordion
    : fallbackProcedures

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    const media = gsap.matchMedia()
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const shell = section.querySelector(".gynaecology-feature__image")
      const lid = section.querySelector(".gynaecology-feature__shell-lid")
      const cards = Array.from(
        section.querySelectorAll(".gynaecology-feature__card")
      )
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: shell,
          start: "top 85%",
          once: true,
        },
      })
      timeline.fromTo(
        lid,
        {
          rotationX: -82,
          transformOrigin: "50% 60%",
        },
        {
          rotationX: 0,
          duration: 1.5,
          ease: "power2.inOut",
        }
      )
      cards.forEach((card, index) => {
        const cardBounds = card.getBoundingClientRect()
        const shellBounds = shell.getBoundingClientRect()
        const baseY = window.innerWidth > 900 && index % 2 === 1 ? 60 : 0
        timeline.fromTo(
          card,
          {
            x:
              shellBounds.left +
              shellBounds.width / 2 -
              cardBounds.left -
              cardBounds.width / 2,
            y:
              baseY +
              shellBounds.top +
              shellBounds.height / 2 -
              cardBounds.top -
              cardBounds.height / 2,
            scale: 0.15,
            autoAlpha: 0,
            rotationX: 20,
            transformPerspective: 900,
          },
          {
            x: 0,
            y: baseY,
            scale: 1,
            autoAlpha: 1,
            rotationX: 0,
            duration: 1.2,
            ease: "power3.out",
            onComplete: () =>
              gsap.set(card, { clearProps: "transform,opacity,visibility" }),
          },
          0.9 + index * 0.15
        )
      })
    })
    return () => media.revert()
  }, [procedures.length])

  return (
    <section
      className="gynaecology-section gynaecology-feature"
      ref={sectionRef}
    >
      <div className="container">
        <div className="title-wrap">
          <h2 className="title">
            {data?.gynaecologyTitle ||
              "Gynaecology - Minimally Invasive Surgical Expertise"}
            <span className="subtitle">
              {data?.gynaecologySubtitle || "Advanced laparoscopic procedures"}
            </span>
          </h2>
        </div>
        <div className="gynaecology-feature__layout">
          <div
            className="gynaecology-feature__image"
            role="img"
            aria-label="Seafoam glass clam with luminous pearls"
          >
            <img
              className="gynaecology-feature__shell-base"
              src={clamImage}
              alt=""
              width={754}
              height={598}
              loading="lazy"
            />
            <img
              className="gynaecology-feature__shell-lid"
              src={clamImage}
              alt=""
              width={754}
              height={598}
              loading="lazy"
            />
          </div>
          <div className="gynaecology-feature__cards">
            {procedures.map((item, index) => (
              <article className="gynaecology-feature__card" key={index}>
                <h3 dangerouslySetInnerHTML={{ __html: item.title || "" }} />
                <div
                  className="gynaecology-feature__description"
                  dangerouslySetInnerHTML={{ __html: item.paragraph || "" }}
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gynaecology
