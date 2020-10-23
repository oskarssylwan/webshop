import React, {Component} from 'react';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      subject: '',
      contactMessage: ''
    }
  };

  onInputChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({message: 'Message Sent!'});
    this.resetValues();
  }

  resetValues = () => {
    this.setState({
      name: '',
      email: '',
      subject: '',
      contactMessage: ''
    })
  }


  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input name='name' type='text' onChange={this.onInputChange} value={this.state.name} placeholder='Name' required/>
        <input name='email' type='text' onChange={this.onInputChange} value={this.state.email} placeholder='Email' required/>
        <input name='subject' type='text' onChange={this.onInputChange} value={this.state.subject} placeholder='Subject' required/>
        <textarea name='contactMessage' onChange={this.onInputChange} value={this.state.contactMessage} placeholder='Message' required/>
        <fieldset className='buttons'>
          <span className='message'>{this.state.message}</span>
          <button type='submit'>Send</button>
        </fieldset>
      </form>
    );
  }
}

export default ContactForm;
