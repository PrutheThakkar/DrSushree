import React, { useLayoutEffect, useRef } from "react"
import { StaticImage } from "gatsby-plugin-image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const cardIcons = [
  <StaticImage
    src="../images/hormonal-assessment.svg"
    alt=""
    width={72}
    height={72}
    placeholder="blurred"
  />,
  <StaticImage
    src="../images/ovalation-induction.svg"
    alt=""
    width={72}
    height={72}
    placeholder="blurred"
  />,
  <StaticImage
    src="../images/ovalation-tracking.svg"
    alt=""
    width={72}
    height={72}
    placeholder="blurred"
  />,
  <StaticImage
    src="../images/metabolic-lifestyle.svg"
    alt=""
    width={72}
    height={72}
    placeholder="blurred"
  />,
]

const InfertilityScroll = ({ title, subtitle, paragraph, items = [] }) => {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    if (
      typeof window === "undefined" ||
      !sectionRef.current ||
      !stickyRef.current ||
      !viewportRef.current ||
      !trackRef.current ||
      items.length < 2
    ) {
      return undefined
    }

    gsap.registerPlugin(ScrollTrigger)

    const media = gsap.matchMedia()

    media.add("(min-width: 901px)", () => {
      const getMaxOffset = () =>
        Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth)

      const getScrollDistance = () =>
        Math.max(window.innerHeight, getMaxOffset() * 1.35)

      const tween = gsap.to(trackRef.current, {
        x: () => -getMaxOffset(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: stickyRef.current,
          start: "top 10%",
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      return () => tween.scrollTrigger?.kill()
    })

    media.add("(max-width: 900px)", () => {
      const viewport = viewportRef.current
      const cards = Array.from(trackRef.current.children)
      let activeIndex = 0
      let autoplayId

      const goToNextCard = () => {
        activeIndex = (activeIndex + 1) % cards.length
        viewport.scrollTo({
          left: cards[activeIndex].offsetLeft - trackRef.current.offsetLeft,
          behavior: "smooth",
        })
      }

      const startAutoplay = () => {
        window.clearInterval(autoplayId)
        autoplayId = window.setInterval(goToNextCard, 3500)
      }

      const pauseAutoplay = () => window.clearInterval(autoplayId)

      viewport.addEventListener("pointerdown", pauseAutoplay)
      viewport.addEventListener("pointerup", startAutoplay)
      viewport.addEventListener("pointercancel", startAutoplay)
      startAutoplay()

      return () => {
        window.clearInterval(autoplayId)
        viewport.removeEventListener("pointerdown", pauseAutoplay)
        viewport.removeEventListener("pointerup", startAutoplay)
        viewport.removeEventListener("pointercancel", startAutoplay)
      }
    })

    return () => media.revert()
  }, [items.length])

  if (!items.length) return null

  return (
    <section className="infertility-scroll" ref={sectionRef}>
      <div className="infertility-scroll__sticky" ref={stickyRef}>
        <div className="container">
          <div className="title-wrap">
            <h2 className="title">
              {title}
              <span className="sub-title">{subtitle}</span>
            </h2>
          </div>

          <div className="infertility-scroll__viewport" ref={viewportRef}>
            <ul className="infertility-scroll__track" ref={trackRef}>
              {items.map((item, index) => (
                <li className="infertility-scroll__card" key={index}>
                  <div className="infertility-scroll__card-heading">
                    <span className="infertility-scroll__icon">
                      {cardIcons[index % cardIcons.length]}
                    </span>
                    {item?.title && (
                      <h3 dangerouslySetInnerHTML={{ __html: item.title }} />
                    )}
                  </div>
                  {item?.subtitle && (
                    <p dangerouslySetInnerHTML={{ __html: item.subtitle }} />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* {paragraph && (
            <p
              className="infertility-scroll__footer"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          )} */}
        </div>
      </div>
    </section>
  )
}

export default InfertilityScroll
