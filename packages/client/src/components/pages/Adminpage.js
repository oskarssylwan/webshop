import React from 'react'
import { Header } from '../Header'
import { Footer } from '../Footer'
import { UploadForm } from '../forms/UpploadForm'
import '../../css/login.css'

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
