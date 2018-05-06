import React from 'react'

const Item = ({
  marketHashName,
  tradable,
  image = "https://steamcommunity-a.akamaihd.net/economy/image/1MrIl4MIJ_pNBhReTwBpxJ8G4GM4OekG2V3huqL5LCqk1i0eEBQwwm_zt8cl-xrtvDXIxynVGhd-5BiafXWCP1pqEceh9FmngpDgffU/360fx360f",
  onSelect = nathan => 'KAMM',
  onEvict = nathan => 'KAMM',
  selected = false,
  category
}) => {
  let border = 'itemImg'

  if (category === 'Unique')  border += ' uniqueItem'
  if (category === 'Strange') border += ' strangeItem'
  if (category === 'Unusual') border += ' unusualHat'
  if (selected) border += ' selected'

  return (
    <img
      onClick={onSelect ? onSelect : onEvict}
      alt="item"
      className={`${border}`}
      src={image}
      />
  )
}

export default Item
