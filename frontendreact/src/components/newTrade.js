import React, { Component } from 'react'
import SmartTradeBox from './trade/smartTradeBox'
import Item from './trade/Item'
import { apiCall } from '../services/api'
import { connect } from 'react-redux'


/* very redundant, got really messy terrible code */

class NewTrade extends Component {
  state = {
    loading: true,
    items: [],
    selectedItems: [],
    toWantSelectedItems: [],
    toWantItems: [],
    selected: 0,
    wantSelected: 0,
    have: true,
    value: '',
    searchValue: ''
  }

  componentWillMount() {
    //localStorage.clear()
    const cachedWants = localStorage.getItem("ToWant");
    const cachedHits = localStorage.getItem("ITEMZ");
    //console.log(cachedHits)
    if (cachedHits) {
      this.setState({ items: JSON.parse(cachedHits), loading: false });
    } else {
      const s64id = '76561197966756586'
      apiCall('get', `/TF2/inventory/${s64id}`).then(
        items => {
          //console.log(items)
          this.setState({ loading: false })
          this.onSetResult(items)
        }
      ).catch(fuck => console.log(fuck))
    }

    if (cachedWants) {
      this.setState({ toWantItems: JSON.parse(cachedWants) })
    } else {
      apiCall('get', '/TF2/Items/All').then(
        items => this.setToWantResult(items)
      ).catch(kcuf => console.log(kcuf))
    }
  }

  makeTrade = () => {
    let { selectedItems, toWantSelectedItems, value } = this.state
    console.log(selectedItems)
    apiCall('post', `/TF2Trade/${this.props.steamID}/new`, { selectedItems, toWantSelectedItems, value }).then(
      result => console.log(result)
    ).catch(err => console.log(`err in post new trade ${JSON.stringify(err)}`))
  }

  onSetResult = items => {
    localStorage.setItem("ITEMZ", JSON.stringify(items));
    this.setState({ items })
  }

  setToWantResult = items => {
    localStorage.setItem("ToWant", JSON.stringify(items))
    this.setState({ toWantItems: items })
  }

  updateUnusualEffectToWantItem = (index, newEffect) => {
    console.log('called')
    console.log(newEffect)
    const newToWantItems = this.state.toWantSelectedItems.map((i, idx) => {
      return index === idx ? {
        ...i,
        effect: newEffect
      } : { ...i }
    })


    this.setState({ toWantSelectedItems: newToWantItems })
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


  handleChange = ({ target: { value }}) => {
    if (value.length > 200) return
    this.setState({ value });
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

  onSelectWant = (item) => {
    if (this.state.wantSelected > 7) return;
    if (item.selected === true) return;
    const newState = this.state.toWantItems.map(c => {
      if (c.idx === item.idx) {
        return {
          ...c,
          selected: true
        }
      } return c
    })

    this.setState({ wantSelected: this.state.wantSelected + 1 })
    this.setState({ toWantSelectedItems: [...this.state.toWantSelectedItems, item], toWantItems: newState })
  }

  onEvict = (idx) => {
    const newItemState = this.state.items.map(c => {
      return c.idx === idx ? {
        ...c,
        selected: false
      } : { ...c }
    })
    const selectedItemState = this.state.selectedItems.filter(i => i.idx !== idx)

    this.setState({
      items: newItemState,
      selectedItems: selectedItemState,
      selected: this.state.selected - 1
    })
  }

  onEvictWant = (idx) => {
    const newItemState = this.state.toWantItems.map(c => {
      if (c.idx === idx) {
        return {
          ...c,
          selected: false
        }
      } return c
    })
    const selectedItemState = this.state.toWantSelectedItems.filter(i => i.idx !== idx)

    this.setState({
      toWantItems: newItemState,
      toWantSelectedItems: selectedItemState,
      wantSelected: this.state.wantSelected - 1
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
          effect={i.effect}
          key={idx}
        />
      )
    })

  const toWantItems = this.state.toWantItems.map((i, idx) => {
    return i.filtered ? null : (
      <Item
        marketHashName={i.item_name}
        onSelect={() => this.onSelectWant(i)}
        tradable={true}
        category={i.category}
        selected={i.selected}
        image={`http://media.steampowered.com/apps/440/icons/${i.image}`}
        key={idx + 5000}
      />
    )
  })

    return (
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <SmartTradeBox
            addEffect={this.updateUnusualEffectToWantItem}
            onEvictWant={this.onEvictWant}
            onEvict={this.onEvict}
            toWant={this.state.selectedItems}
            toHave={this.state.toWantSelectedItems}
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
              <button
                className="flx1 tradeButton restrictBtn"
                onClick={() => this.setState({ have: true })}
              >
                To Have
              </button>
              <button
                className="flx1 tradeButton restrictBtn"
                onClick={() => this.setState({ have: false })}
              >
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
              {this.state.have ? [items] : [toWantItems]}
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
                <button
                  className='tradeButton'
                  onClick={this.makeTrade}
                >
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

const mapStateToProps = (state) => {
  return {
    steamID: state.userReducer.user.steamid
  }
}

export default connect(mapStateToProps)(NewTrade)
