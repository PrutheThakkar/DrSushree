import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const initHomeAnimations = () => {
  if (typeof window === "undefined") return;
  if (typeof document === "undefined") return;
  if (typeof gsap === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  // kill old triggers if page remounts
  ScrollTrigger.getAll().forEach((trigger) => {
    const triggerEl = trigger?.vars?.trigger;
    if (
      triggerEl === ".banner-section" ||
      triggerEl === ".Womens-Healthcare" ||
      triggerEl === ".care-stages-section" ||
      triggerEl === ".Obstetrics" ||
      triggerEl === ".gynaecology-section" ||
      triggerEl === ".Benefits-laparoscopic" ||
      triggerEl === ".Infertility" ||
      triggerEl === ".Her-Approach" ||
      triggerEl === "footer"
    ) {
      trigger.kill();
    }
  });

  // =========================================================
  // HERO SECTION ANIMATION
  // =========================================================
  const heading = document.querySelector(".banner-section .div-wrapper h1");

  if (heading && !heading.dataset.splitDone) {
    const originalHTML = heading.innerHTML;

    const splitLines = originalHTML
      .split(/<br\s*\/?>/i)
      .map(
        (line) => `
          <div class="hero-line">
            <div class="hero-line-inner">${line.trim()}</div>
          </div>
        `
      )
      .join("");

    heading.innerHTML = splitLines;
    heading.dataset.splitDone = "true";
  }

  if (heading) {
    // only header + banner hidden first
    gsap.set("header .container", {
      autoAlpha: 0,
      y: -25,
    });

    gsap.set("header .logo", {
      autoAlpha: 0,
      y: 10,
    });

    gsap.set("header .menu-list > li", {
      autoAlpha: 0,
      y: 10,
    });

    gsap.set(".banner-section .hero-img", {
      scale: 1.06,
    });

    gsap.set(".banner-section .btn-wrapper .btn", {
      autoAlpha: 0,
      y: 20,
      scale: 0.97,
    });

    gsap.set(".hero-line", {
      overflow: "hidden",
      display: "block",
    });

    gsap.set(".hero-line-inner", {
      yPercent: 100,
      display: "block",
    });

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    tl.to("header .container", {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
    });

    tl.to(
      "header .logo",
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
      },
      "-=0.25"
    );

    tl.to(
      "header .menu-list > li",
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.04,
      },
      "-=0.15"
    );

    tl.to(
      ".banner-section .hero-img",
      {
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      },
      0
    );

    tl.to(
      ".hero-line-inner",
      {
        yPercent: 0,
        duration: 0.85,
        stagger: 0.12,
      },
      "-=0.05"
    );

    tl.to(
      ".banner-section .btn-wrapper .btn",
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.25"
    );
  }

  // =========================================================
  // WOMEN'S HEALTHCARE SECTION ANIMATION
  // =========================================================
  if (document.querySelector(".Womens-Healthcare")) {
    const womensTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".Womens-Healthcare",
        start: "top 78%",
        once: true,
      },
      defaults: {
        ease: "power3.out",
      },
    });

    womensTl.from(".Womens-Healthcare .title", {
      y: 60,
      opacity: 0,
      duration: 0.8,
    });

    womensTl.from(
      ".Womens-Healthcare .sub-title",
      {
        y: 35,
        opacity: 0,
        duration: 0.6,
      },
      "-=0.45"
    );

    womensTl.fromTo(
      ".Womens-Healthcare .img-wrap",
      {
        clipPath: "inset(0 0 100% 0)",
      },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.8,
        ease: "power3.inOut",
      },
      "-=0.2"
    );

    womensTl.fromTo(
      ".Womens-Healthcare .img-wrap img, .Womens-Healthcare .img-wrap .gatsby-image-wrapper",
      {
        scale: 1.08,
      },
      {
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "<"
    );

    womensTl.from(
      ".Womens-Healthcare p",
      {
        y: 35,
        opacity: 0,
        duration: 0.7,
      },
      "-=0.35"
    );
  }

  // =========================================================
  // CARE STAGES SECTION ANIMATION
  // =========================================================
  if (document.querySelector(".care-stages-section")) {
    const careStagesTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".care-stages-section",
        start: "top 80%",
        once: true,
      },
      defaults: {
        ease: "power3.out",
      },
    });

    careStagesTl.from(".care-stages-section .title, .care-stages-section h2", {
      y: 60,
      opacity: 0,
      duration: 0.8,
    });

    careStagesTl.from(
      ".care-stages-section .sub-title, .care-stages-section .care-stages__para",
      {
        y: 35,
        opacity: 0,
        duration: 0.6,
      },
      "-=0.45"
    );

    careStagesTl.from(
      ".care-stages-section .care-stages__track-outer",
      {
        y: 50,
        opacity: 0,
        duration: 0.8,
      },
      "-=0.2"
    );
  }

  // =========================================================
  // OBSTETRICS SECTION ANIMATION
  // =========================================================
  if (document.querySelector(".Obstetrics")) {
    const obstetricsTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".Obstetrics",
        start: "top 80%",
        once: true,
      },
      defaults: {
        ease: "power3.out",
      },
    });

    obstetricsTl.from(".Obstetrics .title", {
      y: 60,
      opacity: 0,
      duration: 0.8,
    });

    obstetricsTl.from(
      ".Obstetrics .subtitle, .Obstetrics .sub-title",
      {
        y: 35,
        opacity: 0,
        duration: 0.6,
      },
      "-=0.45"
    );

    obstetricsTl.fromTo(
      ".Obstetrics .ObstetricsSwiper",
      {
        scale: 0.96,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: "power2.out",
      },
      "-=0.2"
    );
  }

  // =========================================================
  // GYNAECOLOGY SECTION ANIMATION
  // =========================================================
  if (document.querySelector(".gynaecology-section")) {
    const gynaecologyTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".gynaecology-section",
        start: "top 80%",
        once: true,
      },
      defaults: {
        ease: "power3.out",
      },
    });

    gynaecologyTl.from(".gynaecology-section .title", {
      y: 60,
      opacity: 0,
      duration: 0.8,
    });

    gynaecologyTl.from(
      ".gynaecology-section .sub-title, .gynaecology-section .subtitle",
      {
        y: 35,
        opacity: 0,
        duration: 0.6,
      },
      "-=0.45"
    );

    gynaecologyTl.from(
      ".gynaecology-section .procedure-list__item",
      {
        y: 30,
        opacity: 0,
        duration: 0.55,
        stagger: 0.12,
      },
      "-=0.2"
    );

    gynaecologyTl.fromTo(
      ".gynaecology-section .procedure-images",
      {
        scale: 0.96,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: "power2.out",
      },
      "-=1.2"
    );
  }

  // =========================================================
  // BENEFITS LAPAROSCOPIC SECTION ANIMATION
  // =========================================================
  if (document.querySelector(".Benefits-laparoscopic")) {
    const benefitsTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".Benefits-laparoscopic",
        start: "top 80%",
        once: true,
      },
      defaults: {
        ease: "power3.out",
      },
    });

    benefitsTl.from(".Benefits-laparoscopic h2, .Benefits-laparoscopic .title", {
      y: 60,
      opacity: 0,
      duration: 0.8,
    });

    benefitsTl.from(
      ".Benefits-laparoscopic .sub-title",
      {
        y: 35,
        opacity: 0,
        duration: 0.6,
      },
      "-=0.45"
    );

    benefitsTl.from(
      ".Benefits-laparoscopic .benef-wrapp > li .img-wrap",
      {
        y: 45,
        opacity: 0,
        duration: 0.7,
        stagger: 0.14,
      },
      "-=0.2"
    );

    benefitsTl.from(
      ".Benefits-laparoscopic .benef-wrapp > li .text-wrap",
      {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.14,
      },
      "-=0.45"
    );
  }

  // =========================================================
  // INFERTILITY SECTION ANIMATION
  // =========================================================
  if (document.querySelector(".Infertility")) {
    const infertilityTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".Infertility",
        start: "top 80%",
        once: true,
      },
      defaults: {
        ease: "power2.out",
      },
    });

    infertilityTl.from(".Infertility .title", {
      opacity: 0,
      duration: 0.7,
    });

    infertilityTl.from(
      ".Infertility .sub-title",
      {
        opacity: 0,
        duration: 0.5,
      },
      "-=0.35"
    );

    infertilityTl.from(".Infertility .infertility-wrapper li:nth-child(2)", {
      opacity: 0,
      duration: 0.45,
    }, "-=0.1");

    infertilityTl.from(".Infertility .infertility-wrapper li:nth-child(1)", {
      opacity: 0,
      duration: 0.45,
    }, "-=0.2");

    infertilityTl.from(".Infertility .infertility-wrapper li:nth-child(4)", {
      opacity: 0,
      duration: 0.45,
    }, "-=0.2");

    infertilityTl.from(".Infertility .infertility-wrapper li:nth-child(3)", {
      opacity: 0,
      duration: 0.45,
    }, "-=0.2");

    infertilityTl.from(".Infertility .content", {
      opacity: 0,
      duration: 0.6,
    }, "-=0.1");
  }

  // =========================================================
  // HER APPROACH SECTION ANIMATION
  // =========================================================
  if (document.querySelector(".Her-Approach")) {
    const herApproachTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".Her-Approach",
        start: "top 80%",
        once: true,
      },
      defaults: {
        ease: "power3.out",
      },
    });

    herApproachTl.fromTo(
      ".Her-Approach .title",
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
      }
    );

    herApproachTl.fromTo(
      ".Her-Approach .sub-title, .Her-Approach .subtitle",
      {
        y: 35,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
      },
      "-=0.45"
    );

    herApproachTl.fromTo(
      ".Her-Approach .her-list__item",
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.12,
      },
      "-=0.2"
    );

    herApproachTl.fromTo(
      ".Her-Approach .her-images",
      {
        scale: 0.96,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: "power2.out",
      },
      "-=0.8"
    );
  }

  // =========================================================
  // FOOTER ANIMATION
  // =========================================================
  if (document.querySelector("footer")) {
    const footerTl = gsap.timeline({
      scrollTrigger: {
        trigger: "footer",
        start: "top 85%",
        once: true,
      },
      defaults: {
        ease: "power3.out",
      },
    });

    footerTl.fromTo(
      "footer .footer-top .img-wrap",
      {
        scale: 1.04,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
      }
    );

    footerTl.from("footer .footer-top .text-wrap h2", {
      y: 50,
      opacity: 0,
      duration: 0.8,
    }, "-=0.65");

    footerTl.fromTo(
      "footer .footer-top .btn-wrapper .btn",
      {
        y: 24,
        opacity: 0,
        scale: 0.96,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
      },
      "-=0.35"
    );

    footerTl.from("footer .footer-wrap .left .col-1 > *", {
      y: 25,
      opacity: 0,
      duration: 0.55,
      stagger: 0.1,
    }, "-=0.2");

    footerTl.from("footer .footer-wrap .right .col", {
      y: 30,
      opacity: 0,
      duration: 0.55,
      stagger: 0.12,
    }, "-=0.45");

    footerTl.from("footer .footer-wrap > p, footer .copyright, footer .footer-bottom", {
      opacity: 0,
      y: 15,
      duration: 0.5,
    }, "-=0.2");
  }

  ScrollTrigger.refresh();
};

export const destroyHomeAnimations = () => {
  if (typeof window === "undefined") return;
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};