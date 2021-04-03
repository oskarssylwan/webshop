import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from 'components/cart'
import { Badge } from 'components/shared/badge'
import './Navigation.css'

export const Navigation = props => {
  const { cart } = useCart()
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const count = cart
      .map(entry => entry.quantity)
      .reduce((total, quantity) => total + quantity, 0)

    setCartCount(count)
  }, [cart])

  return (
    <nav className={props.classes}>
      <Link to="/shop">Shop</Link>
      <Link to="/stores">Stores</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/cart">
        <Badge count={cartCount}>
          Cart
        </Badge>
      </Link>
    </nav>
  )
}
