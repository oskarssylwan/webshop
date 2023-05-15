import React from 'react'
import { Header } from 'components/header'
import { Footer } from 'components/footer'

export const MainLayout = ({ children }) => (
  <div className="site">
    <div className="page">
      <Header />
      <main id="content-main" className="container">
        {children}
      </main>
      <Footer />
    </div>
  </div>
)
