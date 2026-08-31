import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Swiper from "swiper"
import { Autoplay, EffectFade, Pagination } from "swiper/modules"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

const Gynaecology = ({ data }) => {
  const gynaecologyTitle = data?.gynaecologyTitle
  const gynaecologySubtitle = data?.gynaecologySubtitle
  const gynaecologyAccordion = data?.gynaecologyAccordion || []

  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef(null)
  const imageCardsRef = useRef([])

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
    })

    return () => {
      if (swiper) swiper.destroy()
    }
  }, [])

  // Pin the section on desktop and reveal each image as an upward-moving card.
  useLayoutEffect(() => {
    if (gynaecologyAccordion.length < 2 || !sectionRef.current) {
      return undefined
    }

    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()

    media.add("(min-width: 901px)", () => {
      const cards = imageCardsRef.current.filter(Boolean)
      if (cards.length < 2) return undefined

      const context = gsap.context(() => {
        gsap.set(cards, {
          opacity: 1,
          scale: 0.96,
          yPercent: 110,
        })
        gsap.set(cards[0], { scale: 1, yPercent: 0 })
        cards.forEach((card, index) => gsap.set(card, { zIndex: index + 1 }))

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 10%",
            end: () => `+=${window.innerHeight * (cards.length - 1)}`,
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        cards.slice(1).forEach((card, index) => {
          const nextIndex = index + 1
          timeline.to(card, {
            duration: 1,
            ease: "power2.inOut",
            scale: 1,
            yPercent: 0,
            onStart: () => setCurrentIndex(nextIndex),
            onReverseComplete: () => setCurrentIndex(nextIndex - 1),
          })
        })
      }, sectionRef)

      return () => {
        context.revert()
        setCurrentIndex(0)
      }
    })

    return () => media.revert()
  }, [gynaecologyAccordion.length])

  return (
    <section ref={sectionRef} className="gynaecology-section">
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
                className={`procedure-list__item ${
                  index === currentIndex ? "procedure-list__item--active" : ""
                }`}
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
                const image = getImage(item?.image?.node?.gatsbyImage)
                const imageAlt = item?.image?.node?.altText
                return (
                  <div
                    key={index}
                    ref={el => {
                      imageCardsRef.current[index] = el
                    }}
                    className={`procedure-images__img-wrap ${
                      index === currentIndex
                        ? "procedure-images__img-wrap--active"
                        : ""
                    }`}
                    data-index={index}
                  >
                    {image && (
                      <GatsbyImage
                        image={image}
                        alt={imageAlt || item?.title || "Gynaecology"}
                        width={600}
                        height={400}
                        loading="lazy"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Mobile Swiper */}
        <div className="swiper gynaecology-mob-swiper">
          <div className="swiper-wrapper">
            {gynaecologyAccordion.map((item, index) => {
              const image = getImage(item?.image?.node?.gatsbyImage)
              const imageAlt = item?.image?.node?.altText
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
              )
            })}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  )
}

export default Gynaecology
