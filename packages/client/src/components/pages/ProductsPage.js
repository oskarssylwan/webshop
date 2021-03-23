import React, { Component, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import * as Api from 'integrations/api'
import { routes } from '../../config.js'
import { Header} from '../Header'
import { Footer } from '../Footer'
import { BasicBlock } from '../blocks/BasicBlock'
import { Loading } from '../../icons/Loading'
import { Switch } from 'components/Switch'
import '../../css/grid-square.css'
import '../../css/pages/page-shop.css'

const PageStatus = {
  Loading: 'Loading',
  Error: 'Error',
  Idle: 'Idle',
  NoProducts: 'NoProducts'
}

const Categories = {
  tops: ['cardigans', 'shirts', 'tshirts', 'tops'],
  bottoms: ['jeans', 'skirts', 'shorts'],
  shoes: ['shoes'],
  bags: ['bags'],
  accessories: ['socks', 'glasses', 'watches', 'hats']
}

export const ProductsPage = () => {
  const { category } = useParams()
  const [pageStatus, setPageStatus] = useState(PageStatus.Loading)
  const [products, setProducts] = useState([])

  useEffect(() => {
    setPageStatus(PageStatus.Loading)
    const categories = Categories[category] || []
    Api.getProducts({ categories })
      .then(products => {
        setProducts(products)
        products.length
          ? setPageStatus(PageStatus.Idle)
          : setPageStatus(PageStatus.NoProducts)
      })
      .catch(() => setPageStatus(PageStatus.Error))
  }, [category])

  return (
    <div className="page">
      <Header/>
      <main id="content-main" className="container">
        <div className="wrapper-shop">

          <header>
            <h1>Our 2017 Collection</h1>
            <div className="wrapper-category-selection">
              <nav>
                <Link to="/shop/tops">Tops</Link>
                <Link to="/shop/bottoms">Bottoms</Link>
                <Link to="/shop/shoes">Shoes</Link>
                <Link to="/shop/bags">Bags</Link>
                <Link to="/shop/accessories">Accessories</Link>
              </nav>
            </div>
          </header>

          <Switch on={pageStatus}>

            <Switch.Case match={[PageStatus.Error, PageStatus.NoProducts]}>
              <div className="message">
                <p>No products found</p>
              </div>
            </Switch.Case>

            <Switch.Case match={[PageStatus.Loading]}>
              <div className="message">
                <Loading classes="loading social-icons"/>
              </div>
            </Switch.Case>

            <Switch.Case match={[PageStatus.Idle]}>
              <div className="grid-square">
                {products.map(product => (
                  <BasicBlock
                    href={`/item/${product._id}`}
                    title={product.name}
                    image={product.image}
                    secondary={`${product.price} USD`}
                    key={product._id}
                    additionalClasses={`
                      block-size-s
                      cursor-style-pointer
                      transition-scale
                    `}
                  />
                ))}
              </div>
            </Switch.Case>

          </Switch>

        </div>
      </main>
      <Footer />
    </div>
  )
}
