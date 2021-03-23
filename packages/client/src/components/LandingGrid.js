import React from 'react'
import '../css/grid-square.css'
import '../css/pages/page-home.css'
import BasicBlock from './blocks/BasicBlock.js'
import ContactForm from './forms/ContactForm.js'
import Instagram from '../icons/Instagram.js'
import Facebook from '../icons/Facebook.js'
import Snapchat from '../icons/Snapchat.js'
import Youtube from '../icons/Youtube.js'
import shop from '../media/images/1x1/shop.jpg'
import tops from '../media/images/1x1/tops.png'
import shoes from '../media/images/1x1/shoes.png'
import bags from '../media/images/1x1/bags.png'
import accessories from '../media/images/1x1/accessories.png'

const LandingGrid = () => (
  <div className="grid-square">

    <BasicBlock
      title="webb shop"
      image={shop}
      href="/shop"
      additionalClasses={`
          block-size-m
          cursor-style-pointer
          transition-scale
        `}
    />

    <BasicBlock
      title="accessories"
      image={accessories}
      href="/shop/accessories"
      additionalClasses={`
          block-size-s
          cursor-style-pointer
          transition-scale
        `}
    />

    <BasicBlock
      title="shoes"
      image={shoes}
      href="/shop/shoes"
      additionalClasses={`
          block-size-s
          cursor-style-pointer
          transition-scale
        `}
    />

    <BasicBlock
      title="tops"
      image={tops}
      href="/shop/tops"
      additionalClasses={`
          block-size-s
          cursor-style-pointer
          transition-scale
        `}
    />

    <BasicBlock
      title="bags"
      image={bags}
      href="/shop/bags"
      additionalClasses={`
          block-size-s
          cursor-style-pointer
          transition-scale
        `}
    />

    <BasicBlock
      title="about us"
      secondary="Read our story"
      href="/about"
      additionalClasses={`
          block-size-s
          cursor-style-pointer
          transition-scale
        `}
    />

    <BasicBlock
      title="social"
      secondary={
        <div>
          <a href="/"><Youtube classes="social-icons"/></a>
          <a href="/"><Snapchat classes="social-icons"/></a>
          <a href="/"><Instagram classes="social-icons"/></a>
          <a href="/"><Facebook classes="social-icons"/></a>
        </div>
      }
      additionalClasses={`
          block-size-s
          social-block
        `}
    />

    <BasicBlock
      title="contact"
      body={
        <ContactForm />
      }
      additionalClasses={`
          block-size-m
          contact-form
        `}
    />

    <BasicBlock
      title="contact"
      secondary="oskars.sylwan@gmail.com"
      href="/contact"
      additionalClasses={`
          block-size-s
          cursor-style-pointer
          transition-scale
          contact-block
        `}
    />

    <BasicBlock
      title="stores"
      secondary="View our physical stores"
      href="/stores"
      additionalClasses={`
          block-size-s
          cursor-style-pointer
          transition-scale
        `}
    />

    <BasicBlock
      title="opening ours"
      secondary="10 - 16 All Days"
      additionalClasses={`
          block-size-s
          cursor-style-pointer
          transition-scale
        `}
    />

  </div>

)

export default LandingGrid
