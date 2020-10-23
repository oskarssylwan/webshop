import React from 'react';
import Navigation from './Navigation';
import '../css/footer.css'

import Instagram from '../icons/Instagram.js';
import Facebook from '../icons/Facebook.js';
import Snapchat from '../icons/Snapchat.js';
import Youtube from '../icons/Youtube.js';

const Footer  = () => {
  return (
    <footer id='footer-main' className='container'>
    <Navigation classes='navigation-secondary'/>

    <nav>
      <a href="/"><Youtube classes='social-icons'/></a>
      <a href="/"><Snapchat classes='social-icons'/></a>
      <a href="/"><Instagram classes='social-icons'/></a>
      <a href="/"><Facebook classes='social-icons'/></a>
    </nav>

    </footer>
  );

};

export default Footer;
