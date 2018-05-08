import React, { Component } from 'react'
import Trade from '../containers/Trade'
import { connect } from 'react-redux'
import TradeBox from './tradeBox'


class MyTrades extends Component {

  getRandomSaying = () => {
    let sayings = [
      "React 15 no longer emits extra nodes around the text, making the DOM output much cleaner.",
      "We’re switching to major versions to indicate that we have been using React in production for a long time.",
      "the Facebook codebase has over 20,000 React components, and that’s not even counting React Native {{WOW}}",
      "We are now using document.createElement instead of setting innerHTML when mounting components. This allows us to get rid of the data-reactid attribute on every node and make the DOM lighter. Using document.createElement is also faster in modern browsers and fixes a number of edge cases related to SVG elements and running multiple copies of React on the same page."
    ]
    return sayings[Math.floor(Math.random() * sayings.length)]
  }

  render() {
    let trades = []
    for (let i = 0; i < 55; i++) {
      trades.push(<Trade />)
    }

    let { avatarmedium, displayName, tradesOpen } = this.props
    console.log(avatarmedium)
    return (
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <div className="centerNow">
            <div className="content">
              <div className="card">
                <div className="firstinfo"><img src={avatarmedium} alt="photoProfile"/>
                  <div className="profileinfo">
                    <h1>{displayName}</h1>
                    <h3>{tradesOpen} Trades</h3>
                    <p className="bio">{this.getRandomSaying()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <TradeBox
            trades={trades}
          />


        </div>
        <div className="col-md-2" />
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  const { userReducer: { user: { displayName, tradesOpen, profileurl, avatarmedium } } } = state
  return {
    displayName,
    tradesOpen, /* Trades NOT trades open TODO */
    profileurl,
    avatarmedium
  }
}

export default connect(mapStateToProps)(MyTrades)
//export default MyTrades;
