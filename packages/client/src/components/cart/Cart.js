import React, { useEffect, useState, createContext, useContext } from 'react'

const CartContext = createContext([])

export const useCart = () => useContext(CartContext)

export const removeIndex = (index, list) => {
  const newList = [...list]
  newList.splice(index, 1)
  return newList
}

export const Cart = props => {
  const [cart, setCart] = useState([])

  const addProductToCart = (cartEntry = {}) => {
    const quantity = parseInt(cartEntry.quantity)
    if (isNaN(quantity) || quantity === 0) return

    const existingEntryIndex = cart.findIndex(entry =>
      entry.productId === cartEntry.productId && entry.size === cartEntry.size)

    if (existingEntryIndex === -1) {
      setCart([...cart, { ...cartEntry, quantity }])
    } else {
      const existingEntry = cart[existingEntryIndex]
      const newCart = [...cart]
      newCart[existingEntryIndex] = { ...existingEntry, quantity: existingEntry.quantity + quantity }
      setCart(newCart)
    }

  }

  const removeProductFromCart = cartEntry => {
    const entryIndex = cart.findIndex(entry =>
      entry.productId === cartEntry.productId
      && entry.size === cartEntry.size
    )

    if (entryIndex === -1) return

    setCart(removeIndex(entryIndex, cart))
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
