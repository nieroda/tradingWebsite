import React from 'react'
import Item from './Item'

const SmartTradeBox = ({
  toWant,
  toHave,
  onEvict
}) => {
  const wantItems = toWant.map((i, idx) => (
    <Item
      marketHashName={i.marketHashName}
      onSelect={null}
      onEvict={() => onEvict(i.idx)}
      tradable={i.tradable}
      category={i.category}
      image={i.image}
      key={idx}
    />
  ))

  const haveItems = toHave.map((i, idx) => (
    <Item
      marketHashName={i.marketHashName}
      onSelect={() => {}}
      onEvict={() => {}}
      tradable={i.tradable}
      unusual={i.category === "Unusual"}
      image={i.image}
      key={idx}
    />
  ))

  return (
    <div className="tradeBox forceTradeBox">
      <div className="left">
        <div className="itemsContainer">
          {wantItems}
        </div>
      </div>
      <div className="right">
        <div className="itemsContainer">
          {haveItems}
        </div>
      </div>
    </div>
  )
}



export default SmartTradeBox