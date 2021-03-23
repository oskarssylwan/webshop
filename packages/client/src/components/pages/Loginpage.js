import React from 'react'
import '../../css/login.css'
//Components
import Header from '../Header'
import Footer from '../Footer'
import LoginForm from '../forms/LoginForm'

const Loginpage = () => (
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

export default Loginpage
