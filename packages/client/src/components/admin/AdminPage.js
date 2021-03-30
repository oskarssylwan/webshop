import React from 'react'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { UploadForm } from 'components/forms/UpploadForm'

export const AdminPage = () => (
  <div className="page">
    <Header />
    <main id="content-main" className="container">
      <div className="wrapper-upload-form">
        <UploadForm />
      </div>
    </main>
    <Footer />
  </div>
)
