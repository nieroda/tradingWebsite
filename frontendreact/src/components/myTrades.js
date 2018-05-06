import React, { Component } from 'react'
import Trade from '../containers/Trade'


class MyTrades extends Component {

  getRandomSaying = () => {
    let sayings = [
      "This is one saying lorem ipsum Recovery-10.12",
      "This is another Darwin25-6.2-Goliath",
      "MLK QUOTE?"
    ]
    return sayings[Math.floor(Math.random() * sayings.length)]
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <div className="centerNow">
            <div className="content">
              <div className="card">
                <div className="firstinfo"><img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fc/fc4aeb854b209f34718fb2af6be0a7168a241d84_medium.jpg"/>
                  <div className="profileinfo">
                    <h1>Joey / Steam Name</h1>
                    <h3>9,444 Trades</h3>
                    <p className="bio">{this.getRandomSaying()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Trade />
          <Trade />
          <Trade />
          <Trade />

        </div>
        <div className="col-md-2" />
      </div>
    )
  }
}

export default MyTrades;
