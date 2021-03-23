import React from 'react'
import '../css/menu-button.css'

const MenuButton = (props) => (
  <div onClick={props.toggleMenu} className="button-menu">
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export default MenuButton
