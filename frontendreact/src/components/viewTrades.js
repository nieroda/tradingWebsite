import React, { Component } from 'react'
import Trade from '../containers/Trade'
import TradeBox from './tradeBox'



class viewTrades extends Component {

  render() {
    //for example
    let trades = []
    for (let i = 0; i < 12; i++) {
      trades.push(<Trade />)
    }

    return (
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <TradeBox
            trades={trades}
          />
        </div>
        <div className="col-md-2" />
      </div>
    )
  }
}

export default viewTrades
