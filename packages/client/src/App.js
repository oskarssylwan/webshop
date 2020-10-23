import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Homepage from './components/pages/Homepage';
import Loginpage from './components/pages/Loginpage';
import Adminpage from './components/pages/Adminpage';
import Itempage from './components/pages/Itempage';
import Aboutpage from './components/pages/Aboutpage';
import Storepage from './components/pages/Storepage';
import Shoppage from './components/pages/Shoppage';
import Contactpage from './components/pages/Contactpage';
import Cartpage from './components/pages/Cartpage';
import Checkoutpage from './components/pages/Checkoutpage';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      token: '',
    }
  }

  setToken = () => {
    const localStorage = window.localStorage;
    if (localStorage.getItem('token')) {
      this.setState({
        token: localStorage.getItem('token'),
        loggedIn: true
      })
    }
  }

  componentDidMount() {
    this.setToken();
  }

  render() {
    return (
      <BrowserRouter>
        <div className='site'>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/login' component={Loginpage} />
        <Route exact path='/admin' component={Adminpage} />
        <Route exact path='/item' render={() => <Redirect to='/shop'/>} />
        <Route exact path='/item/:itemID' component={Itempage} />
        <Route exact path='/about' component={Aboutpage} />
        <Route exact path='/stores' component={Storepage} />
        <Route exact path='/shop' component={Shoppage} />
        <Route exact path='/shop/:categories' component={Shoppage} />
        <Route exact path='/contact' component={Contactpage} />
        <Route exact path='/cart' component={Cartpage} />
        <Route exact path='/checkout' component={Checkoutpage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
