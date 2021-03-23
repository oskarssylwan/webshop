import React from 'react'
import { Header } from '../Header'
import { Footer } from '../Footer'
import { LoginForm } from '../forms/LoginForm'
import '../../css/login.css'

export const Loginpage = () => (
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
