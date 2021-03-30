import React from 'react'
import { Link } from 'react-router-dom'
import './Navigation.css'

export const Navigation = props => (
  <nav className={props.classes} >
    <Link to="/shop">Shop</Link>
    <Link to="/about">About</Link>
    <Link to="/stores">Stores</Link>
    <Link to="/contact">Contact</Link>
    <Link to="/cart">Cart</Link>
  </nav>
)
