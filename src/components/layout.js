// src/layouts/index.js

import React from 'react'
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
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout