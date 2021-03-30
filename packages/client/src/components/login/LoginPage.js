import React from 'react'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { LoginForm } from 'components/forms/LoginForm'
import './LoginPage.css'

export const LoginPage = () => (
  <div className="page">
    <Header />
    <main id="content-main" className="container">
      <div className="wrapper-login">
        <LoginForm />
      </div>
    </main>
    <Footer />
  </div>
)
