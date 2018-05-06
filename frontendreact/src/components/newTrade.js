import React, { Component } from 'react'
import Trade from '../containers/Trade'
import TradeBox from './trade/tradeBox'
import SmartTradeBox from './trade/smartTradeBox'
import Item from './trade/Item'
import { apiCall } from '../services/api'



class NewTrade extends Component {
  state = {
    loading: true,
    items: [],
    selected: 0,
    selectedItems: []
  }

  componentWillMount() {
    const s64id = '76561197966756586'
    apiCall('get', `/backpack/${s64id}`).then(
      items => this.setState({ items, loading: false })
    ).catch(fuck => console.log(fuck))

    setTimeout(() => console.log(this.state.items), 8000)
  }

  onSelect = (item) => {
    if (this.state.selected > 7) return;
    if (item.selected === true) return;
    const newState = this.state.items.map(c => {
      if (c.idx === item.idx) {
        return {
          ...c,
          selected: true
        }
      } return c
    })

    this.setState({ selected: this.state.selected + 1 })
    this.setState({ selectedItems: [...this.state.selectedItems, item], items: newState })
    console.log(this.state.selectedItems)
  }

  onEvict = (item) => {
    const newItemState = this.state.items.map(c => {
      if (c.idx === item.idx) {
        return {
          ...c,
          selected: false
        }
      } return c
    })
    const selectedItemState = this.state.selectedItems.filter(i => i.idx !== item.idx)

    this.setState({
      items: newItemState,
      selectedItems: selectedItemState,
      selected: this.state.selected - 1
    })
  }

  render() {
    const items = this.state.items.map((i, idx) => (
      <Item
        marketHashName={i.marketHashName}
        onSelect={() => this.onSelect(i)}
        tradable={i.tradable}
        category={i.category}
        selected={i.selected}
        image={i.image}
        key={idx}
      />
    ))

    return (
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <SmartTradeBox
            onEvict={this.onEvict}
            toWant={this.state.selectedItems}
            toHave={[]}
           />
          <br />

          <div className="selectItems tradeBox">
            {this.state.loading &&
              <div id="load">
                <div>G</div>
                <div>N</div>
                <div>I</div>
                <div>D</div>
                <div>A</div>
                <div>O</div>
                <div>L</div>
              </div>
            }
            {items}

          </div>
        </div>
        <div className="col-md-2" />
      </div>
    )
  }
}

export default NewTrade
