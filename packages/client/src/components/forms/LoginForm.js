import React, { useState } from 'react'
import { routes } from 'config'
import { useForm } from 'components/shared/Form'

const defaultFormValues = () => ({
  password: '',
  username: ''
})

export const LoginForm = () => {
  const [formValues, setFormValue, resetForm] = useForm(defaultFormValues())
  const [userFeedback, setUserFeedback] = useState('')

  const onSubmit = event => {
    event.preventDefault()
    const requestHeaders = new Headers()

    requestHeaders.append('Content-Type', 'application/json')

    const requestBody = JSON.stringify({
      username: formValues.username,
      password: formValues.password
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
          window.location = '/admin'
        }
        setUserFeedback(json.message)
        resetForm()
      })
      .catch(err => {
        setUserFeedback('Sorry, something went wrong...')
        resetForm()
      })
  }

  return (
    <form onSubmit={onSubmit} onChange={setFormValue}>
      <input name="username" type="text" value={formValues.username} placeholder="Username" required/>
      <input name="password" type="password" value={formValues.password} placeholder="Password" required/>
      <fieldset className="buttons">
        <span className="message">{userFeedback}</span>
        <button type="submit">Login</button>
      </fieldset>
    </form>
  )
}
