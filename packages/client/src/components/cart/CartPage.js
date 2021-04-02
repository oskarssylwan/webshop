import React, { useEffect, useState } from 'react'
import * as Api from 'integrations/api'
import { Link } from 'react-router-dom'
import { Switch } from 'components/shared/Switch'
import { Loading } from 'icons/Loading'
import { useCart } from 'components/cart'
import './CartPage.css'

const PageStatus = {
  Error: 'Error',
  Loading: 'Loading',
  EmptyCart: 'EmptyCart',
  Idle: 'Idle'
}

export const CartPage = () => {
  const [pageStatus, setPageStatus] = useState(PageStatus.Loading)
  const { cart: cartEntries, remove: removeProductFromCart } = useCart()
  const [products, setProducts] = useState({})

  useEffect(() => {
    if (!cartEntries.length) {
      setPageStatus(PageStatus.EmptyCart)
    } else if (cartEntries.length <= Object.keys(products).length) {
      setPageStatus(PageStatus.Idle)
    } else {
      setPageStatus(PageStatus.Loading)
      Api.getProducts({ itemIds: cartEntries.map(entry => entry.productId) })
        .then(products => {
          const productMap = products.reduce((map, product) => ({...map, [product._id]: product}), {})
          setProducts(productMap)
        })
        .then(() => setPageStatus(PageStatus.Idle))
        .catch(() => setPageStatus(PageStatus.Error))
    }
  }, [cartEntries])

  return (
    <Switch on={pageStatus}>

      <Switch.Case match={[PageStatus.Error]}>
        <div style={{ height: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          We could unfortunately not load your cart, please come back in a few minutes.
        </div>
      </Switch.Case>

      <Switch.Case match={[PageStatus.Loading]}>
        <div style={{ height: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Loading classes="loading social-icons"/>
        </div>
      </Switch.Case>

      <Switch.Case match={[PageStatus.EmptyCart]}>
        <div className="wrapper-cart">
          <h1>Your cart is empty</h1>
        </div>
      </Switch.Case>

      <Switch.Case match={[PageStatus.Idle]}>
        {() => (
          <div className="wrapper-cart">
            <h1>Your Cart</h1>
            <div className="item-list">
              {cartEntries.map(entry => (
                <li key={entry.productId + entry.size}>
                  <div className="wrapper-img">
                    <img src={products[entry.productId].image} alt={products[entry.productId].name} />
                  </div>
                  <div className="wrapper-info">
                    <h3><Link to={`/products/${entry.productId}`}>{products[entry.productId].name}</Link></h3>
                    <span className="light">QNT: {entry.quantity} | SIZE: {entry.size} | PRICE: {products[entry.productId].price}:- USD</span>
                  </div>
                  <div className="wrapper-button">
                    <button name={entry.productId} onClick={() => removeProductFromCart(entry)} className="button-remove-item"></button>
                  </div>
                </li>
              ))}
            </div>
            <div className="cart-info">
              <div>
                <a className="button" href="/checkout">To Chekout</a>
              </div>
            </div>
          </div>
        )}
      </Switch.Case>

    </Switch>
  )
}
