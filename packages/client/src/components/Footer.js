import React from 'react'
import { Navigation } from './Navigation'
import { Instagram } from '../icons/Instagram.js'
import { Facebook } from '../icons/Facebook.js'
import { Snapchat } from '../icons/Snapchat.js'
import { YouTube } from '../icons/Youtube.js'
import '../css/footer.css'

export const Footer = () => (
  <footer id="footer-main" className="container">
    <Navigation classes="navigation-secondary"/>
    <nav>
      <a href="/"><YouTube classes="social-icons"/></a>
      <a href="/"><Snapchat classes="social-icons"/></a>
      <a href="/"><Instagram classes="social-icons"/></a>
      <a href="/"><Facebook classes="social-icons"/></a>
    </nav>
  </footer>
)
