import React, { Component } from 'react'
import { connect } from 'react-redux'

export default function withAuth(componentToBeRendered) {
  class Authenticated extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push("/signin")
      }
    }

    componentWillUpdate() {
      if (!this.props.isAuthenticated) {
        this.props.history.push("/signin")
      }
    }

    render() {
      return <ComponentToBeRendered {...this.props} />
    }
  }

  const mapStateToProps = state => {
    const { currentUser: { isAuthenticated } } = state
    return { currentUser }
  }

  export default connect(mapStateToProps)(Authenticated)

}
