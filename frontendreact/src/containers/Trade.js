import React from 'react'

import TradeHeader from '../components/trade/tradeHeader'
import TradeBox from '../components/trade/tradeBox'
import TradeFooter from '../components/trade/tradeFooter'

const fakeNames = [
  "Thomas",
  "Nathan",
  "Matthias",
  "NotHelen",
  "Johny",
  "Tommy",
  "Tummus"
]

const fakeTimes = [
  "1233",
  "34534",
  "64353",
  "456453",
  "453453",
  "345342",
  "22",
  "345"
]

const fakeTradeContent = [
  "50000 KEYS: QUICKSALE trade fest men ////",
  "2 keys quicsale trade fest",
  "free stuff i hate this",
  "uggggg take my items tf2 sucks",
  "free steamrep sucks"
]

const Trade = () => {

  let name = fakeNames[Math.floor(Math.random() * fakeNames.length)]
  let time = fakeTimes[Math.floor(Math.random() * fakeTimes.length)]
  let text = fakeTradeContent[Math.floor(Math.random() * fakeTradeContent.length)]

  return (
    <div className="tradeContainer">
      <TradeHeader
        name={name}
        time={time}
      />
      <TradeBox />
      <TradeFooter
        text={text}
      />
    </div>
  )
}

export default Trade;
