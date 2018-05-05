import React, { Component } from 'react'
import Trade from '../containers/Trade'




class viewTrades extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <Trade />
          <Trade />
          <Trade />
        </div>
        <div className="col-md-2" />
      </div>
    )
  }
}

export default viewTrades
