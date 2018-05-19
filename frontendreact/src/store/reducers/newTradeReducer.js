import { HYDRATE_NEW_TRADE } from '../actionTypes'

//redux l8r
//flush state on completion
const INITIAL_STATE = {
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

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case:
      return {}
    default:
      return state
  }
}
