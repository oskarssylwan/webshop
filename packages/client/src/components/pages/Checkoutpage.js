import React from 'react';
import '../../css/pages/page-contact.css';

//Components
import Header from '../Header';
import ContactForm from '../forms/ContactForm';
import Footer from '../Footer';

const Checkoutpage = () => {
    return (
      <div className='page'>
        <Header />
        <main id='content-main' className='container'>
          <div className='wrapper-contact'>
            <h1>Thank you for checking out my project!</h1>
            <a target='_blank' href='#'>Github repository</a>
          </div>
        </main>
        <Footer />
      </div>
    );
}

export default Checkoutpage;
