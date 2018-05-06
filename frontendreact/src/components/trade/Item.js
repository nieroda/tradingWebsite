import React, { Component } from 'react'




class Item extends Component {
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



  render() {
    let border = 'itemImg'
    let { category, selected } = this.props
    if (category === 'Unique')  border += ' uniqueItem'
    if (category === 'Strange') border += ' strangeItem'
    if (category === 'Unusual') border += ' unusualHat'
    if (category === 'Vintage') border += ' vintageItem'
    if (selected) border += ' selected'

    let image = this.props.image || "https://steamcommunity-a.akamaihd.net/economy/image/1MrIl4MIJ_pNBhReTwBpxJ8G4GM4OekG2V3huqL5LCqk1i0eEBQwwm_zt8cl-xrtvDXIxynVGhd-5BiafXWCP1pqEceh9FmngpDgffU/360fx360f"

    return (
      <span className=''>
        <img
          onMouseEnter={this.handleMouseHoverEnter}
          onMouseLeave={this.handleMouseHoverLeave}
          onClick={this.props.onSelect ? this.props.onSelect : this.props.onEvict}
          alt="item"
          className={`${border}`}
          src={image}
          />
          {this.state.isHovering &&
            <div className="itemHover">
              {this.props.marketHashName}
            </div>
          }

      </span>
    )
  }
}

export default Item
