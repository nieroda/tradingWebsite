import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import { connect } from 'react-redux'
//import { logout } from '../store/actions/auth'

class NavBar extends Component {

  logout = e => {
    e.preventDefault()
  //  this.props.logout()
  }

  render() {
    let isAuthenticated = true
    return (
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className='navbar-header'>
            <Link to="/" className="navbar-brand">
              <img src="https://steamuserimages-a.akamaihd.net/ugc/886382257782672290/D8AB973E4A25B93DB4451DDE07176D599BE5953E/" alt="Home" />
            </Link>
          </div>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Log In</Link>
              </li>
            </ul>
        </div>
      </nav>
    )
  }
}
/*
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}
*/
//export default connect(mapStateToProps, { logout })(NavBar)
export default NavBar;
