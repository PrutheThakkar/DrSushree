
import React, { useEffect } from 'react'
import Lenis from 'lenis'
import Header from './Headernew'
import Footer from './Footer'

import "../css/common.css"
import "../css/home.css"
import "../css/ui-fixer.css"
import "../css/contact.css"
import "../css/obstetrics.css"
import "../css/faq.css"
import "../css/insidepage.css"
import "../css/about.css"

const Layout = ({ children }) => {

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,          // scroll animation duration (seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease-out expo
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,     // disable on touch devices (recommended)
      touchMultiplier: 2,
      infinite: false,
    })

    // RAF loop — drives the Lenis animation
    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout