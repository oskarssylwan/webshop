import React, { Component } from 'react'
import { routes } from '../../config.js'
import { Link } from 'react-router-dom'
import { Header } from '../Header'
import { Footer } from '../Footer'
import '../../css/pages/page-cart.css'

export class Cartpage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      isEmpty: true
    }
  }

  componentWillMount() {
    this.setState({
      isEmpty: this.checkIfCartIsEmpty()
    })
  }

  componentDidMount() {
    const localStorage = window.localStorage
    const items = JSON.parse(localStorage.getItem('cart')) || []
    if (items.length > 0) {
      const itemIDs = items.map(item => item.itemId)
      this.fetchItems(itemIDs)
    }
  }

  fetchItems = (items) => {
    const query = items.join(',')
    const url = routes.getItemsId + query
    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json
        })
      })
      .catch(err => console.log(err))
  }

  removeItemFromCart = event => {
    if (event.target.name) {
      const itemID = event.target.name
      const localStorage = window.localStorage
      const cart = JSON.parse(localStorage.getItem('cart'))
      const newCart = cart.filter(item => item.item_id !== itemID)
      localStorage.setItem('cart', JSON.stringify(newCart))
      this.setState({
        items: this.state.items.filter(item => item._id !== itemID),
        isEmpty: this.checkIfCartIsEmpty()
      })
    }
  }

  checkIfCartIsEmpty = () => {
    const cart = JSON.parse(window.localStorage.getItem('cart'))
    if (!cart || cart.length <= 0) {
      return true
    }
    return false
  }

  render() {

    const renderListItems = () => {
      if (this.state.items.length > 0) {
        return this.state.items.map(item => (
          <li key={item._id}>
            <div className="wrapper-img">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="wrapper-info">
              <span className="light">QNT: 2 | 20:- USD</span>
              <h3><Link to={`/item/${item._id}`}>{item.name}</Link></h3>
            </div>
            <div className="wrapper-button">
              <button name={item._id} onClick={this.removeItemFromCart} className="button-remove-item"></button>
            </div>
          </li>
        ))
      } else {
        //contingency for checkIfCartIsEmpty happens to fail
        return (<li>Your cart is empty</li>)
      }
    }

    const renderCart = () => (
      <div className="wrapper-cart">
        <h1> Your Cart </h1>
        <div className="item-list">
          {renderListItems()}
        </div>
        <div className="cart-info">
          <div>
            <a className="button" href="/checkout">To Chekout</a>
          </div>
        </div>
      </div>
    )

    return (
      <div className="page">
        <Header />
        <main id="content-main" className="container">
          {
            this.state.isEmpty
              ? <div className="wrapper-cart"><h1>Your cart is empty</h1></div>
              : renderCart()
          }
        </main>
        <Footer />
      </div>
    )
  }
}
