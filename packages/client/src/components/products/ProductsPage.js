import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import * as Api from 'integrations/api'
import { BasicBlock } from 'components/shared/blocks/BasicBlock'
import { SquareGrid } from 'components/shared/SquareGrid'
import { Loading } from 'icons/Loading'
import { Switch } from 'components/shared/Switch'
import './ProductsPage.css'

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
    <div className="wrapper-shop">

      <header>
        <h1>Our 2021 Collection</h1>
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
          <SquareGrid>
            {products.map(product => (
              <BasicBlock
                href={`/products/${product._id}`}
                title={product.name}
                image={product.image}
                secondary={`${product.price} USD`}
                key={product._id}
                additionalClasses="block-size-s cursor-style-pointer transition-scale"
              />
            ))}
          </SquareGrid>
        </Switch.Case>

      </Switch>

    </div>
  )
}
