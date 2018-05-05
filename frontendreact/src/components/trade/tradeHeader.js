import React from 'react'

const TradeHeader = ({ name, time = 0 }) => (
  <div className="tradeHeader">
    <div className="">
      <strong>{name}</strong> wants to trade:
    </div>
    <div className="">
      {time} seconds ago
    </div>
  </div>
)

export default TradeHeader
