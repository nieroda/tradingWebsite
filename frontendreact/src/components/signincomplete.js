import React, { Component } from 'react'
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import { setCurrentUser, setAuthorizationToken } from '../store/actions/auth'
import jwtDecode from 'jwt-decode'
import { hotFix } from '../containers/App'

//hoc
//Could just call dispatch on store?

class SignInComplete extends Component {
  componentWillMount() {
    let token = cookie.load('token')
    localStorage.setItem("jwtToken", token)
    setAuthorizationToken(token)
    let user = jwtDecode(localStorage.jwtToken)
    hotFix({
      type: "SET_CURRENT_USER",
      user
    })
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
