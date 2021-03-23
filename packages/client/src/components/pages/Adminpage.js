import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import UpploadForm from '../forms/UpploadForm'
import '../../css/login.css'

const Adminpage = () => (
  <div className="page">
    <Header />
    <main id="content-main" className="container">
      <div className="wrapper-login">
        <UpploadForm />
      </div>
    </main>
    <Footer />
  </div>
)

export default Adminpage
