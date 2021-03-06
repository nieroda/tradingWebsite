import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store/actions/auth'

class NavBar extends Component {

  logout = e => {
    e.preventDefault()
    logout()
  }

  render() {
    return (
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className='navbar-header'>
            <Link to="/" className="navbar-brand">
              <img src="https://steamuserimages-a.akamaihd.net/ugc/886382257782672290/D8AB973E4A25B93DB4451DDE07176D599BE5953E/" alt="Home" />
            </Link>
          </div>
            {this.props.isAuthenticated ? (
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/main">All Trades</Link>
                </li>
                <li>
                  <Link to="/mytrades">My Trades</Link>
                </li>
                <li>
                  <Link to="/newtrade">New Trade</Link>
                </li>
                <li
                  className="fixLogout"
                  onClick={this.logout}
                  >
                  <a>Logout</a>
                </li>
              </ul>
            ): (
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/signin">Sign Up / Log In</Link>
                </li>
              </ul>
            )}
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.userReducer.isAuthenticated,
    currentUser: state.userReducer.user
  }
}

export default connect(mapStateToProps, { logout })(NavBar)
//export default NavBar;
