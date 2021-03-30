import React from 'react'
import './MenuButton.css'

export const MenuButton = props => (
  <div onClick={props.toggleMenu} className="button-menu">
    <div></div>
    <div></div>
    <div></div>
  </div>
)
