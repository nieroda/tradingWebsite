import React from 'react'

import TradeHeader from '../components/trade/tradeHeader'
import TradeBox from '../components/trade/tradeBox'
import TradeFooter from '../components/trade/tradeFooter'

const Trade = () => (
  <div className="tradeContainer">
    <TradeHeader
      name={"Nieroda"}
      time={"10"}
    />
    <TradeBox />
    <TradeFooter
      text={"50000 KEYS: QUICKSALE trade fest men ////"}
    />
  </div>
)

export default Trade;
