import React from 'react'
import Item from './Item'
import ItemWant from './ItemWant'

const SmartTradeBox = ({
  toWant,
  toHave,
  onEvict,
  onEvictWant,
  addEffect
}) => {
  const wantItems = toWant.map((i, idx) => (
    <Item
      marketHashName={i.marketHashName}
      onSelect={null}
      onEvict={() => onEvict(i.idx)}
      tradable={i.tradable}
      category={i.category}
      image={i.image}
      effect={i.effect}
      key={idx}
    />
  ))

  const haveItems = toHave.map((i, idx) => (
    <ItemWant
      addEffect={addEffect}
      index={idx}
      marketHashName={i.marketHashName}
      onSelect={null}
      onEvict={() => onEvictWant(i.idx)}
      tradable={i.tradable}
      unusual={i.category === "Unusual"}
      effect={i.effect}
      image={`http://media.steampowered.com/apps/440/icons/${i.image}`}
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
