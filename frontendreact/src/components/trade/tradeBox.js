import React from 'react'

import Item from './Item'


const TradeBox = () => (
  <div className="tradeBox">
    <div className="left">
      <div className="itemsContainer">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
    <div className="right">
      <div className="itemsContainer">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  </div>
)

export default TradeBox
