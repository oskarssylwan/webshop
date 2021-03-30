import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { Cart, CartPage } from 'components/cart'
import { HomePage } from 'components/home'
import { LoginPage } from 'components/login'
import { AdminPage } from 'components/admin'
import { AboutPage } from 'components/about'
import { LocationsPage } from 'components/locations'
import { ProductsPage, ProductPage } from 'components/products'
import { ContactPage } from 'components/contact'
import { CheckoutPage } from 'components/checkout'

export const App = () => (
  <Cart>
    <BrowserRouter>
      <div className="site">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/products/:productId" component={ProductPage} />
          <Redirect from="/item" to="/shop"/>
          <Route path="/about" component={AboutPage} />
          <Route path="/stores" component={LocationsPage} />
          <Route path="/shop/:category" component={ProductsPage} />
          <Route path="/shop" component={ProductsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </Cart>
)
