import React from 'react'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { UploadForm } from 'components/forms/UpploadForm'
import 'css/login.css'

export const AdminPage = () => (
  <div className="page">
    <Header />
    <main id="content-main" className="container">
      <div className="wrapper-login">
        <UploadForm />
      </div>
    </main>
    <Footer />
  </div>
)
