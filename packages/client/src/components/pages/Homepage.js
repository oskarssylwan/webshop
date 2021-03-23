import React from 'react'
import { Header } from '../Header'
import { Hero } from '../Hero'
import { LandingGrid } from '../LandingGrid'
import { Footer } from '../Footer'

export const Homepage = () => (
  <div className="page">
    <Header />
    <main id="content-main" className="container">
      <Hero />
      <LandingGrid />
    </main>
    <Footer />
  </div>
)
