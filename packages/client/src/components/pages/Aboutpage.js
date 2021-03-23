import React from 'react'
import '../../css/pages/page-about.css'
//Components
import Header from '../Header'
import Footer from '../Footer'

const Aboutpage = () => (
  <div className="page">
    <Header />
    <main id="content-main" className="container">
      <div className="grid-about">
        <div className="block"></div>
        <div className="block-transparent span-3"></div>
        <div id="about-story" className="block span-2">
          <h1>Our Story</h1>
          <span>Where did we come form, <br/> and what are we doing here</span>
        </div>
        <div className="block"></div>
        <div className="block-transparent"></div>
        <div className="block span-4"></div>
        <div id="about-p-first" className="block span-3">
          <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae magna eget dolor maximus eleifend. Phasellus ipsum sem, consequat a cursus eu, vulputate id.
          </p>
        </div>
        <div className="block-transparent span-2"></div>
        <div className="block"></div>
        <div id="about-p-second" className="block span-2">
          <p>
              Vivamus dignissim auctor dolor, vitae lacinia tellus auctor quis. Pellentesque tempor sem id ex cursus finibus. Sed neque lectus, malesuada ac efficitur eget, imperdiet et tortor.
          </p>
        </div>
        <div className="block-transparent span-1"></div>
        <div className="block span-3"></div>
        <div className="block-transparent span-3"></div>
        <div className="block-transparent span-1"></div>
        <div id="about-qoute" className="block span-2">
          <p className="qoute"> Phasellus facilisis dui sem, sodales placerat risus tempus sit amet. Nulla quis lacinia erat. Etiam pretium ut turpis vel egestas. Integer laoreet gravida iaculis.</p>
        </div>
        <div className="block"></div>
        <div className="block-transparent span-1"></div>
        <div className="block span-4"></div>
        <div id="about-qoute" className="block span-3">
          <p className="qoute"> Phasellus facilisis dui sem, sodales placerat risus tempus sit amet. Nulla quis lacinia erat. Etiam pretium ut turpis vel egestas. Integer laoreet gravida iaculis.</p>
        </div>
        <div className="block-transparent span-1"></div>
        <div className="block-transparent span-2"></div>
        <div className="block span-2"></div>
        <div className="block-transparent span-2"></div>
        <div id="about-p-third" className="block span-2">
          <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae magna eget dolor maximus eleifend. Phasellus ipsum sem, consequat a cursus eu, vulputate id.
          </p>
        </div>
        <div className="block"></div>
        <div className="block-transparent span-2"></div>
        <div id="about-p-fourth" className="block span-3">
          <p>
                Vivamus dignissim auctor dolor, vitae lacinia tellus auctor quis. Pellentesque tempor sem id ex cursus finibus. Sed neque lectus, malesuada ac efficitur eget, imperdiet et tortor.
          </p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
)

export default Aboutpage
