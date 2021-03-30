import React from 'react'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import './CheckoutPage.css'

export const CheckoutPage = () => (
  <div className="page">
    <Header />
    <main id="content-main" className="container">
      <div className="wrapper-checkout">
        <h1>Thank you for checking out this demo project!</h1>
        <a target="_blank" href="https://github.com/oskarssylwan/webshop">Github repository</a>
      </div>
    </main>
    <Footer />
  </div>
)
