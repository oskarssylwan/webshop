import React, { useState } from 'react'
import { useForm } from '../Form'

export const ContactForm = () => {
  const [formValues, setFormValue, resetForm] = useForm()
  const [userFeedback, setUserFeedback] = useState('')

  const onSubmit = event => {
    event.preventDefault()
    resetForm()
    setUserFeedback('Message Sent!')
  }

  return (
    <form onSubmit={onSubmit} onChange={setFormValue}>
      <input name="name" type="text" value={formValues.name} placeholder="Name" required/>
      <input name="email" type="text" value={formValues.email} placeholder="Email" required/>
      <input name="subject" type="text" value={formValues.subject} placeholder="Subject" required/>
      <textarea name="contactMessage" value={formValues.contactMessage} placeholder="Message" required/>
      <fieldset className="buttons">
        <span className="message">{userFeedback}</span>
        <button type="submit">Send</button>
      </fieldset>
    </form>
  )
}
