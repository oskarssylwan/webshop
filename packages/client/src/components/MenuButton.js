import React from 'react'
import '../css/menu-button.css'

export const MenuButton = props => (
  <div onClick={props.toggleMenu} className="button-menu">
    <div></div>
    <div></div>
    <div></div>
  </div>
)
