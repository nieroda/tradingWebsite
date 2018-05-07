import { combineReducers } from 'redux'
import trash from './trash'
import userReducer from './userReducer'


const rootReducer = combineReducers({
  trash,
  userReducer
})

export default rootReducer
