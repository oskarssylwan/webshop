import React from 'react';

//Components
import Header from '../Header';
import Hero from '../Hero';
import LandingGrid from '../LandingGrid';
import Footer from '../Footer';


const Homepage = () => {
    return (
      <div className='page'>
        <Header />
        <main id='content-main' className='container'>
          <Hero />
          <LandingGrid />
        </main>
        <Footer />
      </div>
    );
}

export default Homepage;
