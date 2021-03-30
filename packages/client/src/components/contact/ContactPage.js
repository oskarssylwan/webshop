import React from 'react'
import { Header } from 'components/header'
import { ContactForm } from 'components/forms/ContactForm'
import { Footer } from 'components/footer'
import './ContactPage.css'

export const ContactPage = () => (
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
