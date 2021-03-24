import React, { useState } from 'react'

export const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [userFeedback, setUserFeedback] = useState('')

  const onSubmit = event => {
    event.preventDefault()
    setName('')
    setEmail('')
    setSubject('')
    setContactMessage('')
    setUserFeedback('Message Sent!')
  }

  return (
    <form onSubmit={onSubmit}>
      <input name="name" type="text" onChange={event => setName(event.target.value)} value={name} placeholder="Name" required/>
      <input name="email" type="text" onChange={event => setEmail(event.target.value)} value={email} placeholder="Email" required/>
      <input name="subject" type="text" onChange={event => setSubject(event.target.value)} value={subject} placeholder="Subject" required/>
      <textarea name="contactMessage" onChange={event => setContactMessage(event.target.value)} value={contactMessage} placeholder="Message" required/>
      <fieldset className="buttons">
        <span className="message">{userFeedback}</span>
        <button type="submit">Send</button>
      </fieldset>
    </form>
  )
}
