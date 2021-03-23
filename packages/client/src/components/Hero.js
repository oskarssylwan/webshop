import React from 'react'
import { Link } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'
import cover from '../media/images/cover.jpg'
import '../css/hero.css'

export const Hero = () => (
  <CSSTransitionGroup
    component="div"
    transitionName="fade-in-hero"
    transitionAppear={true}
    transitionAppearTimeout={2500}
    transitionEnter={false}
    transitionLeave={false}
  >
    <div className="hero">
      <div className="wrapper">
        <label>
              2017 Collection
        </label>
      </div>
      <Link to="/shop">
        <img className="object-fit-cover" src={cover} alt="Girl with flower"/>
      </Link>
    </div>
  </CSSTransitionGroup>
)
