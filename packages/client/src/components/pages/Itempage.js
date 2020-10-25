import React, { Component } from 'react';
import {routes} from  '../../config.js';
import '../../css/pages/page-item.css'

//Components
import Header from '../Header';
import Footer from '../Footer';
import BasicBlock from '../blocks/BasicBlock.js';

class Itempage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'M',
      quantity: 1,
      item: {},
      message: ''
    };
  };

  onInputChange = (event) => {
    switch (event.target.name) {
      default:
        this.setState({
          [event.target.name]: event.target.value
        })
    }
  }

  addItemToCart = (item) => {
    const localStorage = window.localStorage;

    // Create cart if empty
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    }

    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('New cart', JSON.parse(localStorage.getItem('cart')));
  }

  onSubmit = (event) => {
    event.preventDefault();
    const item = {
      item_id: this.props.match.params.itemID,
      size: this.state.size,
      quantity: this.state.quantity
    };
    this.addItemToCart(item);
    this.setState({
      message: 'Item Added'
    });
  }

  fetchItem() {
    fetch(routes.get_item + this.props.match.params.itemID)
      .then(res => res.json())
      .then(json => {
        this.setState({item: json.item})
        console.log(json);
      })
      .catch(err => console.log(err));
  }

  renderParagraphs = () => {
    if (this.state.item.description) {
      return this.state.item.description.map((paragraph, index) => <p key={index}>{paragraph}</p>);
    }
  }

  componentDidMount() {
    this.fetchItem()
  }

  render() {
    const item = this.state.item;
    return (
      <div className='page'>
        <Header />
        <main id='content-main' className='container'>
          <div id="page-item" className='container'>
              <BasicBlock
                image={item.image}
                additionalClasses='image-wrapper scale-07'
              />
            <div className="item-info">
              <div className="wrapper">
                <h2>{item.name}</h2>
                {
                  this.renderParagraphs()

                }

                <ul className='item-specifications light'>
                  <li><span className="bold">color: </span>{item.color}</li>
                  <li><span className="bold">material: </span>{item.material}</li>
                  <li><span className="bold">price: </span>{`${item.price} USD`}</li>
                </ul>
              </div>
              <form onSubmit={this.onSubmit} className='form-addItem light'>
                <label>Size:
                  <select onChange={this.onInputChange} name="size" defaultValue={this.state.size}>
                    <option value="S">S</option>
                    <option value="M" >M</option>
                    <option value="L">L</option>
                  </select>
                </label>
                <label> QNT:
                  <input onChange={this.onInputChange} type='number' name='quantity' value={this.state.quantity} />
                </label>
                <button type='submit'>ADD TO CART<span className='message'>{this.state.message}</span></button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  };
}

export default Itempage;
