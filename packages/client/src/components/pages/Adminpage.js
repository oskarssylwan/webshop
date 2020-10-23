import React from 'react';
import '../../css/login.css'
//Components
import Header from '../Header';
import Footer from '../Footer';
import UpploadForm from '../forms/UpploadForm';


const Adminpage = (props) => {
    return (
      <div className='page'>
        <Header />
        <main id='content-main' className='container'>
          <div className='wrapper-login'>
            <UpploadForm />
          </div>
        </main>
        <Footer />
      </div>
    );
}

export default Adminpage;
