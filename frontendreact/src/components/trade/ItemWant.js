import React, { Component } from 'react'
import { EffectMap } from '../../compressor/maps/itemEffectMap'


class ItemWant extends Component {
  state = {
    isHovering: false,
  }

  handleMouseHoverEnter = () => {
    this.setState({
      isHovering: true
    });
  }

  handleMouseHoverLeave = () => {
    this.setState({
      isHovering: false
    })
  }

  handleChangeEffect = ({ target: { value }}) => {
    let { index, addEffect } = this.props
    addEffect(index, value)
  }

  handleChangeType = ({ target: { value }}) => {

  }


  render() {

    let border = 'itemImg'
    let { category, selected, effect, addEffect, idx } = this.props
    if (category === 'Unique')  border += ' uniqueItem'
    if (category === 'Strange') border += ' strangeItem'
    if (category === 'Unusual') border += ' unusualHat'
    if (category === 'Vintage') border += ' vintageItem'
    if (selected) border += ' selected'

    let image = this.props.image || "https://steamcommunity-a.akamaihd.net/economy/image/1MrIl4MIJ_pNBhReTwBpxJ8G4GM4OekG2V3huqL5LCqk1i0eEBQwwm_zt8cl-xrtvDXIxynVGhd-5BiafXWCP1pqEceh9FmngpDgffU/360fx360f"

    return (
      <span className='dropdown'>
        <img
          onMouseEnter={this.handleMouseHoverEnter}
          onMouseLeave={this.handleMouseHoverLeave}
          onClick={this.props.onSelect ? this.props.onSelect : this.props.onEvict}
          alt="item"
          className={`${border} ${effect ? effect.toLowerCase().replace(/\s+/g, '') : null} generalEffect`}
          src={image}
        />
        <div className="dropdown-content">
          <div className="form-group">
            <label>Effect:</label>
            <select className="form-control" onChange={this.handleChangeEffect}>
              <option>None</option>
              {Object.keys(EffectMap).map(effectName => <option>{effectName}</option>)}
            </select>
            <br />
            <label>Effect:</label>
            <select className="form-control" onChange={this.handleChangeType}>
              <option>None</option>
              <option>Vintage</option>
              <option>Genuine</option>
              <option>Strange</option>
              <option>Unusual</option>

            </select>
          </div>
        </div>

      </span>


    )
  }
}

export default ItemWant
