import React, { Component } from 'react'

class SignIn extends Component {

  state = {
    email: '',
    password: ''
  }

  render() {
    return (
      <div>
        <div className='login'>
          <h2>Sign In</h2>
          <input name='username' placeholder='Email' type='text'/>
          <input id='pw' name='password' placeholder='Password' type='password'/>
          <input type='submit' value='Sign In With Steam'/>
          <a className='forgot' href='#'>Forgot your password?</a>
        </div>
      </div>
    )
  }
}

export default SignIn
