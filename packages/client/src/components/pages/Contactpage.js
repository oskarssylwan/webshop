import React from 'react'
import { Header } from '../Header'
import { ContactForm } from '../forms/ContactForm'
import { Footer } from '../Footer'
import '../../css/pages/page-contact.css'

export const Contactpage = () => (
  <div className="page">
    <Header />
    <main id="content-main" className="container">
      <div className="wrapper-contact">
        <h1>Contact Us</h1>
        <ContactForm />
      </div>
    </main>
    <Footer />
  </div>
)
