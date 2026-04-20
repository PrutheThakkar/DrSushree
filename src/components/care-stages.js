import React, { useLayoutEffect, useRef } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CareStages = ({ data }) => {
  const sectionRef = useRef(null);
  const stickyWrapRef = useRef(null);
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const dotsWrapRef = useRef(null);
  const stRef = useRef(null);
  const tweenRef = useRef(null);
  const resizeTimerRef = useRef(null);
  const currentStepRef = useRef(0);
  const touchXRef = useRef(0);
  const touchYRef = useRef(0);

  const careAcrossTitle =
    data?.careAcrossTitle || "Care Across Every Stage of a Woman's Life";
  const careAcrossPara = data?.careAcrossPara || "";
  const careAcrossHorizontalSlider = data?.careAcrossHorizontalSlider || [];

  useLayoutEffect(() => {
    if (
      typeof window === "undefined" ||
      !sectionRef.current ||
      !stickyWrapRef.current ||
      !outerRef.current ||
      !trackRef.current ||
      !dotsWrapRef.current ||
      !careAcrossHorizontalSlider.length
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const getGap = () => {
      const styles = window.getComputedStyle(trackRef.current);
      return (
        parseFloat(styles.columnGap || styles.gap || "50") || 50
      );
    };

    const getCards = () =>
      Array.from(trackRef.current.querySelectorAll(".care-card"));

    const getCardsVisible = () => {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2.5;
      return 3.5;
    };

    const getMaxStep = () => {
      const totalCards = getCards().length;
      return Math.max(0, totalCards - Math.ceil(getCardsVisible()));
    };

    const sizeCards = () => {
      const cardsVisible = getCardsVisible();
      const gap = getGap();
      const outerW = outerRef.current.clientWidth;
      const totalGap = gap * (cardsVisible - 1);
      const cardW = (outerW - totalGap) / cardsVisible;

      getCards().forEach((card) => {
        card.style.width = `${cardW}px`;
        card.style.flex = `0 0 ${cardW}px`;
      });
    };

    const getStepWidth = () => {
      const cards = getCards();
      const gap = getGap();
      return cards.length ? cards[0].offsetWidth + gap : 0;
    };

    const getMaxOffset = () => {
      return getMaxStep() * getStepWidth();
    };

    const updateDots = (step) => {
      const dots = dotsWrapRef.current.querySelectorAll(".dot");
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === step);
      });
    };

    const buildDots = () => {
      const maxStep = getMaxStep();
      dotsWrapRef.current.innerHTML = "";

      for (let i = 0; i <= maxStep; i += 1) {
        const dot = document.createElement("span");
        dot.className = `dot${i === 0 ? " is-active" : ""}`;

        dot.addEventListener("click", () => {
          if (!stRef.current) return;

          const progress = maxStep === 0 ? 0 : i / maxStep;
          const targetY =
            stRef.current.start +
            (stRef.current.end - stRef.current.start) * progress;

          window.scrollTo({
            top: targetY,
            behavior: "smooth",
          });
        });

        dotsWrapRef.current.appendChild(dot);
      }
    };

    const setSectionHeight = () => {
      const maxStep = getMaxStep();
      const scrollDistance = Math.max(
        window.innerHeight,
        maxStep * 0.65 * window.innerHeight
      );
      const contentHeight = stickyWrapRef.current.offsetHeight;
      sectionRef.current.style.height = `${contentHeight + scrollDistance}px`;
    };

    const initScrollTrigger = () => {
      const maxStep = getMaxStep();
      const maxOffset = getMaxOffset();
      const scrollDistance = Math.max(
        window.innerHeight,
        maxStep * 0.65 * window.innerHeight
      );

      if (stRef.current) {
        stRef.current.kill();
        stRef.current = null;
      }

      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
      }

      gsap.set(trackRef.current, { x: 0 });

      tweenRef.current = gsap.to(trackRef.current, {
        x: -maxOffset,
        ease: "none",
        overwrite: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: stickyWrapRef.current,
          pinSpacing: false,
          start: window.innerWidth <= 768 ? "top top" : "top top",
          end: `+=${scrollDistance}`,
          scrub: 1.1,
          invalidateOnRefresh: true,
          snap:
            maxStep > 0
              ? {
                  snapTo: 1 / maxStep,
                  duration: { min: 0.2, max: 0.45 },
                  ease: "power1.inOut",
                }
              : false,
          onUpdate: (self) => {
            const step = maxStep > 0 ? Math.round(self.progress * maxStep) : 0;
            if (step !== currentStepRef.current) {
              currentStepRef.current = step;
              updateDots(step);
            }
          },
        },
      });

      stRef.current = tweenRef.current.scrollTrigger;
    };

    const init = () => {
      currentStepRef.current = 0;
      sizeCards();
      buildDots();
      setSectionHeight();
      updateDots(0);
      initScrollTrigger();
      ScrollTrigger.refresh();
    };

    const handleResize = () => {
      clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(() => {
        init();
      }, 200);
    };

    const handleTouchStart = (e) => {
      touchXRef.current = e.touches[0].clientX;
      touchYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (!stRef.current || !stRef.current.isActive) return;

      const dx = touchXRef.current - e.changedTouches[0].clientX;
      const dy = Math.abs(touchYRef.current - e.changedTouches[0].clientY);

      if (Math.abs(dx) > 44 && Math.abs(dx) > dy) {
        const maxStep = getMaxStep();
        const dir = dx > 0 ? 1 : -1;
        const nextStep = Math.max(
          0,
          Math.min(maxStep, currentStepRef.current + dir)
        );

        const progress = maxStep === 0 ? 0 : nextStep / maxStep;
        const targetY =
          stRef.current.start +
          (stRef.current.end - stRef.current.start) * progress;

        window.scrollTo({
          top: targetY,
          behavior: "smooth", 
        });
      }
    };

    const handleKeyDown = (e) => {
      if (!stRef.current || !stRef.current.isActive) return;

      if (
        e.key === "ArrowRight" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowUp"
      ) {
        e.preventDefault();

        const maxStep = getMaxStep();
        const dir =
          e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
        const nextStep = Math.max(
          0,
          Math.min(maxStep, currentStepRef.current + dir)
        );

        const progress = maxStep === 0 ? 0 : nextStep / maxStep;
        const targetY =
          stRef.current.start +
          (stRef.current.end - stRef.current.start) * progress;

        window.scrollTo({
          top: targetY,
          behavior: "smooth",
        });
      }
    };

    requestAnimationFrame(() => {
      init();
    });

    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleKeyDown);

    sectionRef.current.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    sectionRef.current.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKeyDown);

      if (sectionRef.current) {
        sectionRef.current.removeEventListener("touchstart", handleTouchStart);
        sectionRef.current.removeEventListener("touchend", handleTouchEnd);
      }

      clearTimeout(resizeTimerRef.current);

      if (stRef.current) {
        stRef.current.kill();
        stRef.current = null;
      }

      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
      }

      gsap.killTweensOf(trackRef.current);
    };
  }, [careAcrossHorizontalSlider]);

  if (!careAcrossHorizontalSlider.length) return null;

  return (
    <section className="care-stages-section" id="care-stages" ref={sectionRef}>
      <div className="care-stages__sticky-wrap" ref={stickyWrapRef}>
      
    <div className="title-wrap">

        <h2 className="title">
            {careAcrossTitle}
            <span className="subtitle">{careAcrossPara}</span>
          </h2>
    </div>

        <div className="care-stages__track-outer" ref={outerRef}>
          <div className="care-stages__track" id="careTrack" ref={trackRef}>
            {careAcrossHorizontalSlider.map((item, index) => {
              const image = getImage(item?.sectionImage?.node?.gatsbyImage);
              const imageAlt =
                item?.sectionImage?.node?.altText ||
                item?.sectionTitle ||
                "Care Stage";

              return (
                <div className="care-card" key={index}>
                  <div className="care-card__img-wrap">
                    {image && (
                      <GatsbyImage
                        image={image}
                        alt={imageAlt}
                        height={600}
                        width={500}
                        className="care-card__img"
                      />
                    )}
                  </div>

                  <div className="care-card__body">
                    <h3>{item?.sectionTitle}</h3>
                    <p>{item?.sectionSubTitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="care-stages__dots" id="careDots" ref={dotsWrapRef} />
      </div>
    </section>
  );
};

export default CareStages;