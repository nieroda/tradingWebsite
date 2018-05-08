import React, { Component } from 'react'
import SmartTradeBox from './trade/smartTradeBox'
import Item from './trade/Item'
import { apiCall } from '../services/api'




class NewTrade extends Component {
  state = {
    loading: true,
    items: [],
    selected: 0,
    selectedItems: [],
    value: '',
    searchValue: ''
  }

  componentWillMount() {

    const cachedHits = localStorage.getItem("ITEMZ");
    if (cachedHits) {
      this.setState({ items: JSON.parse(cachedHits), loading: false });
    }



    const s64id = '76561197966756586'
    apiCall('get', `/inventory/${s64id}`).then(
      items => {
        this.setState({ loading: false })
        //this.setState({ items, loading: false })
        this.onSetResult(items)
      }
    ).catch(fuck => console.log(fuck))
  }

  onSetResult = items => {
    localStorage.setItem("ITEMZ", JSON.stringify(items));
    this.setState({items})
  }

  searchValueChange = ({ target: { value }}) => {
    this.setState({ searchValue: value })
    const newState = this.state.items.map((i, idx) => {
      return i.marketHashName.toLowerCase().includes(value) ? {
        ...i,
        filtered: false
      } : {
        ...i,
        filtered: true
      }
    })
    this.setState({ items: newState })
  }


  handleChange = (event) => {
    if (event.target.value.length > 200) return
    this.setState({ value: event.target.value});
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
  }

  onEvict = (idx) => {
    const newItemState = this.state.items.map(c => {
      if (c.idx === idx) {
        return {
          ...c,
          selected: false
        }
      } return c
    })
    const selectedItemState = this.state.selectedItems.filter(i => i.idx !== idx)

    this.setState({
      items: newItemState,
      selectedItems: selectedItemState,
      selected: this.state.selected - 1
    })
  }

  render() {
    const items = this.state.items.map((i, idx) => {
      return i.filtered ? null : (
        <Item
          marketHashName={i.marketHashName}
          onSelect={() => this.onSelect(i)}
          tradable={i.tradable}
          category={i.category}
          selected={i.selected}
          image={i.image}
          key={idx}
        />
      )
    }).filter(i => i !== null)

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
            <div className="tradeSelector">
              <div className="flx1">
                <input
                  type="text"
                  className="inputBoxTrade flx1 restrictBtn"
                  size="25"
                  name="title"
                  placeholder="Search"
                  value={this.state.searchValue}
                  onChange={this.searchValueChange}
                />
              </div>
              <button className="flx1 tradeButton restrictBtn">
                To Have
              </button>
              <button className="flx1 tradeButton restrictBtn">
                To Want
              </button>
            </div>
            <div>
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

          <br />

          <div className="tradeBox">
            <div className="tradeAccept">
              <textarea value={this.state.value} onChange={this.handleChange} rows="4" cols="83" className="inputTradeText">
                This IS SO TEMPORARY
              </textarea>
              <div className="tradeAcceptBottom">
                <h3>{this.state.value.length}/200</h3>
                <button className='tradeButton'>
                  TRADE!
                </button>
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
        <div className="col-md-2" />
      </div>
    )
  }
}

export default NewTrade
