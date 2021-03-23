import React from 'react'
import '../../css/pages/page-contact.css'
import { Header } from '../Header'
import { Footer } from '../Footer'

export const Checkoutpage = () => (
  <div className="page">
    <Header />
    <main id="content-main" className="container">
      <div className="wrapper-contact">
        <h1>Thank you for checking out my project!</h1>
        <a target="_blank" href="#">Github repository</a>
      </div>
    </main>
    <Footer />
  </div>
)
