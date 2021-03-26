import React, { useState } from 'react'
import { routes } from '../../config'
import { convertTo64 } from '../../helpers'
import { useForm } from '../Form'
import '../../css/login.css'

const defaultFormValues = () => ({
  name: '',
  price: '',
  color: '',
  material: '',
  origin: '',
  categories: '',
  description: '',
  message: '',
  image: { files: [] }
})

export const UploadForm = () => {
  const [formValues, setFormValue, resetForm] = useForm(defaultFormValues())
  const [userFeedback, setUserFeedback] = useState('')

  const postItem = imageBase64 => {
    const token = window.localStorage.getItem('token')
    const requestHeaders = new Headers()
    requestHeaders.append('Content-Type', 'application/json')

    let requestBody = {
      ...formValues,
      image: imageBase64,
      imageFormat: formValues.image.type,
      token
    }

    requestBody.categories = requestBody.categories.split(' ')
    requestBody = JSON.stringify(requestBody)

    const options = {
      method: 'POST',
      body: requestBody,
      headers: requestHeaders
    }

    fetch(routes.createItem, options)
      .then(response => response.json())
      .then(json => {
        setUserFeedback(json.message)
        if (json.success) resetForm()
      })
      .catch(error => setUserFeedback('Sorry, something went wrong...'))
  }

  const onSubmit = event => {
    event.preventDefault()
    convertTo64(formValues.image.files[0], postItem)
  }

  return (
    <form onSubmit={onSubmit} onChange={setFormValue}>
      <input name="name" type="text" value={formValues.itemName} placeholder="Item Name" required/>
      <input name="price" type="text" value={formValues.price} placeholder="Price" required/>
      <input name="color" type="text" value={formValues.color} placeholder="Color" required/>
      <input name="material" type="text" value={formValues.material} placeholder="Material"/>
      <input name="origin" type="text" value={formValues.origin} placeholder="Origin" required/>
      <input name="categories" type="text" value={formValues.categories} placeholder="Categories" required/>
      <textarea name="description" value={formValues.description} placeholder="Description"/>
      <input name="image" type="file" required/>
      <fieldset className="buttons">
        <span className="message">{userFeedback}</span>
        <button type="submit">Create Item</button>
      </fieldset>
    </form>
  )
}
