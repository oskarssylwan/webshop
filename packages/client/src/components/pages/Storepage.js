import React from 'react'
import '../../css/pages/page-stores.css'

//Components
import Header from '../Header'
import Footer from '../Footer'

const Storepage = () => (
  <div className="page">
    <Header />
    <main id="content-main" className="container">
      <div className="wrapper-stores">
        <h1>Our Stores</h1>
        <ul>
          <li className="bold" >Stockholm</li>
          <li>Stockholmsgatan 22</li>
          <li>123 31 stockholm</li>
        </ul>
        <ul>
          <li className="bold">Gothenburg</li>
          <li>Drottninggatan 73</li>
          <li>125 36 göteborg</li>
        </ul>
        <ul>
          <li className="bold">Malmö</li>
          <li>kungsgatan 59</li>
          <li>432 31 Malmö</li>
        </ul>
      </div>
    </main>
    <Footer />
  </div>
)

export default Storepage
