import React, { useEffect, useState, createContext, useContext } from 'react'

const CartContext = createContext([])

export const useCart = () => useContext(CartContext)

export const Cart = props => {
  const [cart, setCart] = useState([])

  const removeProductFromCart = productId => {
    setCart(cart.filter(entry => entry.productId !== productId))
  }

  const addProductToCart = (cartEntry = {}) => {
    const quantity = parseInt(cartEntry.quantity)
    if (isNaN(quantity) || quantity === 0) return
    setCart([...cart, { ...cartEntry, quantity }])
  }

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(savedCart)
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  return (
    <CartContext.Provider
      value={{ cart, add: addProductToCart, remove: removeProductFromCart }}
      {...props}
    />
  )
}
