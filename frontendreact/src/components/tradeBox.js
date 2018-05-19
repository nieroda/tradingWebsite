import React, { Component } from 'react'

class TradeBox extends Component {
  
  state = {
    trades: [],
    shownTrades: [],
    numTrades: 0,
    numBoxes: 0,
    currentIdx: 0
  }

  componentWillMount() {
    let { trades } = this.props

    this.setState({
      trades,
      numTrades: trades.length,
      numBoxes: Math.ceil(trades.length / 10)
    }, () => {
      this.getCorrectTrades()
    })
  }

  newTradeScreen = (index) => {
    this.setState({
      currentIdx: index
    }, () => this.getCorrectTrades())
  }

  getCorrectTrades = () => {
    let newShownTrades = []
    let correctIdx = this.state.currentIdx * 10
    for (let i = correctIdx; i < correctIdx + 10; i++) {
      newShownTrades.push(this.state.trades[i])
    }

    this.setState({
      shownTrades: newShownTrades
    })
  }

  render() {

    let tryNow = []
    for (let i = 0; i < this.state.numBoxes; i++) {
      tryNow.push(
        <span
          className={`paddNum ${this.state.currentIdx === i ? "selectedNumber" : ""}`}
          key={i}
          onClick={() => this.newTradeScreen(i)}
        >
          {i}
        </span>
      )
    }
    return (
      <div>
        {this.state.shownTrades}

        <div className="tradeNumberSelector">
          {tryNow}
        </div>

      </div>
    )
  }
}

export default TradeBox
