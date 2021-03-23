import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { Homepage } from './components/pages/Homepage'
import { Loginpage } from './components/pages/Loginpage'
import { Adminpage } from './components/pages/Adminpage'
import { Itempage } from './components/pages/Itempage'
import { Aboutpage } from './components/pages/Aboutpage'
import { Storepage } from './components/pages/Storepage'
import { Shoppage } from './components/pages/Shoppage'
import { Contactpage } from './components/pages/Contactpage'
import { Cartpage } from './components/pages/Cartpage'
import { Checkoutpage } from './components/pages/Checkoutpage'

export const App = () => (
  <BrowserRouter>
    <div className='site'>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/login' component={Loginpage} />
        <Route path='/admin' component={Adminpage} />
        <Route path='/item/:itemID' component={Itempage} />
        <Redirect from='/item' to='/shop'/>
        <Route path='/about' component={Aboutpage} />
        <Route path='/stores' component={Storepage} />
        <Route path='/shop/:categories' component={Shoppage} />
        <Route path='/shop' component={Shoppage} />
        <Route path='/contact' component={Contactpage} />
        <Route path='/cart' component={Cartpage} />
        <Route path='/checkout' component={Checkoutpage} />
      </Switch>
    </div>
  </BrowserRouter>
)
