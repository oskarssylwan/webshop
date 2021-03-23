import React, { Component } from 'react'
import { routes } from '../../config.js'
import { isAdmin } from '../../helpers.js'
import '../../css/login.css'

export class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      password: '',
      username: '',
      message: ''
    }
  }

  onInputChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  onSubmit = event => {
    event.preventDefault()
    const requestHeaders = new Headers()

    requestHeaders.append('Content-Type', 'application/json')

    const requestBody = JSON.stringify({
      username: this.state.username,
      password: this.state.password
    })

    const options = {
      method: 'POST',
      body: requestBody,
      headers: requestHeaders
    }

    fetch(routes.login, options)
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          localStorage.setItem('token', `${json.token}`)
          this.redirect()
        }
        this.setState({message: json.message})
        this.resetInputFields()

      })
      .catch(err => {
        this.setState({ message: 'Sorry, something went wrong...' })
        this.resetInputFields()
      })
  }

  resetInputFields = () => {
    this.setState({
      password: '',
      username: ''
    })
  }

  redirect = () => {
    console.log(window.localStorage.token)
    if (isAdmin(window.localStorage.token)) {
      window.location = '/admin'
    } else {
      window.location = '/'
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input name="username" type="text" onChange={this.onInputChange} value={this.state.username} placeholder="Username" required/>
        <input name="password" type="password" onChange={this.onInputChange} value={this.state.password} placeholder="Password" required/>
        <fieldset className="buttons">
          <span className="message">{this.state.message}</span>
          <button type="submit">Login</button>
        </fieldset>
      </form>
    )
  }
}
