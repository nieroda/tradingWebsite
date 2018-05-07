import React, { Component } from 'react'
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import { setCurrentUser, setAuthorizationToken } from '../store/actions/auth'

//hoc

class SignInComplete extends Component {
  componentWillMount() {
    let token = cookie.load('token')
    localStorage.setItem("jwtToken", token)
    setAuthorizationToken(token)
    //decode token and set user  :-)
    //setCurrentUser(user)
    //todo /
    this.props.history.push('/mytrades')
  }



  render() {
    return (
      <div />
    )
  }
}

function mapStateToProps(state) {
  return {}
}


export default connect(mapStateToProps, { setCurrentUser })(SignInComplete)
