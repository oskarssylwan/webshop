import React, { Component } from 'react';
import {routes} from  '../../config.js';
import helpers from '../../helpers.js';
import '../../css/login.css'

class UpploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      color: '',
      material: undefined,
      origin: undefined,
      categories: '',
      description: undefined,
      message: '',
      imageURL:'',
    }
  }

  onInputChange = event => {
    // Add form validation
    switch (event.target.name) {
      case 'imageURL':
        this.setState({
           [event.target.name]: event.target.files[0]}
         );
        break;
      case 'origin':
        this.setState({
           [event.target.name]: event.target.value.toUpperCase()}
         );
        break;

      default:
        this.setState({
           [event.target.name]: event.target.value}
         );
    }
  }

  onSubmit = event => {
    event.preventDefault();
    const image = this.state.imageURL;
    helpers.convertTo64(image, this.postItem);
  }

  postItem = (imageBase64) => {
    const token = window.localStorage.getItem('token');

    // Create req headers
    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");

    // Create req body
    let requestBody = {
      ...this.state,
      image: imageBase64,
      token
    };
    delete requestBody.message;
    requestBody.categories = requestBody.categories.split(' ');
    requestBody = JSON.stringify(requestBody);

    // Create fetch options
    const options = {
      method: "POST",
      body: requestBody,
      headers: requestHeaders
    }

    // Make request
    fetch(routes.create_item, options)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({message: json.message});
        if (json.success) this.resetValues();
      })
      .catch(error => {
        console.log(error);
        this.setState({message: "Sorry, something went wrong..."})
      })
  }

  resetValues = () => {
    this.setState({
      name: '',
      price: '',
      color: '',
      material: undefined,
      origin: undefined,
      categories: '',
      description: undefined,
      imageURL:'',
    })
    console.log('Values Reset');
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input name='name' type='text' onChange={this.onInputChange} value={this.state.itemName} placeholder='Item Name' required/>
        <input name='price' type='text' onChange={this.onInputChange} value={this.state.price} placeholder='Price' required/>
        <input name='color' type='text' onChange={this.onInputChange} value={this.state.color} placeholder='Color' required/>
        <input name='material' type='text' onChange={this.onInputChange} value={this.state.material} placeholder='Material'/>
        <input name='origin' type='text' onChange={this.onInputChange} value={this.state.origin} placeholder='Origin' required/>
        <input name='categories' type='text' onChange={this.onInputChange} value={this.state.categories} placeholder='Categories' required/>
        <textarea name='description' onChange={this.onInputChange} value={this.state.description} placeholder='Description'/>
        <input name='imageURL' type='file' onChange={this.onInputChange} required/>
        <fieldset className='buttons'>
          <span className='message'>{this.state.message}</span>
          <button type='submit'>Create Item</button>
        </fieldset>
      </form>
    );
  }
}

export default UpploadForm;
