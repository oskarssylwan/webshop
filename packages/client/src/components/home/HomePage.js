import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { BasicBlock } from 'components/shared/blocks/BasicBlock'
import { ContactForm } from 'components/forms/ContactForm'
import { Instagram } from 'icons/Instagram'
import { Facebook } from 'icons/Facebook'
import { Snapchat } from 'icons/Snapchat'
import { YouTube } from 'icons/Youtube'
import heroCover from 'media/images/cover.jpg'
import shop from 'media/images/1x1/shop.jpg'
import tops from 'media/images/1x1/tops.png'
import shoes from 'media/images/1x1/shoes.png'
import bags from 'media/images/1x1/bags.png'
import accessories from 'media/images/1x1/accessories.png'
import 'css/grid-square.css'
import './HomePage.css'

export const HomePage = () => (
  <div className="page">
    <Header />
    <main id="content-main" className="container">

      <div>
        <div className="hero">
          <div className="wrapper">
            <label>2021 Collection</label>
          </div>
          <Link to="/shop">
            <img className="object-fit-cover" src={heroCover} alt="Girl with flower"/>
          </Link>
        </div>
      </div>

      <div className="grid-square">

        <BasicBlock
          title="webb shop"
          image={shop}
          href="/shop"
          additionalClasses="block-size-m cursor-style-pointer"
        />

        <BasicBlock
          title="accessories"
          image={accessories}
          href="/shop/accessories"
          additionalClasses="block-size-s cursor-style-pointer"
        />

        <BasicBlock
          title="shoes"
          image={shoes}
          href="/shop/shoes"
          additionalClasses="block-size-s cursor-style-pointer"
        />

        <BasicBlock
          title="tops"
          image={tops}
          href="/shop/tops"
          additionalClasses="block-size-s cursor-style-pointer"
        />

        <BasicBlock
          title="bags"
          image={bags}
          href="/shop/bags"
          additionalClasses="block-size-s cursor-style-pointer"
        />

        <BasicBlock
          title="about us"
          secondary="Read our story"
          href="/about"
          additionalClasses="block-size-s cursor-style-pointer"
        />

        <BasicBlock
          title="social"
          secondary={
            <div>
              <a href="/"><YouTube classes="social-icons"/></a>
              <a href="/"><Snapchat classes="social-icons"/></a>
              <a href="/"><Instagram classes="social-icons"/></a>
              <a href="/"><Facebook classes="social-icons"/></a>
            </div>
          }
          additionalClasses="block-size-s social-block"
        />

        <BasicBlock
          title="contact"
          body={<ContactForm />}
          additionalClasses="block-size-m contact-form"
        />

        <BasicBlock
          title="contact"
          secondary="oskars.sylwan@gmail.com"
          href="/contact"
          additionalClasses="block-size-s cursor-style-pointer contact-block"
        />

        <BasicBlock
          title="stores"
          secondary="View our physical stores"
          href="/stores"
          additionalClasses="block-size-s cursor-style-pointer"
        />

        <BasicBlock
          title="opening ours"
          secondary="10 - 16 All Days"
          additionalClasses="block-size-s cursor-style-pointer"
        />

      </div>
    </main>
    <Footer />
  </div>
)
