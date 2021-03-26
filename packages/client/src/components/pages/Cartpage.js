import React, { useEffect, useState } from 'react'
import * as Api from 'integrations/api'
import { Link } from 'react-router-dom'
import { Header } from '../Header'
import { Footer } from '../Footer'
import { Switch } from 'components/Switch'
import { Loading } from '../../icons/Loading'
import { useCart } from '../Cart'
import '../../css/pages/page-cart.css'

const mergeObjsBy = (prop, list1, list2) => list1.map(obj1 => {
  const obj2 = list2.find(obj2 => obj2[prop] === obj1[prop])
  return obj2 ? { ...obj1, ...obj2 } : obj1
})

const PageStatus = {
  Error: 'Error',
  Loading: 'Loading',
  EmptyCart: 'EmptyCart',
  Idle: 'Idle'
}

export const CartPage = () => {
  const [pageStatus, setPageStatus] = useState(PageStatus.Loading)
  const { cart: cartEntries, remove: removeProductFromCart } = useCart()
  const [products, setProducts] = useState([])

  const updateProductList = products => {
    setProducts(mergeObjsBy(
      '_id',
      cartEntries.map(entry => ({ ...entry, _id: entry.productId })),
      products
    ))
  }

  useEffect(() => {
    if (!cartEntries.length) {
      setPageStatus(PageStatus.EmptyCart)
    } else if (cartEntries.length <= products.length) {
      updateProductList(products)
      setPageStatus(PageStatus.Idle)
    } else {
      setPageStatus(PageStatus.Loading)
      Api.getProducts({ itemIds: cartEntries.map(entry => entry.productId) })
        .then(updateProductList)
        .then(() => setPageStatus(PageStatus.Idle))
        .catch(() => setPageStatus(PageStatus.Error))
    }
  }, [cartEntries])

  return (
    <div className="page">
      <Header />
      <main id="content-main" className="container">
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
            <div className="wrapper-cart">
              <h1>Your Cart</h1>
              <div className="item-list">
                {products.map(product => (
                  <li key={product._id}>
                    <div className="wrapper-img">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="wrapper-info">
                      <h3><Link to={`/products/${product._id}`}>{product.name}</Link></h3>
                      <span className="light">QNT: {product.quantity} | {product.price} :- USD</span>
                    </div>
                    <div className="wrapper-button">
                      <button name={product._id} onClick={() => removeProductFromCart(product._id)} className="button-remove-item"></button>
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
          </Switch.Case>

        </Switch>
      </main>
      <Footer />
    </div>
  )
}
