import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as Api from 'integrations/api'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { BasicBlock } from 'components/shared/blocks/BasicBlock'
import { Switch } from 'components/shared/Switch'
import { Loading } from 'icons/Loading'
import { useCart } from 'components/cart'
import './ProductPage.css'

const PageStatus = {
  Error: 'Error',
  Loading: 'Loading',
  Idle: 'Idle',
  NotFound: 'NotFound'
}

export const ProductPage = () => {
  const { productId } = useParams()
  const [pageStatus, setPageStatus] = useState(PageStatus.Loading)
  const cart = useCart()
  const [product, setProduct] = useState({})
  const [size, setSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [userFeedback, setUserFeedback] = useState()

  const addProductToCart = event => {
    event.preventDefault()
    const cartEntry = { productId, size, quantity }
    cart.add(cartEntry)
    setUserFeedback('Product Added')
  }

  useEffect(() => {
    setPageStatus(PageStatus.Loading)
    Api.getProduct(productId)
      .then(product => {
        setProduct(product)
        product
          ? setPageStatus(PageStatus.Idle)
          : setPageStatus(PageStatus.NotFound)
      })
      .catch(() => setPageStatus(PageStatus.Error))
  }, [productId])

  return (
    <div className="page">
      <Header />
      <main id="content-main" className="container">
        <Switch on={pageStatus}>

          <Switch.Case match={[PageStatus.Error]}>
            <div style={{ height: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              We could unfortunately not load the product, please come back in a few minutes.
            </div>
          </Switch.Case>

          <Switch.Case match={[PageStatus.NotFound]}>
            <div style={{ height: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              It seems like the product you are looking for has been removed.
            </div>
          </Switch.Case>

          <Switch.Case match={[PageStatus.Loading]}>
            <div style={{ height: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Loading classes="loading social-icons"/>
            </div>
          </Switch.Case>

          <Switch.Case match={[PageStatus.Idle]}>
            <div id="page-item" className="container">
              <BasicBlock image={product.image} additionalClasses="image-wrapper scale-07"/>
              <div className="item-info">
                <div className="wrapper">
                  <h2>{product.name}</h2>
                  {product.description && product.description.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                  <ul className="item-specifications light">
                    <li><span className="bold">color: </span>{product.color}</li>
                    <li><span className="bold">material: </span>{product.material}</li>
                    <li><span className="bold">price: </span>{`${product.price} USD`}</li>
                  </ul>
                </div>
                <form onSubmit={addProductToCart} className="form-addItem light">
                  <label>Size:
                    <select onChange={() => setSize(event.target.value)} name="size" defaultValue={size}>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                    </select>
                  </label>
                  <label>QNT:
                    <input onChange={() => setQuantity(event.target.value)} type="number" name="quantity" value={quantity} />
                  </label>
                  <button type="submit">ADD TO CART<span className="message">{userFeedback}</span></button>
                </form>
              </div>
            </div>
          </Switch.Case>

        </Switch>
      </main>
      <Footer />
    </div>
  )
}
